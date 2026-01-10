/**
 * ============================================================================
 * AUTO FRAME MODULE
 * ============================================================================
 * This module provides automatic frame generation for the Card Conjurer card creator.
 * It handles frame detection, building, and layering for various MTG frame styles.
 * 
 * Key Components:
 * - Frame Type Configuration: Defines which frame builder to use and what features are supported
 * - Frame Letter Configuration: Defines paths, bounds, and transformations for each frame variant
 * - Unified Frame Builder: Creates frame objects with proper paths, masks, and bounds
 * - Auto Frame Logic: Orchestrates frame building and handles special cases
 * - UI Handler: Detects colors from card properties and triggers frame building
 * 
 * Dependencies (from global scope):
 * - card: The main card object containing all card data
 * - cardFrameProperties(): Function that determines frame properties based on card type
 * - addFrame(): Function that adds a frame to the canvas
 * - loadScript(): Function that loads pack scripts
 * - autoFramePack: Global variable tracking which frame pack is loaded
 * ============================================================================
 */


// ============================================================================
// SECTION 1: FRAME TYPE CONFIGURATION
// ============================================================================
// Defines the high-level configuration for each frame type, including which
// builder function to use, what features are supported (crowns, PT boxes, stamps),
// and which existing frames to preserve when auto-building.

/**
 * Gets the configuration for a specific frame type
 * @param {string} frameType - The frame type identifier (e.g., 'M15Regular-1', 'UB', 'Borderless')
 * @returns {Object} Configuration object with makeFrameFunction, support flags, and filters
 */
function getFrameTypeConfig(frameType) {
	const configs = {
		// Standard M15 frame
		'M15Regular-1': {
			group: 'Standard-3',
			makeFrameFunction: makeM15FrameByLetter,
			supportsCrown: true,      // Legendary crowns
			supportsPT: true,         // Power/Toughness boxes
			supportsStamp: false,     // Holo stamps
			filterFrames: (frame) => frame.name.includes('Extension')
		},
		
		// Accurate M15 frame
		'M15RegularNew': {
			group: 'Accurate',
			makeFrameFunction: makeM15NewFrameByLetter,
			supportsCrown: true,
			supportsPT: true,
			supportsStamp: false,
			filterFrames: (frame) => frame.name.includes('Extension')
		},
		
		// M15 with 8th Edition style elements
		'M15Eighth': {
			group: 'Custom',
			makeFrameFunction: makeM15EighthFrameByLetter,
			supportsCrown: true,
			supportsPT: true,
			supportsStamp: false,
			filterFrames: (frame) => frame.name.includes('Extension')
		},
		
		// Universes Beyond frame
		'UB': {
			group: 'Showcase-5',
			makeFrameFunction: makeUBFrameByLetter,
			supportsCrown: true,
			supportsPT: true,
			supportsStamp: true,
			filterFrames: (frame) => frame.name.includes('Extension') || frame.name.includes('Gray Holo Stamp') || frame.name.includes('Gold Holo Stamp')
		},
		
		// Universes Beyond (accurate version)
		'UBNew': {
			group: 'Accurate',
			makeFrameFunction: (letter, mask, maskToRightHalf, style) => {
				return makeM15NewFrameByLetter(letter, mask, maskToRightHalf, 'ub');
			},
			supportsCrown: true,
			supportsPT: true,
			supportsStamp: true,
			filterFrames: (frame) => frame.name.includes('Extension') || frame.name.includes('Gray Holo Stamp') || frame.name.includes('Gold Holo Stamp')
		},
		
		// Circuit frame
		'Circuit': {
			group: 'Custom',
			makeFrameFunction: makeCircuitFrameByLetter,
			supportsCrown: true,
			supportsPT: true,
			supportsStamp: false,
			filterFrames: (frame) => frame.name.includes('Extension')
		},
		
		// Etched foil frame
		'Etched': {
			group: 'Showcase-5',
			makeFrameFunction: makeEtchedFrameByLetter,
			supportsCrown: true,
			supportsPT: true,
			supportsStamp: true,
			filterFrames: (frame) => frame.name.includes('Extension')
		},
		
		// Phyrexian/Praetors frame
		'Praetors': {
			group: 'Showcase-5',
			makeFrameFunction: makePhyrexianFrameByLetter,
			supportsCrown: true,
			supportsPT: true,
			supportsStamp: false,
			filterFrames: (frame) => frame.name.includes('Extension')
		},
		
		// 7th Edition frame
		'Seventh': {
			group: 'Misc-2',
			makeFrameFunction: makeSeventhEditionFrameByLetter,
			supportsCrown: false,
			supportsPT: false,
			supportsStamp: false,
			filterFrames: (frame) => frame.name.includes('Extension') || frame.name.includes('DCI Star')
		},
		
		// M15 Box Topper / Extended Art
		'M15BoxTopper': {
			group: 'Showcase-5',
			makeFrameFunction: (letter, mask, maskToRightHalf, style) => {
				return makeExtendedArtFrameByLetter(letter, mask, maskToRightHalf, style, false);
			},
			supportsCrown: true,
			supportsPT: true,
			supportsStamp: false,
			filterFrames: (frame) => frame.name.includes('Extension')
		},
		
		// M15 Extended Art (shorter variant)
		'M15ExtendedArtShort': {
			group: 'Showcase-5',
			makeFrameFunction: (letter, mask, maskToRightHalf, style) => {
				return makeExtendedArtFrameByLetter(letter, mask, maskToRightHalf, style, true);
			},
			supportsCrown: true,
			supportsPT: true,
			supportsStamp: false,
			filterFrames: (frame) => frame.name.includes('Extension')
		},
		
		// 8th Edition frame
		'8th': {
			group: 'Misc-2',
			makeFrameFunction: make8thEditionFrameByLetter,
			supportsCrown: false,
			supportsPT: true,
			supportsStamp: false,
			filterFrames: (frame) => frame.name.includes('Extension')
		},
		
		// Borderless (Alt) frame
		'Borderless': {
			group: 'Showcase-5',
			makeFrameFunction: makeBorderlessFrameByLetter,
			supportsCrown: true,
			supportsPT: true,
			supportsStamp: false,
			filterFrames: (frame) => frame.name.includes('Extension')
		},
		
		// Borderless (Alt) Universes Beyond Frame
		'BorderlessUB': {
			group: 'Showcase-5',
			makeFrameFunction: (letter, mask, maskToRightHalf, style) => {
				return makeBorderlessFrameByLetter(letter, mask, maskToRightHalf, style, true);
			},
			supportsCrown: true,
			supportsPT: true,
			supportsStamp: false,
			filterFrames: (frame) => frame.name.includes('Extension') || frame.name.includes('Gray Holo Stamp') || frame.name.includes('Gold Holo Stamp')
		},
		
		// M15 Eighth Edition Universes Beyond (custom hybrid)
		'M15EighthUB': {
			group: 'Custom',
			makeFrameFunction: makeM15EighthUBFrameByLetter,
			supportsCrown: true,
			supportsPT: true,
			supportsStamp: true,  // Uses special multicolor stamp handling
			filterFrames: (frame) => frame.name.includes('Extension') || frame.name.includes('Gray Holo Stamp') || frame.name.includes('Gold Holo Stamp')
		},
		
		// Full Art (accurate version)
		'FullArtNew': {
			group: 'Accurate',
			makeFrameFunction: (letter, mask, maskToRightHalf, style) => {
				return makeM15NewFrameByLetter(letter, mask, maskToRightHalf, 'fullart');
			},
			supportsCrown: true,
			supportsPT: true,
			supportsStamp: false,
			filterFrames: (frame) => frame.name.includes('Extension')
		},
		
		// Japan Showcase frame
		'JapanShowcase': {
			group: 'Showcase-5',
			makeFrameFunction: makeJapanShowcaseFrameByLetter,
			supportsCrown: false,
			supportsPT: true,
			supportsStamp: true,
			filterFrames: (frame) => frame.name.includes('Extension')
		},
		
		// Vault (BIG) frame
		'Vault': {
			group: 'Showcase-5',
			makeFrameFunction: makeVaultFrameByLetter,
			supportsCrown: true,
			supportsPT: true,
			supportsStamp: true,
			filterFrames: (frame) => frame.name.includes('Extension')
		},
		
		// Adventure frame
		'Adventure': {
			group: 'Showcase-5',
			makeFrameFunction: makeAdventureFrameByLetter,
			supportsCrown: true,
			supportsPT: true,
			supportsStamp: false,
			filterFrames: (frame) => frame.name.includes('Extension')
		},
		
		// Omen frame
		'Omen': {
			group: 'Showcase-5',
			makeFrameFunction: makeOmenFrameByLetter,
			supportsCrown: true,
			supportsPT: true,
			supportsStamp: false,
			filterFrames: (frame) => frame.name.includes('Extension')
		}
	};
	
	return configs[frameType];
}


