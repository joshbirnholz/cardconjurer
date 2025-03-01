//Create objects for common properties across available frames
var masks = [{src:'/img/frames/promo/m15PromoMaskPinline.png', name:'Pinline'}, {src:'/img/frames/m15/regular/m15MaskTitle.png', name:'Title'}, {src:'/img/frames/promo/m15PromoMaskType.png', name:'Type'}, {src:'/img/frames/promo/m15PromoMaskRules.png', name:'Rules'}, {src:'/img/frames/m15/regular/m15MaskBorder.png', name:'Border'}];
var bounds = {x:1146/1500, y:1861/2100, width:274/1500, height:140/2100};
//defines available frames
availableFrames = [
	{name:'White Frame', src:'/img/frames/borderlessAlt/m15PromoFrameW.png', masks:masks},
	{name:'Blue Frame', src:'/img/frames/borderlessAlt/m15PromoFrameU.png', masks:masks},
	{name:'Black Frame', src:'/img/frames/borderlessAlt/m15PromoFrameB.png', masks:masks},
	{name:'Red Frame', src:'/img/frames/borderlessAlt/m15PromoFrameR.png', masks:masks},
	{name:'Green Frame', src:'/img/frames/borderlessAlt/m15PromoFrameG.png', masks:masks},
	{name:'Multicolored Frame', src:'/img/frames/borderlessAlt/m15PromoFrameM.png', masks:masks},
	{name:'Artifact Frame', src:'/img/frames/borderlessAlt/m15PromoFrameA.png', masks:masks},
	{name:'Land Frame', src:'/img/frames/borderlessAlt/m15PromoFrameL.png', masks:masks},
	{name:'White Power/Toughness', src:'/img/frames/m15/borderless/pt/w.png', bounds:bounds},
	{name:'Blue Power/Toughness', src:'/img/frames/m15/borderless/pt/u.png', bounds:bounds},
	{name:'Black Power/Toughness', src:'/img/frames/m15/borderless/pt/b.png', bounds:bounds},
	{name:'Red Power/Toughness', src:'/img/frames/m15/borderless/pt/r.png', bounds:bounds},
	{name:'Green Power/Toughness', src:'/img/frames/m15/borderless/pt/g.png', bounds:bounds},
	{name:'Multicolored Power/Toughness', src:'/img/frames/m15/borderless/pt/m.png', bounds:bounds},
	{name:'Artifact Power/Toughness', src:'/img/frames/m15/borderless/pt/a.png', bounds:bounds},
	{name:'Vehicle Power/Toughness', src:'/img/frames/m15/borderless/pt/v.png', bounds:bounds},
	{name:'Colorless Power/Toughness', src:'/img/frames/m15/borderless/pt/l.png', bounds:bounds},
	{name:'Outline Cutout', src:'/img/frames/promo/outlineCutout.svg', erase:true},
	{name:'Outline (Solid)', src:'/img/frames/promo/outline.svg'},
	{name:'Outline (Bevel)', src:'/img/frames/promo/bevel.png'}
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = async function() {
	//resets things so that every frame doesn't have to
	await resetCardIrregularities();
	//sets card version
	card.version = 'borderlessAlt';
	//art bounds
	card.artBounds = {x:0, y:0, width:1, height:0.9224};
	autoFitArt();
	//set symbol bounds
	card.setSymbolBounds = {x:0.9213, y:0.6743, width:0.12, height:0.0410, vertical:'center', horizontal: 'right'};
	resetSetSymbol();
	//watermark bounds
	card.watermarkBounds = {x:0.5, y:0.8177, width:0.75, height:0.1472};
	resetWatermark();
	//text
	loadTextOptions({
		mana: {name:'Mana Cost', text:'', y:0.0613, width:0.9292, height:71/2100, oneLine:true, size:71/1638, align:'right', shadowX:-0.001, shadowY:0.0029, manaCost:true, manaSpacing:0},
		title: {name:'Title', text:'', x:0.0854, y:0.0522, width:0.8292, height:0.0543, oneLine:true, font:'belerenb', size:0.0381, color:'white', shadowX:0.0014, shadowY:0.001},
		type: {name:'Type', text:'', x:0.0854, y:0.65, width:0.8292, height:0.0543, oneLine:true, font:'belerenb', size:0.0324, color:'white', shadowX:0.0014, shadowY:0.001},
		rules: {name:'Rules Text', text:'', x:0.086, y:0.7143, width:0.828, height:0.2048, size:0.0362, color:'white', shadowX:0.0014, shadowY:0.001},
		pt: {name:'Power/Toughness', text:'', x:0.7928, y:0.902, width:0.1367, height:0.0372, size:0.0372, font:'belerenbsc', oneLine:true, align:'center'}
	});
}
//loads available frames
loadFramePack();