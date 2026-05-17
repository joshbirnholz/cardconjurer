//Create objects for common properties across available frames
var masks = [{src:'/img/frames/m15/regular/m15MaskPinline.png', name:'Pinline'}, {src:'/img/frames/m15/regular/m15MaskTitle.png', name:'Title'}, {src:'/img/frames/m15/regular/m15MaskType.png', name:'Type'}, {src:'/img/frames/m15/regular/m15MaskRules.png', name:'Rules'}, {src:'/img/frames/custom/m15-eighth/regular/Frame.png', name:'Frame'}, {src:'/img/frames/custom/m15-eighth/regular/Border.png', name:'Border'}];
var bounds = {x:0.7573, y:1901/2100, width:0.188, height:0.0733};
var watermarkBounds = {x:0.3267, y:0.6491, width:0.3474, height:0.2496};
//defines available frames
availableFrames = [
	{name:'White Frame', src:'/img/frames/custom/m15-eighth/snow/w.png', masks:masks},
	{name:'Blue Frame', src:'/img/frames/custom/m15-eighth/snow/u.png', masks:masks},
	{name:'Black Frame', src:'/img/frames/custom/m15-eighth/snow/b.png', masks:masks},
	{name:'Red Frame', src:'/img/frames/custom/m15-eighth/snow/r.png', masks:masks},
	{name:'Green Frame', src:'/img/frames/custom/m15-eighth/snow/g.png', masks:masks},
	{name:'Multicolored Frame', src:'/img/frames/custom/m15-eighth/snow/m.png', masks:masks},
	{name:'Artifact Frame', src:'/img/frames/custom/m15-eighth/snow/a.png', masks:masks},
	{name:'Land Frame', src:'/img/frames/custom/m15-eighth/snow/l.png', masks:masks},

	{name:'White Power/Toughness', src:'/img/frames/m15/regular/m15PTW.png', bounds:bounds},
	{name:'Blue Power/Toughness', src:'/img/frames/m15/regular/m15PTU.png', bounds:bounds},
	{name:'Black Power/Toughness', src:'/img/frames/m15/regular/m15PTB.png', bounds:bounds},
	{name:'Red Power/Toughness', src:'/img/frames/m15/regular/m15PTR.png', bounds:bounds},
	{name:'Green Power/Toughness', src:'/img/frames/m15/regular/m15PTG.png', bounds:bounds},
	{name:'Multicolored Power/Toughness', src:'/img/frames/m15/regular/m15PTM.png', bounds:bounds},
	{name:'Artifact Power/Toughness', src:'/img/frames/m15/regular/m15PTA.png', bounds:bounds},
	{name:'Colorless Power/Toughness', src:'/img/frames/m15/regular/m15PTC.png', bounds:bounds},

	{name:'White Land Frame', src:'/img/frames/custom/m15-eighth/snow/wl.png', masks:masks},
	{name:'Blue Land Frame', src:'/img/frames/custom/m15-eighth/snow/ul.png', masks:masks},
	{name:'Black Land Frame', src:'/img/frames/custom/m15-eighth/snow/bl.png', masks:masks},
	{name:'Red Land Frame', src:'/img/frames/custom/m15-eighth/snow/rl.png', masks:masks},
	{name:'Green Land Frame', src:'/img/frames/custom/m15-eighth/snow/gl.png', masks:masks},
	{name:'Multicolored Land Frame', src:'/img/frames/custom/m15-eighth/snow/ml.png', masks:masks},

	{name:'Plains Watermark', src:'/img/frames/snow/watermarks/w.png', bounds:watermarkBounds},
	{name:'Island Watermark', src:'/img/frames/snow/watermarks/u.png', bounds:watermarkBounds},
	{name:'Swamp Watermark', src:'/img/frames/snow/watermarks/b.png', bounds:watermarkBounds},
	{name:'Mountain Watermark', src:'/img/frames/snow/watermarks/r.png', bounds:watermarkBounds},
	{name:'Forest Watermark', src:'/img/frames/snow/watermarks/g.png', bounds:watermarkBounds},

	{name:'M15 Border', src:'/img/frames/m15/regular/m15MaskBorder.png'}
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = async function() {
	//resets things so that every frame doesn't have to
	await resetCardIrregularities();
	//sets card version
	card.version = 'm15EighthSnow';
	card.showsFlavorBar = false;
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
		pt: {name:'Power/Toughness', text:'', x:0.7928, y:1937/2100, width:0.1367, height:0.0372, size:0.0372, font:'belerenbsc', oneLine:true, align:'center'}
	});
	//bottom info
	loadBottomInfo({
		top: {text:'{conditionalcolor:M15_Border:white}\uFFEE {elemidinfo-artist}', x:0.0647, y:1973/2100, width:0.8107, height:0.0248, oneLine:true, font:'belerenbsc', size:0.02095, color:'black'},
		credit: {name:'wizards', text:'{conditionalcolor:M15_Border:white}Designed by {elemidinfo-credit}', x:0.0647, y:1958/2100, width:0.8107, height:0.0153, oneLine:true, font:'mplantin', size:0.0153, color:'black', shadowX:0.0007, shadowY:0.0005}
	});
}
//loads available frames
loadFramePack();
//Only for the main version as the webpage loads:
if (!card.text) {
	document.querySelector('#loadFrameVersion').click();
}