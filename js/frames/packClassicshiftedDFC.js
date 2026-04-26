//Create objects for common properties across available frames
var bounds1 = {x:0.048, y:0.0367, width:0.0834, height:0.8805};
var bounds2 = {x:0.0314, y:0.8896, width:0.4354, height:0.041};
//defines available frames
availableFrames = [
	{name:'White MDFC Flipside', src:'/img/frames/custom/classicshifted/mdfc/w.png', bounds:bounds2},
	{name:'Blue MDFC Flipside', src:'/img/frames/custom/classicshifted/mdfc/u.png', bounds:bounds2},
	{name:'Black MDFC Flipside', src:'/img/frames/custom/classicshifted/mdfc/b.png', bounds:bounds2},
	{name:'Red MDFC Flipside', src:'/img/frames/custom/classicshifted/mdfc/r.png', bounds:bounds2},
	{name:'Green MDFC Flipside', src:'/img/frames/custom/classicshifted/mdfc/g.png', bounds:bounds2},
	{name:'Multicolored MDFC Flipside', src:'/img/frames/custom/classicshifted/mdfc/m.png', bounds:bounds2},
	{name:'Artifact MDFC Flipside', src:'/img/frames/custom/classicshifted/mdfc/a.png', bounds:bounds2},
	{name:'Colorless MDFC Flipside', src:'/img/frames/custom/classicshifted/mdfc/c.png', bounds:bounds2},
	{name:'Land MDFC Flipside', src:'/img/frames/custom/classicshifted/mdfc/l.png', bounds:bounds2},
	{name:'Front Face', src:'/img/frames/custom/classicshifted/mdfc/mdfcFront.png', bounds:bounds1},
	{name:'Back Face', src:'/img/frames/custom/classicshifted/mdfc/mdfcBack.png', bounds:bounds1}
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = async function() {
	//resets things so that every frame doesn't have to
	await resetCardIrregularities();
	//sets card version
	card.version = 'classicshifted';
	//art bounds
	card.artBounds = {x:0.08, y:0.0954, width:0.84, height:0.4653};
	autoFitArt();
	//set symbol bounds
	card.setSymbolBounds = {x:0.9213, y:0.5958, width:0.12, height:0.0410, vertical:'center', horizontal: 'right'};
	resetSetSymbol();
	//watermark bounds
	card.watermarkBounds = {x:0.5, y:0.7762, width:0.75, height:0.2305};
	resetWatermark();
	//text
	loadTextOptions({
		mana: {name:'Mana Cost', text:'', y:0.0462, width:0.9292, height:71/2100, oneLine:true, size:71/1638, align:'right', shadowX:-0.001, shadowY:0.0029, manaCost:true, manaSpacing:0},
		title: {name:'Title', text:'', x:0.14, y:0.0372, width:0.748, height:0.0543, oneLine:true, font:'belerenb', size:0.0381, color:'white', shadowX:0.002, shadowY:0.0015},
		type: {name:'Type', text:'', x:0.0854, y:0.571, width:0.8292, height:0.0543, oneLine:true, font:'belerenb', size:0.0324, color:'white', shadowX:0.002, shadowY:0.0015},
		rules: {name:'Rules Text', text:'', x:0.086, y:0.6329, width:0.828, height:0.2905, size:0.0362},
		flipsideType: {name:'Flipside Type', text:'', x:0.068, y:0.892, width:0.364, height:0.0391, size:0.0234, color:'white', oneLine:true, font:'belerenb'},
		flipSideReminder: {name:'Flipside Text', text:'', x:0.068, y:0.892, width:0.364, height:0.0391, size:0.0258, color:'white', oneLine:true, align:'right'},
		pt: {name:'Power/Toughness', text:'', x:0.7928, y:0.902, width:0.1367, height:0.0372, size:0.0372, font:'belerenbsc', oneLine:true, align:'center', color:'white', shadowX:0.002, shadowY:0.0015}
	});
}
//loads available frames
loadFramePack();