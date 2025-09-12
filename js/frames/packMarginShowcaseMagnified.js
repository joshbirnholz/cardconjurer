//Create objects for common properties across available frames
var bounds = {x:-88/2010, y:-80/2817, width:2187/2010, height:2978/2817};
var ogBounds = {x:0, y:0, width:1, height:1};
var masks = [
	{src:'/img/frames/showcaseMagnified/margin/masks/maskNoBorder.png', name:'No Border'},
	{src:'/img/frames/showcaseMagnified/margin/masks/maskStraightBorderless.png', name:'Straight Borderless'},
    {src:'/img/frames/showcaseMagnified/margin/masks/maskBorderless.png', name:'Borderless'},
	{src:'/img/frames/showcaseMagnified/margin/masks/maskBorderStraightBorderless.png', name:'Border Straight Borderless'},
	{src:'/img/frames/showcaseMagnified/margin/masks/maskBorderBorderless.png', name:'Border Borderless'}
];
//defines available frames
availableFrames = [
	{name:'White Extension', src:'/img/frames/showcaseMagnified/margin/margin.png', bounds:bounds, ogBounds:ogBounds, masks:masks}

];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = loadMarginVersion;
//loads available frames
loadFramePack();