//Create objects for common properties across available frames
var masks = [{src:'/img/frames/fable/masks/maskTitle.png', name:'Title'}, {src:'/img/frames/fable/masks/maskFrame.png', name:'Frame'}, {src:'/img/frames/fable/masks/maskNoBorder.png', name:'No Border'}, {src:'/img/frames/fable/masks/maskNoTitle.png', name:'No Title'}, {src:'/img/frames/fable/masks/maskBorder.png', name:'Border'}];
var ptBounds = {x:6/2010, y:11/2814, width:1, height:1};
var stampBounds = {x:805/2010, y:2500/2814, width:400/2010, height:125/2814};
//defines available frames
availableFrames = [
	{name:'White Frame', src:'/img/frames/fable/w.png', masks:masks},
	{name:'Blue Frame', src:'/img/frames/fable/u.png', masks:masks},
	{name:'Black Frame', src:'/img/frames/fable/b.png', masks:masks},
	{name:'Red Frame', src:'/img/frames/fable/r.png', masks:masks},
	{name:'Green Frame', src:'/img/frames/fable/g.png', masks:masks},
	{name:'Multicolored Frame', src:'/img/frames/fable/m.png', masks:masks},
	{name:'Artifact Frame', src:'/img/frames/fable/a.png', masks:masks},
//	{name:'Land Frame', src:'/img/frames/fable/L.png', masks:masks},

	{name:'White Power/Toughness', src:'/img/frames/fable/pt/w.png', bounds:ptBounds},
	{name:'Blue Power/Toughness', src:'/img/frames/fable/pt/u.png', bounds:ptBounds},
	{name:'Black Power/Toughness', src:'/img/frames/fable/pt/b.png', bounds:ptBounds},
	{name:'Red Power/Toughness', src:'/img/frames/fable/pt/r.png', bounds:ptBounds},
	{name:'Green Power/Toughness', src:'/img/frames/fable/pt/g.png', bounds:ptBounds},
	{name:'Multicolored Power/Toughness', src:'/img/frames/fable/pt/m.png', bounds:ptBounds},
	{name:'Artifact Power/Toughness', src:'/img/frames/fable/pt/a.png', bounds:ptBounds},
//	{name:'Land Power/Toughness', src:'/img/frames/fable/pt/L.png', bounds:ptBounds},

	{name:'White Holo Stamp', src:'/img/frames/fable/stamp/w.png', bounds:stampBounds},
	{name:'Blue Holo Stamp', src:'/img/frames/fable/stamp/u.png', bounds:stampBounds},
	{name:'Black Holo Stamp', src:'/img/frames/fable/stamp/b.png', bounds:stampBounds},
	{name:'Red Holo Stamp', src:'/img/frames/fable/stamp/r.png', bounds:stampBounds},
	{name:'Green Holo Stamp', src:'/img/frames/fable/stamp/g.png', bounds:stampBounds},
	{name:'Multicolored Holo Stamp', src:'/img/frames/fable/stamp/m.png', bounds:stampBounds},
	{name:'Artifact Holo Stamp', src:'/img/frames/fable/stamp/a.png', bounds:stampBounds},
//	{name:'Land Holo Stamp', src:'/img/frames/fable/stamp/L.png', bounds:stampBounds}
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = async function() {
	//resets things so that every frame doesn't have to
	await resetCardIrregularities();
	//sets card version
	card.version = 'fableECL';
	//art bounds
	card.artBounds = {x:0/2010, y:0/2814, width:2010/2010, height:1585/2814};
	autoFitArt();
	//set symbol bounds
	card.setSymbolBounds = {x:1845/2010, y:1240/2100, width:0.12, height:0.0410, vertical:'center', horizontal: 'right'};
	resetSetSymbol();
	//watermark bounds
	card.watermarkBounds = {x:0.5, y:0.7762, width:0.75, height:0.2305};
	resetWatermark();
	//text
	loadTextOptions({
		mana: {name:'Mana Cost', text:'', x:-34/2010, y:194/2814, width:1864/2010, height:71/2100, oneLine:true, size:70.5/1638, align:'right', shadowX:-0.001, shadowY:0.0029, manaCost:true, manaSpacing:0},
		title: {name:'Title', text:'', x:168/2010, y:163/2814, width:0.8292, height:0.0543, oneLine:true, font:'belerenb', size:0.0381},
		type: {name:'Type', text:'', x:168/2010, y:1588/2814, width:0.8292, height:0.0543, oneLine:true, font:'belerenb', size:0.0324},
		rules: {name:'Rules Text', text:'', x:187/2010, y:1780/2814, width:1650/2010, height:790/2814, size:0.0362},
		pt: {name:'Power/Toughness', text:'', x:0.7928, y:2532/2814, width:0.1367, height:0.0372, size:0.0372, font:'belerenbsc', oneLine:true, align:'center'}
	});
}
//loads available frames
loadFramePack();