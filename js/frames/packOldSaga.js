//defines available frames
availableFrames = [
	{name:'White Frame', src:'/img/frames/old/saga/w.png'},
	{name:'Blue Frame', src:'/img/frames/old/saga/u.png'},
	{name:'Black Frame', src:'/img/frames/old/saga/b.png'},
	{name:'Red Frame', src:'/img/frames/old/saga/r.png'},
	{name:'Green Frame', src:'/img/frames/old/saga/g.png'},
	{name:'Multicolored Frame', src:'/img/frames/old/saga/m.png'},
	{name:'Land Frame', src:'/img/frames/old/saga/l.png'},
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = async function() {
	//resets things so that every frame doesn't have to
	await resetCardIrregularities();
	//sets card version
	card.version = 'oldSaga';
	card.onload = '/js/frames/versionSaga.js';
	loadScript('/js/frames/versionSaga.js');
	//art bounds
	card.artBounds = {x:0.5334, y:0.1091, width:0.3734, height:0.722};
	autoFitArt();
	//set symbol bounds
	card.setSymbolBounds = {x:0.9, y:0.8643, width:0.12, height:0.0372, vertical:'center', horizontal: 'right'};
	resetSetSymbol();
	//watermark bounds
	card.watermarkBounds = {x:0.3027, y:0.4748, width:0.3547, height:0.6767};
	resetWatermark();
	//text
	loadTextOptions({
		mana: {name:'Mana Cost', text:'', x:0.1067, y:0.0562, width:0.8174, height:72/2100, oneLine:true, size:72/1638, align:'right', manaCost:true},
		title: {name:'Title', text:'', x:0.1134, y:0.0505, width:0.7734, height:0.041, oneLine:true, font:'goudymedieval', size:0.041, color:'white', shadowX:0.002, shadowY:0.0015},
		type: {name:'Type', text:'', x:0.1074, y:0.8391, width:0.7852, height:0.0543, oneLine:true, size:0.032, color:'white', shadowX:0.002, shadowY:0.0015},
		ability0: {name:'Ability 1', text:'', x:0.1447, y:0.2896, width:0.32, height:0.1786, size:0.0305},
		ability1: {name:'Ability 2', text:'', x:0.1447, y:0, width:0.32, height:0.1786, size:0.0305},
		ability2: {name:'Ability 3', text:'', x:0.1447, y:0, width:0.32, height:0.1786, size:0.0305},
		ability3: {name:'Ability 4', text:'', x:0.1447, y:0, width:0.32, height:0, size:0.0305},
		reminder: {name:'Reminder Text', text:'{i}(As this Saga enters and after your draw step, add a lore counter. Sacrifice after III.)', x:0.1, y:0.1043, width:0.3667, height:0.1772, size:0.0281, shadowColor:'white'}
	});
	//bottom info
	loadBottomInfo({
		top: {text:'Illus: {elemidinfo-artist}', x:0.1, y:1872/2100, width:0.8, height:0.0267, oneLine:true, size:0.0267, align:'center', shadowX:0.0021, shadowY:0.0015, color:'white'},
		credit: {name:'wizards', text:'Designed by {elemidinfo-credit}', x:0.1, y:1933/2100, width:0.8, height:0.0172, oneLine:true, size:0.0172, align:'center', shadowX:0.0014, shadowY:0.001, color:'white'}
	});
}
//loads available frames
loadFramePack();