var cardMasterList = new Array()
var uniqueNumberTracker = 0
var frameImageList = new Array()
var maskImageList = new Array()
var maskNameList = new Array()
var canvasList = new Array()
var contextList = new Array()
var loadedVersions = new Array()
var currentVersion
var cardMaster = document.getElementById('cardMaster')
var selectedFrameImage
var selectedMaskImage = 0
var selectedCardMasterElement = -1
var selectedTextObject
var cardTextList = new Array()
var manaSymbolCodeList = []
var manaSymbolImageList = []
var deletingCardObject = false
var skipResizeCardArt = 0
var skipLoadTextList = 0
var usedManaSymbols = []
var totalShift = [0, 0]
date = new Date()
var cornerCutout = new Image()
cornerCutout.crossOrigin = 'anonymous';
cornerCutout.src = '/data/images/cardImages/cornerCutout.png'
//To save the server from being overloaded? Maybe?
function fixUri(input) {
	var prefix = 'https://raw.githubusercontent.com/ImKyle4815/cardconjurer/master';
	if (input.includes(prefix) || input.includes('http')) {
		return input;
	} else {
		return prefix + input;
	}
}

//URL Parameters
var URLParams = new URLSearchParams(window.location.search)

function addToManaSymbolList(folderPath, newManaSymbolList) {
	for (var i = 0; i < newManaSymbolList.length; i ++) {
		if (!manaSymbolCodeList.includes(newManaSymbolList[i].replace('.svg', ''))) {
			if (newManaSymbolList[i].includes('.svg')) {
				manaSymbolCodeList.push(newManaSymbolList[i].replace('.svg', ''))
				manaSymbolImageList.push(new Image())
				manaSymbolImageList[manaSymbolImageList.length - 1].crossOrigin = 'anonymous';
				manaSymbolImageList[manaSymbolImageList.length - 1].src = fixUri(folderPath + newManaSymbolList[i])
			} else {
				manaSymbolCodeList.push(newManaSymbolList[i])
				manaSymbolImageList.push(new Image())
				manaSymbolImageList[manaSymbolImageList.length - 1].crossOrigin = 'anonymous';
				manaSymbolImageList[manaSymbolImageList.length - 1].src = fixUri(folderPath + newManaSymbolList[i] + '.png')
			}
		}
	}
}

addToManaSymbolList('/data/images/cardImages/manaSymbols/', ["0.svg", "1.svg", "2.svg", "3.svg", "4.svg", "5.svg", "6.svg", "7.svg", "8.svg", "9.svg", "10.svg", "11.svg", "12.svg", "13.svg", "14.svg", "15.svg", "16.svg", "17.svg", "18.svg", "19.svg", "20.svg", "w.svg", "u.svg", "b.svg", "r.svg", "g.svg", "2w.svg", "2u.svg", "2b.svg", "2r.svg", "2g.svg", "pw.svg", "pu.svg", "pb.svg", "pr.svg", "pg.svg", "wu.svg", "wb.svg", "ub.svg", "ur.svg", "br.svg", "bg.svg", "rg.svg", "rw.svg", "gw.svg", "gu.svg", "x.svg", "s.svg", "c.svg", "t.svg","untap.svg", "e.svg", "y.svg", "z.svg", "half.svg", "inf.svg", "chaos.svg", "l+", "l-", "l0", "oldtap.svg", "artistbrush.svg", "bar", "whitebar", "whiteBrush", "blackBrush", 'star.svg', "p.svg"])

function newCanvas(name) {
	window[name + 'Canvas'] = document.createElement('canvas')
	window[name + 'Canvas'].width = cardWidth
	window[name + 'Canvas'].height = cardHeight
	canvasList.push(window[name + 'Canvas'])
	window[name + 'Context'] = window[name + 'Canvas'].getContext('2d')
	contextList.push(window[name + 'Context'])
}
function resizeCanvases(newCardWidth, newCardHeight) {
	canvasList.forEach(element => {element.width = newCardWidth; element.height = newCardHeight})
}

var previewCanvas = document.getElementById('previewCanvas')
previewCanvas.width = 750
previewCanvas.height = 1050
var previewContext = previewCanvas.getContext('2d')
newCanvas('main')
newCanvas('frameMasks')
newCanvas('textLine')
newCanvas('textParagraph')
newCanvas('text')
newCanvas('bottomInfo')
newCanvas('manaCost')
newCanvas('watermark')
newCanvas('temp')
newCanvas('autoCrop')

var artWidth = cardWidth, artHeight = cardHeight
var setSymbolDrawX, setSymbolDrawY, setSymbolDrawWidth, setSymbolDrawHeight
var watermarkDrawX = 0, watermarkDrawY = 0, watermarkDrawWidth = 0, watermarkDrawHeight = 0
var cardArt = new Image()
cardArt.crossOrigin = 'anonymous';
cardArt.src = fixUri('/data/images/cardImages/blank.png')
var setSymbol = new Image()
setSymbol.crossOrigin = 'anonymous';
setSymbol.src = fixUri('/data/images/cardImages/blank.png')
var watermark = new Image()
watermark.crossOrigin = 'anonymous';
watermark.src = fixUri('/data/images/cardImages/blank.png')
cardArt.onload = function() {
	cardMasterList[0].width = this.width / cardWidth
	cardMasterList[0].height = this.height / cardHeight
	if (skipResizeCardArt < 1) {
	    if (this.width / this.height > artWidth / artHeight) {
	        document.getElementById('inputCardArtZoom').value = artHeight / this.height * 100
	    } else {
	        document.getElementById('inputCardArtZoom').value = artWidth / this.width * 100
	    }
	    document.getElementById('inputCardArtX').value = artX
	    document.getElementById('inputCardArtY').value = artY
	} else {
		skipResizeCardArt -= 1
	}
	cardArtUpdated()
}
function setSymbolFromGatherer() {
	if (document.getElementById('inputSetCode').value.toLowerCase() == 'cc') {
		var newSetSymbolSource = '/data/images/cardImages/misc/cc-' + document.getElementById('inputSetRarity').value.toLowerCase()
		if (document.getElementById('inputSetRarity').value == '') {
			newSetSymbolSource += 'c'
		}
		setSymbol.src = (newSetSymbolSource + '.png')
	} else if (document.getElementById('inputSetCode').value.toLowerCase() == 'none') {
		setSymbol.src = ('/data/images/cardImages/blank.png')
	} else {
		setSymbol.src = 'https://cors-anywhere.herokuapp.com/http://gatherer.wizards.com/Handlers/Image.ashx?type=symbol&set=' + document.getElementById('inputSetCode').value + '&size=large&rarity=' + document.getElementById('inputSetRarity').value
		// autoCrop(setSymbol, 'https://cors-anywhere.herokuapp.com/http://gatherer.wizards.com/Handlers/Image.ashx?type=symbol&set=' + document.getElementById('inputSetCode').value + '&size=large&rarity=' + document.getElementById('inputSetRarity').value)
	}
}
setSymbol.onerror = function () {
	this.src = fixUri('/data/images/cardImages/blank.png')
}
setSymbol.onload = function() {
	if (setSymbol.width / setSymbol.height > setSymbolWidth / setSymbolHeight) {
		setSymbolDrawWidth = setSymbolWidth
		setSymbolDrawHeight = setSymbolWidth * setSymbol.height / setSymbol.width
	} else {
		setSymbolDrawHeight = setSymbolHeight
		setSymbolDrawWidth = setSymbolHeight * setSymbol.width / setSymbol.height
	}
	setSymbolDrawX = setSymbolX[0]
	if (setSymbolX[1] == 'right') {
		setSymbolDrawX -= setSymbolDrawWidth
	} else if (setSymbolX[1] == 'center') {
		setSymbolDrawX -= setSymbolDrawWidth / 2
	}
	setSymbolDrawY = setSymbolY[0]
	if (setSymbolY[1] == 'center') {
		setSymbolDrawY -= setSymbolDrawHeight / 2
	}
	drawCardObjects()
}
watermark.onload = function() {
	watermarkUpdated()
}