// ============================================================================
// SECTION 2: FRAME LETTER CONFIGURATION
// ============================================================================
// Defines the detailed configuration for each frame type's color variants.
// This includes:
// - frameNames: Human-readable names for each color (W=White, U=Blue, etc.)
// - basePath: Root directory for frame assets
// - bounds: Position and size of frame elements (crowns, PT boxes, stamps)
// - pathBuilder: Function to construct the file path for a given color/mask
// - maskPath: Function to construct mask file paths
// - letterTransform: Function to transform letters before processing (e.g., strip land indicators)

/**
 * Gets the letter-based configuration for a specific frame type
 * @param {string} frameType - The frame type identifier
 * @returns {Object} Configuration with frameNames, paths, bounds, and transformation functions
 */
function getFrameLetterConfig(frameType) {
	// Color letter mappings used by most frame types
	const standardFrameNames = {
		'W': 'White',
		'U': 'Blue',
		'B': 'Black',
		'R': 'Red',
		'G': 'Green',
		'M': 'Multicolored',
		'A': 'Artifact',
		'L': 'Land',
		'C': 'Colorless',
		'V': 'Vehicle',
		'WL': 'White Land',
		'UL': 'Blue Land',
		'BL': 'Black Land',
		'RL': 'Red Land',
		'GL': 'Green Land',
		'ML': 'Multicolored Land'
	};

	// Extended color mappings for Universes Beyond and Nyx enchantment variants
	const extendedFrameNames = {
		...standardFrameNames,
		'WE': 'White Enchantment',
		'UE': 'Blue Enchantment',
		'BE': 'Black Enchantment',
		'RE': 'Red Enchantment',
		'GE': 'Green Enchantment',
		'ME': 'Multicolored Enchantment',
		'AE': 'Artifact Enchantment'
	};

	const configs = {
		'M15': {
			frameNames: standardFrameNames,
			basePath: '/img/frames/m15/',
			bounds: {
				crownBorderCover: {height: 0.0177, width: 0.9214, x: 0.0394, y: 0.0277},
				crown: {height: 0.1667, width: 0.9454, x: 0.0274, y: 0.0191},
				innerCrown: {height: 0.0239, width: 0.672, x: 0.164, y: 0.0239},
				pt: {height: 0.0733, width: 0.188, x: 0.7573, y: 0.8848}
			},
			pathBuilder: (letter, mask, style) => {
				if (mask === 'Crown') return `crowns/m15Crown${letter}.png`;
				if (mask === 'Inner Crown') return `innerCrowns/m15InnerCrown${letter}${style}.png`;
				if (mask === 'PT') return `regular/m15PT${letter}.png`;
				
				// Main frame
				let path = `${style.toLowerCase()}/m15Frame${letter}.png`;
				if (style === 'snow') {
					path = path.replace(`m15Frame${letter}`, letter.toLowerCase());
				} else if (letter.includes('L') && letter.length > 1) {
					path = path.replace(`m15Frame${letter}`, `l${letter[0].toLowerCase()}`);
				}
				if (style === 'Nyx') {
					path = path.replace('.png', 'Nyx.png');
				}
				return path;
			},
			maskPath: (mask) => `regular/m15Mask${mask}.png`,
			letterTransform: (letter, mask, style) => {
				// Strip land indicator 'L' for all masks and main frame
				if (letter.includes('L') && letter.length > 1) {
					return letter[0];
				}
				if (letter === 'L' && style === 'Nyx') {
					return {letter, style: 'regular'};
				}
				return letter;
			}
		},
		'M15New': {
			frameNames: extendedFrameNames,
			basePath: '/img/frames/m15/',
			bounds: {
				crownBorderCover: {x:0, y:0, width:1, height:137/2814},
				crown: {x:44/2010, y:53/2814, width:1922/2010, height:493/2814},
				innerCrown: {x:329/2010, y:70/2814, width:1353/2010, height:64/2814},
				pt: {height: 0.0733, width: 0.188, x: 0.7573, y: 0.8848},
				stamp: {x:857/2015, y:2534/2814, width:299/2015, height:137/2814}
			},
			pathBuilder: (letter, mask, style) => {
				if (mask === 'Crown') {
					let framePath = style === 'ub' ? 'ub/' : '';
					return `${framePath}crowns/new/${letter.toLowerCase()}.png`;
				}
				if (mask === 'Inner Crown') return `innerCrowns/new/${style.toLowerCase()}/${letter.toLowerCase()}.png`;
				if (mask === 'Stamp' && style === 'ub') return `new/ub/stamp/${letter.toLowerCase()}.png`;
				if (mask === 'PT') {
					if (style === 'ub') return `ub/pt/${letter.toLowerCase()}.png`;
					return `regular/m15PT${letter}.png`;
				}
				
				// Main frame
				let stylePath = style !== 'regular' ? `${style.toLowerCase()}/` : '';
				return `new/${stylePath}${letter.toLowerCase()}.png`;
			},
			maskPath: (mask) => `new/${mask.toLowerCase()}.png`,
			letterTransform: (letter, mask, style) => {
				if (style === 'ubnyx') {
					letter += 'E';
					if (mask === 'Inner Crown') style = 'nyx';
					else style = 'ub';
				}
				
				if (letter.length === 2) {
					letter = letter.split("").reverse().join("");
				}
				
				if ((mask === 'Crown' || mask === 'PT' || mask?.includes('Stamp')) && (letter.includes('L') || letter.includes('E')) && letter.length > 1) {
					letter = letter[1];
				}
				
				return {letter, style, frameName: letter.split("").reverse().join("")};
			}
		},
		'M15Eighth': {
			frameNames: standardFrameNames,
			basePath: '/img/frames/',
			bounds: {
				crownBorderCover: {height: 0.0177, width: 0.9214, x: 0.0394, y: 0.0277},
				crown: {height: 0.1667, width: 0.9454, x: 0.0274, y: 0.0191},
				innerCrown: {height: 0.0239, width: 0.672, x: 0.164, y: 0.0239},
				pt: {x:0.7573, y:1901/2100, width:0.188, height:0.0733}
			},
			pathBuilder: (letter, mask, style) => {
				if (mask === 'Crown') return `m15/crowns/m15Crown${letter}.png`;
				if (mask === 'Inner Crown') return `m15/innerCrowns/m15InnerCrown${letter}${style}.png`;
				if (mask === 'PT') return `m15/regular/m15PT${letter}.png`;
				return `custom/m15-eighth/${style.toLowerCase()}/${letter.toLowerCase()}.png`;
			},
			maskPath: (mask) => {
				if (mask.toLowerCase() === 'border' || mask.toLowerCase() === 'frame') {
					return `custom/m15-eighth/regular/${mask}.png`;
				}
				return `m15/regular/m15Mask${mask}.png`;
			},
			letterTransform: (letter, mask, style) => {
				// Strip land indicator 'L' for all masks and main frame
				if (letter.includes('L') && letter.length > 1) {
					return letter[0];
				}
				if (letter === 'L' && style === 'Nyx') {
					return {letter, style: 'regular'};
				}
				return letter;
			}
		},
		'M15EighthUB': {
			frameNames: extendedFrameNames,
			basePath: '/img/frames/',
			bounds: {
				crownBorderCover: {height: 0.0177, width: 0.9214, x: 0.0394, y: 0.0277},
				crown: {height: 0.1667, width: 0.9454, x: 0.0274, y: 0.0191},
				innerCrown: {height: 0.0239, width: 0.672, x: 0.164, y: 0.0239},
				pt: {height: 0.0733, width: 0.188, x: 0.7573, y: 1901/2100},
				stamp: {x: 0.4254, y: 0.9005, width: 0.1494, height: 0.0486}
			},
			pathBuilder: (letter, mask, style) => {
				if (mask === 'Crown') return `m15/ub/crowns/m15Crown${letter}.png`;
				if (mask === 'Inner Crown') return `m15/innerCrowns/m15InnerCrown${letter}${style}UB.png`;
				if (mask === 'PT') return `m15/ub/pt/${letter}.png`;
				if (mask === 'Stamp') {
					// For multicolor stamps, always use 'm' as base
					if (letter.length > 1) {
						return `custom/m15-eighth/ub/stamp/m.png`;
					}
					return `custom/m15-eighth/ub/stamp/${letter.toLowerCase()}.png`;
				}
				return `custom/m15-eighth/ub/${letter.toLowerCase()}.png`;
			},
			maskPath: (mask, frameMask, letter) => {
				if (mask.toLowerCase() === 'border' || mask.toLowerCase() === 'frame') {
					return `custom/m15-eighth/regular/${mask}.png`;
				}
				return `m15/regular/m15Mask${mask}.png`;
			},
			letterTransform: (letter, mask, style) => {
				if (style === 'Nyx') letter += 'E';
				// Strip land indicator 'L' or enchantment indicator 'E' for all masks and main frame
				if ((letter.includes('L') || letter.includes('E')) && letter.length > 1) {
					return letter[0];
				}
				return letter;
			}
		},
		'Borderless': {
			frameNames: standardFrameNames,
			basePath: '/img/frames/',
			bounds: {
				crownBorderCover: {height: 0.0177, width: 0.9214, x: 0.0394, y: 0.0277},
				crown: {height: 0.1024, width: 0.9387, x: 0.0307, y: 0.0191},
				pt: { height: 140/2100, width: 274/1500, x: 1146/1500, y: 1861/2100},
				stamp: {height: 0.0486, width: 0.1494, x: 0.4254, y: 0.9005}
			},
			pathBuilder: (letter, mask, style, universesBeyond) => {
				if (mask === 'Crown') {
					if (universesBeyond) {
						return `m15/ub/crowns/floating/${letter.toLowerCase()}.png`;
					}
					return `m15/crowns/m15Crown${letter}Floating.png`;
				}
				if (mask === 'PT') return `m15/borderless/pt/${letter.toLowerCase()}.png`;
				if (mask === 'Stamp' && universesBeyond) return `m15/ub/regular/stamp/${letter.toLowerCase()}.png`;
				return `m15/borderless/m15GenericShowcaseFrame${letter}.png`;
			},
			maskPath: (mask) => `m15/regular/m15Mask${mask}.png`,
			letterTransform: (letter, mask) => {
				// Strip land indicator 'L' from all masks and main frame for Borderless
				if (letter.includes('L') && letter.length > 1) {
					return letter[0];
				}
				return letter;
			}
		},
		'8thEdition': {
			frameNames: standardFrameNames,
			basePath: '/img/frames/8th/',
			bounds: {
				pt: {x: 1461/2010, y: 2481/2814, width: 414/2010, height: 218/2814}
			},
			pathBuilder: (letter, mask, style) => {
				if (mask === 'PT') return `pt/${letter.toLowerCase()}.png`;
				// Handle Nyx style
				if (style === 'Nyx') return `nyx/${letter.toLowerCase()}.png`;
				// Handle land frames (keep WL, UL, etc. format)
				if (letter.length > 1 && letter.includes('L')) {
					return `${letter.toLowerCase()}.png`;
				}
				return `${letter.toLowerCase()}.png`;
			},
			maskPath: (mask) => {
				// 8th Edition masks are .png files, not .svg
				return `${mask.toLowerCase()}.png`;
			},
			letterTransform: (letter, mask, style) => {
				if (mask === 'PT' && letter.includes('L') && letter.length > 1) {
					return letter[0];
				}
				// For Nyx frames, strip the 'L' for land frames
				if (style === 'Nyx' && letter.includes('L') && letter.length > 1) {
					return letter[0];
				}
				return letter;
			}
		},
		'ExtendedArt': {
			frameNames: standardFrameNames,
			basePath: '/img/frames/',
			bounds: {
				crownBorderCover: {height: 0.0177, width: 0.9214, x: 0.0394, y: 0.0277},
				crown: {height: 0.1024, width: 0.9387, x: 0.0307, y: 0.0191},
				crownOutline: {height: 0.1062, width: 0.944, x: 0.028, y: 0.0172},
				innerCrown: {height: 0.0239, width: 0.672, x: 0.164, y: 0.0239},
				pt: {height: 0.0733, width: 0.188, x: 0.7573, y: 0.8848}
			},
			pathBuilder: (letter, mask, style, short) => {
				if (mask === 'Crown') return `m15/crowns/m15Crown${letter}Floating.png`;
				if (mask === 'Crown Outline' || mask === 'Legend Crown Outline') return `m15/crowns/m15CrownFloatingOutline.png`;
				if (mask === 'Inner Crown') return `m15/innerCrowns/m15InnerCrown${letter}${style}.png`;
				if (mask === 'PT') return `m15/regular/m15PT${letter}.png`;
				
				// Main frame
				if (style !== 'regular') {
					let path = `extended/regular/${style.toLowerCase()}/${letter.toLowerCase()}.png`;
					if (short) path = path.replace('/regular/', '/shorter/');
					return path;
				} else if (short) {
					return `m15/boxTopper/short/${letter.toLowerCase()}.png`;
				}
				return `m15/boxTopper/m15BoxTopperFrame${letter}.png`;
			},
			maskPath: (mask, short) => {
				if (mask === 'Title Cutout') {
					return short ? `extended/shorter/titleCutout.png` : `m15/boxTopper/m15BoxTopperTitleCutout.png`;
				}
				if (short && ['Frame', 'Rules', 'Type', 'Pinline'].includes(mask)) {
					let extension = mask === 'Type' ? '.png' : '.svg';
					return `m15/boxTopper/short/${mask.toLowerCase().replace('rules', 'text')}${extension}`;
				}
				return `m15/regular/m15Mask${mask}.png`;
			},
			letterTransform: (letter, mask) => {
				// Strip land indicator 'L' for all masks and main frame
				if (letter.includes('L') && letter.length > 1) {
					return letter[0];
				}
				return letter;
			}
		},
		'UB': {
			frameNames: extendedFrameNames,
			basePath: '/img/frames/m15/',
			bounds: {
				crownBorderCover: {height: 0.0177, width: 0.9214, x: 0.0394, y: 0.0277},
				crown: {height: 0.1667, width: 0.9454, x: 0.0274, y: 0.0191},
				innerCrown: {height: 0.0239, width: 0.672, x: 0.164, y: 0.0239},
				pt: {height: 0.0733, width: 0.188, x: 0.7573, y: 0.8848},
				stamp: {height: 0.0486, width: 0.1494, x: 0.4254, y: 0.9005}
			},
			pathBuilder: (letter, mask, style) => {
				if (mask === 'Crown') return `ub/crowns/m15Crown${letter}.png`;
				if (mask === 'Inner Crown') return `innerCrowns/m15InnerCrown${letter}${style}UB.png`;
				if (mask === 'Stamp') return `ub/regular/stamp/${letter.toLowerCase()}.png`;
				if (mask === 'PT') {
					let ptLetter = letter === 'L' ? 'C' : letter;
					return `ub/pt/${ptLetter.toLowerCase()}.png`;
				}
				return `ub/regular/${letter.toLowerCase()}.png`;
			},
			maskPath: (mask) => `regular/m15Mask${mask}.png`,
			letterTransform: (letter, mask, style) => {
				if (letter === 'C') letter = 'L';
				if (style === 'Nyx') letter += 'E';
				// Strip land indicator 'L' or enchantment indicator 'E' for all masks and main frame
				if ((letter.includes('L') || letter.includes('E')) && letter.length > 1) {
					return letter[0];
				}
				return letter;
			}
		},
		'Circuit': {
			frameNames: standardFrameNames,
			basePath: '/img/frames/',
			bounds: {
				crownBorderCover: {height: 0.0177, width: 0.9214, x: 0.0394, y: 0.0277},
				crown: {height: 0.1667, width: 0.9454, x: 0.0274, y: 0.0191},
				pt: {height: 0.0733, width: 0.188, x: 0.7573, y: 0.8848}
			},
			pathBuilder: (letter, mask) => {
				if (mask === 'Crown') return `m15/ub/crowns/m15Crown${letter}.png`;
				if (mask === 'PT') return `m15/ub/pt/${letter.toLowerCase()}.png`;
				// Handle land frames (keep WL, UL, etc. format)
				if (letter.length > 1 && letter.includes('L')) {
					return `custom/circuit/${letter.toLowerCase()}.png`;
				}
				return `custom/circuit/${letter.toLowerCase()}.png`;
			},
			maskPath: (mask) => {
				// Circuit uses M15 regular masks
				return `m15/regular/m15Mask${mask}.png`;
			},
			letterTransform: (letter, mask) => {
				// Strip land indicator 'L' for all masks and main frame
				if (letter.includes('L') && letter.length > 1) {
					return letter[0];
				}
				return letter;
			}
		},
		'Etched': {
			frameNames: standardFrameNames,
			basePath: '/img/frames/etched/',
			bounds: {
				crownBorderCover: {height: 0.0177, width: 0.9214, x: 0.0394, y: 0.0277},
				crown: {x:0.0307, y:0.0191, width:0.9387, height:0.092},
				pt: {height: 0.0733, width: 0.188, x: 0.7573, y: 0.8848},
				stamp: {x:0.42, y:0.9062, width:0.16, height:0.0453}
			},
			pathBuilder: (letter, mask) => {
				if (mask === 'Crown') return `regular/crowns/${letter}.png`;
				if (mask === 'PT') return `regular/pt/${letter}.png`;
				if (mask === 'Stamp') return `regular/holo/${letter}.png`;
				return `regular/${letter.toLowerCase()}.png`;
			},
			maskPath: (mask) => {
				// Etched frames don't have separate Pinline masks - it's baked into the frame
				if (mask === 'Pinline') return null;
				return `regular/${mask.toLowerCase()}.svg`;
			},
			letterTransform: (letter, mask) => {
				// Strip land indicator 'L' for all masks and main frame
				if (letter.includes('L') && letter.length > 1) {
					return letter[0];
				}
				return letter;
			}
		},
		'Phyrexian': {
			frameNames: standardFrameNames,
			basePath: '/img/frames/m15/praetors/',
			bounds: {
				crownBorderCover: {height: 0.0177, width: 0.9214, x: 0.0394, y: 0.0277},
				crown: {x: 0, y: 0, width: 1, height: 0.0476},
				pt: {x: 0.746, y: 0.8858, width: 0.212, height: 0.0772}
			},
			pathBuilder: (letter, mask) => {
				if (mask === 'Crown') return `${letter.toLowerCase()}Crown.png`;
				if (mask === 'PT') return `${letter.toLowerCase()}pt.png`;
				return `${letter.toLowerCase()}.png`;
			},
			maskPath: (mask) => {
				// Praetors have a special pinline.png instead of pinline.svg
				if (mask === 'Pinline') return `pinline.png`;
				// Rules Text mask is text.svg instead of rules.svg
				if (mask === 'Rules') return `text.svg`;
				// Frame and Border are in praetors folder
				if (mask === 'Frame' || mask === 'Border') return `${mask.toLowerCase()}.${mask === 'Border' ? 'png' : 'svg'}`;
				// Title and Type use M15 regular masks
				if (mask === 'Title' || mask === 'Type') return `../regular/m15Mask${mask}.png`;
				return `${mask.toLowerCase()}.svg`;
			},
			letterTransform: (letter, mask) => {
				// Strip land indicator 'L' for all masks and main frame
				if (letter.includes('L') && letter.length > 1) {
					return letter[0];
				}
				return letter;
			}
		},
		'SeventhEdition': {
			frameNames: {
				...standardFrameNames,
				'ML': 'Multicolored Land' // Override
			},
			basePath: '/img/frames/seventh/',
			bounds: {},
			pathBuilder: (letter, mask) => {
				return `regular/${letter.toLowerCase()}.png`;
			},
			maskPath: (mask) => {
				if (mask === 'Textbox Pinline') return `regular/trim.svg`;
				return `regular/${mask.toLowerCase()}.svg`;
			},
			letterTransform: (letter) => {
				if (letter === 'V') return 'A';
				if (letter === 'ML') return 'L';
				return letter;
			}
		},
		'JapanShowcase': {
			frameNames: {
				...standardFrameNames,
				'bAlt': 'Black (Alt)'  // Special alternate black variant
			},
			basePath: '/img/frames/m15/japanShowcase/',
			bounds: {
				crownBorderCover: {height: 0.0177, width: 0.9214, x: 0.0394, y: 0.0277},
				crown: {height: 0.1667, width: 0.9454, x: 0.0274, y: 0.0191},
				pt: {x: 0.7771, y: 0.8876, width: 0.1720, height: 0.0593},
				stamp: {x: 877/2010, y: 2537/2814, width: 0.1264, height: 0.0452}
			},
			pathBuilder: (letter, mask) => {
				const colorLetter = letter === 'bAlt' ? 'bAlt' : letter.toLowerCase();
				if (mask === 'PT') return `pt/${colorLetter}.png`;
				if (mask === 'Stamp') return `stamp/${colorLetter}.png`;
				// Main frame - handle special case for land
				if (letter === 'L') return 'Land.png';
				return `${colorLetter}.png`;
			},
			maskPath: (mask) => {
				// Map mask names to Japan Showcase mask files
				const maskMap = {
					'Pinline': 'mask/MaskPinline.png',
					'Title': 'mask/MaskTitle.png',
					'Type': 'mask/MaskType.png',
					'Rules': 'mask/MaskBottom.png',  // Rules uses the bottom mask
					'Border Pinline': 'mask/MaskBottomPinline.png',
					'Border': 'mask/MaskBottom.png',
					'Frame': 'border.png',  // Frame uses the border.png
					'PT Box Pinline': 'mask/MaskPtBoxPinline.png'
				};
				return maskMap[mask] || `mask/Mask${mask}.png`;
			},
			letterTransform: (letter, mask) => {
				// Strip land indicator 'L' for all masks except main frame
				if (letter.includes('L') && letter.length > 1 && mask) {
					return letter[0];
				}
				// For vehicles, use artifact
				if (letter === 'V') return 'A';
				return letter;
			}
		},
		'Vault': {
			frameNames: standardFrameNames,
			basePath: '/img/frames/vault/',
			bounds: {
				crown: {x: -88/2010, y: -80/2814, width: 2187/2010, height: 2975/2814},
				crownBorderCover: {height: 0.0177, width: 0.9214, x: 0.0394, y: 0.0277},
				pt: {x: 0, y: 0, width: 1, height: 1},
				stamp: {x: 835/2010, y: 2507/2814, width: 341/2010, height: 151/2814},
				plainStamp: {x: 917/2010, y: 2563/2814, width: 0.0894, height: 0.0320}
			},
			pathBuilder: (letter, mask) => {
				const colorLetter = letter.toLowerCase();
				if (mask === 'Crown') return `crown/${colorLetter}.png`;
				if (mask === 'PT') return `pt/${colorLetter}.png`;
				if (mask === 'Stamp') return `stamp/${colorLetter}.png`;
				if (mask === 'Plain Stamp') return '../m15/holoStamps/stamp.png';
				return `${colorLetter}.png`;
			},
			maskPath: (mask) => {
				// Map mask names to Vault mask files
				const maskMap = {
					'Pinline': 'masks/maskPinlines.png',
					'Title': 'masks/maskTitle.png',
					'Type': 'masks/maskType.png',
					'Rules': 'masks/maskRules.png',
					'Text Boxes': 'masks/maskTextBoxes.png',
					'Frame': 'masks/maskFrame.png',
					'Borderless': 'masks/maskBorderless.png',
					'Bottom Frame': 'masks/maskBottomFrame.png',
					'Bottom Frame No Border': 'masks/maskBottomFrameNoBorder.png',
					'No Border': 'masks/maskNoBorder.png',
					'Border': 'masks/maskBorder.png'
				};
				return maskMap[mask] || `masks/mask${mask}.png`;
			},
			letterTransform: (letter, mask) => {
				// Strip land indicator 'L' for all masks except main frame
				if (letter.includes('L') && letter.length > 1 && mask) {
					return letter[0];
				}
				// For vehicles, use artifact
				if (letter === 'V') return 'A';
				return letter;
			}
		},
		'Adventure': {
			frameNames: standardFrameNames,
			basePath: '/img/frames/adventure/',
			bounds: {
				crownBorderCover: {height: 0.0177, width: 0.9214, x: 0.0394, y: 0.0277},
				crown: {height: 0.1667, width: 0.9454, x: 0.0274, y: 0.0191},
				pt: {x: 0.7573, y: 0.8848, width: 0.188, height: 0.0733}
			},
			pathBuilder: (letter, mask, style) => {
				const colorLetter = letter.toLowerCase();
				if (mask === 'Crown') return `../m15/crowns/m15Crown${letter}.png`;  // Use M15 crowns
				if (mask === 'PT') return `../m15/regular/m15PT${letter}.png`;  // Use M15 PT boxes
				// Handle Nyx style
				if (style === 'Nyx') return `nyx/${colorLetter}.png`;
				// Main frame
				return `regular/${colorLetter}.png`;
			},
			maskPath: (mask) => {
				// Map mask names to Adventure mask files
				const maskMap = {
					'Pinline': 'regular/pinline.svg',
					'Title': '../m15/regular/m15MaskTitle.png',
					'Type': '../m15/regular/m15MaskType.png',
					'Rules': 'regular/book.svg',
					'Rules (Left)': 'regular/bookLeft.png',
					'Rules (Left, Multicolor)': 'regular/bookLeftMulticolor.png',
					'Rules (Right)': 'regular/bookRight.png',
					'Rules (Right, Multicolor)': 'regular/bookRightMulticolor.png',
					'Frame': 'regular/maskFrame.png',
					'Border': '../m15/regular/m15MaskBorder.png'
				};
				return maskMap[mask] || null;
			},
			letterTransform: (letter, mask) => {
				// Strip land indicator 'L' for all masks except main frame
				if (letter.includes('L') && letter.length > 1 && mask) {
					return letter[0];
				}
				// For vehicles, use artifact
				if (letter === 'V') return 'A';
				return letter;
			}
		},
		'Omen': {
			frameNames: standardFrameNames,
			basePath: '/img/frames/omen/',
			supportsCrown: true,
			supportsPT: true,
			supportsStamp: false,
			bounds: {
				crownBorderCover: {height: 0.0177, width: 0.9214, x: 0.0394, y: 0.0277},
				crown: {height: 0.1667, width: 0.9454, x: 0.0274, y: 0.0191},
				pt: {x: 0.7573, y: 0.8848, width: 0.188, height: 0.0733}
			},
			pathBuilder: (letter, mask, style) => {
				const colorLetter = letter.toLowerCase();
				if (mask === 'Crown') return `../m15/crowns/m15Crown${letter}.png`;  // Use M15 crowns
				if (mask === 'PT') return `../m15/regular/m15PT${letter}.png`;  // Use M15 PT boxes
				// Handle special Omen masks - these are separate colored overlays
				if (mask === 'Omen' || mask === 'Omen (Right Half)') {
					// Return null to use maskPath instead
					return null;
				}
				// Handle Nyx (enchantment) style
				if (style === 'nyx') return `nyx/${colorLetter}.png`;
				// Main frame
				return `regular/${colorLetter}.png`;
			},
			maskPath: (mask) => {
				// Map mask names to Omen mask files
				const maskMap = {
					'Pinline': 'regular/pinline.png',
					'Title': '../m15/regular/m15MaskTitle.png',
					'Type': '../m15/regular/m15MaskType.png',
					'Rules': 'regular/rules.png',
					'Frame': 'regular/maskFrame.png',
					'Rules (Right Half)': 'regular/rulesRight.png',
					'Omen': 'regular/omen.png',
					'Omen (Right Half)': 'regular/omenRight.png',
					'Border': '../m15/regular/m15MaskBorder.png'
				};
				return maskMap[mask] || null;
			},
			letterTransform: (letter, mask) => {
				// Strip land indicator 'L' for all masks except main frame
				if (letter.includes('L') && letter.length > 1 && mask) {
					return letter[0];
				}
				// For vehicles, use artifact
				if (letter === 'V') return 'A';
				return letter;
			}
		}
	};

	return configs[frameType];
}


