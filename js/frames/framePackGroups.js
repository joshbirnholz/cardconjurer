const groups = {
	accurate: [
		{name:'Regular Frames', value:'M15RegularNew'},
		{name:'Extended Art Frames', value:'M15ExtendedArtNew'},
		
		{name:'Addons', value:'disabled'},
		{name:'Legend Crowns', value:'M15LegendCrownsNew'},
		{name:'Inner Crowns', value:'M15InnerCrownsNew'},
		{name:'Dark Power/Toughness', value:'M15DarkPT'},
		{name:'"The List" Stamp', value:'TheList'},
		
		{name:'Other Frames', value:'disabled'},
		{name:'Full Art', value:'FullArtNew'},
		{name:'Snow (Kaldheim)', value:'SnowNew'},
		{name:'Nyx (Theros)', value:'M15NyxNew'},
		
		{name:'Universes Beyond Frames', value:'disabled'},
		{name:'Universes Beyond', value:'UBNew'},
		{name:'Legend Crowns (Universes Beyond)', value:'UBLegendCrownsNew'},

	],
	custom: [
		{name:'Misc. Custom Frames', value:'MiscCustom'},
		{name:'Deck Covers', value:'CustomDeckCover'},
		{name:'Simple Inventions', value:'SimpleInventions'},
		{name:'Tapped (Horizontal M15)', value:'Tapped'},
		{name:'Textless Duals', value:'CustomDualLands'},
		{name:'Textless Seventh', value:'SeventhTextless'},
		{name:'Seventh Edition Planeswalkers', value:'PlaneswalkerSeventh'},
		{name:'Seventh Edition Sagas', value:'OldSaga'},
		{name:'Seventh Edition Snow Lands', value:'SeventhSnowLands'},
		{name:'Floating Old Border', value:'OldFloating'},
		{name:'Floating Old Border (Short)', value:'OldFloatingShort'},
		{name:'Burning Revelation (SLD)', value:'BurningRevelation'},

		{name:'Modern M15 Eighth Edition Style', value:'disabled'},
		{name:'Regular', value:'M15Eighth'},
		{name:'Nyx', value:'M15EighthNyx'},
		{name:'Snow', value:'M15EighthSnow'},
		{name:'Universes Beyond', value:'M15EighthUB'},

		{name:'Modern M15 Eighth Edition Transform', value:'disabled'},
		{name:'Regular (Front)', value:'M15EighthTransformFront'},
		{name:'Regular (Back)', value:'M15EighthTransformBack'},
		{name:'Nyx (Front)', value:'M15EighthTransformNyxFront'},
		{name:'Nyx (Back)', value:'M15EighthTransformNyxBack'},
		{name:'Snow (Front)', value:'M15EighthTransformSnowFront'},
		{name:'Snow (Back)', value:'M15EighthTransformSnowBack'},
		{name:'Universes Beyond (Front)', value:'M15EighthTransformUBFront'},
		{name:'Universes Beyond (Back)', value:'M15EighthTransformUBBack'},

		{name:'Modern M15 Eighth MDFC', value:'disabled'},
		{name:'Regular (MDFC)', value:'M15EighthModal'},
		{name:'Nyx (MDFC)', value:'M15EighthModalNyx'},
		{name:'Snow (MDFC)', value:'M15EighthModalSnow'},
		{name:'Universes Beyond (MDFC) ', value:'M15EighthModalUB'},

		{name:'Modern M15 Eighth Edition Tokens', value:'disabled'},
		{name:'Regular', value:'M15EighthToken'},
		{name:'Nyx', value:'M15EighthNyxToken'},
		{name:'Snow', value:'M15EighthSnowToken'},
		{name:'Universes Beyond', value:'M15EighthUBToken'},

		{name:'Modern M15 Eighth Edition Tokens (Textless)', value:'disabled'},
		{name:'Regular (Textless)', value:'M15EighthTokenTextless'},
		{name:'Nyx (Textless)', value:'M15EighthNyxTokenTextless'},
		{name:'Snow (Textless)', value:'M15EighthSnowTokenTextless'},
		{name:'Universes Beyond (Textless)', value:'M15EighthUBTokenTextless'},

		{name:'Classicshifted Series', value:'disabled'},
		{name:'Classicshifted', value:'Classicshifted'},
		{name:'Classicshifted Nickname', value:'ClassicshiftedNickname'},
		{name:'Classicshifted Lands', value:'ClassicshiftedLands'},
		{name:'Classicshifted Planeswalkers', value:'ClassicshiftedPlaneswalker'},
		{name:'Classicshifted Planeswalker Transform Addons', value:'ClassicshiftedPlaneswalkerTransform'},
		{name:'Classicshifted Sagas', value:'ClassicshiftedSaga'},
		{name:'Classicshifted MDFC Addons', value:'ClassicshiftedDFC'},
		{name:'Classicshifted Transform Addons', value:'ClassicshiftedTransform'},
		{name:'Color Identity Pips', value:'ClassicshiftedCIPips'},

		{name:'StoneCutter Series by Smaug', value:'disabled'},
		{name:'StoneCutter', value:'StoneCutterDeluxe'},
		{name:'StoneCutter Nickname Addons', value:'StoneCutterDeluxeNicknameAddons'},
		{name:'StoneCutter Extended Art', value:'StoneCutterDeluxeExtended'},
		{name:'StoneCutter Planeswalker', value:'StoneCutterDeluxePlaneswalker'},
		{name:'StoneCutter Planeswalker Extended Art', value:'StoneCutterDeluxePlaneswalkerExtended'},
		{name:'StoneCutter Planeswalker Transform Addons', value:'StoneCutterDeluxePlaneswalkerTransformAddons'},
		{name:'StoneCutter Saga', value:'StoneCutterDeluxeSaga'},
		{name:'StoneCutter Class(y)', value:'StoneCutterDeluxeClass'},
		{name:'StoneCutter Case', value:'StoneCutterDeluxeCase'},
		{name:'StoneCutter MDFC Addons', value:'StoneCutterDeluxeDFC'},
		{name:'StoneCutter Transform Addons', value:'StoneCutterDeluxeTransformAddons'},
	
		{name:'Showcase Frame Varients', value:'disabled'},
		{name:'Short Neon (NEO)', value:'NEONeonShort'},
		{name:'Colored Golden Age (SNC)', value:'SNCGildedColored'},
		{name:'Textless Golden Age (SNC)', value:'SNCGildedTextless'},
		{name:'Textless Equinox (MID)', value:'EquinoxTextless'},
		{name:'Horizontal Japanese Mystical Archive (STA)', value:'MysticalArchiveJPHorizontal'},
		{name:'Extended Art Invocations', value:'AKHInvocationExtended'},
		{name:'Textless Inventions', value:'TextlessInvention'},

		{name:'Custom Addons', value:'disabled'},
		{name:'Brawl Legend Crowns', value:'Brawl'},

		{name:'Custom Community Frames', value:'disabled'},
		{name:'Cartoony - Sheepwave', value:'Cartoony'},
		{name:'Neon - Elry', value:'CustomNeon'},
		{name:'Ixalan - @feuer_ameise', value:'FeuerAmeiseIxalan'},
		{name:'Kaldheim, Fullart - @feuer_ameise', value:'FeuerAmeiseKaldheim'},
		{name:'Celid\'s Asap', value:'CustomCelidAsap'},
		{name:'Magrao\'s Kaldheim', value:'CustomMagraoKaldheim'},
		{name:'Pokemon', value:'Pokemon'},
		{name:'Circuit', value:'Circuit'}
	],
	dfc: [
		{name:'Front', value:'disabled'},
		{name:'Regular (Front)', value:'M15TransformFront'},
		{name:'Nyx (Front)', value:'M15TransformNyxFront'},
		{name:'Snow (Front)', value:'M15TransformSnowFront'},
		{name:'Universes Beyond (Front)', value:'M15TransformUBFront'},
		{name:'Borderless (Front)', value:'TransformBorderlessFront'},
		{name:'Extended Art (Front)', value:'TransformExtendedFront'},
		{name:'Sagas (Front)', value:'SagaDFC'},
		{name:'Saga Creatures (Front)', value: 'SagaCreatureFront'},
		{name:'Saga Creatures (Back)', value: 'SagaCreatureBack'},
		{name:'Saga Creatures (Universes Beyond) (Front)', value: 'SagaCreatureUBFront'},
		{name:'Saga Creatures (Universes Beyond) (Back)', value: 'SagaCreatureUBBack'},	
	
		{name:'Back', value:'disabled'},
		{name:'Regular (Back)', value:'M15TransformBackNew'},
		{name:'Nyx (Back)', value:'M15TransformNyxBackNew'},
		{name:'Snow (Back)', value:'M15TransformSnowBackNew'},
		{name:'Universes Beyond (Back)', value:'M15TransformUBBackNew'},
		{name:'Borderless (Back)', value:'TransformBorderlessBack'},
		{name:'Extended Art (Back)', value:'TransformExtendedBack'},
		
		
		{name:'Common Parts', value:'disabled'},
		
		{name:'Color Identity Pips', value:'M15CIPips'},
		{name:'Transform Icons', value:'M15TransformTypes'},	
		
		{name:'Other frames', value:'disabled'},
		{name:'Regular (Back, top-left icon)', value:'M15TransformBack'},
		{name:'Nyx (Back, top-left icon)', value:'M15TransformNyxBack'},
		{name:'Snow (Back, top-left icon)', value:'M15TransformSnowBack'},
		{name:'Universes Beyond (Back, top-left icon)', value:'M15TransformUBBack'},
		{name:'SDCC15 (Blackout)', value:'TransformSDCC15'},
	
		{name:'Addons', value:'disabled'},
		{name:'Legend Crowns', value:'TransformLegendCrowns'},
		{name:'Floating Legend Crowns', value:'TransformLegendCrownsFloating'},
		{name:'Nickname Legend Crowns', value:'TransformLegendCrownsNickname'},
		{name:'Legend Crowns (Universes Beyond)', value:'TransformLegendCrownsUB'},
		{name:'Inner Crowns', value:'M15InnerCrowns'},
		{name:'Holo Stamps', value:'M15HoloStamps'},
		{name:'Dark Power/Toughness', value:'M15DarkPT'},
		{name:'"The List" Stamp', value:'TheList'},
	
		{name:'Custom Addons', value:'disabled'},
		{name:'Brawl Crowns', value:'TransformLegendCrownsBrawl'}
	],
	fleshAndBlood: [
		{name:'Generic Frames', value:'FABRegular'},
		{name:'Class Frames', value:'FABClasses'},
		{name:'Hero Frames', value:'FABHeroes'},
		{name:'Fabled Frame', value:'FABFabled'},
		{name:'Talents', value:'disabled'},
		{name:'Light Frames', value:'FABLight'},
		{name:'Shadow Frames', value:'FABShadow'},
		{name:'Elemental Frames', value:'FABElemental'}
	],
	margin: [
		{name:'Generic Margins', value:'Margin-1'},
		{name:'Borderless Stellar Sights', value:'MarginBorderlessStellarSights'},
		{name:'Draconic Margins', value:'MarginDraconic'},	
		{name:'Japan Showcase Margins', value:'MarginJapanShowcase'},
		{name:'Legends of Ixalan Margins', value:'MarginIxalanLegends'},
		{name:'Memory Corridor Margins', value:'MarginMemoryCorridor'},
		{name:'Breaking News Margin', value:'MarginBreakingNews'},
		{name:'Vault Margins', value:'MarginVault'},
		{name:'Wanted Poster Margins', value:'MarginWanted'},
		{name:'Enchanting Tales Margins', value:'MarginEnchantingTales'},
		{name:'LTR Ring Margins', value:'MarginRing'},
		{name:'D&D Module Margins', value:'MarginDNDModule'},
		{name:'Mystical Archive Margins', value:'MarginMysticalArchive'},
		{name:'Unfinity Basics Margins', value:'MarginUnfinity'},
		{name:'Unstable Basics Margins', value:'MarginUnstable'},
		{name:'Invocation Margins', value:'MarginInvocation'},
		{name:'Accurate Frame Margins', value:'MarginNew'},
		{name:'Custom Margins', value:'disabled'},
		{name:'Celid\'s Asap Margins', value:'CustomMarginCelidAsap'}
	],
	misc: [
		{name:'Old', value:'disabled'},
		{name:'Future Shifted', value:'FutureRegular'},
		{name:'Colorshifted', value:'8thColorshifted'},
		{name:'8th Edition', value:'8th'},
		{name:'Seventh Edition', value:'Seventh'},
		{name:'Fifth Edition', value:'SeventhButFifth'},
		{name:'Fourth Edition', value:'Fourth'},
		{name:'Legends Multicolored', value:'Legends'},
		{name:'Alpha/Beta/Unlimited', value:'ABU'},
		{name:'Misc', value:'disabled'},
		{name:'8th Edition Playtest Cards', value:'8thPlaytest'},
		{name:'Playtest Cards', value:'Playtest'},
		{name:'Dungeon (AFR)', value:'Dungeon'},
		{name:'Planechase', value:'Planechase'},
		{name:'Vanguard', value:'Vanguard'},
		{name:'Cardback', value:'Cardback'}
	],
	modal: [
		{name:'Regular', value:'ModalRegular'},
		{name:'Nyx', value:'ModalNyx'},
		{name:'Snow', value:'ModalSnow'},
		{name:'Universes Beyond', value:'ModalUB'},
		{name:'Borderless', value:'ModalBorderless'},
		{name:'Extended Art', value:'ModalExtended'},
		{name:'Nickname', value:'ModalNickname'},
		{name:'Short', value:'ModalShort'},
		{name:'Short-Nickname', value:'ModalShortNickname'},
		{name:'Addons', value:'disabled'},
		{name:'Regular Legend Crowns', value:'ModalLegendCrowns'},
		{name:'Floating Legend Crowns', value:'ModalLegendCrownsFloating'},
		{name:'Nickname Legend Crowns', value:'ModalLegendCrownsNickname'},
		{name:'Universes Beyond Legend Crowns', value:'ModalLegendCrownsUB'},
		{name:'Brawl Legend Crowns', value:'ModalLegendCrownsBrawl'},
		{name:'Inner Crowns', value:'M15InnerCrowns'},
		{name:'Holo Stamps', value:'M15HoloStamps'},
		{name:'Dark Power/Toughness', value:'M15DarkPT'},
		{name:'Colored Borders', value:'M15Borders'},
		{name:'Color Identity Pips', value:'M15CIPips'},
		{name:'"The List" Stamp', value:'TheList'},
		{name:'Misc', value:'disabled'},
		{name:'Helper Cards', value:'ModalHelper'}
	],
	planeswalker: [
		{name:'Regular', value:'PlaneswalkerRegular'},
		{name:'Borderless', value:'PlaneswalkerBorderless'},
		{name:'Extended Art', value:'PlaneswalkerBoxTopper'},
		{name:'Tall', value:'PlaneswalkerTall'},
		{name:'Tall Borderless', value:'PlaneswalkerTallBorderless'},
		{name:'Compleated', value:'PlaneswalkerCompleated'},
		{name:'Innistrad: Double Feature', value:'PlaneswalkerDBL'},
		{name:'Innistrad: Double Feature (Tall)', value:'PlaneswalkerTallDBL'},
		{name:'Addons', value:'disabled'},
		{name:'Holo Stamps', value:'PlaneswalkerHoloStamps'},
		{name:'Special Frames', value:'disabled'},
		{name:'Nickname', value:'PlaneswalkerNickname'},
		{name:'Blackout (SDCC15)', value:'PlaneswalkerSDCC15'},
		{name:'DFC Frames', value:'disabled'},
		{name:'MDFC', value:'PlaneswalkerMDFC'},
		{name:'Transform (Front)', value:'PlaneswalkerTransformFront'},
		{name:'Transform (Back)', value:'PlaneswalkerTransformBack'},
		{name:'Innistrad: Double Feature: Transform (Front)', value:'PlaneswalkerTransformFrontDBL'},
		{name:'Innistrad: Double Feature: Transform (Back)', value:'PlaneswalkerTransformBackDBL'},
		{name:'Color Identity Pips', value:'M15CIPips'},
		{name:'Transform Icons', value:'PlaneswalkerTransformIcons'}
	],
	promo: [
		{name:'Regular Frames', value:'PromoOpenHouse'},
		{name:'Borderless Frames', value:'PromoRegular-1'},
		{name:'Borderless Frames (Extra Short)', value:'IkoShort'},
		{name:'Nyx Frames', value:'PromoNyx'},
		{name:'Extended Art Frames', value:'PromoExtended'},
		{name:'Nickname Frames', value:'PromoNickname'},
		{name:'Generic Showcase', value:'PromoGenericShowcase'},
		{name:'Addons', value:'disabled'},
		{name:'Legend Crowns', value:'M15LegendCrowns'},
		{name:'Floating Legend Crowns', value:'M15LegendCrownsFloating'},
		{name:'Inner Crowns', value:'M15InnerCrowns'},
		{name:'Holo Stamps', value:'M15HoloStamps'},
		{name:'Dark Power/Toughness', value:'M15DarkPT'},
		{name:'Colored Borders', value:'M15Borders'},
		{name:'"The List" Stamp', value:'TheList'},
		{name:'Custom Addons', value:'disabled'},
		{name:'Brawl Legend Crowns', value:'Brawl'}
	],
	saga: [
		{name:'Nyx Frames', value:'SagaNyx'},
		{name:'Regular Frames', value:'SagaRegular'},
		{name:'Universes Beyond Frames', value:'SagaUB'},

		{name:'Saga Creatures (Summons)', value: 'disabled'},
		{name:'Saga Creature Frames', value: 'SagaCreature'},
		{name:'Universes Beyond Saga Creature Frames', value: 'SagaCreatureUB'},
	
		{name:'Showcase Frames', value:'disabled'},
		{name:'Scrolls of Middle-earth (LTR)', value:'SagaLTR'},

		{name:'Addons', value:'disabled'},
		{name:'Legend Crowns', value:'M15LegendCrowns'},
		{name:'Legend Crowns (Universes Beyond)', value:'UBLegendCrowns'},
		{name:'Inner Crowns', value:'M15InnerCrowns'},
		{name:'Holo Stamps', value:'M15HoloStamps'},
		{name:'Colored Borders', value:'M15Borders'},
		{name:'"The List" Stamp', value:'TheList'},
		{name:'Custom Addons', value:'disabled'},
		{name:'Brawl Legend Crowns', value:'Brawl'}
	],
	showcase: [
		{name:'Set Showcase Frames (Chronological)', value:'disabled'},
		{name:'Borderless Stellar Sights (EOS)', value:'BorderlessStellarSights'},
		{name:'Draconic (TDM)', value:'Draconic'},
		{name:'Ghostfire (TDM)', value:'Ghostfire'},
		{name:'Japan Showcase', value:'JapanShowcase'},
		{name:'Paranormal (DSK)', value:'Paranormal'},
		{name:'Bloomburrow Borderless (BLB)', value:'BloomburrowBorderless'},
		{name:'Woodland (BLB)', value:'Woodland'},
		{name:'Memory Corridor (ACR)', value:'MemoryCorridor'},
		{name:'Breaking News (OTP)', value:'BreakingNews'},
		{name:'Vault (BIG)', value:'Vault'},
		{name:'Wanted Poster (OTJ)', value:'Wanted'},
		{name:'Pip-Boy (PIP)', value:'Pipboy'},
		{name:'Dossier (MKM)', value:'Dossier'},
		{name:'Legends of Ixalan - Pattern 1 (LCI)', value:'IxalanLegends1'},
		{name:'Legends of Ixalan - Pattern 2 (LCI)', value:'IxalanLegends2'},
		{name:'Legends of Ixalan - Pattern 3 (LCI)', value:'IxalanLegends3'},
		{name:'Scrolls of Middle-earth (LTR)', value:'Scroll'},
		{name:'Enchanting Tales (WOT)', value:'EnchantingTales'},
		{name:'Eldraine Storybooks: Adventures (WOE)', value:'StorybookWOE'},
		{name:'TARDIS (WHO)', value:'TARDIS'},
		{name:'Ring (LTR)', value:'Ring'},
		{name:'Eldraine Storybooks (MOM)', value:'StorybookMUL'},
		{name:'Ixalan Coin (MOM)', value:'IxalanCoin'},
		{name:'Tarkir Sketch (MOM)', value:'Tarkir'},
		{name:'Ikoria Crystal (MOM)', value:'Crystal'},
		{name:'Ravnica City (MOM)', value:'Ravnica'},
		{name:'Oil Slick (ONE)', value:'OilSlick'},
		{name:'Shattered Glass (BOT)', value:'ShatteredGlass'},
		{name:'Stained Glass (DMU)', value:'DMUStainedGlass'},
		{name:'Golden Age (SNC)', value:'SNCGilded'},
		{name:'Art Deco (SNC)', value:'SNCArtDeco'},
		{name:'Skyscraper (SNC)', value:'SNCSkyscraper'},
		{name:'Ninja (NEO)', value:'NeoNinja'},
		{name:'Samurai (NEO)', value:'NeoSamurai'},
		{name:'Neon (NEO)', value:'NeoNeon'},
		{name:'Double Feature (DBL)', value:'DoubleFeature'},
		{name:'Double Feature: Transform (DBL)', value:'DoubleFeatureTransform'},
		{name:'Fang (VOW)', value:'Fang'},
		{name:'Equinox: Single-faced (MID)', value:'Equinox'},
		{name:'Equinox: Transform Front (MID)', value:'EquinoxFront'},
		{name:'Equinox: Transform Back (MID)', value:'EquinoxBack'},
		{name:'Eternal Night (MID)', value:'EternalNight'},
		{name:'D&D Sourcebook (AFR)', value:'DNDSourcebook'},
		{name:'D&D Module (AFR)', value:'DNDModule'},
		{name:'Sketch Cards (MH2)', value:'MH2'},
		{name:'Mystical Archive (STA)', value:'MysticalArchive'},
		{name:'Japanese Mystical Archive (STA)', value:'MysticalArchiveJP'},
		{name:'Horizontal Japanese Mystical Archive (STA)', value:'MysticalArchiveJPHorizontal'},
		{name:'Kaldheim (KHM)', value:'Kaldheim-2'},
		{name:'Nonlegendary Kaldheim (KHM)', value:'KaldheimNonleg'},
		{name:'Commander Legends (CMR)', value:'CommanderLegends'},
		{name:'Zendikar Rising (ZNR)', value:'ZendikarRising'},
		{name:'M21 Signature Spellbooks (M21)', value:'M21'},
		{name:'Theros Beyond Death (THB)', value:'M15NyxShowcase'},
		{name:'Eldraine Storybooks: Adventures (ELD)', value:'Storybook'},
	
		{name:'Generic Showcase Frames', value:'disabled'},
		{name:'Borderless', value:'GenericShowcase'},
		{name:'Borderless (Alt)', value:'Borderless'},
		{name:'Fullart', value:'M15ClearTextboxes'},
		{name:'Nickname ("Godzilla")', value:'M15Nickname'},
		{name:'Extended Art (Regular)', value:'M15BoxTopper'},
		{name:'Extended Art (Shorter Textbox)', value:'M15ExtendedArtShort'},
		{name:'FNM Promo (Inverted Promos)', value:'FNM'},
		{name:'Full Text', value:'FullText'},
		{name:'Full Text (Alt)', value:'FullTextAlt'},
		{name:'Foil-Etched', value:'disabled'},
		{name:'Etched', value:'Etched'},
		{name:'Etched (Nyx)', value:'EtchedNyx'},
		{name:'Etched (Snow)', value:'EtchedSnow'},
		{name:'Legend Crowns (Etched)', value:'LegendCrownsEtched'},
		{name:'Inner Crowns (Etched)', value:'InnerCrownsEtched'},
		
		{name:'Universes Beyond', value:'disabled'},
		{name:'Universes Beyond', value:'UB'},
		{name:'Universes Beyond (Full art)', value:'UBFull'},
		{name:'Universes Beyond (Extended art)', value:'UBExtendedArt'},
		{name:'Legend Crowns (Universes Beyond)', value:'UBLegendCrowns'},
		{name:'Floating Legend Crowns (Universes Beyond)', value:'UBLegendCrownsFloating'},
		
		{name:'Masterpieces/Other', value:'disabled'},
		{name:'Phyrexian', value:'Praetors'},
		{name:'ZNR Expeditions (2020)', value:'ExpeditionZNR-1'},
		{name:'Signature Spellbook (Jace/Gideon)', value:'SignatureSpellbook'},
		{name:'Ixalan Maps', value:'Ixalan'},
		{name:'Amonkhet Invocations (u/Smyris)', value:'Invocation'},
		{name:'Amonkhet Invocations (Multiverse Legends)', value:'InvocationMUL'},
		{name:'Kaladesh Inventions', value:'Invention'},
		{name:'BFZ Expeditions (2015)', value:'ExpeditionBFZ-1'},
		{name:'SDCC15 (Blackout)', value:'SDCC15'},
		{name:'Future Shifted', value:'FutureRegular'},
	
		{name:'Addons', value:'disabled'},
		{name:'Legend Crowns', value:'M15LegendCrowns'},
		{name:'Legend Crowns (Universes Beyond)', value:'UBLegendCrowns'},
		{name:'Floating Legend Crowns', value:'M15LegendCrownsFloating'},
		{name:'Floating Legend Crowns (Universes Beyond)', value:'UBLegendCrownsFloating'},
		{name:'Inner Crowns', value:'M15InnerCrowns'},
		{name:'Nicknames', value:'M15Nickname-2'},
		{name:'Japan Showcase Nicknames', value:'JapanShowcaseNicknames'},
		{name:'Holo Stamps', value:'M15HoloStamps'},
		{name:'Dark Power/Toughness', value:'M15DarkPT'},
		{name:'Colored Borders', value:'M15Borders'},
		{name:'Color Identity Pips', value:'M15CIPips'},
		{name:'"The List" Stamp', value:'TheList'},
	
		{name:'Custom Addons', value:'disabled'},
		{name:'Brawl Legend Crowns', value:'Brawl'}
	],
	standard: [
		{name:'Regular Frames', value:'M15Regular-1'},
		{name:'Enchantment Frames (Nyx)', value:'M15Nyx'},
		{name:'Addons', value:'disabled'},
		{name:'Legend Crowns', value:'M15LegendCrowns'},
		{name:'Floating Legend Crowns', value:'M15LegendCrownsFloating'},
		{name:'Inner Crowns', value:'M15InnerCrowns'},
		{name:'Nicknames', value:'M15Nickname-2'},
		{name:'Miracle', value:'M15Miracle'},
		{name:'Holo Stamps', value:'M15HoloStamps'},
		{name:'Dark Power/Toughness', value:'M15DarkPT'},
		{name:'Colored Borders', value:'M15Borders'},
		{name:'Color Identity Pips', value:'M15CIPips'},
		{name:'"The List" Stamp', value:'TheList'},
		{name:'Other Frames', value:'disabled'},
		{name:'Lands', value:'M15Lands'},
		{name:'Omens (Tarkir Dragonstorm)', value:'Omen'},
		{name:'Rooms (Duskmourn)', value:'Room'},
		{name:'Spree (Outlaws of Thunder Junction)', value:'Spree'},
		{name:'Cases (Murders at Karlov Manor)', value:'Case'},
		{name:'Battle (March of the Machine)', value:'Battle'},
		{name:'Prototype (Brothers\' War)', value:'Prototype'},
		{name:'Prototype (Extended Art) (Brothers\' War)', value:'PrototypeExtended'},
		{name:'Attractions (Unfinity)', value:'Attraction'},
		{name:'Class (D&D)', value:'Class'},
		{name:'Snow (Kaldheim)', value:'M15Snow'},
		{name:'Mutate (Ikoria)', value:'M15Mutate'},
		{name:'Adventures (Eldraine)', value:'Adventure'},
		{name:'Devoid (Zendikar)', value:'M15Devoid'},
		{name:'Aftermath (Amonkhet)', value:'Aftermath'},
		{name:'Flip (Kamigawa)', value:'Flip'},
		{name:'Levelers (Zendikar)', value:'Levelers'},
		{name:'Split Cards', value:'Split'},
		{name:'Fuse Cards', value:'Fuse'},
		{name:'Conspiracies (Draft Matters)', value:'Conspiracy'},
		{name:'Colorshifted (Planar Chaos)', value:'Colorshifted'},
		{name:'Custom Addons', value:'disabled'},
		{name:'Brawl Legend Crowns', value:'Brawl'}
	],
	textless: [
		{name:'Basic Lands', value:'disabled'},
		{name:'Kamigawa Basics (NEO)', value:'NeoBasics'},
		{name:'Fullart Basics (2022)', value:'TextlessBasics2022'},
		{name:'Fullart Basics (Universes Beyond)', value:'TextlessBasics2022UB'},
		{name:'Fullart Basics (SNC)', value:'TextlessBasicsSNC'},
		{name:'Fullart Basics (THB)', value:'TextlessBasics'},
		{name:'Fullart Basics (ZEN)', value:'ZendikarBasic-1'},
		{name:'Fullart Snow Basics', value:'FullartBasicRoundBottom'},
		{name:'Unfinity Basics (UNF)', value:'Unfinity'},
		{name:'Unstable Basics (UST)', value:'Unstable'},
		{name:'Unhinged Basics (UNH)', value:'Unhinged'},
		{name:'Other', value:'disabled'},
		{name:'Generic Showcase', value:'TextlessGenericShowcase'},
		{name:'Magic Fest Promos', value:'MagicFest'},
		{name:'Addons', value:'disabled'},
		{name:'Legend Crowns', value:'M15LegendCrowns'},
		{name:'Floating Legend Crowns', value:'M15LegendCrownsFloating'},
		{name:'Inner Crowns', value:'M15InnerCrowns'},
		{name:'Holo Stamps', value:'M15HoloStamps'},
		{name:'Dark Power/Toughness', value:'M15DarkPT'},
		{name:'Colored Borders', value:'M15Borders'},
		{name:'"The List" Stamp', value:'TheList'},
		{name:'Custom Addons', value:'disabled'},
		{name:'Brawl Legend Crowns', value:'Brawl'}
	],
	token: [
		{name:'Regular', value:'TokenRegular-1'},
		{name:'Textless', value:'TokenTextless-1'},
		{name:'Textless (Borderless)', value:'TokenTextlessBorderless'},
		{name:'Tall', value:'TokenTall-1'},
		{name:'Short', value:'TokenShort-1'},
		{name:'Monarch Token', value:'TokenMonarch'},
		{name:'Marker Card', value:'TokenMarker'},
		{name:'Initiative Token', value:'TokenInitiative'},
		{name:'Day/Night Marker', value:'TokenDayNight'},
		{name:'Planeswalker Emblems', value:'Emblem'},
		{name:'Jumpstart Front Cards', value:'JMPFront'},
		{name:'Jumpstart 2022 Front Cards', value:'J22Front'},
		{name:'Older Tokens', value:'disabled'},
		{name:'Regular (Bordered M15)', value:'TokenRegularM15'},
		{name:'Textless (Bordered M15)', value:'TokenTextlessM15'},
		{name:'Original (Old Bordered)', value:'TokenOld'},
		{name:'Unglued', value:'TokenUnglued'},
		{name:'Addons', value:'disabled'},
		{name:'Floating Legend Crowns', value:'M15LegendCrownsFloating'},
		{name:'Inner Crowns', value:'M15InnerCrowns'},
		{name:'Holo Stamps', value:'M15HoloStamps'},
		{name:'Dark Power/Toughness', value:'M15DarkPT'},
		{name:'Colored Borders', value:'M15Borders'},
		{name:'"The List" Stamp', value:'TheList'},
		{name:'Custom Addons', value:'disabled'},
		{name:'Brawl Legend Crowns', value:'Brawl'}
	],
	universesBeyond: [	
		{name:'Universes Beyond', value:'disabled'},
		{name:'Universes Beyond', value:'UB'},
		{name:'Universes Beyond (Full art)', value:'UBFull'},
		{name:'Universes Beyond (Extended art)', value:'UBExtendedArt'},
	
		{name:'Transform (Universes Beyond) (Front)', value: 'M15TransformUBFront'},
		{name:'Transform (Universes Beyond) (Back)', value: 'M15TransformUBBackNew'},
	
		{name:'Modal DFCs (Universes Beyond)', value:'ModalUB'},
	
		{name:'Rooms (Universes Beyond)', value:'RoomUB'},
		{name:'Sagas (Universes Beyond)', value:'SagaUB'},
		{name:'Spree (Universes Beyond)', value:'SpreeUB'},
	
		{name:'Addons', value:'disabled'},
		{name:'Legend Crowns (Universes Beyond)', value:'UBLegendCrowns'},
		{name:'Legend Crowns (Transform) (Universes Beyond)', value:'TransformLegendCrownsUB'},
		{name:'Legend Crowns (MDFC) (Universes Beyond)', value:'ModalLegendCrownsUB'},
		{name:'Floating Legend Crowns (Universes Beyond)', value:'UBLegendCrownsFloating'},
		{name:'Inner Crowns', value:'M15InnerCrowns'},
		{name:'Nicknames', value:'M15Nickname-2'},
		{name:'Holo Stamps', value:'M15HoloStamps'},
		{name:'Dark Power/Toughness', value:'M15DarkPT'},
		{name:'Colored Borders', value:'M15Borders'},
		{name:'Color Identity Pips', value:'M15CIPips'},
		{name:'"The List" Stamp', value:'TheList'},
	
		{name:'Custom Addons', value:'disabled'},
		{name:'Brawl Legend Crowns', value:'Brawl'}
	],
}