function loadVersion(versionToLoad) {
	totalShift = [0, 0]
	if (cardWidth / cardHeight == 7/5) {
		cardWidth *= 5/7
		cardHeight *= 7/5
		resizeCanvases(cardWidth, cardHeight)
		previewContext.rotate(Math.PI / 2)
		previewContext.translate(0, -cardHeight / 2)
	} else if (cardWidth != mainCanvas.width) {
		cardWidth = 1500
		cardHeight = cardWidth * 7/5
		resizeCanvases(cardWidth, cardHeight)
	}
	loadScript('/data/scripts/versions/' + versionToLoad + '/version.js')
}

class cardPlaceholder {
	constructor(displayName, whatToDraw, x = 0, y = 0, width = 1, height = 1, zoom = 1) {
		this.name = displayName
		this.whatToDraw = whatToDraw
		this.x = x
		this.y = y
		this.width = width
		this.height = height
		this.zoom = zoom
		this.uniqueNumber = uniqueNumberTracker
		uniqueNumberTracker += 1
	}
	draw() {
		mainContext.globalCompositeOperation = 'source-over'
		mainContext.globalAlpha = 1
		if (this.whatToDraw == textCanvas) {
			if (currentVersion.includes('m15Planeswalker/')) {
				mainContext.drawImage(planeswalkerCanvas, scaleX(totalShift[0]), scaleY(totalShift[1]), cardWidth, cardHeight)
			} else if (currentVersion.includes('saga')) {
				mainContext.drawImage(sagaCanvas, scaleX(totalShift[0]), scaleY(totalShift[1]), cardWidth, cardHeight)
			}
			mainContext.globalAlpha = parseInt(document.getElementById('inputWatermarkOpacity').value) / 100
			mainContext.drawImage(watermarkCanvas, scaleX(totalShift[0]), scaleY(totalShift[1]), cardWidth, cardHeight)
			mainContext.globalAlpha = 1
			mainContext.drawImage(manaCostCanvas, scaleX(totalShift[0]), scaleY(totalShift[1]), cardWidth, cardHeight)
		} else {
			mainContext.globalAlpha = 1
		}
        mainContext.drawImage(this.whatToDraw, scaleX(this.x + totalShift[0]), scaleY(this.y + totalShift[1]), scaleX(this.width) * this.zoom, scaleY(this.height) * this.zoom)
	}
	cardMasterElement() {
		var temporaryElement = document.createElement('div')
		temporaryElement.id = 'uniqueNumber' + this.uniqueNumber
		temporaryElement.classList.add('cardMasterElement', 'interactable')
		temporaryElement.innerHTML = '<span class="handle">|||</span><div style="grid-column: 2 / 4">' + this.name + '</div><span></span>'
		return temporaryElement
	}
}
class cardImage {
	constructor(displayName = 'cardImage', imageSource = '/data/images/cardImages/blank.png', x = 0, y = 0, width = 1, height = 1, opacity = 1, masks = ['Full'], erase = false) {
		this.name = displayName
		this.image = new Image()
		this.image.crossOrigin = 'anonymous';
		this.image.src = fixUri(imageSource)
		this.imageSource = fixUri(imageSource)
		this.x = x
		this.y = y
		this.width = width
		this.height = height
		this.opacity = opacity
		this.masks = masks
		this.erase = erase
		this.uniqueNumber = uniqueNumberTracker
		uniqueNumberTracker += 1
	}
	draw() {
		frameMasksContext.clearRect(0, 0, frameMasksCanvas.width, frameMasksCanvas.height)
		if (this.masks.length > 0 && this.masks != 'Full') {
			frameMasksContext.drawImage(maskImageList[maskNameList.indexOf(this.masks[0])], scaleX(totalShift[0]), scaleY(totalShift[1]), cardWidth, cardHeight)
			frameMasksContext.globalCompositeOperation = 'source-in'
			for (var i = 1; i < this.masks.length; i++) {
				frameMasksContext.drawImage(maskImageList[maskNameList.indexOf(this.masks[i])], scaleX(totalShift[0]), scaleY(totalShift[1]), cardWidth, cardHeight)
			}
			frameMasksContext.drawImage(this.image, scaleX(this.x + totalShift[0]), scaleY(this.y + totalShift[1]), scaleX(this.width), scaleY(this.height))
			frameMasksContext.globalCompositeOperation = 'source-over'
		} else {
			frameMasksContext.drawImage(this.image, scaleX(this.x + totalShift[0]), scaleY(this.y + totalShift[1]), scaleX(this.width), scaleY(this.height))
		}
		mainContext.globalAlpha = this.opacity
		if (this.erase) {
			mainContext.globalCompositeOperation = 'destination-out'
		} else {
			mainContext.globalCompositeOperation = 'source-over'
		}
		mainContext.drawImage(frameMasksCanvas, 0, 0, frameMasksCanvas.width, frameMasksCanvas.height)
		// mainContext.globalCompositeOperation = 'source-over'
	}
	cardMasterElement() {
		var temporaryElement = document.createElement('div')
		temporaryElement.id = 'uniqueNumber' + this.uniqueNumber
		temporaryElement.classList.add('cardMasterElement', 'interactable')
		temporaryElement.innerHTML = '<div class="handle">|||</div><div><img src="' + this.image.src + '"><img src="' + maskImageList[maskNameList.indexOf(this.masks[0])].src + '"></div><div>' + this.name + ' - ' + this.masks.toString().replace(',', ', ') + '</div><span class="delete" onclick="deleteCardObject(event)">X</span>'
		temporaryElement.onclick = function() {
			if (document.getElementById('cardMasterElementEditor').classList.contains('hidden') && !deletingCardObject) {
				document.getElementById('cardMasterElementEditor').classList.remove('hidden')
			} else {
				deletingCardObject = false
			}
			selectedCardMasterElement = parseInt(this.id.replace('uniqueNumber', ''))
			var selectedObject = cardMasterList[selectedCardMasterElement]
			document.getElementById('cardMasterElementEditorX').value = scaleX(selectedObject.x)
			document.getElementById('cardMasterElementEditorY').value = scaleY(selectedObject.y)
			document.getElementById('cardMasterElementEditorScale').value = scaleX(selectedObject.width)
			document.getElementById('cardMasterElementEditorOpacity').value = selectedObject.opacity * 100
			document.getElementById('cardMasterElementEditorErase').checked = selectedObject.erase
			Array.from(document.getElementById('cardMaster').children).forEach(element => element.classList.remove('selected'))
			this.classList.add('selected')
		}
		return temporaryElement
	}
}
class cardText {
	constructor(displayName, text, x, y, width, height, font, fontSize, fontColor, other = []) {
		this.name = displayName
		this.text = text
		this.x = x
		this.y = y
		this.width = width
		this.height = height
		this.font = font
		this.fontSize = fontSize
		this.fontColor = fontColor
		this.otherParameters = other
	}
}

function scaleX(xToScale) {
	return Math.round(xToScale * cardWidth)
}
function scaleY(yToScale) {
	return Math.round(yToScale * cardHeight)
}

