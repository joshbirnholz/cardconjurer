//Create objects for common properties across available frames
var masks = [{src:'/img/frames/neo/basics/masks/w.svg', name:'Plains Symbol'}];
var masks2 = [{src:'/img/frames/neo/basics/masks/u.svg', name:'Island Symbol'}];
var masks3 = [{src:'/img/frames/neo/basics/masks/b.svg', name:'Swamp Symbol'}];
var masks4 = [{src:'/img/frames/neo/basics/masks/r.svg', name:'Mountain Symbol'}];
var masks5 = [{src:'/img/frames/neo/basics/masks/g.svg', name:'Forest Symbol'}];
var masks6 = [{src:'/img/frames/neo/basics/masks/c.svg', name:'Colorless Symbol'}];
var stretch = [
	{name:'outline', targets: [3, 11], change:[0, 0]},
	{name:'top', targets: [0, -2], change:[0, 0]},
	{name:'bottom', targets: [0], change:[0, 0]},
	{name:'symbol', targets: [0], change:[0, 0]},
	{name:'Border', targets: [], change:[0, 0]}
];
// Notification
notify('When you load the Kamigawa Basics frame version, a "Kamigawa Basics" tab will appear. This tab allows you to control the height of the title bar.', 15);
//defines available frames
availableFrames = [
	{name:'White Frame', src:'/img/frames/neo/basics/w.svg', stretch:stretch, masks:masks},
	{name:'Blue Frame', src:'/img/frames/neo/basics/u.svg', stretch:stretch, masks:masks2},
	{name:'Black Frame', src:'/img/frames/neo/basics/b.svg', stretch:stretch, masks:masks3},
	{name:'Red Frame', src:'/img/frames/neo/basics/r.svg', stretch:stretch, masks:masks4},
	{name:'Green Frame', src:'/img/frames/neo/basics/g.svg', stretch:stretch, masks:masks5},
	{name:'Colorless Frame', src:'/img/frames/neo/basics/c.svg', stretch:stretch, masks:masks6}
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = async function() {
	//resets things so that every frame doesn't have to
	await resetCardIrregularities();
	//sets card version
	card.version = 'neoBasics';
	card.onload = '/js/frames/versionNeoBasics.js';
	loadScript('/js/frames/versionNeoBasics.js');
	//art bounds
	card.artBounds = {x:0, y:0, width:1, height:0.9286};
	autoFitArt();
	//set symbol bounds
	card.setSymbolBounds = {x:-1, y:-1, width:0, height:0, vertical:'center', horizontal: 'center'};
	resetSetSymbol();
	//watermark bounds
	card.watermarkBounds = {x:0.5, y:0.7705, width:0.75, height:0.2362};
	resetWatermark();
	//text
	loadTextOptions({
		title: {name:'Title', text:'', x:0.12, y:0.1048, width:0.1734, height:0.2381, font:'japanese-title', size:0.1191, align:'center', vertical:true, color:'white'}
	});
}
//loads available frames
loadFramePack();