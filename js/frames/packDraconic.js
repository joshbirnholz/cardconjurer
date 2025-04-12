//Create objects for common properties across available frames
var masks = [];
var borderMasks = [{src:'/img/frames/draconic/pt/maskInner.png', name:'Inner Box'}, {src:'/img/frames/draconic/pt/maskBorder.png', name:'Border'}];
var ptBounds = {x:1519/2010, y:2363/2814, width:486/2010, height:309/2814};
var stampBounds = {x:792/2010, y:2517/2814, width:426/2010, height:184/2814};
//defines available frames
availableFrames = [
	{name:'White Frame', src:'/img/frames/draconic/w.png', masks:masks},
	{name:'Blue Frame', src:'/img/frames/draconic/u.png', masks:masks},
	{name:'Black Frame', src:'/img/frames/draconic/b.png', masks:masks},
	{name:'Red Frame', src:'/img/frames/draconic/r.png', masks:masks},
	{name:'Green Frame', src:'/img/frames/draconic/g.png', masks:masks},
	{name:'Multicolored Frame', src:'/img/frames/draconic/m.png', masks:masks},
	{name:'Artifact Frame', src:'/img/frames/draconic/a.png', masks:masks},
	{name:'Colorless Frame', src:'/img/frames/draconic/c.png', masks:masks},

	{name:'White Power/Toughness', src:'/img/frames/draconic/pt/w.png', bounds:ptBounds, masks: borderMasks},
	{name:'Blue Power/Toughness', src:'/img/frames/draconic/pt/u.png', bounds:ptBounds, masks: borderMasks},
	{name:'Black Power/Toughness', src:'/img/frames/draconic/pt/b.png', bounds:ptBounds, masks: borderMasks},
	{name:'Red Power/Toughness', src:'/img/frames/draconic/pt/r.png', bounds:ptBounds, masks: borderMasks},
	{name:'Green Power/Toughness', src:'/img/frames/draconic/pt/g.png', bounds:ptBounds, masks: borderMasks},
	{name:'Multicolored Power/Toughness', src:'/img/frames/draconic/pt/m.png', bounds:ptBounds, masks: borderMasks},
	{name:'Artifact Power/Toughness', src:'/img/frames/draconic/pt/a.png', bounds:ptBounds, masks: borderMasks},
	{name:'Colorless Power/Toughness', src:'/img/frames/draconic/pt/c.png', bounds:ptBounds, masks: borderMasks},

	{name:'White Holo Stamp', src:'/img/frames/draconic/stamp/w.png', bounds:stampBounds},
	{name:'Blue Holo Stamp', src:'/img/frames/draconic/stamp/u.png', bounds:stampBounds},
	{name:'Black Holo Stamp', src:'/img/frames/draconic/stamp/b.png', bounds:stampBounds},
	{name:'Red Holo Stamp', src:'/img/frames/draconic/stamp/r.png', bounds:stampBounds},
	{name:'Green Holo Stamp', src:'/img/frames/draconic/stamp/g.png', bounds:stampBounds},
	{name:'Multicolored Holo Stamp', src:'/img/frames/draconic/stamp/m.png', bounds:stampBounds},
	{name:'Artifact Holo Stamp', src:'/img/frames/draconic/stamp/a.png', bounds:stampBounds},
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = async function() {
	// notify("To change the color of your mana cost, use {manacolor#}, but replace '#' with your desired color. 'white', 'blue', 'black', 'red', and 'green', as well as hex/html color codes are currently supported.", 15)
	//resets things so that every frame doesn't have to
	await resetCardIrregularities();
	replacementMasks = {'Right Half':'img/frames/draconic/maskRightHalf.png'};
	//sets card version
	card.version = 'draconic';
	//art bounds
	card.artBounds = {x:66/2010, y:323/2814, width:1876/2010, height:1252/2814};
	autoFitArt();
	//set symbol bounds
	card.setSymbolBounds = {x:1386/1500, y:1234/2100, width:0.12, height:0.0410, vertical:'center', horizontal: 'right'};
	resetSetSymbol();
	//watermark bounds
	card.watermarkBounds = {x:0.5, y:0.7762, width:0.75, height:0.2305};
	resetWatermark();
	//text
	loadTextOptions({
		mana: {name:'Mana Cost', text:'', y:176/2814, width:1864/2010, height:71/2100, oneLine:true, size:70.5/1638, align:'right', shadowX:-0.001, shadowY:0.0029, manaCost:true, manaSpacing:0},
		title: {name:'Title', text:'', x:168/2010, y:145/2814, width:0.8292, height:0.0543, oneLine:true, font:'belerenb', size:0.0381},
		type: {name:'Type', text:'', x:168/2010, y:1588/2814, width:0.8292, height:0.0543, oneLine:true, font:'belerenb', size:0.0324},
		rules: {name:'Rules Text', text:'', x:0.086, y:1780/2814, width:0.828, height:0.2875, size:0.0362},
		pt: {name:'Power/Toughness', text:'', x:0.7928, y:0.902, width:0.1367, height:0.0372, size:0.0372, font:'belerenbsc', oneLine:true, align:'center'}
	});
}
//loads available frames
loadFramePack();