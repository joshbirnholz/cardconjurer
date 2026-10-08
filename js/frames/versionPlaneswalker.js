//checks to see if it needs to run
if (!loadedVersions.includes('/js/frames/versionPlaneswalker.js')) {
	loadedVersions.push('/js/frames/versionPlaneswalker.js');
	sizeCanvas('planeswalkerPreFrame');
	sizeCanvas('planeswalkerPostFrame');
	document.querySelector('#creator-menu-tabs').innerHTML += '<h3 class="selectable readable-background" onclick="toggleCreatorTabs(event, `planeswalker`)">Planeswalker</h3>';
	var newHTML = document.createElement('div');
	newHTML.id = 'creator-menu-planeswalker';
	newHTML.classList.add('hidden');
	newHTML.innerHTML = `
	<div class='readable-background padding'>
		<h5 class='padding margin-bottom input-description'>Adjust the height (first input), loyalty cost (second input), and loyalty placement (third input) of each Planeswalker ability</h5>
		<h5 class='padding margin-bottom input-description'>First Ability:</h5>
		<div class='padding input-grid margin-bottom'>
			<input id='planeswalker-height-0' type='number' class='input' oninput='planeswalkerEdited();' min='0'>
			<input id='planeswalker-cost-0' type='text' class='input' oninput='planeswalkerEdited();'>
			<input id='planeswalker-shift-0' type='number' class='input' oninput='planeswalkerEdited();'>
		</div>
		<h5 class='padding margin-bottom input-description'>Second Ability:</h5>
		<div class='padding input-grid margin-bottom'>
			<input id='planeswalker-height-1' type='number' class='input' oninput='planeswalkerEdited();' min='0'>
			<input id='planeswalker-cost-1' type='text' class='input' oninput='planeswalkerEdited();'>
			<input id='planeswalker-shift-1' type='number' class='input' oninput='planeswalkerEdited();'>
		</div>
		<h5 class='padding margin-bottom input-description'>Third Ability:</h5>
		<div class='padding input-grid margin-bottom'>
			<input id='planeswalker-height-2' type='number' class='input' oninput='planeswalkerEdited();' min='0'>
			<input id='planeswalker-cost-2' type='text' class='input' oninput='planeswalkerEdited();'>
			<input id='planeswalker-shift-2' type='number' class='input' oninput='planeswalkerEdited();'>
		</div>
		<h5 class='padding margin-bottom input-description'>Fourth Ability:</h5>
		<div class='padding input-grid margin-bottom'>
			<input id='planeswalker-height-3' type='number' class='input' oninput='planeswalkerEdited();' min='0'>
			<input id='planeswalker-cost-3' type='text' class='input' oninput='planeswalkerEdited();'>
			<input id='planeswalker-shift-3' type='number' class='input' oninput='planeswalkerEdited();'>
		</div>
		<h5 class='padding margin-bottom input-description'>Invert textbox colors:</h5>
		<input id='planeswalker-invert' class='input margin-bottom' type='checkbox' onchange='invertPlaneswalkerColors();'>
	</div>`;
	if (!card.planeswalker) {
		if (card.version.includes('Compleated')) {
			card.planeswalker = {abilities:['+1', '0', '-7', ''], abilityAdjust:[0, 0, 0, 0], count:3, x:0.1167, width:0.8094};
		} else {
			card.planeswalker = {abilities:['', '+1', '0', '-7'], abilityAdjust:[0, 0, 0, 0], count:3, x:0.1167, width:0.8094};
		}
	}
	if (card.version == 'planeswalkerSeventh') {
		card.planeswalker.abilityAdjust = [-0.0143, -0.0143, -0.0143, -0.0143];
	}
	window.planeswalkerAbilityLayout = [[[0.7467], [0.6953, 0.822], [0.6639, 0.7467, 0.8362], [0.6505, 0.72, 0.7905, 0.861]],[[0.72], [0.6391, 0.801], [0.5986, 0.72, 0.8415], [0.5986, 0.6796, 0.7605, 0.8415]]];
	document.querySelector('#creator-menu-sections').appendChild(newHTML);
	var plusIcon = new Image();
	setImageUrl(plusIcon, '/img/frames/planeswalker/planeswalkerPlus.png');
	var minusIcon = new Image();
	setImageUrl(minusIcon, '/img/frames/planeswalker/planeswalkerMinus.png');
	var neutralIcon = new Image();
	setImageUrl(neutralIcon, '/img/frames/planeswalker/planeswalkerNeutral.png');
	var lightToDark = new Image();
	setImageUrl(lightToDark, '/img/frames/planeswalker/abilityLineOdd.png');
	var darkToLight = new Image();
	setImageUrl(darkToLight, '/img/frames/planeswalker/abilityLineEven.png');
	var planeswalkerTextMask = new Image();
	planeswalkerTextMask.onload = function(){resetPlaneswalkerImages(fixPlaneswalkerInputs(planeswalkerEdited));}
	setImageUrl(planeswalkerTextMask, '/img/frames/planeswalker/text.svg');
	var lightColor = 'white';
	var darkColor = '#a4a4a4';
	// Auto-calculate ability heights on first load if text exists
	if (card.text && card.text.ability0 && card.text.ability0.text) {
		updatePlaneswalkerAbilityHeights();
	}
} else {
	resetPlaneswalkerImages(fixPlaneswalkerInputs(planeswalkerEdited));
	// Auto-calculate ability heights when switching frames if text exists
	if (card.text && card.text.ability0 && card.text.ability0.text) {
		updatePlaneswalkerAbilityHeights();
	}
}

