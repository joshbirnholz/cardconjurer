//Create objects for common properties across available frames
var bounds = {x:0.0307, y:0.0191, width:0.9387, height:0.1024};
//defines available frames
availableFrames = [
	{name:'White Legend Crown', src:'/img/frames/m15/crowns/m15CrownWFloating.png', bounds:bounds, complementary:'Legend Crown Border Cover'},
	{name:'Blue Legend Crown', src:'/img/frames/m15/crowns/m15CrownUFloating.png', bounds:bounds, complementary:'Legend Crown Border Cover'},
	{name:'Black Legend Crown', src:'/img/frames/m15/crowns/m15CrownBFloating.png', bounds:bounds, complementary:'Legend Crown Border Cover'},
	{name:'Black Legend Crown (Alt)', src:'/img/frames/m15/crowns/m15CrownBAltFloating.png', bounds:bounds, complementary:'Legend Crown Border Cover'},
	{name:'Red Legend Crown', src:'/img/frames/m15/crowns/m15CrownRFloating.png', bounds:bounds, complementary:'Legend Crown Border Cover'},
	{name:'Green Legend Crown', src:'/img/frames/m15/crowns/m15CrownGFloating.png', bounds:bounds, complementary:'Legend Crown Border Cover'},
	{name:'Multicolored Legend Crown', src:'/img/frames/m15/crowns/m15CrownMFloating.png', bounds:bounds, complementary:'Legend Crown Border Cover'},
	{name:'Artifact Legend Crown', src:'/img/frames/m15/crowns/m15CrownAFloating.png', bounds:bounds, complementary:'Legend Crown Border Cover'},
	{name:'Artifact Legend Crown (Alt)', src:'/img/frames/m15/crowns/m15CrownAFloatingAlt.png', bounds:bounds, complementary:'Legend Crown Border Cover'},
	{name:'Land Legend Crown', src:'/img/frames/m15/crowns/m15CrownLFloating.png', bounds:bounds, complementary:'Legend Crown Border Cover'},
	{name:'Colorless Legend Crown', src:'/img/frames/m15/crowns/m15CrownCFloating.png', bounds:bounds, complementary:'Legend Crown Border Cover'},
	{name:'Legend Crown Border Cover', src:'/img/black.png', bounds:{x:0.0394, y:0.0277, width:0.9214, height:0.0177}},
	{name:'Legend Crown Lower Cutout', src:'/img/black.png', bounds:{x:0.0734, y:0.1096, width:0.8532, height:0.0143}, erase:true},
	{name:'Legend Crown Outline (Place this under crown layer)', src:'/img/frames/m15/crowns/m15CrownFloatingOutline.png', bounds:{x:0.028, y:0.0172, width:0.944, height:0.1062}}
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = true;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = null;
//loads available frames
loadFramePack();