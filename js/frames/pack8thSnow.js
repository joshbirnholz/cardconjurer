//Create objects for common properties across available frames
var masks = [{src:'/img/frames/8th/pinline.png', name:'Pinline'}, {src:'/img/frames/8th/title.png', name:'Title'}, {src:'/img/frames/8th/type.png', name:'Type'}, {src:'/img/frames/8th/rules.png', name:'Rules'}, {src:'/img/frames/8th/frame.png', name:'Frame'}, {src:'/img/frames/8th/border.png', name:'Border'}];
var masks2 = [{src:'/img/frames/8th/border.png', name:'Border'}];
var bounds = {x:1461/2010, y:2481/2814, width:414/2010, height:218/2814};
var wmBounds = {x:710/2010, y:1830/2814, width: 634/2010, height:638/2814};
//defines available frames
availableFrames = [
	{name:'White Frame', src:'/img/frames/8th/snow/w.png', masks:masks},
	{name:'Blue Frame', src:'/img/frames/8th/snow/u.png', masks:masks},
	{name:'Black Frame', src:'/img/frames/8th/snow/b.png', masks:masks},
	{name:'Red Frame', src:'/img/frames/8th/snow/r.png', masks:masks},
	{name:'Green Frame', src:'/img/frames/8th/snow/g.png', masks:masks},
	{name:'Multicolored Frame', src:'/img/frames/8th/snow/m.png', masks:masks},
	{name:'Artifact Frame', src:'/img/frames/8th/snow/a.png', masks:masks},
	{name:'Colorless Frame', src:'/img/frames/8th/snow/c.png', masks:masks},
	{name:'Land Frame', src:'/img/frames/8th/snow/l.png', masks:masks},
	{name:'White Land Frame', src:'/img/frames/8th/snow/wl.png', masks:masks},
	{name:'Blue Land Frame', src:'/img/frames/8th/snow/ul.png', masks:masks},
	{name:'Black Land Frame', src:'/img/frames/8th/snow/bl.png', masks:masks},
	{name:'Red Land Frame', src:'/img/frames/8th/snow/rl.png', masks:masks},
	{name:'Green Land Frame', src:'/img/frames/8th/snow/gl.png', masks:masks},
	{name:'Multicolored Land Frame', src:'/img/frames/8th/snow/ml.png', masks:masks},
	{name:'White Power/Toughness', src:'/img/frames/8th/pt/w.png', bounds:bounds},
	{name:'Blue Power/Toughness', src:'/img/frames/8th/pt/u.png', bounds:bounds},
	{name:'Black Power/Toughness', src:'/img/frames/8th/pt/b.png', bounds:bounds},
	{name:'Red Power/Toughness', src:'/img/frames/8th/pt/r.png', bounds:bounds},
	{name:'Green Power/Toughness', src:'/img/frames/8th/pt/g.png', bounds:bounds},
	{name:'Multicolored Power/Toughness', src:'/img/frames/8th/pt/m.png', bounds:bounds},
	{name:'Artifact Power/Toughness', src:'/img/frames/8th/pt/a.png', bounds:bounds},
	{name:'Colorless Power/Toughness', src:'/img/frames/8th/pt/l.png', bounds:bounds},
	{name:'White Watermark', src:'/img/frames/snow/watermarks/w.png', bounds:wmBounds},
	{name:'Blue Watermark', src:'/img/frames/snow/watermarks/u.png', bounds:wmBounds},
	{name:'Black Watermark', src:'/img/frames/snow/watermarks/b.png', bounds:wmBounds},
	{name:'Red Watermark', src:'/img/frames/snow/watermarks/r.png', bounds:wmBounds},
	{name:'Green Watermark', src:'/img/frames/snow/watermarks/g.png', bounds:wmBounds},
	{name:'Colorless Watermark', src:'/img/frames/snow/watermarks/c.png', bounds:{x:687/2010, y:1830/2814, width: 634/2010, height:638/2814}},
	{name:'White Border', src:'/img/frames/white.png', masks:masks2, noDefaultMask:true},
	{name:'Silver Border', src:'/img/frames/silver.png', masks:masks2, noDefaultMask:true},
	{name:'Gold Border', src:'/img/frames/gold.png', masks:masks2, noDefaultMask:true}
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = async function() {
	//resets things so that every frame doesn't have to
	await resetCardIrregularities();
	//sets card version
	card.version = '8thSnow';
	card.showsFlavorBar = false;
	//art bounds
	card.artBounds = {x:180/2010, y:341/2814, width:1656/2010, height:1216/2814};
	autoFitArt();
	//set symbol bounds
	card.setSymbolBounds = {x:0.9079, y:0.5886, width:0.12, height:0.0391, vertical:'center', horizontal: 'right'};
	resetSetSymbol();
	//watermark bounds
	card.watermarkBounds = {x:0.5, y:0.7605, width:0.75, height:0.2305};
	resetWatermark();
	//text
	loadTextOptions({
		mana: {name:'Mana Cost', text:'', y:202/2814, width:0.9147, height:65/2100, oneLine:true, size:65/1638, align:'right', shadowX:-0.001, shadowY:0.0029, manaCost:true, manaSpacing:0},
		title: {name:'Title', text:'', x:0.09, y:0.0629, width:0.824, height:0.0429, oneLine:true, font:'matrixb', size:0.0429},
		type: {name:'Type', text:'', x:205/2010, y:1611/2814, width:1601/2010, height:0.0358, oneLine:true, font:'matrixb', size:0.0358},
		rules: {name:'Rules Text', text:'', x:205/2010, y:1779/2814, width:1596/2010, height:729/2814, size:0.0362},
		pt: {name:'Power/Toughness', text:'', x:0.7667, y:2514/2814, width:0.1367, height:0.0443, size:0.0443, font:'matrixbsc', oneLine:true, align:'center'}
	});
	//bottom info
	loadBottomInfo({
		top: {text:'{conditionalcolor:Black_Frame*Frame*!Right_Half,Land_Frame*Frame*!Right_Half,Black_Nyx_Frame*Frame*!Right_Half,Colorless_Frame:white}{brush} {elemidinfo-artist}', x:150/2010, y:1938/2100, width:0.8107, height:0.0248, oneLine:true, font:'matrixb', size:0.0248, color:'black'},
		wizards: {name:'wizards', text:'{conditionalcolor:Black_Frame*Frame*!Right_Half,Land_Frame*Frame*!Right_Half,Black_Nyx_Frame*Frame*!Right_Half,Colorless_Frame:white}\u2122 & \u00a9 1993-{elemidinfo-year} Wizards of the Coast, Inc. {elemidinfo-number}', x:150/2010, y:1958/2100, width:0.8107, height:0.0153, oneLine:true, font:'mplantin', size:0.0153, color:'black'},
		bottom: {text:'{conditionalcolor:Black_Frame*Frame*!Right_Half,Land_Frame*Frame*!Right_Half,Black_Nyx_Frame*Frame*!Right_Half,Colorless_Frame:white}NOT FOR SALE   CardConjurer.com', x:150/2010, y:1994/2100, width:0.8107, height:0.0134, oneLine:true, font:'mplantin', size:0.0134, color:'black'}
	});
}
//loads available frames
loadFramePack();