// ============================================================================
// SECTION 3: UNIFIED FRAME BUILDER
// ============================================================================
// This is the core function that builds frame objects based on configuration.
// It handles all frame types through a unified interface, applying letter
// transformations, constructing paths, and managing masks.

/**
 * Unified frame builder that creates frame objects for any frame type
 * @param {string} frameType - The frame type identifier (e.g., 'M15', 'UB', 'Borderless')
 * @param {string} letter - Color letter(s) (W, U, B, R, G, M, A, L, C, V, or combinations)
 * @param {string|boolean} mask - The mask type to apply ('Crown', 'PT', 'Stamp', etc.) or false for none
 * @param {boolean} maskToRightHalf - Whether to mask to the right half (for multicolor cards)
 * @param {string} style - Frame style variant ('regular', 'Nyx', 'snow', 'ub', etc.)
 * @param {*} extraParam - Additional parameter (varies by frame type, e.g., universesBeyond flag, short flag)
 * @returns {Object|null} Frame object with name, src, masks, and bounds, or null if mask doesn't exist
 */
function makeFrameByLetterUnified(frameType, letter, mask = false, maskToRightHalf = false, style = 'regular', extraParam = false) {
	const config = getFrameLetterConfig(frameType);
	if (!config) {
		console.error('Unknown frame type for makeFrameByLetter:', frameType);
		return {};
	}

	letter = letter.toUpperCase();
	
	// Apply letter transformation (handles stripping land/enchantment indicators, style changes, etc.)
	let transformResult = config.letterTransform ? config.letterTransform(letter, mask, style) : letter;
	if (typeof transformResult === 'object') {
		letter = transformResult.letter || letter;
		style = transformResult.style !== undefined ? transformResult.style : style;
		var originalFrameName = transformResult.frameName; // Store original frame name if provided
	} else {
		letter = transformResult; // If transformResult is a string, use it as the new letter
	}
	
	// Get human-readable frame name for display
	let frameNameKey = originalFrameName || letter;
	var frameName = config.frameNames[frameNameKey];

	// ----------------------------------------------------------------
	// SPECIAL FRAME ELEMENT HANDLERS
	// ----------------------------------------------------------------
	
	// Crown Border Cover: Black layer that covers the border under legendary crowns
	if (mask === "Crown Border Cover") {
		return {
			'name': 'Legend Crown Border Cover',
			'src': '/img/black.png',
			'masks': [],
			'bounds': config.bounds.crownBorderCover || {height: 0.0177, width: 0.9214, x: 0.0394, y: 0.0277}
		};
	}

	// Crown Outline: Special case for ExtendedArt frames
	if (frameType === 'ExtendedArt') {
		if (mask === "Legend Crown Outline" || mask === "Crown Outline") {
			let frame = {
				'name': 'Legend Crown Outline',
				'src': '/img/frames/m15/crowns/m15CrownFloatingOutline.png',
				'masks': [],
				'bounds': config.bounds.crownOutline
			};
			if (maskToRightHalf) {
				frame.masks.push({'src': '/img/frames/maskRightHalf.png', 'name': 'Right Half'});
			}
			return frame;
		}
	}

	// Legendary Crown
	if (mask === "Crown") {
		let frame = {
			'name': frameName + ' Legend Crown',
			'src': config.basePath + config.pathBuilder(letter, mask, style, extraParam),
			'masks': [],
			'bounds': config.bounds.crown
		};
		if (maskToRightHalf) {
			frame.masks.push({'src': '/img/frames/maskRightHalf.png', 'name': 'Right Half'});
		}
		return frame;
	}

	// Inner Crown: The inner Nyx starfield pattern inside legendary crowns
	if (mask === "Inner Crown") {
		let frame = {
			'name': frameName + ' ' + mask + ' (' + style + ')',
			'src': config.basePath + config.pathBuilder(letter, mask, style, extraParam),
			'masks': [],
			'bounds': config.bounds.innerCrown
		};
		if (maskToRightHalf) {
			frame.masks.push({'src': '/img/frames/maskRightHalf.png', 'name': 'Right Half'});
		}
		return frame;
	}

	// Holo Stamp
	if (mask === "Stamp") {
		// Special handling for M15EighthUB multicolor stamps
		// Multicolor stamps use 'm' as base and add color pinlines separately
		let stampLetter = letter;
		
		if (frameType === 'M15EighthUB') {
			// Check if this is a multicolor stamp (letter length > 1)
			// extraParam contains the full pinline for right-half stamps
			const fullPinline = extraParam || letter;
			if (fullPinline && fullPinline.length > 1) {
				stampLetter = 'm'; // Force lowercase 'm' for multicolor base stamp
			}
		}
		
		let frame = {
			'name': frameName + ' Holo Stamp',
			'src': config.basePath + config.pathBuilder(stampLetter, mask, style, extraParam),
			'masks': [],
			'bounds': config.bounds.stamp
		};
		
		if (maskToRightHalf) {
			frame.masks.push({'src': '/img/frames/maskRightHalf.png', 'name': 'Right Half'});
		}
		return frame;
	}

	// Plain Stamp: Base holo stamp for Vault frames
	if (mask === "Plain Stamp") {
		return {
			'name': 'Plain Holo Stamp',
			'src': config.basePath + config.pathBuilder(letter, mask, style, extraParam),
			'masks': [],
			'bounds': config.bounds.plainStamp
		};
	}

	// Stamp Pinline: Color overlay mask for M15EighthUB multicolor stamps
	// This applies a color tint through a pinline mask onto the base multicolor stamp
	if (mask === "Stamp Pinline") {
		let frame = {
			'name': frameName + ' Stamp',
			'src': config.basePath + `custom/m15-eighth/ub/stamp/${letter.toLowerCase()}.png`,
			'masks': [{
				'src': config.basePath + `custom/m15-eighth/ub/stamp/pinline.png`,
				'name': 'Pinline'
			}],
			'bounds': config.bounds.stamp
		};
		if (maskToRightHalf) {
			frame.masks.push({'src': '/img/frames/maskRightHalf.png', 'name': 'Right Half'});
		}
		return frame;
	}

	// Power/Toughness Box: The P/T box for creatures
	if (mask === 'PT') {
		return {
			'name': frameName + ' Power/Toughness',
			'src': config.basePath + config.pathBuilder(letter, mask, style, extraParam),
			'masks': [],
			'bounds': config.bounds.pt
		};
	}

	// Omen Mask: Special overlay mask for Omen frame type - applies to colored base frame
	if (mask === 'Omen' || mask === 'Omen (Right Half)') {
		let maskPathResult = config.maskPath(mask);
		if (!maskPathResult) return null;
		
		return {
			'name': frameName + ' Frame',
			'src': config.basePath + config.pathBuilder(letter, false, style, extraParam),
			'masks': [{
				'src': config.basePath + maskPathResult,
				'name': mask
			}],
			'bounds': {x: 0, y: 0, width: 1, height: 1}
		};
	}

	// ----------------------------------------------------------------
	// MAIN FRAME CONSTRUCTION
	// ----------------------------------------------------------------
	// Build the main frame object (doesn't pass mask for path, only applies mask layer)
	var frame = {
		'name': frameName + ' Frame',
		'src': config.basePath + config.pathBuilder(letter, false, style, extraParam)
	};

	// Apply masks to the frame (Title, Type, Rules, Frame, Border, Pinline, etc.)
	if (mask) {
		let maskPathResult = config.maskPath(mask, extraParam);
		
		// Only add mask if maskPath returns a valid path (not null)
		// Some frame types don't have certain masks (e.g., Etched has no separate Pinline)
		if (maskPathResult) {
			frame.masks = [{
				'src': config.basePath + maskPathResult,
				'name': mask
			}];

			// Add right-half mask for multicolor cards (splits frame vertically)
			if (maskToRightHalf) {
				frame.masks.push({
					'src': '/img/frames/maskRightHalf.png',
					'name': 'Right Half'
				});
			}
		} else {
			// If mask was requested but doesn't exist, return null (don't add a frame)
			return null;
		}
	} else {
		frame.masks = [];
	}

	return frame;
}


