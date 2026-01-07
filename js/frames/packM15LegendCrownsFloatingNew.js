//Create objects for common properties across available frames
var bounds = {x:59/2010, y:55/2814, width:1901/2010, height:305/2814};
//defines available frames
availableFrames = [
	{name:'White Legend Crown', src:'/img/frames/m15/crowns/new/floating/w.png', bounds:bounds, complementary:'Legend Crown Border Cover'},
	{name:'Blue Legend Crown', src:'/img/frames/m15/crowns/new/floating/u.png', bounds:bounds, complementary:'Legend Crown Border Cover'},
	{name:'Black Legend Crown', src:'/img/frames/m15/crowns/new/floating/b.png', bounds:bounds, complementary:'Legend Crown Border Cover'},
	{name:'Red Legend Crown', src:'/img/frames/m15/crowns/new/floating/r.png', bounds:bounds, complementary:'Legend Crown Border Cover'},
	{name:'Green Legend Crown', src:'/img/frames/m15/crowns/new/floating/g.png', bounds:bounds, complementary:'Legend Crown Border Cover'},
	{name:'Multicolored Legend Crown', src:'/img/frames/m15/crowns/new/floating/m.png', bounds:bounds, complementary:'Legend Crown Border Cover'},
	{name:'Artifact Legend Crown', src:'/img/frames/m15/crowns/new/floating/a.png', bounds:bounds, complementary:'Legend Crown Border Cover'},
	{name:'Land Legend Crown', src:'/img/frames/m15/crowns/new/floating/l.png', bounds:bounds, complementary:'Legend Crown Border Cover'},
	{name:'Colorless Legend Crown', src:'/img/frames/m15/crowns/new/floating/c.png', bounds:bounds, complementary:'Legend Crown Border Cover'},
	{name:'Legend Crown Border Cover', src:'/img/frames/m15/crowns/new/floating/extendedArtFix.png', bounds:{x:78/2010, y:80/2814, width:1855/2010, height:235/2814}, complementary: 'Extended Art Fix Erase'},
	{name:'Extended Art Fix Erase', src:'/img/frames/m15/crowns/new/floating/extendedArtFixErase.png', bounds:{x:78/2010, y:80/2814, width:1855/2010, height:250/2814}, erase: true}
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = true;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = null;
//loads available frames
loadFramePack();