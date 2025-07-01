//Create objects for common properties across available frames
var masks = [{src:'/img/frames/draconic/margin/masks/maskBorderless.png', name:'Borderless'}];
var bounds = {x:-88/2010, y:-80/2817, width:2187/2010, height:2978/2817};
var ogBounds = {x:0, y:0, width:1, height:1};
var bounds2 = {x:-0.044, y:-1/35, width:1.088, height:37/35};
//defines available frames
availableFrames = [
	{name:'White Extension', src:'/img/frames/draconic/margin/w.png', bounds:bounds, ogBounds:ogBounds, masks:masks},
	{name:'Blue Extension', src:'/img/frames/draconic/margin/u.png', bounds:bounds, ogBounds:ogBounds, masks:masks},
	{name:'Black Extension', src:'/img/frames/draconic/margin/b.png', bounds:bounds, ogBounds:ogBounds, masks:masks},
	{name:'Red Extension', src:'/img/frames/draconic/margin/r.png', bounds:bounds, ogBounds:ogBounds, masks:masks},
	{name:'Green Extension', src:'/img/frames/draconic/margin/g.png', bounds:bounds, ogBounds:ogBounds, masks:masks},
	{name:'Multicolored Extension', src:'/img/frames/draconic/margin/m.png', bounds:bounds, ogBounds:ogBounds, masks:masks},
	{name:'Artifact Extension', src:'/img/frames/draconic/margin/a.png', bounds:bounds, ogBounds:ogBounds, masks:masks},
	{name:'Borderless Extension', src:'/img/frames/margins/borderlessBorderExtension.png', bounds:bounds2}

];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = loadMarginVersion;
//loads available frames
loadFramePack();