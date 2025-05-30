//Create objects for common properties across available frames
var masks = [{src:'/img/frames/custom/stoneCutter/stoneCutterDeluxe/class/masks/maskFrame.png', name:'Frame'}, {src:'/img/frames/custom/stoneCutter/stoneCutterDeluxe/class/masks/maskRules.png', name:'Rules'}, {src:'/img/frames/custom/stoneCutter/stoneCutterDeluxe/class/masks/maskBorderless.png', name:'Borderless'}, {src:'/img/frames/custom/stoneCutter/stoneCutterDeluxe/class/masks/maskBorder.png', name:'Border'}];
//defines available frames
availableFrames = [
	{name:'White Frame', src:'/img/frames/custom/stoneCutter/stoneCutterDeluxe/class/w.png', masks:masks},
	{name:'Blue Frame', src:'/img/frames/custom/stoneCutter/stoneCutterDeluxe/class/u.png', masks:masks},
	{name:'Black Frame', src:'/img/frames/custom/stoneCutter/stoneCutterDeluxe/class/b.png', masks:masks},
	{name:'Red Frame', src:'/img/frames/custom/stoneCutter/stoneCutterDeluxe/class/r.png', masks:masks},
	{name:'Green Frame', src:'/img/frames/custom/stoneCutter/stoneCutterDeluxe/class/g.png', masks:masks},
	{name:'Multicolored Frame', src:'/img/frames/custom/stoneCutter/stoneCutterDeluxe/class/m.png', masks:masks},
	{name:'Colorless Frame', src:'/img/frames/custom/stoneCutter/stoneCutterDeluxe/class/c.png', masks:masks},
	{name:'Land Frame', src:'/img/frames/custom/stoneCutter/stoneCutterDeluxe/class/L.png', masks:masks},
	{name:'Gold Inlay', src:'/img/frames/custom/stoneCutter/stoneCutterDeluxe/class/gold.png'},
	{name:'Nyx Inlay', src:'/img/frames/custom/stoneCutter/stoneCutterDeluxe/class/nyx.png'}
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = async function() {
	//resets things so that every frame doesn't have to
	await resetCardIrregularities();
	//sets card version
	card.version = 'caseStoneCutterDeluxe';
	//art bounds
	card.artBounds = {x:0.0723, y:0.1080, width:0.4250, height:0.7343};
	autoFitArt();
	//set symbol bounds
	card.setSymbolBounds = {x:0.9227, y:0.8850, width:0.12, height:0.0381, vertical:'center', horizontal: 'right'};
	resetSetSymbol();
	//watermark bounds
	card.watermarkBounds = {x:0.5214, y:0.4748, width:0.38, height:0.6767};
	resetWatermark();
	//text
	loadTextOptions({
		mana: {name:'Mana Cost', text:'', y:0.0558, width:0.9292, height:71/2100, oneLine:true, size:71/1638, align:'right', shadowX:-0.001, shadowY:0.0029, manaCost:true, manaSpacing:0},
		title: {name:'Title', text:'', x:0.0854, y:0.0458, width:0.8292, height:0.0543, oneLine:true, font:'belerenb', size:0.0381, color:'white', shadowX:0.002, shadowY:0.0015},
		type: {name:'Type', text:'', x:0.0854, y:0.8572, width:0.8292, height:0.0543, oneLine:true, font:'belerenb', size:0.0324, color:'white', shadowX:0.002, shadowY:0.0015},
		case: {name:'Case Text', text:'//{bar}//To solve — {i}(If unsolved, solve at the beginning of your end step.){/i}//{bar}//Solved — ', x:0.5273, y:326/2814, width:0.392, height:2030/2814, size:0.03445}
	});
}
//loads available frames
loadFramePack();