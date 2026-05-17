if (!loadedVersions.includes('seventh/version')) {
	loadedVersions.push('seventh/version')
	loadMaskImages([['Border (seventh)', '/data/images/cardImages/seventh/seventhMaskBorder.png'], ['Pinline (seventh)', '/data/images/cardImages/seventh/seventhMaskPinline.png'], ['Rules (seventh)', '/data/images/cardImages/seventh/seventhMaskRules.png'], ['Frame (seventh)', '/data/images/cardImages/seventh/seventhMaskFrame.png']])
}

if (currentVersion != 'seventh/version') {
	currentVersion = 'seventh/version'

	artX = scaleX(177 / 1500)
	artY = scaleY(206 / 2100)
	artWidth = scaleX(1144 / 1500)
	artHeight = scaleY(934 / 2100)

	manaCostXPath = '1306 - 83 * manaSymbolIndex'
	manaCostYPath = '99'
	manaCostDiameter = '72'
	manaCostShadowOffset = '[0, 0]'
	manaCostDirection = 'reverse'

	setSymbolX = [scaleX(1337/1500), 'right']
	setSymbolY = [scaleY(1209/2100), 'center']
	setSymbolWidth = scaleX(180/1500)
	setSymbolHeight = scaleY(80/2100)

	watermarkX = scaleX(0.5)
	watermarkY = scaleY(1630/2100)
	watermarkWidth = scaleX(1140/1500)
	watermarkHeight = scaleY(484/2100)

	bottomInfoFunction = 'bottomInfoSeventh'

	loadTextOptions([
	new cardText('Card Title', '', 165/1500, 162/2100, 1170/1500, 84/2100, 'goudymedieval', 85/2100, 'white', ['oneLine=true','shadow=' + scaleY(4/2100)]),
	new cardText('Card Type', '', 165/1500, 1228/2100, 1170/1500, 66/2100, 'mplantin', 67/2100, 'white', ['oneLine=true','shadow=' + scaleY(4/2100)]),
	new cardText('Rules Text', '', 196/1500, 1327/2100, 1112/1500, 590/2100, 'mplantin', 73/2100, 'black'),
	new cardText('Power/Toughness', '', 1190/1500, 1969/2100, 230/1500, 78/2100, 'mplantin', 95/2100, 'white', ['oneLine=true,textAlign="center"','shadow=' + scaleY(2/2100)])
	])
}

loadFramePackOptions([['regular', 'Regular']])

function bottomInfoSeventh() {
	bottomInfoContext.clearRect(0, 0, cardWidth, cardHeight)
	writeText(
		[
			{text: '{center}Illus: ' + document.getElementById('inputInfoArtist').value, x: 92/1500, y: 1929/2100, width: 1316/1500, height: 59/2100, font: 'mplantin', fontSize: 59/2100, fontColor: 'white', otherParameters: ['oneLine=true','shadow=' + scaleY(4/2100)]},
		], bottomInfoContext)
}