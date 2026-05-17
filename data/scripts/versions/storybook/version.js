if (!loadedVersions.includes('storybook/version')) {
	loadedVersions.push('storybook/version')
	// loadMaskImages([['Storybook Right Half', '/data/images/cardImages/storybook/maskStorybookRightHalf.png']])
	//special additional mana cost, title, and type
}

if (currentVersion != 'storybook/version') {
	currentVersion = 'storybook/version'

	artX = scaleX(50/1500)
	artY = scaleY(54/2100)
	artWidth = scaleX(1405/1500)
	artHeight = scaleY(1175/2100)

	manaCostXPath = '1316 - 78 * manaSymbolIndex'
	manaCostYPath = '121'
	manaCostDiameter = '70'
	manaCostShadowOffset = '[-2, 6]'
	manaCostDirection = 'reverse'

	setSymbolX = [scaleX(1328/1500), 'center']
	setSymbolY = [scaleY(1245/2100), 'center']
	setSymbolWidth = scaleX(74/1500)
	setSymbolHeight = scaleY(74/2100)

	watermarkX = scaleX(0.5)
	watermarkY = scaleY(1630/2100)
	watermarkWidth = scaleX(1140/1500)
	watermarkHeight = scaleY(484/2100)

	bottomInfoFunction = 'bottomInfoStorybook'

	loadTextOptions([
		new cardText('Card Title', '', 222/1500, 188/2100, 1056/1500, 80/2100, 'belerenb', 80/2100, 'black', ['oneLine=true']),
		new cardText('Card Type', '', 345/1500, 1269/2100, 850/1500, 68/2100, 'belerenb', 68/2100, 'black', ['oneLine=true']),
		new cardText('Rules Text', '', 140/1500, 1515/2100, 540/1500, 500/2100, 'mplantin', 74/2100, 'black'),
		new cardText('Rules Text (Right)', '', 796/1500, 1370/2100, 570/1500, 600/2100, 'mplantin', 74/2100, 'black'),
		new cardText('Power/Toughness', '', 1190/1500, 1957/2100, 210/1500, 78/2100, 'belerenbsc', 78/2100, 'black', ['oneLine=true,textAlign="center"']),
		new cardText('Adventure Title', '', 122/1500, 1386/2100, 600/1500, 62/2100, 'belerenb', 62/2100, 'white', ['oneLine=true']),
		new cardText('Adventure Type', '', 122/1500, 1480/2100, 600/1500, 62/2100, 'belerenb', 62/2100, 'white', ['oneLine=true']),
		new cardText('Adventure Mana Cost', '', 122/1500, 1394/2100, 600/1500, 82/2100, 'belerenb', 82/2100, 'black', ['oneLine=true','manaCost=true','canWriteText=false','textAlign="right"'])
	])
}

loadFramePackOptions([['regular', 'Regular']])

function bottomInfoStorybook() {
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
		[
			{text: document.getElementById('inputInfoSet').value + '{star}' + document.getElementById('inputInfoLanguage').value + ' {saveTextX}{artistbrush}{fontbelerenbsc}' + document.getElementById('inputInfoArtist').value, x: 97/1500, y: 2034/2100, width: 1306/1500, height: 36/2100, font: 'gothammedium', fontSize: 36/2100, fontColor: 'white', otherParameters: ['oneLine=true', 'outline=true', 'outlineThickness=8']},
			{text: document.getElementById('inputInfoNumber').value + '{loadTextX}' + document.getElementById('inputInfoRarity').value, x: 97/1500, y: 1998/2100, width: 1306/1500, height: 36/2100, font: 'gothammedium', fontSize: 36/2100, fontColor: 'white', otherParameters: ['oneLine=true', 'outline=true', 'outlineThickness=8']}
		], bottomInfoContext)
}