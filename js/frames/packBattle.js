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

	{name:'Holo Stamp', src:'/img/frames/m15/battle/holostamp.png', bounds:{x:103/2100, y:657/1500, width:93/2100, height:186/1500}}
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = async function() {
	// Notification
	//resets things so that every frame doesn't have to
	var previousCardHeight = card.height
	await resetCardIrregularities({canvas:[2814, 2010, 0, 0]});
	replacementMasks = {'Right Half':'/img/frames/m15/battle/maskRightHalf.png'};
	//sets card version
	card.version = 'battle';
	//rotation
	card.landscape = true;
	previewContext.translate(0, previousCardHeight / 2);
	previewContext.rotate(-Math.PI / 2);
	previewContext.scale(7/5, 5/7);
	//art bounds
	card.artBounds = {x:167/2100, y:60/1500, width:1873/2100, height:1371/1500};
	autoFitArt();
	//set symbol bounds
	card.setSymbolBounds = {x:1945/2100, y:925/1500, width:180/2100, height:86/1500, vertical:'center', horizontal: 'right'};
	resetSetSymbol();
	//watermark bounds
	card.watermarkBounds = {x:0, y:0, width:0, height:0};
	resetWatermark();
	//text
	loadTextOptions({
		mana: {name:'Mana Cost', text:'', x: 0/2100, y:100/1500, width:1957/2100, height:71/1500, oneLine:true, size:((71/1638)*2100)/1500, align:'right', shadowX:-0.001, shadowY:0.0029, manaCost:true, manaSpacing:0},
		title: {name:'Title', text:'', x:387/2100, y:81/1500, width:1547/2100, height:114/1500, oneLine:true, font:'belerenb', size:(0.0381*2100)/1500},
		type: {name:'Type', text:'', x:268/2100, y:873/1500, width:1667/2100, height:114/1500, oneLine:true, font:'belerenb', size:(0.0324*2100)/1500},
		rules: {name:'Rules Text', text:'', x:272/2100, y:1008/1500, width:1661/2100, height:414/1500, size:(0.0362*2100)/1500},
		reminder: {name:'Reverse PT', text:'', x:257/2100, y:1219/1500, width:1667/2100, height:43/1500, size:(0.0291*2100)/1500, oneLine:true, color:'#666', align:'right', font:'belerenbsc'},
		defense: {name:'Defense', text:'', x:1920/2100, y:1320/1500, width:86/2100, height:123/1500, size:(0.0372*2100)/1500, color:'white', font:'belerenbsc', oneLine:true, align:'center'}
	});
	if (card.text.rules.text == '') {
		card.text.rules.text = '{i}(As a Siege enters, choose an opponent to protect it. You and others can attack it. When it’s defeated, exile it, then cast it transformed.){/i}\n';
	}
	card.bottomInfoTranslate = {x: -123, y:-2814};
	card.bottomInfoRotate = 90;
	card.bottomInfoZoom = 1.4;
}
//loads available frames
loadFramePack();