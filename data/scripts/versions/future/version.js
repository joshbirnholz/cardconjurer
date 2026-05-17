if (!loadedVersions.includes('future/version')) {
	loadedVersions.push('future/version')
	loadMaskImages([['Border (future)', '/data/images/cardImages/future/futureMaskBorder.png'], ['Artifact Icon (future)', '/data/images/cardImages/future/futureMaskArtifact.png'], ['Creature Icon (future)', '/data/images/cardImages/future/futureMaskCreature.png'], ['Enchantment Icon (future)', '/data/images/cardImages/future/futureMaskEnchantment.png'], ['Instant Icon (future)', '/data/images/cardImages/future/futureMaskInstant.png'], ['Land Icon (future)', '/data/images/cardImages/future/futureMaskLand.png'], ['Multitype Icon (future)', '/data/images/cardImages/future/futureMaskMulti.png'], ['Sorcery Icon (future)', '/data/images/cardImages/future/futureMaskSorcery.png']])
	addToManaSymbolList('/data/images/cardImages/manaSymbols/future/', ["f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "f10", "f11", "f12", "f13", "f14", "f15", "f16", "f17", "f18", "f19", "f20", "fw", "fu", "fb", "fr", "fg", "fwu", "fwb", "fub", "fur", "fbr", "fbg", "frg", "frw", "fgw", "fgu", "fx"])
	notify('The Future Shifted frame uses special mana symbols for 1-20, WUBRG, all hybrid mana symbols, and X. If you would like to use these, just add an "f" at the beginning of each symbol. For example, "2 g g" would become "f2 fg fg".', '#aaffaae0')
}

if (currentVersion != 'future/version') {
	currentVersion = 'future/version'

	artX = scaleX(129 / 1500)
	artY = scaleY(177 / 2100)
	artWidth = scaleX(1307 / 1500)
	artHeight = scaleY(1229 / 2100)

	manaCostXPath = '[scaleX(91/744), scaleX(61/744), scaleX(46/744), scaleX(46/744), scaleX(59/744), scaleX(106/744)][manaSymbolIndex]'
	manaCostYPath = '[scaleY(140/1039), scaleY(207/1039), scaleY(281/1039), scaleY(356/1039), scaleY(437/1039), scaleY(512/1039)][manaSymbolIndex]'
	manaCostDiameter = 'scaleX(59/744)'
	manaCostShadowOffset = '[0, 0]'
	manaCostDirection = 'forward'

	setSymbolX = [scaleX(1367/1500), 'center']
	setSymbolY = [scaleY(1249/2100), 'center']
	setSymbolWidth = scaleX(80/1500)
	setSymbolHeight = scaleY(80/2100)

	watermarkX = scaleX(0.5)
	watermarkY = scaleY(1593/2100)
	watermarkWidth = scaleX(1140/1500)
	watermarkHeight = scaleY(484/2100)

	bottomInfoFunction = 'bottomInfoFuture'

	loadTextOptions([
	new cardText('Card Title', '', 264/1500, 195/2100, 1248/1500, 91/2100, 'matrixb', 91/2100, 'white', ['oneLine=true']),
	new cardText('Card Type', '', 182/1500, 1261/2100, 1248/1500, 75/2100, 'matrixb', 75/2100, 'white', ['oneLine=true']),
	new cardText('Rules Text', '', 154/1500, 1313/2100, 1211/1500, 670/2100, 'mplantin', 73/2100, 'black'),
	new cardText('Power/Toughness', '', 1160/1500, 1960/2100, 210/1500, 83/2100, 'mplantin', 83/2100, 'white', ['oneLine=true,textAlign="center"'])
	])
}

loadFramePackOptions([['regular', 'Regular']])

function bottomInfoFuture() {
	bottomInfoContext.clearRect(0, 0, cardWidth, cardHeight)
	var ptBoxShift = 0
	var copyrightFillColor = 'white'
	for (var i = 0; i < cardTextList.length; i++) {
		if (cardTextList[i].name == 'Power/Toughness' && cardTextList[i].text != '') {
			ptBoxShift = -1/6
		}
	}
	var cardMasterChildren = cardMaster.children
	for (var i = cardMasterChildren.length - 1; i >= 0; i--) {
		var uniqueNumber = parseInt(cardMasterChildren[i].id.replace('uniqueNumber', ''))
		for (var n = 0; n < cardMasterList.length; n++) {
			if (cardMasterList[n].uniqueNumber == uniqueNumber) {
				if (cardMasterList[n].name.includes('White Frame') || cardMasterList[n].name.includes('Artifact Frame') || cardMasterList[n].name.includes('Colorless Frame')) {
					copyrightFillColor = 'black'
				}
			}
		}
	}
	writeText(
		[
			{text: '{right}{oldartistbrush}' + document.getElementById('inputInfoArtist').value, x: 141/1500, y: 1938/2100, width: 1216/1500 + ptBoxShift, height: 52/2100, font: 'matrixb', fontSize: 52/2100, fontColor: copyrightFillColor, otherParameters: ['oneLine=true']}
		], bottomInfoContext)
}