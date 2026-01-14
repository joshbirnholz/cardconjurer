//checks to see if it needs to run
if (!card.manaSymbols.includes('/js/frames/manaSymbolsCartoony.js')) {
	card.manaSymbols.push('/js/frames/manaSymbolsCartoony.js');
}
// Always load cartoony symbols to override defaults
// Single color and colorless symbols
loadManaSymbols([
	['cartoony/cw.png', 'cw', 4], ['cartoony/cu.png', 'cu', 4], ['cartoony/cb.png', 'cb', 4], ['cartoony/cr.png', 'cr', 4], ['cartoony/cg.png', 'cg', 4],
		['cartoony/c0.png', 'cc', 15], ['cartoony/c1.png', 'cc', 15], ['cartoony/c2.png', 'cc', 15], ['cartoony/c3.png', 'cc', 15], ['cartoony/c4.png', 'cc', 15],
		['cartoony/c5.png', 'cc', 15], ['cartoony/c6.png', 'cc', 15], ['cartoony/c7.png', 'cc', 15], ['cartoony/c8.png', 'cc', 15], ['cartoony/c9.png', 'cc', 15],
		['cartoony/c10.png', 'cc', 15], ['cartoony/c11.png', 'cc', 15], ['cartoony/c12.png', 'cc', 15], ['cartoony/c13.png', 'cc', 15], ['cartoony/c14.png', 'cc', 15],
		['cartoony/c15.png', 'cc', 15], ['cartoony/c16.png', 'cc', 15], ['cartoony/c17.png', 'cc', 15], ['cartoony/c18.png', 'cc', 15], ['cartoony/c19.png', 'cc', 15],
		['cartoony/cc.png', 'cc', 15], ['cartoony/ct.png', 'cc', 15], ['cartoony/cx.png', 'cc', 15], ['cartoony/cy.png', 'cc', 15], ['cartoony/cz.png', 'cc', 15],
		['cartoony/csnow.png', 'cc', 15], ['cartoony/cinf.png', 'cc', 15], ['cartoony/ce.png'], ['cartoony/cuntap.png', 'cc', 15],
		['cartoony/cflavor.png']
	], [1.55, 1.55], -0.45);

// Two-color (hybrid) symbols
loadManaSymbols([
	['cartoony/cwu.png', 'cwu', 2], ['cartoony/cwb.png', 'cwb', 2], ['cartoony/cub.png', 'cub', 2], ['cartoony/cur.png', 'cur', 2], ['cartoony/cbr.png', 'cbr', 2],
		['cartoony/cbg.png', 'cbg', 2], ['cartoony/crg.png', 'crg', 2], ['cartoony/crw.png', 'crw', 2], ['cartoony/cgw.png', 'cgw', 2], ['cartoony/cgu.png', 'cgu', 2],
		['cartoony/cpw.png', 'cw', 4], ['cartoony/cpu.png', 'cw', 4], ['cartoony/cpb.png', 'cu', 4], ['cartoony/cpr.png', 'cu', 4], ['cartoony/cpg.png', 'cb', 4],
		['cartoony/cpc.png', 'cc', 15]
	], [2.0, 2.0, 0.03], -0.50);