// ============================================================================
// SECTION 4: BACKWARD COMPATIBILITY WRAPPER FUNCTIONS
// ============================================================================
// These wrapper functions maintain compatibility with existing code that calls
// frame-specific builders. They all delegate to makeFrameByLetterUnified.

/**
 * Creates an M15 frame element
 * @param {string} letter - Color letter(s)
 * @param {string|boolean} mask - Mask type or false
 * @param {boolean} maskToRightHalf - Whether to mask to right half
 * @param {string} style - Frame style ('regular', 'Nyx', 'snow')
 * @returns {Object} Frame object
 */
function makeM15FrameByLetter(letter, mask = false, maskToRightHalf = false, style = 'regular') {
	return makeFrameByLetterUnified('M15', letter, mask, maskToRightHalf, style);
}

function makeM15NewFrameByLetter(letter, mask = false, maskToRightHalf = false, style = 'regular') {
	return makeFrameByLetterUnified('M15New', letter, mask, maskToRightHalf, style);
}

function makeM15EighthFrameByLetter(letter, mask = false, maskToRightHalf = false, style = 'regular') {
	return makeFrameByLetterUnified('M15Eighth', letter, mask, maskToRightHalf, style);
}

function makeM15EighthUBFrameByLetter(letter, mask = false, maskToRightHalf = false, style = false, extraParam = false) {
	return makeFrameByLetterUnified('M15EighthUB', letter, mask, maskToRightHalf, style, extraParam);
}

