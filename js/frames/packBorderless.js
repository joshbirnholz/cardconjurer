//Create objects for common properties across available frames
var masks = [{src:'/img/frames/m15/genericShowcase/m15GenericShowcaseMaskPinline.png', name:'Pinline'}, {src:'/img/frames/m15/regular/m15MaskTitle.png', name:'Title'}, {src:'/img/frames/m15/regular/m15MaskType.png', name:'Type'}, {src:'/img/frames/m15/regular/m15MaskRules.png', name:'Rules'}, {src:'/img/frames/m15/regular/m15MaskBorder.png', name:'Border'}];
var bounds = {x:1146/1500, y:1861/2100, width:274/1500, height:140/2100};
//defines available frames
availableFrames = [
	{name:'White Frame', src:'/img/frames/m15/borderless/m15GenericShowcaseFrameW.png', masks:masks},
	{name:'Blue Frame', src:'/img/frames/m15/borderless/m15GenericShowcaseFrameU.png', masks:masks},
	{name:'Black Frame', src:'/img/frames/m15/borderless/m15GenericShowcaseFrameB.png', masks:masks},
	{name:'Red Frame', src:'/img/frames/m15/borderless/m15GenericShowcaseFrameR.png', masks:masks},
	{name:'Green Frame', src:'/img/frames/m15/borderless/m15GenericShowcaseFrameG.png', masks:masks},
	{name:'Multicolored Frame', src:'/img/frames/m15/borderless/m15GenericShowcaseFrameM.png', masks:masks},
	{name:'Artifact Frame', src:'/img/frames/m15/borderless/m15GenericShowcaseFrameA.png', masks:masks},
	{name:'Land Frame', src:'/img/frames/m15/borderless/m15GenericShowcaseFrameL.png', masks:masks},
	{name:'Colorless Frame', src:'/img/frames/m15/borderless/m15GenericShowcaseFrameC.png', masks:masks},
	{name:'White Power/Toughness', src:'/img/frames/m15/borderless/pt/w.png', bounds:bounds},
	{name:'Blue Power/Toughness', src:'/img/frames/m15/borderless/pt/u.png', bounds:bounds},
	{name:'Black Power/Toughness', src:'/img/frames/m15/borderless/pt/b.png', bounds:bounds},
	{name:'Red Power/Toughness', src:'/img/frames/m15/borderless/pt/r.png', bounds:bounds},
	{name:'Green Power/Toughness', src:'/img/frames/m15/borderless/pt/g.png', bounds:bounds},
	{name:'Multicolored Power/Toughness', src:'/img/frames/m15/borderless/pt/m.png', bounds:bounds},
	{name:'Artifact Power/Toughness', src:'/img/frames/m15/borderless/pt/a.png', bounds:bounds},
	{name:'Colorless Power/Toughness', src:'/img/frames/m15/borderless/pt/l.png', bounds:bounds},
	{name:'Vehicle Power/Toughness', src:'/img/frames/m15/borderless/pt/v.png', bounds:bounds}
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = async function() {
	//resets things so that every frame doesn't have to
	await resetCardIrregularities();
	//sets card version
	card.version = 'borderless';
	//art bounds
	card.artBounds = {x:0, y:0, width:1, height:0.9224};
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
		title: {name:'Title', text:'', x:0.0854, y:0.0522, width:0.8292, height:0.0543, oneLine:true, font:'belerenb', size:0.0381, color:'white'},
		type: {name:'Type', text:'', x:0.0854, y:0.5664, width:0.8292, height:0.0543, oneLine:true, font:'belerenb', size:0.0324, color:'white'},
		rules: {name:'Rules Text', text:'', x:0.086, y:0.6303, width:0.828, height:0.2875, size:0.0362, color:'white'},
		pt: {name:'Power/Toughness', text:'', x:0.7928, y:0.902, width:0.1367, height:0.0372, size:0.0372, font:'belerenbsc', oneLine:true, align:'center', color:'white'}
	});
}
//loads available frames
loadFramePack();