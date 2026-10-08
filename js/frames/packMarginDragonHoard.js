//Create objects for common properties across available frames
var bounds = {x:-88/2010, y:-80/2817, width:2187/2010, height:2978/2817};
var ogBounds = {x:0, y:0, width:1, height:1};
//defines available frames
availableFrames = [
	{name:'White Extension', src:'/img/frames/dragonHoard/margin/w.png', bounds:bounds, ogBounds:ogBounds},
	{name:'Blue Extension', src:'/img/frames/dragonHoard/margin/u.png', bounds:bounds, ogBounds:ogBounds},
	{name:'Black Extension', src:'/img/frames/dragonHoard/margin/b.png', bounds:bounds, ogBounds:ogBounds},
	{name:'Red Extension', src:'/img/frames/dragonHoard/margin/r.png', bounds:bounds, ogBounds:ogBounds},
	{name:'Green Extension', src:'/img/frames/dragonHoard/margin/g.png', bounds:bounds, ogBounds:ogBounds},
	{name:'Multicolored Extension', src:'/img/frames/dragonHoard/margin/m.png', bounds:bounds, ogBounds:ogBounds},
	{name:'Artifact Extension', src:'/img/frames/dragonHoard/margin/a.png', bounds:bounds, ogBounds:ogBounds},
	{name:'Land Extension', src:'/img/frames/dragonHoard/margin/L.png', bounds:bounds, ogBounds:ogBounds}
];
notify('If you use a legend crown, make sure to put the margin layer under the crowns layer.', 10)
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = loadMarginVersion;
//loads available frames
loadFramePack();