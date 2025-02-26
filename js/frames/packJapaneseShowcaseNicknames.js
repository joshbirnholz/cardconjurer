//Create objects for common properties across available frames
var bounds3 = {x:0, y:0, width:1, height:1};
//defines available frames
availableFrames = [
	{name:'White Nickname', src:'/img/frames/japaneseShowcase/nickname/w.png', bounds:bounds3},
	{name:'Blue Nickname', src:'/img/frames/japaneseShowcase/nickname/u.png', bounds:bounds3},
	{name:'Black Nickname', src:'/img/frames/japaneseShowcase/nickname/b.png', bounds:bounds3},
	{name:'Red Nickname', src:'/img/frames/japaneseShowcase/nickname/r.png', bounds:bounds3},
	{name:'Green Nickname', src:'/img/frames/japaneseShowcase/nickname/g.png', bounds:bounds3},
	{name:'Multicolored Nickname', src:'/img/frames/japaneseShowcase/nickname/m.png', bounds:bounds3},
	{name:'Artifact Nickname', src:'/img/frames/japaneseShowcase/nickname/a.png', bounds:bounds3},
	{name:'Land Nickname', src:'/img/frames/japaneseShowcase/nickname/L.png', bounds:bounds3},
	{name:'Colorless Nickname', src:'/img/frames/japaneseShowcase/nickname/c.png', bounds:bounds3}
	];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = async function() {
	//resets things so that every frame doesn't have to
	await resetCardIrregularities();
	//sets card version
	card.version = 'JapaneseShowcase';
	//art bounds
	card.artBounds = {x:0, y:0, width:1, height:0.9224};
	autoFitArt();
	//set symbol bounds
	card.setSymbolBounds = {x:0.9040, y:0.6345, width:0.12, height:0.0410, vertical:'center', horizontal: 'right'};
	resetSetSymbol();
	//watermark bounds
	card.watermarkBounds = {x:0.5, y:0.7762, width:0.75, height:0.2305};
	resetWatermark();
	//text
loadTextOptions({
		mana: {name:'Mana Cost', text:'', y:0.0683, width:0.9190, height:71/2100, oneLine:true, size:71/1638, align:'right', shadowX:-0.001, shadowY:0.0029, manaCost:true, manaSpacing:0,},
		nickname: {name:'Nickname', text:'', x:0.090, y:0.0582, width:0.8292, height:0.0543, outlineWidth:0.0095, oneLine:true, font:'belerenb', size:0.0381, color:'white',},
		title: {name:'Title', text:'', x:0.14, y:0.1192, width:0.768, height:0.0243, outlineWidth:0.0025, oneLine:true, font:'mplantini', size:0.0229, color:'white', shadowX:0.0014, shadowY:0.001, align:'right'},
		type: {name:'Type', text:'', x:0.0875, y:0.6130, width:0.8000, height:0.0543, oneLine:true, font:'belerenb', outlineWidth:0.0095, size:0.0324, color:'white',},
		rules: {name:'Rules Text', text:'', x:0.086, y:0.6803, width:0.828, height:0.2265, outlineWidth:0.0095, font:'Plantin MT Pro', size:0.0362, color:'white',},
		pt: {name:'Power/Toughness', text:'', x:0.7892, y:0.8970, width:0.1367, height:0.0372, size:0.0372, font:'belerenbsc', oneLine:true, align:'center', color:'white'}
	});
}
//loads available frames
loadFramePack();
