//defines available frames
availableFrames = [
	{name:'Vanguard Frame', src:'/img/frames/vanguard/vanguard.png'}
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = async function() {
	//resets things so that every frame doesn't have to
	await resetCardIrregularities();
	//sets card version
	card.version = 'vanguard';
	//art bounds
	card.artBounds = {x:0.1214, y:0.0991, width:0.7567, height:0.4767};
	autoFitArt();
	//set symbol bounds
	card.setSymbolBounds = {x:0.5, y:0.9458, width:0.0307, height:0.022, vertical:'center', horizontal: 'center'};
	resetSetSymbol();
	//watermark bounds
	card.watermarkBounds = {x:0.5, y:0.7762, width:0.75, height:0.2305};
	resetWatermark();
	//text
	loadTextOptions({
		mana: {name:'Mana Cost', text:'', y:0.0613, width:0.9292, height:71/2100, oneLine:true, size:71/1638, align:'right', shadowX:-0.001, shadowY:0.0029, manaCost:true, manaSpacing:0},
		title: {name:'Title', text:'', x:0.1767, y:0.0472, width:0.6467, height:0.0543, oneLine:true, font:'fritz-quadrata', size:0.0377, align:'center'},
		type: {name:'Type', text:'Character', x:0.1767, y:0.5762, width:0.6467, height:0.0543, oneLine:true, font:'fritz-quadrata', size:0.0262, align:'center'},
		flavor: {name:'Flavor Text', text:'', x:0.2067, y:0.7643, width:0.5867, height:0.1239, size:0.0272, font:'mplantini', italics: true},
		ability: {name:'Ability Text', text:'', x:0.12, y:0.6286, width:0.76, height:0.1167, size:0.0267, align:'center',  bold: true},
		leftval: {name:'Left Mod Value', text:'+0', x:0.1094, y:0.8386, width:0.0667, height:0.0524, size:0.0267, oneLine:true, align:'center'},
		rightval: {name:'Right Mod Value', text:'+0', x:0.824, y:0.8386, width:0.0667, height:0.0524, size:0.0267, oneLine:true, align:'center'},
		left: {name:'Left Mod Desc.', text:'Starting & Max. Hand Size', x:0.1114, y:0.7762, width:0.0667, height:0.0596, size:0.0124, align:'center'},
		right: {name:'Right Mod Desc.', text:'Starting Life', x:0.826, y:0.7762, width:0.0667, height:0.0596, size:0.0124, align:'center'}
	});
	//bottom info
	await loadBottomInfo({
		illus: {text:'Illus. {elemidinfo-artist}', x:0.0647, y:0.8977, width:0.8707, height:0.0171, font:'mplantin', size:0.0167, align:'center'},
		wizards: {name:'wizards', text:'\u2122 & \u00a9 1993—{elemidinfo-year} Wizards of the Coast, Inc.', x:0.0647, y:0.9134, width:0.8707, height:0.0167, font:'mplantin', size:0.0124, align:'center'},
		bottomLeft: {text:'NOT FOR SALE', x:0.0647, y:0.9719, width:0.8707, height:0.0143, oneLine:true, font:'mplantin', size:0.0143, color:'white', outlineWidth:0.003},
		bottomRight: {text:'CardConjurer.com', x:0.0647, y:0.972, width:0.8707, height:0.0143, oneLine:true, font:'mplantin', size:0.0143, color:'white', align:'right', outlineWidth:0.003}
	});
}
//loads available frames
loadFramePack();