//Create objects for common properties across available frames
var masks = [{src:'/img/frames/stellarSights/posterStellarSights/masks/maskPinlines.png', name:'Pinlines'}, {src:'/img/frames/stellarSights/posterStellarSights/masks/maskRules.png', name:'Rules'}, {src:'/img/frames/stellarSights/posterStellarSights/masks/maskLeftHalf.png', name:'Left Half Frame'}, {src:'/img/frames/stellarSights/posterStellarSights/masks/maskRightHalf.png', name:'Right Half Frame'}, {src:'/img/frames/stellarSights/posterStellarSights/masks/maskFrame.png', name:'Frame'}, {src:'/img/frames/stellarSights/posterStellarSights/masks/maskBorder.png', name:'Border'}];
var masks2 = [{src:'/img/frames/stellarSights/posterStellarSights/pt/masks/maskInnerPT.png', name:'Inner Frame'}, {src:'/img/frames/stellarSights/posterStellarSights/pt/masks/maskOuterPT.png', name:'Outer Frame'}];
//defines available frames
availableFrames = [
	{name:'White Frame', src:'/img/frames/stellarSights/posterStellarSights/w.png', masks:masks},
	{name:'Blue Frame', src:'/img/frames/stellarSights/posterStellarSights/u.png', masks:masks},
	{name:'Black Frame', src:'/img/frames/stellarSights/posterStellarSights/b.png', masks:masks},
	{name:'Red Frame', src:'/img/frames/stellarSights/posterStellarSights/r.png', masks:masks},
	{name:'Green Frame', src:'/img/frames/stellarSights/posterStellarSights/g.png', masks:masks},
	{name:'Multicolored Frame', src:'/img/frames/stellarSights/posterStellarSights/m.png', masks:masks},
	{name:'Artifact Frame', src:'/img/frames/stellarSights/posterStellarSights/a.png', masks:masks},
	{name:'Land Frame', src:'/img/frames/stellarSights/posterStellarSights/L.png', masks:masks},
    {name:'Holo Stamp', src:'/img/frames/stellarSights/posterStellarSights/stamp/stamp.png'},
	{name:'White Power/Toughness', src:'/img/frames/stellarSights/posterStellarSights/pt/w.png', masks:masks2},
	{name:'Blue Power/Toughness', src:'/img/frames/stellarSights/posterStellarSights/pt/u.png', masks:masks2},
	{name:'Black Power/Toughness', src:'/img/frames/stellarSights/posterStellarSights/pt/b.png', masks:masks2},
	{name:'Red Power/Toughness', src:'/img/frames/stellarSights/posterStellarSights/pt/r.png', masks:masks2,},
	{name:'Green Power/Toughness', src:'/img/frames/stellarSights/posterStellarSights/pt/g.png', masks:masks2,},
	{name:'Multicolored Power/Toughness', src:'/img/frames/stellarSights/posterStellarSights/pt/m.png', masks:masks2},
	{name:'Artifact Power/Toughness', src:'/img/frames/stellarSights/posterStellarSights/pt/a.png', masks:masks2},
	{name:'Land Power/Toughness', src:'/img/frames/stellarSights/posterStellarSights/pt/L.png', masks:masks2}
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
	card.setSymbolBounds = {x:0.9213, y:0.6288, width:0.12, height:0.0410, vertical:'center', horizontal: 'right'};
	resetSetSymbol();
	//watermark bounds
	card.watermarkBounds = {x:0.5, y:0.7912, width:0.75, height:0.2305};
	resetWatermark();
	//text
	loadTextOptions({
		mana: {name:'Mana Cost', text:'', x:+20/2010, y:0.0693, width:0.9190, height:71/2100, oneLine:true, size:71/1638, align:'right', outlineWidth:0.010, manaCost:true, manaSpacing:0,},
		title: {name:'Title', text:'', x:170/2010, y:1718/2814, width:0.8292, height:0.0543, oneLine:true, font:'belerenb', size:0.0381, color:'white'},
		type: {name:'Type', text:'', x:170/2010, y:1823/2814, width:0.8292, height:0.0543, oneLine:true, font:'belerenb', size:0.0324, color:'white'},
		rules: {name:'Rules Text', text:'', x:174/2010, y:1975/2814, width:0.813, height:0.214, size:0.0362, color:'white'},
		pt: {name:'Power/Toughness', text:'', x:0.7928, y:0.902, width:0.1367, height:0.0372, size:0.0372, font:'belerenbsc', oneLine:true, align:'center', color:'white'}
	});
}
//loads available frames
loadFramePack();