//defines available frames
availableFrames = [
	{name:'Frame', src:'/img/frames/token/jmpFront/j22Frame.png'}
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = async function() {
	//resets things so that every frame doesn't have to
	await resetCardIrregularities();
	//sets card version
	card.version = 'j22Front';
	//art bounds
	card.artBounds = {x:0.0474, y:0.0353, width:0.9054, height:0.9296};
	autoFitArt();
	//set symbol bounds
	card.setSymbolBounds = {x:0.5, y:0.9524, width:0.12, height:0.0410, vertical:'center', horizontal: 'center'};
	resetSetSymbol();
	//watermark bounds
	card.watermarkBounds = {x:0.5, y:0.7762, width:0.75, height:0.2305};
	resetWatermark();
	//text
	loadTextOptions({
		mana: {name:'Color Identity', text:'', y:1752/2100, width:1, height:100/2100, oneLine:true, size:100/1638, align:'center', manaCost:true, manaSpacing:0},
		title: {name:'Title', text:'', x:0.0474, y:1525/2100, width:0.9054, height:0.0534, oneLine:true, font:'gothammedium', size:0.0534, color:'white', align:'center'},
		subtitle: {name:'Subtitle', text:'', x:0.0474, y:1631/2100, width:0.9054, height:0.03, oneLine:true, font:'belerenbsc', size:0.03, color:'white', align:'center'}
	});
	//bottom info
	await loadBottomInfo({
		midLeft: {text:'{elemidinfo-set} \u2022 {elemidinfo-language}  {savex}{fontbelerenbsc}{fontsize' + scaleHeight(0.001) + '}{upinline' + scaleHeight(0.0005) + '}\uFFEE{savex2}{elemidinfo-artist}', x:0.0647, y:0.9548, width:0.8707, height:0.0171, oneLine:true, font:'gothammedium', size:0.0171, color:'white', outlineWidth:0.003},
		topLeft: {text:'{elemidinfo-number}  {loadx}{elemidinfo-rarity}', x:0.0647, y:0.9377, width:0.8707, height:0.0171, oneLine:true, font:'gothammedium', size:0.0171, color:'white', outlineWidth:0.003},
		note: {text:'{loadx2}{elemidinfo-note}', x:0.0647, y:0.9377, width:0.8707, height:0.0171, oneLine:true, font:'gothammedium', size:0.0171, color:'white', outlineWidth:0.003},
		credit: {name:'wizards', text:'{ptshift0,0.0172}Designed by {elemidinfo-credit}', x:0.91, y:0.9762, width:1.3014, height:0.0153, oneLine:true, font:'mplantin', size:0.0153, color:'white', align:'right', rotation:270}
	});
}
//loads available frame
loadFramePack();