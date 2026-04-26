//Create objects for common properties across available frames
var masks = [{src:'/img/frames/adventure/regular/pinline.svg', name:'Pinline'}, {src:'/img/frames/m15/regular/m15MaskTitle.png', name:'Title'}, {src:'/img/frames/m15/regular/m15MaskType.png', name:'Type'}, {src:'/img/frames/adventure/regular/book.svg', name:'Rules'}, {src:'/img/frames/adventure/regular/bookLeft.png', name:'Rules (Left)'}, {src:'/img/frames/adventure/regular/bookLeftMulticolor.png', name:'Rules (Left, Multicolor)'}, {src:'/img/frames/adventure/regular/bookRight.png', name:'Rules (Right)'}, {src:'/img/frames/adventure/regular/bookRightMulticolor.png', name:'Rules (Right, Multicolor)'}];
var bounds = {x:0.7573, y:0.8848, width:0.188, height:0.0733};
//defines available frames
availableFrames = [
	{name:'White Frame', src:'/img/frames/adventure/regular/w.png', masks:masks},
	{name:'Blue Frame', src:'/img/frames/adventure/regular/u.png', masks:masks},
	{name:'Black Frame', src:'/img/frames/adventure/regular/b.png', masks:masks},
	{name:'Red Frame', src:'/img/frames/adventure/regular/r.png', masks:masks},
	{name:'Green Frame', src:'/img/frames/adventure/regular/g.png', masks:masks},
	{name:'Multicolored Frame', src:'/img/frames/adventure/regular/m.png', masks:masks},
	{name:'Artifact Frame', src:'/img/frames/adventure/regular/a.png', masks:masks},
	{name:'Land Frame', src:'/img/frames/adventure/regular/l.png', masks:masks},
	{name:'White Power/Toughness', src:'/img/frames/m15/regular/m15PTW.png', bounds:bounds},
	{name:'Blue Power/Toughness', src:'/img/frames/m15/regular/m15PTU.png', bounds:bounds},
	{name:'Black Power/Toughness', src:'/img/frames/m15/regular/m15PTB.png', bounds:bounds},
	{name:'Red Power/Toughness', src:'/img/frames/m15/regular/m15PTR.png', bounds:bounds},
	{name:'Green Power/Toughness', src:'/img/frames/m15/regular/m15PTG.png', bounds:bounds},
	{name:'Multicolored Power/Toughness', src:'/img/frames/m15/regular/m15PTM.png', bounds:bounds},
	{name:'Artifact Power/Toughness', src:'/img/frames/m15/regular/m15PTA.png', bounds:bounds},
	{name:'Land Power/Toughness', src:'/img/frames/m15/regular/m15PTC.png', bounds:bounds},

	{name:'White Enchantment Frame', src:'/img/frames/adventure/nyx/w.png', masks:masks},
	{name:'Blue Enchantment Frame', src:'/img/frames/adventure/nyx/u.png', masks:masks},
	{name:'Black Enchantment Frame', src:'/img/frames/adventure/nyx/b.png', masks:masks},
	{name:'Red Enchantment Frame', src:'/img/frames/adventure/nyx/r.png', masks:masks},
	{name:'Green Enchantment Frame', src:'/img/frames/adventure/nyx/g.png', masks:masks},
	{name:'Multicolored Enchantment Frame', src:'/img/frames/adventure/nyx/m.png', masks:masks},
	{name:'Artifact Enchantment Frame', src:'/img/frames/adventure/nyx/a.png', masks:masks},
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = async function() {
	//resets things so that every frame doesn't have to
	await resetCardIrregularities();
	//sets card version
	card.version = 'adventure';
	//art bounds
	card.artBounds = {x:0.0767, y:0.1129, width:0.8476, height:0.4429};
	autoFitArt();
	//set symbol bounds
	card.setSymbolBounds = {x:0.9213, y:0.5910, width:0.12, height:0.0410, vertical:'center', horizontal: 'right'};
	resetSetSymbol();
	//watermark bounds
	card.watermarkBounds = {x:0.72, y:0.7681, width:0.3867, height:0.2358};
	resetWatermark();
	//text
	loadTextOptions({
		mana: {name:'Mana Cost', text:'', y:0.0613, width:0.9292, height:71/2100, oneLine:true, size:71/1638, align:'right', shadowX:-0.001, shadowY:0.0029, manaCost:true, manaSpacing:0},
		title: {name:'Title', text:'', x:0.0854, y:0.0522, width:0.8292, height:0.0543, oneLine:true, font:'belerenb', size:0.0381},
		type: {name:'Type', text:'', x:0.0854, y:0.5664, width:0.8292, height:0.0543, oneLine:true, font:'belerenb', size:0.0324},
		rules: {name:'Rules Text', text:'', x:0.0854, y:0.7358, width:0.3947, height:0.15, size:0.0353},
		rules2: {name:'Rules Text (Right)', text:'', x:0.5267, y:0.65, width:0.3867, height:0.2358, size:0.0353},
		pt: {name:'Power/Toughness', text:'', x:0.7928, y:0.902, width:0.1367, height:0.0372, size:0.0372, font:'belerenbsc', oneLine:true, align:'center'},
		mana2: {name:'Adventure Mana Cost', text:'', x:0.0814, y:0.6391, width:0.4, height:60/2100, oneLine:true, size:60/1638, color:'white', shadowX:-0.001, shadowY:0.0029, align:'right', manaCost:true},
		title2: {name:'Adventure Title', text:'', x:0.0814, y:0.6391, width:0.4, height:0.0296, size:0.0296, color:'white', oneLine:true, font:'belerenb'},
		type2: {name:'Adventure Type', text:'', x:0.0814, y:0.6839, width:0.4, height:0.0296, size:0.0296, color:'white', oneLine:true, font:'belerenb'},
	});
}
//loads available frames
loadFramePack();
//Only for the main version as the webpage loads:
if (!card.text) {
	document.querySelector('#loadFrameVersion').click();
}
