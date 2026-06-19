//Create objects for common properties across available frames
var masks = [{src:'/img/frames/m15/regular/m15MaskPinline.png', name:'Pinline'}, {src:'/img/frames/m15/regular/m15MaskTitle.png', name:'Title'}, {src:'/img/frames/m15/regular/m15MaskType.png', name:'Type'}, {src:'/img/frames/m15/regular/m15MaskRules.png', name:'Rules'}, {src:'/img/frames/m15/regular/m15MaskFrame.png', name:'Frame'}, {src:'/img/frames/m15/nyx/verticalMask.svg', name:'Frame - Top 2/3'}, {src:'/img/frames/m15/regular/m15MaskBorder.png', name:'Border'}];
var bounds = {x:0.164, y:0.0239, width:0.672, height:0.0239};
//defines available frames
availableFrames = [
	{name:'White Frame', src:'/img/frames/m15/nyx/m15FrameWNyx.png', masks:masks},
	{name:'Blue Frame', src:'/img/frames/m15/nyx/m15FrameUNyx.png', masks:masks},
	{name:'Black Frame', src:'/img/frames/m15/nyx/m15FrameBNyx.png', masks:masks},
	{name:'Red Frame', src:'/img/frames/m15/nyx/m15FrameRNyx.png', masks:masks},
	{name:'Green Frame', src:'/img/frames/m15/nyx/m15FrameGNyx.png', masks:masks},
	{name:'Multicolored Frame', src:'/img/frames/m15/nyx/m15FrameMNyx.png', masks:masks},
	{name:'Artifact Frame', src:'/img/frames/m15/nyx/m15FrameANyx.png', masks:masks},
	{name:'Colorless Frame', src:'/img/frames/m15/nyx/m15FrameCNyx.png', masks:masks},
	{name:'White Inner Crown (Nyx)', src:'/img/frames/m15/innerCrowns/m15InnerCrownWNyx.png', bounds:bounds},
	{name:'Blue Inner Crown (Nyx)', src:'/img/frames/m15/innerCrowns/m15InnerCrownUNyx.png', bounds:bounds},
	{name:'Black Inner Crown (Nyx)', src:'/img/frames/m15/innerCrowns/m15InnerCrownBNyx.png', bounds:bounds},
	{name:'Red Inner Crown (Nyx)', src:'/img/frames/m15/innerCrowns/m15InnerCrownRNyx.png', bounds:bounds},
	{name:'Green Inner Crown (Nyx)', src:'/img/frames/m15/innerCrowns/m15InnerCrownGNyx.png', bounds:bounds},
	{name:'Multicolored Inner Crown (Nyx)', src:'/img/frames/m15/innerCrowns/m15InnerCrownMNyx.png', bounds:bounds},
	{name:'Artifact Inner Crown (Nyx)', src:'/img/frames/m15/innerCrowns/m15InnerCrownANyx.png', bounds:bounds},
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = true;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = null;
//loads available frames
loadFramePack();