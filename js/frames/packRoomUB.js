//Create objects for common properties across available frames
var stampBounds = {x:894/2010, y:2559/2814, width:216/2010, height:121/2814};
var masks = [{src:'/img/frames/m15/room/maskRight.png', name:'Right Side'}];
//defines available frames
availableFrames = [
	{name:'White Frame', src:'/img/frames/m15/room/ub/w.png', masks:masks},
	{name:'Blue Frame', src:'/img/frames/m15/room/ub/u.png', masks:masks},
	{name:'Black Frame', src:'/img/frames/m15/room/ub/b.png', masks:masks},
	{name:'Red Frame', src:'/img/frames/m15/room/ub/r.png', masks:masks},
	{name:'Green Frame', src:'/img/frames/m15/room/ub/g.png', masks:masks},
	{name:'Multicolored Frame', src:'/img/frames/m15/room/ub/m.png', masks:masks},
	{name:'Artifact Frame', src:'/img/frames/m15/room/ub/a.png', masks:masks},
	{name:'Land Frame', src:'/img/frames/m15/room/ub/l.png', masks:masks},

	{name:'Holo Stamp', src: '/img/frames/m15/room/ub/stamp.png', bounds:stampBounds},
	{name:'Gray Holo Stamp', src: '/img/frames/m15/room/ub/grayStamp.png', bounds:stampBounds}
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = async function() {
	// Notification
	notify('At this time, rotated set symbols are not an option, unless added manually with external software. Apologies for the inconvenience!', 10);
	//resets things so that every frame doesn't have to
	await resetCardIrregularities();
	//sets card version
	card.version = 'roomUB';
	//art bounds
	card.artBounds = {x:276/2010, y:133/2814, width:1115/2010, height:2428/2814};
	autoFitArt();
	//set symbol bounds
	card.setSymbolBounds = {x:2, y:2, width:0.12, height:0.0410, vertical:'center', horizontal: 'right'};
	resetSetSymbol();
	//watermark bounds
	card.watermarkBounds = {x:0.5, y:0.7762, width:0.75, height:0.2305};
	resetWatermark();
	//text
	loadTextOptions({
		mana: {name:'Mana Cost (Right)', text:'', x:130/2010, y:0.4381, width:0.5367, height:71/2100, oneLine:true, size:71/1638, align:'right', shadowX:-0.001, shadowY:0.0029, manaCost:true, manaSpacing:0, rotation:-90},
		title: {name:'Title (Right)', text:'', x:105/2010, y:0.4381, width:0.5367, height:0.0543, oneLine:true, font:'belerenb', size:0.0381, rotation:-90},
		rules: {name:'Rules Text (Right)', text:'', x:1054/1500, y:0.4334, width:776/1500, height:372/2100, size:0.0362, rotation:-90},
		mana2: {name:'Mana Cost (Left)', text:'', x:130/2010, y:0.8943, width:0.5367, height:71/2100, oneLine:true, size:71/1638, align:'right', shadowX:-0.001, shadowY:0.0029, manaCost:true, manaSpacing:0, rotation:-90},
		title2: {name:'Title (Left)', text:'', x:105/2010, y:0.8943, width:0.5367, height:0.0543, oneLine:true, font:'belerenb', size:0.0381, rotation:-90},
		type: {name:'Type', text:'', x:0.55, y:0.8943, width:1762/1500, height:0.0286, oneLine:true, font:'belerenb', size:0.0286, color:'white', rotation:-90},
		rules2: {name:'Rules Text (Left)', text:'', x:1054/1500, y:0.8896, width:776/1500, height:372/2100, size:0.0362, rotation:-90},
		reminder: {name:'Room Rules', text:'{i}(You may cast either half. That door unlocks on the battlefield. As a sorcery, you may pay the mana cost of a locked door to unlock it.){/i}', x:916/1500, y:1868/2100, width:1734/1500, height:110/2100, color:'white', align:'center', size:0.0362, rotation:-90}
		});
}
//loads available frames
loadFramePack();