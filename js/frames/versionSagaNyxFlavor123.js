//checks to see if it needs to run
if (!loadedVersions.includes('/js/frames/versionSaga.js')) {
	loadedVersions.push('/js/frames/versionSaga.js');
	sizeCanvas('saga');
	document.querySelector('#creator-menu-tabs').innerHTML += '<h3 class="selectable readable-background" onclick="toggleCreatorTabs(event, `saga`)">Saga</h3>';
	var newHTML = document.createElement('div');
	newHTML.id = 'creator-menu-saga';
	newHTML.classList.add('hidden');
	newHTML.innerHTML = `
	<div class='readable-background padding'>
		<h5 class='padding margin-bottom input-description'>Adjust the height (first input) and chapter count (second input) of each Saga ability</h5>
		<h5 class='padding margin-bottom input-description'>First Ability:</h5>
		<div class='padding input-grid margin-bottom'>
			<input id='saga-height-0' type='number' class='input' oninput='sagaEdited();' min='0'>
			<input id='saga-chapters-0' type='number' class='input' oninput='sagaEdited();' min='0' max='3' step='1'>
		</div>
		<h5 class='padding margin-bottom input-description'>Second Ability:</h5>
		<div class='padding input-grid margin-bottom'>
			<input id='saga-height-1' type='number' class='input' oninput='sagaEdited();' min='0'>
			<input id='saga-chapters-1' type='number' class='input' oninput='sagaEdited();' min='0' max='3' step='1'>
		</div>
		<h5 class='padding margin-bottom input-description'>Third Ability:</h5>
		<div class='padding input-grid margin-bottom'>
			<input id='saga-height-2' type='number' class='input' oninput='sagaEdited();' min='0'>
			<input id='saga-chapters-2' type='number' class='input' oninput='sagaEdited();' min='0' max='3' step='1'>
		</div>
		<h5 class='padding margin-bottom input-description'>Fourth Ability:</h5>
		<div class='padding input-grid margin-bottom'>
			<input id='saga-height-3' type='number' class='input' oninput='sagaEdited();' min='0'>
			<input id='saga-chapters-3' type='number' class='input' oninput='sagaEdited();' min='0' max='3' step='1'>
		</div>
	</div>`;
	if (!card.saga) {
		card.saga = {abilities:[1, 1, 1, 0], count:3, x:(card.version === "oldSaga" ? 0.1114 : 0.1), width:(card.version === "oldSaga" ? 0.3727 : 0.3947)};
	}
	document.querySelector('#creator-menu-sections').appendChild(newHTML);
	var sagaChapter = new Image();
	setImageUrl(sagaChapter, '/img/frames/saga/sagaChapter.png');
	var sagaDivider = new Image();
	setImageUrl(sagaDivider, '/img/frames/saga/sagaDivider.png');
	sagaChapter.onload = sagaDivider.onload = sagaEdited;
	fixSagaInputs(sagaEdited);
}

