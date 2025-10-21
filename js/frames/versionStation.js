//=====================================
// INITIALIZATION AND SETUP
//=====================================


if (!loadedVersions.includes('/js/frames/versionStation.js')) {
	loadedVersions.push('/js/frames/versionStation.js');
	
	sizeCanvas('stationPreFrame');
	sizeCanvas('stationPostFrame');
	
	initializeStationImages();
	initializeStationDefaults();
	setupStationUI();
	
	// Set up property watchers
	setupStationListeners();
	
	fixStationInputs(stationEdited);
} else {
	// Clear existing watchers before setting up new ones
	clearStationListeners();
	
	// Set up fresh watchers
	setupStationListeners();
	
	// Just refresh the UI inputs
	fixStationInputs(stationEdited);
}

//=====================================
// UTILITY FUNCTIONS
//=====================================

function setupStationImage(imageName, imagePath, logName) {
	const image = new Image();
	image.crossOrigin = 'anonymous';
	
	const cachedImage = document.querySelector(`img[data-station-cache="${imageName}"]`);
	if (cachedImage) return cachedImage;
	
	image.onload = () => {
		image.setAttribute('data-station-cache', imageName);
		stationEdited();
	};
	
	setImageUrl(image, imagePath);
	return image;
}

function setInputValues(inputMap) {
	Object.entries(inputMap).forEach(([selector, value]) => {
		const element = document.querySelector(selector);
		if (element) element.value = value;
	});
}

function extractManaSymbols(manaText) {
	const matches = manaText.match(/\{([wubrg])\}/gi);
	if (!matches) return [];
	
	const colorSymbols = new Set();
	matches.forEach(match => {
		const symbol = match.replace(/[{}]/g, '').toLowerCase();
		if (['w', 'u', 'b', 'r', 'g'].includes(symbol)) {
			colorSymbols.add(symbol);
		}
	});
	
	return Array.from(colorSymbols);
}

function setupDrawingContext(context, settings = {}) {
	context.globalCompositeOperation = settings.compositeOp || 'source-over';
	context.globalAlpha = settings.alpha || 1;
	context.fillStyle = settings.fillStyle || 'white';
	context.font = settings.font || scaleHeight(card.station.badgeSettings.fontSize) + 'px belerenbsc';
	context.textAlign = settings.textAlign || 'center';
	context.textBaseline = settings.textBaseline || 'middle';
}

//=====================================
// INITIALIZATION FUNCTIONS
//=====================================

function initializeStationImages() {
	window.stationBadgeImage = setupStationImage('badge', '/img/frames/station/badges/a.png', 'Station badge');
	window.stationPTImage = setupStationImage('pt', '/img/frames/station/pt/a.png', 'Station PT');
}

function initializeStationDefaults() {
	if (!card.station) {
		card.station = {
			abilityCount: 3,
			x: 0.1167,
			width: 0.8094,
			badgeX: 0.066,
			badgeValues: ['', '', ''],
			disableFirstAbility: false,
			disabledTextX: 0.087,
			disabledTextWidth: 0.825,
			importSettings: {
				singleAbility: {
					yOffset: -250,
					height1: 550,
				},
				versionOverrides: {
					'stationRegular': {
						yOffset: -275,
						height1: 525,
						minDistanceFromBottom: 163
					},
					'stationBorderless': {
						yOffset: -275,
						height1: 525,
						minDistanceFromBottom: 163
					}
				}
			},
			badgeSettings: {
				fontSize: 0.0245,
				width: 162,
				height: 162,
				x: -94,
				y: 0
			},
			squares: {
				1: { width: 1714, height: 300, x: 0, y: 76, enabled: true, color: '#e6ecf2', opacity: 0.2 },
				2: { width: 1714, height: 250, x: 0, y: 0, enabled: true, color: '#e6ecf2', opacity: 0.4 }
			},
			minDistanceFromBottom: 150,
			baseTextPositions: {
				ability1: {x: 0.18, y: 0.7},
				ability2: {x: 0.18, y: 0.83}
			},
			textOffsets: {
				1: { x: 85, y: 15 },
				2: { x: 85, y: 12 }
			},
			ptSettings: {
				fontSize: 0.0320,
				width: 306,
				height: 148,
				x: 0,
				y: 0
			}
		};
	}
	
	const defaults = {
		badgeValues: ['', '', ''],
		badgeSettings: { fontSize: 0.0250, width: 162, height: 162 },
		colorModes: { 1: 'auto', 2: 'auto' },
		ptColorMode: 'auto',
		badgeColorMode: 'auto',
		colorSettings: {
			default: { square1: '#e6ecf2', square2: '#e6ecf2', square2OpacityOffset: 0.20 },
			w: { square1: '#4a4a4a', square2: '#4a4a4a', square2OpacityOffset: 0.20 },
			u: { square1: '#0075be', square2: '#0075be', square2OpacityOffset: 0.20 },
			b: { square1: '#272624', square2: '#272624', square2OpacityOffset: 0.15 },
			r: { square1: '#ef3827', square2: '#ef3827', square2OpacityOffset: 0.20 },
			g: { square1: '#007b43', square2: '#007b43', square2OpacityOffset: 0.45 },
			m: { square1: '#bc932e', square2: '#bc932e', square2OpacityOffset: 0.25 },
			a: { square1: '#416c77', square2: '#416c77', square2OpacityOffset: 0.20 },
			l: { square1: '#7c5439', square2: '#7c5439', square2OpacityOffset: 0.20 }
		},
		packDefaults: {
			ability: { x: 175/2010, y: 1775/2814, width: 1660/2010, height: 280/2814 }
		}
	};
	
	Object.entries(defaults).forEach(([key, value]) => {
		if (!card.station[key]) card.station[key] = value;
	});
}