function drawCardObjects() {
	mainContext.clearRect(0, 0, mainCanvas.width, mainCanvas.height)
	previewContext.clearRect(0, 0, cardWidth, cardHeight)
	var cardMasterChildren = cardMaster.children
	for (var i = cardMasterChildren.length - 1; i >= 0; i--) {
		var uniqueNumber = parseInt(cardMasterChildren[i].id.replace('uniqueNumber', ''))
		for (var n = 0; n < cardMasterList.length; n++) {
			if (cardMasterList[n].uniqueNumber == uniqueNumber) {
				cardMasterList[n].draw()
			}
		}
	}
	mainContext.drawImage(setSymbol, setSymbolDrawX + getFloat('inputSetSymbolX') + scaleX(totalShift[0]), setSymbolDrawY + getFloat('inputSetSymbolY') + scaleY(totalShift[1]), setSymbolDrawWidth * getFloat('inputSetSymbolZoom') / 100, setSymbolDrawHeight * getFloat('inputSetSymbolZoom') / 100)
	mainContext.drawImage(bottomInfoCanvas, scaleX(totalShift[0]), scaleY(totalShift[1]), cardWidth, cardHeight)
	mainContext.globalCompositeOperation = 'destination-over'
    mainContext.drawImage(cardArt, scaleX(cardMasterList[0].x + totalShift[0]), scaleY(cardMasterList[0].y + totalShift[1]), scaleX(cardMasterList[0].width) * cardMasterList[0].zoom, scaleY(cardMasterList[0].height) * cardMasterList[0].zoom)
	mainContext.globalCompositeOperation = 'destination-out'
	//draw the corner cutters
	if (currentVersion != 'bleedEdge/version') {
		mainContext.drawImage(cornerCutout, 0, 0, scaleX(59/1500), scaleX(59/1500))
		mainContext.rotate(Math.PI / 2)
		mainContext.drawImage(cornerCutout, 0, -cardWidth, scaleX(59/1500), scaleX(59/1500))
		mainContext.rotate(Math.PI / 2)
		mainContext.drawImage(cornerCutout, -cardWidth, -cardHeight, scaleX(59/1500), scaleX(59/1500))
		mainContext.rotate(Math.PI / 2)
		mainContext.drawImage(cornerCutout, -cardHeight, 0, scaleX(59/1500), scaleX(59/1500))
		mainContext.rotate(Math.PI / 2)
	}
	//preview the card
	mainContext.globalCompositeOperation = 'source-over'
	if (cardWidth < cardHeight) {
		previewContext.drawImage(mainCanvas, 0, 0, previewCanvas.width, previewCanvas.height)
	} else {
		previewContext.drawImage(mainCanvas, 0, 0, previewCanvas.height, previewCanvas.width)
	}
}

class frameImage {
	constructor(displayName = 'custom', imageSource = '', x = 0, y = 0, width = 1, height = 1, masks = [], frameImageListIndex, frameClass) {
		this.name = displayName
		this.image = new Image()
		this.image
		this.image.crossOrigin = 'anonymous'
		this.image.src = fixUri(imageSource)
		this.x = x
		this.y = y
		this.width = width
		this.height = height
		this.masks = masks
		this.framePickerElement = document.createElement('div')
        this.framePickerElement.id = 'frameIndex' + frameImageListIndex
        this.framePickerElement.classList.add(frameClass, 'interactable')
        this.framePickerElement.onclick = this.frameOptionClicked
        this.framePickerElement.innerHTML = '<img src=' + this.image.src + '>'
        document.getElementById('framePicker').appendChild(this.framePickerElement)
	}
	frameOptionClicked() {
		Array.from(document.getElementById('framePicker').children).forEach(element => element.classList.remove('selected'))
		this.classList.add('selected')
		if (parseInt(this.id.replace('frameIndex', '')) != selectedFrameImage) {
			selectedFrameImage = parseInt(this.id.replace('frameIndex', ''))
			document.getElementById('maskPicker').innerHTML = ''
			frameImageList[parseInt(this.id.replace('frameIndex', ''))].masks.forEach(array => document.getElementById('maskPicker').innerHTML += '<div id="maskOption' + maskNameList.indexOf(array) + '" class="interactable" onclick="maskOptionClicked(event)"><img src="' + maskImageList[maskNameList.indexOf(array)].src + '">' + array + '</div>')
			document.getElementById('maskPicker').children[0].classList.add('selected')
			selectedMaskImage = parseInt(document.getElementById('maskPicker').children[0].id.replace('maskOption', ''))
			updateSelectedFramePreview()
		}
	}
}
function maskOptionClicked(event) {
	Array.from(document.getElementById('maskPicker').children).forEach(element => element.classList.remove('selected'))
	if (event.target.nodeName == 'IMG') {
		event.target.parentElement.classList.add('selected')
		selectedMaskImage = parseInt(event.target.parentElement.id.replace('maskOption', ''))
	} else {
		event.target.classList.add('selected')
		selectedMaskImage = parseInt(event.target.id.replace('maskOption', ''))
	}
	updateSelectedFramePreview()
}
function updateSelectedFramePreview() {
	document.getElementById('previewSelectedFrame').innerHTML = '(Selected: ' + frameImageList[selectedFrameImage].name + ' with a ' + maskNameList[selectedMaskImage] + ' mask.)'
}

function loadFramePackOptions(listOfFramePacks) {
	var framePackHTML = ''
	for (var i = 0; i < listOfFramePacks.length; i++) {
		var framePackOptionDisabled = ''
		if (listOfFramePacks[i][0] == 'disabled') {
			framePackOptionDisabled = 'disabled '
		}
		framePackHTML += '<option ' + framePackOptionDisabled + 'value="' + listOfFramePacks[i][0] + '">' + listOfFramePacks[i][1] + '</option>'
	}
	document.getElementById('inputFramePack').innerHTML = framePackHTML
	loadScript('/data/scripts/versions/' + document.getElementById('inputFrameVersion').value + '/regular.js')
}
function loadMaskImages(listOfMasks) {
	for (var i = 0; i < listOfMasks.length; i++) {
		if (!maskNameList.includes(listOfMasks[i][0])) {
			var maskImage = new Image()
			maskImage.crossOrigin = 'anonymous';
			maskImage.src = fixUri(listOfMasks[i][1])
			maskImageList.push(maskImage)
			maskNameList.push(listOfMasks[i][0])
		}

	}
}
function loadFrameImages(listOfFrames, frameClass) {
    var firstFrameIndex = 0
	for (var i = 0; i < listOfFrames.length; i++) {
        if (i == 0) {
            firstFrameIndex = frameImageList.length
        }
		frameImageList.push(new frameImage(...listOfFrames[i], frameImageList.length, frameClass))
	}
    frameImageList[firstFrameIndex].framePickerElement.click()
}

//Loads up anything that uses Sortable.js
var sortable = Sortable.create(cardMaster, {animation: 150, ghostClass: 'cardMasterElementMoving', handle: '.handle'})

function deleteCardObject(event) {
	var isItPT = event.target.parentElement.children[2].innerHTML.includes('Power/Toughness')
	cardMaster.removeChild(document.getElementById('uniqueNumber' + parseInt(event.target.parentElement.id.replace('uniqueNumber', ''))))
	selectedCardMasterElement = -1
	if (isItPT) {
		bottomInfoUpdated()
	} else {
		drawCardObjects()
	}
	deletingCardObject = true
	document.getElementById('cardMasterElementEditor').classList.add('hidden')
}

function addSelectedFrame(additionalMasks = []) {
	var selectedFrameObject = frameImageList[selectedFrameImage]
	var masksToUse = additionalMasks
	masksToUse.unshift(maskNameList[selectedMaskImage])
	var objectToInsert = cardMasterList.push(new cardImage(selectedFrameObject.name, selectedFrameObject.image.src, selectedFrameObject.x, selectedFrameObject.y, selectedFrameObject.width, selectedFrameObject.height, 1, masksToUse, false))
	cardMaster.insertBefore(cardMasterList[objectToInsert - 1].cardMasterElement(), cardMaster.children[1])
	if (selectedFrameObject.name.includes('Power/Toughness')) {
		bottomInfoUpdated()
	} else {
		drawCardObjects()
	}
	// setTimeout(drawCardObjects, 100)
}

