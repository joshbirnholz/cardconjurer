//Create objects for common properties across available frames
var masks = [{src:'/img/frames/m15/crowns/m15MaskLegendCrown.png', name:'Crown Without Pinlines'}, {src:'/img/frames/m15/ub/crowns/m15MaskLegendCrownPinline.png', name:'Crown With Pinlines'}];
var bounds = {x:1810/2010, y:2290/2814, width:136/2010, height:250/2814};
//defines available frames
availableFrames = [
	{name:'White Transform Arrow', src:'/img/frames/modal/transformAddon/w.png', masks:masks, bounds:bounds},
	{name:'Blue Transform Arrow', src:'/img/frames/modal/transformAddon/u.png', masks:masks, bounds:bounds},
	{name:'Black Transform Arrow', src:'/img/frames/modal/transformAddon/b.png', masks:masks, bounds:bounds},
	{name:'Red Transform Arrow', src:'/img/frames/modal/transformAddon/r.png', masks:masks, bounds:bounds},
	{name:'Green Transform Arrow', src:'/img/frames/modal/transformAddon/g.png', masks:masks, bounds:bounds},
	{name:'Multicolored Transform Arrow', src:'/img/frames/modal/transformAddon/m.png', masks:masks, bounds:bounds},
	{name:'Artifact Transform Arrow', src:'/img/frames/modal/transformAddon/a.png', masks:masks, bounds:bounds},
	{name:'Vehicle Transform Arrow', src:'/img/frames/modal/transformAddon/v.png', masks:masks, bounds:bounds},
		{name:'Colorless Transform Arrow', src:'/img/frames/modal/transformAddon/c.png', masks:masks, bounds:bounds},

	{name:'Land Transform Arrow', src:'/img/frames/modal/transformAddon/L.png', masks:masks, bounds:bounds},
	{name:'White Land Transform Arrow', src:'/img/frames/modal/transformAddon/WL.png', masks:masks, bounds:bounds},
	{name:'Blue Land Transform Arrow', src:'/img/frames/modal/transformAddon/uL.png', masks:masks, bounds:bounds},
	{name:'Black Land Transform Arrow', src:'/img/frames/modal/transformAddon/bL.png', masks:masks, bounds:bounds},
	{name:'Red Land Transform Arrow', src:'/img/frames/modal/transformAddon/rL.png', masks:masks, bounds:bounds},
	{name:'Green Land Transform Arrow', src:'/img/frames/modal/transformAddon/gL.png', masks:masks, bounds:bounds},
	{name:'Multicolored Land Transform Arrow', src:'/img/frames/modal/transformAddon/mL.png', masks:masks, bounds:bounds}
	
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = true;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = null;
//loads available frames
loadFramePack();