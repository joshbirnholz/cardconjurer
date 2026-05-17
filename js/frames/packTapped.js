//Create objects for common properties across available frames
var masks = [{src:'/img/frames/custom/tapped/pinline.svg', name:'Pinline'}, {src:'/img/frames/custom/tapped/title.svg', name:'Title'}, {src:'/img/frames/custom/tapped/type.svg', name:'Type'}, {src:'/img/frames/custom/tapped/text.svg', name:'Textbox'}, {src:'/img/frames/custom/tapped/border.svg', name:'Border'}];
//defines available frames
availableFrames = [
	{name:'White Frame', src:'/img/frames/custom/tapped/w.png', masks:masks},
	{name:'Blue Frame', src:'/img/frames/custom/tapped/u.png', masks:masks},
	{name:'Black Frame', src:'/img/frames/custom/tapped/b.png', masks:masks},
	{name:'Red Frame', src:'/img/frames/custom/tapped/r.png', masks:masks},
	{name:'Green Frame', src:'/img/frames/custom/tapped/g.png', masks:masks},
	{name:'Multicolored Frame', src:'/img/frames/custom/tapped/m.png', masks:masks},
	{name:'Artifact Frame', src:'/img/frames/custom/tapped/a.png', masks:masks},
	{name:'Land Frame', src:'/img/frames/custom/tapped/l.png', masks:masks}
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = async function() {
	//resets things so that every frame doesn't have to
	var previousCardHeight = card.height
	await resetCardIrregularities({canvas:[2100, 1500, 0, 0]});
	replacementMasks = {'Right Half':'/img/frames/custom/tapped/rightHalf.png'};
	//sets card version
	card.version = 'tapped';
	//rotation
	card.landscape = true;
	previewContext.translate(0, previousCardHeight / 2);
	previewContext.rotate(-Math.PI / 2);
	previewContext.scale(7/5, 5/7);
	//art bounds
	card.artBounds = {x:0.0281, y:0.0394, width:0.9439, height:0.8614};
	autoFitArt();
	//set symbol bounds
	card.setSymbolBounds = {x:0.9439, y:0.8927, width:0.0858, height:0.0467, vertical:'center', horizontal: 'right'};
	resetSetSymbol();
	//watermark bounds
	card.watermarkBounds = {x:0.7253, y:0.5, width:0.381, height:0.5667};
	resetWatermark();
	//text
	loadTextOptions({
		title: {name:'Title', text:'', x:0.5153, y:0.0814, width:0.4181, height:0.0607, oneLine:true, font:'belerenb', size:0.0607},
		type: {name:'Type', text:'', x:0.5153, y:0.8707, width:0.4181, height:0.0474, oneLine:true, font:'belerenb', size:0.0474},
		rules: {name:'Rules Text', text:'', x:0.5191, y:0.1634, width:0.4096, height:0.6734, size:0.0507},
		additional: {name:'Extra Textbox', text:`Adjust Life{i}{lns}{up${scaleHeight(0.01)}}{bar}{lns}{right}{fontsize-${scaleHeight(0.0067)}}Revived — 20{lns}Survived — +10`, x:0.1286, width:0.2739, y:0.64, height:0.2534, size:0.0607, color:'white', align:'center'}
	});
	//bottom info
	await loadBottomInfo({
		midLeft: {text:'{elemidinfo-set}*{elemidinfo-language}  {savex}{fontbelerenbsc}{fontsize' + scaleHeight(0.001) + '}{upinline' + scaleHeight(0.0005) + '}\uFFEE{elemidinfo-artist}', x:0.0462, y:0.9367, width:0.9077, height:0.024, oneLine:true, font:'gothammedium', size:0.024, color:'white', outlineWidth:0.003},
		topLeft: {text:'{elemidinfo-number}  {loadx}{elemidinfo-rarity}', x:0.0462, y:0.9127, width:0.9077, height:0.024, oneLine:true, font:'gothammedium', size:0.024, color:'white', outlineWidth:0.003},
		credit: {name:'wizards', text:'Designed by {elemidinfo-credit}', x:0.0462, y:0.9607, width:0.9077, height:0.0227, oneLine:true, font:'mplantin', size:0.0227, color:'white', align:'right', outlineWidth:0.003}
	});
	//runs other necessary functions
	drawFrames();
}
//loads available frames
loadFramePack();