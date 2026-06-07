//Create objects for common properties across available frames
var masks = [];
var bounds = {x:-177/4020, y:-161/5628, width:2187/2010, height:2975/2814};
registerMarginConfig('AdventureTime', -bounds.x, -bounds.y);
var ogBounds = {x:0, y:0, width:1, height:1};
//defines available frames
availableFrames = [
	{name:'White Extension', src:'/img/frames/adventureTime/margins/regular/w.png', bounds:bounds, ogBounds:ogBounds, masks:masks},
	{name:'Blue Extension', src:'/img/frames/adventureTime/margins/regular/u.png', bounds:bounds, ogBounds:ogBounds, masks:masks},
	{name:'Black Extension', src:'/img/frames/adventureTime/margins/regular/b.png', bounds:bounds, ogBounds:ogBounds, masks:masks},
	{name:'Red Extension', src:'/img/frames/adventureTime/margins/regular/r.png', bounds:bounds, ogBounds:ogBounds, masks:masks},
	{name:'Green Extension', src:'/img/frames/adventureTime/margins/regular/g.png', bounds:bounds, ogBounds:ogBounds, masks:masks},
	{name:'Multicolored Extension', src:'/img/frames/adventureTime/margins/regular/m.png', bounds:bounds, ogBounds:ogBounds, masks:masks},
	{name:'Artifact Extension', src:'/img/frames/adventureTime/margins/regular/a.png', bounds:bounds, ogBounds:ogBounds, masks:masks},
	{name:'Land Extension', src:'/img/frames/adventureTime/margins/regular/l.png', bounds:bounds, ogBounds:ogBounds, masks:masks},
	{name:'Colorless Extension', src:'/img/frames/adventureTime/margins/regular/c.png', bounds:bounds, ogBounds:ogBounds, masks:masks},
	{name:'Vehicle Extension', src:'/img/frames/adventureTime/margins/regular/v.png', bounds:bounds, ogBounds:ogBounds, masks:masks},

	{name:'White Enchantment Extension', src:'/img/frames/adventureTime/margins/enchantment/w.png', bounds:bounds, ogBounds:ogBounds, masks:masks},
	{name:'Blue Enchantment Extension', src:'/img/frames/adventureTime/margins/enchantment/u.png', bounds:bounds, ogBounds:ogBounds, masks:masks},
	{name:'Black Enchantment Extension', src:'/img/frames/adventureTime/margins/enchantment/b.png', bounds:bounds, ogBounds:ogBounds, masks:masks},
	{name:'Red Enchantment Extension', src:'/img/frames/adventureTime/margins/enchantment/r.png', bounds:bounds, ogBounds:ogBounds, masks:masks},
	{name:'Green Enchantment Extension', src:'/img/frames/adventureTime/margins/enchantment/g.png', bounds:bounds, ogBounds:ogBounds, masks:masks},
	{name:'Multicolored Enchantment Extension', src:'/img/frames/adventureTime/margins/enchantment/m.png', bounds:bounds, ogBounds:ogBounds, masks:masks},
	{name:'Artifact Enchantment Extension', src:'/img/frames/adventureTime/margins/enchantment/a.png', bounds:bounds, ogBounds:ogBounds, masks:masks},
	{name:'Land Enchantment Extension', src:'/img/frames/adventureTime/margins/enchantment/l.png', bounds:bounds, ogBounds:ogBounds, masks:masks},
	{name:'Colorless Enchantment Extension', src:'/img/frames/adventureTime/margins/enchantment/c.png', bounds:bounds, ogBounds:ogBounds, masks:masks},
	{name:'Vehicle Enchantment Extension', src:'/img/frames/adventureTime/margins/enchantment/v.png', bounds:bounds, ogBounds:ogBounds, masks:masks},

	{name:'White Snow Extension', src:'/img/frames/adventureTime/margins/snow/w.png', bounds:bounds, ogBounds:ogBounds, masks:masks},
	{name:'Blue Snow Extension', src:'/img/frames/adventureTime/margins/snow/u.png', bounds:bounds, ogBounds:ogBounds, masks:masks},
	{name:'Black Snow Extension', src:'/img/frames/adventureTime/margins/snow/b.png', bounds:bounds, ogBounds:ogBounds, masks:masks},
	{name:'Red Snow Extension', src:'/img/frames/adventureTime/margins/snow/r.png', bounds:bounds, ogBounds:ogBounds, masks:masks},
	{name:'Green Snow Extension', src:'/img/frames/adventureTime/margins/snow/g.png', bounds:bounds, ogBounds:ogBounds, masks:masks},
	{name:'Multicolored Snow Extension', src:'/img/frames/adventureTime/margins/snow/m.png', bounds:bounds, ogBounds:ogBounds, masks:masks},
	{name:'Artifact Snow Extension', src:'/img/frames/adventureTime/margins/snow/a.png', bounds:bounds, ogBounds:ogBounds, masks:masks},
	{name:'Land Snow Extension', src:'/img/frames/adventureTime/margins/snow/l.png', bounds:bounds, ogBounds:ogBounds, masks:masks},
	{name:'Colorless Snow Extension', src:'/img/frames/adventureTime/margins/snow/c.png', bounds:bounds, ogBounds:ogBounds, masks:masks},
	{name:'Vehicle Snow Extension', src:'/img/frames/adventureTime/margins/snow/v.png', bounds:bounds, ogBounds:ogBounds, masks:masks},

];
if (typeof loadMarginVersion === 'function') {
	//disables/enables the "Load Frame Version" button
	document.querySelector('#loadFrameVersion').disabled = false;
	//defines process for loading this version, if applicable
	document.querySelector('#loadFrameVersion').onclick = async function() {
		loadMarginVersion();
		await resetCardIrregularities({canvas:[getStandardWidth(), getStandardHeight(), -bounds.x, -bounds.y], resetOthers:false});
		drawTextBuffer();
		drawFrames();
		bottomInfoEdited();
		watermarkEdited();
		drawNewGuidelines();
	};
	//loads available frames
	loadFramePack();
}