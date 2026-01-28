//Create objects for common properties across available frames
var masks = [{src:'/img/frames/mysticalArchive/pinline.svg', name:'Pinline'}, {src:'/img/frames/mysticalArchive/pinlineRight.svg', name:'Pinline (Right)'}];
var bounds = {x:0, y:0, width:1, height:97/2100};
var ptBounds = {x:1135/1500, y:1848/2100, width:317/1500, height:159/2100};
// var ptMasks = [{src:'/img/frames/mysticalArchive/pt/maskOuter.png', name:'Outer'}, {src:'/img/frames/mysticalArchive/pt/maskInner.png', name:'Inner'}];
var ptMasks = [];
//defines available frames
availableFrames = [
	{name:'White Frame', src:'/img/frames/mysticalArchive/soa/w.png', masks:masks},
	{name:'Blue Frame', src:'/img/frames/mysticalArchive/soa/u.png', masks:masks},
	{name:'Black Frame', src:'/img/frames/mysticalArchive/soa/b.png', masks:masks},
	{name:'Red Frame', src:'/img/frames/mysticalArchive/soa/r.png', masks:masks},
	{name:'Green Frame', src:'/img/frames/mysticalArchive/soa/g.png', masks:masks},
	{name:'Multicolored Frame', src:'/img/frames/mysticalArchive/soa/m.png', masks:masks},
	{name:'Artifact Frame', src:'/img/frames/mysticalArchive/soa/a.png', masks:masks},
	{name:'Land Frame', src:'/img/frames/mysticalArchive/soa/c.png', masks:masks},
	{name:'White Power/Toughness', src:'/img/frames/mysticalArchive/pt/w.png', bounds:ptBounds, masks:ptMasks},
	{name:'Blue Power/Toughness', src:'/img/frames/mysticalArchive/pt/u.png', bounds:ptBounds, masks:ptMasks},
	{name:'Black Power/Toughness', src:'/img/frames/mysticalArchive/pt/b.png', bounds:ptBounds, masks:ptMasks},
	{name:'Red Power/Toughness', src:'/img/frames/mysticalArchive/pt/r.png', bounds:ptBounds, masks:ptMasks},
	{name:'Green Power/Toughness', src:'/img/frames/mysticalArchive/pt/g.png', bounds:ptBounds, masks:ptMasks},
	{name:'Multicolored Power/Toughness', src:'/img/frames/mysticalArchive/pt/m.png', bounds:ptBounds, masks:ptMasks},
	{name:'Artifact Power/Toughness', src:'/img/frames/mysticalArchive/pt/a.png', bounds:ptBounds, masks:ptMasks},
	{name:'Land Power/Toughness', src:'/img/frames/mysticalArchive/pt/c.png', bounds:ptBounds, masks:ptMasks},
	{name:'White Crown', src:'/img/frames/mysticalArchive/crowns/w.png', bounds: bounds},
	{name:'Blue Crown', src:'/img/frames/mysticalArchive/crowns/u.png', bounds: bounds},
	{name:'Black Crown', src:'/img/frames/mysticalArchive/crowns/b.png', bounds: bounds},
	{name:'Red Crown', src:'/img/frames/mysticalArchive/crowns/r.png', bounds: bounds},
	{name:'Green Crown', src:'/img/frames/mysticalArchive/crowns/g.png', bounds: bounds},
	{name:'Multicolored Crown', src:'/img/frames/mysticalArchive/crowns/m.png', bounds: bounds},
	{name:'Artifact Crown', src:'/img/frames/mysticalArchive/crowns/a.png', bounds: bounds},
	{name:'Land Crown', src:'/img/frames/mysticalArchive/crowns/c.png', bounds: bounds}
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = async function() {
	// notify("To change the color of your mana cost, use {manacolor#}, but replace '#' with your desired color. 'white', 'blue', 'black', 'red', and 'green', as well as hex/html color codes are currently supported.", 15)
	//resets things so that every frame doesn't have to
	await resetCardIrregularities();
	//sets card version
	card.version = 'mysticalArchiveSOA';
	// loadScript('/js/frames/manaSymbolsOutline.js');
	//art bounds
	card.artBounds = {x:0, y:127/2814, width:1, height:2487/2814};
	autoFitArt();
	//set symbol bounds
	card.setSymbolBounds = {x:0.9213, y:0.5910, width:0.12, height:0.0410, vertical:'center', horizontal: 'right'};
	resetSetSymbol();
	//watermark bounds
	card.watermarkBounds = {x:0.5, y:0.7762, width:0.75, height:0.2305};
	resetWatermark();
	//text
	loadTextOptions({
		mana: {name:'Mana Cost', text:'', y:0.0613, width:0.9292, height:71/2100, oneLine:true, size:71/1638, align:'right', shadowX:-0.001, shadowY:0.0029, manaCost:true, manaSpacing:0},
		title: {name:'Title', text:'', x:0.0854, y:0.0522, width:0.8292, height:0.0543, oneLine:true, font:'belerenb', size:0.0381, color:'white'},
		type: {name:'Type', text:'', x:0.0854, y:0.5664, width:0.8292, height:0.0543, oneLine:true, font:'belerenb', size:0.0324, color:'white'},
		rules: {name:'Rules Text', text:'', x:0.0934, y:0.6303, width:0.8134, height:0.2875, size:0.0362, color:'white'},
		pt: {name:'Power/Toughness', text:'', x:0.7928, y:0.902, width:0.1367, height:0.0372, size:0.0372, font:'belerenbsc', oneLine:true, align:'center'}
	});
}
//loads available frames
loadFramePack();