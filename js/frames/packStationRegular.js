//Create objects for common properties across available frames
var masks = [{src:'/img/frames/m15/regular/m15MaskPinline.png', name:'Pinline'}, {src:'/img/frames/m15/regular/m15MaskTitle.png', name:'Title'}, {src:'/img/frames/m15/regular/m15MaskType.png', name:'Type'}, {src:'/img/frames/m15/regular/m15MaskRules.png', name:'Rules'}, {src:'/img/frames/m15/regular/m15MaskBorder.png', name:'Border'}];
//defines available frames
availableFrames = [
	{name:'White Frame', src:'/img/frames/station/w.png', masks:masks},
	{name:'Blue Frame', src:'/img/frames/station/u.png', masks:masks},
	{name:'Black Frame', src:'/img/frames/station/b.png', masks:masks},
	{name:'Red Frame', src:'/img/frames/station/r.png', masks:masks},
	{name:'Green Frame', src:'/img/frames/station/g.png', masks:masks},
	{name:'Multicolored Frame', src:'/img/frames/station/m.png', masks:masks},
	{name:'Artifact Frame', src:'/img/frames/station/a.png', masks:masks},
	{name:'Land Frame', src:'/img/frames/station/L.png', masks:masks},
	{name:'Eldrazi Frame', src:'/img/frames/station/e.png', masks:masks}
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = async function() {
	//resets things so that every frame doesn't have to
	await resetCardIrregularities();
	//sets card version
	card.version = 'stationRegular';
	card.onload = '/js/frames/versionStation.js';

	// Preserve existing station data
	const existingStation = card.station || {};

	// Load script
	await loadScript('/js/frames/versionStation.js');
	
	// Initialize station frame after script loads
	await initializeStationFrame('regular', existingStation);
	
	//art bounds
	card.artBounds = {x:0.068, y:0.027, width:0.864, height:0.9000};
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
		title: {name:'Title', text:'', x:0.0854, y:0.0522, width:0.8292, height:0.0543, oneLine:true, font:'belerenb', size:0.0381},
		type: {name:'Type', text:'', x:0.0854, y:0.5664, width:0.8292, height:0.0543, oneLine:true, font:'belerenb', size:0.0324},
		ability0: {name:'Ability 1', text:'', x:175/2010, y:1775/2814, width:1660/2010, height:280/2814, size:0.0295},
		ability1: {name:'Ability 2', text:'', x:175/2010, y:0.7, width:0.7467, height:0.0972, size:0.0295},
		ability2: {name:'Ability 3', text:'', x:0.18, y:0.83, width:0.7467, height:0.0972, size:0.0295},
		pt: {name:'Power/Toughness', text:'', x:0.7928, y:2, width:0.1367, height:0.0372, size:0.0372, font:'belerenbsc', oneLine:true, align:'center'}
	});
}
//loads available frames
loadFramePack();