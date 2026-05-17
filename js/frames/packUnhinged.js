//Create objects for common properties across available frames
var masks = [{src:'/img/frames/textless/unhinged/pinline.svg', name:'Pinline'}, {src:'/img/frames/textless/unhinged/title.svg', name:'Title'}];
//defines available frames
availableFrames = [
	{name:'White Frame', src:'/img/frames/textless/unhinged/w.png', masks:masks},
	{name:'Blue Frame', src:'/img/frames/textless/unhinged/u.png', masks:masks},
	{name:'Black Frame', src:'/img/frames/textless/unhinged/b.png', masks:masks},
	{name:'Red Frame', src:'/img/frames/textless/unhinged/r.png', masks:masks},
	{name:'Green Frame', src:'/img/frames/textless/unhinged/g.png', masks:masks},
	{name:'Multicolored Frame', src:'/img/frames/textless/unhinged/m.png', masks:masks},
	{name:'Artifact Frame', src:'/img/frames/textless/unhinged/a.png', masks:masks},
	{name:'Colorless Frame', src:'/img/frames/textless/unhinged/c.png', masks:masks}
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = async function() {
	//resets things so that every frame doesn't have to
	await resetCardIrregularities();
	//sets card version
	card.version = 'unhinged';
	//art bounds
	card.artBounds = {x:0.0734, y:0.0524, width:0.8534, height:0.8405};
	autoFitArt();
	//set symbol bounds
	card.setSymbolBounds = {x:0.9287, y:0.9339, width:0.12, height:0.0410, vertical:'center', horizontal: 'right'};
	resetSetSymbol();
	//watermark bounds
	card.watermarkBounds = {x:0.5, y:0.7762, width:0.75, height:0.2305};
	resetWatermark();
	//text
	loadTextOptions({
		title: {name:'Title', text:'', x:0.38, y:0.0248, width:0.24, height:0.0453, oneLine:true, size:0.0453, align:'center', font:'matrixb'}
	});
	//bottom info
	loadBottomInfo({
		top: {text:'{ptshift-0.1667,0}\uFFEE {elemidinfo-artist}', x:0.08, y:1898/2100, width:0.8107, height:0.0248, oneLine:true, font:'matrixb', size:0.0248, color:'white', shadowX:0.0007, shadowY:0.0005},
		credit: {name:'wizards', text:'{ptshift-0.1667,0}Designed by {elemidinfo-credit}', x:0.08, y:1954/2100, width:0.8107, height:0.0153, oneLine:true, font:'mplantin', size:0.0153, color:'white', shadowX:0.0007, shadowY:0.0005}
	});
}
//loads available frames
loadFramePack();