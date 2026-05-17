//Create objects for common properties across available frames
var mask = [{src:'/img/frames/future/futureMaskBorder.png', name:'Border'}];
var masks = [{src:'/img/frames/future/futureMaskCreature.png', name:'Creature'}, {src:'/img/frames/future/futureMaskInstant.png', name:'Instant'}, {src:'/img/frames/future/futureMaskSorcery.png', name:'Sorcery'}, {src:'/img/frames/future/futureMaskEnchantment.png', name:'Enchantment'}, {src:'/img/frames/future/futureMaskArtifact.png', name:'Artifact'}, {src:'/img/frames/future/futureMaskLand.png', name:'Land'}, {src:'/img/frames/future/futureMaskMulti.png', name:'Multitype'}];
var bounds = {x:0.7621, y:0.8834, width:0.1734, height:0.0781};
//defines available frames
availableFrames = [
	{name:'White Frame', src:'/img/frames/future/regular/futureFrameW.png', masks:mask},
	{name:'Blue Frame', src:'/img/frames/future/regular/futureFrameU.png', masks:mask},
	{name:'Black Frame', src:'/img/frames/future/regular/futureFrameB.png', masks:mask},
	{name:'Red Frame', src:'/img/frames/future/regular/futureFrameR.png', masks:mask},
	{name:'Green Frame', src:'/img/frames/future/regular/futureFrameG.png', masks:mask},
	{name:'Multicolored Frame', src:'/img/frames/future/regular/futureFrameM.png', masks:mask},
	{name:'Artifact Frame', src:'/img/frames/future/regular/futureFrameA.png', masks:mask},
	{name:'Land Frame', src:'/img/frames/future/regular/futureFrameL.png', masks:mask},
	{name:'Colorless Frame', src:'/img/frames/future/regular/futureFrameC.png', masks:mask},
	{name:'White Power/Toughness', src:'/img/frames/future/regular/futurePTW.png', bounds:bounds},
	{name:'Blue Power/Toughness', src:'/img/frames/future/regular/futurePTU.png', bounds:bounds},
	{name:'Black Power/Toughness', src:'/img/frames/future/regular/futurePTB.png', bounds:bounds},
	{name:'Red Power/Toughness', src:'/img/frames/future/regular/futurePTR.png', bounds:bounds},
	{name:'Green Power/Toughness', src:'/img/frames/future/regular/futurePTG.png', bounds:bounds},
	{name:'Multicolored Power/Toughness', src:'/img/frames/future/regular/futurePTM.png', bounds:bounds},
	{name:'Artifact Power/Toughness', src:'/img/frames/future/regular/futurePTA.png', bounds:bounds},
	{name:'Land Power/Toughness', src:'/img/frames/future/regular/futurePTL.png', bounds:bounds},
	{name:'Colorless Power/Toughness', src:'/img/frames/future/regular/futurePTC.png', bounds:bounds},
	{name:'White Type Icon', src:'/img/frames/future/futureWhite.png', bounds:{x:0.0659, y:0.0472, width:0.0431, height:0.0308}, masks:masks},
	{name:'Gray Type Icon', src:'/img/frames/future/futureGray.png', bounds:{x:0.0659, y:0.0472, width:0.0431, height:0.0308}, masks:masks}
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = async function() {
	//resets things so that every frame doesn't have to
	await resetCardIrregularities();
	//sets card version
	card.version = 'futureRegular';
	card.showsFlavorBar = false;
	loadScript('/js/frames/manaSymbolsFuture.js');
	// notify('The Future version adds special mana symbols. To use them, place an "F" before the following mana symbols: wubrg, 0-20, x, and hybrid mana symbols.');
	//art bounds
	card.artBounds = {x:0.086, y:0.0843, width:0.8714, height:0.5853};
	autoFitArt();
	//set symbol bounds
	card.setSymbolBounds = {x:0.9114, y:0.5948, width:0.0534, height:0.0381, vertical:'center', horizontal: 'center'};
	resetSetSymbol();
	//watermark bounds
	card.watermarkBounds = {x:0.5, y:0.7586, width:0.75, height:0.2305};
	resetWatermark();
	//text
	loadTextOptions({
		mana: {name:'Mana Cost', text:'', size:119/1638, manaCost:true, manaPlacement:{x:[0.1224, 0.082, 0.0619, 0.0619, 0.0794, 0.1425], y:[0.1348, 0.1993, 0.2705, 0.3427, 0.4206, 0.4928]}, noVerticalCenter:true, manaPrefix:'f'},
		title: {name:'Title', text:'', x:0.176, y:0.0491, width:0.832, height:0.0643, oneLine:true, font:'matrixb', size:0.0448, color:'white'},
		type: {name:'Type', text:'', x:0.1214, y:0.5615, width:0.832, height:0.0586, oneLine:true, font:'matrixb', size:0.0362, color:'white'},
		rules: {name:'Rules Text', text:'', x:0.1027, y:0.6248, width:0.8074, height:0.2639, size:0.0362},
		pt: {name:'Power/Toughness', text:'', x:0.7734, y:0.8953, width:0.14, height:0.0572, size:0.0381, oneLine:true, align:'center', color:'white'}
	});
	//bottom info
	loadBottomInfo({
		top: {text:'{conditionalcolor:White_Frame,Artifact_Frame,Colorless_Frame:black}{ptshift-0.1667,0}\uFFEE {elemidinfo-artist}', x:0.094, y:1898/2100, width:0.8107, height:0.0248, oneLine:true, font:'matrixb', size:0.0248, color:'white', align:'right', shadowX:0.0007, shadowY:0.0005},
		credit: {name:'wizards', text:'{conditionalcolor:White_Frame,Artifact_Frame,Colorless_Frame:black}{ptshift-0.1667,0}Designed by {elemidinfo-credit}', x:0.094, y:1954/2100, width:0.8107, height:0.0153, oneLine:true, font:'mplantin', size:0.0153, color:'white', align:'right', shadowX:0.0007, shadowY:0.0005}
	});
}
//loads available frames
loadFramePack();