//=====================================
// UI SETUP
//=====================================

function setupStationUI() {
	document.querySelector('#creator-menu-tabs').innerHTML += '<h3 class="selectable readable-background" onclick="toggleCreatorTabs(event, `station`)">Station</h3>';
	
	const newHTML = document.createElement('div');
	newHTML.id = 'creator-menu-station';
	newHTML.classList.add('hidden');
	newHTML.innerHTML = `
	<div class='readable-background padding'>
		<h5 class='padding margin-bottom input-description'>Station Card Controls - Adjust text box heights and colored square backgrounds for each ability</h5>
		
		<h5 class='padding margin-bottom input-description'>Station Badge Settings:</h5>
		<div class='padding input-grid margin-bottom'>
			<div><h5 class='padding margin-bottom input-description' style='font-style: normal;'>Badge Color Mode:</h5>
				<select id='station-badge-color-mode' class='input' onchange='updateBadgeColorMode();'>
					<option value='auto'>Auto (Based on Mana Cost)</option>
					<option value='white'>White</option>
					<option value='blue'>Blue</option>
					<option value='black'>Black</option>
					<option value='red'>Red</option>
					<option value='green'>Green</option>
					<option value='multi'>Multicolored</option>
					<option value='colorless'>Colorless</option>
				</select>
			</div>
			<div><h5 class='padding margin-bottom input-description' style='font-style: normal;'>First Ability Badge Value:</h5><input id='station-badge-value-1' type='text' class='input' oninput='stationEdited();' placeholder='Badge Text'></div>
			<div><h5 class='padding margin-bottom input-description' style='font-style: normal;'>Second Ability Badge Value:</h5><input id='station-badge-value-2' type='text' class='input' oninput='stationEdited();' placeholder='Badge Text'></div>
		</div>
		
		<div style='border-top: 1px solid #ccc; padding-top: 15px; margin-top: 15px;'></div>

		<h5 class='padding margin-bottom input-description'>Station PT Box Settings:</h5>
		<div class='padding input-grid margin-bottom'>
			<div><h5 class='padding margin-bottom input-description' style='font-style: normal;'>PT Color Mode:</h5>
				<select id='station-pt-color-mode' class='input' onchange='updatePTColorMode();'>
					<option value='auto'>Auto (Based on Mana Cost)</option>
					<option value='white'>White</option>
					<option value='blue'>Blue</option>
					<option value='black'>Black</option>
					<option value='red'>Red</option>
					<option value='green'>Green</option>
					<option value='multi'>Multicolored</option>
					<option value='colorless'>Colorless</option>
				</select>
			</div>
			<div><h5 class='padding margin-bottom input-description' style='font-style: normal;'>PT X Offset:</h5><input id='station-pt-x-offset' type='number' class='input' oninput='stationEdited();' placeholder='PT X Offset'></div>
			<div><h5 class='padding margin-bottom input-description' style='font-style: normal;'>PT Y Offset:</h5><input id='station-pt-y-offset' type='number' class='input' oninput='stationEdited();' placeholder='PT Y Offset'></div>
		</div>
		
		<div style='border-top: 1px solid #ccc; padding-top: 15px; margin-top: 15px;'></div>

		<h5 class='padding margin-bottom input-description'>Station Square Settings:</h5>

		<div class='padding input-grid margin-bottom'>
			<div><h5 class='padding margin-bottom input-description' style='font-style: normal;'>Square Width (Both Squares):</h5><input id='station-square-width' type='number' class='input' oninput='stationEdited();' min='0' placeholder='Square Width'></div>
			<div><h5 class='padding margin-bottom input-description' style='font-style: normal;'>Square X Offset (Both Squares):</h5><input id='station-square-x' type='number' class='input' oninput='stationEdited();' placeholder='Square X Offset'></div>
			<div><h5 class='padding margin-bottom input-description' style='font-style: normal;'>Square Y Offset (Starting point of first square):</h5><input id='station-square-y' type='number' class='input' oninput='stationEdited();' placeholder='Square Y Offset'></div>
		</div>

		<div class='padding input-grid margin-bottom'>
			<div><h5 class='padding margin-bottom input-description' style='font-style: normal;'>First Square Height:</h5><input id='station-square-height-1' type='number' class='input' oninput='stationEdited();' min='0' placeholder='First Square Height'></div>
			<div><h5 class='padding margin-bottom input-description' style='font-style: normal;'>Second Square Height (Set to bottom of text box automatically from bottom of first square):</h5><input id='station-square-height-2' type='number' class='input' oninput='stationEdited();' min='0' placeholder='Second Square Height'></div>
		</div>

		<div class='padding input-grid'>
			<label class='checkbox-container input'>Disable First Square Color (First square becomes transparent. Second square gets first squares base opacity for each color on auto. Set to a color mode to get independent opacity)
				<input id='station-disable-first-ability' type='checkbox' onchange='stationEdited();'>
				<span class='checkmark'></span>
			</label>
		</div>

		<div class='padding input-grid margin-bottom'>
			<div><h5 class='padding margin-bottom input-description' style='font-style: normal;'>Square Color Mode:</h5>
				<select id='station-square-color-mode' class='input' onchange='toggleSquareColorPicker();'>
					<option value='auto'>Auto (Based on Mana Cost)</option>
					<option value='white'>White</option>
					<option value='blue'>Blue</option>
					<option value='black'>Black</option>
					<option value='red'>Red</option>
					<option value='green'>Green</option>
					<option value='multi'>Multicolored</option>
					<option value='colorless'>Colorless</option>
					<option value='artifact'>Artifact</option>
					<option value='land'>Land</option>
					<option value='custom'>Custom</option>
				</select>
			</div>
			<div id='station-square-color-picker' class='hidden'><h5 class='padding margin-bottom input-description' style='font-style: normal;'>Square Color:</h5><input id='station-square-color' type='color' class='input' value='#e6ecf2' onchange='stationEdited();'></div>
		</div>
		<div class='padding input-grid margin-bottom'>
			<div><h5 id='station-square-opacity-1-label' class='padding margin-bottom input-description' style='font-style: normal;'>Square Opacity:</h5><input id='station-square-opacity-1' type='range' class='input' min='0' max='1' step='0.05' value='0.7' oninput='stationEdited();'></div>
			<div id='station-square-opacity-2-container'><h5 class='padding margin-bottom input-description' style='font-style: normal;'>Second Square Opacity:</h5><input id='station-square-opacity-2' type='range' class='input' min='0' max='1' step='0.05' value='0.7' oninput='stationEdited();'></div>
		</div>
		
		<div class='padding margin-bottom' style='text-align: center; border-top: 1px solid #ccc; padding-top: 20px;'>
			<button id='station-reset-button' class='input' onclick='resetStationSettings();' style='background-color:rgb(51, 51, 51); color: white; padding: 10px 20px; font-weight: bold;'>
				Reset Station Settings to Defaults
			</button>
		</div>
	</div>`;
	
	document.querySelector('#creator-menu-sections').appendChild(newHTML);
}

