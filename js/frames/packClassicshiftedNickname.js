//Create objects for common properties across available frames
var masks = [{src:'/img/frames/custom/classicshifted/maskFrame.png', name:'Frame'}, {src:'/img/frames/custom/classicshifted/maskText.png', name:'Textbox'}, {src:'/img/frames/custom/classicshifted/pinline.svg', name:'Pinline'}, {src:'/img/frames/custom/classicshifted/dual.svg', name:'Dual Land Pinline'}];
var masks2 = [{src:'/img/frames/m15/m15MaskBorderSliver.png', name:'Border'}, {src:'/img/frames/custom/classicshifted/crowns/borderMask.svg', name:'Legend Crown Cover'}, {src:'/img/frames/m15/regular/m15MaskBorder.png', name:'Full Border'}];
var bounds = {x:0.7573, y:0.8848, width:0.188, height:0.0733};
var bounds2 = {x:0.0267, y:0.0134, width:0.9467, height:0.1005};
var bounds3 = {x:0, y:0, width:1, height:1};
//defines available frames
availableFrames = [
	{name:'White Frame', src:'/img/frames/custom/classicshifted/w.png', masks:masks},
	{name:'Blue Frame', src:'/img/frames/custom/classicshifted/u.png', masks:masks},
	{name:'Black Frame', src:'/img/frames/custom/classicshifted/b.png', masks:masks},
	{name:'Red Frame', src:'/img/frames/custom/classicshifted/r.png', masks:masks},
	{name:'Green Frame', src:'/img/frames/custom/classicshifted/g.png', masks:masks},
	{name:'Multicolored Frame', src:'/img/frames/custom/classicshifted/m.png', masks:masks},
	{name:'Artifact Frame', src:'/img/frames/custom/classicshifted/a.png', masks:masks},
	{name:'Land Frame', src:'/img/frames/custom/classicshifted/l.png', masks:masks},
	
	{name:'White Power/Toughness', src:'/img/frames/custom/classicshifted/ptW.png', bounds:bounds},
	{name:'Blue Power/Toughness', src:'/img/frames/custom/classicshifted/ptU.png', bounds:bounds},
	{name:'Black Power/Toughness', src:'/img/frames/custom/classicshifted/ptB.png', bounds:bounds},
	{name:'Red Power/Toughness', src:'/img/frames/custom/classicshifted/ptR.png', bounds:bounds},
	{name:'Green Power/Toughness', src:'/img/frames/custom/classicshifted/ptG.png', bounds:bounds},
	{name:'Multicolored Power/Toughness', src:'/img/frames/custom/classicshifted/ptM.png', bounds:bounds},
	{name:'Artifact Power/Toughness', src:'/img/frames/custom/classicshifted/ptA.png', bounds:bounds},
	{name:'Land Power/Toughness', src:'/img/frames/custom/classicshifted/ptL.png', bounds:bounds},
	
	{name:'White Crown', src:'/img/frames/custom/classicshifted/crowns/w.png', bounds:bounds2, complementary:24},
	{name:'Blue Crown', src:'/img/frames/custom/classicshifted/crowns/u.png', bounds:bounds2, complementary:24},
	{name:'Black Crown', src:'/img/frames/custom/classicshifted/crowns/b.png', bounds:bounds2, complementary:24},
	{name:'Red Crown', src:'/img/frames/custom/classicshifted/crowns/r.png', bounds:bounds2, complementary:24},
	{name:'Green Crown', src:'/img/frames/custom/classicshifted/crowns/g.png', bounds:bounds2, complementary:24},
	{name:'Multicolored Crown', src:'/img/frames/custom/classicshifted/crowns/m.png', bounds:bounds2, complementary:24},
	{name:'Artifact Crown', src:'/img/frames/custom/classicshifted/crowns/a.png', bounds:bounds2, complementary:24},
	{name:'Land Crown', src:'/img/frames/custom/classicshifted/crowns/l.png', bounds:bounds2, complementary:24},
	{name:'Legend Crown Border Cover', src:'/img/black.png', bounds:{x:0.0394, y:0.0277, width:0.9214, height:0.021}},
	
	{name:'Snow Overlay', src:'/img/frames/custom/classicshifted/snow.png'},
	{name:'White Border', src:'/img/frames/white.png', masks:masks2, noDefaultMask:true},
	{name:'Black Border', src:'/img/black.png', masks:masks2, noDefaultMask:true},
	{name:'Silver Border', src:'/img/frames/silver.png', masks:masks2, noDefaultMask:true},
	{name:'Gold Border', src:'/img/frames/gold.png', masks:masks2, noDefaultMask:true},
	{name:'Black Frame (Alt)', src:'/img/frames/custom/classicshifted/b2.png', masks:masks},
	
	{name:'White Nickname', src:'/img/frames/custom/classicshifted/nickname/w.png', bounds:bounds3},
	{name:'Blue Nickname', src:'/img/frames/custom/classicshifted/nickname/u.png', bounds:bounds3},
	{name:'Black Nickname', src:'/img/frames/custom/classicshifted/nickname/b.png', bounds:bounds3},
	{name:'Red Nickname', src:'/img/frames/custom/classicshifted/nickname/r.png', bounds:bounds3},
	{name:'Green Nickname', src:'/img/frames/custom/classicshifted/nickname/g.png', bounds:bounds3},
	{name:'Multicolored Nickname', src:'/img/frames/custom/classicshifted/nickname/m.png', bounds:bounds3},
	{name:'Artifact Nickname', src:'/img/frames/custom/classicshifted/nickname/a.png', bounds:bounds3},
	{name:'Land Nickname', src:'/img/frames/custom/classicshifted/nickname/L.png', bounds:bounds3}
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = async function() {
	//resets things so that every frame doesn't have to
	await resetCardIrregularities();
	//sets card version
	card.version = 'classicshifted';
	//art bounds
	card.artBounds = {x:0.08, y:0.0954, width:0.84, height:0.4653};
	autoFitArt();
	//set symbol bounds
	card.setSymbolBounds = {x:0.9213, y:0.5958, width:0.12, height:0.0410, vertical:'center', horizontal: 'right'};
	resetSetSymbol();
	//watermark bounds
	card.watermarkBounds = {x:0.5, y:0.7762, width:0.75, height:0.2305};
	resetWatermark();
	//text
	loadTextOptions({
		mana: {name:'Mana Cost', text:'', y:0.0462, width:0.9292, height:71/2100, oneLine:true, size:71/1638, align:'right', shadowX:-0.001, shadowY:0.0029, manaCost:true, manaSpacing:0},
		nickname: {name:'Nickname', text:'', x:0.0854, y:0.0368, width:0.8292, height:0.0543, oneLine:true, font:'belerenb', size:0.0381, color:'white', shadowX:0.002, shadowY:0.0015},
		title: {name:'Title', text:'', x:0.14, y:0.1035, width:0.72, height:0.0243, oneLine:true, font:'mplantini', size:0.0229, color:'white', shadowX:0.0014, shadowY:0.001, align:'center'},
		type: {name:'Type', text:'', x:0.0854, y:0.571, width:0.8292, height:0.0543, oneLine:true, font:'belerenb', size:0.0324, color:'white', shadowX:0.002, shadowY:0.0015},
		rules: {name:'Rules Text', text:'', x:0.086, y:0.6329, width:0.828, height:0.2905, size:0.0362},
		pt: {name:'Power/Toughness', text:'', x:0.7928, y:0.902, width:0.1367, height:0.0372, size:0.0372, font:'belerenbsc', oneLine:true, align:'center', color:'white', shadowX:0.002, shadowY:0.0015}
	});
}
//loads available frames
loadFramePack();