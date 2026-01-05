//Create objects for common properties across available frames
var bounds = {x:0, y:0, width:1, height:1};
//defines available frames
availableFrames = [
	{name:'Border Crop', src:'/img/frames/minimalist/borderCrop.png', bounds:bounds}

];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;

//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = async function() {
	//resets things so that every frame doesn't have to
	// Store existing text
	const savedText = {};
	if (card.text) {
		for (const key in card.text) {
			if (card.text[key] && card.text[key].text) {
				savedText[key] = card.text[key].text;
			}
		}
	}

	await resetCardIrregularities({canvas:[3264, 4440, 0, 0]});

	//sets card version
	card.version = 'Minimalist';
	card.onload = '/js/frames/versionMinimalist.js';
	await loadScript('/js/frames/versionMinimalist.js');
	await loadScript('/js/frames/manaSymbolsOutlineBright.js');
	
	// Notify user about included margin
	notify('Note: This Minimalist frame pack already includes margins - no additional margin frame needed.', 5);

	card.minimalist = {
		baseY: 0.935,
		minHeight: 0.10,
		maxHeight: 0.25,
		spacing: 0.05,
		currentHeight: 0.12,
		ctx: textContext,
	};

	// Initialize gradient options - this ensures the gradient system is enabled
	card.gradientOptions = {
		maxOpacity: 0.75
	};

	// Disable rounded corners for minimalist frame
	document.querySelector('#rounded-corners').checked = false;
	setRoundedCorners(false);

	//art bounds
	card.artBounds = {x:0, y:0, width:1, height:1};
	autoFitArt();
	
	//set symbol bounds
	card.setSymbolBounds = {x:0.91, y:0.635, width:0.12, height:0.0410, vertical:'center', horizontal: 'right'};
	resetSetSymbol();
	
	//watermark bounds
	card.watermarkBounds = {x:0.5, y:0.7762, width:0.75, height:0.2305};
	resetWatermark();

	loadTextOptions({
		mana: {
			name: 'Mana Cost', text: '', x: 0.090, y: card.minimalist.baseY - card.minimalist.currentHeight - card.minimalist.spacing - 0.12, width: 0.9190, height: 71/2100,
			oneLine: true, size: 71/1638, align: 'left', manaCost: true, manaSpacing: 0, manaPrefix: 'outlineBright'},
			title: {
				name: 'Title', text: '', x: 0.090, y: card.minimalist.baseY - card.minimalist.currentHeight -  card.minimalist.spacing - 0.08,width: 0.8292,
				height: 0.0543, oneLine: true, font: 'belerenb', size: 0.0381, color: 'white', align: 'left'},
			type: {
				name: 'Type', text: '', x: 0.0854, y: card.minimalist.baseY - card.minimalist.currentHeight - card.minimalist.spacing - 0.04, width: 0.71,
				height: 0.0543, oneLine: true, font: 'belerenb', size: 0.022, color: 'white', shadowX:0.0014, shadowY:0.001},
			rules: {
				name: 'Rules Text', text: '', x: 0.1139, y: card.minimalist.baseY - card.minimalist.currentHeight, width: 0.7720, height: card.minimalist.currentHeight,
				size: 0.029, font: 'Plantin MT Pro', color: 'white', oneLine: false, align: 'left', manaPrefix: 'outlineBright', shadowX:0.0014, shadowY:0.001},
			power: {
				name: 'Power', text: '', x: 0.754, y: 0.896, width: 0.0765, height: 0.049, size: 0.04,
				font: 'belerenbsc', oneLine: true, align: 'center', color: 'white', shadowX:0.0014, shadowY:0.001},
			toughness: {
				name: 'Toughness', text: '', x: 0.8700, y: 0.896, width: 0.0765, height: 0.049, size: 0.04,
				font: 'belerenbsc', oneLine: true, align: 'center', color: 'white', shadowX:0.0014, shadowY:0.001}
		}, true);

		//bottom info
		if (document.querySelector('#enableNewCollectorStyle').checked) {
			await loadBottomInfo({
				midLeft: {text:'{elemidinfo-set} \u2022 {elemidinfo-language}  {savex}{fontbelerenbsc}{fontsize' + scaleHeight(0.001) + '}{upinline' + scaleHeight(0.0005) + '}\uFFEE{savex2}{elemidinfo-artist}', x:0.090, y:0.9334, width:0.8707, height:0.0171, oneLine:true, font:'gothammedium', size:0.0171, color:'white', outlineWidth:0.003},
				topLeft: {text:'{elemidinfo-rarity} {kerning3}{elemidinfo-number}{kerning0}', x:0.090, y:0.9134, width:0.8707, height:0.0171, oneLine:true, font:'gothammedium', size:0.0171, color:'white', outlineWidth:0.003},
				note: {text:'{loadx}{elemidinfo-note}', x:0.090, y:0.9263, width:0.8707, height:0.0171, oneLine:true, font:'gothammedium', size:0.0171, color:'white', outlineWidth:0.003},
				bottomLeft: {text:'NOT FOR SALE', x:0.090, y:0.9605, width:0.8707, height:0.0143, oneLine:true, font:'gothammedium', size:0.0143, color:'white', outlineWidth:0.003},
				wizards: {name:'wizards', text:'{ptshift0,0.0172}\u2122 & \u00a9 {elemidinfo-year} Wizards of the Coast', x:0.090, y:0.9263, width:0.8707, height:0.0167, oneLine:true, font:'mplantin', size:0.0162, color:'white', align:'right', outlineWidth:0.003},
				bottomRight: {text:'{ptshift0,0.0172}CardConjurer.com', x:0.090, y:0.9434, width:0.8707, height:0.0143, oneLine:true, font:'mplantin', size:0.0143, color:'white', align:'right', outlineWidth:0.003}
			});
		} else {
			await loadBottomInfo({
				topLeft: {text:'{savex}{fontbelerenbsc}{fontsize' + scaleHeight(0.001) + '}{upinline' + scaleHeight(0.0005) + '}\uFFEE{savex2}{elemidinfo-artist}', x:0.090, y:0.9134, width:0.8707, height:0.0171, oneLine:true, font:'gothammedium', size:0.0171, color:'white', outlineWidth:0.003},
				midLeft: {text:'{kerning3}{elemidinfo-number}{kerning0}', x:0.090, y:0.9334, width:0.8707, height:0.0171, oneLine:true, font:'gothammedium', size:0.0171, color:'white', outlineWidth:0.003},
				bottomLeft: {text:'NOT FOR SALE', x:0.090, y:0.9605, width:0.8707, height:0.0143, oneLine:true, font:'gothammedium', size:0.0143, color:'white', outlineWidth:0.003},
				wizards: {name:'wizards', text:'{ptshift0,0.0172}\u2122 & \u00a9 {elemidinfo-year} Wizards of the Coast', x:0.090, y:0.9263, width:0.8707, height:0.0167, oneLine:true, font:'mplantin', size:0.0162, color:'white', align:'right', outlineWidth:0.003},
				bottomRight: {text:'{ptshift0,0.0172}CardConjurer.com', x:0.090, y:0.9334, width:0.8707, height:0.0143, oneLine:true, font:'mplantin', size:0.0143, color:'white', align:'right', outlineWidth:0.003}
			});
		}
		
		window.initializeMinimalistVersion(savedText);
	};

//loads available frames
loadFramePack();