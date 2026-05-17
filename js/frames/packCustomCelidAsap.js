//Create objects for common properties across available frames
var bounds1 = {x:0.8294, y:0.8715, width:0.1214, height:0.0715};
var bounds2 = {x:0.002, y:0.0134, width:0.996, height:0.1362};
//defines available frames
availableFrames = [
	{name:'White Frame', src:'/img/frames/custom/celid/asap/w.png'},
	{name:'Blue Frame', src:'/img/frames/custom/celid/asap/u.png'},
	{name:'Black Frame', src:'/img/frames/custom/celid/asap/b.png'},
	{name:'Red Frame', src:'/img/frames/custom/celid/asap/r.png'},
	{name:'Green Frame', src:'/img/frames/custom/celid/asap/g.png'},
	{name:'Multicolored Frame', src:'/img/frames/custom/celid/asap/m.png'},
	{name:'Artifact Frame', src:'/img/frames/custom/celid/asap/a.png'},
	{name:'White Power/Toughness', src:'/img/frames/custom/celid/asap/pt/w.png', bounds:bounds1},
	{name:'Blue Power/Toughness', src:'/img/frames/custom/celid/asap/pt/u.png', bounds:bounds1},
	{name:'Black Power/Toughness', src:'/img/frames/custom/celid/asap/pt/b.png', bounds:bounds1},
	{name:'Red Power/Toughness', src:'/img/frames/custom/celid/asap/pt/r.png', bounds:bounds1},
	{name:'Green Power/Toughness', src:'/img/frames/custom/celid/asap/pt/g.png', bounds:bounds1},
	{name:'Multicolored Power/Toughness', src:'/img/frames/custom/celid/asap/pt/m.png', bounds:bounds1},
	{name:'Artifact Power/Toughness', src:'/img/frames/custom/celid/asap/pt/a.png', bounds:bounds1},
	{name:'White Legend Crown', src:'/img/frames/custom/celid/asap/crown/w.png', bounds:bounds2},
	{name:'Blue Legend Crown', src:'/img/frames/custom/celid/asap/crown/u.png', bounds:bounds2},
	{name:'Black Legend Crown', src:'/img/frames/custom/celid/asap/crown/b.png', bounds:bounds2},
	{name:'Red Legend Crown', src:'/img/frames/custom/celid/asap/crown/r.png', bounds:bounds2},
	{name:'Green Legend Crown', src:'/img/frames/custom/celid/asap/crown/g.png', bounds:bounds2},
	{name:'Multicolored Legend Crown', src:'/img/frames/custom/celid/asap/crown/m.png', bounds:bounds2},
	{name:'Artifact Legend Crown', src:'/img/frames/custom/celid/asap/crown/a.png', bounds:bounds2},
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = async function() {
	//resets things so that every frame doesn't have to
	await resetCardIrregularities();
	//sets card version
	card.version = 'customCelidAsap';
	//art bounds
	card.artBounds = {x:0, y:0, width:1, height:0.8929};
	autoFitArt();
	//set symbol bounds
	card.setSymbolBounds = {x:0.5, y:0.9524, width:0.12, height:0.0410, vertical:'center', horizontal: 'center'};
	resetSetSymbol();
	//watermark bounds
	card.watermarkBounds = {x:0.5, y:0.7762, width:0.75, height:0.2305};
	resetWatermark();
	//text
	loadTextOptions({
		mana: {name:'Mana Cost', text:'', x:0.37, y:0.0267, width:0.26, height:54/2100, oneLine:true, size:54/1638, align:'center', manaCost:true, manaSpacing:0},
		title: {name:'Title', text:'', x:0.06, y:0.0743, width:0.88, height:0.04, oneLine:true, font:'belerenb', size:0.04, color:'white', align:'center'},
		type: {name:'Type', text:'', x:0.07, y:0.9058, width:0.86, height:0.0286, oneLine:true, font:'belerenb', size:0.0286, color:'white', align:'center'},
		rules: {name:'Rules Text', text:'', x:0.074, y:0.672, width:0.852, height:0.2191, size:0.0362, color:'white', align:'center'},
		pt: {name:'Power/Toughness', text:'', x:0.8367, y:0.8943, width:0.11, height:0.0372, size:0.0372, font:'belerenbsc', oneLine:true, align:'center', color:'white'}
	});
	//bottom info
	await loadBottomInfo({
		midLeft: {text:'{elemidinfo-set}*{elemidinfo-language}  {fontbelerenbsc}{fontsize' + scaleHeight(0.001) + '}{upinline' + scaleHeight(0.0005) + '}\uFFEE{elemidinfo-artist}', x:0.0647, y:0.9548, width:0.8707, height:0.0171, oneLine:true, font:'gothammedium', size:0.0171, color:'white', outlineWidth:0.003},
		credit: {name:'wizards', text:'Designed by {elemidinfo-credit}', x:0.0647, y:0.9549, width:0.8707, height:0.0167, oneLine:true, font:'mplantin', size:0.0162, color:'white', align:'right', outlineWidth:0.003}
	});
}
//loads available frames
loadFramePack();