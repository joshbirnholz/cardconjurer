//defines available frames
availableFrames = [
	{name:'White Frame', src:'/img/frames/playtest/regular/w.svg'},
	{name:'Blue Frame', src:'/img/frames/playtest/regular/u.svg'},
	{name:'Black Frame', src:'/img/frames/playtest/regular/b.svg'},
	{name:'Red Frame', src:'/img/frames/playtest/regular/r.svg'},
	{name:'Green Frame', src:'/img/frames/playtest/regular/g.svg'},
	{name:'Multicolored Frame', src:'/img/frames/playtest/regular/m.svg'},
	{name:'Artifact Frame', src:'/img/frames/playtest/regular/a.svg'},
	{name:'Land Frame', src:'/img/frames/playtest/regular/l.svg'},
	{name:'White Power/Toughness Divider', src:'/img/frames/playtest/regular/pt/w.svg'},
	{name:'Blue Power/Toughness Divider', src:'/img/frames/playtest/regular/pt/u.svg'},
	{name:'Black Power/Toughness Divider', src:'/img/frames/playtest/regular/pt/b.svg'},
	{name:'Red Power/Toughness Divider', src:'/img/frames/playtest/regular/pt/r.svg'},
	{name:'Green Power/Toughness Divider', src:'/img/frames/playtest/regular/pt/g.svg'},
	{name:'Multicolored Power/Toughness Divider', src:'/img/frames/playtest/regular/pt/m.svg'},
	{name:'Artifact Power/Toughness Divider', src:'/img/frames/playtest/regular/pt/a.svg'},
	{name:'Land Power/Toughness Divider', src:'/img/frames/playtest/regular/pt/l.svg'},];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = async function() {
	//resets things so that every frame doesn't have to
	await resetCardIrregularities();
	//sets card version
	card.version = 'playtest';
	card.showsFlavorBar = false;
	loadScript('/js/frames/manaSymbolsOutline.js');
	//art bounds
	card.artBounds = {x:0.132, y:0.1439, width:0.736, height:0.3362};
	autoFitArt();
	//set symbol bounds
	card.setSymbolBounds = {x:0.8507, y:0.5205, width:0.12, height:0.0410, vertical:'center', horizontal: 'right'};
	resetSetSymbol();
	//watermark bounds
	card.watermarkBounds = {x:0.5, y:0.7762, width:0.75, height:0.2305};
	resetWatermark();
	//text
	loadTextOptions({
		mana: {name:'Mana Cost', text:'', y:0.0939, width:0.8534, height:71/2100, oneLine:true, size:71/1638, align:'right', manaCost:true, manaSpacing:0, manaPrefix:'outline'},
		title: {name:'Title', text:'', x:0.1547, y:0.0896, width:0.6907, height:0.0372, oneLine:true, font:'Calibri', size:0.0372, fontStyle:"bold "},
		type: {name:'Type', text:'', x:0.1547, y:0.5048, width:0.6907, height:0.0372, oneLine:true, font:'Calibri', size:0.0372},
		rules: {name:'Rules Text', text:'', x:0.1547, y:0.5624, width:0.6907, height:0.3086, size:0.0372, font:'Calibri', manaPrefix:'outline'},
		pt: {name:'Power/Toughness', text:'', x:0.7307, y:0.8848, width:0.1334, height:0.0372, size:0.0372, font:'Calibri', oneLine:true, align:'center'},
		reminder: {name:'Reminder', text:'TEST CARD {/bold}- Not for constructed play', x:0.1547, y:0.8896, width:0.6907, height:0.0253, oneLine:true, font:'Calibri', size:0.0253, fontStyle:"italic bold "}
	});
	//bottom info
	await loadBottomInfo({
		midLeft: {text:'\uFFEE{elemidinfo-artist}', x:0.1, y:0.9391, width:0.8, height:0.0181, oneLine:true, font:'belerenbsc', size:0.0181},
		credit: {name:'wizards', text:'Designed by {elemidinfo-credit}', x:0.1, y:0.9391, width:0.8, height:0.0167, oneLine:true, font:'mplantin', size:0.0162, align:'right', outlineWidth:0.0005}
	});
}
//loads available frames
loadFramePack();