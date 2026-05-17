//defines available frames
availableFrames = [
	{name:'White Frame', src:'/img/frames/custom/deckCover/w.png'},
	{name:'Blue Frame', src:'/img/frames/custom/deckCover/u.png'},
	{name:'Black Frame', src:'/img/frames/custom/deckCover/b.png'},
	{name:'Red Frame', src:'/img/frames/custom/deckCover/r.png'},
	{name:'Green Frame', src:'/img/frames/custom/deckCover/g.png'},
	{name:'Multicolored Frame', src:'/img/frames/custom/deckCover/m.png'},
	{name:'Colorless Frame', src:'/img/frames/custom/deckCover/c.png'},
	{name:'White Mana Symbol', src:'/img/manaSymbols/w.svg', bounds:{x:0.1594, y:0.7529, width:0.06, height:0.0429}},
	{name:'Blue Mana Symbol', src:'/img/manaSymbols/u.svg', bounds:{x:0.23, y:0.7896, width:0.06, height:0.0429}},
	{name:'Black Mana Symbol', src:'/img/manaSymbols/b.svg', bounds:{x:0.2027, y:0.8486, width:0.06, height:0.0429}},
	{name:'Red Mana Symbol', src:'/img/manaSymbols/r.svg', bounds:{x:0.116, y:0.8486, width:0.06, height:0.0429}},
	{name:'Green Mana Symbol', src:'/img/manaSymbols/g.svg', bounds:{x:0.0887, y:0.7896, width:0.06, height:0.0429}}
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = async function() {
	//resets things so that every frame doesn't have to
	await resetCardIrregularities();
	//sets card version
	card.version = 'customQRCodeDeckCover';
	card.onload = '/js/frames/versionQRCode.js';
	loadScript('/js/frames/versionQRCode.js');
	//art bounds
	card.artBounds = {x:0, y:0, width:1, height:0.7162};
	autoFitArt();
	//set symbol bounds
	card.setSymbolBounds = {x:0.5, y:0.9681, width:0.12, height:0.0410, vertical:'center', horizontal: 'center'};
	resetSetSymbol();
	//watermark bounds
	card.watermarkBounds = {x:0.5, y:0.7762, width:0.75, height:0.2305};
	resetWatermark();
	//text
	loadTextOptions({
		title: {name:'Title', text:'', x:0.0474, y:0.0234, width:0.9054, height:0.0534, oneLine:true, font:'belerenb', size:0.0534, color:'white', align:'center', shadowX:0.0027, shadowY:0.002},
		notes: {name:'Description', text:'', x:0.69, y:0.7358, width:0.27, height:0.18, font:'belerenb', size:0.0362, color:'white', align:'center', shadowX:0.002, shadowY:0.0015}
	});
	//bottom info
	await loadBottomInfo({
		midLeft: {text:'{elemidinfo-set}*{elemidinfo-language}  {fontbelerenbsc}{fontsize' + scaleHeight(0.001) + '}{upinline' + scaleHeight(0.0005) + '}\uFFEE{elemidinfo-artist}', x:0.0647, y:0.9548, width:0.8707, height:0.0171, oneLine:true, font:'gothammedium', size:0.0171, color:'white', outlineWidth:0.003},
		credit: {name:'wizards', text:'Designed by {elemidinfo-credit}', x:0.0647, y:0.9549, width:0.8707, height:0.0167, oneLine:true, font:'mplantin', size:0.0162, color:'white', align:'right', outlineWidth:0.003}
	});
}
//loads available frames
loadFramePack();
