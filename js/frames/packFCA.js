//Create objects for common properties across available frames
var bounds = {x:0, y:0, width:1, height:1};
var boundsStamp = {x:0.4365, y:0.902, width:0.1264, height:0.0452};
//defines available frames

availableFrames = [
	{name:'Border', src:'/img/frames/fca/border.png', bounds:bounds},
	{name:'Triangle Holo Stamp', src:'/img/frames/fca/stamp/stampTriangle.png', bounds:bounds},
	{name:'Grey Triangle Stamp', src:'/img/frames/fca/stamp/greyTriangle.png', bounds:bounds},
	{name: 'Round Holo Stamp', src:'/img/frames/fca/stamp/stampRound.png', bounds:boundsStamp},
	{name: 'Grey Round Stamp', src:'/img/frames/fca/stamp/greyRound.png', bounds:boundsStamp}

];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = async function() {
	//resets things so that every frame doesn't have to
	await resetCardIrregularities();
	//sets card version
	card.version = 'fca';
	//art bounds
	card.artBounds = {x:0, y:0, width:1.005, height:0.9324};
	autoFitArt();
	//set symbol bounds
	card.setSymbolBounds = {x:0.91, y:0.635, width:0.12, height:0.0410, vertical:'center', horizontal: 'right', outlineWidth:0.003, outlineColor:'black'};
	resetSetSymbol();
	//watermark bounds
	card.watermarkBounds = {x:0.5, y:0.7762, width:0.75, height:0.2305};
	resetWatermark();
	//text
	loadTextOptions({
		mana: {name:'Mana Cost', text:'', y:173/2814, width:1863/2010, height:71/2100, oneLine:true, size:71/1638, align:'right', outlineWidth:0.010, manaCost:true, manaSpacing:0,},
		title: {name:'Title', text:'', x:163/2010, y:139/2814, width:1667/2010, height:153/2814, oneLine:true, font:'belerenb', size:0.0381, outlineWidth:0.008, color:'white'},
		type: {name:'Type', text:'', x:172/2010, y:1582/2814, width:1542/2010, height:153/2814, oneLine:true, font:'belerenb', size:0.0319, outlineWidth:0.008, color:'white'},
		rules: {name:'Rules Text', text:'', x:173/2010, y:1770/2814, width:1679/2010, height:775/2814, size:0.036, lineSpacing: -0.115, outlineWidth:0.008, font:'Plantin MT Pro', color:'white', noVerticalCenter:true},
		pt: {name:'Power/Toughness', text:'', x:1598/2010, y:2464/2814, width:246/2010, height:138/2814, size:0.04,  outlineWidth:0.008, font:'belerenbsc', oneLine:true, align:'center', color:'white'}
	});

	// Override the addTextbox function for this frame pack
    const originalAddTextbox = addTextbox;
    addTextbox = function(textboxType) {
        if (textboxType == 'Nickname' && !card.text.nickname) {
            // Preserve the existing title text
            const existingTitleText = card.text.title ? card.text.title.text : '';
            
            // When nickname is added, switch title to lower position and smaller size and add nickname textbox
            loadTextOptions({
                nickname: {name:'Nickname', text:'', x:163/2010, y:139/2814, width:1667/2010, height:153/2814, oneLine:true, font:'belerenb', size:0.0381, outlineWidth:0.008, color:'white'},
                title: {name:'Title', text:existingTitleText, x:172/2010, y:315/2814, width:0.768, height:0.0243, oneLine:true, outlineWidth:0.0080, font:'mplantini', size:0.0240, color:'white', align:'left'}
            }, false);
            
            // Refresh the text options UI
            document.querySelector('#text-options').innerHTML = null;
            Object.entries(card.text).forEach(item => {
                var textOptionElement = document.createElement('h4');
                textOptionElement.innerHTML = item[1].name;
                textOptionElement.classList = 'selectable text-option'
                textOptionElement.onclick = textOptionClicked;
                document.querySelector('#text-options').appendChild(textOptionElement);
            });
            
            // Select the newly added nickname textbox
            const nicknameIndex = Object.keys(card.text).indexOf('nickname');
            if (nicknameIndex >= 0) {
                document.querySelector('#text-options').children[nicknameIndex].click();
            }
        } else {
            originalAddTextbox(textboxType);
        }
    };
	
    // Override textEdited to automatically use {lns} instead of line breaks
    const originalTextEdited = textEdited;
    textEdited = function() {
        // Convert line breaks to {lns} for tighter spacing
        if (card.text && card.text.rules && card.text.rules.text) {
            card.text.rules.text = card.text.rules.text.replace(/\n/g, '{lns}{down7}').replace(/\{line\}/g, '{lns}{down7}');
        }
        originalTextEdited();
    };
}
//loads available frames
loadFramePack();