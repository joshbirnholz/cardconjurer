// Helper function to parse color strings to RGB objects for PSD text layers
function parseColorToRGB(color) {
	if (color.startsWith('#')) {
		const hex = color.slice(1);
		return {
			r: parseInt(hex.substr(0, 2), 16),
			g: parseInt(hex.substr(2, 2), 16),
			b: parseInt(hex.substr(4, 2), 16)
		};
	}
	const colorMap = {
		'black': { r: 0, g: 0, b: 0 },
		'white': { r: 255, g: 255, b: 255 },
		'red': { r: 255, g: 0, b: 0 },
		'blue': { r: 0, g: 0, b: 255 },
	};
	return colorMap[color] || { r: 0, g: 0, b: 0 };
}

// Exports the current card as a layered PSD file with masks, frames, text, and art
async function downloadCardAsPSD() {
	const startTime = performance.now();
	
	if (card.infoArtist.replace(/ /g, '') == '' && !card.artSource.includes('/img/blank.png') && !card.artZoom == 0) {
		notify('You must credit an artist before downloading!', 5);
		return;
	}

	// Check if ag-psd library is loaded
	if (typeof agPsd === 'undefined') {
		notify('PSD export failed: Library still loading. Try again in a moment.', 3);
		console.error('ag-psd library not loaded');
		return;
	}

	try {
		// Use actual canvas dimensions which include margins
		const psdWidth = cardCanvas.width;
		const psdHeight = cardCanvas.height;
		
		// Set appropriate PPI based on whether margins are included
		const hasMargins = card.marginX > 0 || card.marginY > 0;
		const targetPPI = hasMargins ? 804.04 : 810.48;  // Lower PPI with margins, higher without
		
		// Define Y offset multipliers for each text field
		const textOffsets = {
			'title': 0.95,
			'type': 1.1,
			'rules': 0.999,
			'pt': 0.80,
			'mana': 0.8,
			'default': 0.95  // fallback for unlisted fields
		};

		// Define X offset for each text field (in pixels)
		const textXOffsets = {
			'pt': +10,
			'default': 0
		};
		
		// Create PSD structure with metadata
		const psd = {
			width: psdWidth,
			height: psdHeight,
			channels: 3,  // RGB
			bitsPerChannel: 8,
			colorMode: 3, // ColorMode.RGB (from ag-psd)
			children: [],
			// Add image resources for proper color profile and resolution metadata
			imageResources: {
				resolutionInfo: {
					horizontalResolution: targetPPI,
					horizontalResolutionUnit: 'PPI',
					widthUnit: 'Inches',
					verticalResolution: targetPPI,
					verticalResolutionUnit: 'PPI',
					heightUnit: 'Inches'
				},
				// Add pixel aspect ratio (square pixels)
				pixelAspectRatio: {
					aspect: 1.0
				},
				// Add print scale
				printScale: {
					style: 0,
					x: 1.0,
					y: 1.0,
					scale: 1.0
				}
			}
		};

		// Helper to create common layer properties
		const createLayerBase = (name, canvas, opacity = 1, blendMode = 'normal') => ({
			name,
			canvas,
			left: 0,
			top: 0,
			right: psdWidth,
			bottom: psdHeight,
			opacity,
			blendMode
		});

		// Helper to create a canvas sized to PSD dimensions
		const createCanvas = () => {
			const canvas = document.createElement('canvas');
			canvas.width = psdWidth;
			canvas.height = psdHeight;
			return { canvas, ctx: canvas.getContext('2d') };
		};

		// Helper to check if text field is rules text
		const checkIsRulesText = (key, textObject) => 
			key === 'rules' || (textObject?.name?.toLowerCase().includes('rules')) || (textObject?.name?.toLowerCase() === 'case');

		// Helper to check if layer is editable
		const isEditableLayer = (layer) => layer.name?.includes('(Editable)');

		// Helper to get scaled bounds from a bounds object
		const getScaledBounds = (bounds) => ({
			x: Math.round(scaleX(bounds?.x || 0)),
			y: Math.round(scaleY(bounds?.y || 0)),
			width: Math.round(scaleWidth(bounds?.width || 1)),
			height: Math.round(scaleHeight(bounds?.height || 1))
		});

		// Helper to get scaled text box coordinates
		const getScaledTextBounds = (textObject) => ({
			x: scaleX(textObject?.x || 0),
			y: scaleY(textObject?.y || 0),
			width: scaleWidth(textObject?.width || 1),
			height: scaleHeight(textObject?.height || 1)
		});

		// Add art layer only if art is present
		if (!card.artSource.includes('/img/blank.png') && card.artZoom > 0) {
			const { canvas: artCanvas, ctx: artCtx } = createCanvas();
			artCtx.save();
			artCtx.translate(scaleX(card.artX), scaleY(card.artY));
			artCtx.rotate(Math.PI / 180 * (card.artRotate || 0));
			if (document.querySelector('#grayscale-art').checked) {
				artCtx.filter = 'grayscale(1)';
			}
			artCtx.drawImage(art, 0, 0, art.width * card.artZoom, art.height * card.artZoom);
			artCtx.restore();
			
			psd.children.push(createLayerBase('Art', artCanvas));
		}

		// Create frame group with all frame layers inside
		const frameGroup = {
			name: 'Frame',
			children: [],
			opened: false
		};

		// Add planeswalker pre-frame canvas (if version is planeswalker)
		if (card.version.includes('planeswalker') && typeof planeswalkerPreFrameCanvas !== "undefined") {
			const { canvas: pwPreFrameCanvas, ctx: pwPreFrameCtx } = createCanvas();
			pwPreFrameCtx.drawImage(planeswalkerPreFrameCanvas, 0, 0, psdWidth, psdHeight);
			frameGroup.children.push(createLayerBase('Planeswalker Pre-Frame', pwPreFrameCanvas));
		}

		// Helper function to create a PSD mask object from ImageData
		const createPSDMask = (imageData) => ({
			top: 0,
			left: 0,
			bottom: psdHeight,
			right: psdWidth,
			defaultColor: 255,
			imageData,
			disabled: false,
			positionRelativeToLayer: false,
			fromVectorData: false
		});

		// Helper function to combine multiple masks by multiplying them together
		const multiplyMasks = (mask1Data, mask2Data) => {
			const { canvas, ctx } = createCanvas();
			ctx.putImageData(mask1Data, 0, 0);
			
			const { canvas: tempCanvas } = createCanvas();
			tempCanvas.getContext('2d').putImageData(mask2Data, 0, 0);
			
			ctx.globalCompositeOperation = 'multiply';
			ctx.drawImage(tempCanvas, 0, 0);
			return ctx.getImageData(0, 0, psdWidth, psdHeight);
		};

		// Helper to calculate mask transform coordinates
		const getMaskTransform = (bounds, ogBounds) => ({
			x: scaleX((bounds.x || 0) - (ogBounds.x || 0) - ((ogBounds.x || 0) * ((bounds.width || 1) / (ogBounds.width || 1) - 1))),
			y: scaleY((bounds.y || 0) - (ogBounds.y || 0) - ((ogBounds.y || 0) * ((bounds.height || 1) / (ogBounds.height || 1) - 1))),
			w: scaleWidth((bounds.width || 1) / (ogBounds.width || 1)),
			h: scaleHeight((bounds.height || 1) / (ogBounds.height || 1))
		});

	// Helper to apply masks to a canvas context
	const applyMasksToFrame = (ctx, frame) => {
		const bounds = frame.bounds || {};
		const ogBounds = frame.ogBounds || bounds;
		const { x, y, width, height } = getScaledBounds(bounds);
		const transform = getMaskTransform(bounds, ogBounds);
		
		ctx.globalCompositeOperation = 'source-over';
		ctx.drawImage(frame.image, x, y, width, height);
		ctx.globalCompositeOperation = 'destination-in';
		frame.masks.forEach(mask => ctx.drawImage(mask.image, transform.x, transform.y, transform.w, transform.h));
	};		// Helper to convert alpha to inverted grayscale mask
		const alphaToInvertedMask = (imageData) => {
			const pixels = imageData.data;
			for (let i = 0; i < pixels.length; i += 4) {
				const maskValue = 255 - pixels[i + 3]; // Invert alpha
				pixels[i] = pixels[i + 1] = pixels[i + 2] = maskValue;
				pixels[i + 3] = 255;
			}
			return imageData;
		};

		// Process frames from bottom to top and collect all layers first
		const reversedFrames = card.frames.slice().reverse();
		const frameLayers = [];
		const eraseMasks = [];
		const ptLayers = [];
		const crownLayers = [];
			
		// First pass: create all frame layers and identify erase layers
		for (let index = 0; index < reversedFrames.length; index++) {
			const frame = reversedFrames[index];
			
		if (frame.erase && frame.image) {
			// Create erase mask
			const { canvas: eraseCanvas, ctx: eraseCtx } = createCanvas();
			
		
		const bounds = frame.bounds || {};
		const ogBounds = frame.ogBounds || bounds;
		
		applyMasksToFrame(eraseCtx, frame);
			
			// Apply HSL adjustments if needed
			if (frame.hslHue || frame.hslSaturation || frame.hslLightness) {
				hsl(eraseCanvas, frame.hslHue || 0, frame.hslSaturation || 0, frame.hslLightness || 0);
			}				// Convert alpha to inverted grayscale mask
				eraseCtx.putImageData(alphaToInvertedMask(eraseCtx.getImageData(0, 0, psdWidth, psdHeight)), 0, 0);
				
				// Store the erase mask along with the frame's mask info for later combination
				eraseMasks.push({ 
					index, 
					canvas: eraseCanvas,
					frameMasks: frame.masks || [],
					bounds,
					ogBounds
				});
				continue; // Skip creating a regular frame layer for erase frames
			}
			
			// Create regular frame layer
			const { canvas: frameCanvas, ctx: frameCtx } = createCanvas();
			
		if (frame.image) {
			const bounds = frame.bounds || {};
			const ogBounds = frame.ogBounds || bounds;
			const { x, y, width, height } = getScaledBounds(bounds);
			
			const { canvas: tempMaskCanvas, ctx: tempMaskCtx } = createCanvas();				tempMaskCtx.globalCompositeOperation = 'source-over';
				tempMaskCtx.drawImage(black, 0, 0, psdWidth, psdHeight);
				
				const transform = getMaskTransform(bounds, ogBounds);
				tempMaskCtx.globalCompositeOperation = 'source-in';
				frame.masks.forEach(mask => tempMaskCtx.drawImage(mask.image, transform.x, transform.y, transform.w, transform.h));
				tempMaskCtx.drawImage(frame.image, x, y, width, height);
				
				frameCtx.drawImage(tempMaskCanvas, 0, 0);
			}
			
			// Build layer name with mask names if they exist
			const maskNames = frame.masks?.map(m => m.name).filter(n => n && !n.toLowerCase().includes('mask')).join(', ');
			const layerName = (frame.name || `Frame ${index + 1}`) + (maskNames ? `, ${maskNames}` : '');

			const layerData = {
				index,
				name: layerName,
				canvas: frameCanvas,
				opacity: (frame.opacity || 100) / 100,
				blendMode: convertBlendMode(frame.mode),
				colorOverlay: frame.colorOverlayCheck ? frame.colorOverlay : null,
				hslHue: frame.hslHue || 0,
				hslSaturation: frame.hslSaturation || 0,
				hslLightness: frame.hslLightness || 0,
				frameData: {
					image: frame.image,
					bounds: frame.bounds || {},
					ogBounds: frame.ogBounds || frame.bounds || {},
					masks: frame.masks || []
				}
			};
			
			// Categorize layers into PT, Crown, or regular frame layers
			const name = frame.name?.toLowerCase() || '';
			if (name.includes('power/toughness')) ptLayers.push(layerData);
			else if (name.includes('crown')) crownLayers.push(layerData);
			else frameLayers.push(layerData);
		}

	// Helper function to create a combined mask from all frame masks (including half masks)
	const createCombinedFrameMask = (frame, psdWidth, psdHeight, invert = false) => {
		if (!frame.masks?.length) return null;
		
		const { canvas: maskCanvas, ctx: maskCtx } = createCanvas();
		
		// Start with white (fully visible)
		maskCtx.fillStyle = 'white';
		maskCtx.fillRect(0, 0, psdWidth, psdHeight);
		maskCtx.globalCompositeOperation = 'multiply';
		
		const bounds = frame.bounds || {};
		const ogBounds = frame.ogBounds || bounds;
		const transform = getMaskTransform(bounds, ogBounds);
		
		// Create reusable temp canvas outside the loop
		const { canvas: tempCanvas, ctx: tempCtx } = createCanvas();
		
		// Apply each mask
		frame.masks.forEach(mask => {
			// Clear and draw mask, convert alpha to grayscale (optionally inverted)
			tempCtx.clearRect(0, 0, psdWidth, psdHeight);
			tempCtx.drawImage(mask.image, transform.x, transform.y, transform.w, transform.h);
			const tempData = tempCtx.getImageData(0, 0, psdWidth, psdHeight);
			const pixels = tempData.data;
			
			for (let i = 0; i < pixels.length; i += 4) {
				pixels[i] = pixels[i + 1] = pixels[i + 2] = invert ? 255 - pixels[i + 3] : pixels[i + 3];
				pixels[i + 3] = 255;
			}
			
			tempCtx.putImageData(tempData, 0, 0);
			maskCtx.drawImage(tempCanvas, 0, 0);
		});
		
		return maskCtx.getImageData(0, 0, psdWidth, psdHeight);
	};

	// Second pass: apply erase masks to all layers before them
	const allLayers = [...ptLayers, ...crownLayers, ...frameLayers];

	allLayers.forEach(layer => {
		const applicableEraseMasks = eraseMasks.filter(erase => erase.index > layer.index);
		if (applicableEraseMasks.length === 0) return;
		
		// Quick check: does this layer have any content?
		const layerCtx = layer.canvas.getContext('2d');
		const layerData = layerCtx.getImageData(0, 0, psdWidth, psdHeight);
		const layerPixels = layerData.data;
		
		const layerHasContent = layerPixels.some((_, i) => i % 4 === 3 && layerPixels[i] > 0);
		if (!layerHasContent) return;
		
		// Combine all applicable erase masks
		const { canvas: combinedMaskCanvas, ctx: combinedMaskCtx } = createCanvas();
		
		// Start with white (fully visible)
		combinedMaskCtx.fillStyle = 'white';
		combinedMaskCtx.fillRect(0, 0, psdWidth, psdHeight);
		
		// Apply each erase layer by multiplying
		applicableEraseMasks.forEach(erase => {
			// Use frame masks if present (inverted for erase), otherwise use erase canvas
			const eraseMaskData = erase.frameMasks?.length > 0
				? createCombinedFrameMask({ masks: erase.frameMasks, bounds: erase.bounds, ogBounds: erase.ogBounds }, psdWidth, psdHeight, true)
				: erase.canvas.getContext('2d').getImageData(0, 0, psdWidth, psdHeight);
			
			const erasePixels = eraseMaskData.data;
			const combinedData = combinedMaskCtx.getImageData(0, 0, psdWidth, psdHeight);
			const combinedPixels = combinedData.data;
			
			for (let i = 0; i < combinedPixels.length; i += 4) {
				const finalValue = (combinedPixels[i] / 255) * (erasePixels[i] / 255) * 255;
				combinedPixels[i] = combinedPixels[i + 1] = combinedPixels[i + 2] = finalValue;
			}
			
			combinedMaskCtx.putImageData(combinedData, 0, 0);
		});
		
		// Check if mask actually affects this layer
		const finalMaskData = combinedMaskCtx.getImageData(0, 0, psdWidth, psdHeight);
		const finalMaskPixels = finalMaskData.data;
		
		const maskAffectsLayer = finalMaskPixels.some((_, i) => 
			i % 4 === 0 && layerPixels[i + 3] > 0 && finalMaskPixels[i] < 255
		);
		
		if (maskAffectsLayer) {
			layer.mask = createPSDMask(finalMaskData);
		}
	});

	// Helper function to add layer with optional color overlay and HSL adjustment clipping masks
	const addLayerWithColorOverlay = (layer, targetArray) => {
			// Determine if we need to recreate the full frame
			const hasFrameMasks = layer.frameData?.masks?.length > 0;
			let fullFrameCanvas = layer.canvas;
			let combinedMaskData = null;
			
		// If we have frame masks, draw the full frame and create combined mask
		if (hasFrameMasks) {
			const { canvas, ctx } = createCanvas();
			fullFrameCanvas = canvas;
			
			const { bounds = {}, ogBounds = bounds, image } = layer.frameData;
			if (image) {
				const { x, y, width, height } = getScaledBounds(bounds);
				ctx.drawImage(image, x, y, width, height);
			}
			
			combinedMaskData = createCombinedFrameMask(layer.frameData, psdWidth, psdHeight);
		}			// Combine frame mask with erase mask if both exist
			if (combinedMaskData && layer.mask) {
				combinedMaskData = multiplyMasks(combinedMaskData, layer.mask.imageData);
			} else if (layer.mask) {
				combinedMaskData = layer.mask.imageData;
			}
			
			// Create and add base layer
			const baseLayer = createLayerBase(layer.name, fullFrameCanvas, layer.opacity, layer.blendMode);
			if (combinedMaskData) baseLayer.mask = createPSDMask(combinedMaskData);
			targetArray.push(baseLayer);
			
			// Add HSL adjustment layer if needed
			if (layer.hslHue || layer.hslSaturation || layer.hslLightness) {
				const { canvas: hslCanvas, ctx: hslCtx } = createCanvas();
				hslCtx.drawImage(fullFrameCanvas, 0, 0);
				hsl(hslCanvas, layer.hslHue || 0, layer.hslSaturation || 0, layer.hslLightness || 0);
				
				const hslLabel = [
					layer.hslHue && `H:${layer.hslHue > 0 ? '+' : ''}${layer.hslHue}`,
					layer.hslSaturation && `S:${layer.hslSaturation > 0 ? '+' : ''}${layer.hslSaturation}`,
					layer.hslLightness && `L:${layer.hslLightness > 0 ? '+' : ''}${layer.hslLightness}`
				].filter(Boolean).join(', ');
				
				targetArray.push({
					...createLayerBase(`${layer.name} HSL Adjustment [${hslLabel}]`, hslCanvas),
					clipping: true
				});
			}
			
			// Add color overlay layer if needed
			if (layer.colorOverlay) {
				const { canvas: colorCanvas, ctx: colorCtx } = createCanvas();
				colorCtx.fillStyle = layer.colorOverlay;
				colorCtx.fillRect(0, 0, psdWidth, psdHeight);
				
				targetArray.push({
					...createLayerBase(`${layer.name} Color Overlay`, colorCanvas),
					clipping: true
				});
			}
		};

		// Add regular frame layers last
		frameLayers.forEach(layer => {
			addLayerWithColorOverlay(layer, frameGroup.children);
		});

		// Store station text layers to add to text group later
		const stationTextLayers = [];

		// Helper: Extract color name from image source path
		const getColorFromSrc = (imageSrc) => {
			if (!imageSrc) return '';
			const match = imageSrc.match(/\/(badges|pt)\/([a-z])\.png/i);
			if (match) {
				const colorMap = {
					'w': 'White', 'u': 'Blue', 'b': 'Black', 'r': 'Red', 'g': 'Green',
					'm': 'Multicolored', 'a': 'Artifact', 'c': 'Colorless', 'l': 'Land'
				};
				return (colorMap[match[2].toLowerCase()] || '') ? colorMap[match[2].toLowerCase()] + ' ' : '';
			}
			return '';
		};

		// Helper: Calculate station element positions
		const getStationPosition = (type, index, key, settings) => {
			const square = card.station.squares[index];
			const basePos = card.station.baseTextPositions?.[key];
			if (!basePos) return null;
			
			const squareX = scaleX(basePos.x) + (square.x - 214);
			const squareY = scaleY(basePos.y) + square.y;
			const elementX = type === 'pt' ? squareX + square.width + (settings.x - 266) : squareX + (settings.x || -81);
			const elementY = squareY + (square.height / 2) + (settings.y || 0);
			
			return { elementX, elementY, settings };
		};

		// Add station squares after frame layers (so they appear on top)
		if (card.version.toLowerCase().includes('station') && card.station && card.station.squares) {
			// Process squares in reverse order (2 then 1) so they appear correctly in PSD
			[2, 1].forEach(squareIndex => {
				const square = card.station.squares[squareIndex];
				const abilityKey = squareIndex === 2 ? 'ability2' : 'ability1';
				const shouldRender = squareIndex === 2 
					? square.enabled && card.text?.ability2
					: square.enabled && card.text?.ability1 && !card.station.disableFirstAbility;
				
				if (shouldRender) {
					const { canvas: squareCanvas, ctx: squareCtx } = createCanvas();
					const basePos = card.station.baseTextPositions?.[abilityKey];
					if (basePos) {
						const squareX = scaleX(basePos.x) + (square.x - 214);
						const squareY = scaleY(basePos.y) + square.y;
						
						squareCtx.fillStyle = square.color;
						squareCtx.globalAlpha = 1; // Full opacity in canvas
						squareCtx.fillRect(squareX, squareY, square.width, square.height);
						
						// Add with layer opacity set to the square's opacity
						frameGroup.children.push(createLayerBase(`Station Square ${squareIndex}`, squareCanvas, square.opacity || 1));
					}
				}
			});
		}

		// Add PT layers group second if there are any (or if it's a station card with PT)
		const hasStationPT = card.version.toLowerCase().includes('station') && card.station && card.text?.pt?.text?.trim() && typeof stationPTImage !== "undefined";
		
		if (ptLayers.length > 0 || hasStationPT) {
			const ptChildren = [];
			ptLayers.forEach(layer => {
				addLayerWithColorOverlay(layer, ptChildren);
			});
			
			// Add station PT box directly to PT children if it exists
			if (hasStationPT) {
				const ptColor = getColorFromSrc(stationPTImage?.src);
				
				const pos = getStationPosition('pt', 2, 'ability2', card.station.ptSettings);
				if (pos) {
					const { canvas: boxCanvas, ctx: boxCtx } = createCanvas();
					if (stationPTImage?.complete && stationPTImage.naturalWidth > 0) {
						boxCtx.drawImage(stationPTImage, pos.elementX, pos.elementY - (pos.settings.height / 2), pos.settings.width, pos.settings.height);
					}
					ptChildren.push(createLayerBase(`${ptColor}Station PT`, boxCanvas));
					
					const { canvas: textCanvas, ctx: textCtx } = createCanvas();
					textCtx.font = scaleHeight(pos.settings.fontSize) + 'px belerenbsc';
					textCtx.fillStyle = 'white';
					textCtx.textAlign = 'center';
					textCtx.textBaseline = 'middle';
					textCtx.fillText(card.text.pt.text, pos.elementX + (pos.settings.width / 2) + 3, pos.elementY + 7);
					stationTextLayers.push(createLayerBase('Station PT', textCanvas));
				}
			}
			
			frameGroup.children.push({
				name: 'Power/Toughness Box',
				children: ptChildren,
				opened: false
			});
		}
		
		// Store station badges to add after PT but before crowns
		let stationBadgesGroup = null;
		// Store planeswalker text layers to add to text group later
		const planeswalkerTextLayers = [];
		// Store saga text layers to add to text group later
		const sagaTextLayers = [];
		// Store class text layers to add to text group later
		const classTextLayers = [];

		// Add planeswalker post-frame canvas (if version is planeswalker)
		if (card.version.toLowerCase().includes('planeswalker')) {
			if (typeof planeswalkerPostFrameCanvas !== "undefined" && card.planeswalker) {
				// Extract badge icons (plus, minus, neutral) and text separately
				const planeswalkerBadges = [];
				const planeswalkerTall = (card.version.includes('Tall') || card.version.includes('Compleated')) ? 1 : 0;
				
				// Badge type configurations
				const badgeConfigs = {
					'+': { image: 'plusIcon', x: 0.0294, y: -0.0258, w: 0.14, h: 0.0724, textY: 0.0172, type: 'Plus' },
					'-': { image: 'minusIcon', x: 0.028, y: -0.0153, w: 0.1414, h: 0.0705, textY: 0.0181, type: 'Minus' },
					'0': { image: 'neutralIcon', x: 0.028, y: -0.0153, w: 0.1414, h: 0.061, textY: 0.0191, type: 'Neutral' }
				};
				
				// Create badge layers for each ability (iterate backwards so they appear 1,2,3 in PSD)
				for (let i = card.planeswalker.count - 1; i >= 0; i--) {
					const costValue = card.planeswalker.abilities[i];
					if (!costValue) continue;
					
					const placement = scaleY(planeswalkerAbilityLayout[planeswalkerTall][card.planeswalker.count - 1][i] + card.planeswalker.abilityAdjust[i]);
					
					// Determine badge type based on cost value
					const badgeKey = costValue.includes('+') ? '+' : costValue.includes('-') ? '-' : '0';
					const config = badgeConfigs[badgeKey];
					const badgeImage = typeof window[config.image] !== 'undefined' ? window[config.image] : null;
					
					// Draw badge icon if available
					if (badgeImage?.complete && badgeImage.naturalWidth > 0) {
						const { canvas: badgeCanvas, ctx: badgeCtx } = createCanvas();
						badgeCtx.drawImage(badgeImage, scaleX(config.x), placement + scaleHeight(config.y), scaleWidth(config.w), scaleHeight(config.h));
						planeswalkerBadges.push(createLayerBase(`${config.type} Badge ${i + 1}`, badgeCanvas));
					}
					
					// Draw text separately for the text group
					const { canvas: textCanvas, ctx: textCtx } = createCanvas();
					textCtx.font = scaleHeight(0.0286) + 'px belerenbsc';
					textCtx.fillStyle = 'white';
					textCtx.textAlign = 'center';
					textCtx.fillText(costValue, scaleX(0.1027), placement + scaleHeight(config.textY));
					planeswalkerTextLayers.push(createLayerBase(`Ability ${i + 1} Cost`, textCanvas));
				}
				
				// Add badge group if we have badges
				if (planeswalkerBadges.length > 0) {
					frameGroup.children.push({
						name: 'Loyalty Badges',
						children: planeswalkerBadges,
						opened: false
					});
				}
			} else if (typeof planeswalkerCanvas !== "undefined") {
				// Fallback for older planeswalker canvas
				const { canvas: pwCanvas, ctx: pwCtx } = createCanvas();
				pwCtx.drawImage(planeswalkerCanvas, 0, 0, psdWidth, psdHeight);
				frameGroup.children.push(createLayerBase('Planeswalker Frame', pwCanvas));
			}
		} else if (card.version.toLowerCase().includes('station') && card.station && typeof stationBadgeImage !== "undefined" && typeof stationPTImage !== "undefined") {
			// For station cards, separate badges and PT boxes from their text
			const badgeColor = getColorFromSrc(stationBadgeImage?.src);
			const stationBadges = [];
			
			// Create badge layers (iterate backwards: 2, then 1)
			[2, 1].forEach(index => {
				if (card.station.badgeValues?.[index]?.trim() && /\d/.test(card.station.badgeValues[index])) {
					const pos = getStationPosition('badge', index, index === 2 ? 'ability2' : 'ability1', card.station.badgeSettings);
					if (pos) {
						// Text layer
						const { canvas: textCanvas, ctx: textCtx } = createCanvas();
						textCtx.font = scaleHeight(pos.settings.fontSize) + 'px belerenbsc';
						textCtx.fillStyle = 'white';
						textCtx.textAlign = 'center';
						textCtx.textBaseline = 'middle';
						textCtx.fillText(card.station.badgeValues[index], pos.elementX + (pos.settings.width / 2) + 3, pos.elementY + 5);
						stationTextLayers.push(createLayerBase(`Station Badge ${index}`, textCanvas));
						
						// Badge box layer
						const { canvas: boxCanvas, ctx: boxCtx } = createCanvas();
						if (stationBadgeImage?.complete && stationBadgeImage.naturalWidth > 0) {
							boxCtx.drawImage(stationBadgeImage, pos.elementX, pos.elementY - (pos.settings.height / 2), pos.settings.width, pos.settings.height);
						}
						stationBadges.push(createLayerBase(`${badgeColor}Station Badge ${index}`, boxCanvas));
					}
				}
			});
			
			// Store badges subgroup to add after crowns
			if (stationBadges.length > 0) {
				stationBadgesGroup = {
					name: 'Badges',
					children: stationBadges,
					opened: false
				};
			}
		}
		
		// Add station badges group if it exists
		if (stationBadgesGroup) {
			frameGroup.children.push(stationBadgesGroup);
		}

		// Add Crown layers group if there are any
		if (crownLayers.length > 0) {
			const crownChildren = [];
			crownLayers.forEach(layer => {
				addLayerWithColorOverlay(layer, crownChildren);
			});
			frameGroup.children.push({
				name: 'Crowns',
				children: crownChildren,
				opened: false
			});
		}

		// Add saga canvas (if version is saga)
		if (card.version.toLowerCase().includes('saga') && typeof sagaCanvas !== "undefined" && card.saga) {
			// Extract chapter icons and text separately
			const sagaChapterBadges = [];
			
			// Roman numeral conversion function
			const romanNumeral = (num) => {
				const romanNumerals = [
					['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'],
					['', 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC']
				];
				return romanNumerals[1][Math.floor(num / 10)] + romanNumerals[0][num % 10];
			};
			
			// Process each ability (iterate backwards so they appear 1,2,3,4 in PSD)
			for (let i = card.saga.count - 1; i >= 0; i--) {
				// Calculate chapter number for this ability
				let currentChapterNum = 1;
				for (let j = 0; j < i; j++) {
					currentChapterNum += parseInt(card.saga.abilities[j]);
				}
				
				const ability = card.text['ability' + i];
				const x = scaleX(card.saga.x);
				const y = scaleY(ability.y);
				const width = scaleWidth(card.saga.width);
				const height = scaleHeight(ability.height);
				const chapterCount = parseInt(card.saga.abilities[i]);
				
				// Chapter icon positioning
				const numeralX = x - scaleWidth(0.0614);
				const numeralY = y + (height - scaleHeight(0.0629)) / 2;
				const offset = scaleHeight(0.0358) * 2;
				const centerOffset = (chapterCount - 1) / 2;
				
				// Draw each chapter icon and numeral for this ability (backwards for proper ordering)
				if (typeof sagaChapter !== 'undefined' && sagaChapter?.complete) {
					for (let j = chapterCount - 1; j >= 0; j--) {
						const posOffset = (j - centerOffset) * offset;
						const chapterNum = currentChapterNum + j;
						const romanNum = romanNumeral(chapterNum);
						
						// Chapter icon
						const { canvas: iconCanvas, ctx: iconCtx } = createCanvas();
						iconCtx.drawImage(sagaChapter, numeralX, numeralY + posOffset, scaleWidth(0.0787), scaleHeight(0.0629));
						sagaChapterBadges.push(createLayerBase(`Chapter ${romanNum} Icon`, iconCanvas));
						
						// Roman numeral text
						const { canvas: textCanvas, ctx: textCtx } = createCanvas();
						textCtx.font = 'normal normal 550 ' + scaleHeight(0.0324) + 'px plantinsemibold';
						textCtx.textAlign = 'center';
						textCtx.fillStyle = 'black';
						textCtx.fillText(romanNum, numeralX + scaleWidth(0.0394), numeralY + posOffset + scaleHeight(0.0429));
						sagaTextLayers.push(createLayerBase(`Chapter ${romanNum} Text`, textCanvas));
					}
				}
				
				// Divider line
				if (typeof sagaDivider !== 'undefined' && sagaDivider?.complete) {
					const { canvas: dividerCanvas, ctx: dividerCtx } = createCanvas();
					dividerCtx.drawImage(sagaDivider, x, y - scaleHeight(0.00145), width, scaleHeight(0.0029));
					sagaChapterBadges.push(createLayerBase(`Ability ${i + 1} Divider`, dividerCanvas));
				}
			}
			
			// Add chapter icons group if we have any
			if (sagaChapterBadges.length > 0) {
				frameGroup.children.push({
					name: 'Saga Chapters',
					children: sagaChapterBadges,
					opened: false
				});
			}
		} else if (card.version.toLowerCase().includes('saga') && typeof sagaCanvas !== "undefined") {
			// Fallback for saga canvas without card.saga data
			const { canvas: sagaFrameCanvas, ctx: sagaFrameCtx } = createCanvas();
			sagaFrameCtx.drawImage(sagaCanvas, 0, 0, psdWidth, psdHeight);
			frameGroup.children.push(createLayerBase('Saga Frame', sagaFrameCanvas));
		} else if (card.version.includes('class') && !card.version.includes('classic') && typeof classCanvas !== "undefined" && card.class) {
			// Extract class headers and text separately
			const classHeaders = [];
			
			// Get class header image
			const classHeaderPath = card.version === 'classStoneCutterDeluxe' 
				? '/img/frames/custom/stoneCutter/stoneCutterDeluxe/class/headerGold.png'
				: '/img/frames/class/header.png';
			const classHeaderImage = new Image();
			classHeaderImage.crossOrigin = 'anonymous';
			classHeaderImage.src = classHeaderPath;
			
			// Wait for class header image to load if needed
			if (!classHeaderImage.complete) {
				await new Promise(resolve => {
					classHeaderImage.onload = resolve;
					classHeaderImage.onerror = resolve;
				});
			}
			
			// Calculate which levels are visible and have actual height
			const visibleLevels = [];
			for (let i = 1; i <= 3; i++) {
				const levelHeight = card.text['level' + i + 'c']?.height;
				const levelY = card.text['level' + i + 'c']?.y;
				
				// Only include level if it has positive height and valid Y position
				if (levelHeight > 0 && levelY !== undefined && levelY < 2) {
					visibleLevels.push(i);
				}
			}
			
			// Create header layers for each visible level (iterate backwards for proper ordering)
			for (let i = visibleLevels.length - 1; i >= 0; i--) {
				const levelIndex = visibleLevels[i];
				const levelY = card.text['level' + levelIndex + 'c'].y;
				const levelHeight = card.text['level' + levelIndex + 'c'].height;
				
				const x = scaleX(card.class.x);
				const y = scaleY(levelY);
				const width = scaleWidth(card.class.width);
				const headerHeight = scaleHeight(0.0481);
				
				// Draw header if image is loaded
				if (classHeaderImage.complete && classHeaderImage.naturalWidth > 0) {
					const { canvas: headerCanvas, ctx: headerCtx } = createCanvas();
					headerCtx.drawImage(classHeaderImage, x, y - headerHeight, width, headerHeight);
					classHeaders.push(createLayerBase(`Level ${levelIndex} Header`, headerCanvas));
				}
			}
			
			// Add headers group if we have any
			if (classHeaders.length > 0) {
				frameGroup.children.push({
					name: 'Class Headers',
					children: classHeaders,
					opened: false
				});
			}
		}

		// Add the frame group to the PSD only if it has children
		if (frameGroup.children.length > 0) {
			psd.children.push(frameGroup);
		}

		// Add watermark layer (after frames, before set symbol if one is present)
		if (!card.watermarkSource.includes('/img/blank.png') && card.watermarkZoom > 0) {
			// Store current opacity
			const originalOpacity = card.watermarkOpacity;
			
			// Temporarily set to full opacity
			card.watermarkOpacity = 1;
			document.querySelector('#watermark-opacity').value = 100;
			
			// Redraw watermark at full opacity
			watermarkEdited();
			
			// Create a canvas with the full opacity watermark
			const { canvas: fullOpacityWatermarkCanvas, ctx: fullOpacityWatermarkCtx } = createCanvas();
			fullOpacityWatermarkCtx.drawImage(watermarkCanvas, 0, 0);
			
			// Restore original opacity in UI and card object
			card.watermarkOpacity = originalOpacity;
			document.querySelector('#watermark-opacity').value = originalOpacity * 100;
			watermarkEdited();
			
			// Add to PSD with correct layer opacity
			psd.children.push(createLayerBase('Watermark', fullOpacityWatermarkCanvas, originalOpacity));
		}

		// Create text group with individual text fields AND editable text layers
		const textGroup = {
			name: 'Text',
			children: []
		};

		// Track flavor divider position during text rendering
		let actualFlavorDividerY = null;

		// Font name mapping (shared across all text fields)
		const fontMap = {
			'mplantin': 'MPlantin',
			'mplantini': 'MPlantin-It',
			'belerenb': 'Beleren-Bold',
			'beleren': 'Beleren',
			'belerenbsc': 'BelerenSmallCaps-Bold',
			'matrix': 'MatrixBoldSmallCaps',
			'matrixb': 'MatrixBoldSmallCaps',
			'gothammedium': 'GothamMedium',
			'gothambold': 'GothamBold',
			'goudymedieval': 'GoudyMediaeval',
		};

		// Render each text field separately with BOTH raster and editable text
		// Reverse the order so layers appear in reverse (last text field at bottom)
		const textEntries = Object.entries(card.text).reverse();
		for (const [key, textObject] of textEntries) {
			// Skip empty text fields entirely
			if (!textObject.text || !textObject.text.trim()) {
				continue;
			}
			
			// Check if this text has flavor text - we'll capture the actual position during rendering
			const hasFlavorBar = textObject.text && (textObject.text.includes('{flavor}') || textObject.text.includes('{bar}'));

			// Create raster text canvas (with mana symbols)
			const { canvas: textFieldCanvas, ctx: textFieldCtx } = createCanvas();
			
			// Render this specific text field
			await writeText(textObject, textFieldCtx);
			
			// If this field had a flavor bar, scan the canvas to find where it was actually drawn
			if (hasFlavorBar && card.showsFlavorBar) {
				const imageData = textFieldCtx.getImageData(0, 0, psdWidth, psdHeight);
				
				// Scan for the flavor bar (look for non-transparent pixels in likely Y range)
				const { y: textBoxY, height: textBoxHeight } = getScaledTextBounds(textObject);
				const fontSize = scaleHeight(textObject.size || 0.038);
				
				// Search within the text box area, starting from bottom
				const searchStartY = Math.round(textBoxY + textBoxHeight);
				const searchEndY = Math.round(textBoxY);
				
				// Look for a horizontal line of pixels (the bar is wide) - scan from bottom up
				for (let y = searchStartY; y > searchEndY; y--) {
					let consecutivePixels = 0;
					
					// Sample every 4 pixels for better performance
					for (let x = 0; x < psdWidth; x += 4) {
						const index = (y * psdWidth + x) * 4;
						const alpha = imageData.data[index + 3];
						
						if (alpha > 0) {
							consecutivePixels++;
							
							// If we found a long horizontal line, this is likely our bar
							if (consecutivePixels > scaleWidth(0.5) / 4) {
								actualFlavorDividerY = y;
								break;
							}
						} else {
							consecutivePixels = 0;
						}
					}
					
					if (actualFlavorDividerY !== null) break;
				}
			}
			
			textGroup.children.push({
				name: textObject.name || key,
				canvas: textFieldCanvas
			});

			// Add editable text layer if there's actual text content
			let cleanText = textObject.text
				.replace(/\{line\}/g, '\n')
				.replace(/\{lns\}/g, '\n')
				.replace(/\{[^}]+\}/g, '')
				.trim();


		if (cleanText) {
			const { x: textBoxX, y: textBoxY, width: textBoxWidth, height: textBoxHeight } = getScaledTextBounds(textObject);
			const fontSize = scaleHeight(textObject.size || 0.038);
			const fillColor = parseColorToRGB(textObject.color || 'black');
			const textRotation = textObject.rotation || 0;
				// Get alignment
				const alignment = ['left', 'center', 'right'].includes(textObject.align) ? textObject.align : 'left';

				// Get font name from map
				const actualFont = textObject.font || 'mplantin';
				const fontName = fontMap[actualFont.toLowerCase()] || fontMap['mplantin'];

				// Get the Y offset for this specific text field
				const offsetMultiplier = textOffsets[key] || textOffsets['default'];
				const baselineOffset = fontSize * offsetMultiplier;

				// Get the X offset for this specific text field
				const xOffset = textXOffsets[key] || textXOffsets['default'];

				// Calculate rotation transform and bounding box
				let cos, sin, minX, maxX, minY, maxY;
				
				if (textRotation === 0) {
					// Fast path: no rotation - use simple bounds
					cos = 1;
					sin = 0;
					minX = textBoxX + xOffset;
					maxX = minX + textBoxWidth;
					minY = textBoxY;
					maxY = minY + textBoxHeight;
				} else {
					// Full rotation calculation
					const rotationRad = (textRotation * Math.PI) / 180;
					cos = Math.cos(rotationRad);
					sin = Math.sin(rotationRad);

					// Calculate rotated bounding box for proper layer bounds
					const corners = [
						{ x: 0, y: 0 },
						{ x: textBoxWidth, y: 0 },
						{ x: textBoxWidth, y: textBoxHeight },
						{ x: 0, y: textBoxHeight }
					];

					// Rotate each corner around the origin (top-left of text box)
					const rotatedCorners = corners.map(corner => ({
						x: corner.x * cos - corner.y * sin + textBoxX + xOffset,
						y: corner.x * sin + corner.y * cos + textBoxY
					}));

					// Find the bounding box of the rotated corners
					minX = Math.min(...rotatedCorners.map(c => c.x));
					maxX = Math.max(...rotatedCorners.map(c => c.x));
					minY = Math.min(...rotatedCorners.map(c => c.y));
					maxY = Math.max(...rotatedCorners.map(c => c.y));
				}

		// Check if this is the rules text field
		const isRulesText = checkIsRulesText(key, textObject);

		if (isRulesText) {
			// Create PARAGRAPH text layer for rules text
			const { x: boxLeft, y: boxTop, width: boxWidth, height: boxHeight } = getScaledTextBounds(textObject);					textGroup.children.push({
						name: (textObject.name || key) + ' (Editable)',
						text: {
							text: cleanText,
							transform: [cos, sin, -sin, cos, boxLeft + xOffset, boxTop],
							shapeType: 'box',
							boxBounds: [0, 0, boxWidth, boxHeight],
							style: {
								font: { name: fontName },
								fontSize: fontSize,
								fillColor: fillColor,
								leading: fontSize * 1.2,
							},
							paragraphStyle: {
								alignment: alignment,
								firstLineIndent: 0,
								startIndent: 0,
								endIndent: 0,
								spaceBefore: 0,
								spaceAfter: 0,
							}
						},
						top: minY,
						left: minX,
						bottom: maxY,
						right: maxX
					});
				} else {
					// Create POINT text layer for other text (title, type, pt, etc.)
					textGroup.children.push({
						name: (textObject.name || key) + ' (Editable)',
						text: {
							text: cleanText,
							transform: [cos, sin, -sin, cos, textBoxX + xOffset, textBoxY + baselineOffset],
							style: {
								font: { name: fontName },
								fontSize: fontSize,
								fillColor: fillColor,
							},
							paragraphStyle: {
								alignment: alignment
							}
						},
						top: minY,
						left: minX,
						bottom: maxY,
						right: maxX
					});
				}
			}
		}
	
	
	// Add flavor divider in editable text layer if present
	let flavorDividerLayer = null;
	if (actualFlavorDividerY !== null && card.showsFlavorBar) {
		const barSymbol = getManaSymbol('bar');
		if (barSymbol?.image) {
			const { canvas, ctx } = createCanvas();
			const rulesText = Object.values(card.text).find(t => checkIsRulesText(null, t));
			const barWidth = (rulesText ? scaleWidth(rulesText.width || 0.8) : psdWidth * 0.8) * 0.96;
			ctx.drawImage(barSymbol.image, (psdWidth - barWidth) / 2, actualFlavorDividerY, barWidth, scaleHeight(0.03));
			flavorDividerLayer = { name: 'Flavor Divider', canvas };
		}
	}
	// Organize text layers with editable text in a sub-group
	const editableTextLayers = [];
	const staticTextLayers = [];
	
	// Add saga text layers to static text group FIRST if they exist
	if (typeof sagaTextLayers !== 'undefined' && sagaTextLayers.length > 0) {
		staticTextLayers.push(...sagaTextLayers);
	}
	
	// Add planeswalker text layers to static text group SECOND if they exist
	if (typeof planeswalkerTextLayers !== 'undefined' && planeswalkerTextLayers.length > 0) {
		staticTextLayers.push(...planeswalkerTextLayers);
	}
	
	// Add station text layers to static text group THIRD if they exist
	if (typeof stationTextLayers !== 'undefined' && stationTextLayers.length > 0) {
		staticTextLayers.push(...stationTextLayers);
	}

	textGroup.children.forEach(layer => {
		if (isEditableLayer(layer)) {
			editableTextLayers.push(layer);
		} else {
			staticTextLayers.push(layer);
		}
	});
	
	// Add flavor divider to editable text group if it exists
	if (flavorDividerLayer) {
		editableTextLayers.push(flavorDividerLayer);
	}
	
	const textLayersChildren = [];

	// Add static text layers group FIRST (will appear at bottom of text group in PSD)
	if (staticTextLayers.length > 0) {
		textLayersChildren.push({
			name: 'Static Text Layers',
			children: staticTextLayers,
			opened: true
		});
	}

	// Add editable text layers group LAST if there are any (will appear at top of text group in PSD)
	if (editableTextLayers.length > 0) {
		textLayersChildren.push({
			name: 'Editable Text',
			children: editableTextLayers,
			opened: false,
			hidden: true
		});
	}

	const finalTextGroup = {
		name: 'Text',
		children: textLayersChildren,
		opened: false
	};

	// Add the text group to the PSD only if it has children
	if (finalTextGroup.children.length > 0) {
		psd.children.push(finalTextGroup);
	}

	// Add set symbol layer
	if (card.setSymbolBounds && !setSymbol.src.includes('/img/blank.png')) {
		const { canvas: setSymbolCanvas, ctx: setSymbolCtx } = createCanvas();
		
		drawSetSymbol(setSymbolCtx, setSymbol, card.setSymbolBounds);
		
		const setCode = document.querySelector('#set-symbol-code')?.value?.toUpperCase() || '';
		const rarityCode = document.querySelector('#set-symbol-rarity')?.value?.toLowerCase() || '';
		const rarityMap = { 'c': 'Common', 'u': 'Uncommon', 'r': 'Rare', 'm': 'Mythic', 'red': 'Red', 's': 'Timeshifted', 't': 'Timeshifted' };
		const setRarity = rarityMap[rarityCode] || rarityCode;
		const setSymbolName = [setRarity, setCode, 'Set Symbol'].filter(x => x).join(' ');
		
		psd.children.push(createLayerBase(setSymbolName, setSymbolCanvas));
	}
	
	// Add bottom info layer only if collector info is enabled
	if (document.querySelector('#enableCollectorInfo').checked) {
		psd.children.push(createLayerBase('Collector Info', bottomInfoCanvas));
	}

	// Write PSD file
		const buffer = agPsd.writePsd(psd, { 
			generateThumbnail: true,
			trimImageData: false,
			logMissingFeatures: false
		});
		
		if (!buffer || buffer.byteLength === 0) {
			throw new Error('Failed to generate PSD buffer - buffer is empty');
		}
		
		const endTime = performance.now();
		const timeTaken = ((endTime - startTime) / 1000).toFixed(2);
		const fileSizeMB = (buffer.byteLength / (1024 * 1024)).toFixed(2);
		console.log(`PSD generation completed in ${timeTaken}s, file size: ${fileSizeMB}MB`);
		
		// Download
		const blob = new Blob([buffer], { type: 'application/octet-stream' });
		const url = URL.createObjectURL(blob);
		const downloadElement = document.createElement('a');
		downloadElement.download = getCardName() + '.psd';
		downloadElement.href = url;
		document.body.appendChild(downloadElement);
		downloadElement.click();
		downloadElement.remove();
		URL.revokeObjectURL(url);
		
		notify(`PSD exported successfully (${fileSizeMB}MB in ${timeTaken}s)`, 3);
	} catch (error) {
		// Provide more helpful error messages
		const errorSuffix = error.message.includes('buffer') ? ': Failed to generate file buffer'
			: error.message.includes('memory') ? ': Out of memory. Try closing other tabs.'
			: error.message ? `: ${error.message}` : '';
		notify(`PSD export failed${errorSuffix}`, 5);
	}
}

// Helper function to convert Canvas blend modes to Photoshop blend modes
function convertBlendMode(mode) {
	const modeMap = {
		'source-over': 'normal',
		'multiply': 'multiply',
		'screen': 'screen',
		'overlay': 'overlay',
		'darken': 'darken',
		'lighten': 'lighten',
		'color-dodge': 'color dodge',
		'color-burn': 'color burn',
		'hard-light': 'hard light',
		'soft-light': 'soft light',
		'difference': 'difference',
		'exclusion': 'exclusion',
		'hue': 'hue',
		'saturation': 'saturation',
		'color': 'color',
		'luminosity': 'luminosity'
	};
	return modeMap[mode] || 'normal';
}