if (!loadedVersions.includes('m15Planeswalker/version')) {
	loadedVersions.push('m15Planeswalker/version')
	newCanvas('planeswalker')
	loadMaskImages([['Pinline (planeswalker)', '/data/images/cardImages/planeswalker/planeswalkerMaskPinline.png'], ['Border (planeswalker)', '/data/images/cardImages/planeswalker/planeswalkerMaskBorder.png'], ['Title (planeswalker)', '/data/images/cardImages/planeswalker/planeswalkerMaskTitle.png'], ['Type (planeswalker)', '/data/images/cardImages/planeswalker/planeswalkerMaskType.png'], ['Frame (planeswalker)', '/data/images/cardImages/planeswalker/planeswalkerMaskFrame.png'], ['Rules Text (planeswalker)', '/data/images/cardImages/planeswalker/planeswalkerMaskText.png']])

	document.getElementById('tabPicker').innerHTML += `<div onclick='toggleTabs(this, "planeswalkerTab")' class='interactable'>Planeswalker</div>`
    var planeswalkerTab = document.createElement("div")
    planeswalkerTab.classList.add('hidden')
    planeswalkerTab.id = 'planeswalkerTab'
    planeswalkerTab.innerHTML = `
            Adjust the height (first input) and loyalty cost (second input) of each Planeswalker ability:<br>
            First Ability: <input type="number" class="input number" id="inputPlaneswalker1" oninput="planeswalkerAbilities()" value="200" min="0"><input type="text" class="input text" id="inputPlaneswalker1Icon" oninput="planeswalkerAbilities()" value="+1">
            Second Ability: <input type="number" class="input number" id="inputPlaneswalker2" oninput="planeswalkerAbilities()" value="200" min="0"><input type="text" class="input text" id="inputPlaneswalker2Icon" oninput="planeswalkerAbilities()" value="0">
            Third Ability: <input type="number" class="input number" id="inputPlaneswalker3" oninput="planeswalkerAbilities()" value="200" min="0"><input type="text" class="input text" id="inputPlaneswalker3Icon" oninput="planeswalkerAbilities()" value="-3">
            Fourth Ability: <input type="number" class="input number" id="inputPlaneswalker4" oninput="planeswalkerAbilities()" value="0" min="0" max="1039"><input type="text" class="input text" id="inputPlaneswalker4Icon" oninput="planeswalkerAbilities()" value="-9"><br>
    For two-ability Planeswalkers only:<br>
    <input type="checkbox" onchange="changePlaneswalkerAbilityLayout()" id="inputWARSpacing"> Use War of the Spark ability spacing<br>
    <input type="checkbox" onchange="changePlaneswalkerAbilityLayout()" id="inputWARReverse"> Reverse War of the Spark ability spacing<br>
    <input type="checkbox" onchange="invertPlaneswalkerColors()" id="inputColorInvert"> Dark ability boxes`
    document.getElementById('tabOptions').appendChild(planeswalkerTab)
    var planeswalkerPlus = new Image()
    planeswalkerPlus.crossOrigin = 'anonymous'
    planeswalkerPlus.src = '/data/images/cardImages/planeswalker/planeswalkerPlus.png'
    var planeswalkerNeutral = new Image()
    planeswalkerNeutral.crossOrigin = "anonymous"
    planeswalkerNeutral.src = '/data/images/cardImages/planeswalker/planeswalkerNeutral.png'
    var planeswalkerMinus = new Image()
    planeswalkerMinus.crossOrigin = "anonymous"
    planeswalkerMinus.src = '/data/images/cardImages/planeswalker/planeswalkerMinus.png'
    var lightToDarkPlaneswalker = new Image()
    lightToDarkPlaneswalker.crossOrigin = 'anonymous'
    lightToDarkPlaneswalker.src = '/data/images/cardImages/planeswalker/abilityLineOdd.png'
    var darkToLightPlaneswalker = new Image()
    darkToLightPlaneswalker.crossOrigin = 'anonymous'
    darkToLightPlaneswalker.src = '/data/images/cardImages/planeswalker/abilityLineEven.png'
    var lightToDarkPlaneswalkerDarkened= new Image()
    lightToDarkPlaneswalkerDarkened.crossOrigin = 'anonymous'
    lightToDarkPlaneswalkerDarkened.src = '/data/images/cardImages/planeswalker/abilityLineOddDarkened.png'
    var darkToLightPlaneswalkerDarkened = new Image()
    darkToLightPlaneswalkerDarkened.crossOrigin = 'anonymous'
    darkToLightPlaneswalkerDarkened.onload = function() {invertPlaneswalkerColors()}
    darkToLightPlaneswalkerDarkened.src = '/data/images/cardImages/planeswalker/abilityLineEvenDarkened.png'
    setTimeout(planeswalkerAbilities, 1000)
    //placeholders:
    var darkColor = '#a4a4a4'
    var lightColor = 'white'
    var planeswalkerLightToDark = new Image()
    var planeswalkerDarkToLight = new Image()
    planeswalkerDarkToLight.onload = function(){planeswalkerAbilities()}

    notify('To edit the Loyalty costs of planeswalker abilities or change the size of the ability textboxes, see the new \'Planeswalker\' tab.', '#aaffaae0')
}

