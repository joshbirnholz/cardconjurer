//Create objects for common properties across available frames
var masks = [{src:'/img/frames/unfinity/mask/titlePinlines.png', name:'Title Pinlines'}, {src:'/img/frames/unfinity/mask/title.png', name:'Title'}, {src:'/img/frames/unfinity/mask/landSymbol.png', name:'Land Symbol'}, {src:'/img/frames/unstable/pinline.svg', name:'Bottom'}];
//defines available frames
availableFrames = [
	{name:'White Frame', src:'/img/frames/unfinity/w.png', masks:masks},
	{name:'Blue Frame', src:'/img/frames/unfinity/u.png', masks:masks},
	{name:'Black Frame', src:'/img/frames/unfinity/b.png', masks:masks},
	{name:'Red Frame', src:'/img/frames/unfinity/r.png', masks:masks},
	{name:'Green Frame', src:'/img/frames/unfinity/g.png', masks:masks},
	{name:'Multicolored Frame', src:'/img/frames/unfinity/m.png', masks:masks},
	{name:'Artifact Frame', src:'/img/frames/unfinity/a.png', masks:masks},
	{name:'Colorless Frame', src:'/img/frames/unfinity/c.png', masks:masks}
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = async function() {
	//resets things so that every frame doesn't have to
	await resetCardIrregularities();
	//sets card version
	card.version = 'unfinity';
	//art bounds
	card.artBounds = {x:0, y:0, width:1, height:0.9196};
	autoFitArt();
	//set symbol bounds
	card.setSymbolBounds = {x:0.5, y:-0.0639, width:0.12, height:0.0410, vertical:'center', horizontal: 'center'};
	resetSetSymbol();
	//watermark bounds
	card.watermarkBounds = {x:-1, y:-1, width:0.0007, height:0.0005};
	resetWatermark();
	//text
	loadTextOptions({
		title: {name:'Titles', text:'', x:0.0854, y:0.0522, width:0.8292, height:0.0543, oneLine:true, font:'belerenb', size:0.0381, color:'white'}
	});
}
//loads available frames
loadFramePack();