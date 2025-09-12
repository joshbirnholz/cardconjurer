//Create objects for common properties across available frames
var bounds = {x:-88/2010, y:-80/2817, width:2187/2010, height:2978/2817};
var ogBounds = {x:0, y:0, width:1, height:1};
var masks = [
    {src:'/img/frames/m15/japanShowcase/margin/masks/maskBorderPinlines.png', name:'Pinline'},
	{src:'/img/frames/m15/japanShowcase/margin/masks/maskBorder.png', name:'Border'}];
//defines available frames
availableFrames = [
	{name:'White Extension', src:'/img/frames/m15/japanShowcase/margin/w.png', bounds:bounds, ogBounds:ogBounds, masks:masks},
	{name:'Blue Extension', src:'/img/frames/m15/japanShowcase/margin/u.png', bounds:bounds, ogBounds:ogBounds, masks:masks},
	{name:'Black Extension', src:'/img/frames/m15/japanShowcase/margin/b.png', bounds:bounds, ogBounds:ogBounds, masks:masks},
	{name:'Red Extension', src:'/img/frames/m15/japanShowcase/margin/r.png', bounds:bounds, ogBounds:ogBounds, masks:masks},
	{name:'Green Extension', src:'/img/frames/m15/japanShowcase/margin/g.png', bounds:bounds, ogBounds:ogBounds, masks:masks},
	{name:'Multicolored Extension', src:'/img/frames/m15/japanShowcase/margin/m.png', bounds:bounds, ogBounds:ogBounds, masks:masks},
	{name:'Artifact Extension', src:'/img/frames/m15/japanShowcase/margin/a.png', bounds:bounds, ogBounds:ogBounds, masks:masks},
	{name:'Land Extension', src:'/img/frames/m15/japanShowcase/margin/L.png', bounds:bounds, ogBounds:ogBounds, masks:masks},
	{name:'Black (Alt) Extension', src:'/img/frames/m15/japanShowcase/margin/bAlt.png', bounds:bounds, ogBounds:ogBounds, masks:masks}

];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = loadMarginVersion;
//loads available frames
loadFramePack();