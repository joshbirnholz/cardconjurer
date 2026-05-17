if (!loadedVersions.includes('seventhTextless/version')) {
	loadedVersions.push('seventhTextless/version')
	loadMaskImages([['Pinline (seventh textless)', '/data/images/cardImages/seventhTextless/seventhTextlessMaskPinline.png'], ['Border (seventh)', '/data/images/cardImages/seventh/seventhMaskBorder.png']])
	// addToManaSymbolList('/data/images/cardImages/manaSymbols/old/', ["oldw.svg"])
	// notify('The Seventh Textless frame uses special mana symbols for 1-20, WUBRG, all hybrid mana symbols, and X. If you would like to use these, just add an "old" at the beginning of each symbol. For example, "2 g g" would become "old2 oldg oldg".', '#aaffaae0')
}

if (currentVersion != 'seventhTextless/version') {
	currentVersion = 'seventhTextless/version'

	artX = scaleX(174 / 1500)
	artY = scaleY(205 / 2100)
	artWidth = scaleX(1152 / 1500)
	artHeight = scaleY(1632 / 2100)

	manaCostXPath = '1306 - 83 * manaSymbolIndex'
	manaCostYPath = '95'
	manaCostDiameter = '72'
	manaCostShadowOffset = '[0, 0]'
	manaCostDirection = 'reverse'

	setSymbolX = [scaleX(1337/1500), 'right']
	setSymbolY = [scaleY(1937/2100), 'center']
	setSymbolWidth = scaleX(180/1500)
	setSymbolHeight = scaleY(80/2100)

	watermarkX = scaleX(0.5)
	watermarkY = scaleY(1630/2100)
	watermarkWidth = scaleX(1140/1500)
	watermarkHeight = scaleY(484/2100)

	bottomInfoFunction = 'bottomInfoSeventhTextless'

	loadTextOptions([
	new cardText('Card Title', '', 165/1500, 158/2100, 1170/1500, 85/2100, 'goudymedieval', 85/2100, 'white', ['oneLine=true','shadow=' + scaleY(5/2100)]),
	new cardText('Power/Toughness', '', 1190/1500, 1969/2100, 230/1500, 78/2100, 'mplantin', 95/2100, 'white', ['oneLine=true,textAlign="center"','shadow=' + scaleY(2/2100)])
	])
}

loadFramePackOptions([['regular', 'Regular']])

function bottomInfoSeventhTextless() {
	bottomInfoContext.clearRect(0, 0, cardWidth, cardHeight)
	writeText(
		[
			{text: '{center}Illus: ' + document.getElementById('inputInfoArtist').value, x: 92/1500, y: 1919/2100, width: 1316/1500, height: 59/2100, font: 'mplantin', fontSize: 59/2100, fontColor: 'white', otherParameters: ['oneLine=true','shadow=' + scaleY(4/2100)]},
		], bottomInfoContext)
}