//Create objects for common properties across available frames
var bounds = {x:329/2010, y:70/2814, width:1353/2010, height:64/2814};
//defines available frames
availableFrames = [
	{name:'White Inner Crown (Nyx)', src:'/img/frames/m15/innerCrowns/new/nyx/w.png', bounds:bounds},
	{name:'Blue Inner Crown (Nyx)', src:'/img/frames/m15/innerCrowns/new/nyx/u.png', bounds:bounds},
	{name:'Black Inner Crown (Nyx)', src:'/img/frames/m15/innerCrowns/new/nyx/b.png', bounds:bounds},
	{name:'Red Inner Crown (Nyx)', src:'/img/frames/m15/innerCrowns/new/nyx/r.png', bounds:bounds},
	{name:'Green Inner Crown (Nyx)', src:'/img/frames/m15/innerCrowns/new/nyx/g.png', bounds:bounds},
	{name:'Multicolored Inner Crown (Nyx)', src:'/img/frames/m15/innerCrowns/new/nyx/m.png', bounds:bounds},
	{name:'Artifact Inner Crown (Nyx)', src:'/img/frames/m15/innerCrowns/new/nyx/a.png', bounds:bounds},

	{name:'White Inner Crown (Nyx Universes Beyond)', src:'/img/frames/m15/innerCrowns/new/nyx/ew.png', bounds:bounds},
	{name:'Blue Inner Crown (Nyx Universes Beyond)', src:'/img/frames/m15/innerCrowns/new/nyx/eu.png', bounds:bounds},
	{name:'Black Inner Crown (Nyx Universes Beyond)', src:'/img/frames/m15/innerCrowns/new/nyx/eb.png', bounds:bounds},
	{name:'Red Inner Crown (Nyx Universes Beyond)', src:'/img/frames/m15/innerCrowns/new/nyx/er.png', bounds:bounds},
	{name:'Green Inner Crown (Nyx Universes Beyond)', src:'/img/frames/m15/innerCrowns/new/nyx/eg.png', bounds:bounds},
	{name:'Multicolored Inner Crown (Nyx Universes Beyond)', src:'/img/frames/m15/innerCrowns/new/nyx/em.png', bounds:bounds},
	{name:'Artifact Inner Crown (Nyx Universes Beyond)', src:'/img/frames/m15/innerCrowns/new/nyx/ea.png', bounds:bounds},

	{name:'White Inner Crown (Companion)', src:'/img/frames/m15/innerCrowns/new/companion/w.png', bounds:bounds},
	{name:'Blue Inner Crown (Companion)', src:'/img/frames/m15/innerCrowns/new/companion/u.png', bounds:bounds},
	{name:'Black Inner Crown (Companion)', src:'/img/frames/m15/innerCrowns/new/companion/b.png', bounds:bounds},
	{name:'Red Inner Crown (Companion)', src:'/img/frames/m15/innerCrowns/new/companion/r.png', bounds:bounds},
	{name:'Green Inner Crown (Companion)', src:'/img/frames/m15/innerCrowns/new/companion/g.png', bounds:bounds},
	{name:'Multicolored Inner Crown (Companion)', src:'/img/frames/m15/innerCrowns/new/companion/m.png', bounds:bounds},
	{name:'Artifact Inner Crown (Companion)', src:'/img/frames/m15/innerCrowns/new/companion/a.png', bounds:bounds}
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = true;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = null;
//loads available frames
loadFramePack();