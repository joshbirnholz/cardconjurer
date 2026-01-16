//Create objects for common properties across available frames
//var masks = [{src:'/img/frames/modal/transformAddon/mask.png', name:'Transform Addon'}];
var bounds = {x:1810/2010, y:2290/2814, width:136/2010, height:250/2814};
//defines available frames
availableFrames = [
	{name:'White Transform Arrow', src:'/img/frames/modal/transformAddon/extended/w.png', bounds:bounds},
	{name:'Blue Transform Arrow', src:'/img/frames/modal/transformAddon/extended/u.png', bounds:bounds},
	{name:'Black Transform Arrow', src:'/img/frames/modal/transformAddon/extended/b.png', bounds:bounds},
	{name:'Red Transform Arrow', src:'/img/frames/modal/transformAddon/extended/r.png', bounds:bounds},
	{name:'Green Transform Arrow', src:'/img/frames/modal/transformAddon/extended/g.png', bounds:bounds},
	{name:'Multicolored Transform Arrow', src:'/img/frames/modal/transformAddon/extended/m.png', bounds:bounds},
	{name:'Artifact Transform Arrow', src:'/img/frames/modal/transformAddon/extended/a.png', bounds:bounds},
    {name:'Land Transform Arrow (Matches Promo Extended Art Frames)', src:'/img/frames/modal/transformAddon/extended/L.png', bounds:bounds},
	
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = true;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = null;
//loads available frames
loadFramePack();