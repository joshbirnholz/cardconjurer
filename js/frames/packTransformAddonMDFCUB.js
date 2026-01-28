//Create objects for common properties across available frames
//var masks = [{src:'/img/frames/modal/transformAddon/mask.png', name:'Transform Addon'}];
var bounds = {x:1810/2010, y:2290/2814, width:136/2010, height:250/2814};
//defines available frames
availableFrames = [
	{name:'White Transform Arrow', src:'/img/frames/modal/transformAddon/ub/w.png', bounds:bounds},
	{name:'Blue Transform Arrow', src:'/img/frames/modal/transformAddon/ub/u.png', bounds:bounds},
	{name:'Black Transform Arrow', src:'/img/frames/modal/transformAddon/ub/b.png', bounds:bounds},
	{name:'Red Transform Arrow', src:'/img/frames/modal/transformAddon/ub/r.png', bounds:bounds},
	{name:'Green Transform Arrow', src:'/img/frames/modal/transformAddon/ub/g.png', bounds:bounds},
	{name:'Multicolored Transform Arrow', src:'/img/frames/modal/transformAddon/ub/m.png', bounds:bounds},
	{name:'Artifact Transform Arrow', src:'/img/frames/modal/transformAddon/ub/a.png', bounds:bounds},
	{name:'Vehicle Transform Arrow', src:'/img/frames/modal/transformAddon/ub/v.png', bounds:bounds},

	{name:'White Nyx Transform Arrow', src:'/img/frames/modal/transformAddon/ub/nyx/w.png', bounds:bounds},
	{name:'Blue Nyx Transform Arrow', src:'/img/frames/modal/transformAddon/ub/nyx/u.png', bounds:bounds},
	{name:'Black Nyx Transform Arrow', src:'/img/frames/modal/transformAddon/ub/nyx/b.png', bounds:bounds},
	{name:'Red Nyx Transform Arrow', src:'/img/frames/modal/transformAddon/ub/nyx/r.png', bounds:bounds},
	{name:'Green Nyx Transform Arrow', src:'/img/frames/modal/transformAddon/ub/nyx/g.png', bounds:bounds},
	{name:'Multicolored Nyx Transform Arrow', src:'/img/frames/modal/transformAddon/ub/nyx/m.png', bounds:bounds},
	{name:'Artifact Nyx Transform Arrow', src:'/img/frames/modal/transformAddon/ub/nyx/a.png', bounds:bounds},

	{name:'Land Transform Arrow', src:'/img/frames/modal/transformAddon/ub/land/L.png', bounds:bounds},
	{name:'White Land Transform Arrow', src:'/img/frames/modal/transformAddon/ub/land/w.png', bounds:bounds},
	{name:'Blue Land Transform Arrow', src:'/img/frames/modal/transformAddon/ub/land/u.png', bounds:bounds},
	{name:'Black Land Transform Arrow', src:'/img/frames/modal/transformAddon/ub/land/b.png', bounds:bounds},
	{name:'Red Land Transform Arrow', src:'/img/frames/modal/transformAddon/ub/land/r.png', bounds:bounds},
	{name:'Green Land Transform Arrow', src:'/img/frames/modal/transformAddon/ub/land/g.png', bounds:bounds},
	{name:'Multicolored Land Transform Arrow', src:'/img/frames/modal/transformAddon/ub/land/m.png', bounds:bounds}
	
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = true;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = null;
//loads available frames
loadFramePack();