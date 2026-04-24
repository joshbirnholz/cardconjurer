//Create objects for common properties across available frames
var masks = [{src:'/img/frames/adventuretime/maskPinline.png', name:'Pinline'}, {src:'/img/frames/adventuretime/title.png', name:'Title'}, {src:'/img/frames/adventuretime/type.png', name:'Type'}, {src:'/img/frames/adventuretime/maskRules.png', name:'Rules'}, {src:'/img/frames/adventuretime/maskFrame.png', name:'Frame'}, {src:'/img/frames/adventuretime/maskBorder.png', name:'Border'}];
var ptBounds = {x:1548/2010, y:2500/2814, width:360/2010, height:167/2814};
var crownBounds = {x:0/2010, y:0/2814, width:1, height: 521/2814};
var crownMasks = [{src:'/img/frames/adventuretime/maskCrownPinline.png', name:'Pinline'}, {src:'/img/frames/adventuretime/maskCrownFrame.png', name:'Frame'}];
//defines available frames
availableFrames = [
	{name:'White Frame', src:'/img/frames/adventuretime/regular/w.png', masks:masks},
	{name:'Blue Frame', src:'/img/frames/adventuretime/regular/u.png', masks:masks},
	{name:'Black Frame', src:'/img/frames/adventuretime/regular/b.png', masks:masks},
	{name:'Red Frame', src:'/img/frames/adventuretime/regular/r.png', masks:masks},
	{name:'Green Frame', src:'/img/frames/adventuretime/regular/g.png', masks:masks},
	{name:'Multicolored Frame', src:'/img/frames/adventuretime/regular/m.png', masks:masks},
	{name:'Artifact Frame', src:'/img/frames/adventuretime/regular/a.png', masks:masks},
	{name:'Land Frame', src:'/img/frames/adventuretime/regular/l.png', masks:masks},
	{name:'Colorless Frame', src:'/img/frames/adventuretime/regular/c.png', masks:masks},
	{name:'Vehicle Frame', src:'/img/frames/adventuretime/regular/v.png', masks:masks},

	{name:'White Power/Toughness', src:'/img/frames/adventuretime/pt/w.png', bounds:ptBounds},
	{name:'Blue Power/Toughness', src:'/img/frames/adventuretime/pt/u.png', bounds:ptBounds},
	{name:'Black Power/Toughness', src:'/img/frames/adventuretime/pt/b.png', bounds:ptBounds},
	{name:'Red Power/Toughness', src:'/img/frames/adventuretime/pt/r.png', bounds:ptBounds},
	{name:'Green Power/Toughness', src:'/img/frames/adventuretime/pt/g.png', bounds:ptBounds},
	{name:'Multicolored Power/Toughness', src:'/img/frames/adventuretime/pt/m.png', bounds:ptBounds},
	{name:'Artifact Power/Toughness', src:'/img/frames/adventuretime/pt/a.png', bounds:ptBounds},
	{name:'Colorless Power/Toughness', src:'/img/frames/adventuretime/pt/l.png', bounds:ptBounds},
	{name:'Vehicle Power/Toughness', src:'/img/frames/adventuretime/pt/v.png', bounds:ptBounds},

	{name:'White Legendary Crown', src:'/img/frames/adventuretime/crown/regular/w.png', bounds:crownBounds, masks:crownMasks},
	{name:'Blue Legendary Crown', src:'/img/frames/adventuretime/crown/regular/u.png', bounds:crownBounds, masks:crownMasks},
	{name:'Black Legendary Crown', src:'/img/frames/adventuretime/crown/regular/b.png', bounds:crownBounds, masks:crownMasks},
	{name:'Red Legendary Crown', src:'/img/frames/adventuretime/crown/regular/r.png', bounds:crownBounds, masks:crownMasks},
	{name:'Green Legendary Crown', src:'/img/frames/adventuretime/crown/regular/g.png', bounds:crownBounds, masks:crownMasks},
	{name:'Multicolored Legendary Crown', src:'/img/frames/adventuretime/crown/regular/m.png', bounds:crownBounds, masks:crownMasks},
	{name:'Artifact Legendary Crown', src:'/img/frames/adventuretime/crown/regular/a.png', bounds:crownBounds, masks:crownMasks},
	{name:'Land Legendary Crown', src:'/img/frames/adventuretime/crown/regular/l.png', bounds:crownBounds, masks:crownMasks},
	{name:'Colorless Legendary Crown', src:'/img/frames/adventuretime/crown/regular/c.png', bounds:crownBounds, masks:crownMasks},
	{name:'Vehicle Legendary Crown', src:'/img/frames/adventuretime/crown/regular/v.png', bounds:crownBounds, masks:crownMasks}
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = async function() {
	//resets things so that every frame doesn't have to
	await resetCardIrregularities();
	//sets card version
	card.version = 'adventureTime';
	//art bounds
	card.artBounds = {x:0.0767, y:0.1129, width:0.8476, height:0.4429};
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
		pt: {name:'Power/Toughness', text:'', x:0.7928, y:0.902, width:0.1367, height:0.0372, size:0.0372, font:'belerenbsc', oneLine:true, align:'center', conditionalColor:'Vehicle_Power/Toughness:white'}
	});
}
//loads available frames
loadFramePack();
//Only for the main version as the webpage loads:
if (!card.text) {
	setTimeout(() => document.querySelector('#loadFrameVersion').click());
}