//=====================================
// LISTENER SETUP
//=====================================

function setupStationListeners() {
	// Only set up if not already done
	if (window.stationListenersInitialized) return;
	
	// Set up property watchers for mana and PT text changes
	setupManaPropertyWatcher();
	setupPTPropertyWatcher();
	
	window.stationListenersInitialized = true;
}

function setupManaPropertyWatcher() {
	// Ensure the mana text object exists
	if (!card.text || !card.text.mana) {
		console.warn('Mana text object not found for property watcher');
		return;
	}
	
	// Don't set up multiple watchers on the same object
	if (card.text.mana._stationWatcherActive) {
		return;
	}
	
	let currentManaValue = card.text.mana.text || '';
	
	// Create a property descriptor that watches for changes
	Object.defineProperty(card.text.mana, 'text', {
		get: function() {
			return this._textValue || '';
		},
		set: function(newValue) {
			const oldValue = this._textValue || '';
			this._textValue = newValue || '';
			
			// Only trigger updates if the value actually changed
			if (oldValue !== this._textValue) {
				// Debounce the updates to avoid excessive redraws
				clearTimeout(this._stationManaUpdateTimeout);
				this._stationManaUpdateTimeout = setTimeout(() => {
					updateBadgeImageFromMana();
					updatePTImageFromMana();
					updateSquareColorsFromMana();
					stationEdited();
				}, 50);
			}
		},
		enumerable: true,
		configurable: true
	});
	
	// Initialize with current value
	card.text.mana._textValue = currentManaValue;
	card.text.mana._stationWatcherActive = true;
}