if (currentVersion != 'm15Planeswalker/version') {
	currentVersion = 'm15Planeswalker/version'

	artX = scaleX(105 / 1500)
	artY = scaleY(212 / 2100)
	artWidth = scaleX(1290 / 1500)
	artHeight = scaleY(1709 / 2100)

	manaCostXPath = '1316 - 78 * manaSymbolIndex'
	manaCostYPath = '94'
	manaCostDiameter = '70'
	manaCostShadowOffset = '[-2, 6]'
	manaCostDirection = 'reverse'

	setSymbolX = [scaleX(1383/1500), 'right']
	setSymbolY = [scaleY(1237/2100), 'center']
	setSymbolWidth = scaleX(180/1500)
	setSymbolHeight = scaleY(80/2100)

	watermarkX = scaleX(0.5)
	watermarkY = scaleY(1630/2100)
	watermarkWidth = scaleX(1140/1500)
	watermarkHeight = scaleY(484/2100)

	bottomInfoFunction = 'bottomInfoPlaneswalker'

	loadTextOptions([
    new cardText('Card Title', '', 130/1500, 157/2100, 1248/1500, 80/2100, 'belerenb', 80/2100, 'black', ['oneLine=true']),
    new cardText('Card Type', '', 130/1500, 1258/2100, 1248/1500, 68/2100, 'belerenb', 68/2100, 'black', ['oneLine=true']),
    new cardText('Ability 1', '', 270/1500, 1153/2100, 1120/1500, 624/2100, 'mplantin', 74/2100, 'black'),
    new cardText('Ability 2', '', 270/1500, 1153/2100, 1120/1500, 624/2100, 'mplantin', 74/2100, 'black'),
    new cardText('Ability 3', '', 270/1500, 1153/2100, 1120/1500, 624/2100, 'mplantin', 74/2100, 'black'),
    new cardText('Ability 4', '', 270/1500, 1153/2100, 1120/1500, 624/2100, 'mplantin', 74/2100, 'black'),
    new cardText('Loyalty', '', 1209/1500, 1954/2100, 210/1500, 78/2100, 'belerenbsc', 78/2100, 'white', ['oneLine=true,textAlign="center"'])
    ])
}

function bottomInfoPlaneswalker() {
    bottomInfoContext.clearRect(0, 0, cardWidth, cardHeight)
    var ptBoxShift = 36/2100
    writeText(
        [
            {text: document.getElementById('inputInfoSet').value + '{star}' + document.getElementById('inputInfoLanguage').value + ' {saveTextX}{artistbrush}{fontbelerenbsc}' + document.getElementById('inputInfoArtist').value, x: 97/1500, y: 2026/2100, width: 1306/1500, height: 36/2100, font: 'gothammedium', fontSize: 36/2100, fontColor: 'white', otherParameters: ['oneLine=true', 'outline=true', 'outlineThickness=8']},
            {text: document.getElementById('inputInfoNumber').value + '{loadTextX}' + document.getElementById('inputInfoRarity').value, x: 97/1500, y: 1990/2100, width: 1306/1500, height: 36/2100, font: 'gothammedium', fontSize: 36/2100, fontColor: 'white', otherParameters: ['oneLine=true', 'outline=true', 'outlineThickness=8']}
        ], bottomInfoContext)
}