const postLoadFunctions = {
	planeswalker: () => {
		notify('When you load a Planeswalker frame version, a "Planeswalker" tab will appear. This tab controls the placement and loyalty costs for Planeswalker abilities.', 10)
	},
	saga1: () => {
		notify('When you load the Saga frame version, a "Saga" tab will appear. This tab controls the placement and chapter counts for Saga chapters.')
	}
}

var frameNames = new Map(
  Object.values(groups)
    .flat()
    .filter((item) => item.value !== "disabled")
    .map((item) => [item.name, item.value])
);

function loadFramePacks(groupName) {
	const framePackOptions = groups[groupName];
	// clear old frame pack list
	document.querySelector('#selectFramePack').innerHTML = null;
	// add new frame pack options
	framePackOptions.forEach(item => {
		const framePackOption = document.createElement('option');
		framePackOption.textContent = item.name;
		if (item.value === 'disabled') {
			framePackOption.disabled = true;
		} else {
			framePackOption.value = item.value;
		}
		// add new frame pack option to the list
		document.querySelector('#selectFramePack').appendChild(framePackOption);
	});
	const postLoadFunction = postLoadFunctions[groupName];
	if (postLoadFunction) {
		postLoadFunction();
	}
	// load the first frame pack
	loadScript("/js/frames/pack" + document.querySelector('#selectFramePack').value + ".js");
}

