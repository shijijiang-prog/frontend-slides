#!/usr/bin/env python3
"""Dependency-free artifact and packaging checks; browser QA is separate.

Usage: python3 scripts/verify-joymaker.py [--baseline d7894c0]
The optional Git baseline verifies that every earlier template is unchanged.
"""
import argparse
import base64
from html.parser import HTMLParser
import json
from pathlib import Path
import re
import subprocess
import tempfile
import xml.etree.ElementTree as ET
from zipfile import ZipFile

ROOT = Path(__file__).resolve().parents[1]
PLUGIN = ROOT / 'plugins/frontend-slides/skills/frontend-slides'
THEME = ROOT / 'bold-template-pack/templates/joymaker'


class DeckParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.slides = []
        self.images = []
        self.ids = []

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if 'id' in a:
            self.ids.append(a['id'])
        if tag == 'section' and 'slide' in a.get('class', '').split():
            self.slides.append(a)
        if tag == 'img':
            self.images.append(a)
        for name in ('src', 'href'):
            assert not a.get(name, '').startswith(('http:', 'https:', '//')), 'Remote asset in offline example'


def verify(baseline=None):
    index = json.loads((ROOT / 'bold-template-pack/selection-index.json').read_text())
    assert index['template_count'] == len(index['templates']) == 36
    assert len({t['slug'] for t in index['templates']}) == 36
    assert sum(t['slug'] == 'joymaker' for t in index['templates']) == 1
    for t in index['templates']:
        for key in ('preview_md', 'design_md'):
            assert (ROOT / t[key]).is_file(), t[key]
    for name in ('SKILL.md', 'STYLE_PRESETS.md', 'bold-template-pack/selection-index.json'):
        assert (ROOT / name).read_bytes() == (PLUGIN / name).read_bytes(), name
    for file in THEME.rglob('*'):
        if file.is_file():
            mirror = PLUGIN / file.relative_to(ROOT)
            assert mirror.is_file() and file.read_bytes() == mirror.read_bytes(), str(file)
    print('PASS: 36 selectable themes, valid paths, root/plugin parity')

    html = (THEME / 'example.html').read_text()
    parser = DeckParser()
    parser.feed(html)
    assert len(parser.slides) == len(parser.images) == 5
    assert len(set(parser.ids)) == len(parser.ids), 'Duplicate IDs'
    assert all(s.get('data-notes') for s in parser.slides)
    for n, image in enumerate(parser.images):
        asset = 'logo-white-mark.png' if n in (0, 4) else 'logo-original.png'
        assert base64.b64decode(image['src'].split(',', 1)[1]) == (THEME / 'assets' / asset).read_bytes()
        assert image.get('alt')
    assert (ROOT / 'viewport-base.css').read_text() in html
    assert (THEME / 'joymaker.css').read_text() in html
    for script in re.findall(r'<script>([\s\S]*?)</script>', html):
        with tempfile.NamedTemporaryFile(suffix='.js', mode='w') as temp:
            temp.write(script)
            temp.flush()
            subprocess.run(['node', '--check', temp.name], check=True, capture_output=True)
    print('PASS: offline five-slide HTML, both correct logo variants, notes, base CSS, JS syntax')

    ns = {'p': 'http://schemas.openxmlformats.org/presentationml/2006/main',
          'a': 'http://schemas.openxmlformats.org/drawingml/2006/main'}
    with ZipFile(THEME / 'example.pptx') as z:
        assert z.testzip() is None
        slides = sorted(n for n in z.namelist() if re.fullmatch(r'ppt/slides/slide\d+\.xml', n))
        assert len(slides) == 5
        assert len([n for n in z.namelist() if re.fullmatch(r'ppt/notesSlides/notesSlide\d+\.xml', n)]) == 5
        dims = ET.fromstring(z.read('ppt/presentation.xml')).find('p:sldSz', ns)
        assert abs(int(dims.attrib['cx']) / int(dims.attrib['cy']) - 16 / 9) < .0001
        media = [z.read(n) for n in z.namelist() if n.startswith('ppt/media/')]
        for asset in ('logo-original.png', 'logo-white-mark.png'):
            assert (THEME / 'assets' / asset).read_bytes() in media, 'Logo bytes changed: ' + asset
        expected = ['欢乐互娱公司介绍', '业务布局与核心能力', '产品测试与用户反馈', '下一阶段，聚焦三件事', '欢乐从这里开始']
        for name, title in zip(slides, expected):
            tree = ET.fromstring(z.read(name))
            assert title in ''.join(n.text or '' for n in tree.findall('.//a:t', ns))
            assert len(tree.findall('.//p:sp', ns)) > 4, 'Slide flattened instead of editable'
            assert tree.findall('.//p:pic', ns), 'Missing logo'
            if title in (expected[0], expected[4]):
                assert any(n.text == '欢乐从这里开始' for n in tree.findall('.//a:t', ns)), 'Slogan must stay native text'
    print('PASS: valid 16:9 PPTX, five editable slides, five notes, original logo bytes embedded')

    if baseline:
        def git(*args):
            return subprocess.check_output(['git', '-C', str(ROOT), *args])
        old = json.loads(git('show', baseline + ':bold-template-pack/selection-index.json'))
        assert index['templates'][:-1] == old['templates'], 'An existing template definition changed'
        protected = git('ls-tree', '-r', '--name-only', baseline, 'bold-template-pack/templates',
                        'plugins/frontend-slides/skills/frontend-slides/bold-template-pack/templates').decode().splitlines()
        protected += ['viewport-base.css', 'html-template.md', 'animation-patterns.md']
        for name in protected:
            assert (ROOT / name).read_bytes() == git('show', baseline + ':' + name), name
        print('PASS: all earlier template assets/definitions and base controller references unchanged vs ' + baseline)


if __name__ == '__main__':
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument('--baseline')
    verify(p.parse_args().baseline)
