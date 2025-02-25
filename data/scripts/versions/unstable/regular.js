if (!loadedVersions.includes('unstable/regular')) {
	loadedVersions.push('unstable/regular')
	loadFrameImages([
		['White Frame', '/data/images/cardImages/unstable/unstableFrameW.png', 0, 0, 1, 1, ['Full']],
		['Blue Frame', '/data/images/cardImages/unstable/unstableFrameU.png', 0, 0, 1, 1, ['Full']],
		['Black Frame', '/data/images/cardImages/unstable/unstableFrameB.png', 0, 0, 1, 1, ['Full']],
		['Red Frame', '/data/images/cardImages/unstable/unstableFrameR.png', 0, 0, 1, 1, ['Full']],
		['Green Frame', '/data/images/cardImages/unstable/unstableFrameG.png', 0, 0, 1, 1, ['Full']],
		['Multicolored Frame', '/data/images/cardImages/unstable/unstableFrameM.png', 0, 0, 1, 1, ['Full']],
		['Artifact Frame', '/data/images/cardImages/unstable/unstableFrameA.png', 0, 0, 1, 1, ['Full']],
		['Colorless Frame', '/data/images/cardImages/unstable/unstableFrameC.png', 0, 0, 1, 1, ['Full']]
	], 'frameClassUnstableRegular')
}

hideFrameImages('frameClassUnstableRegular')