function setupPTPropertyWatcher() {
	// Ensure the PT text object exists
	if (!card.text || !card.text.pt) {
		console.warn('PT text object not found for property watcher');
		return;
	}
	
	// Don't set up multiple watchers on the same object
	if (card.text.pt._stationWatcherActive) {
		return;
	}
	
	let currentPTValue = card.text.pt.text || '';
	
	// Create a property descriptor that watches for changes
	Object.defineProperty(card.text.pt, 'text', {
		get: function() {
			return this._textValue || '';
		},
		set: function(newValue) {
			const oldValue = this._textValue || '';
			this._textValue = newValue || '';
			
			// Only trigger updates if the value actually changed
			if (oldValue !== this._textValue) {
				// Debounce the updates to avoid excessive redraws
				clearTimeout(this._stationPTUpdateTimeout);
				this._stationPTUpdateTimeout = setTimeout(() => {
					updateStationTextPositions();
					stationEdited();
				}, 50);
			}
		},
		enumerable: true,
		configurable: true
	});
	
	// Initialize with current value
	card.text.pt._textValue = currentPTValue;
	card.text.pt._stationWatcherActive = true;
}

function clearStationListeners() {
	// Clear property watchers by restoring original text properties
	if (card.text && card.text.mana && card.text.mana._stationWatcherActive) {
		const currentValue = card.text.mana._textValue;
		delete card.text.mana.text;
		delete card.text.mana._textValue;
		delete card.text.mana._stationWatcherActive;
		delete card.text.mana._stationManaUpdateTimeout;
		
		// Restore as simple property
		card.text.mana.text = currentValue;
	}
	
	if (card.text && card.text.pt && card.text.pt._stationWatcherActive) {
		const currentValue = card.text.pt._textValue;
		delete card.text.pt.text;
		delete card.text.pt._textValue;
		delete card.text.pt._stationWatcherActive;
		delete card.text.pt._stationPTUpdateTimeout;
		
		// Restore as simple property
		card.text.pt.text = currentValue;
	}
	
	window.stationListenersInitialized = false;
}

//=====================================
// COLOR MODE FUNCTIONS
//=====================================

function handleColorMode(type, mode, colorSettings) {
	const colorMap = {
		white: 'w', blue: 'u', black: 'b', red: 'r', green: 'g',
		multi: 'm', colorless: 'a', artifact: 'a', land: 'l'
	};
	
	if (mode === 'auto') {
		if (type === 'square') updateSquareColorsFromMana();
		else if (type === 'badge') updateBadgeImageFromMana();
		else if (type === 'pt') updatePTImageFromMana();
	} else if (type !== 'square') {
		const folderName = type === 'badge' ? 'badges' : type;
		const imagePath = `/img/frames/station/${folderName}/${colorMap[mode] || 'a'}.png`;
		const image = type === 'badge' ? stationBadgeImage : stationPTImage;
		setImageUrl(image, imagePath);
	} else {
		applyPresetColor(1, mode);
		applyPresetColor(2, mode);
	}
}

function updateBadgeColorMode() {
	const mode = document.querySelector('#station-badge-color-mode')?.value;
	if (mode) {
		card.station.badgeColorMode = mode;
		handleColorMode('badge', mode);
		stationEdited();
	}
}

function updatePTColorMode() {
	const mode = document.querySelector('#station-pt-color-mode')?.value;
	if (mode) {
		card.station.ptColorMode = mode;
		handleColorMode('pt', mode);
		stationEdited();
	}
}

function updateImageFromMana(imageType, imageProp, colorModeProp) {
	if (card.station[colorModeProp] !== 'auto' || !card.text?.mana) return;
	
	const manaSymbols = extractManaSymbols(card.text.mana.text || '');
	let suffix = 'a';
	
	if (manaSymbols.length === 1) suffix = manaSymbols[0];
	else if (manaSymbols.length > 1) suffix = 'm';
	
	const imagePath = `/img/frames/station/${imageType}/${suffix}.png`;
	const image = window[imageProp];
	
	if (image && !image.src.endsWith(imagePath)) {
		setImageUrl(image, imagePath);
	}
}

function updateBadgeImageFromMana() {
	updateImageFromMana('badges', 'stationBadgeImage', 'badgeColorMode');
	updateSquareColorsFromMana();
}

function updatePTImageFromMana() {
	updateImageFromMana('pt', 'stationPTImage', 'ptColorMode');
}

//=====================================
// INPUT MANAGEMENT
//=====================================

