//Create objects for common properties across available frames
//var masks = [{src:'/img/frames/modal/transformAddon/mask.png', name:'Transform Addon'}];
var bounds = {x:1810/2010, y:2290/2814, width:136/2010, height:250/2814};
//defines available frames
availableFrames = [
	{name:'White Transform Arrow', src:'/img/frames/modal/transformAddon/w.png', bounds:bounds},
	{name:'Blue Transform Arrow', src:'/img/frames/modal/transformAddon/u.png', bounds:bounds},
	{name:'Black Transform Arrow', src:'/img/frames/modal/transformAddon/b.png', bounds:bounds},
	{name:'Red Transform Arrow', src:'/img/frames/modal/transformAddon/r.png', bounds:bounds},
	{name:'Green Transform Arrow', src:'/img/frames/modal/transformAddon/g.png', bounds:bounds},
	{name:'Multicolored Transform Arrow', src:'/img/frames/modal/transformAddon/m.png', bounds:bounds},
	{name:'Artifact Transform Arrow', src:'/img/frames/modal/transformAddon/a.png', bounds:bounds},
	{name:'Vehicle Transform Arrow', src:'/img/frames/modal/transformAddon/v.png', bounds:bounds},

	{name:'White Nyx Transform Arrow', src:'/img/frames/modal/transformAddon/nyx/w.png', bounds:bounds},
	{name:'Blue Nyx Transform Arrow', src:'/img/frames/modal/transformAddon/nyx/u.png', bounds:bounds},
	{name:'Black Nyx Transform Arrow', src:'/img/frames/modal/transformAddon/nyx/b.png', bounds:bounds},
	{name:'Red Nyx Transform Arrow', src:'/img/frames/modal/transformAddon/nyx/r.png', bounds:bounds},
	{name:'Green Nyx Transform Arrow', src:'/img/frames/modal/transformAddon/nyx/g.png', bounds:bounds},
	{name:'Multicolored Nyx Transform Arrow', src:'/img/frames/modal/transformAddon/nyx/m.png', bounds:bounds},
	{name:'Artifact Nyx Transform Arrow', src:'/img/frames/modal/transformAddon/a.png', bounds:bounds},

	{name:'Land Transform Arrow', src:'/img/frames/modal/transformAddon/land/L.png', bounds:bounds},
	{name:'White Land Transform Arrow', src:'/img/frames/modal/transformAddon/land/w.png', bounds:bounds},
	{name:'Blue Land Transform Arrow', src:'/img/frames/modal/transformAddon/land/u.png', bounds:bounds},
	{name:'Black Land Transform Arrow', src:'/img/frames/modal/transformAddon/land/b.png', bounds:bounds},
	{name:'Red Land Transform Arrow', src:'/img/frames/modal/transformAddon/land/r.png', bounds:bounds},
	{name:'Green Land Transform Arrow', src:'/img/frames/modal/transformAddon/land/g.png', bounds:bounds},
	{name:'Multicolored Land Transform Arrow', src:'/img/frames/modal/transformAddon/land/m.png', bounds:bounds}
	
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = true;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = null;
//loads available frames
loadFramePack();