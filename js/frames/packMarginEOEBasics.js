//Create objects for common properties across available frames
var bounds = {x:-88/2010, y:-80/2817, width:2187/2010, height:2978/2817};
var ogBounds = {x:0, y:0, width:1, height:1};
//defines available frames
availableFrames = [

	{name:'Land Extension', src:'/img/frames/textless/eoe/margin/margin.png', bounds:bounds, ogBounds:ogBounds}

];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = loadMarginVersion;
//loads available frames
loadFramePack();