function sagaEdited() {
	//gather data
	card.saga.abilities[0] = document.querySelector('#saga-chapters-0').value;
	card.saga.abilities[1] = document.querySelector('#saga-chapters-1').value;
	card.saga.abilities[2] = document.querySelector('#saga-chapters-2').value;
	card.saga.abilities[3] = document.querySelector('#saga-chapters-3').value;
	card.saga.count = 0;
	var lastY = card.text.ability0.y;
	for (var i = 0; i < 4; i ++) {
	 	card.text['ability' + i].y = lastY;
	 	var height = parseFloat((parseInt(document.querySelector('#saga-height-' + i).value) / card.height).toFixed(4));
	 	if (height > 0) {
	 		card.saga.count ++;
	 	}
	 	card.text['ability' + i].height = height;
	 	lastY += height;
	}
	fixSagaInputs();
	//draw to saga canvas
	sagaContext.clearRect(0, 0, sagaCanvas.width, sagaCanvas.height);
	sagaContext.font = 'normal normal 550 ' + scaleHeight(0.0324) + 'px plantinsemibold';
	sagaContext.textAlign = 'center';
	var sagaCount = 1;
	for (var i = 0; i < card.saga.count; i ++) {
		var x = scaleX(card.saga.x);
		var y = scaleY(card.text['ability' + i].y);
		var width = scaleWidth(card.saga.width);
		var height = scaleHeight(card.text['ability' + i].height);
		if (sagaDivider.complete) {
			sagaContext.drawImage(sagaDivider, x, y - scaleHeight(0.0029) / 2, width, scaleHeight(0.0029));
		}
		if (sagaChapter.complete) {
			var numeralX = x - scaleWidth(0.0614);
			var numeralWidth = scaleWidth(0.0787);
			var numeralHeight = scaleHeight(0.0629);
			var numeralY = y + (height - numeralHeight) / 2;
			var numeralTextX = numeralX + scaleWidth(0.0394);
			var numeralTextY = numeralY + scaleHeight(0.0429);
			if (card.saga.abilities[i] == 1) {
				sagaContext.drawImage(sagaChapter, numeralX, numeralY, numeralWidth, numeralHeight);
				sagaContext.fillText(romanNumeral(sagaCount), numeralTextX, numeralTextY);
				sagaCount ++;
			} else if (card.saga.abilities[i] == 2) {
				var numeralSpread = scaleHeight(0.0358);
				var numeralTextSpread = scaleHeight(0.0358);
				sagaContext.drawImage(sagaChapter, numeralX, numeralY - numeralSpread, numeralWidth, numeralHeight);
				sagaContext.drawImage(sagaChapter, numeralX, numeralY + numeralSpread, numeralWidth, numeralHeight);
				sagaContext.fillText(romanNumeral(sagaCount), numeralTextX, numeralTextY - numeralTextSpread);
				sagaContext.fillText(romanNumeral(sagaCount + 1), numeralTextX, numeralTextY + numeralTextSpread);
				sagaCount += 2;
			} else if (card.saga.abilities[i] > 2) {
				var numeralSpread = 2 * scaleHeight(0.0358);
				var numeralTextSpread = 2 * scaleHeight(0.0358);
				sagaContext.drawImage(sagaChapter, numeralX, numeralY - numeralSpread, numeralWidth, numeralHeight);
				sagaContext.drawImage(sagaChapter, numeralX, numeralY, numeralWidth, numeralHeight);
				sagaContext.drawImage(sagaChapter, numeralX, numeralY + numeralSpread, numeralWidth, numeralHeight);
				sagaContext.fillText(romanNumeral(sagaCount), numeralTextX, numeralTextY - numeralTextSpread);
				sagaContext.fillText(romanNumeral(sagaCount + 1), numeralTextX, numeralTextY);
				sagaContext.fillText(romanNumeral(sagaCount + 2), numeralTextX, numeralTextY + numeralTextSpread);
				sagaCount += 3;
			}
		}
	}
	drawTextBuffer();
	drawCard();
}

function fixSagaInputs(callback) {
	document.querySelector('#saga-height-0').value = scaleHeight(card.text.ability0.height);
	document.querySelector('#saga-chapters-0').value = card.saga.abilities[0];
	document.querySelector('#saga-height-1').value = scaleHeight(card.text.ability1.height);
	document.querySelector('#saga-chapters-1').value = card.saga.abilities[1];
	document.querySelector('#saga-height-2').value = scaleHeight(card.text.ability2.height);
	document.querySelector('#saga-chapters-2').value = card.saga.abilities[2];
	document.querySelector('#saga-height-3').value = scaleHeight(card.text.ability3.height);
	document.querySelector('#saga-chapters-3').value = card.saga.abilities[3];
	if (callback) {
		callback();
	}
}

function romanNumeral(input) {
	switch(input) {
		case 1: return 'I';
		case 2: return 'II';
		case 3: return 'III';
		case 4: return 'IV';
		case 5: return 'V';
		case 6: return 'VI';
		default: return input;
	}
}