function cardMasterElementEdited() {
	var selectedObject = cardMasterList[selectedCardMasterElement]
	selectedObject.x = getFloat('cardMasterElementEditorX') / cardWidth
	selectedObject.y = getFloat('cardMasterElementEditorY') / cardHeight
	selectedObject.height = selectedObject.height / selectedObject.width * getFloat('cardMasterElementEditorScale') / cardWidth
	selectedObject.width = getFloat('cardMasterElementEditorScale') / cardWidth
	selectedObject.opacity = getFloat('cardMasterElementEditorOpacity') / 100
	selectedObject.erase = document.getElementById('cardMasterElementEditorErase').checked
	drawCardObjects()
}

function getFloat(input) {
	var getFloatResponse = parseFloat(document.getElementById(input).value)
	if (getFloatResponse) {
		return getFloatResponse
	} else {
		return 0
	}
}

function loadTextOptions(textArray = []) {
	document.getElementById('textPicker').innerHTML = ''
	var backupTextValues = cardTextList
	if (skipLoadTextList < 1) {
		cardTextList = textArray
	}
	for (var i = 0; i < cardTextList.length; i++) {
		for (var n = 0; n < backupTextValues.length; n++) {
			if (cardTextList[i].name == backupTextValues[n].name && skipLoadTextList < 1) {
				cardTextList[i].text = backupTextValues[n].text
			}
		}
		document.getElementById('textPicker').innerHTML += '<div id="' + i + '" onclick="textOptionClicked(event, ' + i + ')" class="interactable">' + cardTextList[i].name + '</div>'
	}
	document.getElementById('textPicker').children[0].click()
	cardTextEdited()
	if (setSymbol.src != '') {
		setSymbol.onload()
	}
	if (cardArt.src != '') {
		cardArt.onload()
	} else if (skipResizeCardArt > 0) {
		skipResizeCardArt -= 1
	}
	if (skipLoadTextList > 0) {
		skipLoadTextList -= 1
	}
	manaCostUpdated()
	bottomInfoUpdated()
}
function textOptionClicked(event, index) {
	Array.from(document.getElementById('textPicker').children).forEach(element => element.classList.remove('selected'))
	event.target.classList.add('selected')
	selectedTextObject = cardTextList[index]
	document.getElementById('textEditorText').value = selectedTextObject.text
	document.getElementById('textEditorX').value = scaleX(selectedTextObject.x)
	document.getElementById('textEditorY').value = scaleY(selectedTextObject.y)
	document.getElementById('textEditorWidth').value = scaleX(selectedTextObject.width)
	document.getElementById('textEditorHeight').value = scaleY(selectedTextObject.height)
}
function cardTextEdited() {
	selectedTextObject.text = document.getElementById('textEditorText').value
	selectedTextObject.x = document.getElementById('textEditorX').value / cardWidth
	selectedTextObject.y = document.getElementById('textEditorY').value / cardHeight
	selectedTextObject.width = document.getElementById('textEditorWidth').value / cardWidth
	selectedTextObject.height = document.getElementById('textEditorHeight').value / cardHeight
	drawCardText()
	if (selectedTextObject.name == 'Power/Toughness') {
		bottomInfoUpdated()
	}
}
function drawCardTextReal() {
	textContext.clearRect(0, 0, cardWidth, cardHeight)
	writeText(cardTextList, textContext)
}
function drawCardText() {
    clearTimeout(updateTextDelay)
    updateTextDelay = setTimeout(drawCardTextReal, 250)
}
function writeText(textObjectList, targetContext) {
	var textCanvasBuffer = 100
	var rewritingLine = false
	var textSize, textFont
	var savedTextX = 0
	outerloop:
	for (var i = 0; i < textObjectList.length; i++) {
		//FINDME - TESTING PURPOSES ONLY
		if (URLParams.get('copyright') != null && textObjectList[i].text.includes('\u2122 & \u00a9 ' + date.getFullYear() + ' Wizards of the Coast') && currentVersion.includes('bleedEdge')) {
			textObjectList[i].text = textObjectList[i].text.replace('\u2122 & \u00a9 ' + card.infoYear + ' Wizards of the Coast', URLParams.get('copyright'))
		}
		if (!rewritingLine) {
			textSize = scaleY(textObjectList[i].fontSize)
		} else {
			var fontSizeCode = textObjectList[i].text.split(/\n| |{line}/)[0].toLowerCase()
			if (fontSizeCode.includes('{fontsize') && fontSizeCode.includes('}') && fontSizeCode.split('{fontsize')[1].indexOf('}') != -1 && fontSizeCode.split('{fontsize')[1].indexOf('}') < 4) {
				textSize = scaleY(textObjectList[i].fontSize)
				var fontSizeCodeStart = fontSizeCode.indexOf('{fontsize') + 9
				var fontSizeCodeValueLength = fontSizeCode.split('{fontsize')[1].indexOf('}')
				var fontSizeCodeValue = fontSizeCode.slice(fontSizeCodeStart, fontSizeCodeValueLength + fontSizeCodeStart)
				if (!parseInt(fontSizeCodeValue) && parseInt(fontSizeCodeValue) != 0) {
					textObjectList[i].text = textObjectList[i].text.replace('{fontsize' + fontSizeCodeValue + '}', '{fontsize0}')
					if (document.getElementById('textPicker').children[i].classList.contains('selected')) {
						var savedCursorPosition = document.getElementById('textEditorText').selectionStart - document.getElementById('textEditorText').value.length
						document.getElementById('textEditorText').value = textObjectList[i].text
						savedCursorPosition += document.getElementById('textEditorText').value.length
						document.getElementById('textEditorText').selectionStart = savedCursorPosition
						document.getElementById('textEditorText').selectionEnd = savedCursorPosition
					}
					rewritingLine = true
					i -= 1
					continue outerloop
				} else {
					fontSizeCodeValue = parseInt(fontSizeCodeValue)
					if (!fontSizeCodeValue) {
						fontSizeCodeValue = 0
					}
					textObjectList[i].text = textObjectList[i].text.replace('{fontsize' + fontSizeCodeValue + '}', '{fontsize' + (fontSizeCodeValue - 1) + '}')
					if (document.getElementById('textPicker').children[i].classList.contains('selected')) {
						var savedCursorPosition = document.getElementById('textEditorText').selectionStart - document.getElementById('textEditorText').value.length
						document.getElementById('textEditorText').value = textObjectList[i].text
						savedCursorPosition += document.getElementById('textEditorText').value.length
						document.getElementById('textEditorText').selectionStart = savedCursorPosition
						document.getElementById('textEditorText').selectionEnd = savedCursorPosition
					}
				}
			} else {
				textSize -= 1
			}
		}
		rewritingLine = false
		textLineCanvas.width = scaleX(textObjectList[i].width) + 2 * textCanvasBuffer
		textLineCanvas.height = textSize + 2 * textCanvasBuffer
		textParagraphCanvas.width = scaleX(textObjectList[i].width) + 2 * textCanvasBuffer
		textParagraphCanvas.height = scaleY(textObjectList[i].height) + 2 * textCanvasBuffer
		textLineContext.clearRect(0, 0, textLineCanvas.width, textLineCanvas.height)
		textParagraphContext.clearRect(0, 0, textParagraphCanvas.width, textParagraphCanvas.height)
		var outlineColor = 'black', outline = false, shadow = 0, oneLine = false, outlineThickness = 2, textAlign = 'left', finishLine = false, paragraphSpace = 0, permanentLineShift = 0, temporaryLineShift = 0, fontStyle = '', textFontExtension = '', manaCost = false, canWriteText = true
		textObjectList[i].otherParameters.forEach(item => eval(item))
		textLineContext.shadowOffsetX = shadow
		textLineContext.shadowOffsetY = shadow
		textLineContext.shadowBlur = 0
		textLineContext.shadowColor = 'black'
		textLineContext.strokeStyle = outlineColor
		textLineContext.lineWidth = outlineThickness
		textFont = textObjectList[i].font
		textLineContext.font = fontStyle + textSize + 'px ' + textFont + textFontExtension
		var currentFontColor = textObjectList[i].fontColor
		textLineContext.fillStyle = currentFontColor
		var textX = textCanvasBuffer
		var textY = 0
		var currentLineWidth = 0
		var splitText = textObjectList[i].text.replace(/\n/g, '{line}').replace(/{flavor}/g, '{lns}{bar}{lns}{i}').replace(/{/g, 'fh48a3h2{').replace(/}/g, '}fh48a3h2').replace(/ /g, 'fh48a3h2 fh48a3h2').split('fh48a3h2')
		if (manaCost) {
			splitText = '{' + textObjectList[i].text.replace(/\n/g, '').replace(/{/g, ' ').replace(/}/g, ' ').replace(/ /g, '}fh48a3h2{right4}fh48a3h2{') + '}'
			splitText = splitText.split('fh48a3h2')
		}
		splitText.push('')
		innerloop:
		for (var n = 0; n < splitText.length; n++) {
			if (splitText[n] != '' || n == splitText.length - 1) {
				wordToWrite = ''
				if (splitText[n][0] == '{' && splitText[n][splitText[n].length - 1] == '}') {
					var possibleCodeLower = splitText[n].substr(1, splitText[n].length - 2).toLowerCase()
					if (possibleCodeLower == 'line' && !oneLine) {
						finishLine = true
						paragraphSpace += textSize * 0.35
					} else if ((possibleCodeLower == 'linenospace' || possibleCodeLower == 'lns') && !oneLine) {
						finishLine = true
					} else if ((possibleCodeLower == 'bar' || possibleCodeLower == 'flavor') && !oneLine) {
						var barWidth = scaleX(textObjectList[i].width) * 0.95
						var barHeight = scaleY(0.002)
						var barImageName = 'bar'
						if (currentFontColor == 'white') {
							barImageName = 'whitebar'
						}
						textLineContext.drawImage(manaSymbolImageList[manaSymbolCodeList.indexOf(barImageName)], textCanvasBuffer + (scaleX(textObjectList[i].width) - barWidth) / 2, textSize * 0.8 + textCanvasBuffer, barWidth, barHeight)
						currentLineWidth = scaleX(textObjectList[i].width)
					} else if (possibleCodeLower == 'i') {
						if (textFont == 'mplantin' && !textFontExtension.includes('i')) {
							textFontExtension += 'i'
							textLineContext.font = fontStyle + textSize + 'px ' + textFont + textFontExtension
						} else if (!fontStyle.includes('italic')) {
							fontStyle += 'italic '
							textLineContext.font = fontStyle + textSize + 'px ' + textFont + textFontExtension
						}
					} else if (possibleCodeLower == '/i') {
						if (textFont == 'mplantin') {
							textFontExtension = textFontExtension.replace('i', '')
							textLineContext.font = fontStyle + textSize + 'px ' + textFont + textFontExtension
						} else {
							fontStyle = fontStyle.replace('italic ', '')
							textLineContext.font = fontStyle + textSize + 'px ' + textFont + textFontExtension
						}
					} else if (possibleCodeLower.includes('fontsize')) {
						if (parseInt(possibleCodeLower.slice(8, possibleCodeLower.length))) {
							textSize += parseInt(possibleCodeLower.slice(8, possibleCodeLower.length))
							textLineContext.font = fontStyle + textSize + 'px ' + textFont + textFontExtension
						}
					} else if (possibleCodeLower == 'left') {
						textAlign = 'left'
					} else if (possibleCodeLower == 'center') {
						textAlign = 'center'
					} else if (possibleCodeLower == 'right') {
						textAlign = 'right'
					} else if (possibleCodeLower.includes('right')) {
						textX += parseInt(possibleCodeLower.replace('right', ''))
						currentLineWidth += parseInt(possibleCodeLower.replace('right', ''))
						permanentLineShift += parseInt(possibleCodeLower.replace('right', ''))
					} else if (possibleCodeLower.includes('left')) {
						textX -= parseInt(possibleCodeLower.replace('left', ''))
						currentLineWidth -= parseInt(possibleCodeLower.replace('left', ''))
						permanentLineShift -= parseInt(possibleCodeLower.replace('left', ''))
					} else if (possibleCodeLower.includes('up')) {
						finishLine = true
						paragraphSpace -= parseInt(possibleCodeLower.replace('up', '')) + textSize
						temporaryLineShift += currentLineWidth
					} else if (possibleCodeLower.includes('down')) {
						finishLine = true
						paragraphSpace += parseInt(possibleCodeLower.replace('down', '')) - textSize
						temporaryLineShift += currentLineWidth
					} else if (possibleCodeLower == 'savetextx') {
						savedTextX = textX
					} else if (possibleCodeLower == 'loadtextx') {
						textX = savedTextX
					} else if (possibleCodeLower.includes('outline:')) {
						if (parseInt(possibleCodeLower.replace('outline:', '').split(',')[1]) == 0) {
							outline = false
						} else {
							outline = true
		                    textLineContext.strokeStyle = possibleCodeLower.replace('outline:', '').split(',')[0]
		                    textLineContext.lineWidth = parseInt(possibleCodeLower.replace('outline:', '').split(',')[1])
						}
	                } else if (possibleCodeLower.includes('shadow')) {
	                    var shadowOffset = parseInt(possibleCodeLower.replace('shadow', ''))
	                    textLineContext.shadowOffsetX = shadowOffset
	                    textLineContext.shadowOffsetY = shadowOffset
	                } else if (possibleCodeLower.includes('fontcolor')) {
	                	currentFontColor = possibleCodeLower.slice(9, possibleCodeLower.length)
	                	textLineContext.fillStyle = currentFontColor
	                } else if (possibleCodeLower == 'star') {
	                	var starWidth = textSize * 0.7
	                	var starSpace = textSize * 0.18
						textLineContext.drawImage(manaSymbolImageList[manaSymbolCodeList.indexOf('star')], textX + starSpace, textCanvasBuffer + textSize - starWidth * 1.01, starWidth, starWidth * 91/96)
						textX += starWidth + starSpace * 2
						currentLineWidth += starWidth + starSpace * 2
	                } else if (possibleCodeLower == 'artistbrush') {
	                	var artistBrushWidth = textSize * 1.08
						textLineContext.drawImage(manaSymbolImageList[manaSymbolCodeList.indexOf('artistbrush')], textX, textCanvasBuffer + textSize - artistBrushWidth * 0.63, artistBrushWidth, artistBrushWidth * 59 / 101)
						textX += artistBrushWidth * 1.1
						currentLineWidth += artistBrushWidth * 1.1
	                } else if (possibleCodeLower == 'oldartistbrush') {
	                    var artistBrushWidth = textSize * 2.4
	                    if (textLineContext.fillStyle == '#ffffff' || textLineContext.fillStyle == 'white') {
	                        textLineContext.drawImage(manaSymbolImageList[manaSymbolCodeList.indexOf('whiteBrush')], textX, textCanvasBuffer + textSize - artistBrushWidth * 13 / 63, artistBrushWidth, artistBrushWidth * 13 / 63);
	                    } else {
	                        textLineContext.drawImage(manaSymbolImageList[manaSymbolCodeList.indexOf('blackBrush')], textX, textCanvasBuffer + textSize - artistBrushWidth * 13 / 63, artistBrushWidth, artistBrushWidth * 13 / 63);
	                    }
	                    textX += artistBrushWidth * 1.1
	                    currentLineWidth += artistBrushWidth * 1.1
	                } else if (possibleCodeLower.includes('font')) {
						textFont = possibleCodeLower.replace('font', '')
						textLineContext.font = fontStyle + textSize + 'px ' + textFont + textFontExtension
					} else if (possibleCodeLower == 'planechase') {
						textLineContext.drawImage(manaSymbolImageList[manaSymbolCodeList.indexOf('chaos')], textX, textCanvasBuffer + textSize - scaleX(40/2100), scaleX(102/2100), scaleX(85/2100))
						textX += scaleX(125/2100)
						currentLineWidth += scaleX(125/2100)
						permanentLineShift += scaleX(125/2100)
					} else if (manaSymbolCodeList.includes(possibleCodeLower.split('/').reverse().join(''))) {
						//THIS HAS TO BE THE LAST ONE
						var manaSymbolDiameter = textSize * 0.78
						if (manaCost && manaCostShadowOffset != 'none') {
							var shadowOffset = eval(manaCostShadowOffset)
							textLineContext.beginPath()
							textLineContext.arc(textX + manaSymbolDiameter / 2 + shadowOffset[0], textCanvasBuffer + textSize - manaSymbolDiameter * 0.45 + shadowOffset[1], manaSymbolDiameter / 2, 0, 2 * Math.PI)
							textLineContext.fill()
						}
						textLineContext.drawImage(manaSymbolImageList[manaSymbolCodeList.indexOf(possibleCodeLower.split('/').reverse().join(''))], textX, textCanvasBuffer + textSize - manaSymbolDiameter * 0.95, manaSymbolDiameter, manaSymbolDiameter)
						currentLineWidth += manaSymbolDiameter * 1.13
						textX += manaSymbolDiameter * 1.13
					} else {
						wordToWrite = splitText[n]
					}
				} else {
					wordToWrite = splitText[n]
				}
				if (!canWriteText) {
					wordToWrite = ''
				}
				if (wordToWrite != '' || n == splitText.length - 1 || finishLine) {
					var currentWordWidth = textLineContext.measureText(wordToWrite).width
					if (currentWordWidth + currentLineWidth > scaleX(textObjectList[i].width) || n == splitText.length - 1 || finishLine) {
						if (oneLine && currentWordWidth + currentLineWidth > scaleX(textObjectList[i].width) && textSize > 1) {
							rewritingLine = true
							i -= 1
							continue outerloop
						}
						var textAlignShift = 0
						if (textAlign == 'center') {
							textAlignShift = (scaleX(textObjectList[i].width) - currentLineWidth) / 2
						} else if (textAlign == 'right') {
							textAlignShift = scaleX(textObjectList[i].width) - currentLineWidth
						}
						textParagraphContext.drawImage(textLineCanvas, 0 + textAlignShift, textY, textLineCanvas.width, textLineCanvas.height)
						if (n != splitText.length - 1) {
							textLineContext.clearRect(0, 0, textLineCanvas.width, textLineCanvas.height)
							textX = textCanvasBuffer + permanentLineShift + temporaryLineShift
							currentLineWidth = 0 + permanentLineShift + temporaryLineShift
							textY += textSize + paragraphSpace
							paragraphSpace = 0
							temporaryLineShift = 0
							finishLine = false
							if (wordToWrite == " ") {
								continue innerloop
							}
						}
					}
					if (outline == true) {
						textLineContext.strokeText(wordToWrite, textX, textCanvasBuffer + textSize)
					}
					textLineContext.fillText(wordToWrite, textX, textCanvasBuffer + textSize)
					currentLineWidth += currentWordWidth
					textX += currentWordWidth
				}
			}
			if (n == splitText.length - 1) { //Finally, center the paragraph vertically
				if (textY + textSize > scaleY(textObjectList[i].height) && !oneLine && textSize > 1) {
					rewritingLine = true
					i -= 1
					continue outerloop
				}
				targetContext.drawImage(textParagraphCanvas, scaleX(textObjectList[i].x) - textCanvasBuffer, scaleY(textObjectList[i].y) - textCanvasBuffer - textSize + (scaleY(textObjectList[i].height) - textY - textSize) / 2, textParagraphCanvas.width, textParagraphCanvas.height)
			}
		}
	}
	drawCardObjects()
}

