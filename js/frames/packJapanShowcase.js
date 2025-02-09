//Create objects for common properties across available frames
var masks = [
    {src:'/img/frames/m15/japanShowcase/MaskPinline.png', name:'Pinline'}, 
    {src:'/img/frames/m15/regular/m15MaskTitle.png', name:'Title'}, 
    {src:'/img/frames/m15/regular/m15MaskType.png', name:'Type'}, 
    {src:'/img/frames/m15/regular/m15MaskRules.png', name:'Rules'}, 
    {src:'/img/frames/m15/regular/m15MaskBorder.png', name:'Border'}];

var bounds = {x:0.7771, y:0.8876, width:0.1720, height:0.0593};
var boundsStamp = {x:0.4365, y:0.902, width:0.1264, height:0.0452};
//defines available frames

availableFrames = [
	{name:'White Frame', src:'/img/frames/m15/japanShowcase/w.png', masks:masks},
	{name:'Blue Frame', src:'/img/frames/m15/japanShowcase/u.png', masks:masks},
	{name:'Black Frame', src:'/img/frames/m15/japanShowcase/b.png', masks:masks},
	{name:'Red Frame', src:'/img/frames/m15/japanShowcase/r.png', masks:masks},
	{name:'Green Frame', src:'/img/frames/m15/japanShowcase/g.png', masks:masks},
	{name:'Multicolored Frame', src:'/img/frames/m15/japanShowcase/m.png', masks:masks},
	{name:'Artifact Frame', src:'/img/frames/m15/japanShowcase/a.png', masks:masks},
	{name:'Land Frame', src:'/img/frames/m15/japanShowcase/l.png', masks:masks},
	

	{name:'White Power/Toughness', src:'/img/frames/m15/japanShowcase/pt/w.png', bounds:bounds},
	{name:'Blue Power/Toughness', src:'/img/frames/m15/japanShowcase/pt/u.png', bounds:bounds},
	{name:'Black Power/Toughness', src:'/img/frames/m15/japanShowcase/pt/b.png', bounds:bounds},
	{name:'Red Power/Toughness', src:'/img/frames/m15/japanShowcase/pt/r.png', bounds:bounds},
	{name:'Green Power/Toughness', src:'/img/frames/m15/japanShowcase/pt/g.png', bounds:bounds},
	{name:'Multicolored Power/Toughness', src:'/img/frames/m15/japanShowcase/pt/m.png', bounds:bounds},
	{name:'Artifact Power/Toughness', src:'/img/frames/m15/japanShowcase/pt/a.png', bounds:bounds},



	{name:'White Holo Stamp', src:'/img/frames/m15/japanShowcase/stamp/w.png', bounds:boundsStamp},
	{name:'Blue Holo Stamp', src:'/img/frames/m15/japanShowcase/stamp/u.png', bounds:boundsStamp},
	{name:'Black Holo Stamp', src:'/img/frames/m15/japanShowcase/stamp/b.png', bounds:boundsStamp},
	{name:'Red Holo Stamp', src:'/img/frames/m15/japanShowcase/stamp/r.png', bounds:boundsStamp},
	{name:'Green Holo Stamp', src:'/img/frames/m15/japanShowcase/stamp/g.png', bounds:boundsStamp},
	{name:'Multicolored Holo Stamp', src:'/img/frames/m15/japanShowcase/stamp/m.png', bounds:boundsStamp},
	{name:'Artifact Holo Stamp', src:'/img/frames/m15/japanShowcase/stamp/a.png', bounds:boundsStamp},
	{name:'Land Holo Stamp', src:'/img/frames/m15/japanShowcase/stamp/l.png', bounds:boundsStamp},

];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = async function() {
	//resets things so that every frame doesn't have to
	await resetCardIrregularities();
	//sets card version
	card.version = 'japanShowcase';
	//art bounds
	card.artBounds = {x:0, y:0, width:1, height:0.9224};
	autoFitArt();
	//set symbol bounds
	card.setSymbolBounds = {x:0.91, y:0.635, width:0.12, height:0.0410, vertical:'center', horizontal: 'right'};
	resetSetSymbol();
	//watermark bounds
	card.watermarkBounds = {x:0.5, y:0.7762, width:0.75, height:0.2305};
	resetWatermark();
	//text
	loadTextOptions({
		mana: {name:'Mana Cost', text:'', y:0.0613, width:0.9292, height:71/2100, oneLine:true, size:65/1638, align:'right', shadowX:-0.001, shadowY:0.0029, manaCost:true, manaSpacing:0},
		title: {name:'Title', text:'', x:0.0854, y:0.0522, width:0.8292, height:0.0543, oneLine:true, font:'belerenb', size:0.0381, outlineWidth:0.008, color:'white'},
		type: {name:'Type', text:'', x:0.0854, y:0.612, width:0.71, height:0.0543, oneLine:true, font:'belerenb', size:0.0279, outlineWidth:0.008, color:'white'},
		rules: {name:'Rules Text', text:'', x:0.086, y:0.692, width:0.771, height:0.206, size:0.033, outlineWidth:0.008, color:'white'},
		pt: {name:'Power/Toughness', text:'', x:0.804, y:0.896, width:0.1180, height:0.049, size:0.04, font:'belerenbsc', oneLine:true, align:'center', color:'white'}
	});
}
//loads available frames
loadFramePack();