function fixStationInputs(callback) {
	const borderlessOffset = card.station.borderlessXOffset || 0;
	
	const inputMap = {
		'#station-disable-first-ability': card.station.disableFirstAbility || false,
		'#station-badge-value-1': card.station.badgeValues[1] || '',
		'#station-badge-value-2': card.station.badgeValues[2] || '',
		'#station-badge-color-mode': card.station.badgeColorMode || 'auto',
		'#station-pt-x-offset': card.station.ptSettings.x || 0,
		'#station-pt-y-offset': card.station.ptSettings.y || 0,
		'#station-pt-color-mode': card.station.ptColorMode || 'auto',
		'#station-square-width': card.station.squares[1].width,
		'#station-square-height-1': card.station.squares[1].height,
		'#station-square-height-2': card.station.squares[2].height,
		'#station-square-x': card.station.squares[1].x - borderlessOffset, // Subtract offset for UI display
		'#station-square-y': card.station.squares[1].y - 76,
		'#station-square-color': card.station.squares[1].color || '#e6ecf2',
		'#station-square-opacity-1': card.station.squares[1].opacity || 0.7,
		'#station-square-opacity-2': card.station.squares[2].opacity || 0.7
	};
	
	const disableCheckbox = document.querySelector('#station-disable-first-ability');
	if (disableCheckbox) disableCheckbox.checked = inputMap['#station-disable-first-ability'];
	delete inputMap['#station-disable-first-ability'];
	
	setInputValues(inputMap);
	
	const colorMode = document.querySelector('#station-square-color-mode');
	const colorPicker = document.querySelector('#station-square-color-picker');
	const opacity2Container = document.querySelector('#station-square-opacity-2-container');
	const opacity1Label = document.querySelector('#station-square-opacity-1-label');
	
	if (colorMode) {
		colorMode.value = card.station.colorModes[1] || 'auto';
		const isCustom = card.station.colorModes[1] === 'custom';
		const isAuto = card.station.colorModes[1] === 'auto';
		
		if (colorPicker) colorPicker.classList.toggle('hidden', !isCustom);
		if (opacity2Container) opacity2Container.classList.toggle('hidden', isAuto);
		if (opacity1Label) opacity1Label.textContent = isAuto ? 'Square Opacity:' : 'First Square Opacity:';
	}
	
	if (callback) callback();
}

//=====================================
// POSITION AND LAYOUT MANAGEMENT
//=====================================

function updateStationTextPositions() {
	if (!card.station?.baseTextPositions) return;
	
	let positionsChanged = false;
	
	if (card.text?.ability1 && card.station.squares[1]) {
		const square = card.station.squares[1];
		const basePos = card.station.baseTextPositions.ability1;
		
		if (!card.station.textOffsets) {
			card.station.textOffsets = {
				1: { x: square.width * 0.05, y: square.height * 0.05 },
				2: { x: square.width * 0.05, y: square.height * 0.05 }
			};
		}
		
		let textWidth = (square.width * 0.9) / card.width;
		const textHeight = (square.height * 0.9) / card.height;
		let textX, textY;
		
		if (card.station.disableFirstAbility) {
			textX = card.station.disabledTextX || 0.087; // Use completely separate X position and width when disabled
			textWidth = card.station.disabledTextWidth || 0.825; // Use separate width setting instead of square calculation
			textY = basePos.y + (square.y + card.station.textOffsets[1].y) / card.height;
		} else {
			// Use normal calculation when enabled
			textX = basePos.x + (square.x + card.station.textOffsets[1].x - 214) / card.width;
			textY = basePos.y + (square.y + card.station.textOffsets[1].y) / card.height;
		}
		
		if (card.text.ability1.x !== textX || card.text.ability1.y !== textY || 
			card.text.ability1.width !== textWidth || card.text.ability1.height !== textHeight) {
			
			Object.assign(card.text.ability1, { x: textX, y: textY, width: textWidth, height: textHeight });
			positionsChanged = true;
		}
	}
	
	if (card.text?.ability2 && card.station.squares[2]) {
		const square = card.station.squares[2];
		const basePos = card.station.baseTextPositions.ability2;
		
		if (!card.station.textOffsets) {
			card.station.textOffsets = {
				1: { x: square.width * 0.05, y: square.height * 0.05 },
				2: { x: square.width * 0.05, y: square.height * 0.05 }
			};
		}
		
		let textWidth = (square.width * 0.9) / card.width;
		const textHeight = (square.height * 0.9) / card.height;
		
		const hasPT = card.text?.pt?.text?.trim();
		if (hasPT) textWidth *= 0.865;
		
		const textX = basePos.x + (square.x + card.station.textOffsets[2].x - 214) / card.width;
		const textY = basePos.y + (square.y + card.station.textOffsets[2].y) / card.height;
		
		if (card.text.ability2.x !== textX || card.text.ability2.y !== textY || 
			card.text.ability2.width !== textWidth || card.text.ability2.height !== textHeight) {
			
			Object.assign(card.text.ability2, { x: textX, y: textY, width: textWidth, height: textHeight });
			positionsChanged = true;
		}
	}
	
	if (positionsChanged) {
		setTimeout(() => { if (typeof textEdited === 'function') textEdited(); }, 10);
		setTimeout(() => { if (typeof drawCard === 'function') drawCard(); }, 20);
	}
}

//=====================================
// MAIN DRAWING AND EDITING FUNCTIONS
//=====================================

