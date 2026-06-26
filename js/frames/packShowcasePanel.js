//Create objects for common properties across available frames
var masks = [{src:'/img/frames/showcasePanel/masks/maskTitle.png', name:'Title'}, {src:'/img/frames/showcasePanel/masks/maskType.png', name:'Type'}, {src:'/img/frames/showcasePanel/masks/maskRules.png', name:'Rules'}, {src:'/img/frames/showcasePanel/masks/maskNoBorder.png', name:'No Border'}, {src:'/img/frames/showcasePanel/masks/maskBorder.png', name:'Border'}];
var ptBounds = {x:1536/2010, y:2490/2814, width:354/2010, height:188/2814};
var stampBounds = {x:812/2010, y:2500/2814, width:390/2010, height:110/2814};
//defines available frames
availableFrames = [
	{name:'White Frame', src:'/img/frames/showcasePanel/w.png', masks:masks},
	{name:'Blue Frame', src:'/img/frames/showcasePanel/u.png', masks:masks},
	{name:'Black Frame', src:'/img/frames/showcasePanel/b.png', masks:masks},
	{name:'Red Frame', src:'/img/frames/showcasePanel/r.png', masks:masks},
	{name:'Green Frame', src:'/img/frames/showcasePanel/g.png', masks:masks},
	{name:'Multicolored Frame', src:'/img/frames/showcasePanel/m.png', masks:masks},
	{name:'Artifact Frame', src:'/img/frames/showcasePanel/a.png', masks:masks},

	{name:'White Power/Toughness', src:'/img/frames/showcasePanel/pt/w.png', bounds:ptBounds},
	{name:'Blue Power/Toughness', src:'/img/frames/showcasePanel/pt/u.png', bounds:ptBounds},
	{name:'Black Power/Toughness', src:'/img/frames/showcasePanel/pt/b.png', bounds:ptBounds},
	{name:'Red Power/Toughness', src:'/img/frames/showcasePanel/pt/r.png', bounds:ptBounds},
	{name:'Green Power/Toughness', src:'/img/frames/showcasePanel/pt/g.png', bounds:ptBounds},
	{name:'Multicolored Power/Toughness', src:'/img/frames/showcasePanel/pt/m.png', bounds:ptBounds},
	{name:'Artifact Power/Toughness', src:'/img/frames/showcasePanel/pt/a.png', bounds:ptBounds},

	{name:'White Holo Stamp', src:'/img/frames/showcasePanel/stamp/w.png', bounds:stampBounds},
	{name:'Blue Holo Stamp', src:'/img/frames/showcasePanel/stamp/u.png', bounds:stampBounds},
	{name:'Black Holo Stamp', src:'/img/frames/showcasePanel/stamp/b.png', bounds:stampBounds},
	{name:'Red Holo Stamp', src:'/img/frames/showcasePanel/stamp/r.png', bounds:stampBounds},
	{name:'Green Holo Stamp', src:'/img/frames/showcasePanel/stamp/g.png', bounds:stampBounds},
	{name:'Multicolored Holo Stamp', src:'/img/frames/showcasePanel/stamp/m.png', bounds:stampBounds},
	{name:'Artifact Holo Stamp', src:'/img/frames/showcasePanel/stamp/a.png', bounds:stampBounds},
	{name:'Plain Holo Stamp', src:'/img/frames/m15/holoStamps/stamp.png', bounds:{x:916/2010, y:2555/2814, width:180/2010, height:90/2814}},
	{name:'Gray Holo Stamp', src:'/img/frames/m15/holoStamps/gray.png', bounds:{x:916/2010, y:2555/2814, width:180/2010, height:90/2814}}
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = async function() {
	//resets things so that every frame doesn't have to
	await resetCardIrregularities();
	//sets card version
	card.version = 'showcasePanel';
	//art bounds
	card.artBounds = {x:0/2010, y:0/2814, width:2010/2010, height:2532/2814};
	autoFitArt();
	//set symbol bounds
	card.setSymbolBounds = {x:1865/2010, y:1200/2100, width:0.12, height:0.0410, vertical:'center', horizontal: 'right'};
	resetSetSymbol();
	//watermark bounds
	card.watermarkBounds = {x:0.5, y:0.7762, width:0.75, height:0.2305};
	resetWatermark();
	//text
	loadTextOptions({
		mana: {name:'Mana Cost', text:'', x:28/2010, y:169/2814, width:1864/2010, height:71/2100, oneLine:true, size:70.5/1638, align:'right', shadowX:-0.001, shadowY:0.0029, manaCost:true, manaSpacing:0},
		title: {name:'Title', text:'', x:110/2010, y:142/2814, width:0.8292, height:0.0543, oneLine:true, font:'belerenb', size:0.0381},
		type: {name:'Type', text:'', x:110/2010, y:1543/2814, width:0.8292, height:0.0543, oneLine:true, font:'belerenb', size:0.0324},
		rules: {name:'Rules Text', text:'', x:150/2010, y:1780/2814, width:1710/2010, height:800/2814, size:0.0362},
		pt: {name:'Power/Toughness', text:'', x:1580/2010, y:2536/2814, width:0.1367, height:0.0372, size:0.0372, font:'belerenbsc', oneLine:true, align:'center'}
	});
}
//loads available frames
loadFramePack();