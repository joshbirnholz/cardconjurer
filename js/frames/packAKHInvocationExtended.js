//Create objects for common properties across available frames
var bounds = {x:0.0527, y:0.0496, width:0.8947, height:0.0515};
//defines available frames
availableFrames = [
	{name:'White Frame', src:'/img/frames/akh/invocation/extended/w.png'},
	{name:'Blue Frame', src:'/img/frames/akh/invocation/extended/u.png'},
	{name:'Black Frame', src:'/img/frames/akh/invocation/extended/b.png'},
	{name:'Red Frame', src:'/img/frames/akh/invocation/extended/r.png'},
	{name:'Green Frame', src:'/img/frames/akh/invocation/extended/g.png'},
	{name:'Multicolored Frame', src:'/img/frames/akh/invocation/extended/m.png'},
	{name:'Artifact Frame', src:'/img/frames/akh/invocation/extended/a.png'},
	{name:'Power/Toughness', src:'/img/frames/akh/invocation/extended/pt.png', bounds:{x:0.8587, y:0.8186, width:0.062, height:0.1258}},
	{name:'Mana Bracket (1)', src:'/img/frames/akh/invocation/extended/mana/1.png', bounds:bounds},
	{name:'Mana Bracket (2)', src:'/img/frames/akh/invocation/extended/mana/2.png', bounds:bounds},
	{name:'Mana Bracket (3)', src:'/img/frames/akh/invocation/extended/mana/3.png', bounds:bounds},
	{name:'Mana Bracket (4)', src:'/img/frames/akh/invocation/extended/mana/4.png', bounds:bounds},
	{name:'Mana Bracket (5)', src:'/img/frames/akh/invocation/extended/mana/5.png', bounds:bounds},
	{name:'Mana Bracket (6)', src:'/img/frames/akh/invocation/extended/mana/6.png', bounds:bounds},
	{name:'Mana Bracket (7)', src:'/img/frames/akh/invocation/extended/mana/7.png', bounds:bounds},
	{name:'Mana Bracket (8)', src:'/img/frames/akh/invocation/extended/mana/8.png', bounds:bounds},
	{name:'Mana Bracket (9)', src:'/img/frames/akh/invocation/extended/mana/9.png', bounds:bounds},
	{name:'Mana Bracket (10)', src:'/img/frames/akh/invocation/extended/mana/10.png', bounds:bounds}
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = async function() {
	//resets things so that every frame doesn't have to
	await resetCardIrregularities();
	//sets card version
	card.version = 'invocationExtended';
	loadScript('/js/frames/manaSymbolsOutline.js');
	//art bounds
	card.artBounds = {x:0, y:0.1067, width:1, height:0.4386};
	autoFitArt();
	//set symbol bounds
	card.setSymbolBounds = {x:0.8954, y:0.5910, width:0.06, height:0.0353, vertical:'center', horizontal: 'center'};
	resetSetSymbol();
	//watermark bounds
	card.watermarkBounds = {x:0.5, y:0.7762, width:0.75, height:0.2305};
	resetWatermark();
	//text
	loadTextOptions({ //old color: 24150E
		mana: {name:'Mana Cost', text:'', y:0.0613, width:0.93, height:78/2100, oneLine:true, size:78/1638, align:'right', shadowX:-0.0015, shadowY:0.001, manaCost:true, manaSpacing:-0.002, manaPrefix:'outline', manaSymbolColor:'white', color:"black"},
		title: {name:'Title', text:'', x:0.0834, y:0.05, width:0.8334, height:0.0515, oneLine:true, font:'invocation', size:0.0515, shadowX:-0.0015, shadowY:0.001, color:'white'},
		type: {name:'Type', text:'', x:0.0767, y:0.5672, width:0.7334, height:0.0496, oneLine:true, font:'invocation', size:0.0496, align:'center', shadowX:-0.0015, shadowY:0.001, color:'white'},
		rules: {name:'Rules Text', text:'', x:0.1, y:0.6334, width:0.8, height:0.2429, size:0.0334, font:'invocation-text', justify:'center', manaPrefix:'outline', shadowX:-0.0015, shadowY:0.001, color:'white', manaPrefix:'outline', manaSymbolColor:'white'},
		pt: {name:'Power/Toughness', text:'', x:0.8707, y:0.8315, width:0.0387, height:0.0929, size:0.0372, font:'belerenbsc', align:'center', shadowX:-0.0015, shadowY:0.001, color:'white'}
	});
	//bottom info
	await loadBottomInfo({
		info: {text:'{elemidinfo-number} {elemidinfo-set}*{elemidinfo-language} {elemidinfo-rarity}', x:0.0787, y:0.912, width:0.29, height:0.0162, oneLine:true, font:'gothammedium', size:0.0162, color:'#24150E'},
		artist: {text:`\uFFEE{fontsize-${scaleHeight(0.002)}}{fontinvocation-text}{elemidinfo-artist}`, x:0.0787, y:0.93, width:0.29, height:0.0181, oneLine:true, font:'belerenbsc', size:0.0181, color:'#24150E'},
		credit: {name:'wizards', text:'Designed by {elemidinfo-credit}', x:0.0647, y:0.9453, width:0.86, height:0.0134, oneLine:true, font:'invocation-text', size:0.0134, color:'#24150E', align:'right'}
	});
}
//loads available frames
loadFramePack();
