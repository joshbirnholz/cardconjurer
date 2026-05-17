//Create objects for common properties across available frames
var masks = [{src:'/img/frames/token/m15/regular/pinline.svg', name:'Pinline'}, {src:'/img/frames/token/m15/regular/frame.svg', name:'Frame'}, {src:'/img/frames/m15/regular/m15MaskTitle.png', name:'Title'}, {src:'/img/frames/token/tokenMaskRegularType.png', name:'Type'}, {src:'/img/frames/token/tokenMaskRegularRules.png', name:'Rules'}, {src:'/img/frames/custom/m15-eighth/regular/Border.png', name:'Border'}];
var bounds = {x:0.7573, y:1901/2100, width:0.188, height:0.0733};
//defines available frames
availableFrames = [
	{name:'White Frame', src:'/img/frames/custom/m15-eighth/token/snow/w.png', masks:masks},
	{name:'Blue Frame', src:'/img/frames/custom/m15-eighth/token/snow/u.png', masks:masks},
	{name:'Black Frame', src:'/img/frames/custom/m15-eighth/token/snow/b.png', masks:masks},
	{name:'Red Frame', src:'/img/frames/custom/m15-eighth/token/snow/r.png', masks:masks},
	{name:'Green Frame', src:'/img/frames/custom/m15-eighth/token/snow/g.png', masks:masks},
	{name:'Multicolored Frame', src:'/img/frames/custom/m15-eighth/token/snow/m.png', masks:masks},
	{name:'Artifact Frame', src:'/img/frames/custom/m15-eighth/token/snow/a.png', masks:masks},
	{name:'Land Frame', src:'/img/frames/custom/m15-eighth/token/snow/l.png', masks:masks},

	{name:'White Power/Toughness', src:'/img/frames/m15/regular/m15PTW.png', bounds:bounds},
	{name:'Blue Power/Toughness', src:'/img/frames/m15/regular/m15PTU.png', bounds:bounds},
	{name:'Black Power/Toughness', src:'/img/frames/m15/regular/m15PTB.png', bounds:bounds},
	{name:'Red Power/Toughness', src:'/img/frames/m15/regular/m15PTR.png', bounds:bounds},
	{name:'Green Power/Toughness', src:'/img/frames/m15/regular/m15PTG.png', bounds:bounds},
	{name:'Multicolored Power/Toughness', src:'/img/frames/m15/regular/m15PTM.png', bounds:bounds},
	{name:'Artifact Power/Toughness', src:'/img/frames/m15/regular/m15PTA.png', bounds:bounds},
	{name:'Colorless Power/Toughness', src:'/img/frames/m15/regular/m15PTC.png', bounds:bounds},

	{name:'M15 Border', src:'/img/frames/m15/regular/m15MaskBorder.png'}
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = async function() {
	//resets things so that every frame doesn't have to
	await resetCardIrregularities();
	//sets card version
	card.version = 'm15EighthSnowToken';
	//art bounds
	card.artBounds = {x:0.0767, y:0.1248, width:0.8476, height:0.5143};
	autoFitArt();
	//set symbol bounds
	card.setSymbolBounds = {x:0.9213, y:0.6743, width:0.12, height:0.0410, vertical:'center', horizontal: 'right'};
	resetSetSymbol();
	//watermark bounds
	card.watermarkBounds = {x:0.5, y:0.8177, width:0.75, height:0.1472};
	resetWatermark();
	//text
	loadTextOptions({
		mana: {name:'Mana Cost', text:'', y:0.0613, width:0.9292, height:71/2100, oneLine:true, size:71/1638, align:'right', shadowX:-0.001, shadowY:0.0029, manaCost:true, manaSpacing:0},
		title: {name:'Title', text:'', x:0.0854, y:0.0522, width:0.8292, height:0.0543, oneLine:true, font:'belerenbsc', size:120/2814, color:'#fde367', align:'center'},
		type: {name:'Type', text:'', x:0.0854, y:0.65, width:0.8292, height:0.0543, oneLine:true, font:'belerenb', size:0.0324},
		rules: {name:'Rules Text', text:'', x:0.086, y:0.7143, width:0.828, height:0.2048, size:0.0362},
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