function planeswalkerEdited() {
	// manage text masks
	var planeswalkerTall = 0;
	if (card.version.includes('Tall') || card.version.includes('Compleated')) {
		planeswalkerTall = 1;
		if (!(planeswalkerTextMask.src.includes('tall'))) {
			setImageUrl(planeswalkerTextMask, '/img/frames/planeswalker/tall/planeswalkerTallMaskRules.png');
		}
	} else if (card.version == 'planeswalkerTransformFront') {
		if (!planeswalkerTextMask.src.includes('transform/textFront')) {
			setImageUrl(planeswalkerTextMask, '/img/frames/planeswalker/transform/textFront.svg');
		}
	} else {
		if (!planeswalkerTextMask.src.includes('planeswalker/text.svg')) {
			setImageUrl(planeswalkerTextMask, '/img/frames/planeswalker/text.svg');
		}
	}
	// manage textbox size
	if (card.version.toLowerCase().includes('TransformFront')) {
		card.planeswalker.x = 0.1167;
		card.planeswalker.width = 0.8334;
	} else {
		card.planeswalker.x = 0.1167;
		card.planeswalker.width = 0.8094;
	}
	card.planeswalker.abilities[0] = document.querySelector('#planeswalker-cost-0').value;
	card.planeswalker.abilities[1] = document.querySelector('#planeswalker-cost-1').value;
	card.planeswalker.abilities[2] = document.querySelector('#planeswalker-cost-2').value;
	card.planeswalker.abilities[3] = document.querySelector('#planeswalker-cost-3').value;
	card.planeswalker.abilityAdjust[0] = document.querySelector('#planeswalker-shift-0').value / card.height;
	card.planeswalker.abilityAdjust[1] = document.querySelector('#planeswalker-shift-1').value / card.height;
	card.planeswalker.abilityAdjust[2] = document.querySelector('#planeswalker-shift-2').value / card.height;
	card.planeswalker.abilityAdjust[3] = document.querySelector('#planeswalker-shift-3').value / card.height;
	card.planeswalker.count = 0;
	var lastY = card.text.ability0.y;
	for (var i = 0; i < 4; i ++) {
	 	card.text['ability' + i].y = lastY;
	 	var height = parseFloat((parseInt(document.querySelector('#planeswalker-height-' + i).value) / card.height).toFixed(4));
	 	if (height > 0) {
	 		card.planeswalker.count ++;
	 	}
	 	if (document.querySelector('#planeswalker-cost-' + i).value == "") {
	 		if (!card.planeswalker.orig_ability_textbox_x) {
		 		card.planeswalker.orig_ability_textbox_x = card.text['ability' + i].x;
		 		card.planeswalker.orig_ability_textbox_width = card.text['ability' + i].width;
	 		}
	 		card.text['ability' + i].x = card.planeswalker.orig_ability_textbox_x - 0.044;
	 		card.text['ability' + i].width = card.planeswalker.orig_ability_textbox_width + 0.044;
	 	} else if (card.planeswalker.orig_ability_textbox_x) {
	 		card.text['ability' + i].x = card.planeswalker.orig_ability_textbox_x;
	 		card.text['ability' + i].width = card.planeswalker.orig_ability_textbox_width;
	 	}
	 	card.text['ability' + i].height = height;
	 	lastY += height;
	}
	
	fixPlaneswalkerInputs();
	var transitionHeight = scaleHeight(0.0048);
	planeswalkerPreFrameContext.clearRect(0, 0, planeswalkerPreFrameCanvas.width, planeswalkerPreFrameCanvas.height);
	planeswalkerPreFrameContext.globalCompositeOperation = 'source-over';
	planeswalkerPostFrameContext.clearRect(0, 0, planeswalkerPostFrameCanvas.width, planeswalkerPostFrameCanvas.height);
	if (!['planeswalkerSDCC15', 'planeswalkerSeventh'].includes(card.version)) {
		for (var i = 0; i < card.planeswalker.count; i ++) {
			var x = scaleX(card.planeswalker.x);
			var y = scaleY(card.text['ability' + i].y);
			var width = scaleWidth(card.planeswalker.width);
			var height = scaleHeight(card.text['ability' + i].height);
			if (i == 0) {
				y -= scaleHeight(0.1);
				height += scaleHeight(0.1);
			} else if (i == card.planeswalker.count - 1) {
				height += scaleHeight(0.5);
			}
			if (i % 2 == 0) {
				planeswalkerPreFrameContext.fillStyle = lightColor;
				planeswalkerPreFrameContext.globalAlpha = 0.608;
				planeswalkerPreFrameContext.fillRect(x, y + transitionHeight, width, height - 2 * transitionHeight);
				planeswalkerPreFrameContext.globalAlpha = 1;
				if (lightToDark.complete) {
					planeswalkerPreFrameContext.drawImage(lightToDark, x, y + height - transitionHeight, width, 2 * transitionHeight);
				}
			} else {
				planeswalkerPreFrameContext.fillStyle = darkColor;
				planeswalkerPreFrameContext.globalAlpha = 0.706;
				planeswalkerPreFrameContext.fillRect(x, y + transitionHeight, width, height - 2 * transitionHeight);
				planeswalkerPreFrameContext.globalAlpha = 1;
				if (darkToLight.complete) {
					planeswalkerPreFrameContext.drawImage(darkToLight, x, y + height - transitionHeight, width, 2 * transitionHeight);
				}
			}
		}
	}
	planeswalkerPreFrameContext.globalCompositeOperation = 'destination-in';
	if (planeswalkerTextMask.complete) {
		planeswalkerPreFrameContext.drawImage(planeswalkerTextMask, scaleX(0), scaleY(0), scaleWidth(1), scaleHeight(1));
	}
	planeswalkerPostFrameContext.globalCompositeOperation = 'source-over';
	planeswalkerPostFrameContext.fillStyle = 'white'
	planeswalkerPostFrameContext.font = scaleHeight(0.0286) + 'px belerenbsc';
	planeswalkerPostFrameContext.textAlign = 'center';
	for (var i = 0; i < card.planeswalker.count; i ++) {
		var planeswalkerIconValue = card.planeswalker.abilities[i];
		// Calculate badge position based on actual ability box position and height
		var abilityY = card.text['ability' + i].y;
		var abilityHeight = card.text['ability' + i].height;
		var badgeY = abilityY + (abilityHeight / 2); // Center badge vertically in the ability box
		var planeswalkerPlacement = scaleY(badgeY + card.planeswalker.abilityAdjust[i]);
		
		if (planeswalkerIconValue.includes('+')) {
			if (plusIcon.complete) {
				planeswalkerPostFrameContext.drawImage(plusIcon, scaleX(0.0294), planeswalkerPlacement - scaleHeight(0.0258), scaleWidth(0.14), scaleHeight(0.0724));
			}
			planeswalkerPostFrameContext.fillText(planeswalkerIconValue, scaleX(0.1027), planeswalkerPlacement + scaleHeight(0.0172));
		} else if (planeswalkerIconValue.includes('-')) {
			if (minusIcon.complete) {
				planeswalkerPostFrameContext.drawImage(minusIcon, scaleX(0.028), planeswalkerPlacement - scaleHeight(0.0153), scaleWidth(0.1414), scaleHeight(0.0705));
			}
			planeswalkerPostFrameContext.fillText(planeswalkerIconValue, scaleX(0.1027), planeswalkerPlacement + scaleHeight(0.0181));
		} else if (planeswalkerIconValue != '') {
			if (neutralIcon.complete) {
				planeswalkerPostFrameContext.drawImage(neutralIcon, scaleX(0.028), planeswalkerPlacement - scaleHeight(0.0153), scaleWidth(0.1414), scaleHeight(0.061));
			}
			planeswalkerPostFrameContext.fillText(planeswalkerIconValue, scaleX(0.1027), planeswalkerPlacement + scaleHeight(0.0191));
		}
	}
	
	drawTextBuffer();
	drawCard();
}