function uploadImage(event, destination) {
	var input = event.target
	var reader = new FileReader()
	reader.onload = function() {
		var dataURL = reader.result
		destination.src = dataURL
	}
	reader.readAsDataURL(input.files[0])
}

function cardArtUpdated() {
	cardMasterList[0].x = getFloat('inputCardArtX') / cardWidth
	cardMasterList[0].y = getFloat('inputCardArtY') / cardHeight
	cardMasterList[0].zoom = getFloat('inputCardArtZoom') / 100
	drawCardObjects()
}

var savedArtList = [], cardArtUrlList = [], cardArtArtistList = []
function inputCardArtName(cardArtNameInput) {
	var xhttp = new XMLHttpRequest()
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			savedArtList = this.responseText.split('"art_crop":"')
			savedArtList.splice(0, 1)
			document.getElementById('inputCardArtNameNumber').max = savedArtList.length
			document.getElementById('inputCardArtNameNumber').value = 1
			for (i = 0; i < savedArtList.length; i ++) {
				cardArtUrlList[i] = savedArtList[i].split('","border_crop":')[0]
			}
			for (i = 0; i < savedArtList.length; i ++) {
				cardArtArtistList[i] = savedArtList[i].slice(savedArtList[i].indexOf('"artist":"') + 10, savedArtList[i].indexOf('","artist_id'))
			}
			inputCardArtNameNumber(1)
		} else if (this.readyState == 4 && this.status == 404 && cardArtNameInput != '') {
			notify("Sorry, but we can't seem to find any art for '" + cardArtNameInput + "'", '#ffffaae0')
		}
	}
	xhttp.open('GET', 'https://api.scryfall.com/cards/search?order=released&unique=art&q=name%3D' + cardArtNameInput.replace(/ /g, '_'), true)
	xhttp.send()
}
function inputCardArtNameNumber(cardArtNameNumberInput) {
	var temporaryCardArt = new Image()
	temporaryCardArt.crossOrigin = 'anonymous'
	temporaryCardArt.onload = function() {
		cardArt.src = this.src
	}
	temporaryCardArt.src = cardArtUrlList[cardArtNameNumberInput - 1]
	document.getElementById('inputInfoArtist').value = cardArtArtistList[cardArtNameNumberInput - 1]
	document.getElementById('inputInfoArtist2').value = document.getElementById('inputInfoArtist').value
	bottomInfoUpdated()
}

