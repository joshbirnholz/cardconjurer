//Create objects for common properties across available frames
var masks = [{src:'/img/frames/dragonHoard/masks/maskRules.png', name:'Rules'}];
var Bounds = {x:-88/2010, y:-80/2814, width:2187/2010, height:2975/2814};
var stampBounds = {x:891/2010, y:2536/2814, width:234/2010, height:55/2814};
//defines available frames
availableFrames = [
	{name:'White Frame', src:'/img/frames/dragonHoard/w.png', bounds:Bounds, masks:masks},
	{name:'Blue Frame', src:'/img/frames/dragonHoard/u.png', bounds:Bounds, masks:masks},
	{name:'Black Frame', src:'/img/frames/dragonHoard/b.png', bounds:Bounds, masks:masks},
	{name:'Red Frame', src:'/img/frames/dragonHoard/r.png', bounds:Bounds, masks:masks},
	{name:'Green Frame', src:'/img/frames/dragonHoard/g.png', bounds:Bounds, masks:masks},
	{name:'Multicolored Frame', src:'/img/frames/dragonHoard/m.png', bounds:Bounds, masks:masks},
	{name:'Artifact Frame', src:'/img/frames/dragonHoard/a.png', bounds:Bounds, masks:masks},
	{name:'Land Frame', src:'/img/frames/dragonHoard/l.png', bounds:Bounds, masks:masks},

	{name:'White Power/Toughness', src:'/img/frames/dragonHoard/pt/w.png', bounds:Bounds},
	{name:'Blue Power/Toughness', src:'/img/frames/dragonHoard/pt/u.png', bounds:Bounds},
	{name:'Black Power/Toughness', src:'/img/frames/dragonHoard/pt/b.png', bounds:Bounds},
	{name:'Red Power/Toughness', src:'/img/frames/dragonHoard/pt/r.png', bounds:Bounds},
	{name:'Green Power/Toughness', src:'/img/frames/dragonHoard/pt/g.png', bounds:Bounds},
	{name:'Multicolored Power/Toughness', src:'/img/frames/dragonHoard/pt/m.png', bounds:Bounds},
	{name:'Artifact Power/Toughness', src:'/img/frames/dragonHoard/pt/a.png', bounds:Bounds},
	{name:'Land Power/Toughness', src:'/img/frames/dragonHoard/pt/l.png', bounds:Bounds},

	{name:'Plain Holo Stamp', src:'/img/frames/m15/holoStamps/stamp.png', bounds:{x:920/2010, y:2553/2814, width:0.0894, height:0.0320}},
	{name:'Gray Holo Stamp', src:'/img/frames/m15/holoStamps/gray.png', bounds:{x:920/2010, y:2553/2814, width:0.0894, height:0.0320}},
	{name:'White Holo Stamp', src:'/img/frames/dragonHoard/stamp/w.png', bounds:stampBounds},
	{name:'Blue Holo Stamp', src:'/img/frames/dragonHoard/stamp/u.png', bounds:stampBounds},
	{name:'Black Holo Stamp', src:'/img/frames/dragonHoard/stamp/b.png', bounds:stampBounds},
	{name:'Red Holo Stamp', src:'/img/frames/dragonHoard/stamp/r.png', bounds:stampBounds},
	{name:'Green Holo Stamp', src:'/img/frames/dragonHoard/stamp/g.png', bounds:stampBounds},
	{name:'Multicolored Holo Stamp', src:'/img/frames/dragonHoard/stamp/m.png', bounds:stampBounds},
	{name:'Artifact Holo Stamp', src:'/img/frames/dragonHoard/stamp/a.png', bounds:stampBounds},
	{name:'Land Holo Stamp', src:'/img/frames/dragonHoard/stamp/l.png', bounds:stampBounds}
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = async function() {
	//resets things so that every frame doesn't have to
	await resetCardIrregularities();
	//sets card version
	card.version = 'dragonHoard';
	//art bounds
	card.artBounds = {x:0, y:0/2814, width:1, height:1570/2814};
	autoFitArt();
	//set symbol bounds
	card.setSymbolBounds = {x:1822/2010, y:1648/2814, width:241/2010, height:125/2814, vertical:'center', horizontal: 'right'};
	resetSetSymbol();
	//watermark bounds
	card.watermarkBounds = {x:1005/2010, y:2184/2814, width:1508/2010, height:649/2814};
	resetWatermark();
	//text
	loadTextOptions({
		mana: {name:'Mana Cost', text:'', x:-15/2010, y:206/2814, width:0.9292, height:71/2100, oneLine:true, size:71/1638, align:'right', shadowX:-0.001, shadowY:0.0029, manaCost:true, manaSpacing:0},
		title: {name:'Title', text:'', x:183/2010, y:183/2814, width:0.8292, height:0.0543, oneLine:true, font:'belerenb', size:0.0381},
		type: {name:'Type', text:'', x:188/2010, y:1576/2814, width:0.8292, height:0.0543, oneLine:true, font:'belerenb', size:0.0324, color:'white'},
		//maskSrc wraps the rules text to the shape in the mask image
		rules: {name:'Rules Text', text:'', x:100/2010, y:1790/2814, width:1820/2010, height:768/2814, size:0.0362, maskSrc:masks[0].src},
		pt: {name:'Power/Toughness', text:'', x:1592/2010, y:2529/2814, width:0.1367, height:0.0372, size:0.0372, font:'belerenbsc', oneLine:true, align:'center', color:'white'}
	});
}
//loads available frames
loadFramePack();