#!/usr/bin/env node
/* Optional PowerPoint reference export; HTML generation remains dependency-free.
   Requires pptxgenjs and sharp. Run from any directory with NODE_PATH set if needed.
   Usage: node scripts/build-joymaker-pptx.cjs [output.pptx] */
const pptxgen = require('pptxgenjs');
const sharp = require('sharp');
const fs = require('node:fs/promises');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const theme = path.join(root, 'bold-template-pack/templates/joymaker');
const output = path.resolve(process.argv[2] || path.join(theme, 'example.pptx'));
const colors = {surface:'EDF1F2', navy:'1C385F', body:'606568', muted:'747A7E', orange:'F45100', coral:'F46B43', red:'C81036', line:'D9DEE0'};
const unit = v => v / 144;

async function main() {
    const pptx = new pptxgen();
    pptx.defineLayout({name:'JOYMAKER', width:unit(1920), height:unit(1080)});
    pptx.layout = 'JOYMAKER';
    pptx.author = 'Frontend Slides';
    pptx.subject = 'joymaker · original supplied logo, illustrative content';
    pptx.title = '欢乐互娱 · 公司介绍示例';
    pptx.company = '欢乐互娱';
    pptx.lang = 'zh-CN';
    pptx.theme = {headFontFace:'PingFang SC', bodyFontFace:'PingFang SC', lang:'zh-CN'};
    const logo = path.join(theme, 'assets/logo-original.png');
    // Raster gradient only; all headings, data, cards and rules stay editable.
    const gradient = await sharp(Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#FFA451"/><stop offset=".5" stop-color="#FF8438"/><stop offset="1" stop-color="#FF5725"/></linearGradient></defs><rect width="1920" height="1080" fill="url(#g)"/><g fill="none" stroke="#FFFFFF" stroke-opacity=".14" stroke-width="2"><ellipse cx="1000" cy="1100" rx="1250" ry="700"/><ellipse cx="1050" cy="1160" rx="1250" ry="700"/></g></svg>')).png().toBuffer();
    const background = 'image/png;base64,' + gradient.toString('base64');
    function text(slide, value, x, y, w, h, px=28, extra={}) {
        slide.addText(value, {x:unit(x),y:unit(y),w:unit(w),h:unit(h),fontFace:'PingFang SC',fontSize:px/2,color:colors.body,margin:0,breakLine:false,valign:'mid',isTextBox:true,...extra});
    }
    function rect(slide,x,y,w,h,color,rounded=false) {
        slide.addShape(rounded ? pptx.ShapeType.roundRect : pptx.ShapeType.rect, {x:unit(x),y:unit(y),w:unit(w),h:unit(h),rectRadius:unit(24),radius:unit(24),line:{color,transparency:100},fill:{color},radiusAdjustment:.12});
    }
    function rule(slide,x,y,w,color=colors.line) {
        slide.addShape(pptx.ShapeType.line,{x:unit(x),y:unit(y),w:unit(w),h:0,line:{color,width:1}});
    }
    function base(page,cover=false) {
        const slide = pptx.addSlide();
        slide.background = {color:colors.surface};
        if(cover) slide.addImage({data:background,x:0,y:0,w:unit(1920),h:unit(1080)});
        const lw=cover?460:280;
        if(!cover || page===1) slide.addImage({path:cover?path.join(theme,'assets/logo-white-mark.png'):logo,x:unit(cover?112:1528),y:unit(cover?96:48),w:unit(lw),h:unit(lw*(cover?130/400:208/550)),altText:cover?'参考封面的原始白色 Logo':'欢乐互娱原始 Logo：欢乐从这里开始'});
        // Native text keeps the small reference slogan crisp at any zoom.
        if(cover && page===1) text(slide,'欢乐从这里开始',273,196,290,40,26,{color:'FFFFFF',bold:true,charSpacing:5});
        rule(slide,112,1000,1696,cover?'FFD0B0':colors.line);
        text(slide,page===2||page===3?'示例内容与数据，不代表公司披露':'公司介绍 · 示例内容',112,1016,1250,30,20,{color:cover?'FFFFFF':colors.muted});
        text(slide,`${String(page).padStart(2,'0')} / 05`,1650,1016,158,30,20,{color:cover?'FFFFFF':colors.muted,align:'right'});
        return slide;
    }
    function header(slide,title,subtitle) {
        rect(slide,112,88,16,86,colors.red);
        text(slide,title,152,80,1320,94,60,{color:colors.navy,bold:true});
        text(slide,subtitle,152,188,1360,56,28);
    }
    function number(slide,value,suffix,x,y,w,h,px=78) {
        text(slide,[{text:value,options:{bold:true,fontSize:px/2,color:colors.orange}},{text:suffix,options:{bold:true,fontSize:16,color:colors.orange}}],x,y,w,h,px);
    }
    let s=base(1,true);
    text(s,'欢乐互娱公司介绍',112,500,1696,150,108,{color:'FFFFFF',bold:true});
    text(s,'以热爱创造体验，以长期运营连接玩家',112,678,1696,70,32,{color:'FFFFFF'});
    s.addNotes('开场：介绍团队定位。本文件仅演示排版，内容和数字均为示例。原始 Logo 保持原图。');

    s=base(2);
    header(s,'业务布局与核心能力','聚焦产品研发、全球发行与长线运营');
    for(const [x,title,body] of [[112,'产品研发','围绕核心玩法打磨产品体验\n以持续测试推动品质提升'],[1000,'发行与运营','连接不同市场与玩家社区\n在长期服务中积累品牌价值']]) {
        text(s,title,x,332,760,54,34,{color:colors.orange,bold:true});
        text(s,body,x,404,760,112,28,{breakLine:false});
    }
    rule(s,112,584,1696); text(s,'核心经营成果 · 演示数据',112,612,1200,48,28,{bold:true});
    [['12','款','产品持续运营'],['30','个','市场覆盖'],['8','年','长线运营积累'],['92','%','玩家满意度']].forEach(([v,u,label],i)=>{
        const x=112+i*432; rect(s,x,692,400,230,'FFFFFF',true);
        number(s,v,u,x+40,726,320,112); text(s,label,x+40,850,320,42,24);
    });
    s.addNotes('左右两栏讲述能力，底部四张卡片呈现量化证据。示例数字不代表公司实际情况。');

    s=base(3); header(s,'产品测试与用户反馈','以玩家反馈验证体验，以关键指标支持迭代');
    [['测试组 A','3,200',['86.0%','80.0%','72.0%','8小时']],['测试组 B','1,600',['85.0%','78.0%','60.0%','7小时']]].forEach(([title,value,metrics],i)=>{
        const x=112+i*864; rect(s,x,384,832,456,'FFFFFF',true);
        text(s,title,x+44,422,744,54,34,{color:colors.coral,bold:true});
        number(s,value,' 人',x+44,488,744,112); text(s,'参与测试用户 · 演示数据',x+44,612,744,40,24);
        rule(s,x+44,684,744);
        ['次日留存','三日留存','七日留存','平均时长'].forEach((label,k)=>{
            text(s,label,x+44+k*190,710,174,40,24,{color:colors.muted});
            text(s,metrics[k],x+44+k*190,760,174,56,40,{color:colors.orange,bold:true});
        });
    });
    s.addNotes('对比两个测试组。先看测试规模，再看留存与时长；数字均为演示数据。');

    s=base(4); header(s,'下一阶段，聚焦三件事','以清晰的行动，让每一次迭代更有价值');
    [['打磨核心体验','围绕玩家的关键体验\n集中资源解决核心问题'],['验证市场机会','通过小规模测试获取反馈\n用数据校准产品与发行节奏'],['积累长期价值','持续服务玩家与社区\n让内容、口碑与品牌共同成长']].forEach(([title,body],i)=>{
        const x=112+i*586.67; rule(s,x,384,522.67); text(s,`0${i+1}`,x,416,522,96,64,{color:colors.orange,bold:true});
        text(s,title,x,546,522,70,38,{color:colors.navy,bold:true}); text(s,body,x,650,522,130,28);
    });
    s.addNotes('用开放式三栏呈现路线图。每栏一个行动与一条解释，避免过多卡片。');

    s=base(5,true); text(s,'欢乐从这里开始',112,470,1696,160,108,{color:'FFFFFF',bold:true});
    text(s,'谢谢关注，期待与您同行',112,664,1696,70,32,{color:'FFFFFF'});
    s.addNotes('收束：让产品体验与玩家价值回到同一个目标。可在这里邀请提问。');
    await fs.mkdir(path.dirname(output),{recursive:true});
    await pptx.writeFile({fileName:output});
    console.log(output);
}
main().catch(error=>{console.error(error);process.exitCode=1;});
