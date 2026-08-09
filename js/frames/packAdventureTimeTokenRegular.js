//Create objects for common properties across available frames
var masks = [
	{src:'/img/frames/adventuretime/token/regular/maskPinline.png', name:'Pinline'},
	{src:'/img/frames/adventuretime/token/maskTitle.png', name:'Title'}, 
	{src:'/img/frames/adventuretime/token/regular/maskType.png', name:'Type'}, 
	{src:'/img/frames/adventuretime/token/regular/maskRules.png', name:'Rules'}, 
	{src:'/img/frames/adventuretime/token/maskBorder.png', name:'Border'}
];
var ptBounds = {x:1548/2010, y:2500/2814, width:360/2010, height:167/2814};
//defines available frames
availableFrames = [
	{name:'White Frame', src:'/img/frames/adventuretime/token/regular/w.png', masks:masks},
	{name:'Blue Frame', src:'/img/frames/adventuretime/token/regular/u.png', masks:masks},
	{name:'Black Frame', src:'/img/frames/adventuretime/token/regular/b.png', masks:masks},
	{name:'Red Frame', src:'/img/frames/adventuretime/token/regular/r.png', masks:masks},
	{name:'Green Frame', src:'/img/frames/adventuretime/token/regular/g.png', masks:masks},
	{name:'Multicolored Frame', src:'/img/frames/adventuretime/token/regular/m.png', masks:masks},
	{name:'Artifact Frame', src:'/img/frames/adventuretime/token/regular/a.png', masks:masks},
	{name:'Land Frame', src:'/img/frames/adventuretime/token/regular/l.png', masks:masks},
	{name:'Colorless Frame', src:'/img/frames/adventuretime/token/regular/c.png', masks:masks},
	{name:'Colorless Enchantment Frame', src:'/img/frames/adventuretime/token/regular/e.png', masks:masks},
	{name:'Helper Frame', src:'/img/frames/adventuretime/token/regular/h.png', masks:masks},

	{name:'White Power/Toughness', src:'/img/frames/adventuretime/pt/w.png', bounds:ptBounds},
	{name:'Blue Power/Toughness', src:'/img/frames/adventuretime/pt/u.png', bounds:ptBounds},
	{name:'Black Power/Toughness', src:'/img/frames/adventuretime/pt/b.png', bounds:ptBounds},
	{name:'Red Power/Toughness', src:'/img/frames/adventuretime/pt/r.png', bounds:ptBounds},
	{name:'Green Power/Toughness', src:'/img/frames/adventuretime/pt/g.png', bounds:ptBounds},
	{name:'Multicolored Power/Toughness', src:'/img/frames/adventuretime/pt/m.png', bounds:ptBounds},
	{name:'Artifact Power/Toughness', src:'/img/frames/adventuretime/pt/a.png', bounds:ptBounds},
	{name:'Colorless Power/Toughness', src:'/img/frames/adventuretime/pt/l.png', bounds:ptBounds},
	{name:'Vehicle Power/Toughness', src:'/img/frames/adventuretime/pt/v.png', bounds:ptBounds},
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = async function() {
	//resets things so that every frame doesn't have to
	await resetCardIrregularities();
	//sets card version
	card.version = 'tokenAdventureTimeRegular';
	//art bounds
	card.artBounds = {x:0.04, y:0.0286, width:0.92, height:0.8953};
	autoFitArt();
	//set symbol bounds
	card.setSymbolBounds = {x:0.9213, y:((0.6743*2100)+59)/2100, width:0.12, height:0.0410, vertical:'center', horizontal: 'right'};
	resetSetSymbol();
	//watermark bounds
	card.watermarkBounds = {x:0.5, y:((0.8177*2100)+59)/2100, width:0.75, height:((0.1472*2100)-59)/2100};
	resetWatermark();
	//text
	loadTextOptions({
		mana: {name:'Mana Cost', text:'', y:0.0613, width:0.9292, height:71/2100, oneLine:true, size:71/1638, align:'right', shadowX:-0.001, shadowY:0.0029, manaCost:true, manaSpacing:0},
		title: {name:'Title', text:'', x:0.0854, y:0.0522, width:0.8292, height:0.0543, oneLine:true, font:'belerenbsc', size:0.0428, align:'center', conditionalColor:'Colorless_Enchantment_Frame:white'},
		type: {name:'Type', text:'', x:0.0854, y:((0.65*2100)+59)/2100, width:0.8292, height:0.0543, oneLine:true, font:'belerenb', size:0.0324},
		rules: {name:'Rules Text', text:'', x:0.086, y:((0.7143*2100)+59)/2100, width:0.828, height:((0.2048*2100)-59)/2100, size:0.0362},
		pt: {name:'Power/Toughness', text:'', x:0.7928, y:0.902, width:0.1367, height:0.0372, size:0.0372, font:'belerenbsc', oneLine:true, align:'center'}
	});
}
//loads available frames
loadFramePack();