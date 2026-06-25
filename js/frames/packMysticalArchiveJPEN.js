//Create objects for common properties across available frames
var masks = [{src:'/img/frames/mysticalArchive/jp/en/title.png', name:'Title'}, {src:'/img/frames/mysticalArchive/jp/en/type.svg', name:'Type'}, {src:'/img/frames/mysticalArchive/jp/en/titleOutline.png', name:'Title - Outer (for multicolor cards)'}, {src:'/img/frames/mysticalArchive/jp/en/titleInner.png', name:'Title - Inner'}, {src:'/img/frames/mysticalArchive/jp/en/rules.svg', name:'Rules'}, {src:'/img/frames/mysticalArchive/jp/en/border.svg', name:'Border'}];
var ptBounds = {x:0.7767, y:0.8881, width:0.1687, height:0.0591}
//defines available frames
availableFrames = [
	{name:'White Frame', src:'/img/frames/mysticalArchive/jp/en/w.png', masks:masks},
	{name:'Blue Frame', src:'/img/frames/mysticalArchive/jp/en/u.png', masks:masks},
	{name:'Black Frame', src:'/img/frames/mysticalArchive/jp/en/b.png', masks:masks},
	{name:'Red Frame', src:'/img/frames/mysticalArchive/jp/en/r.png', masks:masks},
	{name:'Green Frame', src:'/img/frames/mysticalArchive/jp/en/g.png', masks:masks},
	{name:'Multicolored Frame', src:'/img/frames/mysticalArchive/jp/en/m.png', masks:masks},
	{name:'Artifact Frame', src:'/img/frames/mysticalArchive/jp/en/a.png', masks:masks},
	{name:'Land Frame', src:'/img/frames/mysticalArchive/jp/en/l.png', masks:masks},
	
	{name:'White Power/Toughness', src:'/img/frames/mysticalArchive/jp/pt/w.svg', bounds:ptBounds, complementary:'Power/Toughness Cutout'},
	{name:'Blue Power/Toughness', src:'/img/frames/mysticalArchive/jp/pt/uAlt.svg', bounds:ptBounds, complementary:'Power/Toughness Cutout'},
	{name:'Black Power/Toughness', src:'/img/frames/mysticalArchive/jp/pt/b.svg', bounds:ptBounds, complementary:'Power/Toughness Cutout'},
	{name:'Red Power/Toughness', src:'/img/frames/mysticalArchive/jp/pt/r.svg', bounds:ptBounds, complementary:'Power/Toughness Cutout'},
	{name:'Green Power/Toughness', src:'/img/frames/mysticalArchive/jp/pt/g.svg', bounds:ptBounds, complementary:'Power/Toughness Cutout'},
	{name:'Multicolored Power/Toughness', src:'/img/frames/mysticalArchive/jp/pt/m.svg', bounds:ptBounds, complementary:'Power/Toughness Cutout'},
	{name:'Artifact Power/Toughness', src:'/img/frames/mysticalArchive/jp/pt/a.svg', bounds:ptBounds, complementary:'Power/Toughness Cutout'},
	{name:'Land Power/Toughness', src:'/img/frames/mysticalArchive/jp/pt/l.svg', bounds:ptBounds, complementary:'Power/Toughness Cutout'},
	{name:'Power/Toughness Cutout', src:'/img/frames/mysticalArchive/jp/pt/cutout.svg', bounds:ptBounds, erase:true}
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = async function() {
	//resets things so that every frame doesn't have to
	await resetCardIrregularities();
	//sets card version
	card.version = 'MAJPHorizontal';
	//art bounds
	card.artBounds = {x:0, y:0, width:1, height:0.9286};
	autoFitArt();
	//set symbol bounds
	card.setSymbolBounds = {x:1838/2010, y:1635/2814, width:0.12, height:0.0410, vertical:'center', horizontal: 'right'};
	resetSetSymbol();
	//watermark bounds
	card.watermarkBounds = {x:0.5, y:0.7705, width:0.75, height:0.2362};
	resetWatermark();
	//text
	loadTextOptions({
		mana: {name:'Mana Cost', text:'', y:153/2814, width:1858/2010, height:71/2100, oneLine:true, size:71/1638, align:'right', shadowX:-0.001, shadowY:0.0029, manaCost:true, manaSpacing:0},
		title: {name:'Title', text:'', x:0.0854, y:118/2814, width:0.8292, height:0.0543, oneLine:true, font:'belerenb', color:'white', size:0.0381},
		type: {name:'Type', text:'', x:170/2010, y:0.5548, width:0.8292, height:0.0543, oneLine:true, font:'belerenb', size:0.0324},
		rules: {name:'Rules Text', text:'', x:0.0934, y:0.6248, width:0.8134, height:0.2934, size:0.0362},
		pt: {name:'Power/Toughness', text:'', x:0.7928, y:0.902, width:0.1367, height:0.0372, size:0.0372, font:'belerenbsc', oneLine:true, align:'center'}
	});
}
//loads available frames
loadFramePack();