//For multiple Margin packs
var loadMarginVersion = async () => {
	//resets things so that every frame doesn't have to
	await resetCardIrregularities({canvas:[getStandardWidth(), getStandardHeight(), 0.044, 1/35], resetOthers:false});
	//sets card version
	// card.version = 'margin';
	card.margins = true;
	//art stuff
	var changedArtBounds = false;
	if (card.artBounds.width == 1) {
		card.artBounds.width += 0.044;
		changedArtBounds = true;
	}
	if (card.artBounds.x == 0) {
		card.artBounds.x = -0.044;
		card.artBounds.width += 0.044;
		changedArtBounds = true;
	}
	if (card.artBounds.height == 1) {
		card.artBounds.height += 1/35;
		changedArtBounds = true;
	}
	if (card.artBounds.y == 0) {
		card.artBounds.y = -1/35;
		card.artBounds.height += 1/35;
		changedArtBounds = true;
	}
	if (changedArtBounds) {
		autoFitArt();
	}
	//runs anything that needs to run
	if (card.version.includes('planeswalker')) {
		planeswalkerEdited();
	}
	if (card.version.includes('saga')) {
		sagaEdited();
	}
	if (card.version.includes('class') && !card.version.includes('classic')) {
		classEdited();
	}
	drawTextBuffer();
	drawFrames();
	bottomInfoEdited();
	watermarkEdited();
	drawNewGuidelines();
}

