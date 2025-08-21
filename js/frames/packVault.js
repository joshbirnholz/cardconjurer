//Create objects for common properties across available frames
var masks = [];
var ptBounds = {x:1560/2010, y:2494/2814, width:347/2010, height:172/2814};
var crownBounds = {x:127/2010, y:0, width:1763/2010, height:60/2814};
var stampBounds = {x:850/2010, y:2541/2814, width:310/2010, height:132/2814};
//defines available frames
availableFrames = [
	{name:'White Frame', src:'/img/frames/vault/w.png'},
	{name:'Blue Frame', src:'/img/frames/vault/u.png'},
	{name:'Black Frame', src:'/img/frames/vault/b.png'},
	{name:'Red Frame', src:'/img/frames/vault/r.png'},
	{name:'Green Frame', src:'/img/frames/vault/g.png'},
	{name:'Multicolored Frame', src:'/img/frames/vault/m.png'},
	{name:'Artifact Frame', src:'/img/frames/vault/a.png'},
	{name:'Land Frame', src:'/img/frames/vault/l.png'},

	{name:'White Power/Toughness', src:'/img/frames/vault/pt/w.png', bounds:ptBounds},
	{name:'Blue Power/Toughness', src:'/img/frames/vault/pt/u.png', bounds:ptBounds},
	{name:'Black Power/Toughness', src:'/img/frames/vault/pt/b.png', bounds:ptBounds},
	{name:'Red Power/Toughness', src:'/img/frames/vault/pt/r.png', bounds:ptBounds},
	{name:'Green Power/Toughness', src:'/img/frames/vault/pt/g.png', bounds:ptBounds},
	{name:'Multicolored Power/Toughness', src:'/img/frames/vault/pt/m.png', bounds:ptBounds},
	{name:'Artifact Power/Toughness', src:'/img/frames/vault/pt/a.png', bounds:ptBounds},

	{name:'White Legendary Crown', src:'/img/frames/vault/crown/w.png', bounds:crownBounds},
	{name:'Blue Legendary Crown', src:'/img/frames/vault/crown/u.png', bounds:crownBounds},
	{name:'Black Legendary Crown', src:'/img/frames/vault/crown/b.png', bounds:crownBounds},
	{name:'Red Legendary Crown', src:'/img/frames/vault/crown/r.png', bounds:crownBounds},
	{name:'Green Legendary Crown', src:'/img/frames/vault/crown/g.png', bounds:crownBounds},
	{name:'Multicolored Legendary Crown', src:'/img/frames/vault/crown/m.png', bounds:crownBounds},
	{name:'Artifact Legendary Crown', src:'/img/frames/vault/crown/a.png', bounds:crownBounds},
	{name:'Land Legendary Crown', src:'/img/frames/vault/crown/l.png', bounds:crownBounds},

	{name:'White Holo Stamp', src:'/img/frames/vault/stamp/w.png', bounds:stampBounds},
	{name:'Blue Holo Stamp', src:'/img/frames/vault/stamp/u.png', bounds:stampBounds},
	{name:'Black Holo Stamp', src:'/img/frames/vault/stamp/b.png', bounds:stampBounds},
	{name:'Red Holo Stamp', src:'/img/frames/vault/stamp/r.png', bounds:stampBounds},
	{name:'Green Holo Stamp', src:'/img/frames/vault/stamp/g.png', bounds:stampBounds},
	{name:'Multicolored Holo Stamp', src:'/img/frames/vault/stamp/m.png', bounds:stampBounds},
	{name:'Artifact Holo Stamp', src:'/img/frames/vault/stamp/a.png', bounds:stampBounds},
	{name:'Land Holo Stamp', src:'/img/frames/vault/stamp/l.png', bounds:stampBounds}
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = async function() {
	//resets things so that every frame doesn't have to
	await resetCardIrregularities();
	//sets card version
	card.version = 'vault';
	//art bounds
	card.artBounds = {x:0, y:334/2814, width:1, height:1194/2814};
	autoFitArt();
	//set symbol bounds
	card.setSymbolBounds = {x:0.9213, y:0.5910, width:0.12, height:0.0410, vertical:'center', horizontal: 'right'};
	resetSetSymbol();
	//watermark bounds
	card.watermarkBounds = {x:0.5, y:0.7762, width:0.75, height:0.2305};
	resetWatermark();
	//text
	loadTextOptions({
		mana: {name:'Mana Cost', text:'', y:0.0613, width:0.9292, height:71/2100, oneLine:true, size:71/1638, align:'right', shadowX:-0.001, shadowY:0.0029, manaCost:true, manaSpacing:0},
		title: {name:'Title', text:'', x:0.0854, y:0.0522, width:0.8292, height:0.0543, oneLine:true, font:'belerenb', size:0.0381},
		type: {name:'Type', text:'', x:0.0854, y:0.5664, width:0.8292, height:0.0543, oneLine:true, font:'belerenb', size:0.0324},
		rules: {name:'Rules Text', text:'', x:0.086, y:0.6303, width:0.828, height:0.2875, size:0.0362},
		pt: {name:'Power/Toughness', text:'', x:0.7928, y:0.902, width:0.1367, height:0.0372, size:0.0372, font:'belerenbsc', oneLine:true, align:'center'}
	});
}
//loads available frames
loadFramePack();