function initialize() {
	//Card stuff
	cardMasterList.push(new cardPlaceholder('Card Art Placeholder', cardArt))
	cardMasterList.push(new cardPlaceholder('Text Placeholder', textCanvas))
	cardMaster.insertBefore(cardMasterList[0].cardMasterElement(), cardMaster.children[0])
	cardMaster.insertBefore(cardMasterList[1].cardMasterElement(), cardMaster.children[0])
	document.getElementById('inputInfoNumber').value = date.getFullYear()
	window.updateTextDelay = setTimeout(drawCardTextReal, 250)
	setTimeout(bottomInfoUpdated, 500)
	textCodeReference()
	notify("You are currently using the old version of Card Conjurer. Please go to <a href='https://cardconjurer.com/creator/'>the new version</a> if you are here by mistake.", '#ffffaae0')
}

function bottomInfoUpdated() {
	window[bottomInfoFunction]()
}

function uploadLocalFrameImage(event) {
	var input = event.target
	var reader = new FileReader()
	reader.onload = function() {
		addUploadedFrameImage(reader.result)
	}
	reader.readAsDataURL(input.files[0])
}

function addUploadedFrameImage(imageSource) {
	frameImageList.push(new frameImage('custom', imageSource, 0, 0, 1, 1, maskNameList, frameImageList.length, 'frameClassCustom'))
}

