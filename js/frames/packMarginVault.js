//Create objects for common properties across available frames
var masks = [{src:'/img/frames/vault/margin/masks/maskBorderless.png', name:'Borderless'}, {src:'/img/frames/vault/margin/masks/maskBottomFrame.png', name:'Bottom Frame'}, {src:'/img/frames/vault/margin/masks/maskNoBorder.png', name:'No Border'}, {src:'/img/frames/vault/margin/masks/maskBottomFrameNoBorder.png', name:'Bottom Frame No Border'}];
var bounds = {x:-88/2010, y:-80/2817, width:2187/2010, height:2978/2817};
var ogBounds = {x:0, y:0, width:1, height:1};
//defines available frames
availableFrames = [
	{name:'White Extension', src:'/img/frames/vault/margin/w.png', bounds:bounds, ogBounds:ogBounds, masks:masks},
	{name:'Blue Extension', src:'/img/frames/vault/margin/u.png', bounds:bounds, ogBounds:ogBounds, masks:masks},
	{name:'Black Extension', src:'/img/frames/vault/margin/b.png', bounds:bounds, ogBounds:ogBounds, masks:masks},
	{name:'Red Extension', src:'/img/frames/vault/margin/r.png', bounds:bounds, ogBounds:ogBounds, masks:masks},
	{name:'Green Extension', src:'/img/frames/vault/margin/g.png', bounds:bounds, ogBounds:ogBounds, masks:masks},
	{name:'Multicolored Extension', src:'/img/frames/vault/margin/m.png', bounds:bounds, ogBounds:ogBounds, masks:masks},
	{name:'Artifact Extension', src:'/img/frames/vault/margin/a.png', bounds:bounds, ogBounds:ogBounds, masks:masks},
	{name:'Land Extension', src:'/img/frames/vault/margin/l.png', bounds:bounds, ogBounds:ogBounds, masks:masks}
];
notify('If you use a legend crown, make sure to put the margin layer under the crowns layer.', 10)
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = loadMarginVersion;
//loads available frames
loadFramePack();