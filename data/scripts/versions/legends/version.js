if (!loadedVersions.includes('legends/version')) {
	loadedVersions.push('legends/version')
	addToManaSymbolList('/data/images/cardImages/manaSymbols/old/', ["oldw.svg", "oldu.svg", "oldb.svg", "oldr.svg", "oldg.svg"])
	notify('The Legends frame uses special mana symbols for WUBRG. If you would like to use these, just add an "old" at the beginning of each symbol. For example, "2 g g" would become "2 oldg oldg".', '#aaffaae0')
}

if (currentVersion != 'legends/version') {
	currentVersion = 'legends/version'

	artX = scaleX(162 / 1500)
	artY = scaleY(194 / 2100)
	artWidth = scaleX(1176 / 1500)
	artHeight = scaleY(950 / 2100)

	manaCostXPath = '1306 - 83 * manaSymbolIndex'
	manaCostYPath = '88'
	manaCostDiameter = '72'
	manaCostShadowOffset = '[0, 0]'
	manaCostDirection = 'reverse'

	setSymbolX = [scaleX(1378/1500), 'right']
	setSymbolY = [scaleY(1216/2100), 'center']
	setSymbolWidth = scaleX(162/1500)
	setSymbolHeight = scaleY(72/2100)

	watermarkX = scaleX(0.5)
	watermarkY = scaleY(1630/2100)
	watermarkWidth = scaleX(1140/1500)
	watermarkHeight = scaleY(484/2100)

	bottomInfoFunction = 'bottomInfoLegends'

	loadTextOptions([
	new cardText('Card Title', '', 124/1500, 150/2100, 1252/1500, 89/2100, 'goudymedieval', 89/2100, '#eee', ['oneLine=true','shadow=' + scaleY(3/2100)]),
	new cardText('Card Type', '', 154/1500, 1231/2100, 1192/1500, 69/2100, 'mplantin', 69/2100, '#eee', ['oneLine=true','shadow=' + scaleY(3/2100)]),
	new cardText('Rules Text', '', 196/1500, 1327/2100, 1108/1500, 590/2100, 'mplantin', 73/2100, 'black'),
	new cardText('Power/Toughness', '', 1212/1500, 1980/2100, 230/1500, 70/2100, 'mplantin', 87/2100, '#eee', ['oneLine=true,textAlign="center"','shadow=' + scaleY(3/2100)])
	])
}

loadFramePackOptions([['regular', 'Regular']])

function bottomInfoLegends() {
	bottomInfoContext.clearRect(0, 0, cardWidth, cardHeight)
	writeText(
		[
			{text: 'Illus: ' + document.getElementById('inputInfoArtist').value, x: 150/1500, y: 1932/2100, width: 1200/1500, height: 60/2100, font: 'mplantin', fontSize: 60/2100, fontColor: '#eee', otherParameters: ['oneLine=true','shadow=' + scaleY(3/2100)]},
		], bottomInfoContext)
}