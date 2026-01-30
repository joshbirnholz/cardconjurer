//Create objects for common properties across available frames
var masks = [/*{src:'/img/frames/8th/crowns/8thMaskLegendCrown.png', name:'Crown Without Pinlines'}, {src:'/img/frames/8th/crowns/8thMaskLegendCrownPinline.png', name:'Crown With Pinlines'}*/];
var bounds = {x:64/2010, y:81/2814, width:1886/2010, height:482/2814};
var innerBounds = {x:345/2010, y:97/2814, width:1325/2010, height:60/2814};
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

	{name:'Legend Crown Border Cover', src:'/img/black.png', bounds:{x:0, y:0, width:1, height:160/2814}},

	{name:'White Inner Crown (Nyx)', src:'/img/frames/8th/crowns/inner/nyx/w.png', bounds:innerBounds},
	{name:'Blue Inner Crown (Nyx)', src:'/img/frames/8th/crowns/inner/nyx/u.png', bounds:innerBounds},
	{name:'Black Inner Crown (Nyx)', src:'/img/frames/8th/crowns/inner/nyx/b.png', bounds:innerBounds},
	{name:'Red Inner Crown (Nyx)', src:'/img/frames/8th/crowns/inner/nyx/r.png', bounds:innerBounds},
	{name:'Green Inner Crown (Nyx)', src:'/img/frames/8th/crowns/inner/nyx/g.png', bounds:innerBounds},
	{name:'Multicolored Inner Crown (Nyx)', src:'/img/frames/8th/crowns/inner/nyx/m.png', bounds:innerBounds},
	{name:'Artifact Inner Crown (Nyx)', src:'/img/frames/8th/crowns/inner/nyx/a.png', bounds:innerBounds},

	{name:'White Inner Crown (Companion)', src:'/img/frames/8th/crowns/inner/companion/w.png', bounds:innerBounds},
	{name:'Blue Inner Crown (Companion)', src:'/img/frames/8th/crowns/inner/companion/u.png', bounds:innerBounds},
	{name:'Black Inner Crown (Companion)', src:'/img/frames/8th/crowns/inner/companion/b.png', bounds:innerBounds},
	{name:'Red Inner Crown (Companion)', src:'/img/frames/8th/crowns/inner/nycompanionx/r.png', bounds:innerBounds},
	{name:'Green Inner Crown (Companion)', src:'/img/frames/8th/crowns/inner/companion/g.png', bounds:innerBounds},
	{name:'Multicolored Inner Crown (Companion)', src:'/img/frames/8th/crowns/inner/companion/m.png', bounds:innerBounds},
	{name:'Artifact Inner Crown (Companion)', src:'/img/frames/8th/crowns/inner/companion/a.png', bounds:innerBounds},

	{name:'White Transform Legend Crown', src:'/img/frames/8th/crowns/transform/w.png', masks:masks, bounds:bounds, complementary:'Legend Crown Border Cover'},
	{name:'Blue Transform Legend Crown', src:'/img/frames/8th/crowns/transform/u.png', masks:masks, bounds:bounds, complementary:'Legend Crown Border Cover'},
	{name:'Black Transform Legend Crown', src:'/img/frames/8th/crowns/transform/b.png', masks:masks, bounds:bounds, complementary:'Legend Crown Border Cover'},
	{name:'Red Transform Legend Crown', src:'/img/frames/8th/crowns/transform/r.png', masks:masks, bounds:bounds, complementary:'Legend Crown Border Cover'},
	{name:'Green Transform Legend Crown', src:'/img/frames/8th/crowns/transform/g.png', masks:masks, bounds:bounds, complementary:'Legend Crown Border Cover'},
	{name:'Multicolored Transform Legend Crown', src:'/img/frames/8th/crowns/transform/m.png', masks:masks, bounds:bounds, complementary:'Legend Crown Border Cover'},
	{name:'Artifact Transform Legend Crown', src:'/img/frames/8th/crowns/transform/a.png', masks:masks, bounds:bounds, complementary:'Legend Crown Border Cover'},
	{name:'Land Transform Legend Crown', src:'/img/frames/8th/crowns/transform/l.png', masks:masks, bounds:bounds, complementary:'Legend Crown Border Cover'},
	{name:'Colorless Transform Legend Crown', src:'/img/frames/8th/crowns/transform/c.png', masks:masks, bounds:bounds, complementary:'Legend Crown Border Cover'}

];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = true;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = null;
//loads available frames
loadFramePack();