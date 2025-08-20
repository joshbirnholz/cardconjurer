//Create objects for common properties across available frames
var bounds = {x:-88/2010, y:-80/2817, width:2187/2010, height:2975/2814};
var ogBounds = {x:0, y:0, width:1, height:1};
var masks = [{src:'/img/frames/stellarSights/borderlessStellarSights/margin/masks/maskNoBorder.png', name:'No Border'}, {src:'/img/frames/stellarSights/borderlessStellarSights/margin/masks/maskBorder.png', name:'Border'}];

//defines available frames
availableFrames = [
	{name:'White Extension', src:'/img/frames/stellarSights/borderlessStellarSights/margin/w.png', bounds:bounds, ogBounds:ogBounds, masks:masks},
	{name:'Blue Extension', src:'/img/frames/stellarSights/borderlessStellarSights/margin/u.png', bounds:bounds, ogBounds:ogBounds, masks:masks},
	{name:'Black Extension', src:'/img/frames/stellarSights/borderlessStellarSights/margin/b.png', bounds:bounds, ogBounds:ogBounds, masks:masks},
	{name:'Red Extension', src:'/img/frames/stellarSights/borderlessStellarSights/margin/r.png', bounds:bounds, ogBounds:ogBounds, masks:masks},
	{name:'Green Extension', src:'/img/frames/stellarSights/borderlessStellarSights/margin/g.png', bounds:bounds, ogBounds:ogBounds, masks:masks},
	{name:'Multicolored Extension', src:'/img/frames/stellarSights/borderlessStellarSights/margin/m.png', bounds:bounds, ogBounds:ogBounds, masks:masks},
	{name:'Artifact Extension', src:'/img/frames/stellarSights/borderlessStellarSights/margin/a.png', bounds:bounds, ogBounds:ogBounds, masks:masks},
	{name:'Land Extension', src:'/img/frames/stellarSights/borderlessStellarSights/margin/L.png', bounds:bounds, ogBounds:ogBounds, masks:masks}

];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = loadMarginVersion;
//loads available frames
loadFramePack();