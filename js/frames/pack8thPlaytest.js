//defines available frames
availableFrames = [
	{name:'White Frame', src:'/img/frames/8thPlaytest/wcard.png'},
	{name:'Blue Frame', src:'/img/frames/8thPlaytest/ucard.png'},
	{name:'Black Frame', src:'/img/frames/8thPlaytest/bcard.png'},
	{name:'Red Frame', src:'/img/frames/8thPlaytest/rcard.png'},
	{name:'Green Frame', src:'/img/frames/8thPlaytest/gcard.png'},
	{name:'Multicolored Frame', src:'/img/frames/8thPlaytest/mcard.png'},
    {name:'Colorless Frame', src:'/img/frames/8thPlaytest/ccard.png'},
	{name:'Artifact Frame', src:'/img/frames/8thPlaytest/acard.png'},
    {name:'White Power/Toughness', src:'/img/frames/8thPlaytest/wpt.png'},
	{name:'Blue Power/Toughness', src:'/img/frames/8thPlaytest/upt.png'},
	{name:'Black Power/Toughness', src:'/img/frames/8thPlaytest/bpt.png'},
	{name:'Red Power/Toughness', src:'/img/frames/8thPlaytest/rpt.png'},
	{name:'Green Power/Toughness', src:'/img/frames/8thPlaytest/gpt.png'},
	{name:'Multicolored Power/Toughness', src:'/img/frames/8thPlaytest/mpt.png'},
    {name:'Colorless Power/Toughness', src:'/img/frames/8thPlaytest/cpt.png'},
	{name:'Artifact Power/Toughness', src:'/img/frames/8thPlaytest/apt.png'},
    {name:'White Land Frame', src:'/img/frames/8thPlaytest/wlcard.png'},
    {name:'Blue Land Frame', src:'/img/frames/8thPlaytest/ulcard.png'},
    {name:'Black Land Frame', src:'/img/frames/8thPlaytest/blcard.png'},
    {name:'Red Land Frame', src:'/img/frames/8thPlaytest/rlcard.png'},
    {name:'Green Land Frame', src:'/img/frames/8thPlaytest/glcard.png'},
    {name:'Multicolored Land Frame', src:'/img/frames/8thPlaytest/mlcard.png'},
    {name:'Colorless Land Frame', src:'/img/frames/8thPlaytest/clcard.png'},
    {name:'White Land Bar (Tall)', src:'/img/frames/8thPlaytest/wbar.png'},
	{name:'Blue Land Bar (Tall)', src:'/img/frames/8thPlaytest/ubar.png'},
	{name:'Black Land Bar (Tall)', src:'/img/frames/8thPlaytest/bbar.png'},
	{name:'Red Land Bar (Tall)', src:'/img/frames/8thPlaytest/rbar.png'},
	{name:'Green Land Bar (Tall)', src:'/img/frames/8thPlaytest/gbar.png'},
	{name:'Multicolored Land Bar (Tall)', src:'/img/frames/8thPlaytest/mbar.png'},
    {name:'Colorless Land Bar (Tall)', src:'/img/frames/8thPlaytest/cbar.png'},
    {name:'White Land Bar (Short)', src:'/img/frames/8thPlaytest/wbar2.png'},
	{name:'Blue Land Bar (Short)', src:'/img/frames/8thPlaytest/ubar2.png'},
	{name:'Black Land Bar (Short)', src:'/img/frames/8thPlaytest/bbar2.png'},
	{name:'Red Land Bar (Short)', src:'/img/frames/8thPlaytest/rbar2.png'},
	{name:'Green Land Bar (Short)', src:'/img/frames/8thPlaytest/gbar2.png'}
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = async function() {
	//resets things so that every frame doesn't have to
	await resetCardIrregularities();
	//sets card version
	card.version = '8thPlaytest';
	//art bounds
	card.artBounds = {x:360/2010, y:378/2814, width:(1818-360)/2010, height:(1546-378)/2814};
	autoFitArt();
	//set symbol bounds
	card.setSymbolBounds = {x:207/2010, y:2598/2814, width:0.105, height:0.0410, vertical:'center', horizontal: 'center'};
	resetSetSymbol();
	//watermark bounds
	card.watermarkBounds = {x:0.5, y:0.7762, width:0.75, height:0.2305};
	resetWatermark();
	//text
	loadTextOptions({
		mana: {name:'Mana Cost', text:'', x:125/2010, y:165/2814, size:120/2010, manaCost:true, vertical:true, noVerticalCenter:true, shadowY:0.0035},
		title: {name:'Title', text:'', x:368/2010, y:195/2814, width:1454/2010, height:121/2814, oneLine:true, font:'matrixb', size:0.0429},
		type: {name:'Type', text:'', x:363/2010, y:1579/2814, width:1466/2010, height:101/2814, oneLine:true, font:'matrixb', size:94/2814},
		rules: {name:'Rules Text', text:'', x:362/2010, y:1803/2814, width:(1831-362)/2010, height:(2613-1803)/2814, size:0.0362},
		pt: {name:'Power/Toughness', text:'', x:1504/2010, y:2513/2814, width:0.1367, height:0.0443, size:0.0443, font:'matrixbsc', oneLine:true, align:'center'}
	});
	//bottom info
	loadBottomInfo({
		top: {text:'{conditionalcolor:White_Frame:black}Illus. {elemidinfo-artist}', x:0.066, y:2475/2814, width:0.44, height:0.035, oneLine:true, font:'notosans', size:0.035, color:'white', shadowX:0.0007, shadowY:0.0005, rotation:-90},
		midLeft: {text:'{conditionalcolor:White_Frame:black}{elemidinfo-note} {elemidinfo-set} {elemidinfo-number}', x:0.12, y:2475/2814, width:0.44, height:0.0172, oneLine:true, font:'notosans', size:0.0172, color:'white', shadowX:0.0007, shadowY:0.0005, rotation:-90}
	});
}
//loads available frames
loadFramePack();