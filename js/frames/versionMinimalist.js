//checks to see if it needs to run

//============================================================================
// CONSTANTS AND CONFIGURATION
//============================================================================

// Check if constants already exist before declaring them
if (typeof MINIMALIST_DEFAULTS === 'undefined') {
	const MINIMALIST_DEFAULTS = {
		baseY: 0.935,
		spacing: 0.05,
		minHeight: 0.1,
		maxHeight: 0.25,
		currentHeight: 0.1,
		settings: {
			maxOpacity: 0.95,
			fadeBottomOffset: -0.05,
			fadeTopOffset: -0.15,
			solidEnd: 1,
			bgColor1: '#000000',
			bgColor2: '#000000',
			bgColor3: '#000000',
			bgColorCount: '1'
		},
		dividerSettings: {
			color1: '#FFF7D8',
			color2: '#26C7FE',
			color3: '#B264FF',
			colorCount: 'auto'
		},
		ptSettings: {
			enabled: true,
			colorMode: 'auto',
			color1: '#FFFFFF',
			color2: '#FFFFFF'
		},
		typeSettings: {
			autoColor: true,
			customColor: '#FFFFFF'
		}
	};
	window.MINIMALIST_DEFAULTS = MINIMALIST_DEFAULTS;
}

if (typeof COLOR_MAP === 'undefined') {
	const COLOR_MAP = {
		'white': '#FFF7D8',
		'blue': '#26C7FE',
		'black': '#B264FF',
		'red': '#F13F35',
		'green': '#29EEA6'
	};
	window.COLOR_MAP = COLOR_MAP;
}

if (typeof MANA_COLOR_MAP === 'undefined') {
	const MANA_COLOR_MAP = {
		'w': 'white',
		'u': 'blue',
		'b': 'black',
		'r': 'red',
		'g': 'green'
	};
	window.MANA_COLOR_MAP = MANA_COLOR_MAP;
}

// Cache color calculations - use window object to avoid redeclaration
if (typeof COLOR_CACHE === 'undefined') {
	window.COLOR_CACHE = new Map();
}

//============================================================================
// PERFORMANCE OPTIMIZATIONS
//============================================================================

// Check if DOM_CACHE already exists
if (typeof DOM_CACHE === 'undefined') {
	const DOM_CACHE = {
		textEditor: null,
		uiElements: new Map(),
		initialized: false
	};
	window.DOM_CACHE = DOM_CACHE;
}

// Check if CALC_CACHE already exists
if (typeof CALC_CACHE === 'undefined') {
	const CALC_CACHE = {
		cardDimensions: null,
		lastWidth: 0,
		lastHeight: 0
	};
	window.CALC_CACHE = CALC_CACHE;
}

function initDOMCache() {
	if (window.DOM_CACHE.initialized) return;
	
	window.DOM_CACHE.textEditor = document.querySelector('#text-editor');
	
	// Cache UI elements that are accessed frequently
	const elementIds = [
		'minimalist-bg-gradient-enabled', 'minimalist-divider-enabled',
		'minimalist-max-opacity', 'minimalist-fade-bottom-offset',
		'minimalist-fade-top-offset', 'minimalist-bg-color-count',
		'minimalist-color-count', 'minimalist-pt-symbols-enabled',
		'minimalist-pt-color-mode', 'minimalist-bg-color-1',
		'minimalist-bg-color-2', 'minimalist-bg-color-3',
		'minimalist-color-1', 'minimalist-color-2', 'minimalist-color-3',
		'minimalist-pt-color-1', 'minimalist-pt-color-2',
		'minimalist-type-auto-color', 'minimalist-type-color'
	];
	
	elementIds.forEach(id => {
		const element = document.getElementById(id);
		if (element) window.DOM_CACHE.uiElements.set(id, element);
	});
	
	window.DOM_CACHE.initialized = true;
}

function getCachedElement(id) {
	if (!window.DOM_CACHE.initialized) initDOMCache();
	return window.DOM_CACHE.uiElements.get(id) || document.getElementById(id);
}

function getCardDimensions() {
	if (window.CALC_CACHE.lastWidth !== card.width || window.CALC_CACHE.lastHeight !== card.height) {
		window.CALC_CACHE.cardDimensions = {
			width: card.width,
			height: card.height,
			halfWidth: card.width / 2,
			halfHeight: card.height / 2
		};
		window.CALC_CACHE.lastWidth = card.width;
		window.CALC_CACHE.lastHeight = card.height;
	}
	return window.CALC_CACHE.cardDimensions;
}

//============================================================================
// SYMBOL LOADING
//============================================================================

// Check if variables already exist before declaring them
if (typeof powerSymbol === 'undefined') {
	const powerSymbol = new Image();
	powerSymbol.crossOrigin = 'anonymous';
	powerSymbol.src = fixUri('/img/frames/minimalist/p.svg');
	window.powerSymbol = powerSymbol; // Make it globally accessible
}

if (typeof powerSymbolLoaded === 'undefined') {
	let powerSymbolLoaded = false;
	window.powerSymbolLoaded = powerSymbolLoaded; // Make it globally accessible
}

if (typeof toughnessSymbol === 'undefined') {
	const toughnessSymbol = new Image();
	toughnessSymbol.crossOrigin = 'anonymous';
	toughnessSymbol.src = fixUri('/img/frames/minimalist/t.svg');
	window.toughnessSymbol = toughnessSymbol; // Make it globally accessible
}

if (typeof toughnessSymbolLoaded === 'undefined') {
	let toughnessSymbolLoaded = false;
	window.toughnessSymbolLoaded = toughnessSymbolLoaded; // Make it globally accessible
}

// Set up onload handlers only if not already set
if (!window.powerSymbol.onload) {
	window.powerSymbol.onload = () => {
		window.powerSymbolLoaded = true;
		drawCard();
	};
}

if (!window.toughnessSymbol.onload) {
	window.toughnessSymbol.onload = () => {
		window.toughnessSymbolLoaded = true;
		drawCard();
	};
}

//============================================================================
// UTILITY FUNCTIONS
//============================================================================

function hexToRgba(hex, alpha) {
	const cacheKey = `${hex}_${alpha}`;
	if (window.COLOR_CACHE.has(cacheKey)) {
		return window.COLOR_CACHE.get(cacheKey);
	}
	
	const rgb = hexToRgb(hex);
	const result = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
	
	// Limit cache size
	if (window.COLOR_CACHE.size > 100) {
		const firstKey = window.COLOR_CACHE.keys().next().value;
		window.COLOR_CACHE.delete(firstKey);
	}
	
	window.COLOR_CACHE.set(cacheKey, result);
	return result;
}

function getColorHex(colorName) {
	return window.COLOR_MAP[colorName] || '#FFFFFF';
}

function blendColors(hex1, hex2, ratio = 0.5) {
	const rgb1 = hexToRgb(hex1);
	const rgb2 = hexToRgb(hex2);
	
	const r = Math.round(rgb1.r * (1 - ratio) + rgb2.r * ratio);
	const g = Math.round(rgb1.g * (1 - ratio) + rgb2.g * ratio);
	const b = Math.round(rgb1.b * (1 - ratio) + rgb2.b * ratio);
	
	return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}
