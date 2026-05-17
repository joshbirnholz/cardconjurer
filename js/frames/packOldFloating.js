//Create objects for common properties across available frames
var masks = [{src:'/img/frames/old/floating/title.svg', name:'Title'}, {src:'/img/frames/old/floating/frame.svg', name:'Frame'}, {src:'/img/frames/old/floating/pinline.svg', name:'Pinline'}, {src:'/img/frames/old/floating/rules.svg', name:'Rules'}];
//defines available frames
availableFrames = [
	{name:'White Frame', src:'/img/frames/old/floating/w.png', masks:masks},
	{name:'Blue Frame', src:'/img/frames/old/floating/u.png', masks:masks},
	{name:'Black Frame', src:'/img/frames/old/floating/b.png', masks:masks},
	{name:'Red Frame', src:'/img/frames/old/floating/r.png', masks:masks},
	{name:'Green Frame', src:'/img/frames/old/floating/g.png', masks:masks},
	{name:'Multicolored Frame', src:'/img/frames/old/floating/m.png', masks:masks},
	{name:'Artifact Frame', src:'/img/frames/old/floating/a.png', masks:masks},
	{name:'Land Frame', src:'/img/frames/old/floating/l.png', masks:masks},
	{name:'White Land Frame', src:'/img/frames/old/floating/land/w.png', masks:masks},
	{name:'Blue Land Frame', src:'/img/frames/old/floating/land/u.png', masks:masks},
	{name:'Black Land Frame', src:'/img/frames/old/floating/land/b.png', masks:masks},
	{name:'Red Land Frame', src:'/img/frames/old/floating/land/r.png', masks:masks},
	{name:'Green Land Frame', src:'/img/frames/old/floating/land/g.png', masks:masks},
	{name:'Colorless Frame', src:'/img/frames/old/floating/c.png', masks:masks},
	{name:'Tombstone Icon', src:'/img/frames/old/icons/tombstone.svg', bounds: {x:0.0687, y:0.0491, width:0.0338, height:0.0329}},
	{name:'DCI Star', src:'/img/frames/seventh/foilStar.svg'},
	{name:'Foil Layer', src:'/img/frames/effects/foil.png', opacity:20, masks:[{src:'/img/frames/seventh/foil.svg', name:'With Star'}, {src:'/img/frames/seventh/foil2.svg', name:'Without Star'}]},
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = async function() {
	//resets things so that every frame doesn't have to
	await resetCardIrregularities();
	//sets card version
	card.version = 'oldFloating';
	card.showsFlavorBar = false;
	//art bounds
	card.artBounds = {x:0, y:0, width:1, height:1};
	autoFitArt();
	//set symbol bounds
	card.setSymbolBounds = {x:0.9, y:0.5739, width:0.12, height:0.0372, vertical:'center', horizontal: 'right'};
	resetSetSymbol();
	//watermark bounds
	card.watermarkBounds = {x:0.5, y:0.7429, width:0.6, height:0.25};
	resetWatermark();
	//text
	loadTextOptions({
		mana: {name:'Mana Cost', text:'', x:0.1067, y:0.0539, width:0.8174, height:72/2100, oneLine:true, size:72/1638, align:'right', manaCost:true},
		title: {name:'Title', text:'', x:0.1134, y:0.0481, width:0.7734, height:0.041, oneLine:true, font:'goudymedieval', size:0.041, color:'white', shadowX:0.002, shadowY:0.0015},
		type: {name:'Type', text:'', x:0.1074, y:0.5486, width:0.7852, height:0.0543, oneLine:true, size:0.032, color:'white', shadowX:0.002, shadowY:0.0015},
		rules: {name:'Rules Text', text:'', x:0.128, y:0.6067, width:0.744, height:0.2724, size:0.0358},
		pt: {name:'Power/Toughness', text:'', x:0.8074, y:0.9043, width:0.1367, height:0.0429, size:0.0429, oneLine:true, align:'center', color:'white', shadowX:0.002, shadowY:0.0015}
	});
	//bottom info
	loadBottomInfo({
		top: {text:'Illus: {elemidinfo-artist}', x:0.1, y:1872/2100, width:0.8, height:0.0267, oneLine:true, size:0.0267, align:'center', shadowX:0.0021, shadowY:0.0015, color:'white'},
		credit: {name:'wizards', text:'Designed by {elemidinfo-credit}', x:0.1, y:1933/2100, width:0.8, height:0.0172, oneLine:true, size:0.0172, align:'center', shadowX:0.0014, shadowY:0.001, color:'white'}
	});
}
//loads available frames
loadFramePack();