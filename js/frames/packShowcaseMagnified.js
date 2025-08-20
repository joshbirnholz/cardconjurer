//Create objects for common properties across available frames
var masks = [{src:'/img/frames/showcaseMagnified/masks/maskTitle.png', name:'Title'}, {src:'/img/frames/showcaseMagnified/masks/maskType.png', name:'Type'}, {src:'/img/frames/showcaseMagnified/masks/maskRules.png', name:'Rules'}, {src:'/img/frames/showcaseMagnified/masks/maskTextBoxes.png', name:'Text Boxes'}, {src:'/img/frames/showcaseMagnified/masks/maskFrame.png', name:'Frame'}, {src:'/img/frames/showcaseMagnified/masks/maskLens.png', name:'Lens'}, {src:'/img/frames/showcaseMagnified/masks/maskNoLens.png', name:'No Lens'}, {src:'/img/frames/showcaseMagnified/masks/maskFloating.png', name:'Floating Frame'}, {src:'/img/frames/showcaseMagnified/masks/maskBottom.png', name:'Bottom Frame'}, {src:'/img/frames/showcaseMagnified/masks/maskBorderless.png', name:'Borderless'}, {src:'/img/frames/showcaseMagnified/masks/maskStraightBorderless.png', name:'Straight Borderless'}, {src:'/img/frames/showcaseMagnified/masks/maskBorderBorderless.png', name:'Border Borderless'}, {src:'/img/frames/showcaseMagnified/masks/maskBorderStraightBorderless.png', name:'Border Straight Borderless'}];
var masks2 = [{src:'/img/frames/showcaseMagnified/pt/masks/maskOuterPT.png', name:'Outer PT'}, {src:'/img/frames/showcaseMagnified/pt/masks/maskInnerPT.png', name:'Inner PT'}];
var masks3 = [{src:'/img/frames/showcaseMagnified/masks/maskRingOnlyBottomFrame.png', name:'Ring Only Bottom Frame'}];
var masks4 = [{src:'/img/frames/showcaseMagnified/crowns/masks/maskOuterCrown.png', name:'Outer Crown'}, {src:'/img/frames/showcaseMagnified/crowns/masks/maskTitle.png', name:'Title'}];

availableFrames = [
	{name:'White Frame (Arena White)', src:'/img/frames/showcaseMagnified/w.png', masks:masks},
	{name:'Blue Frame', src:'/img/frames/showcaseMagnified/u.png', masks:masks},
	{name:'Black Frame', src:'/img/frames/showcaseMagnified/b.png', masks:masks},
	{name:'Red Frame', src:'/img/frames/showcaseMagnified/r.png', masks:masks},
	{name:'Green Frame', src:'/img/frames/showcaseMagnified/g.png', masks:masks},
	{name:'Multicolored Frame', src:'/img/frames/showcaseMagnified/m.png', masks:masks},
	{name:'Artifact Frame', src:'/img/frames/showcaseMagnified/a.png', masks:masks},
    {name:'Land Frame (Printed White)', src:'/img/frames/showcaseMagnified/L.png', masks:masks},

	{name:'White Power/Toughness (Arena White)', src:'/img/frames/showcaseMagnified/pt/w.png', masks:masks2},
	{name:'Blue Power/Toughness', src:'/img/frames/showcaseMagnified/pt/u.png', masks:masks2},
	{name:'Black Power/Toughness', src:'/img/frames/showcaseMagnified/pt/b.png', masks:masks2},
	{name:'Red Power/Toughness', src:'/img/frames/showcaseMagnified/pt/r.png', masks:masks2},
	{name:'Green Power/Toughness', src:'/img/frames/showcaseMagnified/pt/g.png', masks:masks2},
	{name:'Multicolored Power/Toughness', src:'/img/frames/showcaseMagnified/pt/m.png', masks:masks2},
	{name:'Artifact Power/Toughness', src:'/img/frames/showcaseMagnified/pt/a.png', masks:masks2},
    {name:'Land Power/Toughness (Printed White)', src:'/img/frames/showcaseMagnified/pt/L.png', masks:masks2},
    {name:'Ring', src:'/img/frames/showcaseMagnified/ring.png', masks:masks3},

    {name:'White Legend Crown (Arena White)', src:'/img/frames/showcaseMagnified/crowns/w.png', masks:masks4},
	{name:'Blue Legend Crown', src:'/img/frames/showcaseMagnified/crowns/u.png', masks:masks4},
	{name:'Black Legend Crown', src:'/img/frames/showcaseMagnified/crowns/b.png', masks:masks4},
	{name:'Red Legend Crown', src:'/img/frames/showcaseMagnified/crowns/r.png', masks:masks4},
	{name:'Green Legend Crown', src:'/img/frames/showcaseMagnified/crowns/g.png', masks:masks4},
	{name:'Multicolored Legend Crown', src:'/img/frames/showcaseMagnified/crowns/m.png', masks:masks4},
	{name:'Artifact Legend Crown', src:'/img/frames/showcaseMagnified/crowns/a.png', masks:masks4},
    {name:'Land Legend Crown (Printed White)', src:'/img/frames/showcaseMagnified/crowns/L.png', masks:masks4},
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = async function() {
	//resets things so that every frame doesn't have to
	await resetCardIrregularities();
	//sets card version
	card.version = 'Magnified';
	//art bounds
	card.artBounds = {x:88/2010, y:-1/2814, width:0.92, height:0.655};
	autoFitArt();
	//set symbol bounds
	card.setSymbolBounds = {x:0.9233, y:0.5910, width:0.12, height:0.0410, vertical:'center', horizontal: 'right'};
	resetSetSymbol();
	//watermark bounds
	card.watermarkBounds = {x:0.5, y:0.7762, width:0.75, height:0.2305};
	resetWatermark();
	//text
	loadTextOptions({
		mana: {name:'Mana Cost', text:'', y:192/2814, width:0.9292, height:71/2100, oneLine:true, size:71/1638, align:'right', shadowX:-0.001, shadowY:0.0029, manaCost:true, manaSpacing:0},
		title: {name:'Title', text:'', x:0.0854, y:163/2814, width:0.8292, height:0.0543, oneLine:true, font:'belerenb', color:'white', size:0.0386},
		type: {name:'Type', text:'', x:0.0854, y:1588/2814, width:1390/2010, height:0.0543, oneLine:true, font:'belerenb', size:0.0328, color:'white', shadowX:0.0014, shadowY:0.001},
		rules: {name:'Rules Text', text:'', x:0.086, y:0.6303, width:0.828, height:0.2875, color:'white', size:0.0362},
		pt: {name:'Power/Toughness', text:'', x:0.7928, y:0.902, width:0.1367, height:0.0372, color:'white', size:0.0372, font:'belerenbsc', oneLine:true, align:'center'}
	});
}
//loads available frames
loadFramePack();