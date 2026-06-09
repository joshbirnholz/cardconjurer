//Create objects for common properties across available frames
var masks = [
	{src:'/img/frames/adventuretime/adventures/pinline.png', name:'Pinline'},
	{src:'/img/frames/adventuretime/title.png', name:'Title'},
	{src:'/img/frames/adventuretime/type.png', name:'Type'},
	{src:'/img/frames/adventuretime/adventures/book.png', name:'Rules'},
	{src:'/img/frames/adventuretime/maskFrame.png', name:'Frame'}, 
	{src:'/img/frames/adventuretime/adventures/bookLeft.png', name:'Rules (Left)'},
	{src:'/img/frames/adventuretime/adventures/bookLeftMulticolor.png', name:'Rules (Left, Multicolor)'},
	{src:'/img/frames/adventuretime/adventures/bookRight.png', name:'Rules (Right)'},
	{src:'/img/frames/adventuretime/adventures/bookRightMulticolor.png', name:'Rules (Right, Multicolor)'},
	{src:'/img/frames/adventuretime/maskBorder.png', name:'Border'}
];
var ptBounds = {x:1548/2010, y:2500/2814, width:360/2010, height:167/2814};
var crownBounds = {x:0/2010, y:0/2814, width:1, height: 521/2814};
var crownMasks = [{src:'/img/frames/adventuretime/maskCrownPinline.png', name:'Pinline'}, {src:'/img/frames/adventuretime/maskCrownFrame.png', name:'Frame'}];