//For multiple Flesh and Blood packs
var LoadFABVersion = async () => {
	// notification
	notify('To use Flesh and Blood icons in card text, use {w}, {u}, {b}, {r}, or {g}. This may change in the future.', 15);
	//resets things so that every frame doesn't have to
	await resetCardIrregularities();
	//sets card version
	card.version = 'FABRegular';
	loadScript('/js/frames/manaSymbolsFAB.js');
	//art bounds
	card.artBounds = {x:0.0867, y:0.1258, width:0.8267, height:0.4796};
	autoFitArt();
	//set symbol bounds
	card.setSymbolBounds = {x:-1, y:-1, width:0.12, height:0.0410, vertical:'center', horizontal: 'right'};
	resetSetSymbol();
	//watermark bounds
	card.watermarkBounds = {x:0.5, y:0.7762, width:0.75, height:0.2305};
	resetWatermark();
	//text
	loadTextOptions({
		title: {name:'Title', text:'', x:0.19, y:0.0705, width:0.62, height:0.0405, oneLine:true, font:'amanda', size:0.0405, align:'center', manaPrefix:'fab'},
		type: {name:'Type', text:'', x:0.24, y:0.8977, width:0.52, height:0.0281, oneLine:true, font:'amanda', size:0.0281, align:'center', manaPrefix:'fab'},
		rules: {name:'Rules Text', text:'', x:0.12, y:0.6153, width:0.76, height:0.28, size:0.0281, font:'palatino', manaPrefix:'fab', lineSpacing:0.2},
		cost: {name:'Cost', text:'', x:0.854, y:0.0753, width:0.0534, height:0.031, size:0.031, font:'palatino', oneLine:true, align:'center', manaPrefix:'fab'},
		left: {name:'Left Stat', text:'', x:0.162, y:0.9124, width:0.0534, height:0.0358, size:0.0358, font:'palatino', oneLine:true, align:'center', manaPrefix:'fab'},
		right: {name:'Right Stat', text:'', x:0.7847, y:0.9124, width:0.0534, height:0.0358, size:0.0358, font:'palatino', oneLine:true, align:'center', manaPrefix:'fab'}
	});
	//bottom info
	await loadBottomInfo({
		regular: {text:'{kerning-2}{elemidinfo-rarity} {elemidinfo-set}{elemidinfo-number} {elemidinfo-artist} \u00a9 {elemidinfo-year} Legend Story Studios', x:0.25, y:1987/2100, width:0.5, height:0.0143, oneLine:true, font:'gothammedium', size:0.0143, color:'white', align:'center'},
		extra: {text:'UNOFFICIAL - NOT FOR SALE   CardConjurer.com', y:2020/2100, height:0.0134, oneLine:true, font:'gothammedium', size:0.0134, color:'white', align:'center'},
	});
}
