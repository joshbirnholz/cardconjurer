//Create objects for common properties across available frames
var masks = [{src:'/img/frames/modal/regular/reminder.svg', name:'Flipside'}, {src:'/img/frames/modal/regular/pinline.svg', name:'Pinline'}, {src:'/img/frames/modal/regular/title.svg', name:'Title'}, {src:'/img/frames/m15/regular/m15MaskType.png', name:'Type'}, {src:'/img/frames/modal/regular/textbox.svg', name:'Rules'}, {src:'/img/frames/modal/titleMDFCArrow.svg', name:'MDFC Arrow'}, {src:'/img/frames/modal/regular/frame.svg', name:'Frame'}, {src:'/img/frames/modal/regular/border.svg', name:'Border'}];
var bounds = {x:0.7573, y:1901/2100, width:0.188, height:0.0733};
//defines available frames
availableFrames = [
	{name:'White Frame (Front)', src:'/img/frames/custom/m15-eighth/mdfc/front/regular/w.png', masks:masks},
	{name:'Blue Frame (Front)', src:'/img/frames/custom/m15-eighth/mdfc/front/regular/u.png', masks:masks},
	{name:'Black Frame (Front)', src:'/img/frames/custom/m15-eighth/mdfc/front/regular/b.png', masks:masks},
	{name:'Red Frame (Front)', src:'/img/frames/custom/m15-eighth/mdfc/front/regular/r.png', masks:masks},
	{name:'Green Frame (Front)', src:'/img/frames/custom/m15-eighth/mdfc/front/regular/g.png', masks:masks},
	{name:'Multicolored Frame (Front)', src:'/img/frames/custom/m15-eighth/mdfc/front/regular/m.png', masks:masks},
	{name:'Artifact Frame (Front)', src:'/img/frames/custom/m15-eighth/mdfc/front/regular/a.png', masks:masks},
	{name:'Land Frame (Front)', src:'/img/frames/custom/m15-eighth/mdfc/front/regular/l.png', masks:masks},
	{name:'Vehicle Frame (Front)', src:'/img/frames/custom/m15-eighth/mdfc/front/regular/v.png', masks:masks},

	{name:'White Power/Toughness', src:'/img/frames/m15/regular/m15PTW.png', bounds:bounds},
	{name:'Blue Power/Toughness', src:'/img/frames/m15/regular/m15PTU.png', bounds:bounds},
	{name:'Black Power/Toughness', src:'/img/frames/m15/regular/m15PTB.png', bounds:bounds},
	{name:'Red Power/Toughness', src:'/img/frames/m15/regular/m15PTR.png', bounds:bounds},
	{name:'Green Power/Toughness', src:'/img/frames/m15/regular/m15PTG.png', bounds:bounds},
	{name:'Multicolored Power/Toughness', src:'/img/frames/m15/regular/m15PTM.png', bounds:bounds},
	{name:'Artifact Power/Toughness', src:'/img/frames/m15/regular/m15PTA.png', bounds:bounds},
	{name:'Colorless Power/Toughness', src:'/img/frames/m15/regular/m15PTC.png', bounds:bounds},
	{name:'Vehicle Power/Toughness', src:'/img/frames/m15/regular/m15PTV.png', bounds:bounds},

	{name:'White Frame (Back)', src:'/img/frames/custom/m15-eighth/mdfc/back/regular/w.png', masks:masks},
	{name:'Blue Frame (Back)', src:'/img/frames/custom/m15-eighth/mdfc/back/regular/u.png', masks:masks},
	{name:'Black Frame (Back)', src:'/img/frames/custom/m15-eighth/mdfc/back/regular/b.png', masks:masks},
	{name:'Red Frame (Back)', src:'/img/frames/custom/m15-eighth/mdfc/back/regular/r.png', masks:masks},
	{name:'Green Frame (Back)', src:'/img/frames/custom/m15-eighth/mdfc/back/regular/g.png', masks:masks},
	{name:'Multicolored Frame (Back)', src:'/img/frames/custom/m15-eighth/mdfc/back/regular/m.png', masks:masks},
	{name:'Artifact Frame (Back)', src:'/img/frames/custom/m15-eighth/mdfc/back/regular/a.png', masks:masks},
	{name:'Land Frame (Back)', src:'/img/frames/custom/m15-eighth/mdfc/back/regular/l.png', masks:masks},
	{name:'Vehicle Frame (Back)', src:'/img/frames/custom/m15-eighth/mdfc/back/regular/v.png', masks:masks},
	
	{name:'White Power/Toughness (Back)', src:'/img/frames/m15/transform/regular/ptW.png', bounds:bounds},
	{name:'Blue Power/Toughness (Back)', src:'/img/frames/m15/transform/regular/ptU.png', bounds:bounds},
	{name:'Black Power/Toughness (Back)', src:'/img/frames/m15/transform/regular/ptB.png', bounds:bounds},
	{name:'Red Power/Toughness (Back)', src:'/img/frames/m15/transform/regular/ptR.png', bounds:bounds},
	{name:'Green Power/Toughness (Back)', src:'/img/frames/m15/transform/regular/ptG.png', bounds:bounds},
	{name:'Multicolored Power/Toughness (Back)', src:'/img/frames/m15/transform/regular/ptM.png', bounds:bounds},
	{name:'Artifact Power/Toughness (Back)', src:'/img/frames/m15/transform/regular/ptA.png', bounds:bounds},
	{name:'Vehicle Power/Toughness (Back)', src:'/img/frames/m15/transform/regular/ptV.png', bounds:bounds},

	{name:'White Land Frame (Front)', src:'/img/frames/custom/m15-eighth/mdfc/front/regular/wl.png', masks:masks},
	{name:'Blue Land Frame (Front)', src:'/img/frames/custom/m15-eighth/mdfc/front/regular/ul.png', masks:masks},
	{name:'Black Land Frame (Front)', src:'/img/frames/custom/m15-eighth/mdfc/front/regular/bl.png', masks:masks},
	{name:'Red Land Frame (Front)', src:'/img/frames/custom/m15-eighth/mdfc/front/regular/rl.png', masks:masks},
	{name:'Green Land Frame (Front)', src:'/img/frames/custom/m15-eighth/mdfc/front/regular/gl.png', masks:masks},
	{name:'Multicolored Land Frame (Front)', src:'/img/frames/custom/m15-eighth/mdfc/front/regular/ml.png', masks:masks},

	{name:'White Land Frame (Back)', src:'/img/frames/custom/m15-eighth/mdfc/back/regular/wl.png', masks:masks},
	{name:'Blue Land Frame (Back)', src:'/img/frames/custom/m15-eighth/mdfc/back/regular/ul.png', masks:masks},
	{name:'Black Land Frame (Back)', src:'/img/frames/custom/m15-eighth/mdfc/back/regular/bl.png', masks:masks},
	{name:'Red Land Frame (Back)', src:'/img/frames/custom/m15-eighth/mdfc/back/regular/rl.png', masks:masks},
	{name:'Green Land Frame (Back)', src:'/img/frames/custom/m15-eighth/mdfc/back/regular/gl.png', masks:masks},
	{name:'Multicolored Land Frame (Back)', src:'/img/frames/custom/m15-eighth/mdfc/back/regular/ml.png', masks:masks},
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = async function() {
	//resets things so that every frame doesn't have to
	await resetCardIrregularities();
	//sets card version
	card.version = 'M15EighthModal';
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
		title: {name:'Title', text:'', x:0.1614, y:0.0522, width:0.7534, height:0.0543, oneLine:true, font:'belerenb', size:0.0381, conditionalColor:'(Back):white'},
		type: {name:'Type', text:'', x:0.0854, y:0.5664, width:0.8292, height:0.0543, oneLine:true, font:'belerenb', size:0.0324, conditionalColor:'(Back):white'},
		rules: {name:'Rules Text', text:'', x:0.086, y:0.6303, width:0.828, height:0.2875, size:0.0362},
		flipsideType: {name:'Flipside Type', text:'', x:0.068, y:0.892, width:0.364, height:0.0391, size:0.0234, color:'white', oneLine:true, font:'belerenb', conditionalColor:'(Back):black'},
		flipSideReminder: {name:'Flipside Text', text:'', x:0.068, y:0.892, width:0.364, height:0.0391, size:0.0258, color:'white', oneLine:true, align:'right', conditionalColor:'(Back):black'},
		pt: {name:'Power/Toughness', text:'', x:0.7928, y:1937/2100, width:0.1367, height:0.0372, size:0.0372, font:'belerenbsc', oneLine:true, align:'center', conditionalColor:'(Back),Vehicle Power/Toughness:white'}
	});
	//bottom info
	loadBottomInfo({
		top: {text:'{conditionalcolor:M15_Border,Nyx_White_Frame,Nyx_Blue_Frame,Nyx_Black_Frame,Nyx_Red_Frame,Nyx_Green_Frame,Nyx_Multicolored_Frame,Nyx_Artifact_Frame,Black_Frame,Land_Frame,Colorless_Frame,Vehicle_Frame,White_Land_Frame,Blue_Land_Frame,Black_Land_Frame,Red_Land_Frame,Green_Land_Frame,Multicolored_Land_Frame:white}\uFFEE {elemidinfo-artist}', x:0.0647, y:1973/2100, width:0.8107, height:0.0248, oneLine:true, font:'belerenbsc', size:0.02095, color:'black'},
		wizards: {name:'wizards', text:'{conditionalcolor:M15_Border,Nyx_White_Frame,Nyx_Blue_Frame,Nyx_Black_Frame,Nyx_Red_Frame,Nyx_Green_Frame,Nyx_Multicolored_Frame,Nyx_Artifact_Frame,Black_Frame,Land_Frame,Colorless_Frame,Vehicle_Frame,White_Land_Frame,Blue_Land_Frame,Black_Land_Frame,Red_Land_Frame,Green_Land_Frame,Multicolored_Land_Frame:white}\u2122 & \u00a9 1993-{elemidinfo-year} Wizards of the Coast, Inc. {elemidinfo-number}', x:0.0647, y:1958/2100, width:0.8107, height:0.0153, oneLine:true, font:'mplantin', size:0.0153, color:'black', shadowX:0.0007, shadowY:0.0005},
	});
}
//loads available frames
loadFramePack();