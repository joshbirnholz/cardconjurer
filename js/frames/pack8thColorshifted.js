//Create objects for common properties across available frames
var masks = [{src:'/img/frames/8th/pinline.png', name:'Pinline'}, {src:'/img/frames/8th/title.png', name:'Title'}, {src:'/img/frames/8th/type.png', name:'Type'}, {src:'/img/frames/8th/rules.png', name:'Rules'}, {src:'/img/frames/8th/frame.png', name:'Frame'}];
var bounds = {x:0.7234, y:0.881, width:0.204, height:0.0772};
//defines available frames
availableFrames = [
	{name:'White Frame', src:'/img/frames/8th/colorshifted/w.png', masks:masks},
	{name:'Blue Frame', src:'/img/frames/8th/colorshifted/u.png', masks:masks},
	{name:'Black Frame', src:'/img/frames/8th/colorshifted/b.png', masks:masks},
	{name:'Red Frame', src:'/img/frames/8th/colorshifted/r.png', masks:masks},
	{name:'Green Frame', src:'/img/frames/8th/colorshifted/g.png', masks:masks},
	{name:'Artifact Frame', src:'/img/frames/8th/colorshifted/a.png', masks:masks},
	{name:'White Power/Toughness', src:'/img/frames/m15/colorshifted/wpt.png', bounds:bounds},
	{name:'Blue Power/Toughness', src:'/img/frames/m15/colorshifted/upt.png', bounds:bounds},
	{name:'Black Power/Toughness', src:'/img/frames/m15/colorshifted/bpt.png', bounds:bounds},
	{name:'Red Power/Toughness', src:'/img/frames/m15/colorshifted/rpt.png', bounds:bounds},
	{name:'Green Power/Toughness', src:'/img/frames/m15/colorshifted/gpt.png', bounds:bounds},
	{name:'Artifact Power/Toughness', src:'/img/frames/m15/colorshifted/apt.png', bounds:bounds}
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = async function() {
	//resets things so that every frame doesn't have to
	await resetCardIrregularities();
	//sets card version
	card.version = '8thColorshifted';
	card.showsFlavorBar = false;
	//art bounds
	card.artBounds = {x:0.088, y:0.12, width:0.824, height:0.4348};
	autoFitArt();
	//set symbol bounds
	card.setSymbolBounds = {x:0.9047, y:0.5886, width:0.12, height:0.0391, vertical:'center', horizontal: 'right'};
	resetSetSymbol();
	//watermark bounds
	card.watermarkBounds = {x:0.5, y:0.7605, width:0.75, height:0.2305};
	resetWatermark();
	//text
	loadTextOptions({
		mana: {name:'Mana Cost', text:'', y:0.0705, width:0.9147, height:65/2100, oneLine:true, size:65/1638, align:'right', shadowX:-0.001, shadowY:0.0029, manaCost:true, manaSpacing:0},
		title: {name:'Title', text:'', x:0.09, y:0.0629, width:0.824, height:0.0429, oneLine:true, font:'matrixb', size:0.0429, color:"white", shadowX:-0.0021, shadowY:0.0015},
		type: {name:'Type', text:'', x:0.1, y:0.572, width:0.8, height:0.0358, oneLine:true, font:'matrixb', size:0.0358, color:"white", shadowX:-0.0021, shadowY:0.0015},
		rules: {name:'Rules Text', text:'', x:0.1, y:0.6277, width:0.8, height:0.2691, size:0.0362},
		pt: {name:'Power/Toughness', text:'', x:0.7667, y:0.8953, width:0.1367, height:0.0443, size:0.0443, font:'matrixbsc', oneLine:true, align:'center', color:"white", shadowX:-0.0021, shadowY:0.0015}
	});
	//bottom info
	loadBottomInfo({
		top: {text:'{conditionalcolor:Black_Frame,Land_Frame:white}\uFFEE {elemidinfo-artist}', x:0.094, y:1904/2100, width:0.8107, height:0.0248, oneLine:true, font:'matrixb', size:0.0248, color:'black', shadowX:0.0007, shadowY:0.0005},
		wizards: {name:'wizards', text:'{conditionalcolor:Black_Frame,Land_Frame:white}\u2122 & \u00a9 1993-{elemidinfo-year} Wizards of the Coast, Inc. {elemidinfo-number}', x:0.094, y:1958/2100, width:0.8107, height:0.0153, oneLine:true, font:'mplantin', size:0.0153, color:'black', shadowX:0.0007, shadowY:0.0005},
		bottom: {text:'{conditionalcolor:Black_Frame,Land_Frame:white}NOT FOR SALE   CardConjurer.com', x:0.094, y:1994/2100, width:0.8107, height:0.0134, oneLine:true, font:'mplantin', size:0.0134, color:'black', shadowX:0.0007, shadowY:0.0005}
	});
}
//loads available frames
loadFramePack();