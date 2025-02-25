//Create objects for common properties across available frames
var masks = [{src:'/img/frames/japaneseShowcase/MaskPinlines.png', name:'Pinline'}, {src:'/img/frames/japaneseShowcase/MaskTitle.png', name:'Title'}, {src:'/img/frames/japaneseShowcase/MaskType.png', name:'Type'}, {src:'/img/frames/japaneseShowcase/MaskFramePinline.png', name:'Frame Pinline'}, {src:'/img/frames/japaneseShowcase/MaskBottomFrame.png', name:'BottomFrame'}];
var bounds = {x:1146/1500, y:1861/2100, width:274/1500, height:140/2100};
var bounds2 = {x:0.770, y:0.8813, width:0.176, height:0.0618};
var bounds3 = {x:0.0, y:0.0 , width:1.0, height:1.0};
//defines available frames
availableFrames = [
	{name:'White Frame', src:'/img/frames/japaneseShowcase/W.png', masks:masks},
	{name:'Blue Frame', src:'/img/frames/japaneseShowcase/U.png', masks:masks},
	{name:'Black Frame', src:'/img/frames/japaneseShowcase/B.png', masks:masks},
	{name:'Red Frame', src:'/img/frames/japaneseShowcase/R.png', masks:masks},
	{name:'Green Frame', src:'/img/frames/japaneseShowcase/G.png', masks:masks},
	{name:'Multicolored Frame', src:'/img/frames/japaneseShowcase/M.png', masks:masks},
	{name:'Artifact Frame', src:'/img/frames/japaneseShowcase/A.png', masks:masks},
	{name:'Land Frame', src:'/img/frames/japaneseShowcase/L.png', masks:masks},
	{name:'Colorless Frame', src:'/img/frames/japaneseShowcase/C.png', masks:masks},
	{name:'White Power/Toughness', src:'/img/frames/japaneseShowcase/pt/w.png', bounds:bounds2},
	{name:'Blue Power/Toughness', src:'/img/frames/japaneseShowcase/pt/u.png', bounds:bounds2},
	{name:'Black Power/Toughness', src:'/img/frames/japaneseShowcase/pt/b.png', bounds:bounds2},
	{name:'Red Power/Toughness', src:'/img/frames/japaneseShowcase/pt/r.png', bounds:bounds2},
	{name:'Green Power/Toughness', src:'/img/frames/japaneseShowcase/pt/g.png', bounds:bounds2},
	{name:'Multicolored Power/Toughness', src:'/img/frames/japaneseShowcase/pt/m.png', bounds:bounds2},
	{name:'Artifact Power/Toughness', src:'/img/frames/japaneseShowcase/pt/a.png', bounds:bounds2},
	{name:'Vehicle Power/Toughness', src:'/img/frames/japaneseShowcase/pt/v.png', bounds:bounds2},
	{name:'Colorless Power/Toughness', src:'/img/frames/japaneseShowcase/pt/l.png', bounds:bounds2},
	{name:'Inner PT Box', src:'/img/frames/japaneseShowcase/pt/MaskPTInnerBox.png', bounds:bounds3},
	{name:'Border (Place on Bottom Layer)', src:'/img/frames/custom/m15-eighth/regular/Border.png', bounds:bounds3}
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = async function() {
	//resets things so that every frame doesn't have to
	await resetCardIrregularities();
	//sets card version
	card.version = 'JapaneseShowcase';
	//art bounds
	card.artBounds = {x:0, y:0, width:1, height:0.9224};
	autoFitArt();
	//set symbol bounds
	card.setSymbolBounds = {x:0.9040, y:0.6345, width:0.12, height:0.0410, vertical:'center', horizontal: 'right'};
	resetSetSymbol();
	//watermark bounds
	card.watermarkBounds = {x:0.5, y:0.7762, width:0.75, height:0.2305};
	resetWatermark();
	//text
	loadTextOptions({
		mana: {name:'Mana Cost', text:'', y:0.0683, width:0.9190, height:71/2100, oneLine:true, size:71/1638, align:'right', shadowX:-0.001, shadowY:0.0029, manaCost:true, manaSpacing:0,},
		title: {name:'Title', text:'', x:0.090, y:0.0582, width:0.8292, height:0.0543, outlineWidth:0.0095, oneLine:true, font:'belerenb', size:0.0381, color:'white',},
		type: {name:'Type', text:'', x:0.0875, y:0.6130, width:0.8000, height:0.0543, oneLine:true, font:'belerenb', outlineWidth:0.0095, size:0.0324, color:'white',},
		rules: {name:'Rules Text', text:'', x:0.086, y:0.6803, width:0.828, height:0.2265, outlineWidth:0.0095, size:0.0362, color:'white',},
		pt: {name:'Power/Toughness', text:'', x:0.7892, y:0.8970, width:0.1367, height:0.0372, size:0.0372, font:'belerenbsc', oneLine:true, align:'center', color:'white'}
	});
}
//loads available frames
loadFramePack();