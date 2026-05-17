//Create objects for common properties across available frames
var masks = [{src:'/img/frames/old/abu/dualLand.png', name:'Dual Land'}];
var masks2 = [{src:'/img/frames/old/abu/border.svg', name:'ABU Border'}];
//defines available frames
availableFrames = [
	{name:'White Frame', src:'/img/frames/old/abu/w.png'},
	{name:'Blue Frame', src:'/img/frames/old/abu/u.png'},
	{name:'Black Frame', src:'/img/frames/old/abu/b.png'},
	{name:'Red Frame', src:'/img/frames/old/abu/r.png'},
	{name:'Green Frame', src:'/img/frames/old/abu/g.png'},
	{name:'Artifact Frame', src:'/img/frames/old/abu/a.png'},
	{name:'Land Frame', src:'/img/frames/old/abu/l.png', masks:masks},
	{name:'White Land Frame', src:'/img/frames/old/abu/wl.png', masks:masks},
	{name:'Blue Land Frame', src:'/img/frames/old/abu/ul.png', masks:masks},
	{name:'Black Land Frame', src:'/img/frames/old/abu/bl.png', masks:masks},
	{name:'Red Land Frame', src:'/img/frames/old/abu/rl.png', masks:masks},
	{name:'Green Land Frame', src:'/img/frames/old/abu/gl.png', masks:masks},
	{name:'Pure Black Border', src:'/img/black.png', masks:masks2, noDefaultMask:true},
	{name:'White Border', src:'/img/frames/white.png', masks:masks2, noDefaultMask:true},
	{name:'Silver Border', src:'/img/frames/silver.png', masks:masks2, noDefaultMask:true},
	{name:'Gold Border', src:'/img/frames/gold.png', masks:masks2, noDefaultMask:true}
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = async function() {
	//resets things so that every frame doesn't have to
	await resetCardIrregularities();
	//sets card version
	card.version = 'abu';
	card.showsFlavorBar = false;
	loadScript('/js/frames/manaSymbolsOld.js');
	//art bounds
	card.artBounds = {x:0.116, y:0.1043, width:0.7654, height:0.441};
	autoFitArt();
	//set symbol bounds
	card.setSymbolBounds = {x:0.8914, y:0.5758, width:0.12, height:0.0353, vertical:'center', horizontal: 'right'};
	resetSetSymbol();
	//watermark bounds
	card.watermarkBounds = {x:0.18, y:0.64, width:0.64, height:0.24};
	resetWatermark();
	//text
	loadTextOptions({
		mana: {name:'Mana Cost', text:'', x:0.07, y:0.0572, width:0.8467, height:74/2100, oneLine:true, size:74/1638, align:'right', manaCost:true, manaSpacing:0.0014, manaPrefix:'old'},
		title: {name:'Title', text:'', x:0.07, y:0.05, width:0.8667, height:0.0429, oneLine:true, font:'goudymedieval', size:0.0429, color:'#ababab', shadowX:0.0021, shadowY:0.0015},
		type: {name:'Type', text:'', x:0.1, y:0.5586, width:0.8, height:0.0334, oneLine:true, size:0.0334, color:'#ababab', shadowX:0.0021, shadowY:0.0015},
		rules: {name:'Rules Text', text:'', x:0.15, y:0.6048, width:0.7, height:0.2762, size:0.0477, manaPrefix:'old'},
		pt: {name:'Power/Toughness', text:'', x:0.8, y:0.8972, width:0.16, height:0.0415, size:0.0415, oneLine:true, align:'center', color:'#ababab', shadowX:0.0021, shadowY:0.0015}
	});
	//bottom info
	loadBottomInfo({
		artist: {text:'Illus. {elemidinfo-artist}', x:0.1, y:0.9, width:0.7334, height:0.0334, oneLine:true, size:0.0334, align:'left', shadowX:0.0027, shadowY:0.002, color:'#ababab'}
	});
}
//loads available frames
loadFramePack();