function makeBorderlessFrameByLetter(letter, mask = false, maskToRightHalf = false, style, universesBeyond = false) {
	return makeFrameByLetterUnified('Borderless', letter, mask, maskToRightHalf, style, universesBeyond);
}

function make8thEditionFrameByLetter(letter, mask = false, maskToRightHalf = false, style = 'regular') {
	return makeFrameByLetterUnified('8thEdition', letter, mask, maskToRightHalf, style);
}

function makeExtendedArtFrameByLetter(letter, mask = false, maskToRightHalf = false, style = 'regular', short = false) {
	return makeFrameByLetterUnified('ExtendedArt', letter, mask, maskToRightHalf, style, short);
}

function makeUBFrameByLetter(letter, mask = false, maskToRightHalf = false, style = false) {
	return makeFrameByLetterUnified('UB', letter, mask, maskToRightHalf, style);
}

function makeCircuitFrameByLetter(letter, mask = false, maskToRightHalf = false) {
	return makeFrameByLetterUnified('Circuit', letter, mask, maskToRightHalf, 'regular');
}

function makeEtchedFrameByLetter(letter, mask = false, maskToRightHalf = false, style = 'regular') {
	return makeFrameByLetterUnified('Etched', letter, mask, maskToRightHalf, style);
}

function makePhyrexianFrameByLetter(letter, mask = false, maskToRightHalf = false) {
	return makeFrameByLetterUnified('Phyrexian', letter, mask, maskToRightHalf, 'regular');
}

