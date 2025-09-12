//Create objects for common properties across available frames
var masks = [{src:'/img/frames/vault/masks/maskPinlines.png', name:'Pinlines'}, {src:'/img/frames/vault/masks/maskTitle.png', name:'Title'}, {src:'/img/frames/vault/masks/maskType.png', name:'Type'}, {src:'/img/frames/vault/masks/maskRules.png', name:'Rules'}, {src:'/img/frames/vault/masks/maskTextBoxes.png', name:'Text Boxes'}, {src:'/img/frames/vault/masks/maskFrame.png', name:'Frame'}, {src:'/img/frames/vault/masks/maskBorderless.png', name:'Borderless'}, {src:'/img/frames/vault/masks/maskBottomFrame.png', name:'Bottom Frame'}, {src:'/img/frames/vault/masks/maskBottomFrameNoBorder.png', name:'Bottom Frame No Borer'}, {src:'/img/frames/vault/masks/maskNoBorder.png', name:'No Border'}, {src:'/img/frames/vault/masks/maskBorder.png', name:'Border'}];
var crownBounds = {x:-88/2010, y:-80/2814, width:2187/2010, height:2975/2814};
var stampBounds = {x:835/2010, y:2507/2814, width:341/2010, height:151/2814};
//defines available frames
availableFrames = [
	{name:'White Frame', src:'/img/frames/vault/w.png', masks:masks},
	{name:'Blue Frame', src:'/img/frames/vault/u.png', masks:masks},
	{name:'Black Frame', src:'/img/frames/vault/b.png', masks:masks},
	{name:'Red Frame', src:'/img/frames/vault/r.png', masks:masks},
	{name:'Green Frame', src:'/img/frames/vault/g.png', masks:masks},
	{name:'Multicolored Frame', src:'/img/frames/vault/m.png', masks:masks},
	{name:'Artifact Frame', src:'/img/frames/vault/a.png', masks:masks},
	{name:'Land Frame', src:'/img/frames/vault/l.png', masks:masks},

	{name:'White Power/Toughness', src:'/img/frames/vault/pt/w.png'},
	{name:'Blue Power/Toughness', src:'/img/frames/vault/pt/u.png'},
	{name:'Black Power/Toughness', src:'/img/frames/vault/pt/b.png'},
	{name:'Red Power/Toughness', src:'/img/frames/vault/pt/r.png'},
	{name:'Green Power/Toughness', src:'/img/frames/vault/pt/g.png'},
	{name:'Multicolored Power/Toughness', src:'/img/frames/vault/pt/m.png'},
	{name:'Artifact Power/Toughness', src:'/img/frames/vault/pt/a.png'},
	{name:'Land Power/Toughness', src:'/img/frames/vault/pt/l.png'},

	{name:'White Legendary Crown', src:'/img/frames/vault/crown/w.png', bounds:crownBounds},
	{name:'Blue Legendary Crown', src:'/img/frames/vault/crown/u.png', bounds:crownBounds},
	{name:'Black Legendary Crown', src:'/img/frames/vault/crown/b.png', bounds:crownBounds},
	{name:'Red Legendary Crown', src:'/img/frames/vault/crown/r.png', bounds:crownBounds},
	{name:'Green Legendary Crown', src:'/img/frames/vault/crown/g.png', bounds:crownBounds},
	{name:'Multicolored Legendary Crown', src:'/img/frames/vault/crown/m.png', bounds:crownBounds},
	{name:'Artifact Legendary Crown', src:'/img/frames/vault/crown/a.png', bounds:crownBounds},
	{name:'Land Legendary Crown', src:'/img/frames/vault/crown/l.png', bounds:crownBounds},

	{name:'Plain Holo Stamp', src:'/img/frames/m15/holoStamps/stamp.png', bounds:{x:917/2010, y:2563/2814, width:0.0894, height:0.0320}},
	{name:'Gray Holo Stamp', src:'/img/frames/m15/holoStamps/gray.png', bounds:{x:917/2010, y:2563/2814, width:0.0894, height:0.0320}},
	{name:'White Holo Stamp', src:'/img/frames/vault/stamp/w.png', bounds:stampBounds},
	{name:'Blue Holo Stamp', src:'/img/frames/vault/stamp/u.png', bounds:stampBounds},
	{name:'Black Holo Stamp', src:'/img/frames/vault/stamp/b.png', bounds:stampBounds},
	{name:'Red Holo Stamp', src:'/img/frames/vault/stamp/r.png', bounds:stampBounds},
	{name:'Green Holo Stamp', src:'/img/frames/vault/stamp/g.png', bounds:stampBounds},
	{name:'Multicolored Holo Stamp', src:'/img/frames/vault/stamp/m.png', bounds:stampBounds},
	{name:'Artifact Holo Stamp', src:'/img/frames/vault/stamp/a.png', bounds:stampBounds},
	{name:'Land Holo Stamp', src:'/img/frames/vault/stamp/l.png', bounds:stampBounds}
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = async function() {
	//resets things so that every frame doesn't have to
	await resetCardIrregularities();
	//sets card version
	card.version = 'vault';
	//art bounds
	card.artBounds = {x:0, y:334/2814, width:1, height:1194/2814};
	autoFitArt();
	//set symbol bounds
	card.setSymbolBounds = {x:0.9213, y:0.5910, width:0.12, height:0.0410, vertical:'center', horizontal: 'right'};
	resetSetSymbol();
	//watermark bounds
	card.watermarkBounds = {x:0.5, y:0.7762, width:0.75, height:0.2305};
	resetWatermark();
	//text
	loadTextOptions({
		mana: {name:'Mana Cost', text:'', x:-15/2010, y:190/2814, width:0.9292, height:71/2100, oneLine:true, size:71/1638, align:'right', shadowX:-0.001, shadowY:0.0029, manaCost:true, manaSpacing:0},
		title: {name:'Title', text:'', x:0.0854, y:159/2814, width:0.8292, height:0.0543, oneLine:true, font:'belerenb', size:0.0381},
		type: {name:'Type', text:'', x:0.0854, y:0.5664, width:0.8292, height:0.0543, oneLine:true, font:'belerenb', size:0.0324},
		rules: {name:'Rules Text', text:'', x:0.086, y:0.6303, width:0.828, height:0.2875, size:0.0362},
		pt: {name:'Power/Toughness', text:'', x:1592/2010, y:2529/2814, width:0.1367, height:0.0372, size:0.0372, font:'belerenbsc', oneLine:true, align:'center'}
	});
}
//loads available frames
loadFramePack();