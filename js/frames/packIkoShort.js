//Create objects for common properties across available frames
var masks = [{src:'/img/frames/iko/short/masks/maskPinlines.png', name:'Pinline'}, {src:'/img/frames/iko/short/masks/maskTitle.png', name:'Title'}, {src:'/img/frames/iko/short/masks/maskType.png', name:'Type'}, {src:'/img/frames/iko/short/masks/maskRules.png', name:'Rules'}, {src:'/img/frames/iko/short/masks/maskNoTitle.png', name:'No Title'}, {src:'/img/frames/iko/short/masks/maskNoBorder.png', name:'No Border'}, {src:'/img/frames/iko/short/masks/maskStraightBorder.png', name:'Straight Border'}, {src:'/img/frames/iko/short/masks/maskBorder.png', name:'Border'}];
var bounds = {x:0.7573, y:0.8848, width:0.188, height:0.0733};
//defines available frames
availableFrames = [
	{name:'White Frame', src:'/img/frames/iko/short/w.png', masks:masks},
	{name:'Blue Frame', src:'/img/frames/iko/short/u.png', masks:masks},
	{name:'Black Frame', src:'/img/frames/iko/short/b.png', masks:masks},
	{name:'Red Frame', src:'/img/frames/iko/short/r.png', masks:masks},
	{name:'Green Frame', src:'/img/frames/iko/short/g.png', masks:masks},
	{name:'Multicolored Frame', src:'/img/frames/iko/short/m.png', masks:masks},
	{name:'Artifact Frame', src:'/img/frames/iko/short/a.png', masks:masks},
	{name:'Artifact Frame (Alt)', src:'/img/frames/iko/short/a2.png', masks:masks},
	{name:'Land Frame', src:'/img/frames/iko/short/l.png', masks:masks},

	{name:'White Power/Toughness', src:'/img/frames/m15/nickname/m15NicknamePTW.png', bounds:bounds},
	{name:'Blue Power/Toughness', src:'/img/frames/m15/nickname/m15NicknamePTU.png', bounds:bounds},
	{name:'Black Power/Toughness', src:'/img/frames/m15/nickname/m15NicknamePTB.png', bounds:bounds},
	{name:'Red Power/Toughness', src:'/img/frames/m15/nickname/m15NicknamePTR.png', bounds:bounds},
	{name:'Green Power/Toughness', src:'/img/frames/m15/nickname/m15NicknamePTG.png', bounds:bounds},
	{name:'Multicolored Power/Toughness', src:'/img/frames/m15/nickname/m15NicknamePTM.png', bounds:bounds},
	{name:'Artifact Power/Toughness', src:'/img/frames/m15/nickname/m15NicknamePTA.png', bounds:bounds},
	{name:'Colorless Power/Toughness', src:'/img/frames/m15/nickname/m15NicknamePTC.png', bounds:bounds},

	{name:'White Frame (Colored Textboxes)', src:'/img/frames/iko/short/colored/w.png', masks:masks},
	{name:'Blue Frame (Colored Textboxes)', src:'/img/frames/iko/short/colored/u.png', masks:masks},
	{name:'Black Frame (Colored Textboxes)', src:'/img/frames/iko/short/colored/b.png', masks:masks},
	{name:'Red Frame (Colored Textboxes)', src:'/img/frames/iko/short/colored/r.png', masks:masks},
	{name:'Green Frame (Colored Textboxes)', src:'/img/frames/iko/short/colored/g.png', masks:masks},
	{name:'Multicolored Frame (Colored Textboxes)', src:'/img/frames/iko/short/colored/m.png', masks:masks},
	{name:'Artifact Frame (Colored Textboxes)', src:'/img/frames/iko/short/colored/a.png', masks:masks},
	{name:'Artifact Frame (Alt, Colored Textboxes)', src:'/img/frames/iko/short/colored/a2.png', masks:masks},
	{name:'Land Frame (Colored Textboxes)', src:'/img/frames/iko/short/colored/l.png', masks:masks},
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = async function() {
	//resets things so that every frame doesn't have to
	await resetCardIrregularities();
	//sets card version
	card.version = 'promoRegular';
	//art bounds
	card.artBounds = {x:0, y:0, width:1, height:0.9224};
	autoFitArt();
	//set symbol bounds
	card.setSymbolBounds = {x:0.9213, y:0.7272, width:0.12, height:0.0410, vertical:'center', horizontal: 'right'};
	resetSetSymbol();
	//watermark bounds
	card.watermarkBounds = {x:0.5, y:0.8415, width:0.75, height:0.1115};
	resetWatermark();
	//text
	loadTextOptions({
		mana: {name:'Mana Cost', text:'', y:0.0613, width:0.9292, height:71/2100, oneLine:true, size:71/1638, align:'right', shadowX:-0.001, shadowY:0.0029, manaCost:true, manaSpacing:0},
		title: {name:'Title', text:'', x:0.0854, y:0.0522, width:0.8292, height:0.0543, oneLine:true, font:'belerenb', size:0.0381, color:'white', shadowX:0.0014, shadowY:0.001},
		type: {name:'Type', text:'', x:0.0854, y:0.7024, width:0.8292, height:0.0543, oneLine:true, font:'belerenb', size:0.0324, color:'white', shadowX:0.0014, shadowY:0.001},
		rules: {name:'Rules Text', text:'', x:0.086, y:0.7647, width:0.828, height:0.1543, size:0.0362, color:'white', shadowX:0.0014, shadowY:0.001},
		pt: {name:'Power/Toughness', text:'', x:0.7928, y:0.902, width:0.1367, height:0.0372, size:0.0372, font:'belerenbsc', oneLine:true, align:'center', color:'white'}
	});
}
//loads available frames
loadFramePack();