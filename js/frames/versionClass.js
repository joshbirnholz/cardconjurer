//checks to see if it needs to run
if (!loadedVersions.includes('/js/frames/versionClass.js')) {
	loadedVersions.push('/js/frames/versionClass.js');
	sizeCanvas('class');
	document.querySelector('#creator-menu-tabs').innerHTML += '<h3 class="selectable readable-background" onclick="toggleCreatorTabs(event, `class`)">Class</h3>';
	var newHTML = document.createElement('div');
	newHTML.id = 'creator-menu-class';
	newHTML.classList.add('hidden');
	newHTML.innerHTML = `
	<div class='readable-background padding'>
		<h5 class='padding margin-bottom input-description'>Adjust the height of each Class level</h5>
		<h5 class='padding margin-bottom input-description'>First Level:</h5>
		<div class='padding input-grid margin-bottom'>
			<input id='class-height-0' type='number' class='input' oninput='classEdited();' min='0'>
		</div>
		<h5 class='padding margin-bottom input-description'>Second Level:</h5>
		<div class='padding input-grid margin-bottom'>
			<input id='class-height-1' type='number' class='input' oninput='classEdited();' min='0'>
		</div>
		<h5 class='padding margin-bottom input-description'>Third Level:</h5>
		<div class='padding input-grid margin-bottom'>
			<input id='class-height-2' type='number' class='input' oninput='classEdited();' min='0'>
		</div>
		<h5 class='padding margin-bottom input-description'>Fourth Level:</h5>
		<div class='padding input-grid margin-bottom'>
			<input id='class-height-3' type='number' class='input' oninput='classEdited();' min='0'>
		</div>
	</div>`;

	document.querySelector('#creator-menu-sections').appendChild(newHTML);
	var classHeader = new Image();
	classHeader.onload = classEdited;
	fixClassInputs(classEdited);
} else {
	fixClassInputs(classEdited);
}
	//placement for header
function getCardClass() {
		switch (card.version) {
			case 'classStoneCutterDeluxe': return {x: 0.5240, width: 0.400};
			case 'class': return {x: 0.5014, width: 0.422};
			default: return { x: 0.5014, width: 0.422};
		}
} 
	//use correct header image
function getHeaderPath() {
	switch (card.version) {
		case 'classStoneCutterDeluxe': return '/img/frames/custom/stoneCutter/stoneCutterDeluxe/class/headerGold.png';
		case 'class': return '/img/frames/class/header.png';
		default: return '/img/frames/class/header.png';
	}
}

function classEdited() {
	card.class = getCardClass();
	const headerPath = getHeaderPath();
	if (!classHeader.src.endsWith(headerPath)) {
		setImageUrl(classHeader, headerPath);
	}
	//gather data
	let classCount = 0;
	var lastY = card.text.level0c.y;
	for (var i = 0; i < 4; i ++) {
	 	var height = parseFloat((parseInt(document.querySelector('#class-height-' + i).value) / card.height).toFixed(4));
	 	card.text['level' + i + 'c'].height = height || (i === 0 ? 1 : 0);
	 	if (i > 0) {
	 		if (height > 0) {
				classCount ++;
			 	card.text['level' + i + 'a'].y = lastY - 0.0361;
			 	card.text['level' + i + 'b'].y = lastY - 0.0361;
		 		card.text['level' + i + 'c'].y = lastY;
			} else {
		 		card.text['level' + i + 'a'].y = 2;
		 		card.text['level' + i + 'b'].y = 2;
		 		card.text['level' + i + 'c'].y = 2;
		 	}
	 	} else {
	 		card.text['level0c'].height;
	 	}
	 	lastY += height + 0.0481;
	}
	//draw to class canvas
	classContext.clearRect(0, 0, classCanvas.width, classCanvas.height);
	for (var i = 1; i <= classCount; i ++) {
		if (i == classCount) {
			finalHeight = 0.8368 - card.text['level' + i + 'c'].y;
			if (finalHeight <= 0) {
				finalHeight = 0.05;
			}
	 		card.text['level' + i + 'c'].height = finalHeight;
		}
		var x = scaleX(card.class.x);
		var y = scaleY(card.text['level' + i + 'c'].y);
		var width = scaleWidth(card.class.width);
		var height = scaleHeight(card.text['level' + i + 'c'].height);
		if (classHeader.complete) {
			classContext.drawImage(classHeader, x, y - scaleHeight(0.0481), width, scaleHeight(0.0481));
		}
	}
	drawTextBuffer();
	drawCard();
}

function fixClassInputs(callback) {
	document.querySelector('#class-height-0').value = scaleHeight(card.text.level0c.height);
	document.querySelector('#class-height-1').value = scaleHeight(card.text.level1c.height);
	document.querySelector('#class-height-2').value = scaleHeight(card.text.level2c.height);
	document.querySelector('#class-height-3').value = scaleHeight(card.text.level3c.height);
	if (callback) {
		callback();
	}
}