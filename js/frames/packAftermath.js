//Create objects for common properties across available frames
var masks = [{src:'/img/frames/m15/aftermath/top.svg', name:'Top Half'}, {src:'/img/frames/m15/aftermath/bottom.svg', name:'Bottom Half'}];
//defines available frames
availableFrames = [
	{name:'White Frame', src:'/img/frames/m15/aftermath/w.png', masks:masks},
	{name:'Blue Frame', src:'/img/frames/m15/aftermath/u.png', masks:masks},
	{name:'Black Frame', src:'/img/frames/m15/aftermath/b.png', masks:masks},
	{name:'Red Frame', src:'/img/frames/m15/aftermath/r.png', masks:masks},
	{name:'Green Frame', src:'/img/frames/m15/aftermath/g.png', masks:masks},
	{name:'Multicolored Frame', src:'/img/frames/m15/aftermath/m.png', masks:masks},
	{name:'Artifact Frame', src:'/img/frames/m15/aftermath/a.png', masks:masks},
	{name:'Land Frame', src:'/img/frames/m15/aftermath/l.png', masks:masks}
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = async function() {
	// Notification
	notify('At this time, adding the second piece of art is not an option, unless added manually with external software. Apologies for the inconvenience!', 15);
	//resets things so that every frame doesn't have to
	await resetCardIrregularities();
	//sets card version
	card.version = 'aftermath';
	//art bounds
	card.artBounds = {x:0.076, y:0.1124, width:0.848, height:0.2234};
	autoFitArt();
	//set symbol bounds
	card.setSymbolBounds = {x:0.9213, y:0.371, width:0.12, height:0.0410, vertical:'center', horizontal: 'right'};
	resetSetSymbol();
	//watermark bounds
	card.watermarkBounds = {x:0.5, y:0.7762, width:0.75, height:0.2305};
	resetWatermark();
	//text
	loadTextOptions({
		mana: {name:'Mana Cost', text:'', y:0.0613, width:0.9292, height:71/2100, oneLine:true, size:71/1638, align:'right', shadowX:-0.001, shadowY:0.0029, manaCost:true, manaSpacing:0},
		title: {name:'Title 1', text:'', x:0.0854, y:0.0522, width:0.8292, height:0.0543, oneLine:true, font:'belerenb', size:0.0381},
		type: {name:'Type 1', text:'', x:0.0854, y:0.3467, width:0.8292, height:0.0543, oneLine:true, font:'belerenb', size:0.0324},
		rules: {name:'Rules Text 1', text:'', x:0.086, y:0.4139, width:0.828, height:0.12, size:0.0362},
		pt: {name:'Power/Toughness 1', text:'', x:0.4667, y:0.462, width:0.828, height:0.12, size:0.0286, font:'belerenbsc', oneLine:true, align:'center'},
		mana2: {name:'Mana Cost 2', text:'', x:0.9074, y:0.5039, width:0.58, height:71/2100, oneLine:true, size:71/1638, align:'right', shadowX:-0.001, shadowY:0.0029, manaCost:true, manaSpacing:0, rotation:90},
		title2: {name:'Title 2', text:'', x:0.92, y:0.5648, width:0.48, height:0.0543, oneLine:true, font:'belerenb', size:0.0381, rotation:90},
		type2: {name:'Type 2', text:'', x:0.7247, y:0.5648, width:0.48, height:0.3239, oneLine:true, font:'belerenb', size:0.0324, rotation:90},
		rules2: {name:'Rules Text 2', text:'', x:0.4494, y:0.57, width:0.47, height:0.2715, size:0.0362, rotation:90},
		pt2: {name:'Power/Toughness 2', text:'', x:0.1750, y:0.5900, width:0.828, height:0.12, size:0.0286, font:'belerenbsc', oneLine:true, align:'center', rotation:90}
	});
}
//loads available frames
loadFramePack();