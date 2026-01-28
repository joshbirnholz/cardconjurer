//Create objects for common properties across available frames
//var masks = [{src:'/img/frames/modal/transformAddon/mask.png', name:'Transform Addon'}];
var bounds = {x:1810/2010, y:2290/2814, width:136/2010, height:250/2814};
//defines available frames
availableFrames = [
	{name:'White Transform Arrow', src:'/img/frames/modal/transformAddon/snow/w.png', bounds:bounds},
	{name:'Blue Transform Arrow', src:'/img/frames/modal/transformAddon/snow/u.png', bounds:bounds},
	{name:'Black Transform Arrow', src:'/img/frames/modal/transformAddon/snow/b.png', bounds:bounds},
	{name:'Red Transform Arrow', src:'/img/frames/modal/transformAddon/snow/r.png', bounds:bounds},
	{name:'Green Transform Arrow', src:'/img/frames/modal/transformAddon/snow/g.png', bounds:bounds},
	{name:'Multicolored Transform Arrow', src:'/img/frames/modal/transformAddon/snow/m.png', bounds:bounds},
	{name:'Artifact Transform Arrow', src:'/img/frames/modal/transformAddon/snow/a.png', bounds:bounds},

	{name:'Land Transform Arrow', src:'/img/frames/modal/transformAddon/snow/land/L.png', bounds:bounds},
	{name:'White Land Transform Arrow', src:'/img/frames/modal/transformAddon/snow/land/w.png', bounds:bounds},
	{name:'Blue Land Transform Arrow', src:'/img/frames/modal/transformAddon/snow/land/u.png', bounds:bounds},
	{name:'Black Land Transform Arrow', src:'/img/frames/modal/transformAddon/snow/land/b.png', bounds:bounds},
	{name:'Red Land Transform Arrow', src:'/img/frames/modal/transformAddon/snow/land/r.png', bounds:bounds},
	{name:'Green Land Transform Arrow', src:'/img/frames/modal/transformAddon/snow/land/g.png', bounds:bounds},
	{name:'Multicolored Land Transform Arrow', src:'/img/frames/modal/transformAddon/snow/land/m.png', bounds:bounds}
	
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = true;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = null;
//loads available frames
loadFramePack();