function stationEdited() {
	if (!stationPreFrameContext || !stationPostFrameContext) return;
	
	if (!card.station.baseTextPositions) {
		card.station.baseTextPositions = {
			ability1: {x: 0.18, y: 0.7},
			ability2: {x: 0.18, y: 0.83}
		};
	}
	
	// Consolidate all input processing into one loop
	const inputElements = [
		{id: '#station-badge-value-1', target: 'card.station.badgeValues[1]', type: 'value'},
		{id: '#station-badge-value-2', target: 'card.station.badgeValues[2]', type: 'value'},
		{id: '#station-disable-first-ability', target: 'card.station.disableFirstAbility', type: 'checked'},
		{id: '#station-pt-x-offset', target: 'card.station.ptSettings.x', type: 'int'},
		{id: '#station-pt-y-offset', target: 'card.station.ptSettings.y', type: 'int'},
		{id: '#station-square-width', target: 'both-squares.width', type: 'int'},
		{id: '#station-square-x', target: 'both-squares.x', type: 'int'},
		{id: '#station-square-height-1', target: 'card.station.squares[1].height', type: 'int'},
		{id: '#station-square-height-2', target: 'card.station.squares[2].height', type: 'int'},
		{id: '#station-square-y', target: 'card.station.squares[1].y', type: 'int-offset-76'},
		{id: '#station-square-opacity-1', target: 'card.station.squares[1].opacity', type: 'float'},
		{id: '#station-square-opacity-2', target: 'card.station.squares[2].opacity', type: 'float'}
	];
	
	const previousDisableState = card.station.disableFirstAbility;
	
	inputElements.forEach(({id, target, type}) => {
		const element = document.querySelector(id);
		if (!element) return;
		
		let value = element[type === 'checked' ? 'checked' : 'value'];
		if (type === 'int') value = parseInt(value) || 0;
		if (type === 'int-offset-76') value = (parseInt(value) || 0) + 76;
		if (type === 'float') value = parseFloat(value);
		
		if (target === 'both-squares.width') {
			card.station.squares[1].width = value;
			card.station.squares[2].width = value;
		} else if (target === 'both-squares.x') {
			const borderlessOffset = card.station.borderlessXOffset || 0;
			card.station.squares[1].x = value + borderlessOffset; // Add offset back to internal value
			card.station.squares[2].x = value + borderlessOffset; // Add offset back to internal value
		} else {
			eval(`${target} = value`);
		}
	});
	
	// Handle color picker
	const colorInput = document.querySelector('#station-square-color');
	if (colorInput && card.station.colorModes[1] === 'custom') {
		card.station.squares[1].color = colorInput.value;
		card.station.squares[2].color = colorInput.value;
	}
	
	// Handle auto mode opacity linking - ADD THIS SECTION
	const mode1 = card.station.colorModes[1];
	const mode2 = card.station.colorModes[2];
	
	if (mode1 === 'auto' && mode2 === 'auto') {
		// In auto mode, update second square opacity based on first square opacity
		const manaText = card.text?.mana?.text || '';
		const manaSymbols = extractManaSymbols(manaText);
		
		let colorKey = 'default';
		if (manaSymbols.length === 1) colorKey = manaSymbols[0];
		else if (manaSymbols.length > 1) colorKey = 'm';
		
		const colorSet = card.station.colorSettings[colorKey];
		if (colorSet) {
			const opacityOffset = colorSet.square2OpacityOffset || 0.2;
			const newSecondOpacity = card.station.disableFirstAbility ? 
				card.station.squares[1].opacity : 
				Math.min(1.0, card.station.squares[1].opacity + opacityOffset);
			
			card.station.squares[2].opacity = newSecondOpacity;
			
			// Update the hidden second opacity slider to reflect the calculated value
			const opacityInput2 = document.querySelector('#station-square-opacity-2');
			if (opacityInput2) opacityInput2.value = newSecondOpacity;
		}
	}
	
	// Handle disable state change
	if (previousDisableState !== card.station.disableFirstAbility) {
		if (mode2 === 'auto') updateSquareColorsFromMana();
		else if (mode2 !== 'custom') applyPresetColor(2, mode2);
		else {
			const newOpacity = card.station.disableFirstAbility ? 
				card.station.squares[1].opacity : 
				Math.min(1.0, card.station.squares[1].opacity + 0.2);
			card.station.squares[2].opacity = newOpacity;
			const opacityInput2 = document.querySelector('#station-square-opacity-2');
			if (opacityInput2) opacityInput2.value = newOpacity;
		}
	}
	
	// Auto-update square 2 Y position based on square 1 with maximum limit
	const basePos1 = card.station.baseTextPositions.ability1;
	const basePos2 = card.station.baseTextPositions.ability2;
	const square1Bottom = scaleY(basePos1.y) + card.station.squares[1].y + card.station.squares[1].height;
	const calculatedY = square1Bottom - scaleY(basePos2.y);
	
	// Set square 2 Y position
	card.station.squares[2].y = calculatedY;
	
	// Calculate maximum height based on distance from bottom - USE VERSION-SPECIFIC OVERRIDE
	let minDistanceFromBottom = card.station.minDistanceFromBottom || 300; // Default fallback
	
	// Check for version-specific override
	if (card.station.importSettings?.versionOverrides?.[card.version]?.minDistanceFromBottom) {
		minDistanceFromBottom = card.station.importSettings.versionOverrides[card.version].minDistanceFromBottom;
	}
	
	// Account for margins by adding 80 to the minimum distance
	if (card.margins) {
		minDistanceFromBottom += 60;
	}
	
	// Use scaleHeight for consistent scaling like planeswalker does
	const scaledMinDistance = scaleHeight(minDistanceFromBottom / 2100); // Convert to relative then scale
	const canvasHeight = stationPreFrameCanvas.height; // Use actual canvas height
	
	const maxAllowedBottom = canvasHeight - scaledMinDistance;
	
	// Always set square 2 height to the maximum allowed height
	const maxHeight = maxAllowedBottom - (scaleY(basePos2.y) + card.station.squares[2].y);
	card.station.squares[2].height = Math.max(50, maxHeight); // Minimum height of 50px
	
	// Update the UI input to reflect the calculated height
	const heightInput = document.querySelector('#station-square-height-2');
	if (heightInput) {
		heightInput.value = card.station.squares[2].height;
	}
	
	updateStationTextPositions();
	
	// Clear and redraw
	[stationPreFrameContext, stationPostFrameContext].forEach(ctx => 
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height));
	
	// Only draw square 1 if not disabled
	if (!card.station.disableFirstAbility) {
		drawStationSquare(1);
	}
	drawStationSquare(2);
	
	setupDrawingContext(stationPreFrameContext, {alpha: 1});
	drawStationBadges();
	drawCard();
}

