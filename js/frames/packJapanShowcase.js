//Create objects for common properties across available frames
var masks = [
    {src:'/img/frames/m15/japanShowcase/mask/MaskPinline.png', name:'Pinline'},
	{src:'/img/frames/m15/japanShowcase/mask/MaskTitle.png', name:'Title'},
	{src:'/img/frames/m15/japanShowcase/mask/MaskType.png', name:'Type'},
	{src:'/img/frames/m15/japanShowcase/mask/MaskBottomPinline.png', name:'Bottom Pinline'},
	{src:'/img/frames/m15/japanShowcase/mask/MaskBottom.png', name:'Bottom'}];
	
var masks2 = [
	{src:'/img/frames/m15/japanShowcase/mana/1.png', name:'1 Mana Symbol'},
	{src:'/img/frames/m15/japanShowcase/mana/2.png', name:'2 Mana Symbol'}, 
	{src:'/img/frames/m15/japanShowcase/mana/3.png', name:'3 Mana Symbol'},
	{src:'/img/frames/m15/japanShowcase/mana/4.png', name:'4 Mana Symbol'},
	{src:'/img/frames/m15/japanShowcase/mana/5.png', name:'5 Mana Symbol'},
	{src:'/img/frames/m15/japanShowcase/mana/6.png', name:'6 Mana Symbol'},
	{src:'/img/frames/m15/japanShowcase/mana/7.png', name:'7 Mana Symbol'},
	{src:'/img/frames/m15/japanShowcase/mana/8.png', name:'8 Mana Symbol'},
	{src:'/img/frames/m15/japanShowcase/mana/9.png', name:'9 Mana Symbol'}];
	
var masks3 = [
    {src:'/img/frames/m15/japanShowcase/mask/MaskPtBoxPinline.png', name:'PT Box Pinline'}];

var bounds = {x:0.7771, y:0.8876, width:0.1720, height:0.0593};
var boundsStamp = {x:0.4365, y:0.902, width:0.1264, height:0.0452};
var bounds3 = {x:0, y:0, width:1, height:1};

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
	{name:'Border', src:'/img/frames/m15/japanShowcase/border.png', bounds:bounds3},
	

	{name:'White Power/Toughness', src:'/img/frames/m15/japanShowcase/pt/w.png', masks:masks3, bounds:bounds},
	{name:'Blue Power/Toughness', src:'/img/frames/m15/japanShowcase/pt/u.png', masks:masks3, bounds:bounds},
	{name:'Black Power/Toughness', src:'/img/frames/m15/japanShowcase/pt/b.png', masks:masks3, bounds:bounds},
	{name:'Red Power/Toughness', src:'/img/frames/m15/japanShowcase/pt/r.png', masks:masks3, bounds:bounds},
	{name:'Green Power/Toughness', src:'/img/frames/m15/japanShowcase/pt/g.png', masks:masks3, bounds:bounds},
	{name:'Multicolored Power/Toughness', src:'/img/frames/m15/japanShowcase/pt/m.png', masks:masks3, bounds:bounds},
	{name:'Artifact Power/Toughness', src:'/img/frames/m15/japanShowcase/pt/a.png', masks:masks3, bounds:bounds},
	{name:'Vehicle Power/Toughness', src:'/img/frames/m15/japanShowcase/pt/v.png', masks:masks3, bounds:bounds},

	{name:'Mana Symbol Backing (10)', src:'/img/frames/m15/japanShowcase/mana/10mana.png', masks:masks2, bounds:bounds3},


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
		mana: {name:'Mana Cost', text:'', y:0.0683, width:0.9190, height:71/2100, oneLine:true, size:71/1638, align:'right', shadowX:-0.001, shadowY:0.0029, manaCost:true, manaSpacing:0,},
		title: {name:'Title', text:'', x:0.0854, y:0.0522, width:0.8292, height:0.0543, oneLine:true, font:'belerenb', size:0.0381, outlineWidth:0.008, color:'white'},
		type: {name:'Type', text:'', x:0.0854, y:0.612, width:0.71, height:0.0543, oneLine:true, font:'belerenb', size:0.0279, outlineWidth:0.008, color:'white'},
		rules: {name:'Rules Text', text:'', x:0.086, y:0.692, width:0.771, height:0.206, size:0.033, outlineWidth:0.008, font:'Plantin MT Pro', color:'white'},
		pt: {name:'Power/Toughness', text:'', x:0.804, y:0.896, width:0.1180, height:0.049, size:0.04, font:'belerenbsc', oneLine:true, align:'center', color:'white'}
	});
}
//loads available frames
loadFramePack();