function getManaColorsFromText() {
	if (!card.text.mana || !card.text.mana.text) {
		return [];
	}
	
	const manaText = card.text.mana.text;
	
	// Use cached result if text hasn't changed
	if (card.minimalist._lastManaText === manaText && card.minimalist._cachedManaColors) {
		return card.minimalist._cachedManaColors;
	}
	
	const colors = [];
	const manaMatches = manaText.match(/\{[^}]+\}/g);
	
	if (!manaMatches) {
		card.minimalist._cachedManaColors = colors;
		card.minimalist._lastManaText = manaText;
		return colors;
	}
	
	const seenColors = new Set();
	
	for (const match of manaMatches) {
		const symbol = match.toLowerCase().replace(/[{}]/g, '');
		
		if (MANA_COLOR_MAP[symbol] && !seenColors.has(MANA_COLOR_MAP[symbol])) {
			colors.push(MANA_COLOR_MAP[symbol]);
			seenColors.add(MANA_COLOR_MAP[symbol]);
		} else if (symbol.includes('/')) {
			const hybridColors = symbol.split('/');
			for (const hybridColor of hybridColors) {
				if (MANA_COLOR_MAP[hybridColor] && !seenColors.has(MANA_COLOR_MAP[hybridColor])) {
					colors.push(MANA_COLOR_MAP[hybridColor]);
					seenColors.add(MANA_COLOR_MAP[hybridColor]);
				}
			}
		}
	}
	
	card.minimalist._cachedManaColors = colors;
	card.minimalist._lastManaText = manaText;
	return colors;
}

function getManaHexColors() {
	return getManaColorsFromText().map(color => getColorHex(color));
}

function getMinimalistSetting(settingName, defaultValue = true) {
	const element = getCachedElement(`minimalist-${settingName}`);
	return element?.checked ?? defaultValue;
}

function updateCardSettings(settingsKey, newSettings) {
	if (!card.minimalist[settingsKey]) {
		card.minimalist[settingsKey] = {};
	}
	card.minimalist[settingsKey] = { ...card.minimalist[settingsKey], ...newSettings };
}

function drawSymbolIfReady(symbol, isLoaded, textObj, color, symbolWidth, symbolHeight, offsetX, offsetY) {
	if (textObj.text && textObj.text.length > 0 && isLoaded && symbol.complete) {
		drawColoredSymbolAtPosition(symbol, textObj, color, symbolWidth, symbolHeight, offsetX, offsetY);
	}
}

function setUIDefaults() {
	const settingsMap = {
		'max-opacity': window.MINIMALIST_DEFAULTS.settings.maxOpacity, // Use window version
		'fade-bottom-offset': window.MINIMALIST_DEFAULTS.settings.fadeBottomOffset,
		'fade-top-offset': window.MINIMALIST_DEFAULTS.settings.fadeTopOffset,
		'bg-gradient-enabled': true,
		'divider-enabled': true,
		'pt-symbols-enabled': window.MINIMALIST_DEFAULTS.ptSettings.enabled,
		'pt-color-mode': window.MINIMALIST_DEFAULTS.ptSettings.colorMode,
		'pt-color-1': window.MINIMALIST_DEFAULTS.ptSettings.color1,
		'pt-color-2': window.MINIMALIST_DEFAULTS.ptSettings.color2,
		'type-auto-color': window.MINIMALIST_DEFAULTS.typeSettings.autoColor,
		'type-color': window.MINIMALIST_DEFAULTS.typeSettings.customColor 
	};
	
	Object.entries(settingsMap).forEach(([key, value]) => {
		const element = document.getElementById(`minimalist-${key}`);
		if (element) {
			if (element.type === 'checkbox') {
				element.checked = value;
			} else {
				element.value = value;
			}
		}
	});
}

function debounce(func, wait, immediate = false) {
	let timeout;
	return function executedFunction(...args) {
		const later = () => {
			clearTimeout(timeout);
			if (!immediate) func(...args);
		};
		const callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func(...args);
	};

}

//============================================================================
// TEXT MEASUREMENT AND POSITIONING
//============================================================================

function measureTextHeight(text, ctx, width, fontSize) {
	if (!text) return 0;
	
	// Create more specific cache key
	const textHash = text.length > 100 ? 
		`${text.substring(0, 50)}_${text.substring(text.length - 50)}_${text.length}` : 
		text;
	const cacheKey = `${textHash}_${width}_${fontSize}`;
	
	if (card.minimalist.textCache && card.minimalist.textCache[cacheKey]) {
		return card.minimalist.textCache[cacheKey];
	}
	
	// Pre-calculate line height
	const lineHeight = fontSize * 1.2;
	const paragraphs = text.split('\n');
	let totalLines = 0;
	
	// Reuse measurement context properties
	ctx.font = `${fontSize}px "${card.text.rules?.font || 'Arial'}"`;
	
	for (const paragraph of paragraphs) {
		if (!paragraph.trim()) {
			totalLines++;
			continue;
		}
		
		const words = paragraph.split(' ');
		let currentLine = words[0] || '';
		
		for (let i = 1; i < words.length; i++) {
			const testLine = currentLine + ' ' + words[i];
			if (ctx.measureText(testLine).width > width) {
				totalLines++;
				currentLine = words[i];
			} else {
				currentLine = testLine;
			}
		}
		totalLines++;
	}
	
	const result = totalLines * lineHeight;
	
	// Limit cache size and manage memory
	if (!card.minimalist.textCache) card.minimalist.textCache = {};
	if (Object.keys(card.minimalist.textCache).length > 50) {
		// Remove oldest entries
		const keys = Object.keys(card.minimalist.textCache);
		keys.slice(0, 25).forEach(key => delete card.minimalist.textCache[key]);
	}
	
	card.minimalist.textCache[cacheKey] = result;
	return result;
}

function measureTextWidth(text, textObj) {
	if (!text) return 0;
	
	const dims = getCardDimensions();
	const ctx = textContext || card.minimalist.ctx;
	
	// Save current context state
	ctx.save();
	
	// Set font properties to match the text object exactly
	const fontSize = textObj.size * dims.height;
	const fontFamily = textObj.font || 'Arial';
	ctx.font = `${fontSize}px "${fontFamily}"`;
	
	// Apply any text styling that might affect width
	ctx.textBaseline = 'middle';
	ctx.textAlign = 'left';
	
	// Measure the text
	const metrics = ctx.measureText(text);
	const width = metrics.width;
	
	// Restore context state
	ctx.restore();
	
	return width;
}

function updateTextPositions(rulesHeight) {
	const dividerOffset = 0.03;
	const dividerSpacing = 0.02;
	
	const rulesY = card.minimalist.baseY - rulesHeight - dividerOffset;
	const typeY = rulesY - (card.minimalist.spacing * 0.9) - dividerSpacing;
	const titleY = typeY - (card.minimalist.spacing * 0.65);
	const manaY = titleY - (card.minimalist.spacing * 0.6);
	
	const dividerOffset2 = 0.050;
	const dividerY = typeY + dividerOffset2;
	const setSymbolOffsetAboveDivider = 0.025;
	const setSymbolY = dividerY - setSymbolOffsetAboveDivider;

    // Update text positions - all using 0.090 for x coordinate
    if (card.text.rules) {
        card.text.rules.y = rulesY;
        card.text.rules.height = rulesHeight;
    }
    if (card.text.type) {
        card.text.type.y = typeY;
        card.text.type.x = 0.090;
    }
    if (card.text.title) {
        card.text.title.y = titleY;
        card.text.title.x = 0.090;
    }
    if (card.text.mana) {
        card.text.mana.y = manaY;
        card.text.mana.x = 0.090;
    }
    
    // Update set symbol position
    if (card.setSymbolBounds) {
        card.setSymbolBounds.y = setSymbolY;
        resetSetSymbol();
    }

    // Update background gradient
    updateBackgroundGradient(manaY, rulesY);
    
    // Update divider
    const dividerEnabled = getMinimalistSetting('divider-enabled');
    if (dividerEnabled) {
        drawDividerGradient();
    }
    
    drawCard();
    return { rulesY, typeY, titleY, manaY, setSymbolY };
}



