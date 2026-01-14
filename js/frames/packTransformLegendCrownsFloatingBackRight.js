//Create objects for common properties across available frames
var bounds = {x:0, y:0, width:1, height:1};
//defines available frames
availableFrames = [
	{name:'White Legend Crown', src:'/img/frames/m15/transform/crowns/floating/backRight/w.png', bounds:bounds, complementary:[9,10]},
	{name:'Blue Legend Crown', src:'/img/frames/m15/transform/crowns/floating/backRight/u.png', bounds:bounds, complementary:[9,10]},
	{name:'Black Legend Crown', src:'/img/frames/m15/transform/crowns/floating/backRight/b.png', bounds:bounds, complementary:[9,10]},
	{name:'Red Legend Crown', src:'/img/frames/m15/transform/crowns/floating/backRight/r.png', bounds:bounds, complementary:[9,10]},
	{name:'Green Legend Crown', src:'/img/frames/m15/transform/crowns/floating/backRight/g.png', bounds:bounds, complementary:[9,10]},
	{name:'Multicolored Legend Crown', src:'/img/frames/m15/transform/crowns/floating/backRight/m.png', bounds:bounds, complementary:[9,10]},
	{name:'Artifact Legend Crown', src:'/img/frames/m15/transform/crowns/floating/backRight/a.png', bounds:bounds, complementary:[9,10]},
	{name:'Colorless Legend Crown', src:'/img/frames/m15/transform/crowns/floating/backRight/c.png', bounds:bounds, complementary:[9,10]},
	{name:'Land Legend Crown', src:'/img/frames/m15/transform/crowns/floating/backRight/l.png', bounds:bounds, complementary:[9,10]},
	{name:'Legend Crown Border Cover', src:'/img/black.png', bounds:{x:0.0394, y:0.0277, width:0.9214, height:0.0177}, erase:true},
	{name:'Legend Crown Lower Cutout', src:'/img/black.png', bounds:{x:0.0767, y:0.1096, width:0.8467, height:0.0143}, erase:true},
	{name:'Legend Crown Outline (Place this under crown layer)', src:'/img/frames/m15/crowns/m15CrownFloatingOutline.png', bounds:{x:0.028, y:0.0172, width:0.944, height:0.1062}}
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = true;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = null;
//loads available frames
loadFramePack();