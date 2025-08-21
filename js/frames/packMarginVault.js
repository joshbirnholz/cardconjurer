//Create objects for common properties across available frames
var bounds = {x:-89/2010, y:-79/2817, width:2187/2010, height:2975/2817};
var ogBounds = {x:0, y:0, width:1, height:1};
//defines available frames
availableFrames = [
	{name:'White Extension', src:'/img/frames/vault/margin/w.png', bounds:bounds, ogBounds:ogBounds},
	{name:'Blue Extension', src:'/img/frames/vault/margin/u.png', bounds:bounds, ogBounds:ogBounds},
	{name:'Black Extension', src:'/img/frames/vault/margin/b.png', bounds:bounds, ogBounds:ogBounds},
	{name:'Red Extension', src:'/img/frames/vault/margin/r.png', bounds:bounds, ogBounds:ogBounds},
	{name:'Green Extension', src:'/img/frames/vault/margin/g.png', bounds:bounds, ogBounds:ogBounds},
	{name:'Multicolored Extension', src:'/img/frames/vault/margin/m.png', bounds:bounds, ogBounds:ogBounds},
	{name:'Artifact Extension', src:'/img/frames/vault/margin/a.png', bounds:bounds, ogBounds:ogBounds},
	{name:'Land Extension', src:'/img/frames/vault/margin/l.png', bounds:bounds, ogBounds:ogBounds},

	{name:'White Crown Extension', src:'/img/frames/vault/margin/crown/w.png', bounds:bounds, ogBounds:ogBounds},
	{name:'Blue Crown Extension', src:'/img/frames/vault/margin/crown/u.png', bounds:bounds, ogBounds:ogBounds},
	{name:'Black Crown Extension', src:'/img/frames/vault/margin/crown/b.png', bounds:bounds, ogBounds:ogBounds},
	{name:'Red Crown Extension', src:'/img/frames/vault/margin/crown/r.png', bounds:bounds, ogBounds:ogBounds},
	{name:'Green Crown Extension', src:'/img/frames/vault/margin/crown/g.png', bounds:bounds, ogBounds:ogBounds},
	{name:'Multicolored Crown Extension', src:'/img/frames/vault/margin/crown/m.png', bounds:bounds, ogBounds:ogBounds},
	{name:'Artifact Crown Extension', src:'/img/frames/vault/margin/crown/a.png', bounds:bounds, ogBounds:ogBounds},
	{name:'Land Crown Extension', src:'/img/frames/vault/margin/crown/l.png', bounds:bounds, ogBounds:ogBounds}
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = loadMarginVersion;
//loads available frames
loadFramePack();