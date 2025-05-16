//Create objects for common properties across available frames
var masks = [{src:'/img/frames/custom/stoneCutter/masks/maskPinlines.png', name:'Pinlines'}, {src:'/img/frames/custom/stoneCutter/masks/maskFrame.png', name:'Frame'}, {src:'/img/frames/custom/stoneCutter/masks/maskRules.png', name:'Rules Text'}, {src:'/img/frames/custom/stoneCutter/masks/maskDual.png', name:'Dual Land'}, {src:'/img/frames/custom/stoneCutter/masks/maskBorderless.png', name:'Borderless'}, {src:'/img/frames/custom/stoneCutter/masks/maskBorder.png', name:'Border'}];
var masks2 = [{src:'/img/frames/custom/stoneCutter/stoneCutterDeluxe/crowns/maskPinlines.png', name:'Pinlines'}];
var bounds = {x:0, y:0, width:1, height:1};
//defines available frames
availableFrames = [
	{name:'White Frame', src:'/img/frames/custom/stoneCutter/w.png', masks:masks},
	{name:'Blue Frame', src:'/img/frames/custom/stoneCutter/u.png', masks:masks},
	{name:'Black Frame', src:'/img/frames/custom/stoneCutter/b.png', masks:masks},
	{name:'Red Frame', src:'/img/frames/custom/stoneCutter/r.png', masks:masks},
	{name:'Green Frame', src:'/img/frames/custom/stoneCutter/g.png', masks:masks},
	{name:'Multicolored Frame', src:'/img/frames/custom/stoneCutter/m.png', masks:masks},
	{name:'Artifact Frame', src:'/img/frames/custom/stoneCutter/a.png', masks:masks},
	{name:'Land Frame', src:'/img/frames/custom/stoneCutter/L.png', masks:masks},
	{name:'Gold Inlay', src:'/img/frames/custom/stoneCutter/stoneCutterDeluxe/gold.png'},
	{name:'Nyx Inlay', src:'/img/frames/custom/stoneCutter/stoneCutterDeluxe/nyx.png'},
	
	{name:'White Power/Toughness', src:'/img/frames/custom/stoneCutter/pt/w.png', bounds:bounds},
	{name:'Blue Power/Toughness', src:'/img/frames/custom/stoneCutter/pt/u.png', bounds:bounds},
	{name:'Black Power/Toughness', src:'/img/frames/custom/stoneCutter/pt/b.png', bounds:bounds},
	{name:'Red Power/Toughness', src:'/img/frames/custom/stoneCutter/pt/r.png', bounds:bounds},
	{name:'Green Power/Toughness', src:'/img/frames/custom/stoneCutter/pt/g.png', bounds:bounds},
	{name:'Multicolored Power/Toughness', src:'/img/frames/custom/stoneCutter/pt/m.png', bounds:bounds},
	{name:'Artifact Power/Toughness', src:'/img/frames/custom/stoneCutter/pt/a.png', bounds:bounds},
	{name:'Land Power/Toughness', src:'/img/frames/custom/stoneCutter/pt/L.png', bounds:bounds},
	{name:'Gold Power/Toughness', src:'/img/frames/custom/stoneCutter/pt/Lg.png', bounds:bounds},
	
	{name:'White Crown', src:'/img/frames/custom/stoneCutter/crowns/w.png', bounds:bounds, masks:masks2, complementary:29},
	{name:'Blue Crown', src:'/img/frames/custom/stoneCutter/crowns/u.png', bounds:bounds, masks:masks2, complementary:29},
	{name:'Black Crown', src:'/img/frames/custom/stoneCutter/crowns/b.png', bounds:bounds, masks:masks2, complementary:29},
	{name:'Red Crown', src:'/img/frames/custom/stoneCutter/crowns/r.png', bounds:bounds, masks:masks2, complementary:29},
	{name:'Green Crown', src:'/img/frames/custom/stoneCutter/crowns/g.png', bounds:bounds, masks:masks2, complementary:29},
	{name:'Multicolored Crown', src:'/img/frames/custom/stoneCutter/crowns/m.png', bounds:bounds, masks:masks2, complementary:29},
	{name:'Artifact Crown', src:'/img/frames/custom/stoneCutter/crowns/a.png', bounds:bounds, masks:masks2, complementary:29},
	{name:'Land Crown', src:'/img/frames/custom/stoneCutter/crowns/L.png', bounds:bounds, masks:masks2, complementary:29},
	{name:'Legend Crown Gold Inlay', src:'/img/frames/custom/stoneCutter/stoneCutterDeluxe/crowns/gold.png', bounds:bounds},
	{name:'Legend Crown Nyx Inlay', src:'/img/frames/custom/stoneCutter/stoneCutterDeluxe/crowns/nyx.png', bounds:bounds},
	
	{name:'Legend Crown Border Cover', src:'/img/frames/custom/stoneCutter/stoneCutterDeluxe/blackBar.png', bounds:bounds}
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = async function() {
	//resets things so that every frame doesn't have to
	await resetCardIrregularities();
	//sets card version
	card.version = 'stoneCutter';
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
		mana: {name:'Mana Cost', text:'', y:0.0497, width:0.9292, height:71/2100, oneLine:true, size:71/1638, align:'right', shadowX:-0.001, shadowY:0.0029, manaCost:true, manaSpacing:0},
		title: {name:'Title', text:'', x:0.0854, y:0.0372, width:0.8292, height:0.0543, oneLine:true, font:'belerenb', size:0.0381, color:'white', shadowX:0.002, shadowY:0.0015},
		type: {name:'Type', text:'', x:0.0854, y:0.571, width:0.8292, height:0.0543, oneLine:true, font:'belerenb', size:0.0324, color:'white', shadowX:0.002, shadowY:0.0015},
		rules: {name:'Rules Text', text:'', x:0.086, y:0.6329, width:0.828, height:0.2905, size:0.0362},
		pt: {name:'Power/Toughness', text:'', x:0.7928, y:0.902, width:0.1367, height:0.0372, size:0.0372, font:'belerenbsc', oneLine:true, align:'center', color:'white', shadowX:0.002, shadowY:0.0015}
	});
}
//loads available frames
loadFramePack();