// Check if last ability text would overlap the loyalty badge
function checkLoyaltyBadgeOverlap(abilityIndex, fontSize) {
	if (!card.text || !card.text[`ability${abilityIndex}`]) return false;
	const abilityTextObj = card.text[`ability${abilityIndex}`];
	if (!abilityTextObj.text || !abilityTextObj.text.trim()) return false;
	
	const badgeX = 0.795, badgeY = 0.880, badgeHeight = 0.0372;
	const abilityTextX = abilityTextObj.x || 0.18;
	const abilityTextWidth = abilityTextObj.width || 0.7467;
	const abilityY = abilityTextObj.y;
	const abilityBottomY = abilityY + abilityTextObj.height;
	
	// Check vertical overlap
	if (badgeY >= abilityBottomY || (badgeY + badgeHeight) <= abilityY) return false;
	
	// Estimate text layout
	const cleanText = abilityTextObj.text.replace(/\{[^}]+\}/g, '');
	const explicitBreaks = (abilityTextObj.text.match(/\{lns\}|\{line\}/g) || []).length;
	const charsPerLine = 35 / (fontSize / 0.0305);
	const totalLines = Math.max(explicitBreaks + 1, Math.ceil(cleanText.length / charsPerLine));
	
	// Check if text reaches badge area
	const lineHeight = fontSize * 1.3;
	const badgeLineIndex = Math.floor((badgeY - abilityY) / lineHeight);
	if (badgeLineIndex >= totalLines) return false;
	
	// Check horizontal extent - only flag if clearly overlapping
	const badgeOverlapStartX = (badgeX - abilityTextX) / abilityTextWidth;
	const charsOnBadgeLine = Math.min(charsPerLine, Math.max(0, cleanText.length - badgeLineIndex * charsPerLine));
	const lineFullness = charsOnBadgeLine / charsPerLine;
	
	// Only trigger if line extends well past badge start (10% margin)
	return lineFullness >= (badgeOverlapStartX + 0.1);
}

