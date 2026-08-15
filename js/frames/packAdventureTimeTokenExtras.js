//Create objects for common properties across available frames
var masks = [];
var crownBounds = {x:50/2010, y:30/2814, width:1909/2010, height:341/2814};
var titleBounds = {x:127/2010, y:140/2814, width:1757/2010, height:150/2814};
//defines available frames
availableFrames = [
	{name:'White Legend Crown', src:'/img/frames/adventuretime/token/crown/w.png', bounds:crownBounds, complementary: 'Legend Crown Bottom Cutout'},
	{name:'Blue Legend Crown', src:'/img/frames/adventuretime/token/crown/u.png', bounds:crownBounds, complementary: 'Legend Crown Bottom Cutout'},
	{name:'Black Legend Crown', src:'/img/frames/adventuretime/token/crown/b.png', bounds:crownBounds, complementary: 'Legend Crown Bottom Cutout'},
	{name:'Red Legend Crown', src:'/img/frames/adventuretime/token/crown/r.png', bounds:crownBounds, complementary: 'Legend Crown Bottom Cutout'},
	{name:'Green Legend Crown', src:'/img/frames/adventuretime/token/crown/g.png', bounds:crownBounds, complementary: 'Legend Crown Bottom Cutout'},
	{name:'Multicolored Legend Crown', src:'/img/frames/adventuretime/token/crown/m.png', bounds:crownBounds, complementary: 'Legend Crown Bottom Cutout'},
	{name:'Artifact Legend Crown', src:'/img/frames/adventuretime/token/crown/a.png', bounds:crownBounds, complementary: 'Legend Crown Bottom Cutout'},
	{name:'Land Legend Crown', src:'/img/frames/adventuretime/token/crown/l.png', bounds:crownBounds, complementary: 'Legend Crown Bottom Cutout'},
	{name:'Colorless Legend Crown', src:'/img/frames/adventuretime/token/crown/c.png', bounds:crownBounds, complementary: 'Legend Crown Bottom Cutout'},

	{name:'White Enchantment Title', src:'/img/frames/adventuretime/token/enchantment/w.png', bounds:titleBounds},
	{name:'Blue Enchantment Title', src:'/img/frames/adventuretime/token/enchantment/u.png', bounds:titleBounds},
	{name:'Black Enchantment Title', src:'/img/frames/adventuretime/token/enchantment/b.png', bounds:titleBounds},
	{name:'Red Enchantment Title', src:'/img/frames/adventuretime/token/enchantment/r.png', bounds:titleBounds},
	{name:'Green Enchantment Title', src:'/img/frames/adventuretime/token/enchantment/g.png', bounds:titleBounds},
	{name:'Multicolored Enchantment Title', src:'/img/frames/adventuretime/token/enchantment/m.png', bounds:titleBounds},
	{name:'Artifact Enchantment Title', src:'/img/frames/adventuretime/token/enchantment/a.png', bounds:titleBounds},
	{name:'Colorless Enchantment Title', src:'/img/frames/adventuretime/token/enchantment/c.png', bounds:titleBounds},

	{name:'Legend Crown Bottom Cutout', src:'/img/black.png', bounds: {x:146/2010, y:304/2814, width:1708/2010, height:50/2814}, erase:true},
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = true;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = null;
//loads available frames
loadFramePack();