//Create objects for common properties across available frames
var masks = [{src:'/img/frames/adventuretime/maskPinline.png', name:'Pinline'}, {src:'/img/frames/adventuretime/title.png', name:'Title'}, {src:'/img/frames/adventuretime/type.png', name:'Type'}, {src:'/img/frames/adventuretime/maskRules.png', name:'Rules'}, {src:'/img/frames/adventuretime/maskFrame.png', name:'Frame'}, {src:'/img/frames/adventuretime/maskBorder.png', name:'Border'}];
var ptBounds = {x:1548/2010, y:2500/2814, width:360/2010, height:167/2814};
var crownBounds = {x:0/2010, y:0/2814, width:1, height: 521/2814};
var crownMasks = [{src:'/img/frames/adventuretime/maskCrownPinline.png', name:'Pinline'}, {src:'/img/frames/adventuretime/maskCrownFrame.png', name:'Frame'}];
//defines available frames
availableFrames = [
	{name:'White Land Frame', src:'/img/frames/adventuretime/regular/wl.png', masks:masks},
	{name:'Blue Land Frame', src:'/img/frames/adventuretime/regular/ul.png', masks:masks},
	{name:'Black Land Frame', src:'/img/frames/adventuretime/regular/bl.png', masks:masks},
	{name:'Red Land Frame', src:'/img/frames/adventuretime/regular/rl.png', masks:masks},
	{name:'Green Land Frame', src:'/img/frames/adventuretime/regular/gl.png', masks:masks},
	{name:'Multicolored Land Frame', src:'/img/frames/adventuretime/regular/ml.png', masks:masks},
	{name:'Land Frame', src:'/img/frames/adventuretime/regular/l.png', masks:masks},

	{name:'Plains Watermark', src:'/img/frames/adventuretime/wl.png'},
	{name:'Island Watermark', src:'/img/frames/adventuretime/ul.png'},
	{name:'Swamp Watermark', src:'/img/frames/adventuretime/bl.png'},
	{name:'Mountain Watermark', src:'/img/frames/adventuretime/rl.png'},
	{name:'Forest Watermark', src:'/img/frames/adventuretime/gl.png'},
	{name:'Wastes Watermark', src:'/img/frames/adventuretime/cl.png'},
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
	card.artBounds = {x:154/2010, y:315/2814, width:1699/2010, height:1247/2814};
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
