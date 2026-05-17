//Create objects for common properties across available frames
var masks = [{src:'/img/frames/seventh/regular/pinline.svg', name:'Pinline'}, {src:'/img/frames/seventh/regular/rules.svg', name:'Rules'}, {src:'/img/frames/seventh/regular/frame.svg', name:'Frame'}, {src:'/img/frames/seventh/regular/trim.svg', name:'Textbox Pinline'}, {src:'/img/frames/seventh/regular/dual.svg', name:'Dual Land'}, {src:'/img/frames/seventh/regular/border.svg', name:'Border'}];
var borderMask = [{src:'/img/frames/seventh/regular/border.svg', name:'Border'}];
var bounds = {x:0.3354, y:0.6239, width:0.33, height:0.2386};
//defines available frames
availableFrames = [
	{name:'White Frame', src:'/img/frames/seventh/regular/w.png', masks:masks},
	{name:'Blue Frame', src:'/img/frames/seventh/regular/u.png', masks:masks},
	{name:'Black Frame', src:'/img/frames/seventh/regular/b.png', masks:masks},
	{name:'Red Frame', src:'/img/frames/seventh/regular/r.png', masks:masks},
	{name:'Green Frame', src:'/img/frames/seventh/regular/g.png', masks:masks},
	{name:'Multicolored Frame', src:'/img/frames/seventh/regular/m.png', masks:masks},
	{name:'Artifact Frame', src:'/img/frames/seventh/regular/a.png', masks:masks},
	{name:'Colorless Frame', src:'/img/frames/seventh/regular/c.png', masks:masks},
	{name:'Land Frame', src:'/img/frames/seventh/regular/l.png', masks:masks},
	{name:'DCI Star', src:'/img/frames/seventh/foilStar.svg'},
	{name:'Foil Layer', src:'/img/frames/effects/foil.png', opacity:20, masks:[{src:'/img/frames/seventh/foil.svg', name:'With Star'}, {src:'/img/frames/seventh/foil2.svg', name:'Without Star'}]},
	{name:'White Border', src:'/img/frames/white.png', masks:borderMask, noDefaultMask:true},
	{name:'Silver Border', src:'/img/frames/silver.png', masks:borderMask, noDefaultMask:true},
	{name:'Gold Border', src:'/img/frames/gold.png', masks:borderMask, noDefaultMask:true}
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = async function() {
	//resets things so that every frame doesn't have to
	await resetCardIrregularities();
	//sets card version
	card.version = 'planeswalkerSeventh';
	card.onload = '/js/frames/versionPlaneswalker.js';
	loadScript('/js/frames/versionPlaneswalker.js');
	//art bounds
	card.artBounds = {x:0.12, y:0.0991, width:0.7667, height:0.4429};
	autoFitArt();
	//set symbol bounds
	card.setSymbolBounds = {x:0.9, y:0.5739, width:0.12, height:0.0372, vertical:'center', horizontal: 'right'};
	resetSetSymbol();
	//watermark bounds
	card.watermarkBounds = {x:0.18, y:0.64, width:0.64, height:0.24};
	resetWatermark();
	//text
	loadTextOptions({
		mana: {name:'Mana Cost', text:'', x:0.1067, y:0.0539, width:0.8174, height:72/2100, oneLine:true, size:72/1638, align:'right', manaCost:true},
		title: {name:'Title', text:'', x:0.1134, y:0.0481, width:0.7734, height:0.041, oneLine:true, font:'goudymedieval', size:0.041, color:'white', shadowX:0.002, shadowY:0.0015},
		type: {name:'Type', text:'', x:0.1074, y:0.5486, width:0.7852, height:0.0543, oneLine:true, size:0.032, color:'white', shadowX:0.002, shadowY:0.0015},
		ability0: {name:'Ability 1', text:'', x:0.18, y:0.6067, width:0.70, height:0.0915, size:0.0358},
		ability1: {name:'Ability 2', text:'', x:0.18, y:0, width:0.70, height:0.0915, size:0.0358},
		ability2: {name:'Ability 3', text:'', x:0.18, y:0, width:0.70, height:0.0915, size:0.0358},
		ability3: {name:'Ability 4', text:'', x:0.18, y:0, width:0.70, height:0, size:0.0358},
		loyalty: {name:'Loyalty', text:'', x:0.8074, y:0.9043, width:0.1367, height:0.0429, size:0.0429, oneLine:true, align:'center', color:'white'}
	});
	//bottom info
	loadBottomInfo({
		top: {text:'Illus: {elemidinfo-artist}', x:0.1, y:1872/2100, width:0.8, height:0.0267, oneLine:true, size:0.0267, align:'center', shadowX:0.0021, shadowY:0.0015, color:'white'},
		credit: {name:'wizards', text:'Designed by {elemidinfo-credit}', x:0.1, y:1933/2100, width:0.8, height:0.0172, oneLine:true, size:0.0172, align:'center', shadowX:0.0014, shadowY:0.001, color:'white'}
	});
}
//loads available frames
loadFramePack();