//defines available frames
availableFrames = [
	{name:'White Frame', src:'/img/frames/adventuretime/adventures/w.png', masks:masks},
	{name:'Blue Frame', src:'/img/frames/adventuretime/adventures/u.png', masks:masks},
	{name:'Black Frame', src:'/img/frames/adventuretime/adventures/b.png', masks:masks},
	{name:'Red Frame', src:'/img/frames/adventuretime/adventures/r.png', masks:masks},
	{name:'Green Frame', src:'/img/frames/adventuretime/adventures/g.png', masks:masks},
	{name:'Multicolored Frame', src:'/img/frames/adventuretime/adventures/m.png', masks:masks},
	{name:'Artifact Frame', src:'/img/frames/adventuretime/adventures/a.png', masks:masks},
	{name:'Land Frame', src:'/img/frames/adventuretime/adventures/l.png', masks:masks},
	{name:'Colorless Frame', src:'/img/frames/adventuretime/adventures/c.png', masks:masks},
	{name:'Vehicle Frame', src:'/img/frames/adventuretime/adventures/v.png', masks:masks},

	{name:'White Power/Toughness', src:'/img/frames/adventuretime/pt/w.png', bounds:ptBounds},
	{name:'Blue Power/Toughness', src:'/img/frames/adventuretime/pt/u.png', bounds:ptBounds},
	{name:'Black Power/Toughness', src:'/img/frames/adventuretime/pt/b.png', bounds:ptBounds},
	{name:'Red Power/Toughness', src:'/img/frames/adventuretime/pt/r.png', bounds:ptBounds},
	{name:'Green Power/Toughness', src:'/img/frames/adventuretime/pt/g.png', bounds:ptBounds},
	{name:'Multicolored Power/Toughness', src:'/img/frames/adventuretime/pt/m.png', bounds:ptBounds},
	{name:'Artifact Power/Toughness', src:'/img/frames/adventuretime/pt/a.png', bounds:ptBounds},
	{name:'Colorless Power/Toughness', src:'/img/frames/adventuretime/pt/l.png', bounds:ptBounds},
	{name:'Vehicle Power/Toughness', src:'/img/frames/adventuretime/pt/v.png', bounds:ptBounds},

	{name:'White Legendary Crown', src:'/img/frames/adventuretime/crown/regular/w.png', bounds:crownBounds, masks:crownMasks},
	{name:'Blue Legendary Crown', src:'/img/frames/adventuretime/crown/regular/u.png', bounds:crownBounds, masks:crownMasks},
	{name:'Black Legendary Crown', src:'/img/frames/adventuretime/crown/regular/b.png', bounds:crownBounds, masks:crownMasks},
	{name:'Red Legendary Crown', src:'/img/frames/adventuretime/crown/regular/r.png', bounds:crownBounds, masks:crownMasks},
	{name:'Green Legendary Crown', src:'/img/frames/adventuretime/crown/regular/g.png', bounds:crownBounds, masks:crownMasks},
	{name:'Multicolored Legendary Crown', src:'/img/frames/adventuretime/crown/regular/m.png', bounds:crownBounds, masks:crownMasks},
	{name:'Artifact Legendary Crown', src:'/img/frames/adventuretime/crown/regular/a.png', bounds:crownBounds, masks:crownMasks},
	{name:'Land Legendary Crown', src:'/img/frames/adventuretime/crown/regular/l.png', bounds:crownBounds, masks:crownMasks},
	{name:'Colorless Legendary Crown', src:'/img/frames/adventuretime/crown/regular/c.png', bounds:crownBounds, masks:crownMasks},
	{name:'Vehicle Legendary Crown', src:'/img/frames/adventuretime/crown/regular/v.png', bounds:crownBounds, masks:crownMasks}
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = async function() {
	//resets things so that every frame doesn't have to
	await resetCardIrregularities();
	//sets card version
	card.version = 'adventure';
	//art bounds
	card.artBounds = {x:0.0767, y:0.1129, width:0.8476, height:0.4429};
	autoFitArt();
	//set symbol bounds
	card.setSymbolBounds = {x:0.9213, y:0.5910, width:0.12, height:0.0410, vertical:'center', horizontal: 'right'};
	resetSetSymbol();
	//watermark bounds
	card.watermarkBounds = {x:0.72, y:0.7681, width:0.3867, height:0.2358};
	resetWatermark();
	//text
	loadTextOptions({
		mana: {name:'Mana Cost', text:'', y:0.0613, width:0.9292, height:71/2100, oneLine:true, size:71/1638, align:'right', shadowX:-0.001, shadowY:0.0029, manaCost:true, manaSpacing:0},
		title: {name:'Title', text:'', x:0.0854, y:0.0522, width:0.8292, height:0.0543, oneLine:true, font:'belerenb', size:0.0381},
		type: {name:'Type', text:'', x:0.0854, y:0.5664, width:0.8292, height:0.0543, oneLine:true, font:'belerenb', size:0.0324},
		rules: {name:'Rules Text (Right)', text:'', x:1059/2010, y:1825/2814, width:777/2010, height:729/2814, size:0.0353},
		pt: {name:'Power/Toughness', text:'', x:0.7928, y:0.902, width:0.1367, height:0.0372, size:0.0372, font:'belerenbsc', oneLine:true, align:'center'},
		mana2: {name:'Adventure Mana Cost', text:'', x:0.0814, y:0.6391, width:0.4, height:60/2100, oneLine:true, size:60/1638, color:'white', shadowX:-0.001, shadowY:0.0029, align:'right', manaCost:true},
		title2: {name:'Adventure Title', text:'', x:0.0814, y:0.6391, width:0.4, height:0.0296, size:0.0296, color:'white', oneLine:true, font:'belerenb'},
		type2: {name:'Adventure Type', text:'', x:0.0814, y:1920/2814, width:0.4, height:0.0296, size:0.0296, color:'white', oneLine:true, font:'belerenb'},
		rules2: {name:'Rules Text', text:'', x:172/2010, y:2040/2814, width:793/2010, height:541/2814, size:0.0353},
	});
}
//loads available frames
loadFramePack();
//Only for the main version as the webpage loads:
if (!card.text) {
	document.querySelector('#loadFrameVersion').click();
}
