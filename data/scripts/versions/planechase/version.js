if (!loadedVersions.includes('planechase/version')) {
	loadedVersions.push('planechase/version')
	notify('For the small Chaos symbol on Planar cards use "{chaos}", and for the large Chaos symbol use "{planechase}".', '#aaffaae0')
}

if (currentVersion != 'planechase/version') {
	currentVersion = 'planechase/version'

	previewContext.translate(0, cardHeight / 2)
	previewContext.rotate(-Math.PI / 2)
	cardWidth *= 7/5
	cardHeight *= 5/7
	resizeCanvases(cardWidth, cardHeight)

	artX = scaleX(65 / 2100)
	artY = scaleY(65 / 1500)
	artWidth = scaleX(1970 / 2100)
	artHeight = scaleY(1372 / 1500)

	manaCostXPath = '0'
	manaCostYPath = '0'
	manaCostDiameter = '0'
	manaCostShadowOffset = 'none'
	manaCostDirection = 'none'

	setSymbolX = [scaleX(1631/2100), 'right']
	setSymbolY = [scaleY(1042/1500), 'center']
	setSymbolWidth = scaleX(96/2100)
	setSymbolHeight = scaleY(48/1500)

	watermarkX = cardWidth * 2
	watermarkY = cardHeight * 2
	watermarkWidth = 1
	watermarkHeight = 1

	bottomInfoFunction = 'bottomInfoPlanechase'

	loadTextOptions([
	new cardText('Card Title', '', 150/2100, 150/1500, 1800/2100, 67/1500, 'belerenb', 67/1500, 'black', ['oneLine=true','textAlign="center"']),
	new cardText('Card Type', '', 450/2100, 1056/1500, 1200/2100, 52/1500, 'belerenb', 52/1500, 'black', ['oneLine=true','textAlign="center"']),
	new cardText('Rules Text', '', 242/2100, 1030/1500, 1616/2100, 500/1500, 'mplantin', 56/1500, 'black')
	])
}

loadFramePackOptions([['regular', 'Regular']])

function bottomInfoPlanechase() {
	bottomInfoContext.clearRect(0, 0, cardWidth, cardHeight)
	var ptBoxShift = 0
	for (var i = 0; i < cardTextList.length; i++) {
		if (cardTextList[i].name == 'Power/Toughness' && cardTextList[i].text != '') {
			ptBoxShift = 36/2100
		}
	}
	if (ptBoxShift == 0) {
		Array.from(cardMaster.children).forEach(element => {if (element.children[2].innerHTML.includes('Power/Toughness')) {ptBoxShift = 36/2100}})
	}
	writeText(
		[//{artistbrush}{fontbelerenbsc}' + document.getElementById('inputInfoArtist').value
			{text: '{center}' + document.getElementById('inputInfoNumber').value + ' ' + document.getElementById('inputInfoSet').value + '{star}' + document.getElementById('inputInfoLanguage').value, x: 670/2100, y: 2044/2100, width: 760/2100, height: 36/2100, font: 'gothammedium', fontSize: 36/2100, fontColor: 'white', otherParameters: ['oneLine=true', 'outline=true', 'outlineThickness=8']},
			{text: '{center}{artistbrush}{fontbelerenbsc}' + document.getElementById('inputInfoArtist').value, x: 670/2100, y: 2008/2100, width: 760/2100, height: 36/2100, font: 'belerenbsc', fontSize: 36/2100, fontColor: 'white', otherParameters: ['oneLine=true', 'outline=true', 'outlineThickness=8']},
		], bottomInfoContext)
}