// Calculate uniform font size for all planeswalker abilities
function uniformPlaneswalkerFontSize() {
	if (!card.planeswalker || card.planeswalker.count === 0) return;
	
	const defaultSize = 0.0305;
	let minFontSize = defaultSize;
	
	// Estimate font size needed for each ability based on text density
	for (let i = 0; i < card.planeswalker.count; i++) {
		const ability = card.text[`ability${i}`];
		if (!ability?.text?.trim()) continue;
		
		const charCount = ability.text.replace(/\{[^}]+\}/g, '').replace(/\([^)]*\)/g, '').length;
		if (charCount === 0) continue;
		
		const boxWidth = scaleWidth(ability.width);
		const boxHeight = scaleHeight(ability.height);
		if (boxHeight <= 0 || boxWidth <= 0) continue;
		
		const estimatedLines = Math.ceil(charCount / Math.max(1, boxWidth / 12));
		const fontSizeScale = Math.max(0.1, Math.min(2, boxHeight / (estimatedLines * 1.3)));
		const estimatedFontSize = (ability.size || defaultSize) * fontSizeScale;
		
		if (estimatedFontSize > 0 && estimatedFontSize < defaultSize * 2) {
			minFontSize = Math.min(minFontSize, estimatedFontSize);
		}
	}
	
	// Apply the minimum font size to all abilities
	if (minFontSize > 0 && minFontSize < 1) {
		// Check if last ability overlaps badge - use binary search for efficiency
		const lastAbilityIndex = card.planeswalker.count - 1;
		if (checkLoyaltyBadgeOverlap(lastAbilityIndex, minFontSize)) {
			let low = minFontSize * 0.90; // Don't reduce more than 10%
			let high = minFontSize;
			
			// Binary search for largest font size without overlap (max ~10 iterations)
			for (let i = 0; i < 20; i++) {
				const mid = (low + high) / 2;
				if (checkLoyaltyBadgeOverlap(lastAbilityIndex, mid)) {
					high = mid; // Still overlaps, need smaller
				} else {
					low = mid; // No overlap, can try larger
				}
				if (high - low < 0.0001) break;
			}
			minFontSize = low; // Use the largest size without overlap
		}
		
		// Apply the final font size to all abilities
		for (let i = 0; i < card.planeswalker.count; i++) {
			const abilityText = card.text[`ability${i}`];
			if (abilityText && abilityText.text && abilityText.text.trim()) {
				abilityText.size = minFontSize;
			}
		}
	}
}

