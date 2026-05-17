//defines available frames
availableFrames = [
	{name:'Planar Frame (Phenomenon)', src:'/img/frames/planechase/phenomenon.png'},
	{name:'Planar Frame (1)', src:'/img/frames/planechase/tallest.png'},
	{name:'Planar Frame (2)', src:'/img/frames/planechase/taller.png'},
	{name:'Planar Frame (3)', src:'/img/frames/planechase/tall.png'},
	{name:'Planar Frame (4)', src:'/img/frames/planechase/short.png'},
	{name:'Planar Frame (5)', src:'/img/frames/planechase/shorter.png'},
	{name:'Planar Frame (6)', src:'/img/frames/planechase/shortest.png'}
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = async function() {
	notify('For the large chaos icon, use {planechase}. For smaller icons, use {chaos} and {planeswalker}.', 20);
	//resets things so that every frame doesn't have to
	var previousCardHeight = card.height
	await resetCardIrregularities({canvas:[3000, 2100, 0, 0]});
	//sets card version
	card.version = 'planechase';
	//rotation
	card.landscape = true;
	previewContext.translate(0, previousCardHeight / 2);
	previewContext.rotate(-Math.PI / 2);
	previewContext.scale(7/5, 5/7);
	//art bounds
	card.artBounds = {x:0.031, y:0.0434, width:0.9381, height:0.9147};
	autoFitArt();
	//set symbol bounds
	card.setSymbolBounds = {x:0.7772, y:0.694, width:0.12, height:0.0334, vertical:'center', horizontal: 'right'};
	resetSetSymbol();
	//watermark bounds
	card.watermarkBounds = {x:0.5, y:0.7762, width:0.75, height:0.2305};
	resetWatermark();
	//text
	loadTextOptions({
		title: {name:'Title', text:'', x:0.0854, y:0.0643, width:0.8292, height:0.0543, oneLine:true, font:'belerenb', size:0.0434, align:'center'},
		type: {name:'Type', text:'', x:0.2424, y:0.6658, width:0.5152, height:0.0543, oneLine:true, font:'belerenb', size:0.0339, align:'center'},
		rules: {name:'Rules Text', text:'', x:0.1158, y:0.7174, width:0.7684, height:0.2087, size:0.0362},
	});
	if (card.text.rules.text == '') {
		card.text.rules.text = '\n{planechase}Whenever you roll {chaos}, ';
	}
	//bottom info
		await loadBottomInfo({
			top: {text:'\uFFEE{elemidinfo-artist}', x:0.0647, y:0.9434, width:0.8707, height:0.0174, oneLine:true, font:'belerenbsc', size:0.0174, color:'white', outlineWidth:0.003, align:'center'},
			credit: {name:'wizards', text:'Designed by {elemidinfo-credit}', x:0.0647, y:0.9614, width:0.8707, height:0.0167, oneLine:true, font:'gothammedium', size:0.0162, color:'white', align:'center', outlineWidth:0.003}
		});
	//runs other necessary functions
	drawFrames();
}
//loads available frames
loadFramePack();