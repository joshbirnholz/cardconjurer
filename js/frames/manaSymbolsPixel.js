//checks to see if it needs to run
if (!card.manaSymbols.includes('/js/frames/manaSymbolsPixel.js')) {
	card.manaSymbols.push('/js/frames/manaSymbolsPixel.js');
}
if (!mana.get('pixel')) {
	loadManaSymbols([
		'pixel/pixel1',
		'pixel/pixel2',
		'pixel/pixel3',
		'pixel/pixel4',
		'pixel/pixelb',
		'pixel/pixelc',
		'pixel/pixelg',
		'pixel/pixelr',
		'pixel/pixelt',
		'pixel/pixelu',
		'pixel/pixelw',
		'pixel/pixelx',
	]);
}