//============================================================================
// GRADIENT AND VISUAL EFFECTS
//============================================================================

function createGradientForColors(context, x, y, width, colorsToUse, colorCount) {
	const gradient = context.createLinearGradient(x, 0, x + width, 0);
	
	if (colorCount === 0) {
		gradient.addColorStop(0, hexToRgba('#CBC2C0', 0.5));
		gradient.addColorStop(0.25, hexToRgba('#CBC2C0', 1));
		gradient.addColorStop(0.75, hexToRgba('#CBC2C0', 1));
		gradient.addColorStop(1, hexToRgba('#CBC2C0', 0.5));
	} else if (colorCount === 1) {
		const color = colorsToUse[0];
		gradient.addColorStop(0, hexToRgba(color, 0.5));
		gradient.addColorStop(0.25, hexToRgba(color, 1));
		gradient.addColorStop(0.75, hexToRgba(color, 1));
		gradient.addColorStop(1, hexToRgba(color, 0.5));
	} else if (colorCount === 2) {
		const [color1, color2] = colorsToUse;
		gradient.addColorStop(0, hexToRgba(color1, 0.5));
		gradient.addColorStop(0.25, hexToRgba(color1, 1));
		gradient.addColorStop(0.45, hexToRgba(color1, 1));
		gradient.addColorStop(0.5, hexToRgba(blendColors(color1, color2), 1));
		gradient.addColorStop(0.55, hexToRgba(color2, 1));
		gradient.addColorStop(0.75, hexToRgba(color2, 1));
		gradient.addColorStop(1, hexToRgba(color2, 0.5));
	} else if (colorCount === 3) {
		const [color1, color2, color3] = colorsToUse;
		gradient.addColorStop(0, hexToRgba(color1, 0.5));
		gradient.addColorStop(0.167, hexToRgba(color1, 1));
		gradient.addColorStop(0.31, hexToRgba(color1, 1));
		gradient.addColorStop(0.333, hexToRgba(blendColors(color1, color2), 1));
		gradient.addColorStop(0.356, hexToRgba(color2, 1));
		gradient.addColorStop(0.644, hexToRgba(color2, 1));
		gradient.addColorStop(0.667, hexToRgba(blendColors(color2, color3), 1));
		gradient.addColorStop(0.69, hexToRgba(color3, 1));
		gradient.addColorStop(0.833, hexToRgba(color3, 1));
		gradient.addColorStop(1, hexToRgba(color3, 0.5));
	} else {
		gradient.addColorStop(0, hexToRgba('#e3d193', 0.5));
		gradient.addColorStop(0.25, hexToRgba('#e3d193', 1));
		gradient.addColorStop(0.75, hexToRgba('#e3d193', 1));
		gradient.addColorStop(1, hexToRgba('#e3d193', 0.5));
	}
	
	return gradient;
}

function drawDividerGradient() {
	if (!card.text.rules || !card.text.type || card.version !== 'Minimalist') {
		return;
	}
	
	// Initialize canvas only once with optimizations
	if (!card.dividerCanvas) {
		const dims = getCardDimensions();
		card.dividerCanvas = document.createElement('canvas');
		card.dividerCanvas.width = dims.width;
		card.dividerCanvas.height = dims.height;
		card.dividerContext = card.dividerCanvas.getContext('2d');
		
		// Set context properties once for better performance
		card.dividerContext.imageSmoothingEnabled = true;
		card.dividerContext.imageSmoothingQuality = 'high';
	}
	
	// Clear and draw in one operation
	const ctx = card.dividerContext;
	const dims = getCardDimensions();
	ctx.clearRect(0, 0, dims.width, dims.height);
	
	const dividerEnabled = getMinimalistSetting('divider-enabled');
	
	// Batch drawing operations
	if (dividerEnabled) {
		const { colorsToUse, colorCount } = getDividerColors();
		drawDividerBar(colorsToUse, colorCount);
	}
	
	drawPTSymbols();
}

function getDividerColors() {
	let colorsToUse = [];
	let colorCount = 0;
	
	if (card.minimalist.dividerSettings && card.minimalist.dividerSettings.colorCount !== 'auto') {
		colorCount = parseInt(card.minimalist.dividerSettings.colorCount);
		const customColors = [
			card.minimalist.dividerSettings.color1,
			card.minimalist.dividerSettings.color2,
			card.minimalist.dividerSettings.color3
		];
		colorsToUse = customColors.slice(0, colorCount);
	} else {
		colorsToUse = getManaHexColors();
		colorCount = colorsToUse.length;
	}
	
	return { colorsToUse, colorCount };
}

function drawDividerBar(colorsToUse, colorCount) {
	const rulesX = 0.086;
	const rulesWidth = 0.831;
	const typeY = card.text.type.y;
	const dividerOffset = 0.050;
	const dividerY = typeY + dividerOffset;
	const dividerHeight = 0.002;
	
	const actualX = rulesX * card.width;
	const actualY = dividerY * card.height;
	const actualWidth = rulesWidth * card.width;
	const actualHeight = dividerHeight * card.height;
	
	const gradient = createGradientForColors(card.dividerContext, actualX, actualY, actualWidth, colorsToUse, colorCount);
	
	card.dividerContext.fillStyle = gradient;
	card.dividerContext.fillRect(actualX, actualY, actualWidth, actualHeight);
}

