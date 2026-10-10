//Create objects for common properties across available frames
var masks = [{src:'/img/frames/planeswalker/transform/tall/pinlineBackTall.svg', name:'Pinline'}, {src:'/img/frames/planeswalker/transform/titleBack.svg', name:'Title'}, {src:'/img/frames/planeswalker/tall/planeswalkerTallMaskType.png', name:'Type'}, {src:'/img/frames/planeswalker/transform/tall/frameBackTall.svg', name:'Frame'}, {src:'/img/frames/planeswalker/transform/borderBack.svg', name:'Border'}];
var pipMasks = [{src:'/img/frames/planeswalker/transform/tall/firstHalf.svg', name:'First Half'}, {src:'/img/frames/planeswalker/transform/tall/secondHalf.svg', name:'Second Half'}, {src:'/img/frames/planeswalker/transform/tall/firstThird.svg', name:'First Third'}, {src:'/img/frames/planeswalker/transform/tall/secondThird.svg', name:'Second Third'}, {src:'/img/frames/planeswalker/transform/tall/thirdThird.svg', name:'Third Third'}];

//defines available frames
availableFrames = [
	{name:'White Frame (Back, Tall)', src:'/img/frames/planeswalker/transform/tall/wbTall.png', masks:masks},
	{name:'Blue Frame (Back, Tall)', src:'/img/frames/planeswalker/transform/tall/ubTall.png', masks:masks},
	{name:'Black Frame (Back, Tall)', src:'/img/frames/planeswalker/transform/tall/bbTall.png', masks:masks},
	{name:'Red Frame (Back, Tall)', src:'/img/frames/planeswalker/transform/tall/rbTall.png', masks:masks},
	{name:'Green Frame (Back, Tall)', src:'/img/frames/planeswalker/transform/tall/gbTall.png', masks:masks},
	{name:'Multicolored Frame (Back, Tall)', src:'/img/frames/planeswalker/transform/tall/mbTall.png', masks:masks},
	{name:'Loyalty Box', src:'/img/frames/planeswalker/transform/loyalty.png', bounds:{x:0.8, y:0.8796, width:0.152, height:0.0677}},
	{name:'White Pip', src:'/img/frames/planeswalker/transform/tall/w.svg', masks:pipMasks, complementary:12},
	{name:'Blue Pip', src:'/img/frames/planeswalker/transform/tall/u.svg', masks:pipMasks, complementary:12},
	{name:'Black Pip', src:'/img/frames/planeswalker/transform/tall/b.svg', masks:pipMasks, complementary:12},
	{name:'Red Pip', src:'/img/frames/planeswalker/transform/tall/r.svg', masks:pipMasks, complementary:12},
	{name:'Green Pip', src:'/img/frames/planeswalker/transform/tall/g.svg', masks:pipMasks, complementary:12},
	{name:'Color Identity Pip Base', src:'/img/frames/planeswalker/transform/tall/base.png', bounds:{x:0.0767, y:0.5090, width:0.0467, height:0.0334}}
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = async function() {
	//resets things so that every frame doesn't have to
	await resetCardIrregularities();
	//sets card version
	card.version = 'planeswalkerTransformBackTall';
	card.onload = '/js/frames/versionPlaneswalker.js';
	loadScript('/js/frames/versionPlaneswalker.js');
	//art bounds
	card.artBounds = {x:0.068, y:0.101, width:0.864, height:0.8143};
	autoFitArt();
	//set symbol bounds
	card.setSymbolBounds = {x:0.9227, y:0.5234, width:0.12, height:0.0381, vertical:'center', horizontal: 'right'};
	resetSetSymbol();
	//watermark bounds
	card.watermarkBounds = {x:0.5, y:0.7762, width:0.75, height:0.2305};
	resetWatermark();
	//text
	loadTextOptions({
		mana: {name:'Mana Cost', text:'', y:0.0481, width:0.9292, height:71/2100, oneLine:true, size:71/1638, align:'right', shadowX:-0.001, shadowY:0.0029, manaCost:true, manaSpacing:0},
		title: {name:'Title', text:'', x:0.0867, y:0.0372, width:0.8292, height:0.0548, oneLine:true, font:'belerenb', size:0.0381, color:'white'},
		type: {name:'Type', text:'', x:0.1307, y:0.4967, width:0.7827, height:0.0548, oneLine:true, font:'belerenb', size:0.0324, color:'white'},
		ability0: {name:'Ability 1', text:'', x:0.18, y:0.5581, width:0.7467, height:0.0896, size:0.0353},
		ability1: {name:'Ability 2', text:'', x:0.18, y:0, width:0.7467, height:0.0896, size:0.0353},
		ability2: {name:'Ability 3', text:'', x:0.18, y:0, width:0.7467, height:0.0896, size:0.0353},
		ability3: {name:'Ability 4', text:'', x:0.18, y:0, width:0.7467, height:0.0896, size:0.0353},
		loyalty: {name:'Loyalty', text:'', x:0.806, y:0.902, width:0.14, height:0.0372, size:0.0372, font:'belerenbsc', oneLine:true, align:'center', color:'white'}
	});
}
//loads available frames
loadFramePack();