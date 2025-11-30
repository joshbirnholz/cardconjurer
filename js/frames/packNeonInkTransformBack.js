//Create objects for common properties across available frames
var masks = [{src:'/img/frames/neonInk/transform/back/masks/maskCrown.png', name:'Crown'}, {src:'/img/frames/neonInk/masks/maskTypePinlines.png', name:'Type Pinlines'}, {src:'/img/frames/neonInk/transform/back/masks/maskTitle.png', name:'Title'}, {src:'/img/frames/neonInk/masks/maskType.png', name:'Type'} ];
var masks2 = [{src:'/img/frames/neonInk/pt/masks/maskPinlines.png', name:'PT Pinlines'}];
var bounds = {x:0, y:0, width:1, height:1};
//defines available frames
availableFrames = [
	{name:'White Frame', src:'/img/frames/neonInk/transform/back/w.png', masks:masks},
	{name:'Blue Frame', src:'/img/frames/neonInk/transform/back/u.png', masks:masks},
	{name:'Black Frame', src:'/img/frames/neonInk/transform/back/b.png', masks:masks},
	{name:'Red Frame', src:'/img/frames/neonInk/transform/back/r.png', masks:masks},
	{name:'Green Frame', src:'/img/frames/neonInk/transform/back/g.png', masks:masks},
	{name:'Multicolored Frame', src:'/img/frames/neonInk/transform/back/m.png', masks:masks},
    {name:'Artifact Frame', src:'/img/frames/neonInk/transform/back/a.png', masks:masks},
	{name:'Colorless Frame', src:'/img/frames/neonInk/transform/back/c.png', masks:masks},
	{name:'Land Frame', src:'/img/frames/neonInk/transform/back/L.png', masks:masks},
    {name:'Black Frame (Alt)', src:'/img/frames/neonInk/transform/back/b(Alt).png', masks:masks},
	
	{name:'White Power/Toughness', src:'/img/frames/neonInk/pt/w.png', bounds:bounds, masks:masks2},
	{name:'Blue Power/Toughness', src:'/img/frames/neonInk/pt/u.png', bounds:bounds, masks:masks2},
	{name:'Black Power/Toughness', src:'/img/frames/neonInk/pt/b.png', bounds:bounds, masks:masks2},
	{name:'Red Power/Toughness', src:'/img/frames/neonInk/pt/r.png', bounds:bounds, masks:masks2},
	{name:'Green Power/Toughness', src:'/img/frames/neonInk/pt/g.png', bounds:bounds, masks:masks2},
	{name:'Multicolored Power/Toughness', src:'/img/frames/neonInk/pt/m.png', bounds:bounds, masks:masks2},
    {name:'Artifact Power/Toughness', src:'/img/frames/neonInk/pt/a.png', bounds:bounds, masks:masks2},
	{name:'Colorless Power/Toughness', src:'/img/frames/neonInk/pt/c.png', bounds:bounds, masks:masks2},
	{name:'Vehicle Power/Toughness', src:'/img/frames/neonInk/pt/v.png', bounds:bounds, masks:masks2},
	{name:'Land Power/Toughness', src:'/img/frames/neonInk/pt/L.png', bounds:bounds, masks:masks2},
    {name:'Black Power/Toughness (Alt)', src:'/img/frames/neonInk/pt/b(Alt).png', bounds:bounds, masks:masks2}
    
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = async function() {
	//resets things so that every frame doesn't have to
	await resetCardIrregularities();
	//sets card version
	card.version = 'neonInk';
	//art bounds
	card.artBounds = {x:0, y:0, width:1, height:1};
	autoFitArt();
	//set symbol bounds
	card.setSymbolBounds = {x:0.9213, y:0.8570, width:0.12, height:0.0410, vertical:'center', horizontal: 'right'};
	resetSetSymbol();
	//watermark bounds
	card.watermarkBounds = {x:0.5, y:0.6922, width:0.75, height:0.2305};
	resetWatermark();
	//text
	loadTextOptions({
		mana: {name:'Mana Cost', text:'', x:-190/2010, y:197/2814, width:0.9292, height:71/2100, oneLine:true, size:71/1638, align:'right', shadowX:-0.001, shadowY:0.0029, manaCost:true, manaSpacing:0},
		title: {name:'Title', text:'', x:0.0854, y:163/2814, width:0.8292, height:0.0543, shadowX:-0.0015, shadowY:0.001, oneLine:true, font:'belerenb', size:0.0381, color:'white'},
		type: {name:'Type (Left)', text:'', x:0.0854, y:2342/2814, width:0.8292, height:0.0543, shadowX:-0.0015, shadowY:0.001, oneLine:true, font:'belerenb', size:0.0324, color:'white'},
		rules: {name:'Rules Text', text:'', x:0.086, y:1600/2814, width:0.828, height:0.2455, shadowX:-0.0015, shadowY:0.001, size:0.0362, color:'white'},
		pt: {name:'Power/Toughness', text:'', x:0.7928, y:2526/2814, width:0.1367, height:0.0372, size:0.0372, shadowX:-0.0015, shadowY:0.001, font:'belerenbsc', oneLine:true, align:'center', color:'white'}
	});
}
//loads available frames
loadFramePack();