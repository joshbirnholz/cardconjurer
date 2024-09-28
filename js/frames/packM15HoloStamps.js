//Create objects for common properties across available frames
var bounds = {x:0.436, y:0.9034, width:0.128, height:0.0458};
//defines available frames
availableFrames = [
	{name:'White Holo Stamp', src:'/img/frames/m15/holoStamps/m15HoloStampW.png', bounds:bounds},
	{name:'Blue Holo Stamp', src:'/img/frames/m15/holoStamps/m15HoloStampU.png', bounds:bounds},
	{name:'Black Holo Stamp', src:'/img/frames/m15/holoStamps/m15HoloStampB.png', bounds:bounds},
	{name:'Red Holo Stamp', src:'/img/frames/m15/holoStamps/m15HoloStampR.png', bounds:bounds},
	{name:'Green Holo Stamp', src:'/img/frames/m15/holoStamps/m15HoloStampG.png', bounds:bounds},
	{name:'Multicolored Holo Stamp', src:'/img/frames/m15/holoStamps/m15HoloStampM.png', bounds:bounds},
	{name:'Artifact Holo Stamp', src:'/img/frames/m15/holoStamps/m15HoloStampA.png', bounds:bounds},
	{name:'Land Holo Stamp', src:'/img/frames/m15/holoStamps/m15HoloStampL.png', bounds:bounds},
	{name:'Colorless Holo Stamp', src:'/img/frames/m15/holoStamps/m15HoloStampC.png', bounds:bounds},
	{name:'Artifact (2) Holo Stamp', src:'/img/frames/m15/holoStamps/m15HoloStampA2.png', bounds:bounds},
	{name:'Artifact (3) Holo Stamp', src:'/img/frames/m15/holoStamps/m15HoloStampA3.png', bounds:bounds},
	{name:'Plain Holo Stamp', src:'/img/frames/m15/holoStamps/stamp.png', bounds:{x:0.4554, y:0.9172, width:0.0894, height:0.0320}},
	{name:'Gray Holo Stamp', src:'/img/frames/m15/holoStamps/gray.png', bounds:{x:0.4554, y:0.9172, width:0.0894, height:0.0320}},
	{name:'Acorn Holo Stamp', src:'/img/frames/m15/holoStamps/acorn.png', bounds:{x:0.4554, y:0.9129, width:0.0894, height:0.0381}},
	{name:'Alchemy Holo Stamp', src:'/img/frames/m15/holoStamps/alchemy.png', bounds:{x:0.4554, y:0.9172, width:0.0894, height:0.0320}},
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = true;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = null;
//loads available frames
loadFramePack();