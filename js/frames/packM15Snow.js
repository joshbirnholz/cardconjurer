//Create objects for common properties across available frames
var masks = [{src:'/img/frames/m15/regular/m15MaskPinline.png', name:'Pinline'}, {src:'/img/frames/m15/regular/m15MaskTitle.png', name:'Title'}, {src:'/img/frames/m15/regular/m15MaskType.png', name:'Type'}, {src:'/img/frames/m15/regular/m15MaskRules.png', name:'Rules'}, {src:'/img/frames/m15/regular/m15MaskFrame.png', name:'Frame'}, {src:'/img/frames/m15/regular/m15MaskBorder.png', name:'Border'}];
var bounds = {x:0.3267, y:0.6491, width:0.3474, height:0.2496};
//defines available frames
availableFrames = [
	{name:'White Frame', src:'/img/frames/m15/snow/w.png', masks:masks},
	{name:'Blue Frame', src:'/img/frames/m15/snow/u.png', masks:masks},
	{name:'Black Frame', src:'/img/frames/m15/snow/b.png', masks:masks},
	{name:'Red Frame', src:'/img/frames/m15/snow/r.png', masks:masks},
	{name:'Green Frame', src:'/img/frames/m15/snow/g.png', masks:masks},
	{name:'Multicolored Frame', src:'/img/frames/m15/snow/m.png', masks:masks},
	{name:'Artifact Frame', src:'/img/frames/m15/snow/a.png', masks:masks},
	{name:'Land Frame', src:'/img/frames/m15/snow/l.png', masks:masks},
	{name:'White Land Frame', src:'/img/frames/m15/snow/wl.png', masks:masks},
	{name:'Blue Land Frame', src:'/img/frames/m15/snow/ul.png', masks:masks},
	{name:'Black Land Frame', src:'/img/frames/m15/snow/bl.png', masks:masks},
	{name:'Red Land Frame', src:'/img/frames/m15/snow/rl.png', masks:masks},
	{name:'Green Land Frame', src:'/img/frames/m15/snow/gl.png', masks:masks},
	{name:'Plains Watermark', src:'/img/frames/snow/watermarks/w.png', bounds:bounds},
	{name:'Island Watermark', src:'/img/frames/snow/watermarks/u.png', bounds:bounds},
	{name:'Swamp Watermark', src:'/img/frames/snow/watermarks/b.png', bounds:bounds},
	{name:'Mountain Watermark', src:'/img/frames/snow/watermarks/r.png', bounds:bounds},
	{name:'Forest Watermark', src:'/img/frames/snow/watermarks/g.png', bounds:bounds},
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = async function() {
	//resets things so that every frame doesn't have to
	await resetCardIrregularities();
	//sets card version
	card.version = 'm15Regular';
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
		pt: {name:'Power/Toughness', text:'', x:0.7928, y:0.902, width:0.1367, height:0.0372, size:0.0372, font:'belerenbsc', oneLine:true, align:'center'}
	});
}
//loads available frames
loadFramePack();