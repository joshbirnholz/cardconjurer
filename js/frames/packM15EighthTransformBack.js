//Create objects for common properties across available frames
var masks = [{src:'/img/frames/m15/transform/regular/new/maskPinlineBack.png', name:'Pinline'}, {src:'/img/frames/m15/transform/regular/new/maskTitle.png', name:'Title'}, {src:'/img/frames/m15/regular/m15MaskType.png', name:'Type'}, {src:'/img/frames/m15/regular/m15MaskRules.png', name:'Rules'}, {src:'/img/frames/custom/m15-eighth/transform/back/regular/maskFrameBack.png', name:'Frame'}, {src:'/img/frames/custom/m15-eighth/regular/Border.png', name:'Border'}];
var bounds = {x:0.7573, y:1901/2100, width:0.188, height:0.0733};
//defines available frames
availableFrames = [
	{name:'White Frame', src:'/img/frames/custom/m15-eighth/transform/back/regular/w.png', masks:masks},
	{name:'Blue Frame', src:'/img/frames/custom/m15-eighth/transform/back/regular/u.png', masks:masks},
	{name:'Black Frame', src:'/img/frames/custom/m15-eighth/transform/back/regular/b.png', masks:masks},
	{name:'Red Frame', src:'/img/frames/custom/m15-eighth/transform/back/regular/r.png', masks:masks},
	{name:'Green Frame', src:'/img/frames/custom/m15-eighth/transform/back/regular/g.png', masks:masks},
	{name:'Multicolored Frame', src:'/img/frames/custom/m15-eighth/transform/back/regular/m.png', masks:masks},
	{name:'Artifact Frame', src:'/img/frames/custom/m15-eighth/transform/back/regular/a.png', masks:masks},
	{name:'Vehicle Frame', src:'/img/frames/custom/m15-eighth/transform/back/regular/v.png', masks:masks},
	{name:'Land Frame', src:'/img/frames/custom/m15-eighth/transform/back/regular/l.png', masks:masks},
	{name:'White Power/Toughness', src:'/img/frames/m15/transform/regular/ptW.png', bounds:bounds},
	{name:'Blue Power/Toughness', src:'/img/frames/m15/transform/regular/ptU.png', bounds:bounds},
	{name:'Black Power/Toughness', src:'/img/frames/m15/transform/regular/ptB.png', bounds:bounds},
	{name:'Red Power/Toughness', src:'/img/frames/m15/transform/regular/ptR.png', bounds:bounds},
	{name:'Green Power/Toughness', src:'/img/frames/m15/transform/regular/ptG.png', bounds:bounds},
	{name:'Multicolored Power/Toughness', src:'/img/frames/m15/transform/regular/ptM.png', bounds:bounds},
	{name:'Artifact Power/Toughness', src:'/img/frames/m15/transform/regular/ptA.png', bounds:bounds},
	{name:'Vehicle Power/Toughness', src:'/img/frames/m15/transform/regular/ptV.png', bounds:bounds},
	{name:'White Land Frame', src:'/img/frames/custom/m15-eighth/transform/back/regular/wl.png', masks:masks},
	{name:'Blue Land Frame', src:'/img/frames/custom/m15-eighth/transform/back/regular/ul.png', masks:masks},
	{name:'Black Land Frame', src:'/img/frames/custom/m15-eighth/transform/back/regular/bl.png', masks:masks},
	{name:'Red Land Frame', src:'/img/frames/custom/m15-eighth/transform/back/regular/rl.png', masks:masks},
	{name:'Green Land Frame', src:'/img/frames/custom/m15-eighth/transform/back/regular/gl.png', masks:masks},
	{name:'Multicolored Land Frame', src:'/img/frames/custom/m15-eighth/transform/back/regular/ml.png', masks:masks},

	{name:'M15 Border', src:'/img/frames/m15/regular/m15MaskBorder.png'}
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = async function() {
	//resets things so that every frame doesn't have to
	await resetCardIrregularities();
	//sets card version
	card.version = 'm15EighthTransformBack';
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
		title: {name:'Title', text:'', x:0.0854, y:0.0522, width:0.7547, height:0.0543, oneLine:true, font:'belerenb', size:0.0381, color:'white'},
		type: {name:'Type', text:'', x:0.0854, y:0.5664, width:0.8292, height:0.0543, oneLine:true, font:'belerenb', size:0.0324, color:'white'},
		rules: {name:'Rules Text', text:'', x:0.086, y:0.6303, width:0.828, height:0.2875, size:0.0362},
		pt: {name:'Power/Toughness', text:'', x:0.7928, y:1937/2100, width:0.1367, height:0.0372, size:0.0372, font:'belerenbsc', oneLine:true, align:'center', color:'white'}
	});
	notify('If you intend to add the color identity pips, we recommend that you shift your Type text to the right with "{right88}".')
	//bottom info
	loadBottomInfo({
		top: {text:'{conditionalcolor:M15_Border,Nyx_White_Frame,Nyx_Blue_Frame,Nyx_Black_Frame,Nyx_Red_Frame,Nyx_Green_Frame,Nyx_Multicolored_Frame,Nyx_Artifact_Frame,Black_Frame,Land_Frame,Colorless_Frame,Vehicle_Frame,White_Land_Frame,Blue_Land_Frame,Black_Land_Frame,Red_Land_Frame,Green_Land_Frame,Multicolored_Land_Frame:white}\uFFEE {elemidinfo-artist}', x:0.0647, y:1973/2100, width:0.8107, height:0.0248, oneLine:true, font:'belerenbsc', size:0.02095, color:'black'},
		credit: {name:'wizards', text:'{conditionalcolor:M15_Border,Nyx_White_Frame,Nyx_Blue_Frame,Nyx_Black_Frame,Nyx_Red_Frame,Nyx_Green_Frame,Nyx_Multicolored_Frame,Nyx_Artifact_Frame,Black_Frame,Land_Frame,Colorless_Frame,Vehicle_Frame,White_Land_Frame,Blue_Land_Frame,Black_Land_Frame,Red_Land_Frame,Green_Land_Frame,Multicolored_Land_Frame:white}Designed by {elemidinfo-credit}', x:0.0647, y:1958/2100, width:0.8107, height:0.0153, oneLine:true, font:'mplantin', size:0.0153, color:'black', shadowX:0.0007, shadowY:0.0005}
	});
}
//loads available frames
loadFramePack();
