//Create objects for common properties across available frames
var masks = [{src:'/img/frames/m15/crowns/m15MaskLegendCrown.png', name:'Crown Without Pinlines'}, {src:'/img/frames/m15/ub/crowns/m15MaskLegendCrownPinline.png', name:'Crown With Pinlines'}];
var bounds = {x:0.0274, y:0.0191, width:0.9454, height:0.1667};
//defines available frames
availableFrames = [
	{name:'White Legend Crown', src:'/img/frames/m15/ub/crowns/m15CrownW.png', masks:masks, bounds:bounds, complementary:9},
	{name:'Blue Legend Crown', src:'/img/frames/m15/ub/crowns/m15CrownU.png', masks:masks, bounds:bounds, complementary:9},
	{name:'Black Legend Crown', src:'/img/frames/m15/ub/crowns/m15CrownB.png', masks:masks, bounds:bounds, complementary:9},
	{name:'Red Legend Crown', src:'/img/frames/m15/ub/crowns/m15CrownR.png', masks:masks, bounds:bounds, complementary:9},
	{name:'Green Legend Crown', src:'/img/frames/m15/ub/crowns/m15CrownG.png', masks:masks, bounds:bounds, complementary:9},
	{name:'Multicolored Legend Crown', src:'/img/frames/m15/ub/crowns/m15CrownM.png', masks:masks, bounds:bounds, complementary:9},
	{name:'Artifact Legend Crown', src:'/img/frames/m15/ub/crowns/m15CrownA.png', masks:masks, bounds:bounds, complementary:9},
	{name:'Land Legend Crown', src:'/img/frames/m15/ub/crowns/m15CrownL.png', masks:masks, bounds:bounds, complementary:9},
	{name:'Colorless Legend Crown', src:'/img/frames/m15/crowns/m15CrownC.png', masks:masks, bounds:bounds, complementary:9},
	{name:'Legend Crown Border Cover', src:'/img/black.png', bounds:{x:0.0394, y:0.0277, width:0.9214, height:0.0177}}
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = true;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = null;
//loads available frames
loadFramePack();