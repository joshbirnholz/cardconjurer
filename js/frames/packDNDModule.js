//defines available frames
availableFrames = [
	{name:'White Frame', src:'/img/frames/dndModule/w.svg'},
	{name:'Blue Frame', src:'/img/frames/dndModule/u.svg'},
	{name:'Black Frame', src:'/img/frames/dndModule/b.svg'},
	{name:'Red Frame', src:'/img/frames/dndModule/r.svg'},
	{name:'Green Frame', src:'/img/frames/dndModule/g.svg'},
	{name:'Multicolored Frame', src:'/img/frames/dndModule/m.svg'},
	{name:'Artifact Frame', src:'/img/frames/dndModule/a.svg'},
	{name:'Colorless Frame', src:'/img/frames/dndModule/c.svg'},
	{name:'Land Frame', src:'/img/frames/dndModule/l.svg'}
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = async function() {
	//resets things so that every frame doesn't have to
	await resetCardIrregularities();
	//sets card version
	card.version = 'dndModule';
	//art bounds
	card.artBounds = {x:0.0394, y:0.1929, width:0.9214, height:0.4115};
	autoFitArt();
	//set symbol bounds
	card.setSymbolBounds = {x:0.9167, y:0.63, width:0.12, height:0.0410, vertical:'center', horizontal: 'right'};
	resetSetSymbol();
	//watermark bounds
	card.watermarkBounds = {x:0.5, y:0.7953, width:0.75, height:0.2305};
	resetWatermark();
	//text
	loadTextOptions({
		mana: {name:'Mana Cost', text:'', y:0.0613, width:0.9292, height:71/2100, oneLine:true, size:71/1638, align:'right', shadowX:-0.001, shadowY:0.0029, manaCost:true, manaSpacing:0},
		supertitle: {name:'Supertitle', text:'Dungeon Module R13', x:0.0854, y:0.0277, width:0.8292, height:0.0296, oneLine:true, font:'souvenirmed', size:0.0296, color:'white', align:'center'},
		title: {name:'Title', text:'', x:0.13, y:0.05, width:0.74, height:0.1048, color:'#ECDB2D', align:'center', font:'souvenir', size:0.0572},
		subtitle: {name:'Subtitle', text:'AN ADVENTURE FOR CHARACTERS LEVELS 11-16', x:0.06, y:0.1558, width:0.88, height:0.0253, oneLine:true, font:'souvenirmed', size:0.0253, color:'white', align:'center'},
		module: {name:'Module #', text:'R13', x:0, y:0.02, width:0.08, height:0.0191, oneLine:true, font:'souvenir', size:0.0191, color:'#ECDB2D', align:'center'},
		dnd: {name:'D&D', text:'DUNGEONS & DRAGONS', x:-0.01, y:0.0953, width:0.204, height:0.0643, font:'souvenir', size:0.0215, align:'center', rotation:-45},
		type: {name:'Type', text:'', x:0.0854, y:0.6181, width:0.8292, height:0.0324, oneLine:true, font:'souvenirmed', size:0.0324, color:'white'},
		rules: {name:'Rules Text', text:'', x:0.086, y:0.6762, width:0.828, height:0.24, size:0.0362, noVerticalCenter:true, color:'white', font:'souvenirmed'},
		pt: {name:'Power/Toughness', text:'', x:0.8634, y:0.8858, width:0.1367, height:0.0372, size:0.0372, font:'souvenir', oneLine:true, align:'center', color:'white'}
	});
}
//loads available frames
loadFramePack();