function updatePlaneswalkerAbilityHeights() {
	// Get all planeswalker abilities that have content
	const abilities = [];
	for (let i = 0; i < 4; i++) {
		const abilityText = card.text[`ability${i}`].text;
		if (!abilityText || abilityText.trim() === '') {
			continue;
		}
		// Count words excluding reminder text in parentheses
		const wordCount = abilityText
			.replace(/\([^)]*\)/g, '') // Remove reminder text
			.trim()
			.split(/\s+/)
			.filter(word => word.length > 0)
			.length;
		
		abilities.push({
			index: i,
			wordCount: Math.max(wordCount, 1), // At least 1 to avoid division by zero
			text: abilityText
		});
	}
	
	if (abilities.length === 0) {
		return; // No abilities to adjust
	}
	
	card.planeswalker.count = abilities.length;
	
	// Calculate available height (type line to loyalty area max)
	const maxHeight = 0.85 - card.text.type.y;
	const totalWords = abilities.reduce((sum, a) => sum + a.wordCount, 0);
	const minBoxHeight = 0.045;
	const minimumTotalSpace = minBoxHeight * abilities.length;
	
	// Calculate space per word: equal distribution if tight, proportional if room
	const spacePerWord = minimumTotalSpace >= maxHeight 
		? maxHeight / abilities.length 
		: (maxHeight - minimumTotalSpace) / totalWords
	
	// Assign Y positions and heights
	let lastY = card.text.ability0.y + 0.002;
	for (let i = 0; i < 4; i++) {
		const ability = abilities.find(a => a.index === i);
		if (ability) {
			card.text[`ability${i}`].y = lastY;
			const height = minBoxHeight + (ability.wordCount * spacePerWord);
			card.text[`ability${i}`].height = height;
			lastY += height;
		} else {
			card.text[`ability${i}`].height = 0;
		}
	}
	
	// Calculate and apply uniform font size for all abilities
	// This will also check for badge overlap and reduce size if needed
	uniformPlaneswalkerFontSize();
	
	fixPlaneswalkerInputs(planeswalkerEdited);
}

