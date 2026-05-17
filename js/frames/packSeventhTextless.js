//Create objects for common properties across available frames
var masks = [{src:'/img/frames/seventh/textless/seventhTextlessMaskPinline.png', name:'Pinline'}];
//defines available frames
availableFrames = [
	{name:'White Frame', src:'/img/frames/seventh/textless/seventhTextlessFrameW.png', masks:masks},
	{name:'Blue Frame', src:'/img/frames/seventh/textless/seventhTextlessFrameU.png', masks:masks},
	{name:'Black Frame', src:'/img/frames/seventh/textless/seventhTextlessFrameB.png', masks:masks},
	{name:'Red Frame', src:'/img/frames/seventh/textless/seventhTextlessFrameR.png', masks:masks},
	{name:'Green Frame', src:'/img/frames/seventh/textless/seventhTextlessFrameG.png', masks:masks},
	{name:'Multicolored Frame', src:'/img/frames/seventh/textless/seventhTextlessFrameM.png', masks:masks},
	{name:'Artifact Frame', src:'/img/frames/seventh/textless/seventhTextlessFrameA.png', masks:masks},
	{name:'Land Frame', src:'/img/frames/seventh/textless/seventhTextlessFrameL.png', masks:masks},
	{name:'Tombstone Icon', src:'/img/frames/old/icons/tombstone.svg', bounds: {x:0.0687, y:0.0491, width:0.0338, height:0.0329}},
	{name:'Textbox', src:'/img/frames/seventh/textless/textbox.svg', bounds:{x:0.116, y:0.5896, width:0.768, height:0.2858}}
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = async function() {
	//resets things so that every frame doesn't have to
	await resetCardIrregularities();
	//sets card version
	card.version = 'seventhTextless';
	//art bounds
	card.artBounds = {x:0.116, y:0.0977, width:0.768, height:0.7772};
	autoFitArt();
	//set symbol bounds
	card.setSymbolBounds = {x:0.8914, y:0.9224, width:0.12, height:0.0410, vertical:'center', horizontal: 'right'};
	resetSetSymbol();
	//watermark bounds
	card.watermarkBounds = {x:-1, y:-1, width:0.0007, height:0.0005};
	resetWatermark();
	//text
	loadTextOptions({
		mana: {name:'Mana Cost', text:'', x:0.108, y:0.0486, width:0.8147, height:72/2100, oneLine:true, size:72/1638, align:'right', manaCost:true, manaSpacing:0},
		title: {name:'Title', text:'', x:0.108, y:0.0448, width:0.784, height:0.0405, oneLine:true, font:'goudymedieval', size:0.0405, color:'white', shadowX:0.002, shadowY:0.0015},
		rules: {name:'Rules Text', text:'', x:0.128, y:0.6429, width:0.744, height:0.2381, size:0.0358, color:'white', shadowX:0.0014, shadowY:0.001},
		pt: {name:'Power/Toughness', text:'', x:0.8, y:0.8981, width:0.1367, height:0.0453, size:0.0453, oneLine:true, align:'center', color:'white', shadowX:0.002, shadowY:0.0015}
	});
	//bottom info
	loadBottomInfo({
		top: {text:'Illus: {elemidinfo-artist}', x:0.0614, y:0.8915, width:0.8774, height:0.0281, oneLine:true, size:0.0281, align:'center', shadowX:0.0014, shadowY:0.001, color:'white'},
		credit: {name:'wizards', text:'Designed by {elemidinfo-credit}', x:0.0614, y:0.921, width:0.8774, height:0.0172, oneLine:true, size:0.0172, align:'center', shadowX:0.0014, shadowY:0.001, color:'white'}
	});
}
//loads available frames
loadFramePack();
//Only for the main version as the webpage loads:
if (!card.text) {
	document.querySelector('#loadFrameVersion').click();
}