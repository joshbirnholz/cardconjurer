//Create objects for common properties across available frames
var masks = [{src:'/img/frames/sewerTMT/masks/maskFloating.png', name:'Floating Frame'}];
var stampBounds = {x:685/2010, y:2395/2814, width:643/2010, height:220/2814};
var ptBounds = {x:1546/2010, y:2485/2814, width:348/2010, height:169/2814};
//defines available frames
availableFrames = [
	{name:'White Frame', src:'/img/frames/sewerTMT/w.png', masks:masks},
	{name:'Blue Frame', src:'/img/frames/sewerTMT/u.png', masks:masks},
	{name:'Black Frame', src:'/img/frames/sewerTMT/b.png', masks:masks},
	{name:'Red Frame', src:'/img/frames/sewerTMT/r.png', masks:masks},
	{name:'Green Frame', src:'/img/frames/sewerTMT/g.png', masks:masks},
	{name:'Multicolored Frame', src:'/img/frames/sewerTMT/m.png', masks:masks},
	{name:'Artifact Frame', src:'/img/frames/sewerTMT/a.png', masks:masks},
	{name:'Land Frame', src:'/img/frames/sewerTMT/l.png', masks:masks},

	{name:'White Power/Toughness', src:'/img/frames/sewerTMT/pt/w.png', bounds:ptBounds},
	{name:'Blue Power/Toughness', src:'/img/frames/sewerTMT/pt/u.png', bounds:ptBounds},
	{name:'Black Power/Toughness', src:'/img/frames/sewerTMT/pt/b.png', bounds:ptBounds},
	{name:'Red Power/Toughness', src:'/img/frames/sewerTMT/pt/r.png', bounds:ptBounds},
	{name:'Green Power/Toughness', src:'/img/frames/sewerTMT/pt/g.png', bounds:ptBounds},
	{name:'Multicolored Power/Toughness', src:'/img/frames/sewerTMT/pt/m.png', bounds:ptBounds},
	{name:'Artifact Power/Toughness', src:'/img/frames/sewerTMT/pt/a.png', bounds:ptBounds},
	{name:'Hybrid Power/Toughness', src:'/img/frames/sewerTMT/pt/h.png', bounds:ptBounds},

	{name:'Plain Holo Stamp', src:'/img/frames/m15/holoStamps/stamp.png', bounds:{x:917/2010, y:2563/2814, width:0.0894, height:0.0320}},
	{name:'Gray Holo Stamp', src:'/img/frames/m15/holoStamps/gray.png', bounds:{x:917/2010, y:2563/2814, width:0.0894, height:0.0320}},
	{name:'White Holo Stamp', src:'/img/frames/sewerTMT/stamp/w.png', bounds:stampBounds},
	{name:'Blue Holo Stamp', src:'/img/frames/sewerTMT/stamp/u.png', bounds:stampBounds},
	{name:'Black Holo Stamp', src:'/img/frames/sewerTMT/stamp/b.png', bounds:stampBounds},
	{name:'Red Holo Stamp', src:'/img/frames/sewerTMT/stamp/r.png', bounds:stampBounds},
	{name:'Green Holo Stamp', src:'/img/frames/sewerTMT/stamp/g.png', bounds:stampBounds},
	{name:'Multicolored Holo Stamp', src:'/img/frames/sewerTMT/stamp/m.png', bounds:stampBounds},
	{name:'Artifact Holo Stamp', src:'/img/frames/sewerTMT/stamp/a.png', bounds:stampBounds}


];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = async function() {
	//resets things so that every frame doesn't have to
	await resetCardIrregularities();
	//sets card version
	card.version = 'sewerTMT';
	card.showsFlavorBar = false;
	//art bounds
	card.artBounds = {x:0, y:320/2814, width:1, height:1230/2814};
	autoFitArt();
	//set symbol bounds
	card.setSymbolBounds = {x:0.9213, y:0.5850, width:0.12, height:0.0410, vertical:'center', horizontal: 'right'};
	resetSetSymbol();
	//watermark bounds
	card.watermarkBounds = {x:0.5, y:0.7762, width:0.75, height:0.2305};
	resetWatermark();
	//text
	loadTextOptions({
		mana: {name:'Mana Cost', text:'', x:-16/2010, y:169/2814, width:0.9292, height:71/2100, oneLine:true, size:71/1638, align:'right', shadowX:-0.001, shadowY:0.0029, manaCost:true, manaSpacing:0},
		title: {name:'Title', text:'', x:185/2010, y:142/2814, width:0.8292, height:0.0543, oneLine:true, font:'sewertmt-ccrumble', size:0.0323, color:'white'},
		type: {name:'Type', text:'', x:0.0854, y:1576/2814, width:1516/2010, height:0.0543, oneLine:true, font:'sewertmt-ccrumble', size:0.0324, color:'white'},
		rules: {name:'Rules Text', text:'', x:176/2010, y:1765/2814, width:1660/2010, height:818/2814, size:0.0362, color:'white'},
		pt: {name:'Power/Toughness', text:'', x:1594/2010, y:2522/2814, width:256/2010, height:100/2814, size:0.0372, font:'sewertmt-ccrumble', oneLine:true, align:'center', color:'white'}
	});
}
//loads available frames
loadFramePack();