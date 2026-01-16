//Create objects for common properties across available frames
//var masks = [{src:'/img/frames/modal/transformAddon/mask.png', name:'Transform Addon'}];
var bounds = {x:1810/2010, y:2290/2814, width:136/2010, height:250/2814};
var bounds2 = {x:0, y:0, width:1, height:1};
//defines available frames
availableFrames = [
	{name:'White Transform Arrow', src:'/img/frames/modal/transformAddon/borderless/w.png', bounds:bounds, complementary:8},
	{name:'Blue Transform Arrow', src:'/img/frames/modal/transformAddon/borderless/u.png', bounds:bounds, complementary:8},
	{name:'Black Transform Arrow', src:'/img/frames/modal/transformAddon/borderless/b.png', bounds:bounds, complementary:8},
	{name:'Red Transform Arrow', src:'/img/frames/modal/transformAddon/borderless/r.png', bounds:bounds, complementary:8},
	{name:'Green Transform Arrow', src:'/img/frames/modal/transformAddon/borderless/g.png', bounds:bounds, complementary:8},
	{name:'Multicolored Transform Arrow', src:'/img/frames/modal/transformAddon/borderless/m.png', bounds:bounds, complementary:8},
	{name:'Artifact Transform Arrow', src:'/img/frames/modal/transformAddon/borderless/a.png', bounds:bounds, complementary:8},
    {name:'Land Transform Arrow', src:'/img/frames/modal/transformAddon/borderless/L.png', bounds:bounds, complementary:8},
    {name:'Transform Text Box Cover', src:'/img/frames/modal/transformAddon/borderless/masks/maskEraseTextBox.png', bounds:bounds2, erase:true}
	
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = true;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = null;
//loads available frames
loadFramePack();