function manaCostUpdated() {
	usedManaSymbols = []
	manaCostContext.clearRect(0, 0, cardWidth, cardHeight)
	var manaCostList = document.getElementById('inputManaCost').value.toLowerCase().replace(/{/g, ' ').replace(/}/g, ' ').split(' ')
	var manaSymbolIndex = -1
	manaCostCanvas.fillStyle = 'black'
	if (manaCostDirection == 'reverse') {
		manaCostList.reverse()
	}
	for (var i = 0; i < manaCostList.length; i++) {
		if (manaSymbolCodeList.includes(manaCostList[i].split('/').reverse().join(''))) {
			usedManaSymbols.push(manaCostList[i])
			manaSymbolIndex += 1
			var x = eval(manaCostXPath)
			var y = eval(manaCostYPath)
			var diameter = eval(manaCostDiameter)
			if (manaCostShadowOffset != 'none' && !manaCostList[i].includes('m21')) {
				var shadowOffset = eval(manaCostShadowOffset)
				manaCostContext.beginPath()
				manaCostContext.arc(x + diameter / 2 + shadowOffset[0], y + diameter / 2 + shadowOffset[1], diameter / 2, 0, 2 * Math.PI)
				manaCostContext.fill()
			}
			manaCostContext.drawImage(manaSymbolImageList[manaSymbolCodeList.indexOf(manaCostList[i].split('/').reverse().join(''))], x, y, diameter, diameter)
		}
	}
	drawCardObjects()
}



function watermarkUpdated() {
	if (document.getElementById('inputWatermarkPrimary').value != 'none') {
		watermarkContext.clearRect(0, 0, cardWidth, cardHeight)
		if (watermarkWidth / watermarkHeight < watermark.width / watermark.height) {
			watermarkDrawWidth = watermarkWidth
			watermarkDrawHeight = watermarkWidth / watermark.width * watermark.height
		} else {
			watermarkDrawHeight = watermarkHeight
			watermarkDrawWidth = watermarkHeight / watermark.height * watermark.width
		}
		watermarkDrawX = watermarkX - watermarkDrawWidth / 2
		watermarkDrawY = watermarkY - watermarkDrawHeight / 2
		watermarkContext.drawImage(watermark, watermarkDrawX, watermarkDrawY, watermarkDrawWidth, watermarkDrawHeight)
		watermarkContext.globalCompositeOperation = 'source-in'
		if (document.getElementById('inputWatermarkPrimary').value != 'default') {
			watermarkContext.fillStyle = document.getElementById('inputWatermarkPrimary').value
			watermarkContext.fillRect(0, 0, cardWidth, cardHeight)
		}
		if (document.getElementById('inputWatermarkSecondary').value != 'none') {
			watermarkContext.globalCompositeOperation = 'source-atop'
			tempContext.clearRect(0, 0, cardWidth, cardHeight)
			tempContext.drawImage(maskImageList[maskNameList.indexOf('Right Half')], 0, 0, cardWidth, cardHeight)
			tempContext.globalCompositeOperation = 'source-in'
			if (document.getElementById('inputWatermarkSecondary').value == 'default') {
				tempContext.drawImage(watermark, watermarkDrawX, watermarkDrawY, watermarkDrawWidth, watermarkDrawHeight)
			} else {
				tempContext.fillStyle = document.getElementById('inputWatermarkSecondary').value
				tempContext.fillRect(0, 0, cardWidth, cardHeight)
			}
			tempContext.globalCompositeOperation = 'source-over'
			watermarkContext.drawImage(tempCanvas, 0, 0, cardWidth, cardHeight)
		}
		watermarkContext.globalCompositeOperation = 'source-over'
	} else {
		watermarkContext.clearRect(0, 0, cardWidth, cardHeight)
	}
    drawCardObjects()
}

var savedImportResponse = ''
function inputCardNameTextImport(cardName) {
    var xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            savedImportResponse = this.responseText.split('{"object":"card"')
            inputCardNameNumberTextImport(1)
            document.getElementById('inputCardNameNumberTextImport').max = savedImportResponse.length - 1
            document.getElementById('inputCardNameNumberTextImport').value = 1
        } else if (this.readyState == 4 && this.status == 404 && cardName != '') {
            savedImportResponse = ''
            notify("Sorry, but we can't seem to find any card named '" + cardName + "'", '#ffffaae0')
        }
    }
    xhttp.open('GET', 'https://api.scryfall.com/cards/search?order=released&q=name%3D' + cardName.replace(/ /g, '+'), true)
    xhttp.send()
}
function inputCardNameNumberTextImport(index) {
    var importCardTextResponse = savedImportResponse[index]
    importText(beforeAfter(importCardTextResponse, '"name":"', '",'), 'Card Title')
    importText(beforeAfter(importCardTextResponse, '"type_line":"', '",'), 'Card Type')
    var flavorText = '{flavor}' + beforeAfter(importCardTextResponse, '"flavor_text":"', '","')
    var flavorTextStarCount = 0
    if (flavorText.match(/\*/g)) {
    	flavorTextStarCount = flavorText.match(/\*/g).length
    }
    for (var i = 0; i < flavorTextStarCount; i ++) {
    	if (i % 2 == 0) {
    		flavorText = flavorText.replace('*', '{/i}')
    	} else {
    		flavorText = flavorText.replace('*', '{i}')
    	}
    }
    if (flavorText.length < 10 || URLParams.get('noflavor') != null) {
    	flavorText = ''
    }
    importText((beforeAfter(importCardTextResponse, '"oracle_text":"', '",') + flavorText.replace(/\\n\u2014/g, '{lns}\u2014')).replace(/\n\\"/g, '\n\u201C').replace(/{flavor}\\"/g, '{flavor}\u201C').replace(/\\n/g, '\n').replace(/ \\"/g, ' \u201C').replace(/\\"/g, '\u201D').replace(/\(/g, '{i}(').replace(/\)/g, '){/i}'), 'Rules Text')
    if (importCardTextResponse.includes('"power":"')) {
        importText(beforeAfter(importCardTextResponse, '"power":"', '",') + '/' + beforeAfter(importCardTextResponse, '"toughness":"', '",'), 'Power/Toughness')
    } else {
        importText('', 'Power/Toughness')
    }
    if (importCardTextResponse.includes('"loyalty":"') && currentVersion.includes('m15Planeswalker/')) {
        importText(beforeAfter(importCardTextResponse, '"loyalty":"', '",'), 'Loyalty')
        var abilityList = beforeAfter(importCardTextResponse, '"oracle_text":"', '",').replace(/\u2212/g, '-').replace(/ \\"/g, ' \u201C').replace(/\\"/g, '\u201D').split(/\\n/g)
        for (var i = 0; i < abilityList.length; i++) {
            if (abilityList[i].slice(0, 4).includes(':')) {
                importText(abilityList[i].split(/: (.+)?/)[1], 'Ability ' + (i+1))
                document.getElementById('inputPlaneswalker' + (i + 1) + 'Icon').value = abilityList[i].split(/: (.+)?/)[0]
            } else {
                importText('{left' + parseInt(scaleX(24/750)) + '}' + abilityList[i], 'Ability ' + (i+1))
                document.getElementById('inputPlaneswalker' + (i + 1) + 'Icon').value = ''
            }
            if (document.getElementById('inputPlaneswalker' + (i + 1)).value < 1) {
                document.getElementById('inputPlaneswalker' + (i + 1)).value = 1
            }
        }
        planeswalkerAbilities()
    }
    document.getElementById('inputManaCost').value = beforeAfter(importCardTextResponse, '"mana_cost":"', '",')
    document.getElementById('inputCardArtName').value = beforeAfter(importCardTextResponse, '"name":"', '",')
    document.getElementById('inputSetCode').value = beforeAfter(importCardTextResponse, '"set":"', '",')
    document.getElementById('inputSetRarity').value = beforeAfter(importCardTextResponse, '"rarity":"', '",')[0]
    setSymbolFromGatherer()
    // autoCrop(setSymbol, 'https://cors-anywhere.herokuapp.com/http://gatherer.wizards.com/Handlers/Image.ashx?type=symbol&set=' + document.getElementById('inputSetCode').value + '&size=large&rarity=' + document.getElementById('inputSetRarity').value)
    inputCardArtName(beforeAfter(importCardTextResponse, '"name":"', '",'))
    manaCostUpdated()
    drawCardText()
}
function importText(text, target) {
    for (var i = 0; i < cardTextList.length; i++) {
        if (cardTextList[i].name == target) {
        	cardTextList[i].text = text
        }
    }
    document.getElementById('textPicker').children[0].click()
    drawCardObjects()
}
function beforeAfter(targetString, beforeString, afterString) {
    if (targetString.includes(beforeString) && targetString.includes(afterString)) {
        return targetString.split(beforeString)[1].split(afterString)[0]
    } else {
        return ''
    }
}

