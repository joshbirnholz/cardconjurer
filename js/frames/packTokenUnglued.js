//defines available frames
availableFrames = [
	{name:'White Frame', src:'/img/frames/token/unglued/w.png'},
	{name:'Blue Frame', src:'/img/frames/token/unglued/u.png'},
	{name:'Black Frame', src:'/img/frames/token/unglued/b.png'},
	{name:'Red Frame', src:'/img/frames/token/unglued/r.png'},
	{name:'Green Frame', src:'/img/frames/token/unglued/g.png'},
	{name:'Multicolored Frame', src:'/img/frames/token/unglued/m.png'},
	{name:'Artifact Frame', src:'/img/frames/token/unglued/a.png'},
	{name:'Land Frame', src:'/img/frames/token/unglued/l.png'}
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = async function() {
	//resets things so that every frame doesn't have to
	await resetCardIrregularities();
	//sets card version
	card.version = 'tokenUnglued';
	//art bounds
	card.artBounds = {x:0.12, y:0.0972, width:0.76, height:0.7672};
	autoFitArt();
	//set symbol bounds
	card.setSymbolBounds = {x:0.8914, y:0.9224, width:0.12, height:0.0410, vertical:'center', horizontal: 'right'};
	resetSetSymbol();
	//watermark bounds
	card.watermarkBounds = {x:-2, y:-2, width:0.64, height:0.24};
	resetWatermark();
	//text
	loadTextOptions({
		pt: {name:'Power/Toughness', text:'', x:0.8074, y:0.9043, width:0.1367, height:0.0429, size:0.0429, oneLine:true, align:'center', color:'white', shadowX:0.002, shadowY:0.0015}
	});
	//bottom info
	loadBottomInfo({
		top: {text:'Illus: {elemidinfo-artist}', x:0.1, y:0.8829, width:0.8, height:0.0267, oneLine:true, size:0.0267, align:'center', shadowX:0.0021, shadowY:0.0015, color:'white'},
		credit: {name:'wizards', text:'Designed by {elemidinfo-credit}', x:0.1, y:0.912, width:0.8, height:0.0172, oneLine:true, size:0.0172, align:'center', shadowX:0.0014, shadowY:0.001, color:'white'}
	});
}
//loads available frames
loadFramePack();