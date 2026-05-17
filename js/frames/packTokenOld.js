//Create objects for common properties across available frames
var masks = [{src:'/img/frames/token/old/frame2.svg', name:'Colored Frame'}, {src:'/img/frames/token/old/text.svg', name:'Rules'}, {src:'/img/frames/token/old/frame.svg', name:'Generic Frame'}, {src:'/img/frames/token/old/border.svg', name:'Border'}];
//defines available frames
availableFrames = [
	{name:'White Frame', src:'/img/frames/token/old/w.png', masks:masks},
	{name:'Blue Frame', src:'/img/frames/token/old/u.png', masks:masks},
	{name:'Black Frame', src:'/img/frames/token/old/b.png', masks:masks},
	{name:'Red Frame', src:'/img/frames/token/old/r.png', masks:masks},
	{name:'Green Frame', src:'/img/frames/token/old/g.png', masks:masks},
	{name:'Multicolored Frame', src:'/img/frames/token/old/m.png', masks:masks},
	{name:'Artifact Frame', src:'/img/frames/token/old/a.png', masks:masks},
	{name:'Land Frame', src:'/img/frames/token/old/l.png', masks:masks},
	{name:'Colorless Frame', src:'/img/frames/token/old/c.png', masks:masks}
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = async function() {
	//resets things so that every frame doesn't have to
	await resetCardIrregularities();
	//sets card version
	card.version = 'tokenOld';
	//art bounds
	card.artBounds = {x:0.1154, y:0.1105, width:0.7694, height:0.51};
	autoFitArt();
	//set symbol bounds
	card.setSymbolBounds = {x:0.8494, y:0.6781, width:0.12, height:0.0372, vertical:'center', horizontal: 'right'};
	resetSetSymbol();
	//watermark bounds
	card.watermarkBounds = {x:0.18, y:0.64, width:0.64, height:0.24};
	resetWatermark();
	//text
	loadTextOptions({
		title: {name:'Title', text:'', x:0.1134, y:0.0505, width:0.7734, height:0.0477, oneLine:true, font:'mplantin', size:0.0477, color:'white', shadowX:0.002, shadowY:0.0015, kerning:0.0134, align:'center'},
		type: {name:'Type', text:'', x:0.156, y:0.6539, width:0.688, height:0.0543, oneLine:true, size:0.032, color:'white', shadowX:0.002, shadowY:0.0015},
		rules: {name:'Rules Text', text:'', x:0.18, y:0.7124, width:0.64, height:0.14, size:0.0358},
		pt: {name:'Power/Toughness', text:'', x:0.75, y:0.8753, width:0.1367, height:0.0429, size:0.0429, oneLine:true, align:'center', color:'white', shadowX:0.002, shadowY:0.0015}
	});
	//bottom info
	loadBottomInfo({
		top: {text:'Illus: {elemidinfo-artist}', x:0.1, y:0.8648, width:0.8, height:0.0267, oneLine:true, size:0.0267, align:'center', shadowX:0.0021, shadowY:0.0015, color:'white'},
		credit: {name:'wizards', text:'Designed by {elemidinfo-credit}', x:0.1, y:0.8929, width:0.8, height:0.0172, oneLine:true, size:0.0172, align:'center', shadowX:0.0014, shadowY:0.001, color:'white'}
	});
}
//loads available frames
loadFramePack();