function drawPTSymbols() {
	if (!card.text.power || !card.text.toughness) return;
	
	const ptEnabled = card.minimalist.ptSettings?.enabled ?? true;
	if (!ptEnabled) return;

	const hasPower = card.text.power.text && card.text.power.text.length > 0;
	const hasToughness = card.text.toughness.text && card.text.toughness.text.length > 0;

	if (!hasPower && !hasToughness) return;

	const { powerColor, toughnessColor } = getPTColors();
	const dims = getCardDimensions();
	
	// Symbol sizes
	const powerSymbolWidth = 99;
	const powerSymbolHeight = 175;
	const toughnessSymbolWidth = 101;
	const toughnessSymbolHeight = 175;
	
	// Separate spacing controls for each gap
	const toughnessTextToSymbolSpacing = -17; // pixels between toughness text and toughness symbol
	const toughnessSymbolToPowerTextSpacing = 145; // pixels between toughness symbol and power text
	const powerTextToSymbolSpacing = -17; // pixels between power text and power symbol
	
	// Step 1: Keep toughness at pack's fixed position
	const toughnessTextCenterX = card.text.toughness.x * dims.width;
	const toughnessTextY = card.text.toughness.y * dims.height;
	
	// Step 2: Calculate the actual left edge of toughness text (since it's centered)
	const toughnessTextWidth = measureTextWidth(card.text.toughness.text, card.text.toughness);
	const toughnessTextLeftEdge = toughnessTextCenterX - (toughnessTextWidth / 2);
	
	// Position toughness symbol with its own spacing
	const toughnessSymbolX = toughnessTextLeftEdge - toughnessTextToSymbolSpacing;
	const toughnessSymbolY = toughnessTextY - (toughnessSymbolHeight / 2) + (card.text.toughness.size * dims.height / 2);
	
	// Step 3: Position power text with its own spacing from toughness symbol
	const powerTextWidth = measureTextWidth(card.text.power.text, card.text.power);
	const powerTextCenterX = toughnessSymbolX - toughnessSymbolToPowerTextSpacing - (powerTextWidth / 2);
	
	// Step 4: Position power symbol with its own spacing from power text
	const powerTextLeftEdge = powerTextCenterX - (powerTextWidth / 2);
	const powerSymbolX = powerTextLeftEdge - powerTextToSymbolSpacing;
	const powerSymbolY = toughnessTextY - (powerSymbolHeight / 2) + (card.text.power.size * dims.height / 2);
	
	// Update the power text position
	if (hasPower) {
		card.text.power.x = powerTextCenterX / dims.width;
		card.text.power.y = card.text.toughness.y; // Use same Y as toughness
	}
	
	// Draw symbols at calculated positions
	if (hasPower && window.powerSymbolLoaded) {
		drawColoredSymbolAtPosition(window.powerSymbol, powerColor, powerSymbolWidth, powerSymbolHeight, powerSymbolX, powerSymbolY);
	}
	if (hasToughness && window.toughnessSymbolLoaded) {
		drawColoredSymbolAtPosition(window.toughnessSymbol, toughnessColor, toughnessSymbolWidth, toughnessSymbolHeight, toughnessSymbolX, toughnessSymbolY);
	}
}

function getPTColors() {
	const colorMode = card.minimalist.ptSettings?.colorMode ?? 'auto';
	let powerColor, toughnessColor;

	if (colorMode === 'auto') {
		const manaColors = getManaColorsFromText();
		if (manaColors.length === 0) {
			powerColor = toughnessColor = '#CBC2C0';
		} else if (manaColors.length === 1) {
			powerColor = toughnessColor = getColorHex(manaColors[0]);
		} else if (manaColors.length === 2) {
			powerColor = getColorHex(manaColors[0]);
			toughnessColor = getColorHex(manaColors[1]);
		} else {
			powerColor = toughnessColor = '#e3d193';
		}
	} else if (colorMode === '1') {
		powerColor = toughnessColor = card.minimalist.ptSettings.color1;
	} else {
		powerColor = card.minimalist.ptSettings.color1;
		toughnessColor = card.minimalist.ptSettings.color2;
	}

	return { powerColor, toughnessColor };
}

function drawColoredSymbolAtPosition(symbol, color, symbolWidth, symbolHeight, x, y) {
	// Reuse temp canvas if possible
	if (!card.minimalist._tempCanvas) {
		card.minimalist._tempCanvas = document.createElement('canvas');
		card.minimalist._tempCtx = card.minimalist._tempCanvas.getContext('2d');
	}
	
	const tempCanvas = card.minimalist._tempCanvas;
	const tempCtx = card.minimalist._tempCtx;
	
	// Only resize if necessary
	if (tempCanvas.width !== symbolWidth || tempCanvas.height !== symbolHeight) {
		tempCanvas.width = symbolWidth;
		tempCanvas.height = symbolHeight;
	}
	
	tempCtx.clearRect(0, 0, symbolWidth, symbolHeight);
	tempCtx.drawImage(symbol, 0, 0, symbolWidth, symbolHeight);
	tempCtx.globalCompositeOperation = 'source-in';
	tempCtx.fillStyle = color;
	tempCtx.fillRect(0, 0, symbolWidth, symbolHeight);
	tempCtx.globalCompositeOperation = 'source-over'; // Reset
	
	card.dividerContext.drawImage(tempCanvas, x, y);
}

function toggleColorVisibility(type) {
	const config = {
		bg: {
			countElement: 'minimalist-bg-color-count',
			containers: ['bg-color-1-container', 'bg-color-2-container', 'bg-color-3-container'],
			autoValue: 'mana-auto'
		},
		divider: {
			countElement: 'minimalist-color-count',
			containers: ['divider-color-1-container', 'divider-color-2-container', 'divider-color-3-container'],
			autoValue: 'auto'
		},
		pt: {
			countElement: 'minimalist-pt-color-mode',
			containers: ['pt-color-1-container', 'pt-color-2-container'],
			autoValue: 'auto'
		},
		type: {
			checkboxElement: 'minimalist-type-auto-color',
			containers: ['type-color-container']
		}
	};

	const settings = config[type];
	if (!settings) return;

	// Handle type color (checkbox-based) differently
	if (type === 'type') {
		const autoColorCheckbox = document.getElementById(settings.checkboxElement);
		const container = document.getElementById(settings.containers[0]);
		const colorInput = document.getElementById('minimalist-type-color');
		
		if (autoColorCheckbox && container) {
			const isAutoChecked = autoColorCheckbox.checked;
			container.style.display = isAutoChecked ? 'none' : 'block';
			
			// ALWAYS keep the input enabled, just hide/show the container
			if (colorInput) {
				colorInput.disabled = false;
			}
		}
		return;
	}

	// Handle dropdown-based visibility
	const countElement = document.getElementById(settings.countElement);
	const selectedValue = countElement.value;

	// Hide all containers first
	settings.containers.forEach(containerId => {
		const container = document.getElementById(containerId);
		if (container) container.style.display = 'none';
	});

	// Show appropriate containers based on selection
	if (selectedValue === settings.autoValue) {
		return;
	}

	const numColors = parseInt(selectedValue) || 0;
	for (let i = 0; i < Math.min(numColors, settings.containers.length); i++) {
		const container = document.getElementById(settings.containers[i]);
		if (container) container.style.display = 'block';
	}

}

//============================================================================
// UI CREATION AND EVENT HANDLERS
//============================================================================

