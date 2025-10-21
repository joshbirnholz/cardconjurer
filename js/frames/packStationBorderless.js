//Create objects for common properties across available frames
var masks = [{src:'/img/frames/m15/genericShowcase/m15GenericShowcaseMaskPinline.png', name:'Pinline'}, {src:'/img/frames/m15/regular/m15MaskTitle.png', name:'Title'}, {src:'/img/frames/m15/regular/m15MaskType.png', name:'Type'}, {src:'/img/frames/m15/regular/m15MaskRules.png', name:'Rules'}, {src:'/img/frames/m15/regular/m15MaskBorder.png', name:'Border'}];
//defines available frames
availableFrames = [
	{name:'White Frame', src:'/img/frames/m15/borderless/m15GenericShowcaseFrameW.png', masks:masks},
	{name:'Blue Frame', src:'/img/frames/m15/borderless/m15GenericShowcaseFrameU.png', masks:masks},
	{name:'Black Frame', src:'/img/frames/m15/borderless/m15GenericShowcaseFrameB.png', masks:masks},
	{name:'Red Frame', src:'/img/frames/m15/borderless/m15GenericShowcaseFrameR.png', masks:masks},
	{name:'Green Frame', src:'/img/frames/m15/borderless/m15GenericShowcaseFrameG.png', masks:masks},
	{name:'Multicolored Frame', src:'/img/frames/m15/borderless/m15GenericShowcaseFrameM.png', masks:masks},
	{name:'Artifact Frame', src:'/img/frames/m15/borderless/m15GenericShowcaseFrameA.png', masks:masks},
	{name:'Colorless Frame', src:'/img/frames/m15/borderless/m15GenericShowcaseFrameC.png', masks:masks},
	{name:'Land Frame', src:'/img/frames/m15/borderless/m15GenericShowcaseFrameL.png', masks:masks}
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = async function() {
	//resets things so that every frame doesn't have to
	await resetCardIrregularities();
	//sets card version
	card.version = 'stationBorderless';
	card.onload = '/js/frames/versionStation.js';

	// Initialize station canvases
	sizeCanvas('stationPreFrame');
	sizeCanvas('stationPostFrame');

	// Preserve existing station data AND current colors if they exist (for reloads)
	const existingStation = card.station || {};
	const preservedColors = existingStation.squares ? {
		square1Color: existingStation.squares[1]?.color,
		square2Color: existingStation.squares[2]?.color,
		square1Opacity: existingStation.squares[1]?.opacity,
		square2Opacity: existingStation.squares[2]?.opacity,
		colorModes: existingStation.colorModes || {},
		badgeValues: existingStation.badgeValues || ['', '', '']
	} : null;
	
	// Load the version file which will handle full initialization
	loadScript('/js/frames/versionStation.js');

	// Handle station data restoration and frame-specific settings
	setTimeout(() => {
		if (existingStation) {
			// Merge the existing data back after version file loads
			card.station = {
				...card.station, // Keep the initialized defaults
				...existingStation // Restore any existing customizations
			};
			
			// Restore preserved colors if they existed
			if (preservedColors && card.station.squares) {
				if (preservedColors.square1Color) {
					card.station.squares[1].color = preservedColors.square1Color;
					card.station.squares[1].opacity = preservedColors.square1Opacity;
				}
				if (preservedColors.square2Color) {
					card.station.squares[2].color = preservedColors.square2Color;
					card.station.squares[2].opacity = preservedColors.square2Opacity;
				}
				if (preservedColors.colorModes) {
					card.station.colorModes = preservedColors.colorModes;
				}
				if (preservedColors.badgeValues) {
					card.station.badgeValues = preservedColors.badgeValues;
				}
			}
		}
		
		// Apply borderless frame-specific settings
		if (card.station && card.station.squares) {
			card.station.borderlessXOffset = 1;
			card.station.squares[1].width = 1712;
			card.station.squares[1].x = 1;
			card.station.squares[2].width = 1712;
			card.station.squares[2].x = 1; //
		}
		
		// Update UI to reflect correct values
		if (typeof fixStationInputs === 'function') {
			fixStationInputs();
		}
		
		// Only reset if we don't have preserved colors
		if (!preservedColors && typeof resetStationSettings === 'function') {
			resetStationSettings();
		}
		
		// Only trigger color updates if we don't have preserved colors
		if (!preservedColors) {
			// Trigger color updates based on current mana
			if (card.text?.mana?.text && typeof updateBadgeImageFromMana === 'function') {
				updateBadgeImageFromMana();
				updatePTImageFromMana();
				updateSquareColorsFromMana();
			}
		}
		
		// Trigger redraw
		if (typeof stationEdited === 'function') {
			setTimeout(() => {
				stationEdited();
			}, 50);
		}
	}, 50);
	
	//art bounds
	card.artBounds = {x:0, y:0, width:1, height:0.9224};
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
		ability0: {name:'Ability 1', text:'', x:175/2010, y:1775/2814, width:1660/2010, height:280/2814, size:0.0295, color:'white'},
		ability1: {name:'Ability 2', text:'', x:175/2010, y:0.7, width:0.7467, height:0.0972, size:0.0295, color:'white'},
		ability2: {name:'Ability 3', text:'', x:0.18, y:0.83, width:0.7467, height:0.0972, size:0.0295, color:'white'},
		pt: {name:'Power/Toughness', text:'', x:0.7928, y:2, width:0.1367, height:0.0372, size:0.0372, font:'belerenbsc', oneLine:true, align:'center'}
	});
}
//loads available frames
loadFramePack();