//=====================================
// DRAWING FUNCTIONS
//=====================================

function drawStationSquare(index) {
	const square = card.station.squares[index];
	const abilityName = `ability${index}`;
	
	// For square 1, check if it's disabled
	if (index === 1 && card.station.disableFirstAbility) {
		// Don't draw the square (make it transparent) but keep all other properties
		return;
	}
	
	if (square.enabled && card.text?.[abilityName]) {
		const basePos = card.station.baseTextPositions[abilityName];
		const squareX = scaleX(basePos.x) + (square.x - 214);
		const squareY = scaleY(basePos.y) + square.y;
		
		stationPreFrameContext.fillStyle = square.color;
		stationPreFrameContext.globalAlpha = square.opacity;
		stationPreFrameContext.fillRect(squareX, squareY, square.width, square.height);
	}
}

function drawStationBadges() {
	setupDrawingContext(stationPostFrameContext);
	
	const elements = [
		{type: 'badge', index: 1, key: 'ability1', image: stationBadgeImage, 
		 settings: card.station.badgeSettings, 
		 hasValue: () => card.station.badgeValues?.[1]?.trim() && /\d/.test(card.station.badgeValues[1])},
		{type: 'badge', index: 2, key: 'ability2', image: stationBadgeImage, 
		 settings: card.station.badgeSettings,
		 hasValue: () => card.station.badgeValues?.[2]?.trim() && /\d/.test(card.station.badgeValues[2])},
		{type: 'pt', index: 2, key: 'ability2', image: stationPTImage, 
		 settings: card.station.ptSettings,
		 hasValue: () => card.text?.pt?.text?.trim()}
	];
	
	elements.forEach(element => {
		if (element.type === 'pt') {
			stationPostFrameContext.font = scaleHeight(element.settings.fontSize) + 'px belerenbsc';
		}
		drawStationElement(element.type, element.index, element.key, element.image, element.settings, element.hasValue);
	});
}

function drawStationElement(elementType, index, textKey, image, settings, hasValue) {
	if (!hasValue()) return;
	
	const square = card.station.squares[index];
	const basePos = card.station.baseTextPositions[textKey];
	const squareX = scaleX(basePos.x) + (square.x - 214);
	const squareY = scaleY(basePos.y) + square.y;
	
	const width = settings.width;
	const height = settings.height;
	const elementX = elementType === 'pt' ? 
		squareX + square.width + (settings.x - 266) : 
		squareX + (settings.x || -81);
	const elementY = squareY + (square.height / 2) + (settings.y || 0);
	
	if (image?.complete && image.naturalWidth > 0) {
		stationPostFrameContext.drawImage(image, elementX, elementY - (height / 2), width, height);
	}
	
	const textXOffset = 3;
	const textYOffset = elementType === 'pt' ? 7 : 5;
	const textX = elementX + (width / 2) + textXOffset;
	const textY = elementY + textYOffset;
	
	const textValue = elementType === 'pt' ? 
		card.text.pt.text : 
		card.station.badgeValues[index];
	
	stationPostFrameContext.fillText(textValue, textX, textY);
}

//=====================================
// COLOR AND SQUARE MANAGEMENT
//=====================================

