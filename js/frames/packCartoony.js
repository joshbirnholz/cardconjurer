//defines available frames
availableFrames = [{src:'/img/blank.png', name:'none'}];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = async function() {
	//resets things so that every frame doesn't have to
	await resetCardIrregularities();
	//sets card version
	card.version = 'cartoony';
	loadScript('/js/frames/manaSymbolsCartoony.js');
	// notify('The Future version adds special mana symbols. To use them, place an "F" before the following mana symbols: wubrg, 0-20, x, and hybrid mana symbols.');
	//art bounds
	card.artBounds = {x:0, y:0, width:1, height:1};
	autoFitArt();
	//set symbol bounds
	card.setSymbolBounds = {x:0.5, y:0.9715, width:0.12, height:0.0358, vertical:'center', horizontal: 'center'};
	resetSetSymbol();
	//watermark bounds
	card.watermarkBounds = {x:0.5, y:0.7762, width:0.75, height:0.2305};
	resetWatermark();
	//text
	loadTextOptions({
		mana: {name:'Mana Cost', text:'', manaCost:true, noVerticalCenter:true, size:200/1638, manaPrefix:'c', manaLayout:[
			{max:1, size:1.26, pos:[[0.828, 0]]},
			{max:2, size:1, pos:[[0.7854, 0.0034], [0.8734, 0.03]]},
			{max:3, size:1, pos:[[0.7914, 0.0205], [0.8794, -0.01], [0.8734, 0.0548]]},
			{max:4, size:0.9, pos:[[0.7927, -0.0034], [0.88, 0.0086], [0.8054, 0.0553], [0.89, 0.0715]]},
			{max:7, size:0.8, pos:[[0.8687, -0.0034], [0.9007, 0.0439], [0.7934, -0.0043], [0.8274, 0.0434], [0.8667, 0.092], [0.7534, 0.04], [0.786, 0.09]]},
		]},
		title: {name:'Title', y:0.02, text:'', oneLine:true, font:'Acme-Regular', size:0.08, arcRadius:2, arcStart:-0.168, noVerticalCenter:true, outlineWidth:0.0048, color:'white'}, //, x:0.0854, width:0.8292, height:0.0543
		type: {name:'Type', text:'', x:0.0234, y:0.6205, width:0.9534, height:0.0543, oneLine:true, font:'belerenb', size:0.0491, color:'white', outlineWidth:0.0034, font:'Acme-Regular'},
		rules: {name:'Rules Text', text:'', x:0.0234, y:0.662, width:0.9534, height:0.3, size:0.0562, align:'center', color:'white', outlineWidth:0.0034, font:'Acme-Regular', manaImageScale:10/7, manaPrefix:'c'},
		pt: {name:'Power/Toughness', text:'', x:0.7928, y:0.902, width:0.1367, height:0.0372, size:0.062, font:'belerenbsc', oneLine:true, align:'center', color:'white', outlineWidth:0.0034, font:'Acme-Regular'},
		pronouns: {name:'Pronouns', text:'', x:0.0234, y:0.95, width:0.9534, height:0.05, size:0.03, align:'center', color:'white', outlineWidth:0.0034, font:'Acme-Regular', manaImageScale:10/7, manaPrefix:'c'},
	});
	//bottom info
	await loadBottomInfo({
		topLeft: {text:'Art: {elemidinfo-artist}', x:0.01, y:0.9572, width:0.98, height:0.0177, oneLine:true, font:'Acme-Regular', size:0.0177, color:'white', outlineWidth:0.003},
		bottomLeft: {text:'Sheepwave.com', x:0.03, y:0.9767, width:0.94, height:0.0177, oneLine:true, font:'Acme-Regular', size:0.0177, color:'white', outlineWidth:0.003},
		credit: {name:'wizards', text:'{ptshift0,0.0172}Designed by {elemidinfo-credit}', x:0.03, y:0.9767, width:0.94, height:0.0177, oneLine:true, font:'Acme-Regular', size:0.0177, color:'white', align:'right', outlineWidth:0.003}
	});
	setTimeout(bottomInfoEdited, 250);
}
//loads available frames
loadFramePack();