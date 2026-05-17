//Create objects for common properties across available frames
//defines available frames
availableFrames = [
	{name:'White Frame', src:'/img/frames/old/fourth/w.png'},
	{name:'Blue Frame', src:'/img/frames/old/fourth/u.png'},
	{name:'Black Frame', src:'/img/frames/old/fourth/b.png'},
	{name:'Red Frame', src:'/img/frames/old/fourth/r.png'},
	{name:'Green Frame', src:'/img/frames/old/fourth/g.png'},
	{name:'Multicolored Frame', src:'/img/frames/old/fourth/m.png'},
	{name:'Artifact Frame', src:'/img/frames/old/fourth/a.png'},
	{name:'Land Frame', src:'/img/frames/old/fourth/l.png'},
	{name:'Black Border', src:'/img/frames/old/fourth/borderBlack.png'},
	{name:'White Border', src:'/img/frames/old/fourth/borderWhite.png'}
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = async function() {
	//resets things so that every frame doesn't have to
	await resetCardIrregularities();
	//sets card version
	card.version = 'fourth';
	card.showsFlavorBar = false;
	//art bounds
	card.artBounds = {x:0.1034, y:0.0886, width:0.794, height:0.4543};
	autoFitArt();
	//set symbol bounds
	card.setSymbolBounds = {x:0.9, y:0.5758, width:0.12, height:0.0362, vertical:'center', horizontal: 'right'};
	resetSetSymbol();
	//watermark bounds
	card.watermarkBounds = {x:0.18, y:0.64, width:0.64, height:0.24};
	resetWatermark();
	//text
	loadTextOptions({
		mana: {name:'Mana Cost', text:'', x:0.1067, y:0.0362, width:0.8174, height:72/2100, oneLine:true, size:72/1638, align:'right', manaCost:true},
		title: {name:'Title', text:'', x:0.0827, y:0.031, width:0.8347, height:0.041, oneLine:true, font:'goudymedieval', size:0.041, color:'white', shadowX:0.002, shadowY:0.0015},
		type: {name:'Type', text:'', x:0.0827, y:0.5486, width:0.8347, height:0.0543, oneLine:true, size:0.032, color:'white', shadowX:0.002, shadowY:0.0015},
		rules: {name:'Rules Text', text:'', x:0.128, y:0.6067, width:0.744, height:0.2724, size:0.0358, justify:'center'},
		pt: {name:'Power/Toughness', text:'', x:0.82, y:0.9058, width:0.1367, height:0.0429, size:0.0429, oneLine:true, align:'center', color:'white', shadowX:0.002, shadowY:0.0015}
	});
	//bottom info
	loadBottomInfo({
		top: {text:'Illus. {elemidinfo-artist}', x:0.1, y:1894/2100, width:0.8, height:0.0267, oneLine:true, size:0.0267, shadowX:0.0021, shadowY:0.0015, color:'white'},
		credit: {name:'wizards', text:'Designed by {elemidinfo-credit}', x:0.1, y:1955/2100, width:0.8, height:0.0172, oneLine:true, size:0.0172, shadowX:0.0014, shadowY:0.001, color:'white'}
	});
}
//loads available frames
loadFramePack();