function makeSeventhEditionFrameByLetter(letter, mask = false, maskToRightHalf = false) {
	return makeFrameByLetterUnified('SeventhEdition', letter, mask, maskToRightHalf, 'regular');
}

function makeJapanShowcaseFrameByLetter(letter, mask = false, maskToRightHalf = false, style = 'regular') {
	return makeFrameByLetterUnified('JapanShowcase', letter, mask, maskToRightHalf, style);
}

function makeVaultFrameByLetter(letter, mask = false, maskToRightHalf = false, style = 'regular') {
	return makeFrameByLetterUnified('Vault', letter, mask, maskToRightHalf, style);
}

function makeAdventureFrameByLetter(letter, mask = false, maskToRightHalf = false, style = 'regular') {
	return makeFrameByLetterUnified('Adventure', letter, mask, maskToRightHalf, style);
}

function makeOmenFrameByLetter(letter, mask = false, maskToRightHalf = false, style = 'regular') {
	return makeFrameByLetterUnified('Omen', letter, mask, maskToRightHalf, style);
}


// ============================================================================
// SECTION 5: AUTO FRAME ORCHESTRATION
// ============================================================================
// The main logic that orchestrates building complete frames by layering
// multiple frame elements (crowns, stamps, PT boxes, pinlines, etc.) in the
// correct order. Handles special cases for different frame types.

/**
 * Builds a complete frame by layering multiple frame elements
 * @param {string} frameType - The frame type identifier
 * @param {Array} colors - Array of color letters detected from the card
 * @param {string} mana_cost - The mana cost string
 * @param {string} type_line - The card type line
 * @param {string} power - The power/toughness string
 */
