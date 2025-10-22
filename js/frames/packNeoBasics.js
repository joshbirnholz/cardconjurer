//Create objects for common properties across available frames
var masks = [{src:'/img/frames/neo/basics/border.svg', name:'Border'}];
var stretch = [
	{name:'outline', targets: [3, 11], change:[0, 0]},
	{name:'top', targets: [0, -2], change:[0, 0]},
	{name:'bottom', targets: [0], change:[0, 0]},
	{name:'symbol', targets: [0], change:[0, 0]}
];
// Notification
notify('When you load the Kamigawa Basics frame version, a "Kamigawa Basics" tab will appear. This tab allows you to control the height of the title bar.', 15);
//defines available frames
availableFrames = [
	{name:'White Frame', src:'/img/frames/neo/basics/w.svg', stretch:stretch, masks:masks},
	{name:'Blue Frame', src:'/img/frames/neo/basics/u.svg', stretch:stretch, masks:masks},
	{name:'Black Frame', src:'/img/frames/neo/basics/b.svg', stretch:stretch, masks:masks},
	{name:'Red Frame', src:'/img/frames/neo/basics/r.svg', stretch:stretch, masks:masks},
	{name:'Green Frame', src:'/img/frames/neo/basics/g.svg', stretch:stretch, masks:masks},
	{name:'Colorless Frame', src:'/img/frames/neo/basics/c.svg', stretch:stretch, masks:masks}
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