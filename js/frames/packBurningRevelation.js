//Create objects for common properties across available frames
var masks = [{src:'/img/frames/sld/burningrevelations/maskFrame.png', name:'Frame'}, {src:'/img/frames/sld/burningrevelations/maskPinline.png', name:'Pinline'}, {src:'/img/frames/sld/burningrevelations/maskRules.png', name:'Rules'}, {src:'/img/frames/sld/burningrevelations/maskBorder.png', name:'Border'}];
var crownMasks = [{src:'/img/frames/sld/burningrevelations/maskCrownBorder.png', name:'Border'}];
var ptBounds = {x:1582/2010, y:2490/2814, width:337/2010, height:179/2814};
var crownBounds = {x:101/2010, y:43/2814, width:1829/2010, height:267/2814};
//defines available frames
availableFrames = [
	{name:'White Frame', src:'/img/frames/sld/burningrevelations/w.png', masks:masks},
	{name:'Blue Frame', src:'/img/frames/sld/burningrevelations/u.png', masks:masks},
	{name:'Black Frame', src:'/img/frames/sld/burningrevelations/b.png', masks:masks},
	{name:'Red Frame', src:'/img/frames/sld/burningrevelations/r.png', masks:masks},
	{name:'Green Frame', src:'/img/frames/sld/burningrevelations/g.png', masks:masks},
	{name:'Multicolored Frame', src:'/img/frames/sld/burningrevelations/m.png', masks:masks},
	{name:'Artifact Frame', src:'/img/frames/sld/burningrevelations/a.png', masks:masks},
	{name:'Land Frame', src:'/img/frames/sld/burningrevelations/l.png', masks:masks},
	{name:'Colorless Frame', src:'/img/frames/sld/burningrevelations/c.png', masks:masks},
	{name:'White Power/Toughness', src:'/img/frames/sld/burningrevelations/pt/w.png', bounds:ptBounds},
	{name:'Blue Power/Toughness', src:'/img/frames/sld/burningrevelations/pt/u.png', bounds:ptBounds},
	{name:'Black Power/Toughness', src:'/img/frames/sld/burningrevelations/pt/b.png', bounds:ptBounds},
	{name:'Red Power/Toughness', src:'/img/frames/sld/burningrevelations/pt/r.png', bounds:ptBounds},
	{name:'Green Power/Toughness', src:'/img/frames/sld/burningrevelations/pt/g.png', bounds:ptBounds},
	{name:'Multicolored Power/Toughness', src:'/img/frames/sld/burningrevelations/pt/m.png', bounds:ptBounds},
	{name:'Artifact Power/Toughness', src:'/img/frames/sld/burningrevelations/pt/a.png', bounds:ptBounds},
	{name:'Land Power/Toughness', src:'/img/frames/sld/burningrevelations/pt/l.png', bounds:ptBounds},
	{name:'Colorless Power/Toughness', src:'/img/frames/sld/burningrevelations/pt/c.png', bounds:ptBounds},
	{name:'White Crown', src:'/img/frames/sld/burningrevelations/crowns/w.png', bounds:crownBounds, complementary:27, masks:crownMasks},
	{name:'Blue Crown', src:'/img/frames/sld/burningrevelations/crowns/u.png', bounds:crownBounds, complementary:27, masks:crownMasks},
	{name:'Black Crown', src:'/img/frames/sld/burningrevelations/crowns/b.png', bounds:crownBounds, complementary:27, masks:crownMasks},
	{name:'Red Crown', src:'/img/frames/sld/burningrevelations/crowns/r.png', bounds:crownBounds, complementary:27, masks:crownMasks},
	{name:'Green Crown', src:'/img/frames/sld/burningrevelations/crowns/g.png', bounds:crownBounds, complementary:27, masks:crownMasks},
	{name:'Multicolored Crown', src:'/img/frames/sld/burningrevelations/crowns/m.png', bounds:crownBounds, complementary:27, masks:crownMasks},
	{name:'Artifact Crown', src:'/img/frames/sld/burningrevelations/crowns/a.png', bounds:crownBounds, complementary:27, masks:crownMasks},
	{name:'Land Crown', src:'/img/frames/sld/burningrevelations/crowns/l.png', bounds:crownBounds, complementary:27, masks:crownMasks},
	{name:'Colorless Crown', src:'/img/frames/sld/burningrevelations/crowns/c.png', bounds:crownBounds, complementary:27, masks:crownMasks},
	{name:'Legend Crown Border Cover', src:'/img/black.png', bounds:{x:156/2010, y:34/2814, width:1728/2010, height:119/2814}}
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = async function() {
	//resets things so that every frame doesn't have to
	await resetCardIrregularities();
	//sets card version
	card.version = 'burningrevelations';
	//art bounds
	card.artBounds = {x:149/2010, y:315/2814, width:1719/2010, height:1255/2814};
	autoFitArt();
	//set symbol bounds
	card.setSymbolBounds = {x:0.9213, y:1660/2814, width:0.12, height:0.0410, vertical:'center', horizontal: 'right'};
	resetSetSymbol();
	//watermark bounds
	card.watermarkBounds = {x:0.5, y:0.7762, width:0.75, height:0.2305};
	resetWatermark();
	//text
	loadTextOptions({
		mana: {name:'Mana Cost', text:'', y:155/2814, width:0.9292, height:71/2100, oneLine:true, size:71/1638, align:'right', shadowX:-0.001, shadowY:0.0029, manaCost:true, manaSpacing:0},
		title: {name:'Title', text:'', x:0.0854, y:124/2814, width:0.8292, height:0.0543, oneLine:true, font:'thunderman', size:0.0381, color:'white', conditionalColor:'White_Frame,Artifact_Frame,Multicolored_Frame,Colorless_Frame:black'},
		type: {name:'Type', text:'', x:152/2010, y:1597/2814, width:0.8292, height:0.0543, oneLine:true, font:'thunderman', size:0.0324, color:'white', conditionalColor:'White_Frame,Artifact_Frame,Multicolored_Frame,Colorless_Frame:black'},
		rules: {name:'Rules Text', text:'', x:0.086, y:0.6329, width:1679/2010, height:788/2814, size:0.0362},
		pt: {name:'Power/Toughness', text:'', x:1618/2010, y:2539/2814, width:254/2010, height:114/2814, size:0.0372, font:'thunderman', oneLine:true, align:'center'}
	});
}
//loads available frames
loadFramePack();