function createMinimalistUI() {
	document.querySelector('#creator-menu-tabs').innerHTML += '<h3 class="selectable readable-background" onclick="toggleCreatorTabs(event, `minimalist`)">Minimalist</h3>';
	
	const newHTML = document.createElement('div');
	newHTML.id = 'creator-menu-minimalist';
	newHTML.classList.add('hidden');
	newHTML.innerHTML = getUIHTML();
	
	document.querySelector('#creator-menu-sections').appendChild(newHTML);
}

	function getUIHTML() {
	return `
	<div class='readable-background padding'>
	<h5 class='padding margin-bottom input-description' style="font-size: 2em; font-weight: bold;">Gradient Settings</h5>
	<div style="height: 2px; background-color: rgba(255,255,255,0.1); margin: 10px 0;"></div>

	<h5 class='input-description margin-bottom'>Enable Background Gradient</h5>
	<label class='checkbox-container input margin-bottom'>Toggle Background Gradient
		<input id='minimalist-bg-gradient-enabled' type='checkbox' class='input' onchange='updateMinimalistGradient();' checked>
		<span class='checkmark'></span>
	</label>

	<h5 class='padding input-description'>Maximum Opacity (0-1):</h5>
	<div class='padding input-grid margin-bottom'>
		<input id='minimalist-max-opacity' type='number' class='input' oninput='updateMinimalistGradient();' min='0' max='1' step='0.01' value='0.95'>
	</div>

	<h5 class='padding input-description'>Fade Start Position:</h5>
	<div class='padding input-grid margin-bottom'>
		<input id='minimalist-fade-bottom-offset' type='number' class='input' oninput='updateMinimalistGradient();' min='-0.2' max='0.2' step='0.01' value='-0.05'>
	</div>

	<h5 class='padding input-description'>Fade End Position:</h5>
	<div class='padding input-grid margin-bottom'>
		<input id='minimalist-fade-top-offset' type='number' class='input' oninput='updateMinimalistGradient();' min='-0.5' max='0' step='0.01' value='-0.15'>
	</div>

	<div style="height: 2px; background-color: rgba(255,255,255,0.1); margin: 5px 0;"></div>

	<h5 class='padding margin-bottom input-description' style="font-size: 1.5em; font-weight: bold;">Background Gradient Colors</h5>

	<h5 class='padding input-description'>Background Colors:</h5>
	<div class='padding input-grid margin-bottom'>
		<select id='minimalist-bg-color-count' class='input' onchange='updateMinimalistGradient(); toggleColorVisibility("bg");'>
			<option value='1' selected>1 Color</option>
			<option value='mana-auto'>Auto (Mana Colors)</option>
			<option value='2'>2 Colors</option>
			<option value='3'>3 Colors</option>
		</select>
	</div> 

	<div id='bg-color-1-container'>
		<h5 class='padding input-description'>Background Color 1:</h5>
		<div class='padding input-grid margin-bottom'>
			<input id='minimalist-bg-color-1' type='color' class='input' oninput='updateMinimalistGradient();' value='#000000'>
		</div>
	</div>

	<div id='bg-color-2-container' style='display: none;'>
		<h5 class='padding input-description'>Background Color 2:</h5>
		<div class='padding input-grid margin-bottom'>
			<input id='minimalist-bg-color-2' type='color' class='input' oninput='updateMinimalistGradient();' value='#000000'>
		</div>
	</div>

	<div id='bg-color-3-container' style='display: none;'>
		<h5 class='padding input-description'>Background Color 3:</h5>
		<div class='padding input-grid margin-bottom'>
			<input id='minimalist-bg-color-3' type='color' class='input' oninput='updateMinimalistGradient();' value='#000000'>
		</div>
	</div>

	<div style="height: 2px; background-color: rgba(255,255,255,0.1); margin: 5px 0;"></div>

	<h5 class='padding margin-bottom input-description' style="font-size: 1.5em; font-weight: bold;">Type Line Color</h5>

	<h5 class='input-description margin-bottom'>Auto Type Line Color</h5>
	<label class='checkbox-container input margin-bottom'>Auto Color (from mana cost)
		<input id='minimalist-type-auto-color' type='checkbox' class='input' onchange='window.updateTypeLineColor(); toggleColorVisibility("type");' checked>
		<span class='checkmark'></span>
	</label>

	<div id='type-color-container' style='display: none;'>
		<h5 class='padding input-description'>Type Line Color:</h5>
		<div class='padding input-grid margin-bottom'>
			<input id='minimalist-type-color' type='color' class='input' oninput='window.updateTypeLineColor();' value='#FFFFFF'>
		</div>
	</div>

	<div style="height: 2px; background-color: rgba(255,255,255,0.1); margin: 5px 0;"></div>

	<h5 class='padding margin-bottom input-description' style="font-size: 1.5em; font-weight: bold;">Divider Bar</h5>

	<h5 class='input-description margin-bottom'>Enable Divider Bar</h5>
	<label class='checkbox-container input margin-bottom'>Toggle Divider Bar
		<input id='minimalist-divider-enabled' type='checkbox' class='input' onchange='updateDividerColors();' checked>
		<span class='checkmark'></span>
	</label>

	<h5 class='padding input-description'>Divider Colors:</h5>
	<div class='padding input-grid margin-bottom'>
		<select id='minimalist-color-count' class='input' onchange='updateDividerColors(); toggleColorVisibility("divider");'>
			<option value='auto'>Auto (from mana cost)</option>
			<option value='1'>1 Color</option>
			<option value='2'>2 Colors</option>
			<option value='3'>3 Colors</option>
		</select>
	</div>

	<div id='divider-color-1-container' style='display: none;'>
		<h5 class='padding input-description'>Color 1:</h5>
		<div class='padding input-grid margin-bottom'>
			<input id='minimalist-color-1' type='color' class='input' oninput='updateDividerColors();' value='#FFFFFF'>
		</div>
	</div>

	<div id='divider-color-2-container' style='display: none;'>
		<h5 class='padding input-description'>Color 2:</h5>
		<div class='padding input-grid margin-bottom'>
			<input id='minimalist-color-2' type='color' class='input' oninput='updateDividerColors();' value='#FFFFFF'>
		</div>
	</div>

	<div id='divider-color-3-container' style='display: none;'>
		<h5 class='padding input-description'>Color 3:</h5>
		<div class='padding input-grid margin-bottom'>
			<input id='minimalist-color-3' type='color' class='input' oninput='updateDividerColors();' value='#FFFFFF'>
		</div>
	</div>

	<div style="height: 2px; background-color: rgba(255,255,255,0.1); margin: 10px 0;"></div>

	<h5 class='padding margin-bottom input-description' style="font-size: 1.5em; font-weight: bold;">P/T Symbols</h5>

	<h5 class='input-description margin-bottom'>Enable P/T Symbols</h5>
	<label class='checkbox-container input margin-bottom'>Toggle P/T Symbols
		<input id='minimalist-pt-symbols-enabled' type='checkbox' class='input' onchange='updatePTSymbols();' checked>
		<span class='checkmark'></span>
	</label>

	<h5 class='padding input-description'>Symbol Colors:</h5>
	<div class='padding input-grid margin-bottom'>
		<select id='minimalist-pt-color-mode' class='input' onchange='updatePTSymbols(); toggleColorVisibility("pt");'>
			<option value='auto'>Auto (from mana cost)</option>
			<option value='1'>1 Color</option>
			<option value='2'>2 Colors</option>
		</select>
	</div>

	<div id='pt-color-1-container' style='display: none;'>
		<h5 class='padding input-description'>Color 1:</h5>
		<div class='padding input-grid margin-bottom'>
			<input id='minimalist-pt-color-1' type='color' class='input' oninput='updatePTSymbols();' value='#FFFFFF'>
		</div>
	</div>

	<div id='pt-color-2-container' style='display: none;'>
		<h5 class='padding input-description'>Color 2:</h5>
		<div class='padding input-grid margin-bottom'>
			<input id='minimalist-pt-color-2' type='color' class='input' oninput='updatePTSymbols();' value='#FFFFFF'>
		</div>
	</div>

	<div style="height: 2px; background-color: rgba(255,255,255,0.1); margin: 5px 0;"></div>

	<h5 class='padding input-description'>Reset Settings</h5>
	<div class='padding input-grid margin-bottom'>
		<button id='reset-minimalist-gradient' class='input' onclick='resetMinimalistGradient();'>Reset All Settings</button>
	</div>
	</div>`;
	}


//============================================================================
// UPDATE FUNCTIONS
//============================================================================