async function autoFrameUnified(frameType, colors, mana_cost, type_line, power) {
	const config = getFrameTypeConfig(frameType);
	if (!config) {
		console.error('Unknown frame type:', frameType);
		return;
	}
	
	// Preserve existing extension frames and stamps that shouldn't be rebuilt
	var frames = card.frames.filter(config.filterFrames);

	// Clear the current frame list to rebuild it
	card.frames = [];
	document.querySelector('#frame-list').innerHTML = null;

	// Get frame properties (pinline colors, PT, etc.) based on card attributes
	var properties = cardFrameProperties(colors, mana_cost, type_line, power, 
		frameType === 'Borderless' || frameType === 'BorderlessUB' ? 'Borderless' : 
		frameType === 'Etched' ? 'Etched' : 
		frameType === 'Seventh' ? 'Seventh' : undefined);
	
	// ----------------------------------------------------------------
	// VAULT SPECIAL HANDLING FOR TWO-COLOR CARDS
	// ----------------------------------------------------------------
	// Vault frames use split colors (first color base + second color right half) for 2-color cards
	if (frameType === 'Vault' && colors.length === 2) {
		// Override frame to use split colors instead of multicolor
		properties.frame = colors[0];
		properties.frameRight = colors[1];
		// Rules should also be split
		properties.rules = colors[0];
		properties.rulesRight = colors[1];
	}
	
	// ----------------------------------------------------------------
	// JAPAN SHOWCASE SPECIAL HANDLING FOR TWO-COLOR CARDS
	// ----------------------------------------------------------------
	// Japan Showcase PT boxes use the second color instead of multicolor for 2-color cards
	if (frameType === 'JapanShowcase' && colors.length === 2) {
		// Use second color for PT box
		properties.pt = colors[1];
	}
	
	// ----------------------------------------------------------------
	// STYLE DETERMINATION
	// ----------------------------------------------------------------
	// Determine which style variant to use (regular, Nyx, snow, etc.)
	var style = 'regular';
	
	// Universes Beyond and UBNew have special Nyx handling
	if (frameType === 'UB' || frameType === 'UBNew') {
		style = false;
		if (type_line.toLowerCase().includes('enchantment creature') || 
			type_line.toLowerCase().includes('enchantment artifact') || 
			(document.querySelector('#autoframe-always-nyx').checked && type_line.toLowerCase().includes('enchantment'))) {
			style = 'Nyx';
		}
	} else if (frameType !== 'Seventh' && frameType !== '8th' && frameType !== 'Borderless' && frameType !== 'BorderlessUB') {
		// Standard frames can be snow or Nyx
		if (type_line.toLowerCase().includes('snow')) {
			style = 'snow';
		} else if (type_line.toLowerCase().includes('enchantment creature') || 
				   type_line.toLowerCase().includes('enchantment artifact') || 
				   (document.querySelector('#autoframe-always-nyx').checked && type_line.toLowerCase().includes('enchantment'))) {
			style = 'Nyx';
		}
	}

	// ----------------------------------------------------------------
	// FRAME LAYER BUILDING
	// ----------------------------------------------------------------
	// Build frames in Z-order (bottom to top). Each layer is added to the frames array.
	
	// LEGENDARY CROWNS (if legendary creature/planeswalker)
	if (config.supportsCrown && type_line.toLowerCase().includes('legendary')) {
		// Add inner Nyx starfield crowns for enchantments
		if (style === 'Nyx') {
			if (properties.pinlineRight) {
				frames.push(config.makeFrameFunction(properties.pinlineRight, 'Inner Crown', true, style));
			}
			frames.push(config.makeFrameFunction(properties.pinline, 'Inner Crown', false, style));
		}

		// Add the main legendary crowns (multicolor gets split left/right)
		if (properties.pinlineRight) {
			frames.push(config.makeFrameFunction(properties.pinlineRight, 'Crown', true, style));
		}
		frames.push(config.makeFrameFunction(properties.pinline, "Crown", false, style));
		
		// Borderless and Extended Art frames need a special crown outline layer
		if (frameType === 'Borderless' || frameType === 'BorderlessUB' || frameType === 'M15BoxTopper' || frameType === 'M15ExtendedArtShort') {
			frames.push({
				'name': 'Legend Crown Outline',
				'src': '/img/frames/m15/crowns/m15CrownFloatingOutline.png',
				'masks': [],
				'bounds': {x:0.028, y:0.0172, width:0.944, height:0.1062}
			});
		}
		
		// Crown border cover hides the border under the crown (not used for Vault)
		if (frameType !== 'Vault') {
			let crownBorderCover = config.makeFrameFunction(properties.pinline, "Crown Border Cover", false, style);
			// Only Borderless uses erase blend mode to cut through layers below
			if (frameType === 'Borderless' || frameType === 'BorderlessUB') {
				crownBorderCover.erase = true;
			}
			frames.push(crownBorderCover);
		}
	}
	
	// HOLO STAMPS (security stamps at bottom center)
	if (config.supportsStamp) {
		// M15EighthUB uses special multicolor stamp handling
		// Lands and multicolor cards get colored pinlines over a base multicolor stamp
		if (frameType === 'M15EighthUB') {
			const isLand = type_line.toLowerCase().includes('land');
			const isMulticolor = properties.pinlineRight;
			
			if (isLand || isMulticolor) {
				// Add colored stamp pinlines (masks that tint the base stamp)
				if (isMulticolor) {
					// Right half of multicolor stamp (strip land indicator 'L')
					let rightColor = properties.pinlineRight.replace(/L/gi, '');
					frames.push(config.makeFrameFunction(rightColor, 'Stamp Pinline', true, style));
				}
				// Left half (or full stamp for monocolor lands) - strip land indicator
				let leftColor = properties.pinline.replace(/L/gi, '');
				frames.push(config.makeFrameFunction(leftColor, 'Stamp Pinline', false, style));
				
				// Add the base stamp (land='l', multicolor='m' calculated from pinline combo)
				let baseStampLetter = isLand ? 'l' : (properties.pinline + properties.pinlineRight);
				frames.push(config.makeFrameFunction(baseStampLetter, 'Stamp', false, style));
			} else {
				// Single color non-land: use standard colored stamp
				frames.push(config.makeFrameFunction(properties.pinline, "Stamp", false, style));
			}
		} else if (frameType === 'Vault') {
			// Vault uses plain holo stamp as base, then adds colored stamp overlay
			frames.push(config.makeFrameFunction('plain', 'Plain Stamp', false, style));
			// Add colored stamp overlays
			if (properties.pinlineRight) {
				frames.push(config.makeFrameFunction(properties.pinlineRight, 'Stamp', true, style));
			}
			frames.push(config.makeFrameFunction(properties.pinline, "Stamp", false, style));
		} else {
			// Standard stamp handling for all other frame types
			if (properties.pinlineRight) {
				frames.push(config.makeFrameFunction(properties.pinlineRight, 'Stamp', true, style));
			}
			frames.push(config.makeFrameFunction(properties.pinline, "Stamp", false, style));
		}
	}
	
	// POWER/TOUGHNESS BOX (for creatures)
	if (config.supportsPT && properties.pt) {
		frames.push(config.makeFrameFunction(properties.pt, 'PT', false, style));
	}
	
	// PINLINES (colored accent lines at top/bottom of text box)
	if (properties.pinlineRight) {
		let frame = config.makeFrameFunction(properties.pinlineRight, 'Pinline', true, style);
		if (frame) frames.push(frame);
	}
	let pinlineFrame = config.makeFrameFunction(properties.pinline, 'Pinline', false, style);
	if (pinlineFrame) frames.push(pinlineFrame);
	
	// MAIN FRAME LAYERS (Type, Title, Rules, Frame, Border)
	// Seventh Edition has a different layer order
	if (frameType === 'Seventh') {
		if (properties.rulesRight) {
			frames.push(config.makeFrameFunction(properties.rulesRight, 'Rules', true));
		}
		frames.push(config.makeFrameFunction(properties.rules, 'Rules', false));
		frames.push(config.makeFrameFunction(properties.frame, 'Frame', false));
		frames.push(config.makeFrameFunction(properties.pinline, 'Textbox Pinline', false));
		frames.push(config.makeFrameFunction(properties.frame, 'Border', false));
	} else {
		// Standard layer order for modern frames
		frames.push(config.makeFrameFunction(properties.typeTitle, 'Type', false, style));
		frames.push(config.makeFrameFunction(properties.typeTitle, 'Title', false, style));
		
		// ADVENTURE SPECIAL HANDLING - Rules (Left) for adventure side
		if (frameType === 'Adventure') {
			// Detect adventure cost colors from card.text.mana2 (adventure mana cost)
			let adventureColors = [];
			if (card.text.mana2 && card.text.mana2.text) {
				let manaText = card.text.mana2.text.toUpperCase();
				
				// For hybrid mana (contains /), only use the second color
				if (manaText.includes('/')) {
					// Extract all colors from hybrid symbols like {G/W}, then use the second one
					let colors = manaText.split('').filter(char => ['W', 'U', 'B', 'R', 'G'].includes(char));
					if (colors.length >= 2) adventureColors = [colors[1]];
					else if (colors.length === 1) adventureColors = [colors[0]]; // fallback
				} else {
					// For non-hybrid mana, extract all unique colors
					adventureColors = [...new Set(manaText.split('').filter(char => ['W', 'U', 'B', 'R', 'G'].includes(char)))];
				}
			}
			
			if (adventureColors.length === 1) {
				// Single color adventure: use Rules (Left) with that color
				let rulesLeft = config.makeFrameFunction(adventureColors[0], 'Rules (Left)', false, style);
				if (rulesLeft) frames.push(rulesLeft);
			} else if (adventureColors.length >= 2) {
				// Multicolor adventure: multicolor mask first, then base color on top
				let rulesLeftMulti = config.makeFrameFunction(adventureColors[1], 'Rules (Left, Multicolor)', false, style);
				if (rulesLeftMulti) frames.push(rulesLeftMulti);
				let rulesLeft = config.makeFrameFunction(adventureColors[0], 'Rules (Left)', false, style);
				if (rulesLeft) frames.push(rulesLeft);
			}
		}
		
		// OMEN SPECIAL HANDLING - Omen masks for omen side
		if (frameType === 'Omen') {
			// Detect omen cost colors from card.text.mana2 (omen mana cost)
			let omenColors = [];
			if (card.text.mana2 && card.text.mana2.text) {
				let manaText = card.text.mana2.text.toUpperCase();
				
				// For hybrid mana (contains /), only use the second color
				if (manaText.includes('/')) {
					// Extract all colors from hybrid symbols like {G/W}, then use the second one
					let colors = manaText.split('').filter(char => ['W', 'U', 'B', 'R', 'G'].includes(char));
					if (colors.length >= 2) omenColors = [colors[1]];
					else if (colors.length === 1) omenColors = [colors[0]]; // fallback
				} else {
					// For non-hybrid mana, extract all unique colors
					omenColors = [...new Set(manaText.split('').filter(char => ['W', 'U', 'B', 'R', 'G'].includes(char)))];
				}
			}
			
			// If no colors detected, default to artifact
			if (omenColors.length === 0) {
				omenColors = ['A'];
			}
			
			// Add Omen mask(s) based on color count
			if (omenColors.length === 1) {
				// Single color omen: use Omen mask with that color
				let omen = config.makeFrameFunction(omenColors[0], 'Omen', false, style);
				if (omen) frames.push(omen);
			} else if (omenColors.length >= 2) {
				// Multicolor omen: right half first, then base color on top
				let omenRight = config.makeFrameFunction(omenColors[1], 'Omen (Right Half)', false, style);
				if (omenRight) frames.push(omenRight);
				let omen = config.makeFrameFunction(omenColors[0], 'Omen', false, style);
				if (omen) frames.push(omen);
			}
		}
		
		if (properties.pinlineRight) {
			frames.push(config.makeFrameFunction(properties.rulesRight, 'Rules', true, style));
		}
		frames.push(config.makeFrameFunction(properties.rules, 'Rules', false, style));
		if (properties.frameRight) {
			frames.push(config.makeFrameFunction(properties.frameRight, 'Frame', true, style));
		}
		frames.push(config.makeFrameFunction(properties.frame, 'Frame', false, style));
		frames.push(config.makeFrameFunction(properties.frame, 'Border', false, style));
	}

	// ----------------------------------------------------------------
	// SPECIAL HANDLING & FINALIZATION
	// ----------------------------------------------------------------
	
	// Vehicle P/T text should be white for better visibility
	if (card.text.pt && type_line.includes('Vehicle') && !card.text.pt.text.includes('fff')) {
		card.text.pt.text = '{fontcolor#fff}' + card.text.pt.text;
	}

	// Apply the frames to the card (reverse order so they render bottom-to-top)
	card.frames = frames;
	card.frames.reverse();
	await card.frames.forEach(item => addFrame([], item));
	card.frames.reverse();
}


