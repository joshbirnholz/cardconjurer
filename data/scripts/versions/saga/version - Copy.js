if (!loadedVersions.includes('m15Saga/version')) {
	loadedVersions.push('m15Saga/version')
	var sagaDivider = new Image()
    sagaDivider.crossOrigin = 'anonymous'
    sagaDivider.src = '/data/images/cardImages/saga/sagaDivider.png'
    var sagaChapter = new Image()
    sagaChapter.crossOrigin = 'anonymous'
    sagaChapter.src = '/data/images/cardImages/saga/sagaChapter.png'
	newCanvas('saga')
	loadMaskImages([['Pinline (saga)', '/data/images/cardImages/saga/sagaMaskPinline.png'], ['Border (saga)', '/data/images/cardImages/saga/sagaMaskBorder.png'], ['Type (saga)', '/data/images/cardImages/saga/sagaMaskType.png'], ['Frame (saga)', '/data/images/cardImages/saga/sagaMaskFrame.png'], ['Rules Text (saga)', '/data/images/cardImages/saga/sagaMaskText.png'], ['Banner (saga)', '/data/images/cardImages/saga/sagaMaskBanner.png']])
	document.getElementById('tabPicker').innerHTML += `<div onclick='toggleTabs(this, "sagaTab")' class='interactable'>Saga</div>`
    var sagaTab = document.createElement("div")
    sagaTab.classList.add('hidden')
    sagaTab.id = 'sagaTab'
    sagaTab.innerHTML = `
            Adjust the height (first input) and chapter count (second input) of each Saga ability:<br>
            First Ability: <input type="number" class="input number" id="inputSagaChapterHeight1" oninput="sagaAbilities()" value="375" min="0"><input type="number" class="input number" id="inputSagaChapterCount1" oninput="sagaAbilities()" min="0" max="2" value="1">
            Second Ability: <input type="number" class="input number" id="inputSagaChapterHeight2" oninput="sagaAbilities()" value="375" min="0"><input type="number" class="input number" id="inputSagaChapterCount2" oninput="sagaAbilities()" min="0" max="2" value="1">
            Third Ability: <input type="number" class="input number" id="inputSagaChapterHeight3" oninput="sagaAbilities()" value="375" min="0"><input type="number" class="input number" id="inputSagaChapterCount3" oninput="sagaAbilities()" min="0" max="2" value="1">
            Fourth Ability: <input type="number" class="input number" id="inputSagaChapterHeight4" oninput="sagaAbilities()" value="0" min="0"><input type="number" class="input number" id="inputSagaChapterCount4" oninput="sagaAbilities()" min="0" max="2" value="0"><br>`
    document.getElementById('tabOptions').appendChild(sagaTab)
    setTimeout(sagaAbilities, 1000)

    notify('To edit the arrangement of saga chapters, see the new \'Saga\' tab.\nImporting Sagas is not currently functional.', '#aaffaae0')
}

if (currentVersion != 'saga/version') {
	currentVersion = 'saga/version'

	artX = scaleX(752 / 1500)
	artY = scaleY(237 / 2100)
	artWidth = scaleX(632 / 1500)
	artHeight = scaleY(1521 / 2100)

	manaCostXPath = '1316 - 78 * manaSymbolIndex'
	manaCostYPath = '121'
	manaCostDiameter = '70'
	manaCostShadowOffset = '[-2, 6]'
	manaCostDirection = 'reverse'

	setSymbolX = [scaleX(1382/1500), 'right']
	setSymbolY = [scaleY(1831/2100), 'center']
	setSymbolWidth = scaleX(180/1500)
	setSymbolHeight = scaleY(86/2100)

	watermarkX = scaleX(432/1500)
	watermarkY = scaleY(997/2100)
	watermarkWidth = scaleX(532/1500)
	watermarkHeight = scaleY(1421/2100)

	bottomInfoFunction = 'bottomInfoM15'

	loadTextOptions([
    new cardText('Card Title', '', 126/1500, 188/2100, 1248/1500, 80/2100, 'belerenb', 80/2100, 'black', ['oneLine=true']),
	new cardText('Card Type', '', 126/1500, 1858/2100, 1248/1500, 68/2100, 'belerenb', 68/2100, 'black', ['oneLine=true']),
    new cardText('Ability 1', '', 200/1500, 620/2100, 525/1500, 625/2100, 'mplantin', 64/2100, 'black'),
    new cardText('Ability 2', '', 200/1500, 620/2100, 525/1500, 625/2100, 'mplantin', 64/2100, 'black'),
    new cardText('Ability 3', '', 200/1500, 620/2100, 525/1500, 625/2100, 'mplantin', 64/2100, 'black'),
    new cardText('Ability 4', '', 200/1500, 620/2100, 525/1500, 625/2100, 'mplantin', 64/2100, 'black'),
	new cardText('Reminder Text', '{i}(As this Saga enters and after your draw step, add a lore counter. Sacrifice after III.)', 130/1500, 155/2100, 606/1500, 625/2100, 'mplantin', 63/2100, 'black')
    ])
}

