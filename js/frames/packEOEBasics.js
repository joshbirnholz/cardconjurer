//Create objects for common properties across available frames
var masks = [{src:'/img/frames/textless/eoe/masks/maskPinlines.png', name:'Pinlines'}, {src:'/img/frames/textless/eoe/masks/maskSymbol.png', name:'Mana Symbol'}, {src:'/img/frames/textless/eoe/masks/maskTitle.png', name:'Title'}, {src:'/img/frames/textless/eoe/masks/maskNoBorder.png', name:'No Border'}, {src:'/img/frames/textless/eoe/masks/maskBorder.png', name:'Border'}];
var masks2 = [{src:'/img/frames/textless/eoe/symbols/masks/maskLeft.png', name:'Left Half'},{src:'/img/frames/textless/eoe/symbols/masks/maskRight.png', name:'Right Half'}];
var bounds = {x:62/1500, y:1752/2100, width:168/1500, height:168/2100};
//defines available frames
availableFrames = [
	{name:'White Frame', src:'/img/frames/textless/eoe/w.png', masks:masks},
	{name:'Blue Frame', src:'/img/frames/textless/eoe/u.png', masks:masks},
	{name:'Black Frame', src:'/img/frames/textless/eoe/b.png', masks:masks},
	{name:'Red Frame', src:'/img/frames/textless/eoe/r.png', masks:masks},
	{name:'Green Frame', src:'/img/frames/textless/eoe/g.png', masks:masks},
	{name:'Multicolored Frame', src:'/img/frames/textless/eoe/m.png', masks:masks},
	{name:'Colorless Frame', src:'/img/frames/textless/eoe/a.png', masks:masks},
    {name:'Waste Frame', src:'/img/frames/textless/eoe/L.png', masks:masks},
	{name:'Black (Alt) Frame', src:'/img/frames/textless/eoe/bAlt.png', masks:masks},

	{name:'Plains Symbol', src:'/img/frames/textless/eoe/symbols/plains.png', masks:masks2},
	{name:'Island Symbol', src:'/img/frames/textless/eoe/symbols/island.png', masks:masks2},
	{name:'Swamp Symbol', src:'/img/frames/textless/eoe/symbols/swamp.png', masks:masks2},
	{name:'Mountain Symbol', src:'/img/frames/textless/eoe/symbols/mountain.png', masks:masks2},
	{name:'Forest Symbol', src:'/img/frames/textless/eoe/symbols/forest.png', masks:masks2},
	{name:'Mythic Symbol', src:'/img/frames/textless/eoe/symbols/mythic.png', masks:masks2},
	{name:'Waste Symbol', src:'/img/frames/textless/eoe/symbols/waste.png', masks:masks2}


];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = async function() {
	//resets things so that every frame doesn't have to
	await resetCardIrregularities();
	//sets card version
	card.version = 'eoeBasics';
	//art bounds
	card.artBounds = {x:0, y:0, width:1.05, height:0.9324};
	autoFitArt();
	//set symbol bounds
	card.setSymbolBounds = {x:0.9213, y:0.8739, width:0.12, height:0.0410, vertical:'center', horizontal: 'right'};
	resetSetSymbol();
	//watermark bounds
	card.watermarkBounds = {x:-1, y:-1, width:0.0007, height:0.0005};
	resetWatermark();
	//text
	loadTextOptions({
		title: {name:'Title', text:'', x:245/1500, y:0.8481, width:1400/2010, height:0.0543, align:'center', color:'white', oneLine:true, font:'belerenb', size:0.0324}
	});
}
//loads available frames
loadFramePack();