var planeswalkerAbilityLayout = [[0], [0, scaleY(784/1050)], [0, scaleY(730/1050), scaleY(863/1050)], [0, scaleY(697/1050), scaleY(784/1050), scaleY(878/1050)], [0, scaleY(683/1050), scaleY(756/1050), scaleY(830/1050), scaleY(904/1050)]]
var planeswalkerAbilityCount = 3
var ability1Y = 0, ability2Y = 0, ability3Y = 0, ability4Y = 0, ability5Y = cardHeight
var planeswalkerTextBoxX = scaleX(179/1500), planeswalkerTextBoxWidth = scaleX(1205/1500), planeswalkerTextBoxY = scaleY(1314/2100), planeswalkerTextBoxHeight = scaleY(607/2100)

function planeswalkerAbilities() {
    planeswalkerContext.clearRect(0, 0, cardWidth, cardHeight)
    planeswalkerAbilityCount = 0
    var cardTextListMod = 0
    if (currentVersion == 'm15Planeswalker/nickname') {
        cardTextListMod = 1
    }
    for (var i = 1; i < 5; i++) {
    	cardTextList[i + 1 + cardTextListMod].y = 2
        if (getFloat('inputPlaneswalker' + i) != 0) {
            planeswalkerAbilityCount += 1;
        } else {
            break
        }
    }
    if (planeswalkerAbilityCount > 0) {
        ability1Y = planeswalkerTextBoxY
        if (planeswalkerAbilityCount > 1) {
            window.ability2Y = getFloat("inputPlaneswalker1") + ability1Y
            if (planeswalkerAbilityCount > 2) {
                ability3Y = getFloat('inputPlaneswalker2') + ability2Y
                if (planeswalkerAbilityCount > 3) {
                    ability4Y = getFloat('inputPlaneswalker3') + ability3Y
                	cardTextList[5 + cardTextListMod].y = (ability4Y) / cardHeight + cardTextList[5 + cardTextListMod].fontSize - 10/2100
        			cardTextList[5 + cardTextListMod].height = getFloat('inputPlaneswalker4') / cardHeight
                }
            	cardTextList[4 + cardTextListMod].y = (ability3Y) / cardHeight + cardTextList[4 + cardTextListMod].fontSize - 10/2100
        		cardTextList[4 + cardTextListMod].height = getFloat('inputPlaneswalker3') / cardHeight
            }
        	cardTextList[3 + cardTextListMod].y = (ability2Y) / cardHeight + cardTextList[3 + cardTextListMod].fontSize - 10/2100
        	cardTextList[3 + cardTextListMod].height = getFloat('inputPlaneswalker2') / cardHeight
        }
        cardTextList[2 + cardTextListMod].y = (ability1Y) / cardHeight + cardTextList[2 + cardTextListMod].fontSize - 10/2100
        cardTextList[2 + cardTextListMod].height = getFloat('inputPlaneswalker1') / cardHeight
        planeswalkerTextFunction()
    }
}
function planeswalkerTextFunction() {
    planeswalkerContext.globalCompositeOperation = 'destination-over'
    var lastAdjust = 0
    for (var i = 1; i < planeswalkerAbilityCount + 1; i++) {
        if (i == planeswalkerAbilityCount) {
            lastAdjust = 2 * cardHeight
        }
        if (i % 2 == 1) {
            planeswalkerContext.fillStyle = lightColor
            planeswalkerContext.globalAlpha = 0.608
            planeswalkerContext.fillRect(planeswalkerTextBoxX, window['ability' + i + 'Y'] + scaleY(10/1050), planeswalkerTextBoxWidth, window['ability' + (i + 1) + 'Y'] - window['ability' + i + 'Y'] - scaleY(20/1050) + lastAdjust)
            if (i == 1 && planeswalkerAbilityCount != 1) {
                planeswalkerContext.fillRect(planeswalkerTextBoxX, window['ability' + i + 'Y'], planeswalkerTextBoxWidth, scaleY(10/1050))
            }
            planeswalkerContext.globalAlpha = 1
            planeswalkerContext.drawImage(planeswalkerLightToDark, planeswalkerTextBoxX, window['ability' + (i + 1) + 'Y'] - scaleY(10/1050) + lastAdjust, planeswalkerTextBoxWidth, scaleY(20/1050))
        } else {
            planeswalkerContext.fillStyle = darkColor
            planeswalkerContext.globalAlpha = 0.706
            planeswalkerContext.fillRect(planeswalkerTextBoxX, window['ability' + i + 'Y'] + scaleY(10/1050), planeswalkerTextBoxWidth, window['ability' + (i + 1) + 'Y'] - window['ability' + i + 'Y'] - scaleY(20/1050) + lastAdjust)
            planeswalkerContext.globalAlpha = 1
            planeswalkerContext.drawImage(planeswalkerDarkToLight, planeswalkerTextBoxX, window['ability' + (i + 1)+ 'Y'] - scaleY(10/1050) + lastAdjust, planeswalkerTextBoxWidth, scaleY(20/1050))
        }
    }
    planeswalkerContext.globalCompositeOperation = 'destination-in'
    planeswalkerContext.drawImage(maskImageList[maskNameList.indexOf('Rules Text (planeswalker)')], 0, 0, cardWidth, cardHeight)
    planeswalkerContext.globalCompositeOperation = 'source-over'
    planeswalkerContext.fillStyle = 'white'
    planeswalkerContext.font = scaleY(30/1050) + 'px belerenbsc'
    planeswalkerContext.textAlign = 'center'
    for (var i = 1; i < planeswalkerAbilityCount + 1; i++) {
        var planeswalkerIconValue = document.getElementById('inputPlaneswalker' + i + 'Icon').value
        var planeswalkerMidpoint = getFloat('inputPlaneswalker' + i + '') / 2 + window['ability' + i + 'Y']
        if (planeswalkerIconValue.includes('+')) {
            planeswalkerContext.drawImage(planeswalkerPlus, scaleX(22/750), planeswalkerAbilityLayout[planeswalkerAbilityCount][i] - scaleY(27/1050), scaleX(105/750), scaleY(76/1050))
            planeswalkerContext.fillText(planeswalkerIconValue, scaleX(77/750), planeswalkerAbilityLayout[planeswalkerAbilityCount][i] + scaleY(18/1050))
        } else if (planeswalkerIconValue.includes('-')) {
            planeswalkerContext.drawImage(planeswalkerMinus, scaleX(21/750), planeswalkerAbilityLayout[planeswalkerAbilityCount][i] - scaleY(16/1050), scaleX(106/750), scaleY(74/1050))
            planeswalkerContext.fillText(planeswalkerIconValue, scaleX(77/750), planeswalkerAbilityLayout[planeswalkerAbilityCount][i] + scaleY(19/1050))
        } else if (planeswalkerIconValue != '') {
            planeswalkerContext.drawImage(planeswalkerNeutral, scaleX(21/750), planeswalkerAbilityLayout[planeswalkerAbilityCount][i] - scaleY(16/1050), scaleX(106/750), scaleY(64/1050))
            planeswalkerContext.fillText(planeswalkerIconValue, scaleX(77/750), planeswalkerAbilityLayout[planeswalkerAbilityCount][i] + scaleY(20/1050))
        }
    }
    cardTextEdited()
}
function changePlaneswalkerAbilityLayout() {
    if (document.getElementById('inputWARSpacing').checked) {
        if (document.getElementById('inputWARReverse').checked) {
            planeswalkerAbilityLayout[2] = [0, scaleY(784/1050), scaleY(878/1050)]
        } else {
            planeswalkerAbilityLayout[2] = [0, scaleY(697/1050), scaleY(784/1050)]
        }
    } else {
        planeswalkerAbilityLayout[2] = [0, scaleY(730/1050), scaleY(863/1050)]
    }
    planeswalkerAbilities()
}
function invertPlaneswalkerColors() {
    if (document.getElementById('inputColorInvert').checked) {
        darkColor = '#5b5b5b'
        lightColor = 'black'
        planeswalkerLightToDark.src = lightToDarkPlaneswalkerDarkened.src
        planeswalkerDarkToLight.src = darkToLightPlaneswalkerDarkened.src
    } else {
        darkColor = '#a4a4a4'
        lightColor = 'white'
        planeswalkerLightToDark.src = lightToDarkPlaneswalker.src
        planeswalkerDarkToLight.src = darkToLightPlaneswalker.src
    }
}

loadFramePackOptions([['regular', 'Regular'], ['nickname', 'Nickname (Godzilla)']])
