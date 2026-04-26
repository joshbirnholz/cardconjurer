loadFramePacks([
	{name:'Generic Margins', value:'Margin-1'},
	{name:'Japan Showcase Margins', value:'MarginJapanShowcase'},
	{name:'Legends of Ixalan Margins', value:'MarginIxalanLegends'},
	{name:'Memory Corridor Margins', value:'MarginMemoryCorridor'},
	{name:'Breaking News Margin', value:'MarginBreakingNews'},
	{name:'Vault Margins', value:'MarginVault'},
	{name:'Wanted Poster Margins', value:'MarginWanted'},
	{name:'Enchanting Tales Margins', value:'MarginEnchantingTales'},
	{name:'LTR Ring Margins', value:'MarginRing'},
	{name:'D&D Module Margins', value:'MarginDNDModule'},
	{name:'Mystical Archive Margins', value:'MarginMysticalArchive'},
	{name:'Unfinity Basics Margins', value:'MarginUnfinity'},
	{name:'Unstable Basics Margins', value:'MarginUnstable'},
	{name:'Invocation Margins', value:'MarginInvocation'},
	{name:'Accurate Frame Margins', value:'MarginNew'},
	{name:'Custom Margins', value:'disabled'},
	{name:'Celid\'s Asap Margins', value:'CustomMarginCelidAsap'}
])

//For multiple Margin packs
var loadMarginVersion = async () => {
	//resets things so that every frame doesn't have to
	await resetCardIrregularities({canvas:[getStandardWidth(), getStandardHeight(), 0.044, 1/35], resetOthers:false});
	//sets card version
	// card.version = 'margin';
	card.margins = true;
	//art stuff
	var changedArtBounds = false;
	if (card.artBounds.width == 1) {
		card.artBounds.width += 0.044;
		changedArtBounds = true;
	}
	if (card.artBounds.x == 0) {
		card.artBounds.x = -0.044;
		card.artBounds.width += 0.044;
		changedArtBounds = true;
	}
	if (card.artBounds.height == 1) {
		card.artBounds.height += 1/35;
		changedArtBounds = true;
	}
	if (card.artBounds.y == 0) {
		card.artBounds.y = -1/35;
		card.artBounds.height += 1/35;
		changedArtBounds = true;
	}
	if (changedArtBounds) {
		autoFitArt();
	}
	//runs anything that needs to run
	if (card.version.includes('planeswalker')) {
		planeswalkerEdited();
	}
	if (card.version.includes('saga')) {
		sagaEdited();
	}
	if (card.version.includes('class') && !card.version.includes('classicshifted')) {
		classEdited();
	}
	drawTextBuffer();
	drawFrames();
	bottomInfoEdited();
	watermarkEdited();
	drawNewGuidelines();
}
