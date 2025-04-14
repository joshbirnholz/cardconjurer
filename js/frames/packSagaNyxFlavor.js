//Create objects for common properties across available frames
var masks = [{src:'/img/frames/saga/nyxflavor/masks/sagaMaskPinline.png', name:'Pinline'}, {src:'/img/frames/saga/nyxflavor/masks/sagaMaskTitle.png', name:'Title'}, {src:'/img/frames/saga/nyxflavor/masks/sagaMaskType.png', name:'Type'}, {src:'/img/frames/saga/nyxflavor/masks/sagaMaskFrame.png', name:'Frame'}, {src:'/img/frames/saga/nyxflavor/masks/sagaMaskBanner.png', name:'Banner'}, {src:'/img/frames/saga/nyxflavor/masks/sagaMaskBannerRight.png', name:'Banner (Right)'}, {src:'/img/frames/saga/nyxflavor/masks/sagaMaskText.png', name:'Text'}, {src:'/img/frames/saga/nyxflavor/masks/sagaMaskBorder.png', name:'Border'}];
var bounds = {x:1179/1500, y:1766/2100, width:237/1500, height:154/2100};
//defines available frames
availableFrames = [
	{name:'White Frame', src:'/img/frames/saga/nyxflavor/w.png', masks:masks},
	{name:'Blue Frame', src:'/img/frames/saga/nyxflavor/u.png', masks:masks},
	{name:'Black Frame', src:'/img/frames/saga/nyxflavor/b.png', masks:masks},
	{name:'Red Frame', src:'/img/frames/saga/nyxflavor/r.png', masks:masks},
	{name:'Green Frame', src:'/img/frames/saga/nyxflavor/g.png', masks:masks},
	{name:'Multicolored Frame', src:'/img/frames/saga/nyxflavor/m.png', masks:masks},
	{name:'Artifact Frame', src:'/img/frames/saga/nyxflavor/a.png', masks:masks},
	{name:'Land Frame', src:'/img/frames/saga/nyxflavor/L.png', masks:masks},
	{name:'Banner Pinstripe (Multicolored)', src:'/img/frames/saga/sagaMidStripe.png', bounds:{x:0.0727, y:0.3058, width:0.0087, height:0.4762}},

	{name:'White Power/Toughness', src:'/img/frames/saga/pt/w.png', bounds: bounds = {x:0.754, y:0.885, width:0.193, height:0.0758}},
	{name:'Blue Power/Toughness', src:'/img/frames/saga/pt/u.png', bounds: bounds = {x:0.754, y:0.885, width:0.193, height:0.0758}},
	{name:'Black Power/Toughness', src:'/img/frames/saga/pt/b.png', bounds: bounds = {x:0.754, y:0.885, width:0.193, height:0.0758}},
	{name:'Red Power/Toughness', src:'/img/frames/saga/pt/r.png', bounds: bounds = {x:0.754, y:0.885, width:0.193, height:0.0758}},
	{name:'Green Power/Toughness', src:'/img/frames/saga/pt/g.png', bounds: bounds = {x:0.754, y:0.885, width:0.193, height:0.0758}},
	{name:'Multicolored Power/Toughness', src:'/img/frames/saga/pt/m.png', bounds: bounds = {x:0.754, y:0.885, width:0.193, height:0.0758}},
	{name:'Artifact Power/Toughness', src:'/img/frames/saga/pt/a.png', bounds: bounds = {x:0.754, y:0.885, width:0.193, height:0.0758}},

	{name:'Holo Stamp', src:'/img/frames/saga/stamp.png', bounds:{x:0.438, y:0.912, width:0.124, height:0.0372}}
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = async function() {
	//resets things so that every frame doesn't have to
	await resetCardIrregularities();
	//sets card version
	card.version = 'SagaNyxFlavor';
	card.onload = '/js/frames/versionSaga.js';
	loadScript('/js/frames/versionSaga.js');
	//art bounds
	card.artBounds = {x:0.545, y:0.2020, width:0.3307, height:0.5624};
	autoFitArt();
	//set symbol bounds
	card.setSymbolBounds = {x:0.9227, y:0.7919, width:0.12, height:0.0381, vertical:'center', horizontal: 'right'};
	resetSetSymbol();
	//watermark bounds
	card.watermarkBounds = {x:0.3027, y:0.4748, width:0.3547, height:0.6767};
	resetWatermark();
	//text
	loadTextOptions({
		mana: {name:'Mana Cost', text:'', y:0.0613, width:0.9292, height:71/2100, oneLine:true, size:71/1638, align:'right', shadowX:-0.001, shadowY:0.0029, manaCost:true, manaSpacing:0},
		title: {name:'Title', text:'', x:0.0854, y:0.0522, width:0.8292, height:0.0543, oneLine:true, font:'belerenb', size:0.0381},
		type: {name:'Type', text:'', x:0.0854, y:0.7680, width:0.8292, height:0.0543, oneLine:true, font:'belerenb', size:0.0324},
		ability0: {name:'Ability 1', text:'', x:0.1334, y:0.2150, width:0.35, height:0.1786, size:0.0305},
		ability1: {name:'Ability 2', text:'', x:0.1334, y:0, width:0.35, height:0.1786, size:0.0305},
		ability2: {name:'Ability 3', text:'', x:0.1334, y:0, width:0.35, height:0.1786, size:0.0305},
		ability3: {name:'Ability 4', text:'', x:0.1334, y:0, width:0.35, height:0, size:0.0305},
		rules: {name:'Flavor Text', text:'', x:0.086, y:0.8260, width:0.8118, height:0.0943, size:0.0305, color:'black'},
		reminder: {name:'Reminder Text', text:'{i}(As this Saga enters and after your draw step, add a lore counter. Sacrifice after III.)', x:0.0867, y:0.1160, width:0.844, height:0.0828, size:0.0312, shadowColor:'white'},
		pt: {name:'Power/Toughness', text:'', x:0.8165, y:1895/2100, width:0.0967, height:0.0372, size:0.0372, font:'belerenbsc', oneLine:true, align:'center'},
	});
}
//loads available frames
loadFramePack();