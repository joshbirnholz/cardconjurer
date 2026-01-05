//Create objects for common properties across available frames
var masks = [{src:'/img/frames/modal/regular/reminder.svg', name:'Flipside'}, {src:'/img/frames/modal/regular/pinline.svg', name:'Pinline'}, {src:'/img/frames/modal/regular/title.svg', name:'Title'}, {src:'/img/frames/m15/regular/m15MaskType.png', name:'Type'}, {src:'/img/frames/modal/regular/textbox.svg', name:'Rules'}, {src:'/img/frames/modal/titleMDFCArrow.svg', name:'MDFC Arrow'}, {src:'/img/frames/modal/regular/frame.svg', name:'Frame'}, {src:'/img/frames/modal/regular/border.svg', name:'Border'}];
var bounds = {x:0.7573, y:0.8848, width:0.188, height:0.0733};
//defines available frames
availableFrames = [
	{name:'White Frame (Front)', src:'/img/frames/modal/ub/w.png', masks:masks},
	{name:'Blue Frame (Front)', src:'/img/frames/modal/ub/u.png', masks:masks},
	{name:'Black Frame (Front)', src:'/img/frames/modal/ub/b.png', masks:masks},
	{name:'Red Frame (Front)', src:'/img/frames/modal/ub/r.png', masks:masks},
	{name:'Green Frame (Front)', src:'/img/frames/modal/ub/g.png', masks:masks},
	{name:'Multicolored Frame (Front)', src:'/img/frames/modal/ub/m.png', masks:masks},
	{name:'Artifact Frame (Front)', src:'/img/frames/modal/ub/a.png', masks:masks},
	{name:'Land Frame (Front)', src:'/img/frames/modal/ub/l.png', masks:masks},
	{name:'Vehicle Frame (Front)', src:'/img/frames/modal/ub/v.png', masks:masks},

	{name:'White Enchantment Frame (Front)', src:'/img/frames/modal/ub/we.png', masks:masks},
	{name:'Blue Enchantment Frame (Front)', src:'/img/frames/modal/ub/ue.png', masks:masks},
	{name:'Black Enchantment Frame (Front)', src:'/img/frames/modal/ub/be.png', masks:masks},
	{name:'Red Enchantment Frame (Front)', src:'/img/frames/modal/ub/re.png', masks:masks},
	{name:'Green Enchantment Frame (Front)', src:'/img/frames/modal/ub/ge.png', masks:masks},
	{name:'Multicolored Enchantment Frame (Front)', src:'/img/frames/modal/ub/me.png', masks:masks},
	{name:'Artifact Enchantment Frame (Front)', src:'/img/frames/modal/ub/ae.png', masks:masks},

	{name:'White Power/Toughness', src:'/img/frames/m15/ub/pt/w.png', bounds:bounds},
	{name:'Blue Power/Toughness', src:'/img/frames/m15/ub/pt/u.png', bounds:bounds},
	{name:'Black Power/Toughness', src:'/img/frames/m15/ub/pt/b.png', bounds:bounds},
	{name:'Red Power/Toughness', src:'/img/frames/m15/ub/pt/r.png', bounds:bounds},
	{name:'Green Power/Toughness', src:'/img/frames/m15/ub/pt/g.png', bounds:bounds},
	{name:'Multicolored Power/Toughness', src:'/img/frames/m15/ub/pt/m.png', bounds:bounds},
	{name:'Artifact Power/Toughness', src:'/img/frames/m15/ub/pt/a.png', bounds:bounds},
	{name:'Colorless Power/Toughness', src:'/img/frames/m15/ub/pt/c.png', bounds:bounds},
	{name:'Vehicle Power/Toughness', src:'/img/frames/m15/ub/pt/v.png', bounds:bounds},

	{name:'White Frame (Back)', src:'/img/frames/modal/ub/back/w.png', masks:masks},
	{name:'Blue Frame (Back)', src:'/img/frames/modal/ub/back/u.png', masks:masks},
	{name:'Black Frame (Back)', src:'/img/frames/modal/ub/back/b.png', masks:masks},
	{name:'Red Frame (Back)', src:'/img/frames/modal/ub/back/r.png', masks:masks},
	{name:'Green Frame (Back)', src:'/img/frames/modal/ub/back/g.png', masks:masks},
	{name:'Multicolored Frame (Back)', src:'/img/frames/modal/ub/back/m.png', masks:masks},
	{name:'Artifact Frame (Back)', src:'/img/frames/modal/ub/back/a.png', masks:masks},
	{name:'Land Frame (Back)', src:'/img/frames/modal/ub/back/l.png', masks:masks},
	{name:'Vehicle Frame (Back)', src:'/img/frames/modal/ub/back/v.png', masks:masks},

	{name:'White Enchantment Frame (Back)', src:'/img/frames/modal/ub/back/we.png', masks:masks},
	{name:'Blue Enchantment Frame (Back)', src:'/img/frames/modal/ub/back/ue.png', masks:masks},
	{name:'Black Enchantment Frame (Back)', src:'/img/frames/modal/ub/back/be.png', masks:masks},
	{name:'Red Enchantment Frame (Back)', src:'/img/frames/modal/ub/back/re.png', masks:masks},
	{name:'Green Enchantment Frame (Back)', src:'/img/frames/modal/ub/back/ge.png', masks:masks},
	{name:'Multicolored Enchantment Frame (Back)', src:'/img/frames/modal/ub/back/me.png', masks:masks},
	{name:'Artifact Enchantment Frame (Back)', src:'/img/frames/modal/ub/back/ae.png', masks:masks},
	
	{name:'White Power/Toughness (Back)', src:'/img/frames/m15/transform/ub/ptW.png', bounds:bounds},
	{name:'Blue Power/Toughness (Back)', src:'/img/frames/m15/transform/ub/ptU.png', bounds:bounds},
	{name:'Black Power/Toughness (Back)', src:'/img/frames/m15/transform/ub/ptB.png', bounds:bounds},
	{name:'Red Power/Toughness (Back)', src:'/img/frames/m15/transform/ub/ptR.png', bounds:bounds},
	{name:'Green Power/Toughness (Back)', src:'/img/frames/m15/transform/ub/ptG.png', bounds:bounds},
	{name:'Multicolored Power/Toughness (Back)', src:'/img/frames/m15/transform/ub/ptM.png', bounds:bounds},
	{name:'Artifact Power/Toughness (Back)', src:'/img/frames/m15/transform/ub/ptA.png', bounds:bounds},
	{name:'Vehicle Power/Toughness (Back)', src:'/img/frames/m15/transform/ub/ptV.png', bounds:bounds},

	{name:'White Land Frame (Front)', src:'/img/frames/modal/ub/wl.png', masks:masks},
	{name:'Blue Land Frame (Front)', src:'/img/frames/modal/ub/ul.png', masks:masks},
	{name:'Black Land Frame (Front)', src:'/img/frames/modal/ub/bl.png', masks:masks},
	{name:'Red Land Frame (Front)', src:'/img/frames/modal/ub/rl.png', masks:masks},
	{name:'Green Land Frame (Front)', src:'/img/frames/modal/ub/gl.png', masks:masks},
	{name:'Multicolored Land Frame (Front)', src:'/img/frames/modal/ub/ml.png', masks:masks},

	{name:'White Land Frame (Back)', src:'/img/frames/modal/ub/back/wl.png', masks:masks},
	{name:'Blue Land Frame (Back)', src:'/img/frames/modal/ub/back/ul.png', masks:masks},
	{name:'Black Land Frame (Back)', src:'/img/frames/modal/ub/back/bl.png', masks:masks},
	{name:'Red Land Frame (Back)', src:'/img/frames/modal/ub/back/rl.png', masks:masks},
	{name:'Green Land Frame (Back)', src:'/img/frames/modal/ub/back/gl.png', masks:masks},
	{name:'Multicolored Land Frame (Back)', src:'/img/frames/modal/ub/back/ml.png', masks:masks},
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = async function() {
	//resets things so that every frame doesn't have to
	await resetCardIrregularities();
	//sets card version
	card.version = 'modalUB';
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
		pt: {name:'Power/Toughness', text:'', x:0.7928, y:0.902, width:0.1367, height:0.0372, size:0.0372, font:'belerenbsc', oneLine:true, align:'center', conditionalColor:'(Back),Vehicle Power/Toughness:white'}
	});
}
//loads available frames
loadFramePack();