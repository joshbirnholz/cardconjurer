//Create objects for common properties across available frames
var bounds = {x:-0.044, y:-1/35, width:1.088, height:37/35};
var ogBounds = {x:0, y:0, width:1, height:1};
var masks = [{src:'/img/frames/unstable/margins/title.svg', name:'Title'}, {src:'/img/frames/unstable/margins/pinline.svg', name:'Bottom'}];
//defines available frames
availableFrames = [
	{name:'White Extension', src:'/img/frames/unstable/margins/w.png', bounds:bounds, ogBounds:ogBounds, masks:masks},
	{name:'Blue Extension', src:'/img/frames/unstable/margins/u.png', bounds:bounds, ogBounds:ogBounds, masks:masks},
	{name:'Black Extension', src:'/img/frames/unstable/margins/b.png', bounds:bounds, ogBounds:ogBounds, masks:masks},
	{name:'Red Extension', src:'/img/frames/unstable/margins/r.png', bounds:bounds, ogBounds:ogBounds, masks:masks},
	{name:'Green Extension', src:'/img/frames/unstable/margins/g.png', bounds:bounds, ogBounds:ogBounds, masks:masks},
	{name:'Multicolored Extension', src:'/img/frames/unstable/margins/m.png', bounds:bounds, ogBounds:ogBounds, masks:masks},
	{name:'Artifact Extension', src:'/img/frames/unstable/margins/a.png', bounds:bounds, ogBounds:ogBounds, masks:masks},
	{name:'Land Extension', src:'/img/frames/unstable/margins/c.png', bounds:bounds, ogBounds:ogBounds, masks:masks}
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = loadMarginVersion;
//loads available frames
loadFramePack();