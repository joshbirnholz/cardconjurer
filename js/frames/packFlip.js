//Create objects for common properties across available frames
var masks = [{src:'/img/frames/m15/flip/pinline.svg', name:'Pinline'}, {src:'/img/frames/m15/flip/twins.svg', name:'Twins'}, {src:'/img/frames/m15/flip/rules.svg', name:'Rules'}];
var masks2 = [{src:'/img/frames/topHalfSharp.svg', name:'Top PT'}, {src:'/img/frames/bottomHalfSharp.svg', name:'Bottom PT'}]
var bounds = {x:0.0374, y:0.2277, width:0.9067, height:0.4762};
//defines available frames
availableFrames = [
	{name:'White Frame', src:'/img/frames/m15/flip/w.png', masks:masks},
	{name:'Blue Frame', src:'/img/frames/m15/flip/u.png', masks:masks},
	{name:'Black Frame', src:'/img/frames/m15/flip/b.png', masks:masks},
	{name:'Red Frame', src:'/img/frames/m15/flip/r.png', masks:masks},
	{name:'Green Frame', src:'/img/frames/m15/flip/g.png', masks:masks},
	{name:'Multicolored Frame', src:'/img/frames/m15/flip/m.png', masks:masks},
	{name:'Artifact Frame', src:'/img/frames/m15/flip/a.png', masks:masks},
	{name:'Land Frame', src:'/img/frames/m15/flip/l.png', masks:masks},
	{name:'Colorless Frame', src:'/img/frames/m15/flip/c.png', masks:masks},
	{name:'Vehicle Frame', src:'/img/frames/m15/flip/v.png', masks:masks},
	{name:'White Power/Toughness', src:'/img/frames/m15/flip/wpt.png', bounds:bounds, masks:masks2},
	{name:'Blue Power/Toughness', src:'/img/frames/m15/flip/upt.png', bounds:bounds, masks:masks2},
	{name:'Black Power/Toughness', src:'/img/frames/m15/flip/bpt.png', bounds:bounds, masks:masks2},
	{name:'Red Power/Toughness', src:'/img/frames/m15/flip/rpt.png', bounds:bounds, masks:masks2},
	{name:'Green Power/Toughness', src:'/img/frames/m15/flip/gpt.png', bounds:bounds, masks:masks2},
	{name:'Multicolored Power/Toughness', src:'/img/frames/m15/flip/mpt.png', bounds:bounds, masks:masks2},
	{name:'Artifact Power/Toughness', src:'/img/frames/m15/flip/apt.png', bounds:bounds, masks:masks2},
	{name:'Land Power/Toughness', src:'/img/frames/m15/flip/lpt.png', bounds:bounds, masks:masks2},
	{name:'Colorless Power/Toughness', src:'/img/frames/m15/flip/cpt.png', bounds:bounds, masks:masks2},
	{name:'Vehicle Power/Toughness', src:'/img/frames/m15/flip/vpt.png', bounds:bounds, masks:masks2}
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = async function() {
	//resets things so that every frame doesn't have to
	await resetCardIrregularities();
	//sets card version
	card.version = 'flip';
	//art bounds
	card.artBounds = {x:0.0754, y:0.2962, width:0.8494, height:0.3315};
	autoFitArt();
	//set symbol bounds
	card.setSymbolBounds = {x:1855/2010, y:2707/2814, width:0.12, height:0.0410, vertical:'center', horizontal: 'right'};
	resetSetSymbol();
	//watermark bounds
	card.watermarkBounds = {x:0.5, y:0.7762, width:0.75, height:0.2305};
	resetWatermark();
	//text
	loadTextOptions({
		mana: {name:'Mana Cost', text:'', y:0.0477, width:0.9292, height:71/2100, oneLine:true, size:71/1638, align:'right', shadowX:-0.001, shadowY:0.0029, manaCost:true, manaSpacing:0},
		title: {name:'Title 1', text:'', x:0.0854, y:0.0386, width:0.8292, height:0.0543, oneLine:true, font:'belerenb', size:0.0381},
		type: {name:'Type 1', text:'', x:0.0854, y:0.2353, width:0.8292, height:0.0543, oneLine:true, font:'belerenb', size:0.0324},
		rules: {name:'Rules Text 1', text:'', x:0.086, y:0.102, width:0.828, height:0.12, size:0.0362},
		pt: {name:'Power/Toughness 1', text:'', x:0.8267, y:0.2448, width:0.0967, height:0.0372, size:0.0372, font:'belerenbsc', oneLine:true, align:'center'},
		mana2: {name:'Mana Cost 2', text:'', x:1, y:0.8778, width:0.9292, height:71/2100, oneLine:true, size:71/1638, align:'right', shadowX:-0.001, shadowY:0.0029, manaCost:true, manaSpacing:0, rotation:180},
		title2: {name:'Title 2', text:'', x:0.9147, y:0.8848, width:0.8292, height:0.0543, oneLine:true, font:'belerenb', size:0.0381, rotation:180},
		type2: {name:'Type 2', text:'', x:0.9147, y:0.6886, width:0.8292, height:0.0543, oneLine:true, font:'belerenb', size:0.0324, rotation:180}, 
		rules2: {name:'Rules Text 2', text:'', x:0.914, y:0.821, width:0.828, height:0.12, size:0.0362, rotation:180},
		pt2: {name:'Power/Toughness 2', text:'', x:0.1734, y:0.6791, width:0.0967, height:0.0372, size:0.0372, font:'belerenbsc', oneLine:true, align:'center', rotation:180}
	  });
	}
//loads available frames
loadFramePack();