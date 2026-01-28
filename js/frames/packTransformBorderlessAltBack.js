//Create objects for common properties across available frames
var masks = [{src:'/img/frames/m15/transform/borderlessAlt/masks/maskPinlineBack.png', name:'Pinline'}, {src:'/img/frames/m15/transform/borderlessAlt/masks/maskTitleBack.png', name:'Title'}, {src:'/img/frames/m15/transform/borderlessAlt/masks/maskType.png', name:'Type'}, {src:'/img/frames/m15/transform/borderlessAlt/masks/maskRulesBack.png', name:'Rules'}, {src:'/img/frames/m15/transform/borderlessAlt/masks/maskNoBorderBack.png', name:'No Border'}, {src:'/img/frames/m15/transform/borderlessAlt/masks/maskBorderBack.png', name:'Border'}];
var bounds = {x:0.7573, y:0.8848, width:0.188, height:0.0733};
//defines available frames
availableFrames = [
	{name:'White Frame', src:'/img/frames/m15/transform/borderlessAlt/back/w.png', masks:masks},
	{name:'Blue Frame', src:'/img/frames/m15/transform/borderlessAlt/back/u.png', masks:masks},
	{name:'Black Frame', src:'/img/frames/m15/transform/borderlessAlt/back/b.png', masks:masks},
	{name:'Red Frame', src:'/img/frames/m15/transform/borderlessAlt/back/r.png', masks:masks},
	{name:'Green Frame', src:'/img/frames/m15/transform/borderlessAlt/back/g.png', masks:masks},
	{name:'Multicolored Frame', src:'/img/frames/m15/transform/borderlessAlt/back/m.png', masks:masks},
	{name:'Artifact Frame', src:'/img/frames/m15/transform/borderlessAlt/back/a.png', masks:masks},
    {name:'Colorless Frame', src:'/img/frames/m15/transform/borderlessAlt/back/c.png', masks:masks},
	{name:'Land Frame', src:'/img/frames/m15/transform/borderlessAlt/back/L.png', masks:masks},
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
	card.version = 'transformBorderlessAltBack';
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
		title: {name:'Title', text:'', x:0.0854, y:0.0522, width:0.7547, height:0.0543, oneLine:true, font:'belerenb', size:0.0381, color:'white'},
		type: {name:'Type', text:'', x:0.0854, y:0.5664, width:0.8292, height:0.0543, oneLine:true, font:'belerenb', size:0.0324, color:'white'},
		rules: {name:'Rules Text', text:'', x:0.086, y:0.6303, width:0.828, height:0.2875, size:0.0362, color:'white'},
		pt: {name:'Power/Toughness', text:'', x:0.7928, y:0.902, width:0.1367, height:0.0372, size:0.0372, font:'belerenbsc', oneLine:true, align:'center', color:'white'}
	});
	notify('If you intend to add the color identity pips, we recommend that you shift your Type text to the right with "{right66}".')
}
//loads available frames
loadFramePack();