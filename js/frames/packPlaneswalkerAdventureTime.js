//Create objects for common properties across available frames
var masks = [{src:'/img/frames/adventuretime/planeswalker/maskPinline.png', name:'Pinline'}, {src:'/img/frames/adventuretime/planeswalker/maskTitle.png', name:'Title'}, {src:'/img/frames/adventuretime/planeswalker/maskType.png', name:'Type'}, {src:'/img/frames/adventuretime/planeswalker/maskFrame.png', name:'Frame'}, {src:'/img/frames/adventuretime/planeswalker/maskBorder.png', name:'Border'}, {src:'/img/frames/adventuretime/planeswalker/maskLoyalty.png', name:'Loyalty'}];
//defines available frames
availableFrames = [
	{name:'White Frame', src:'/img/frames/adventuretime/planeswalker/w.png', masks:masks},
	{name:'Blue Frame', src:'/img/frames/adventuretime/planeswalker/u.png', masks:masks},
	{name:'Black Frame', src:'/img/frames/adventuretime/planeswalker/b.png', masks:masks},
	{name:'Red Frame', src:'/img/frames/adventuretime/planeswalker/r.png', masks:masks},
	{name:'Green Frame', src:'/img/frames/adventuretime/planeswalker/g.png', masks:masks},
	{name:'Multicolored Frame', src:'/img/frames/adventuretime/planeswalker/m.png', masks:masks},
	{name:'Artifact Frame', src:'/img/frames/adventuretime/planeswalker/a.png', masks:masks},
	{name:'Colorless Frame', src:'/img/frames/adventuretime/planeswalker/c.png', masks:masks}
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = async function() {
	//resets things so that every frame doesn't have to
	await resetCardIrregularities();
	//sets card version
	card.version = 'planeswalkerAdventureTime';
	card.onload = '/js/frames/versionPlaneswalker.js';
	loadScript('/js/frames/versionPlaneswalker.js');
	//art bounds
	card.artBounds = {x:158/2010, y:320/2814, width:1693/2010, height:2239/2814};
	autoFitArt();
	//set symbol bounds
	card.setSymbolBounds = {x:1834/2010, y:1666/2814, width:0.12, height:0.0381, vertical:'center', horizontal: 'right'};
	resetSetSymbol();
	//watermark bounds
	card.watermarkBounds = {x:0.5, y:0.7762, width:0.75, height:0.2305};
	resetWatermark();
	//text
	loadTextOptions({
		mana: {name:'Mana Cost', text:'', y:173/2814, width:1850/2010, height:71/2100, oneLine:true, size:71/1638, align:'right', shadowX:-0.001, shadowY:0.0029, manaCost:true, manaSpacing:0},
		title: {name:'Title', text:'', x:0.0867, y:142/2814, width:0.8267, height:0.0548, oneLine:true, font:'belerenb', size:0.0381},
		type: {name:'Type', text:'', x:0.0867, y:1594/2814, width:0.8267, height:0.0548, oneLine:true, font:'belerenb', size:0.0324},
		ability0: {name:'Ability 1', text:'', x:365/2010, y:1769/2814, width:1455/2010, height:276/2814, size:0.0353},
		ability1: {name:'Ability 2', text:'', x:365/2010, y:0, width:1455/2010, height:273.5208/2814, size:0.0353},
		ability2: {name:'Ability 3', text:'', x:365/2010, y:0, width:1455/2010, height:273.5208/2814, size:0.0353},
		ability3: {name:'Ability 4', text:'', x:365/2010, y:0, width:1455/2010, height:0, size:0.0353},
		loyalty: {name:'Loyalty', text:'', x:1650/2010, y:2516/2814, width:202/2010, height:0.0372, size:0.0372, font:'belerenbsc', oneLine:true, align:'center', color:'white'}
	});
}
//loads available frames
loadFramePack();