// ============================================================================
// SECTION 6: UI HANDLER & COLOR DETECTION
// ============================================================================
// The main entry point called from the UI. Detects colors from card properties
// (mana cost for spells, rules text for lands) and triggers frame building.

/**
 * Main auto frame function triggered by UI
 * Detects card colors and builds appropriate frame
 */
function autoFrame() {
	var frame = document.querySelector('#autoFrame').value;
	if (frame == 'false') { autoFramePack = null; return; }

	var colors = [];
	
	// ----------------------------------------------------------------
	// LAND COLOR DETECTION
	// ----------------------------------------------------------------
	// For lands, we detect colors from rules text (mana abilities, basic land types)
	if (card.text.type.text.toLowerCase().includes('land')) {
		var rules = card.text.rules.text;
		
		// Strip flavor text to avoid false positives
		var flavorIndex = rules.indexOf('{flavor}');
		if (flavorIndex == -1) {
			flavorIndex = rules.indexOf('{oldflavor}');
		}
		if (flavorIndex != -1) {
			rules = rules.substring(0, flavorIndex);
		}

		var lines = rules.split('\n');

		// Look for "Add {mana}" abilities in rules text
		lines.forEach(function(line) {
			var addIndex = line.indexOf('Add');
			var length = 3;
			if (addIndex == -1) {
				addIndex = line.toLowerCase().indexOf(' add');
				length = 4;
			}
			if (addIndex != -1) {
				var upToAdd = line.substring(addIndex+length).toLowerCase();
			  	['W', 'U', 'B', 'R', 'G'].forEach(function (color) {
					if (upToAdd.includes('{' + color.toLowerCase() + '}')) {
				  		colors.push(color);
					}
				});
			}
		});

		// Check for basic land types mentioned (Plains, Island, Swamp, Mountain, Forest)
		if (!colors.includes('W') && (rules.toLowerCase().includes('plains') || card.text.type.text.toLowerCase().includes('plains'))) {
			colors.push('W');
		}
		if (!colors.includes('U') && (rules.toLowerCase().includes('island') || card.text.type.text.toLowerCase().includes('island'))) {
			colors.push('U');
		}
		if (!colors.includes('B') && (rules.toLowerCase().includes('swamp') || card.text.type.text.toLowerCase().includes('swamp'))) {
			colors.push('B');
		}
		if (!colors.includes('R') && (rules.toLowerCase().includes('mountain') || card.text.type.text.toLowerCase().includes('mountain'))) {
			colors.push('R');
		}
		if (!colors.includes('G') && (rules.toLowerCase().includes('forest') || card.text.type.text.toLowerCase().includes('forest'))) {
			colors.push('G');
		}

		// Handle fetch lands and special cases
		if (rules.toLowerCase().includes('search') && colors.length == 0) {
			// Tutor effects that put cards in hand don't add colors
			if (rules.includes('into your hand') || (rules.includes('tapped') && !(rules.toLowerCase().includes('enters the battlefield tapped')) && !(rules.toLowerCase().includes('untap')))) {
				colors = [];
			} else if (colors.length == 0) {
				// Fetch lands that search for any type are 5-color
				colors = ['W', 'U', 'B', 'R', 'G'];
			}
		}

		// Lands that produce "any color" or similar are 5-color
		// BUT: Only if we haven't already detected specific colors from mana abilities
		// (Some lands like Bog Wreckage have "any color" as a sacrifice ability, not primary)
		if (colors.length === 0 && (rules.includes('any color') || rules.includes('any one color') || rules.includes('choose a color') || rules.includes('any combination of colors'))) {
			colors = ['W', 'U', 'B', 'R', 'G'];
		}


	} else {
		// ----------------------------------------------------------------
		// NON-LAND COLOR DETECTION
		// ----------------------------------------------------------------
		// For non-lands, extract colors from mana cost (W, U, B, R, G)
		colors = [...new Set(card.text.mana.text.toUpperCase().split('').filter(char => ['W', 'U', 'B', 'R', 'G'].includes(char)))];
	}

	// ----------------------------------------------------------------
	// FRAME BUILDING & PACK LOADING
	// ----------------------------------------------------------------
	
	// Get frame config and build the frame
	const config = getFrameTypeConfig(frame);
	if (config) {
		// Build the frame with detected colors
		autoFrameUnified(frame, colors, card.text.mana.text, card.text.type.text, card.text.pt.text);
		
		// Load the appropriate frame pack script if not already loaded
		// BorderlessUB uses the Borderless pack
		var packFrame = (frame == 'BorderlessUB') ? 'Borderless' : frame;
		
		if (autoFramePack != packFrame) {
			loadScript('/js/frames/pack' + packFrame + '.js');
			autoFramePack = packFrame;
		}
	}
}
