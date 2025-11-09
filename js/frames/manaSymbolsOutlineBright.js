//checks to see if it needs to run
if (!card.manaSymbols.includes('/js/frames/manaSymbolsOutlineBright.js')) {
	card.manaSymbols.push('/js/frames/manaSymbolsOutlineBright.js');
}
if (!mana.get('outlineBright')) {
	loadManaSymbols([
		'outlineBright/outlineBrightw', 'outlineBright/outlineBrightu', 'outlineBright/outlineBrightb', 'outlineBright/outlineBrightr', 'outlineBright/outlineBrightg',
		'outlineBright/outlineBrightc', 'outlineBright/outlineBrights', 'outlineBright/outlineBrightx', 'outlineBright/outlineBright0', 'outlineBright/outlineBright1',
		'outlineBright/outlineBright2', 'outlineBright/outlineBright3', 'outlineBright/outlineBright4', 'outlineBright/outlineBright5', 'outlineBright/outlineBright6',
		'outlineBright/outlineBright7', 'outlineBright/outlineBright8', 'outlineBright/outlineBright9', 'outlineBright/outlineBrightt'
	]);
}