function updateSquareColorsFromMana() {
	if (!card.text?.mana || !card.station.colorSettings) return;
	
	const mode1 = card.station.colorModes[1];
	const mode2 = card.station.colorModes[2];
	
	if (mode1 !== 'auto' && mode2 !== 'auto') return;
	
	const manaText = card.text.mana.text || '';
	const manaSymbols = extractManaSymbols(manaText);
	
	let colorKey = 'default';
	if (manaSymbols.length === 1) colorKey = manaSymbols[0];
	else if (manaSymbols.length > 1) colorKey = 'm';
	
	const colorSet = card.station.colorSettings[colorKey];
	if (!colorSet) return;
	
	const disableFirstAbility = card.station.disableFirstAbility;
	let changesApplied = false;
	
	if (mode1 === 'auto' && card.station.squares[1].color !== colorSet.square1) {
		card.station.squares[1].color = colorSet.square1;
		changesApplied = true;
	}
	
	if (mode2 === 'auto') {
		const opacityOffset = colorSet.square2OpacityOffset || 0.2;
		const newOpacity = disableFirstAbility ? 
			card.station.squares[1].opacity : 
			Math.min(1.0, card.station.squares[1].opacity + opacityOffset);
		
		if (card.station.squares[2].color !== colorSet.square1 || 
			Math.abs(card.station.squares[2].opacity - newOpacity) > 0.01) {
			
			card.station.squares[2].color = colorSet.square1;
			card.station.squares[2].opacity = newOpacity;
			
			const opacityInput2 = document.querySelector('#station-square-opacity-2');
			if (opacityInput2) opacityInput2.value = card.station.squares[2].opacity;
			changesApplied = true;
		}
	}
}

function toggleSquareColorPicker() {
	const modeSelect = document.querySelector('#station-square-color-mode');
	const colorPickerDiv = document.querySelector('#station-square-color-picker');
	const opacity2Container = document.querySelector('#station-square-opacity-2-container');
	const opacity1Label = document.querySelector('#station-square-opacity-1-label');
	
	if (!modeSelect || !colorPickerDiv) return;
	
	const mode = modeSelect.value;
	card.station.colorModes[1] = mode;
	card.station.colorModes[2] = mode;
	
	colorPickerDiv.classList.toggle('hidden', mode !== 'custom');
	
	if (mode !== 'custom') {
		// Reset opacities to defaults when changing color modes
		card.station.squares[1].opacity = 0.2; // Reset to default
		card.station.squares[2].opacity = 0.4; // Reset to default
		
		// Update UI inputs to reflect reset values
		const opacity1Input = document.querySelector('#station-square-opacity-1');
		const opacity2Input = document.querySelector('#station-square-opacity-2');
		if (opacity1Input) opacity1Input.value = card.station.squares[1].opacity;
		if (opacity2Input) opacity2Input.value = card.station.squares[2].opacity;
		
		applyPresetColor(1, mode);
		applyPresetColor(2, mode);
	}
	
	if (opacity2Container && opacity1Label) {
		const isAuto = mode === 'auto';
		opacity2Container.classList.toggle('hidden', isAuto);
		opacity1Label.textContent = isAuto ? 'Square Opacity:' : 'First Square Opacity:';
	}
	
	stationEdited();
}

function applyPresetColor(index, mode) {
	const colorSettings = card.station.colorSettings;
	const colorMap = {
		auto: () => updateSquareColorsFromMana(),
		white: colorSettings.w,
		blue: colorSettings.u,
		black: colorSettings.b,
		red: colorSettings.r,
		green: colorSettings.g,
		multi: colorSettings.m,
		colorless: colorSettings.default,
		artifact: colorSettings.a,
		land: colorSettings.l
	};
	
	if (mode === 'auto') {
		updateSquareColorsFromMana();
		return;
	}
	
	const colorSet = colorMap[mode] || colorSettings.default;
	const color = colorSet.square1;
	const opacityOffset = colorSet.square2OpacityOffset || 0.2;
	
	card.station.squares[index].color = color;
	
	if (index === 2 && !card.station.disableFirstAbility) {
		card.station.squares[2].opacity = Math.min(1.0, 0.2 + opacityOffset);
		
		const opacityInput = document.querySelector('#station-square-opacity-2');
		if (opacityInput) opacityInput.value = card.station.squares[2].opacity;
	} else if (index === 2 && card.station.disableFirstAbility) {
		card.station.squares[2].opacity = 0.2;
		
		const opacityInput = document.querySelector('#station-square-opacity-2');
		if (opacityInput) opacityInput.value = card.station.squares[2].opacity;
	}
}

//=====================================
// RESET FUNCTIONALITY
//=====================================

function resetStationSettings() {
	const preservedBadgeValues = card.station?.badgeValues ? [...card.station.badgeValues] : ['', '', ''];
	const preservedBorderlessOffset = card.station?.borderlessXOffset;
	
	// Clear existing watchers before reset
	clearStationListeners();
	
	delete card.station;
	initializeStationDefaults();
	card.station.badgeValues = preservedBadgeValues;
	
	// Re-establish watchers after reset
	setupStationListeners();
	
	fixStationInputs(() => {
		if (card.text?.mana?.text) {
			setTimeout(() => {
				updateBadgeImageFromMana();
				updatePTImageFromMana();
				updateSquareColorsFromMana();
				stationEdited();
			}, 100);
		} else {
			stationEdited();
		}
	});
}