function toggleTabs(clickedElement, targetId) {
	Array.from(clickedElement.parentElement.children).forEach(element => element.classList.remove('selected'))
	clickedElement.classList.add('selected')
	Array.from(document.getElementById(targetId).parentElement.children).forEach(element => element.classList.add('hidden'))
	document.getElementById(targetId).classList.remove('hidden')
}

function downloadCardImage(linkElement) {
	if (document.getElementById("inputInfoArtist").value.replace(/ /g, "") != "") {
		var savedFileName = ''
		if (cardTextList[0].name == 'Card Nickname') {
			savedFileName = cardTextList[1].text + ' (' + cardTextList[0].text + ").png"
		} else {
			savedFileName = cardTextList[0].text + '.png'
		}
		linkElement.download = savedFileName
		if (linkElement.download == ".png") {
			linkElement.download = "card.png"
		}
	} else {
		event.preventDefault()
		notify("You must properly credit an artist before downloading!", '#ffaaaae0')
	}
	var cardImageData = mainCanvas.toDataURL()
	if (cardImageData == undefined) {
		notify("Sorry, but it seems that you cannot download your card. Please try using a different browser/device.", '#ffffaae0')
	}
	linkElement.href = cardImageData
}

function hideFrameImages(frameClass) {
	Array.from(document.getElementById('framePicker').children).forEach(element => {
		if (!element.classList.contains(frameClass)) {
			element.classList.add('hidden')
		} else {
			element.classList.remove('hidden')
		}
	})
	manaCostUpdated() //Forces mana cost to update when loading new version (especially important for loading saved cards w/ special mana symbols)
}

function autoCrop(targetImage, source = targetImage.src) {
	var autoCropImage = new Image()
	autoCropImage.crossOrigin = 'anonymous'
	autoCropImage.src = source
	autoCropImage.onload = function() {
		var width = this.width
		var height = this.height
		autoCropCanvas.width = width
		autoCropCanvas.height = height
		autoCropContext.drawImage(this, 0, 0,)
		var pixels = {x:[], y:[]}
		var imageData = autoCropContext.getImageData(0, 0, width, height)
		var x, y, index
		if (imageData.data.length > 4) {
			for (y = 0; y < height; y++) { //scans from left to right, top to bottom
				for (x = 0; x < width; x++) {
					index = (y * width + x) * 4 + 3 //calculuates the alpha value index
					if (imageData.data[index] > 0) {
						pixels.x.push(x)
						pixels.y.push(y) //stores visible pixel coordinates
					}
				}
			}
			pixels.x.sort(function(a, b){return a - b})
			pixels.y.sort(function(a, b){return a - b})
			var n = pixels.x.length - 1
			width = pixels.x[n] - pixels.x[0]
			height = pixels.y[n] - pixels.y[0]
			var cropped = autoCropContext.getImageData(pixels.x[0], pixels.y[0], width + 1, height + 1)
			autoCropCanvas.width = width + 1
			autoCropCanvas.height = height + 1
			autoCropContext.putImageData(cropped, 0, 0)
			setTimeout(function(){targetImage.src = autoCropCanvas.toDataURL()}, 100)
		}
	}
}

var textCodeReferenceArray = [
['Code', 'Result'],
['{linenospace}', 'Moves to the next line without an extra space ({lns} for short)'],
['{bar}', 'Draws the flavor text bar on the current line'],
['{flavor}', 'Moves to the next line, draws the flavor text bar, and italicizes the following text'],
['{i}', 'Italicizes the text'],
['{/i}', 'Removes italicization'],
['{fontsize#}', 'Changes the font size by # pixels (relative - use negative integers to shrink text)'],
['{fontcolor#}', 'Changes the font color to #'],
['{left}', 'Aligns the text to the left'],
['{center}', 'Aligns the text to the center'],
['{right}', 'Aligns the text to the right'],
['{left#}', 'Shifts the following text # pixels to the left'],
['{right#}', 'Shifts the following text # pixels to the right'],
['{up#}', 'Shifts the following text # pixels up'],
['{down#}', 'Shifts the following text # pixels down'],
['{outline:*,#}', 'Outlines the following text by # pixels in * color'],
['{shadow#}', 'Adds a shadow # pixels away from the following text'],
['Notes:', 'For colors, you may use HTML color codes (ie \'green\'), hex color codes (ie \'#00ff00\'), or rgb (ie \'rgb(0,255,0)\')']
]
function textCodeReference() {
	textCodeReferenceArray.forEach(item => document.getElementById('textCodeReference').innerHTML += '<div>' + item[0] + '</div><div>' + item[1] + '</div>')
}

function notify(message, color) {
	document.getElementsByClassName('notificationContainer')[0].innerHTML += `
	<div class='notification interactable' style='border-top-color: ` + color + `'>
		<div>` + message + `</div>
		<div class='deleteNotification' onclick='this.parentElement.parentNode.removeChild(this.parentElement)'>X</div>
	</div>
	`
}//notify('MessageGoesHere', '#aaffaadd')

function artistNameUpdated(artistName) {
	document.getElementById('inputInfoArtist').value = artistName
	document.getElementById('inputInfoArtist2').value = artistName
	bottomInfoUpdated()
}

//svg cropper
function cropSVG(set, targetImage) {
	xhttp = new XMLHttpRequest()
	xhttp.open('GET', 'https://raw.githubusercontent.com/andrewgioia/keyrune/4073ac89bb943978c29be504275e6f3160a07255/svg/' + set + '.svg', true)
	xhttp.overrideMimeType('image/svg+xml')
	xhttp.onload = function(event) {
		if (this.readyState == 4 && this.status == 200) {
		    var svg = document.body.appendChild(xhttp.responseXML.documentElement)
		    var box = svg.getBBox(svg)
			svg.setAttribute('viewBox', [box.x, box.y, box.width, box.height].join(' '))
			svg.setAttribute('width', box.width)
			svg.setAttribute('height', box.height)
			targetImage.src = 'data:image/svg+xml,'+encodeURIComponent(svg.outerHTML)
			svg.remove()
		}
	}
	xhttp.send()
}

//Must run last:
initialize()

//Redundant
function loadScript(scriptPath){
  var script = document.createElement('script')
  script.setAttribute('type','text/javascript')
  script.setAttribute('src', scriptPath)
  if (typeof script != 'undefined') {
    document.getElementsByTagName('head')[0].appendChild(script)
  }
}