function sagaAbilities() { //Determines the height of each Saga ability
    sagaContext.clearRect(0, 0, cardWidth, cardHeight)
    sagaContext.textAlign = 'center'
    sagaContext.font = 'normal normal 550 68px plantinsemibold'
    var currentChapterY = 620/2100
    var currentChapterCount = 0
    for (var i = 2; i < 6; i++) {
    	if (document.getElementById('inputSagaChapterCount' + (i - 1)).value > 0) {
    		cardTextList[i].y = currentChapterY + cardTextList[i].fontSize * 0.75
	    	cardTextList[i].height = document.getElementById('inputSagaChapterHeight' + (i - 1)).value / cardHeight
	    	if (document.getElementById('textPicker').children[i].classList.contains('selected')) {
	    		document.getElementById('textEditorY').value = scaleY(cardTextList[i].y)
	    		document.getElementById('textEditorHeight').value = scaleY(cardTextList[i].height)
	    	}
	    	sagaContext.drawImage(sagaDivider, scaleX(150/1500), scaleY(currentChapterY) - scaleY(6/2100) / 2, scaleX(592/1500), scaleY(6/2100))
	        currentChapterY += document.getElementById('inputSagaChapterHeight' + (i - 1)).value / cardHeight
	        if (document.getElementById('inputSagaChapterCount' + (i - 1)).value == 1) {
	        	currentChapterCount += 1
	        	sagaContext.drawImage(sagaChapter, scaleX(58/1500), scaleY(currentChapterY) - (scaleY(cardTextList[i].height) + scaleY(132/2100)) / 2, scaleX(118/1500), scaleY(132/2100))
	        	sagaContext.fillText(romanize(currentChapterCount), scaleX(117/1500), scaleY(currentChapterY) - (scaleY(cardTextList[i].height) + scaleY(132/2100)) / 2 + scaleY(90/2100))
	        } else {
	        	currentChapterCount += 2
	        	sagaContext.drawImage(sagaChapter, scaleX(58/1500), scaleY(currentChapterY) - (scaleY(cardTextList[i].height) + scaleY(132/2100)) / 2 - scaleY(75/2100), scaleX(118/1500), scaleY(132/2100))
	        	sagaContext.fillText(romanize(currentChapterCount - 1), scaleX(117/1500), scaleY(currentChapterY) - (scaleY(cardTextList[i].height) + scaleY(132/2100)) / 2 + scaleY(15/2100))
	        	sagaContext.drawImage(sagaChapter, scaleX(58/1500), scaleY(currentChapterY) - (scaleY(cardTextList[i].height) + scaleY(132/2100)) / 2 + scaleY(75/2100), scaleX(118/1500), scaleY(132/2100))
	        	sagaContext.fillText(romanize(currentChapterCount), scaleX(117/1500), scaleY(currentChapterY) - (scaleY(cardTextList[i].height) + scaleY(132/2100)) / 2 + scaleY(165/2100))
	        }
    	} else {
    		cardTextList[i].y = 1
    		cardTextList[i].height = 1
    	}
    }
    cardTextEdited()
}

function romanize(input) {
	switch(input) {
		case 1:
			return 'I'
		case 2:
			return 'II'
		case 3:
			return 'III'
		case 4:
			return 'IV'
		case 5:
			return 'V'
		case 6:
			return 'VI'
		case 7:
			return 'VII'
		case 8:
			return 'VIII'
		case 9:
			return 'IX'
		default:
			return 'X'
	}
}

loadFramePackOptions([['regular', 'Regular'], ['legendCrowns', 'Legend Crowns']])