function updateMinimalistVisuals(options = {}) {
	if (card.version !== 'Minimalist') return;
	
	const {
		includeTextPositions = false,
		includeDivider = true,
		includeText = true,
		includeBackground = false
	} = options;
	
	requestAnimationFrame(() => {
		if (includeTextPositions) {
			updateTextPositions(card.minimalist.currentHeight);
		}
		
		if (includeBackground && card.text.rules) {
			updateTextPositions(card.minimalist.currentHeight);
		}
		
		if (includeDivider) {
			drawDividerGradient(); // This includes P/T symbols
		}
		
		if (includeText) {
			textContext.clearRect(0, 0, textCanvas.width, textCanvas.height);
			drawTextBuffer();
		}
		
		drawCard();
	});
}

function updateMinimalistGradient() {
	if (card.version === 'Minimalist' && card.gradientOptions) {
		const maxOpacity = parseFloat(getCachedElement('minimalist-max-opacity').value);
		const fadeBottomOffset = parseFloat(getCachedElement('minimalist-fade-bottom-offset').value);
		const fadeTopOffset = parseFloat(getCachedElement('minimalist-fade-top-offset').value);
		const bgColor1 = getCachedElement('minimalist-bg-color-1').value;
		const bgColor2 = getCachedElement('minimalist-bg-color-2').value;
		const bgColor3 = getCachedElement('minimalist-bg-color-3').value;
		const bgColorCount = getCachedElement('minimalist-bg-color-count').value;
		
		updateCardSettings('settings', {
			maxOpacity,
			fadeBottomOffset,
			fadeTopOffset,
			solidEnd: 1,
			bgColor1,
			bgColor2,
			bgColor3,
			bgColorCount
		});
		
		updateMinimalistVisuals({ includeBackground: true });
	}
}

function updateBackgroundGradient(manaY, rulesY) {
	if (!card.gradientOptions) return;
	
	const bgGradientEnabled = getMinimalistSetting('bg-gradient-enabled');
	
	if (bgGradientEnabled) {
		const settings = card.minimalist.settings || MINIMALIST_DEFAULTS.settings;
		
		let backgroundColors = [];
		if (settings.bgColorCount === 'mana-auto') {
			backgroundColors = getManaHexColors();
			if (backgroundColors.length === 0) {
				backgroundColors = ['#808080'];
			}
		} else {
			const colorCount = parseInt(settings.bgColorCount);
			const customColors = [settings.bgColor1, settings.bgColor2, settings.bgColor3];
			backgroundColors = customColors.slice(0, colorCount);
		}
		
		const fadeTopY = manaY + settings.fadeTopOffset;
		const fadeBottomY = rulesY + settings.fadeBottomOffset;
		const solidStartY = fadeBottomY;
		const solidEndY = settings.solidEnd;
		
		const fadeHeight = fadeBottomY - fadeTopY;
		const solidHeight = solidEndY - solidStartY;
		
		card.gradientOptions = {
			...card.gradientOptions,
			yPosition: fadeTopY,
			height: fadeHeight,
			solidHeight: solidHeight,
			maxOpacity: settings.maxOpacity,
			startFromBottom: false,
			fadeDirection: 'down',
			endOpacity: settings.maxOpacity,
			colors: backgroundColors
		};
		
		drawHorizontalGradient(card.gradientOptions);
	} else {
		gradientContext.clearRect(0, 0, gradientCanvas.width, gradientCanvas.height);
	}
}

function updateDividerColors() {
	if (card.version === 'Minimalist') {
		const color1 = getCachedElement('minimalist-color-1').value;
		const color2 = getCachedElement('minimalist-color-2').value;
		const color3 = getCachedElement('minimalist-color-3').value;
		const colorCount = getCachedElement('minimalist-color-count').value;
		
		updateCardSettings('dividerSettings', { color1, color2, color3, colorCount });
		updateMinimalistVisuals({ includeDivider: true, includeText: false });
	}
}

function updatePTSymbols() {
	if (card.version === 'Minimalist') {
		const enabled = getCachedElement('minimalist-pt-symbols-enabled').checked;
		const colorMode = getCachedElement('minimalist-pt-color-mode').value;
		const color1 = getCachedElement('minimalist-pt-color-1').value;
		const color2 = getCachedElement('minimalist-pt-color-2').value;
		
		updateCardSettings('ptSettings', { enabled, colorMode, color1, color2 });
		updateMinimalistVisuals({ includeDivider: true, includeText: false });
	}
}

function updateTypeLineColor() {
	if (card.version === 'Minimalist' && card.text.type) {
		const autoColorElement = getCachedElement('minimalist-type-auto-color');
		const typeColorInput = getCachedElement('minimalist-type-color');
		
		if (!autoColorElement || !typeColorInput) {
			console.log('Type line elements not found:', {
				autoColor: !!autoColorElement,
				typeColor: !!typeColorInput
			});
			return;
		}
		
		const autoColor = autoColorElement.checked;
		let newColor;
		
		typeColorInput.disabled = false; // Always enable the input
		
		if (autoColor) {
			const manaColors = getManaColorsFromText();
			if (manaColors.length === 1) {
				newColor = getColorHex(manaColors[0]);
			} else if (manaColors.length > 1) {
				newColor = '#e3d193'; // Gold for multicolor
			} else {
				newColor = '#FFFFFF';
			}
			typeColorInput.value = newColor;
		} else {
			newColor = typeColorInput.value;
		}
		
		card.text.type.color = newColor;
		
		updateCardSettings('typeSettings', { 
			autoColor, 
			customColor: typeColorInput.value 
		});
		
		updateMinimalistVisuals({ includeText: true, includeDivider: false });
	}
}

function handlePTChange() {
	if (card.version === 'Minimalist') {
		updateMinimalistVisuals({ includeDivider: true, includeText: false });
	}
}

function syncDividerColorsWithMana() {
	if (card.minimalist.dividerSettings && card.minimalist.dividerSettings.colorCount === 'auto') {
		const manaColors = getManaColorsFromText();
		
		document.getElementById('minimalist-color-1').value = getColorHex(manaColors[0]) || '#FFF7D8';
		document.getElementById('minimalist-color-2').value = getColorHex(manaColors[1]) || '#26C7FE';
		document.getElementById('minimalist-color-3').value = getColorHex(manaColors[2]) || '#B264FF';
		
		updateMinimalistVisuals({ includeDivider: true, includeText: false });
	}
}

