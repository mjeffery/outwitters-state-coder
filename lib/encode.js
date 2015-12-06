var encode = require('./codec').encode;

module.exports = function encodeState(state) {
	return [ 
		encode(state.map),
		encodeWitSpaces(state.witSpaces),
		encodePlayers(state.players),
		encode(state.active),
		encodeUnits(state.units)
	].join('');
}

function encodePlayers(players) {
	var player, i, len = players.length, code = [];
	for(i=0; i<len; i++) {
		player = players[i];
		code.push(encode(player.base));
		code.push(encode(player.wits));
	}

	return code.join('');
}

function encodeUnits(units) {
	var copy = (units || []).slice(0);
	copy.sort(posComparator);
	
	var i, len = copy.length, code = [];
	for(i=0; i<len; i++) {
		code.push(encodeUnit(copy[i]));
	}

	return code.join('');
}

function encodeUnit(unit) {
	return [
		encode(unit.team),
		encode(unit.type),
		encode(unit.hp),
		encode(unit.i),
		encode(unit.j)
	].join('');
}

function encodeWitSpaces(witSpaces) {
	var copy = (witSpaces || []).slice(0);
	copy.sort(posComparator);

	var i, len = copy.length, code = [];
	for(i=0; i<len; i++) {
		code.push(copy[i].owner);
	}

	return code.join('');
}

function posComparator(lhs, rhs) {
	if(lhs.i !== rhs.i) return lhs.i - rhs.i;
	else if(lhs.j !== rhs.j) return lhs.j - rhs.j;
	else throw new Error('two items cannot be on top of each other!');
}
