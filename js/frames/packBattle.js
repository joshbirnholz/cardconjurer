//Create objects for common properties across available frames
var masks = [{src:'/img/frames/m15/battle/maskPinline.png', name:'Pinline'}, {src:'/img/frames/m15/battle/maskTitle.png', name:'Title'}, {src:'/img/frames/m15/battle/maskType.png', name:'Type'}, {src:'/img/frames/m15/battle/maskRules.png', name:'Rules'}, {src:'/img/frames/m15/battle/maskDefense.png', name:'Defense'}, {src:'/img/frames/m15/battle/maskBorder.png', name:'Border'}];
//defines available frames
availableFrames = [
	{name:'White Frame', src:'/img/frames/m15/battle/w.png', masks:masks},
	{name:'Blue Frame', src:'/img/frames/m15/battle/u.png', masks:masks},
	{name:'Black Frame', src:'/img/frames/m15/battle/b.png', masks:masks},
	{name:'Red Frame', src:'/img/frames/m15/battle/r.png', masks:masks},
	{name:'Green Frame', src:'/img/frames/m15/battle/g.png', masks:masks},
	{name:'Multicolored Frame', src:'/img/frames/m15/battle/m.png', masks:masks},
	{name:'Artifact Frame', src:'/img/frames/m15/battle/a.png', masks:masks},
	{name:'Land Frame', src:'/img/frames/m15/battle/l.png', masks:masks},
	{name:'Colorless Frame', src:'/img/frames/m15/battle/c.png', masks:masks},

	{name:'Holo Stamp', src:'/img/frames/m15/battle/holostamp.png', bounds:{x:878/2010, y:2549/2814, width:251/2010, height:128/2814}}
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = async function() {
	// Notification
	//resets things so that every frame doesn't have to
	await resetCardIrregularities();
	replacementMasks = {'Right Half':'/img/frames/m15/battle/maskRightHalf.png'};
	//sets card version
	card.version = 'battle';
	//art bounds - rotation adjusted for portrait orientation
	card.artBounds = {x:0.1689, y:0.1369, width:0.6820, height:0.6750, rotation:-90};
	autoFitArt();
	//set symbol bounds - rotation adjusted for portrait orientation
	card.setSymbolBounds = {x:1242/2010, y:310/2814, width:0.12, height:0.0360, vertical:'center', horizontal: 'center', rotation:-90};
	resetSetSymbol();
	//watermark bounds
	card.watermarkBounds = {x:0, y:0, width:0.1, height:0.1};
	resetWatermark();
	//text
	loadTextOptions({
		mana: {name:'Mana Cost', text:'', x:0.0677, y:0.4561, width:0.5367, height:71/2100, oneLine:true, size:71/1638, align:'right', shadowX:-0.001, shadowY:0.0029, manaCost:true, manaSpacing:0, rotation:-90},
		title: {name:'Title', text:'', x:0.052, y:0.8170, width:0.5367, height:0.0543, oneLine:true, font:'belerenb', size:0.0381, rotation:-90},
		type: {name:'Type', text:'', x:0.58, y:0.8750, width:0.5367, height:0.0543, oneLine:true, font:'belerenb', size:0.0381, rotation:-90},
		rules: {name:'Rules Text', text:'', x:1350/2010, y:2453/2814, width:3010/2814, height:410/2010, size:0.0362, rotation:-90},
		pt2: {name:'Reverse PT', text:'', x:825/2010, y:285/2814, width:86/2100, height:1667/2814, size:0.0291, oneLine:true, color:'#666', align:'right', font:'belerenbsc', rotation:-90},
		defense: {name:'Defense', text:'', x:1895/2100, y:245/2814, width:123/2100, height:86/2814, size:0.0372, color:'white', font:'belerenbsc', oneLine:true, align:'center', rotation:-90}
	});
	if (card.text.rules.text == '') {
		card.text.rules.text = '{i}(As a Siege enters, choose an opponent to protect it. You and others can attack it. When it’s defeated, exile it, then cast it transformed.){/i}\n';
	}
}
//loads available frames
loadFramePack();