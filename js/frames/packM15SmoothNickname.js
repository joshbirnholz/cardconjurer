//Create objects for common properties across available frames
var masks3 = [{src:'img/frames/m15/nickname/smooth/masks/maskcrown.png', name:'Crown'}, {src:'/img/frames/m15/nickname/smooth/masks/maskTitle.png', name:'Title'}, {src:'/img/frames/m15/nickname/smooth/masks/maskTrueName.png', name:'True Title'}];
var bounds3 = {x:0, y:0, width:1, height:1};
//defines available frames
availableFrames = [
    
	{name:'White Nickname', src:'/img/frames/m15/nickname/smooth/w.png', masks:masks3, bounds:bounds3, complementary:22},
	{name:'Blue Nickname', src:'/img/frames/m15/nickname/smooth/u.png', masks:masks3, bounds:bounds3, complementary:22},
	{name:'Black Nickname', src:'/img/frames/m15/nickname/smooth/b.png', masks:masks3, bounds:bounds3, complementary:22},
	{name:'Red Nickname', src:'/img/frames/m15/nickname/smooth/r.png', masks:masks3, bounds:bounds3, complementary:22},
	{name:'Green Nickname', src:'/img/frames/m15/nickname/smooth/g.png', masks:masks3, bounds:bounds3, complementary:22},
	{name:'Multicolored Nickname', src:'/img/frames/m15/nickname/smooth/m.png', masks:masks3, bounds:bounds3, complementary:22},
	{name:'Artifact Nickname', src:'/img/frames/m15/nickname/smooth/a.png', masks:masks3, bounds:bounds3, complementary:22},
	{name:'Colorless Nickname', src:'/img/frames/m15/nickname/smooth/c.png', masks:masks3, bounds:bounds3, complementary:22},
	{name:'Land Nickname', src:'/img/frames/m15/nickname/smooth/L.png', masks:masks3, bounds:bounds3, complementary:22},
    {name:'Purple (Black Alt) Nickname', src:'/img/frames/m15/nickname/smooth/bAlt.png', masks:masks3, bounds:bounds3, complementary:22},
    {name:'Purple (Black Alt Light) Nickname', src:'/img/frames/m15/nickname/smooth/bAltLight.png', masks:masks3, bounds:bounds3, complementary:22},

	{name:'White Nickname', src:'/img/frames/m15/nickname/smooth/colortitle/w.png', masks:masks3, bounds:bounds3, complementary:22},
	{name:'Blue Nickname', src:'/img/frames/m15/nickname/smooth/colortitle/u.png', masks:masks3, bounds:bounds3, complementary:22},
	{name:'Black Nickname', src:'/img/frames/m15/nickname/smooth/colortitle/b.png', masks:masks3, bounds:bounds3, complementary:22},
	{name:'Red Nickname', src:'/img/frames/m15/nickname/smooth/colortitle/r.png', masks:masks3, bounds:bounds3, complementary:22},
	{name:'Green Nickname', src:'/img/frames/m15/nickname/smooth/colortitle/g.png', masks:masks3, bounds:bounds3, complementary:22},
	{name:'Multicolored Nickname', src:'/img/frames/m15/nickname/smooth/colortitle/m.png', masks:masks3, bounds:bounds3, complementary:22},
	{name:'Artifact Nickname', src:'/img/frames/m15/nickname/smooth/colortitle/a.png', masks:masks3, bounds:bounds3, complementary:22},
	{name:'Colorless Nickname', src:'/img/frames/m15/nickname/smooth/colortitle/c.png', masks:masks3, bounds:bounds3, complementary:22},
	{name:'Land Nickname', src:'/img/frames/m15/nickname/smooth/colortitle/L.png', masks:masks3, bounds:bounds3, complementary:22},
    {name:'Purple (Black Alt) Nickname', src:'/img/frames/m15/nickname/smooth/colortitle/bAlt.png', masks:masks3, bounds:bounds3, complementary:22},
    {name:'Purple (Black Alt Light) Nickname', src:'/img/frames/m15/nickname/smooth/colortitle/bAltLight.png', masks:masks3, bounds:bounds3, complementary:22},

    {name:'Legend Crown Border Cover (Auto Erase Title Under Crown)', src:'/img/black.png', bounds:{x:0.0394, y:0.0277, width:0.9214, height:0.0177}, erase:true,  complementary:23},
    {name:'Legend Crown Lower Cutout (Auto Erase Title Under Crown)' , src:'/img/black.png', bounds:{x:0.0734, y:0.1096, width:0.8532, height:0.0143}, erase:true},
    {name:'Legend Crown Border Cover', src:'/img/black.png', bounds:{x:0.0394, y:0.0277, width:0.9214, height:0.0177}},
    {name:'Legend Crown Lower Cutout' , src:'/img/black.png', bounds:{x:0.0734, y:0.1096, width:0.8532, height:0.0143}},

	];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = true;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = null;
//loads available frames
loadFramePack();
addTextbox("Nickname");