//Create objects for common properties across available frames
var masks = [/*{src:'/img/frames/8th/crowns/8thMaskLegendCrown.png', name:'Crown Without Pinlines'}, {src:'/img/frames/8th/crowns/8thMaskLegendCrownPinline.png', name:'Crown With Pinlines'}*/];
var bounds = {x:64/2010, y:81/2814, width:1886/2010, height:482/2814};
//defines available frames
availableFrames = [
	{name:'White Legend Crown', src:'/img/frames/8th/crowns/w.png', masks:masks, bounds:bounds, complementary:'Legend Crown Border Cover'},
	{name:'Blue Legend Crown', src:'/img/frames/8th/crowns/u.png', masks:masks, bounds:bounds, complementary:'Legend Crown Border Cover'},
	{name:'Black Legend Crown', src:'/img/frames/8th/crowns/b.png', masks:masks, bounds:bounds, complementary:'Legend Crown Border Cover'},
	{name:'Red Legend Crown', src:'/img/frames/8th/crowns/r.png', masks:masks, bounds:bounds, complementary:'Legend Crown Border Cover'},
	{name:'Green Legend Crown', src:'/img/frames/8th/crowns/g.png', masks:masks, bounds:bounds, complementary:'Legend Crown Border Cover'},
	{name:'Multicolored Legend Crown', src:'/img/frames/8th/crowns/m.png', masks:masks, bounds:bounds, complementary:'Legend Crown Border Cover'},
	{name:'Artifact Legend Crown', src:'/img/frames/8th/crowns/a.png', masks:masks, bounds:bounds, complementary:'Legend Crown Border Cover'},
	{name:'Land Legend Crown', src:'/img/frames/8th/crowns/l.png', masks:masks, bounds:bounds, complementary:'Legend Crown Border Cover'},
	{name:'Colorless Legend Crown', src:'/img/frames/8th/crowns/c.png', masks:masks, bounds:bounds, complementary:'Legend Crown Border Cover'},
	{name:'Legend Crown Border Cover', src:'/img/black.png', bounds:{x:0, y:0, width:1, height:160/2814}}
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = true;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = null;
//loads available frames
loadFramePack();