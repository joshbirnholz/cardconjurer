//Create objects for common properties across available frames
var ptBounds = {x:1526/2010, y:2475/2814, width:399/2010, height:226/2814};
var elementBounds = {x:69/2010, y:1374/2814, width:196/2010, height:195/2814};
var stampBounds = {x:0.4365, y:0.902, width:0.1264, height:0.0452};
var topLeftBounds = {x:116/2010, y:140/2814, width:165/2010, height:164/2814};
var topRightBounds = {x:1727/2010, y:139/2814, width:165/2010, height:166/2814};
//defines available frames
availableFrames = [
	{name:'White Frame', src:'/img/frames/elemental/w.png'},
	{name:'Blue Frame', src:'/img/frames/elemental/u.png'},
	{name:'Black Frame', src:'/img/frames/elemental/b.png'},
	{name:'Red Frame', src:'/img/frames/elemental/r.png'},
	{name:'Green Frame', src:'/img/frames/elemental/g.png'},
	{name:'Multicolored Frame', src:'/img/frames/elemental/m.png'},
	{name:'Artifact Frame', src:'/img/frames/elemental/a.png'},
	{name:'Land Frame', src:'/img/frames/elemental/l.png'},
	{name:'Colorless Frame', src:'/img/frames/elemental/c.png'},
	{name:'Water Element', src:'/img/frames/elemental/water.png', bounds:elementBounds},
	{name:'Earth Element', src:'/img/frames/elemental/earth.png', bounds:elementBounds},
	{name:'Fire Element', src:'/img/frames/elemental/fire.png', bounds:elementBounds},
	{name:'Air Element', src:'/img/frames/elemental/air.png', bounds:elementBounds},
	{name:'Spirit Element', src:'/img/frames/elemental/spirit.png', bounds:elementBounds},
	{name:'Other Element', src:'/img/frames/elemental/default.png', bounds:elementBounds},
	{name:'White Power/Toughness', src:'/img/frames/elemental/pt/w.png', bounds:ptBounds, complementary:'Power Toughness Frame Cover'},
	{name:'Blue Power/Toughness',src:'/img/frames/elemental/pt/u.png', bounds:ptBounds, complementary:'Power Toughness Frame Cover'},
	{name:'Black Power/Toughness', src:'/img/frames/elemental/pt/b.png', bounds:ptBounds, complementary:'Power Toughness Frame Cover'},
	{name:'Red Power/Toughness', src:'/img/frames/elemental/pt/r.png', bounds:ptBounds, complementary:'Power Toughness Frame Cover'},
	{name:'Green Power/Toughness', src:'/img/frames/elemental/pt/g.png', bounds:ptBounds, complementary:'Power Toughness Frame Cover'},
	{name:'Multicolored Power/Toughness', src:'/img/frames/elemental/pt/m.png', bounds:ptBounds, complementary:'Power Toughness Frame Cover'},
	{name:'Artifact Power/Toughness', src:'/img/frames/elemental/pt/a.png', bounds:ptBounds, complementary:'Power Toughness Frame Cover'},
	{name:'Land Power/Toughness', src:'/img/frames/elemental/pt/l.png', bounds:ptBounds, complementary:'Power Toughness Frame Cover'},
	{name:'Colorless Power/Toughness', src:'/img/frames/elemental/pt/c.png', bounds:ptBounds, complementary:'Power Toughness Frame Cover'},
	{name:'Lesson Icon', src:'/img/frames/elemental/lesson.png', bounds:topLeftBounds},
	{name:'DFC Front Icon', src:'/img/frames/elemental/dfcFront.png', bounds:topLeftBounds},
	{name:'DFC Back Icon', src:'/img/frames/elemental/dfcBack.png', bounds:topRightBounds},
	{name:'Triangle Holo Stamp', src:'/img/frames/fca/stamp/stampTriangle.png'},
	{name:'Grey Triangle Stamp', src:'/img/frames/fca/stamp/greyTriangle.png'},
	{name:'Round Holo Stamp', src:'/img/frames/fca/stamp/stampRound.png', bounds:stampBounds},
	{name:'Artifact Element', src:'/img/frames/elemental/artifact.png', bounds:elementBounds},
	{name:'Creature Element', src:'/img/frames/elemental/creature.png', bounds:elementBounds},
	{name:'Enchantment Element', src:'/img/frames/elemental/enchantment.png', bounds:elementBounds},
	{name:'Land Element', src:'/img/frames/elemental/land.png', bounds:elementBounds},
	{name:'Instant Element', src:'/img/frames/elemental/instant.png', bounds:elementBounds},
	{name:'Sorcery Element', src:'/img/frames/elemental/sorcery.png', bounds:elementBounds},
	{name:'Multi-type Element', src:'/img/frames/elemental/multitype.png', bounds:elementBounds},
	{name:'Future Sight Planeswalker Element', src:'/img/frames/elemental/futurePlaneswalker.png', bounds:elementBounds},
	{name:'Battle Element', src:'/img/frames/elemental/battle.png', bounds:elementBounds},
	{name:'White Element', src:'/img/frames/elemental/white.png', bounds:elementBounds},
	{name:'Blue Element', src:'/img/frames/elemental/blue.png', bounds:elementBounds},
	{name:'Black Element', src:'/img/frames/elemental/black.png', bounds:elementBounds},
	{name:'Red Element', src:'/img/frames/elemental/red.png', bounds:elementBounds},
	{name:'Green Element', src:'/img/frames/elemental/green.png', bounds:elementBounds},
	{name:'Colorless Element', src:'/img/frames/elemental/colorless.png', bounds:elementBounds},
	{name:'Planeswalker Element', src:'/img/frames/elemental/planeswalker.png', bounds:elementBounds},
	{name:'Power Toughness Frame Cover', src:'/img/black.png', bounds:{x:1858/2010, y:2529/2814, width:101/2010, height:116/2814}}
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = async function() {
	//resets things so that every frame doesn't have to
	await resetCardIrregularities();
	//sets card version
	card.version = 'elemental';
	//art bounds
	card.artBounds = {x:0, y:0, width:1, height:1562/2814};
	autoFitArt();
	//set symbol bounds
	card.setSymbolBounds = {x:0.9213, y:0.5910, width:0.12, height:0.0410, vertical:'center', horizontal: 'right'};
	resetSetSymbol();
	//watermark bounds
	card.watermarkBounds = {x:0.5, y:0.7762, width:0.75, height:0.2305};
	resetWatermark();
	//text
	loadTextOptions({
		mana: {name:'Mana Cost', text:'', y:180/2814, width:1864/2010, height:71/2100, oneLine:true, size:71/1638, align:'right', shadowX:-0.001, shadowY:0.0029, manaCost:true, manaSpacing:0},
		title: {name:'Title', text:'', x:0.0854, y:0.0522, width:0.8292, height:0.0543, oneLine:true, font:'belerenb', size:0.0381, color:'white'},
		type: {name:'Type', text:'', x:0.0854, y:1590/2814, width:0.8292, height:0.0543, oneLine:true, font:'belerenb', size:0.0324, color:'white'},
		rules: {name:'Rules Text', text:'', x:0.086, y:0.6303, width:0.828, height:0.2875, size:0.0362},
		pt: {name:'Power/Toughness', text:'', x:0.7928, y:0.902, width:0.1367, height:0.0372, size:0.0372, font:'belerenbsc', oneLine:true, align:'center'}
	});
	notify('If you intend to use DFC or Lesson icons with the Avatar frame, we recommend that you shift your Title text to the right with "{right120}".', 10);
}
//loads available frames
loadFramePack();
//Only for the main version as the webpage loads:
if (!card.text) {
	setTimeout(() => document.querySelector('#loadFrameVersion').click());
}
