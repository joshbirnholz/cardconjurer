//Create objects for common properties across available frames
var masks = [{src:'/img/frames/m15/new/extended/pinline.png', name:'Pinline'}, {src:'/img/frames/m15/new/title.png', name:'Title'}, {src:'/img/frames/m15/new/type.png', name:'Type'}, {src:'/img/frames/m15/new/rules.png', name:'Rules'}, {src:'/img/frames/m15/new/frame.png', name:'Frame'}, {src:'/img/frames/m15/new/border.png', name:'Border'}];
var bounds = {x:0.7573, y:0.8848, width:0.188, height:0.0733};
//defines available frames
availableFrames = [
	{name:'White Frame', src:'/img/frames/m15/new/extended/w.png', masks:masks},
	{name:'Blue Frame', src:'/img/frames/m15/new/extended/u.png', masks:masks},
	{name:'Black Frame', src:'/img/frames/m15/new/extended/b.png', masks:masks},
	{name:'Red Frame', src:'/img/frames/m15/new/extended/r.png', masks:masks},
	{name:'Green Frame', src:'/img/frames/m15/new/extended/g.png', masks:masks},
	{name:'Multicolored Frame', src:'/img/frames/m15/new/extended/m.png', masks:masks},
	{name:'Artifact Frame', src:'/img/frames/m15/new/extended/a.png', masks:masks},
	{name:'Land Frame', src:'/img/frames/m15/new/extended/l.png', masks:masks},
	{name:'Colorless Frame', src:'/img/frames/m15/new/extended/c.png', masks:masks},
	{name:'Vehicle Frame', src:'/img/frames/m15/new/extended/v.png', masks:masks},

	{name:'White Enchantment Frame', src:'/img/frames/m15/new/extended/nyx/w.png', masks:masks},
	{name:'Blue Enchantment Frame', src:'/img/frames/m15/new/extended/nyx/u.png', masks:masks},
	{name:'Black Enchantment Frame', src:'/img/frames/m15/new/extended/nyx/b.png', masks:masks},
	{name:'Red Enchantment Frame', src:'/img/frames/m15/new/extended/nyx/r.png', masks:masks},
	{name:'Green Enchantment Frame', src:'/img/frames/m15/new/extended/nyx/g.png', masks:masks},
	{name:'Multicolored Enchantment Frame', src:'/img/frames/m15/new/extended/nyx/m.png', masks:masks},
	{name:'Artifact Enchantment Frame', src:'/img/frames/m15/new/extended/nyx/a.png', masks:masks},

	{name:'White Power/Toughness', src:'/img/frames/m15/regular/m15PTW.png', bounds:bounds},
	{name:'Blue Power/Toughness', src:'/img/frames/m15/regular/m15PTU.png', bounds:bounds},
	{name:'Black Power/Toughness', src:'/img/frames/m15/regular/m15PTB.png', bounds:bounds},
	{name:'Red Power/Toughness', src:'/img/frames/m15/regular/m15PTR.png', bounds:bounds},
	{name:'Green Power/Toughness', src:'/img/frames/m15/regular/m15PTG.png', bounds:bounds},
	{name:'Multicolored Power/Toughness', src:'/img/frames/m15/regular/m15PTM.png', bounds:bounds},
	{name:'Artifact Power/Toughness', src:'/img/frames/m15/regular/m15PTA.png', bounds:bounds},
	{name:'Colorless Power/Toughness', src:'/img/frames/m15/regular/m15PTC.png', bounds:bounds},
	{name:'Vehicle Power/Toughness', src:'/img/frames/m15/regular/m15PTV.png', bounds:bounds},

	{name:'White Land Frame', src:'/img/frames/m15/new/extended/lw.png', masks:masks},
	{name:'Blue Land Frame', src:'/img/frames/m15/new/extended/lu.png', masks:masks},
	{name:'Black Land Frame', src:'/img/frames/m15/new/extended/lb.png', masks:masks},
	{name:'Red Land Frame', src:'/img/frames/m15/new/extended/lr.png', masks:masks},
	{name:'Green Land Frame', src:'/img/frames/m15/new/extended/lg.png', masks:masks},
	{name:'Multicolored Land Frame', src:'/img/frames/m15/new/extended/lm.png', masks:masks},
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = async function() {

	//resets things so that every frame doesn't have to
	await resetCardIrregularities([2010,2814,0,0]);
	//sets card version
	card.version = 'm15Extended';
	//art bounds
	card.artBounds = {x:0, y:236/2814, width:1, height:1530/2814};
	autoFitArt();
	//set symbol bounds
	card.setSymbolBounds = {x:1862/2010, y:0.5910, width:0.12, height:0.0410, vertical:'center', horizontal: 'right'};
	resetSetSymbol();
	//watermark bounds
	card.watermarkBounds = {x:0.5, y:0.7762, width:0.75, height:0.2305};
	resetWatermark();
	//text
	loadTextOptions({
		mana: {name:'Mana Cost', text:'', y:176/2814, width:1864/2010, height:71/2100, oneLine:true, size:70.5/1638, align:'right', shadowX:-0.001, shadowY:0.0029, manaCost:true, manaSpacing:0},
		title: {name:'Title', text:'', x:168/2010, y:145/2814, width:0.8292, height:0.0543, oneLine:true, font:'belerenb', size:0.0381},
		type: {name:'Type', text:'', x:168/2010, y:1588/2814, width:0.8292, height:0.0543, oneLine:true, font:'belerenb', size:0.0324, color:'white'},
		rules: {name:'Rules Text', text:'', x:0.086, y:1780/2814, width:0.828, height:0.2875, size:0.0362},
		pt: {name:'Power/Toughness', text:'', x:0.7928, y:0.902, width:0.1367, height:0.0372, size:0.0372, font:'belerenbsc', oneLine:true, align:'center'}
	});
}
//loads available frames
loadFramePack();
//Only for the main version as the webpage loads:
if (!card.text) {
	document.querySelector('#loadFrameVersion').click();
}