if (!loadedVersions.includes('m15/version')) {
	loadedVersions.push('m15/version')
	loadMaskImages([['Full', '/data/images/cardImages/maskFull.png'], ['Border (m15)', '/data/images/cardImages/m15/m15MaskBorder.png'], ['Right Half', '/data/images/cardImages/maskRightHalf.png'], ['Middle Third', '/data/images/cardImages/maskMiddleThird.png'], ['Pinline (m15)', '/data/images/cardImages/m15/m15MaskPinline.png'], ['Title (m15)', '/data/images/cardImages/m15/m15MaskTitle.png'], ['Type (m15)', '/data/images/cardImages/m15/m15MaskType.png'], ['Rules (m15)', '/data/images/cardImages/m15/m15MaskRules.png'], ['Frame (m15)', '/data/images/cardImages/m15/m15MaskFrame.png'], ['Pinline Super (m15)', '/data/images/cardImages/m15/m15MaskPinlineSuper.png'], ['Legend Crown (m15)', '/data/images/cardImages/m15/m15MaskLegendCrown.png'], ['Legend Crown W/ Pinline (m15)', '/data/images/cardImages/m15/m15MaskLegendCrownPinline.png'], ['Alternative Border', '/data/images/cardImages/m15/m15MaskBorderSliver.png'], ['Alternative Border (Crown)', '/data/images/cardImages/m15/m15MaskBorderSliverCrown.png']])
}

if (currentVersion != 'm15/version') {
	currentVersion = 'm15/version'

	artX = scaleX(115 / 1500)
	artY = scaleY(237 / 2100)
	artWidth = scaleX(1270 / 1500)
	artHeight = scaleY(929 / 2100)

	manaCostXPath = '1316 - 78 * manaSymbolIndex'
	manaCostYPath = '121'
	manaCostDiameter = '70'
	manaCostShadowOffset = '[-2, 6]'
	manaCostDirection = 'reverse'

	setSymbolX = [scaleX(1382/1500), 'right']
	setSymbolY = [scaleY(1241/2100), 'center']
	setSymbolWidth = scaleX(180/1500)
	setSymbolHeight = scaleY(86/2100)

	watermarkX = scaleX(0.5)
	watermarkY = scaleY(1630/2100)
	watermarkWidth = scaleX(1140/1500)
	watermarkHeight = scaleY(484/2100)

	bottomInfoFunction = 'bottomInfoM15'

	loadTextOptions([
	new cardText('Card Title', '', 126/1500, 188/2100, 1248/1500, 80/2100, 'belerenb', 80/2100, 'black', ['oneLine=true']),
	new cardText('Card Type', '', 126/1500, 1264/2100, 1248/1500, 68/2100, 'belerenb', 68/2100, 'black', ['oneLine=true']),
	new cardText('Rules Text', '', 135/1500, 1370/2100, 1230/1500, 625/2100, 'mplantin', 74/2100, 'black'),
	new cardText('Power/Toughness', '', 1191/1500, 1954/2100, 205/1500, 78/2100, 'belerenbsc', 78/2100, 'black', ['oneLine=true,textAlign="center"'])
	])
}

loadFramePackOptions([['disabled', 'Standard'], ['regular', 'Regular'], ['disabled', 'Extras'], ['legendCrowns', 'Legend Crowns'], ['floatingCrowns', 'Floating Crowns'], ['holoStamps', 'Holographic Stamps'], ['disabled', 'Mechanic-Based'], ['companion', 'Companion'], ['nyx', 'Nyx'], ['devoid', 'Devoid'], ['disabled', 'Special'], ['zendikarRising', 'Zendikar Rising Showcase'], ['commanderLegends', 'Commander Legends Showcase'], ['boxTopper', 'Box Topper'], ['genericShowcase', 'Generic Showcase'], ['m21', 'M21 Showcase'], ['nickname', 'Nickname (Godzilla)'], ['invention', 'Kaladesh Invention'], ['darkPT', 'Dark Power/Toughness'], ['disabled', 'Custom'], ['inventionClassic', 'Simple Invention']])

function bottomInfoM15() {
	bottomInfoContext.clearRect(0, 0, cardWidth, cardHeight)
	var ptBoxShift = 0
	if (currentVersion == 'm15/commanderLegends' || currentVersion == 'm15/m21') {
		ptBoxShift = 36/2100
	} else {
		for (var i = 0; i < cardTextList.length; i++) {
			if (cardTextList[i].name == 'Power/Toughness' && cardTextList[i].text != '') {
				ptBoxShift = 36/2100
			}
		}
	}
	if (ptBoxShift == 0) {
		Array.from(cardMaster.children).forEach(element => {if (element.children[2].innerHTML.includes('Power/Toughness')) {ptBoxShift = 36/2100}})
	}
	writeText(
		[
			{text: document.getElementById('inputInfoSet').value + '{star}' + document.getElementById('inputInfoLanguage').value + ' {saveTextX}{artistbrush}{fontbelerenbsc}' + document.getElementById('inputInfoArtist').value, x: 97/1500, y: 2026/2100, width: 1306/1500, height: 36/2100, font: 'gothammedium', fontSize: 36/2100, fontColor: 'white', otherParameters: ['oneLine=true', 'outline=true', 'outlineThickness=8']},
			{text: document.getElementById('inputInfoNumber').value + '{loadTextX}' + document.getElementById('inputInfoRarity').value, x: 97/1500, y: 1990/2100, width: 1306/1500, height: 36/2100, font: 'gothammedium', fontSize: 36/2100, fontColor: 'white', otherParameters: ['oneLine=true', 'outline=true', 'outlineThickness=8']}
		], bottomInfoContext)
}