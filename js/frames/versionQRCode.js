//checks to see if it needs to run
if (!loadedVersions.includes('/js/frames/versionQRCode.js')) {
	loadedVersions.push('/js/frames/versionQRCode.js');
	card.qrCode = {
		x:0.36,
		y:0.73,
		size:0.20,
		fgColor:'#fff',
		fgAlpha:1,
		bgColor:'#000',
		bgAlpha:0,
		padding:0,
		url:'https://cardconjurer.com/'
	}
	sizeCanvas('qrious');
	sizeCanvas('qrCode');
	document.querySelector('#creator-menu-tabs').innerHTML += '<h3 class="selectable readable-background" onclick="toggleCreatorTabs(event, `qrCode`)">QR Code</h3>';
	var newHTML = document.createElement('div');
	newHTML.id = 'creator-menu-qrCode';
	newHTML.classList.add('hidden');
	newHTML.innerHTML = `
	<div class='readable-background padding'>
		<h5 class='padding margin-bottom input-description'>Enter the URL of your decklist:</h5>
		<input id='qr-code-url' class='input' type='URL' oninput='updateQRCode(this.value);'>
	</div>
	<!--<div class='readable-background padding'>
		<h5 class='padding margin-bottom input-description'>Select the QR code color:</h5>
		<select id='dungeon-color' class='input' onchange='dungeonEditedBuffer();'>
			<option value="#fff" selected="selected">True White</option>
			<option value="W">White</option>
			<option value="U">Blue</option>
			<option value="B">Black</option>
			<option value="R">Red</option>
			<option value="G">Green</option>
			<option value="M">Multicolored</option>
			<option value="C">Colorless</option>
		</select>
	</div>-->
	`;
	document.querySelector('#creator-menu-sections').appendChild(newHTML);
	loadScript('/js/qrious.min.js');
}

function updateQRCode(url = card.qrCode.url) {
	//generate qr code
	var qr = new QRious({
		background: card.qrCode.bgColor,
		backgroundAlpha: card.qrCode.bgAlpha,
		foreground: card.qrCode.fgColor,
		foregroundAlpha: card.qrCode.fgAlpha,
		padding: scaleHeight(card.qrCode.padding),
		size: scaleHeight(card.qrCode.size),
		element: qriousCanvas,
		value: url
	});
	//draw cropped qr code to correct location
	var qrCodeContext = qrCodeCanvas.getContext('2d');
	qrCodeContext.clearRect(0, 0, qrCodeCanvas.width, qrCodeCanvas.height);
	qrCodeContext.drawImage(croppedCanvas(qriousCanvas), scaleWidth(card.qrCode.x), scaleHeight(card.qrCode.y), scaleHeight(card.qrCode.size), scaleHeight(card.qrCode.size));
	//draw the card
	drawCard();
}