function resetMinimalistGradient() {
	const manaColors = getManaColorsFromText();
	const defaultColors = {
		color1: getColorHex(manaColors[0]) || '#FFF7D8',
		color2: getColorHex(manaColors[1]) || '#26C7FE',
		color3: getColorHex(manaColors[2]) || '#B264FF',
		colorCount: 'auto',
		bgColor1: '#000000',
		bgColor2: '#000000',
		bgColor3: '#000000',
		bgColorCount: '1'
	};
	
	// Set all UI defaults
	setUIDefaults();
	
	// Update color inputs with mana colors
	document.getElementById('minimalist-color-1').value = defaultColors.color1;
	document.getElementById('minimalist-color-2').value = defaultColors.color2;
	document.getElementById('minimalist-color-3').value = defaultColors.color3;
	document.getElementById('minimalist-color-count').value = defaultColors.colorCount;
	
	// Update background color inputs
	document.getElementById('minimalist-bg-color-1').value = defaultColors.bgColor1;
	document.getElementById('minimalist-bg-color-2').value = defaultColors.bgColor2;
	document.getElementById('minimalist-bg-color-3').value = defaultColors.bgColor3;
	document.getElementById('minimalist-bg-color-count').value = defaultColors.bgColorCount;
	
	// Update type line settings
	document.getElementById('minimalist-type-auto-color').checked = true;
	document.getElementById('minimalist-type-color').value = '#FFFFFF';
	
	// Update P/T settings
	document.getElementById('minimalist-pt-color-mode').value = 'auto';
	document.getElementById('minimalist-pt-color-1').value = '#FFFFFF';
	document.getElementById('minimalist-pt-color-2').value = '#FFFFFF';
	
	// Update card settings
	updateCardSettings('settings', { ...MINIMALIST_DEFAULTS.settings, ...defaultColors });
	updateCardSettings('dividerSettings', { 
		color1: defaultColors.color1,
		color2: defaultColors.color2,
		color3: defaultColors.color3,
		colorCount: defaultColors.colorCount
	});
	updateCardSettings('ptSettings', { ...window.MINIMALIST_DEFAULTS.ptSettings });
	updateCardSettings('typeSettings', { ...window.MINIMALIST_DEFAULTS.typeSettings });

	// Update visibility for all color pickers after resetting values
	toggleColorVisibility('bg');
	toggleColorVisibility('divider');
	toggleColorVisibility('pt');
	toggleColorVisibility('type');
	
	updateTypeLineColor();

	updateTextPositions(card.minimalist.currentHeight);
	
	// Visual feedback
	const resetButton = document.getElementById('reset-minimalist-gradient');
	const originalText = resetButton.textContent;
	resetButton.textContent = 'Settings Reset!';
	resetButton.classList.add('success-highlight');
	
	setTimeout(() => {
		resetButton.textContent = originalText;
		resetButton.classList.remove('success-highlight');
	}, 1500);
}


//============================================================================
// INITIALIZATION AND TEXT HANDLING
//============================================================================

	function initializeMinimalistVersion(savedText) {
	if (!card.minimalist.settings) {
		card.minimalist.settings = { ...MINIMALIST_DEFAULTS.settings };
	}

	if (!card.gradientOptions) {
		card.gradientOptions = {
			yPosition: 0.5,
			height: 0.3,
			solidHeight: 0.5,
			maxOpacity: card.minimalist.settings.maxOpacity,
			startFromBottom: false,
			fadeDirection: 'down',
			endOpacity: card.minimalist.settings.maxOpacity,
			colors: ['#000000']
		};
	}

	// Set UI values from stored settings
	const settings = card.minimalist.settings;
	document.getElementById('minimalist-bg-gradient-enabled').checked = settings.bgGradientEnabled ?? true;
	document.getElementById('minimalist-divider-enabled').checked = settings.dividerEnabled ?? true;
	document.getElementById('minimalist-max-opacity').value = settings.maxOpacity;
	document.getElementById('minimalist-fade-bottom-offset').value = settings.fadeBottomOffset;
	document.getElementById('minimalist-fade-top-offset').value = settings.fadeTopOffset;

	// Set background color UI values
	['bgColor1', 'bgColor2', 'bgColor3', 'bgColorCount'].forEach(key => {
		const element = document.getElementById(`minimalist-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`);
		if (element) element.value = settings[key] || MINIMALIST_DEFAULTS.settings[key];
	});

	// Initialize type line color settings
	const typeSettings = card.minimalist.typeSettings || window.MINIMALIST_DEFAULTS.typeSettings;
	const typeAutoCheckbox = document.getElementById('minimalist-type-auto-color');
	const typeColorInput = document.getElementById('minimalist-type-color');

	if (typeAutoCheckbox) typeAutoCheckbox.checked = typeSettings.autoColor;
	if (typeColorInput) {
		typeColorInput.value = typeSettings.customColor;
	}

	// Set initial visibility for background color pickers
	setTimeout(() => {
		toggleColorVisibility('bg');
		toggleColorVisibility('divider');
		toggleColorVisibility('pt');
		toggleColorVisibility('type');
		updateTypeLineColor();
	}, 100);

	    // Store original setBottomInfoStyle function and override it
		if (!window.originalSetBottomInfoStyle) {
			window.originalSetBottomInfoStyle = window.setBottomInfoStyle;
			
			// Override the global setBottomInfoStyle function
			window.setBottomInfoStyle = async function() {
				if (card.version === 'Minimalist') {
					// Handle minimalist version specifically
					if (document.querySelector('#enableNewCollectorStyle').checked) {
						await loadBottomInfo({
							midLeft: {text:'{elemidinfo-set} \u2022 {elemidinfo-language}  {savex}{fontbelerenbsc}{fontsize' + scaleHeight(0.001) + '}{upinline' + scaleHeight(0.0005) + '}\uFFEE{savex2}{elemidinfo-artist}', x:0.0647, y:0.9434, width:0.8707, height:0.0171, oneLine:true, font:'gothammedium', size:0.0171, color:'white', outlineWidth:0.003},
							topLeft: {text:'{elemidinfo-rarity} {kerning3}{elemidinfo-number}{kerning0}', x:0.0647, y:0.9263, width:0.8707, height:0.0171, oneLine:true, font:'gothammedium', size:0.0171, color:'white', outlineWidth:0.003},
							note: {text:'{loadx}{elemidinfo-note}', x:0.0647, y:0.9263, width:0.8707, height:0.0171, oneLine:true, font:'gothammedium', size:0.0171, color:'white', outlineWidth:0.003},
							bottomLeft: {text:'NOT FOR SALE', x:0.0647, y:0.9605, width:0.8707, height:0.0143, oneLine:true, font:'gothammedium', size:0.0143, color:'white', outlineWidth:0.003},
							wizards: {name:'wizards', text:'{ptshift0,0.0172}\u2122 & \u00a9 {elemidinfo-year} Wizards of the Coast', x:0.0647, y:0.9263, width:0.8707, height:0.0167, oneLine:true, font:'mplantin', size:0.0162, color:'white', align:'right', outlineWidth:0.003},
							bottomRight: {text:'{ptshift0,0.0172}CardConjurer.com', x:0.0647, y:0.9434, width:0.8707, height:0.0143, oneLine:true, font:'mplantin', size:0.0143, color:'white', align:'right', outlineWidth:0.003}
						});
					} else {
						// Use the old style (pack default)
						await loadBottomInfo({
							topLeft: {text:'{savex}{fontbelerenbsc}{fontsize' + scaleHeight(0.001) + '}{upinline' + scaleHeight(0.0005) + '}\uFFEE{savex2}{elemidinfo-artist}', x:0.090, y:0.9134, width:0.8707, height:0.0171, oneLine:true, font:'gothammedium', size:0.0171, color:'white', outlineWidth:0.003},
							midLeft: {text:'{kerning3}{elemidinfo-number}{kerning0}', x:0.090, y:0.9334, width:0.8707, height:0.0171, oneLine:true, font:'gothammedium', size:0.0171, color:'white', outlineWidth:0.003},
							bottomLeft: {text:'NOT FOR SALE', x:0.090, y:0.9605, width:0.8707, height:0.0143, oneLine:true, font:'gothammedium', size:0.0143, color:'white', outlineWidth:0.003},
							wizards: {name:'wizards', text:'{ptshift0,0.0172}\u2122 & \u00a9 {elemidinfo-year} Wizards of the Coast', x:0.090, y:0.9263, width:0.8707, height:0.0167, oneLine:true, font:'mplantin', size:0.0162, color:'white', align:'right', outlineWidth:0.003},
							bottomRight: {text:'{ptshift0,0.0172}CardConjurer.com', x:0.090, y:0.9334, width:0.8707, height:0.0143, oneLine:true, font:'mplantin', size:0.0143, color:'white', align:'right', outlineWidth:0.003}
						});
					}
					// Store the current layout for future use
					preserveMinimalistBottomInfo();
				} else {
					// For non-minimalist versions, use the original function
					await window.originalSetBottomInfoStyle();
				}
			};
		}

	setupTextHandling(savedText);
}

	function setupTextHandling(savedText) {
		const debouncedScale = debounce((text) => {
			if (!card.text.rules || card.version !== 'Minimalist') return;
			if (card.minimalist.lastProcessedText === text) return;
			
			card.minimalist.lastProcessedText = text;
	
			const dims = getCardDimensions();
			const ctx = card.minimalist.ctx;
			
			// Check if we're at max height and text is getting longer
			const currentHeight = card.minimalist.currentHeight;
			const isAtMaxHeight = currentHeight >= card.minimalist.maxHeight;
			const textLength = text.length;
			const lastLength = card.minimalist.lastTextLength || 0;
			const textGettingLonger = textLength > lastLength;
			
			// Skip calculation if at max height and text is getting longer
			if (isAtMaxHeight && textGettingLonger) {
				card.minimalist.lastTextLength = textLength;
				return;
			}
			
			// Only calculate height if we need to (not at max, or text is getting shorter)
			// Batch context operations
			ctx.clearRect(0, 0, dims.width, dims.height);
			ctx.font = `${card.text.rules.size * dims.height}px "${card.text.rules.font}"`;
			
			const actualTextHeight = measureTextHeight(
				text,
				ctx,
				card.text.rules.width * dims.width,
				card.text.rules.size * dims.height
			);
					
			const newHeight = Math.min(
				card.minimalist.maxHeight,
				Math.max(
					card.minimalist.minHeight,
					(actualTextHeight / dims.height)
				)
			);
	
			// Only update if height actually changed
			if (Math.abs(newHeight - currentHeight) < 0.001) {
				card.minimalist.lastTextLength = textLength;
				return;
			}
	
			const now = Date.now();
			const textLengthChanged = Math.abs(lastLength - textLength) > 10;
			const timeElapsed = now - (card.minimalist.lastFullUpdate || 0) > 1000;
			
			if (textLengthChanged || timeElapsed) {
				requestAnimationFrame(() => {
					card.minimalist.currentHeight = newHeight;
					updateTextPositions(newHeight);
					drawTextBuffer();
					drawCard();
					
					card.minimalist.lastTextLength = textLength;
					card.minimalist.lastFullUpdate = now;
				});
			}
		}, 200);
	
	// Restore saved text
	let hasRulesText = false;
	for (const key in savedText) {
		if (card.text[key]) {
			card.text[key].text = savedText[key];
			if (key === 'rules' && savedText[key]) {
				hasRulesText = true;
				textEdited();
				requestAnimationFrame(() => {
					debouncedScale(savedText[key]);
				});
			}
		}
	}

	if (!hasRulesText) {
		updateTextPositions(card.minimalist.currentHeight);
	}

	// Set up input listener
	const textEditor = getCachedElement('text-editor') || DOM_CACHE.textEditor;
	if (textEditor && !textEditor._minimalistListener) {
		textEditor._minimalistListener = true; // Prevent duplicate listeners
		textEditor.addEventListener('input', function() {
			const text = this.value;
			const delay = text.length > 500 ? 250 : 0;
			setTimeout(() => debouncedScale(text), delay);
		}, { passive: true });
	}

	// Override textEdited function
	const originalTextEdited = window.textEdited;
	window.textEdited = function() {
		if (originalTextEdited) originalTextEdited();
		
		if (card.version === 'Minimalist') {
			// Update all visual elements in one coordinated call
			updateTypeLineColor();
			syncDividerColorsWithMana();
			
			if (card.text.rules && card.text.rules.text) {
				setTimeout(() => {
					debouncedScale(card.text.rules.text);
				}, 400);
			}
		}
	};
	
	// Override bottomInfoEdited to preserve minimalist styling
	const originalBottomInfoEdited = window.bottomInfoEdited;
	window.bottomInfoEdited = async function() {
		if (originalBottomInfoEdited) {
			await originalBottomInfoEdited();
		}
		
		// Store the current state if we're in minimalist mode
		if (card.version === 'Minimalist') {
			preserveMinimalistBottomInfo();
		}
	};
}

