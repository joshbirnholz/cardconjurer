//Create objects for common properties across available frames
var masks = [{src:'/img/frames/cardbacks/outer.svg', name:'Outer Frame'}, {src:'/img/frames/cardbacks/inner.svg', name:'Inner Frame'}, {src:'/img/frames/cardbacks/border.svg', name:'Border'}];
//defines available frames
availableFrames = [
	{name:'Cardback', src:'/img/frames/cardbacks/cardback.png', masks:masks},
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = async function() {
	//resets things so that every frame doesn't have to
	await resetCardIrregularities();
	//sets card version
	card.version = 'cardback';
	//art bounds
	card.artBounds = {x:0, y:0, width:1, height:1};
	autoFitArt();
	//set symbol bounds
	card.setSymbolBounds = {x:2, y:2, width:0.12, height:0.0362, vertical:'center', horizontal: 'center'};
	resetSetSymbol();
	//watermark bounds
	card.watermarkBounds = {x:0.5, y:0.5, width:0.75, height:0.75};
	resetWatermark();
	//text
	loadTextOptions({
		title: {name:'Title', text:'', x:0.0474, y:0.7039, width:0.9054, height:0.0534, oneLine:true, font:'gothammedium', size:0.0534, color:'white', align:'center'},
	});	//bottom info
	loadBottomInfo({
		midLeft: {text:'{elemidinfo-set}*{elemidinfo-language}  {savex}{fontbelerenbsc}{fontsize' + scaleHeight(0.001) + '}{upinline' + scaleHeight(0.0005) + '}\uFFEE{elemidinfo-artist}', x:0.0647, y:0.9548 + 12/2100, width:0.8707, height:0.0171, oneLine:true, font:'gothammedium', size:0.0171, color:'white', outlineWidth:0.003},
		credit: {name:'wizards', text:'Designed by {elemidinfo-credit}', x:0.0647, y:0.9549 + 12/2100, width:0.8707, height:0.0167, oneLine:true, font:'mplantin', size:0.0162, color:'white', align:'right', outlineWidth:0.003}
	});
}
//loads available frames
loadFramePack();