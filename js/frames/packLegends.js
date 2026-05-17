//defines available frames
availableFrames = [
	{name:'Multicolored Frame', src:'/img/frames/old/legends/m.png'}
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = async function() {
	//resets things so that every frame doesn't have to
	await resetCardIrregularities();
	//sets card version
	card.version = 'legends';
	card.showsFlavorBar = false;
	loadScript('/js/frames/manaSymbolsOld.js');
	//art bounds
	card.artBounds = {x:0.1074, y:0.0924, width:0.7854, height:0.4524};
	autoFitArt();
	//set symbol bounds
	card.setSymbolBounds = {x:0.8914, y:0.5777, width:0.12, height:0.0334, vertical:'center', horizontal: 'right'};
	resetSetSymbol();
	//watermark bounds
	card.watermarkBounds = {x:0.18, y:0.64, width:0.64, height:0.24};
	resetWatermark();
	//text
	loadTextOptions({
		mana: {name:'Mana Cost', text:'', x:0.108, y:0.0458, width:0.8147, height:72/2100, oneLine:true, size:72/1638, align:'right', manaCost:true, manaSpacing:0.0014, manaPrefix:'old'},
		title: {name:'Title', text:'', x:0.108, y:0.04, width:0.784, height:0.0405, oneLine:true, font:'goudymedieval', size:0.0405, color:'#dedede', shadowX:0.0027, shadowY:0.002},
		type: {name:'Type', text:'', x:0.108, y:0.5524, width:0.784, height:0.0543, oneLine:true, size:0.032, color:'#dedede', shadowX:0.002, shadowY:0.0015},
		rules: {name:'Rules Text', text:'', x:0.126, y:0.6081, width:0.748, height:0.2762, size:0.0362, manaPrefix:'old'},
		pt: {name:'Power/Toughness', text:'', x:0.8, y:0.91, width:0.1367, height:0.0453, size:0.0453, oneLine:true, align:'center', color:'#dedede', shadowX:0.0027, shadowY:0.002}
	});
	//bottom info
	loadBottomInfo({
		artist: {text:'Illus. \u00a9 {elemidinfo-artist}', x:0.1, y:0.92, width:0.7334, height:0.0277, oneLine:true, size:0.0277, align:'left', shadowX:0.0027, shadowY:0.002, color:'#dedede'}
	});
}
//loads available frames
loadFramePack();