// functions to preserve and restore minimalist bottom info
function preserveMinimalistBottomInfo() {
    if (card.version === 'Minimalist' && card.bottomInfo) {
        window.minimalistBottomInfo = JSON.parse(JSON.stringify(card.bottomInfo));
    }
}

function restoreMinimalistBottomInfo() {
    if (card.version === 'Minimalist' && window.minimalistBottomInfo) {
        card.bottomInfo = JSON.parse(JSON.stringify(window.minimalistBottomInfo));
        return true;
    }
    return false;
}

//============================================================================
// MAIN INITIALIZATION
//============================================================================

if (!loadedVersions.includes('/js/frames/versionMinimalist.js')) {
	loadedVersions.push('/js/frames/versionMinimalist.js');

	// Initialize card minimalist object
	if (!card.minimalist) {
		card.minimalist = {
			...MINIMALIST_DEFAULTS,
			textCache: {},
			lastTextLength: 0,
			lastProcessedText: '',
			lastFullUpdate: 0,
			_cachedManaColors: null,
			_lastManaText: ''
		};
		
		// Create measurement canvas
		const dims = getCardDimensions();
		const measureCanvas = document.createElement('canvas');
		measureCanvas.width = dims.width;
		measureCanvas.height = dims.height;
		card.minimalist.ctx = measureCanvas.getContext('2d');
		
		// Initialize performance optimizations
		initDOMCache();
	}
	
	// Create UI
	createMinimalistUI();

	// Make functions globally accessible
	window.updateMinimalistGradient = updateMinimalistGradient;
	window.updateDividerColors = updateDividerColors;
	window.updatePTSymbols = updatePTSymbols;
	window.updateTypeLineColor = updateTypeLineColor;
	window.toggleColorVisibility = toggleColorVisibility;
	window.updateTextPositions = updateTextPositions;
	window.drawDividerGradient = drawDividerGradient;
	window.syncDividerColorsWithMana = syncDividerColorsWithMana;
	window.resetMinimalistGradient = resetMinimalistGradient;
	window.measureTextHeight = measureTextHeight;
	window.preserveMinimalistBottomInfo = preserveMinimalistBottomInfo;
	window.restoreMinimalistBottomInfo = restoreMinimalistBottomInfo;
	window.clearMinimalistTextCache = () => { 
		card.minimalist.textCache = {};
		COLOR_CACHE.clear();
	};
	window.debounce = debounce;
	window.initializeMinimalistVersion = initializeMinimalistVersion;
}