//Create objects for common properties across available frames
var masks = [{src:'/img/frames/m15/regular/m15MaskPinline.png', name:'Pinline'}, {src:'/img/frames/m15/regular/m15MaskTitle.png', name:'Title'}, {src:'/img/frames/m15/regular/m15MaskType.png', name:'Type'}, {src:'/img/frames/m15/regular/m15MaskRules.png', name:'Rules'}, {src:'/img/frames/custom/m15-eighth/regular/Frame.png', name:'Frame'}, {src:'/img/frames/custom/m15-eighth/regular/Border.png', name:'Border'}];
var bounds = {x:0.7573, y:1901/2100, width:0.188, height:0.0733};
var stampBounds = {x:0.4254, y:0.9005, width:0.1494, height:0.0486};
var stampMasks = [{src:'/img/frames/custom/m15-eighth/ub/stamp/pinline.png', name: 'Pinline'}];
//defines available frames
availableFrames = [
	{name:'White Frame', src:'/img/frames/custom/m15-eighth/ub/w.png', masks:masks},
	{name:'Blue Frame', src:'/img/frames/custom/m15-eighth/ub/u.png', masks:masks},
	{name:'Black Frame', src:'/img/frames/custom/m15-eighth/ub/b.png', masks:masks},
	{name:'Red Frame', src:'/img/frames/custom/m15-eighth/ub/r.png', masks:masks},
	{name:'Green Frame', src:'/img/frames/custom/m15-eighth/ub/g.png', masks:masks},
	{name:'Multicolored Frame', src:'/img/frames/custom/m15-eighth/ub/m.png', masks:masks},
	{name:'Artifact Frame', src:'/img/frames/custom/m15-eighth/ub/a.png', masks:masks},
	{name:'Land Frame', src:'/img/frames/custom/m15-eighth/ub/l.png', masks:masks},
	{name:'Vehicle Frame', src:'/img/frames/custom/m15-eighth/ub/v.png', masks:masks},

	{name:'White Enchantment Frame', src:'/img/frames/custom/m15-eighth/ub/we.png', masks:masks},
	{name:'Blue Enchantment Frame', src:'/img/frames/custom/m15-eighth/ub/ue.png', masks:masks},
	{name:'Black Enchantment Frame', src:'/img/frames/custom/m15-eighth/ub/be.png', masks:masks},
	{name:'Red Enchantment Frame', src:'/img/frames/custom/m15-eighth/ub/re.png', masks:masks},
	{name:'Green Enchantment Frame', src:'/img/frames/custom/m15-eighth/ub/ge.png', masks:masks},
	{name:'Multicolored Enchantment Frame', src:'/img/frames/custom/m15-eighth/ub/me.png', masks:masks},
	{name:'Artifact Enchantment Frame', src:'/img/frames/custom/m15-eighth/ub/ae.png', masks:masks},

	{name:'White Power/Toughness', src:'/img/frames/m15/ub/pt/w.png', bounds:bounds},
	{name:'Blue Power/Toughness', src:'/img/frames/m15/ub/pt/u.png', bounds:bounds},
	{name:'Black Power/Toughness', src:'/img/frames/m15/ub/pt/b.png', bounds:bounds},
	{name:'Red Power/Toughness', src:'/img/frames/m15/ub/pt/r.png', bounds:bounds},
	{name:'Green Power/Toughness', src:'/img/frames/m15/ub/pt/g.png', bounds:bounds},
	{name:'Multicolored Power/Toughness', src:'/img/frames/m15/ub/pt/m.png', bounds:bounds},
	{name:'Artifact Power/Toughness', src:'/img/frames/m15/ub/pt/a.png', bounds:bounds},
	{name:'Vehicle Power/Toughness', src:'/img/frames/m15/ub/pt/v.png', bounds:bounds},
	{name:'Colorless Power/Toughness', src:'/img/frames/m15/ub/pt/c.png', bounds:bounds},

	{name:'White Land Frame', src:'/img/frames/custom/m15-eighth/ub/wl.png', masks:masks},
	{name:'Blue Land Frame', src:'/img/frames/custom/m15-eighth/ub/ul.png', masks:masks},
	{name:'Black Land Frame', src:'/img/frames/custom/m15-eighth/ub/bl.png', masks:masks},
	{name:'Red Land Frame', src:'/img/frames/custom/m15-eighth/ub/rl.png', masks:masks},
	{name:'Green Land Frame', src:'/img/frames/custom/m15-eighth/ub/gl.png', masks:masks},
	{name:'Multicolored Land Frame', src:'/img/frames/custom/m15-eighth/ub/ml.png', masks:masks},

	{name:'White Holo Stamp', src:'/img/frames/custom/m15-eighth/ub/stamp/w.png', bounds:stampBounds, masks: stampMasks},
	{name:'Blue Holo Stamp', src:'/img/frames/custom/m15-eighth/ub/stamp/u.png', bounds:stampBounds, masks: stampMasks},
	{name:'Black Holo Stamp', src:'/img/frames/custom/m15-eighth/ub/stamp/b.png', bounds:stampBounds, masks: stampMasks},
	{name:'Red Holo Stamp', src:'/img/frames/custom/m15-eighth/ub/stamp/r.png', bounds:stampBounds, masks: stampMasks},
	{name:'Green Holo Stamp', src:'/img/frames/custom/m15-eighth/ub/stamp/g.png', bounds:stampBounds, masks: stampMasks},
	{name:'Multicolored Holo Stamp', src:'/img/frames/custom/m15-eighth/ub/stamp/m.png', bounds:stampBounds, masks: stampMasks},
	{name:'Artifact Holo Stamp', src:'/img/frames/custom/m15-eighth/ub/stamp/a.png', bounds:stampBounds, masks: stampMasks},
	{name:'Land Holo Stamp', src:'/img/frames/custom/m15-eighth/ub/stamp/l.png', bounds:stampBounds, masks: stampMasks},
	{name:'Vehicle Holo Stamp', src:'/img/frames/custom/m15-eighth/ub/stamp/v.png', bounds:stampBounds, masks: stampMasks},

	{name:'Gray Holo Stamp', src:'/img/frames/custom/m15-eighth/ub/stamp/gray.png', bounds:stampBounds},
	{name:'Silver Holo Stamp', src:'/img/frames/custom/m15-eighth/ub/stamp/silver.png', bounds:stampBounds},
	{name:'Gold Holo Stamp', src:'/img/frames/custom/m15-eighth/ub/stamp/gold.png', bounds:stampBounds},
	{name:'Black Stamp Background', src:'/img/frames/custom/m15-eighth/ub/stamp/black.png', bounds:stampBounds},

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
		top: {text:'{conditionalcolor:White_Enchantment_Frame,Blue_Enchantment_Frame,Black_Enchantment_Frame,Red_Enchantment_Frame,Green_Enchantment_Frame,Multicolored_Enchantment_Frame,Artifact_Enchantment_Frame,M15_Border,Vehicle_Frame:white}\uFFEE {elemidinfo-artist}', x:0.0647, y:1973/2100, width:0.8107, height:0.0248, oneLine:true, font:'belerenbsc', size:0.02095, color:'black'},
		wizards: {name:'wizards', text:'{conditionalcolor:M15_Border,White_Enchantment_Frame,Blue_Enchantment_Frame,Black_Enchantment_Frame,Red_Enchantment_Frame,Green_Enchantment_Frame,Multicolored_Enchantment_Frame,Artifact_Enchantment_Frame,Land_Frame,Vehicle_Frame,Colorless_Frame,White_Land_Frame,Blue_Land_Frame,Black_Land_Frame,Red_Land_Frame,Green_Land_Frame,Multicolored_Land_Frame:white}\u2122 & \u00a9 1993-{elemidinfo-year} Wizards of the Coast, Inc. {elemidinfo-number}', x:0.0647, y:1958/2100, width:0.8107, height:0.0153, oneLine:true, font:'mplantin', size:0.0153, color:'black', shadowX:0.0007, shadowY:0.0005},
	});
}
//loads available frames
loadFramePack();
//Only for the main version as the webpage loads:
if (!card.text) {
	document.querySelector('#loadFrameVersion').click();
}