function fixPlaneswalkerInputs(callback) {
	document.querySelector('#planeswalker-height-0').value = scaleHeight(card.text.ability0.height);
	document.querySelector('#planeswalker-cost-0').value = card.planeswalker.abilities[0];
	document.querySelector('#planeswalker-shift-0').value = scaleHeight(card.planeswalker.abilityAdjust[0]);
	document.querySelector('#planeswalker-height-1').value = scaleHeight(card.text.ability1.height);
	document.querySelector('#planeswalker-cost-1').value = card.planeswalker.abilities[1];
	document.querySelector('#planeswalker-shift-1').value = scaleHeight(card.planeswalker.abilityAdjust[1]);
	document.querySelector('#planeswalker-height-2').value = scaleHeight(card.text.ability2.height);
	document.querySelector('#planeswalker-cost-2').value = card.planeswalker.abilities[2];
	document.querySelector('#planeswalker-shift-2').value = scaleHeight(card.planeswalker.abilityAdjust[2]);
	document.querySelector('#planeswalker-height-3').value = scaleHeight(card.text.ability3.height);
	document.querySelector('#planeswalker-cost-3').value = card.planeswalker.abilities[3];
	document.querySelector('#planeswalker-shift-3').value = scaleHeight(card.planeswalker.abilityAdjust[3]);
	if (callback) {
		callback();
	}
}

function resetPlaneswalkerImages(callback) {
	var planeswalkerImageFolder = '';
	var planeswalkerImageExtension = 'png';
	if (card.version == 'planeswalkerSDCC15') {
		planeswalkerImageFolder = '/sdcc15';
		planeswalkerImageExtension = 'svg';
	}
	setImageUrl(plusIcon, `/img/frames/planeswalker${planeswalkerImageFolder}/planeswalkerPlus.${planeswalkerImageExtension}`);
	setImageUrl(minusIcon, `/img/frames/planeswalker${planeswalkerImageFolder}/planeswalkerMinus.${planeswalkerImageExtension}`);
	setImageUrl(neutralIcon, `/img/frames/planeswalker${planeswalkerImageFolder}/planeswalkerNeutral.${planeswalkerImageExtension}`);
	setImageUrl(lightToDark, `/img/frames/planeswalker${planeswalkerImageFolder}/abilityLineOdd.${planeswalkerImageExtension}`);
	setImageUrl(darkToLight, `/img/frames/planeswalker${planeswalkerImageFolder}/abilityLineEven.${planeswalkerImageExtension}`);
	if (!darkToLight.onload) {
		darkToLight.onload = function() {planeswalkerEdited();}
	}
	if (callback) {
		callback();
	}
}

function invertPlaneswalkerColors(reverse = false) {
	if (reverse) {
		document.querySelector('#planeswalker-invert').checked = card.planeswalker.invert;
	} else {
		card.planeswalker.invert = document.querySelector('#planeswalker-invert').checked;
	}
	if (!lightToDark.onload) {
		lightToDark.onload = planeswalkerEdited;
		darkToLight.onload = planeswalkerEdited;
	}
	if (card.planeswalker.invert) {
		darkColor = '#5b5b5b';
		lightColor = 'black';
		setImageUrl(lightToDark, '/img/frames/planeswalker/abilityLineOddDarkened.png');
		setImageUrl(darkToLight, '/img/frames/planeswalker/abilityLineEvenDarkened.png');
	} else {
		darkColor = '#a4a4a4';
		lightColor = 'white';
		setImageUrl(lightToDark, '/img/frames/planeswalker/abilityLineOdd.png');
		setImageUrl(darkToLight, '/img/frames/planeswalker/abilityLineEven.png');
	}
}