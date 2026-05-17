loadFramePacks([
	{name:'Generic Frames', value:'FABRegular'},
	{name:'Class Frames', value:'FABClasses'},
	{name:'Hero Frames', value:'FABHeroes'},
	{name:'Fabled Frame', value:'FABFabled'},
	{name:'Talents', value:'disabled'},
	{name:'Light Frames', value:'FABLight'},
	{name:'Shadow Frames', value:'FABShadow'},
	{name:'Elemental Frames', value:'FABElemental'}
])

//For multiple Flesh and Blood packs
var LoadFABVersion = async () => {
	// notification
	notify('To use Flesh and Blood icons in card text, use {w}, {u}, {b}, {r}, or {g}. This may change in the future.', 15);
	//resets things so that every frame doesn't have to
	await resetCardIrregularities();
	//sets card version
	card.version = 'FABRegular';
	loadScript('/js/frames/manaSymbolsFAB.js');
	//art bounds
	card.artBounds = {x:0.0867, y:0.1258, width:0.8267, height:0.4796};
	autoFitArt();
	//set symbol bounds
	card.setSymbolBounds = {x:-1, y:-1, width:0.12, height:0.0410, vertical:'center', horizontal: 'right'};
	resetSetSymbol();
	//watermark bounds
	card.watermarkBounds = {x:0.5, y:0.7762, width:0.75, height:0.2305};
	resetWatermark();
	//text
	loadTextOptions({
		title: {name:'Title', text:'', x:0.19, y:0.0705, width:0.62, height:0.0405, oneLine:true, font:'amanda', size:0.0405, align:'center', manaPrefix:'fab'},
		type: {name:'Type', text:'', x:0.24, y:0.8977, width:0.52, height:0.0281, oneLine:true, font:'amanda', size:0.0281, align:'center', manaPrefix:'fab'},
		rules: {name:'Rules Text', text:'', x:0.12, y:0.6153, width:0.76, height:0.28, size:0.0281, font:'palatino', manaPrefix:'fab', lineSpacing:0.2},
		cost: {name:'Cost', text:'', x:0.854, y:0.0753, width:0.0534, height:0.031, size:0.031, font:'palatino', oneLine:true, align:'center', manaPrefix:'fab'},
		left: {name:'Left Stat', text:'', x:0.162, y:0.9124, width:0.0534, height:0.0358, size:0.0358, font:'palatino', oneLine:true, align:'center', manaPrefix:'fab'},
		right: {name:'Right Stat', text:'', x:0.7847, y:0.9124, width:0.0534, height:0.0358, size:0.0358, font:'palatino', oneLine:true, align:'center', manaPrefix:'fab'}
	});
	//bottom info
	await loadBottomInfo({
		regular: {text:'{kerning-2}{elemidinfo-rarity} {elemidinfo-set}{elemidinfo-number} {elemidinfo-artist} \u00a9 {elemidinfo-year} Legend Story Studios', x:0.25, y:1987/2100, width:0.5, height:0.0143, oneLine:true, font:'gothammedium', size:0.0143, color:'white', align:'center'}
	});
}
