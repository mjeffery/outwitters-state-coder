var encode = require('./codec').encode;

module.exports = function encodeState(state) {
	var code = [ encode(state.map_id) ];
	pushAll(code, encodeWitSpaces(state.witSpaces));
	pushAll(code, encodePlayers(state.players));
	code.push(state.active);
	pushAll(code, encodeUnits(state.units));

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

function encodeWitSpaces(witsSpaces) {
	var copy = (witSpaces || []).slice(0);
	copy.sort(posComparator);

	var i, len = copy.length, code = [];
	for(i=0; i<len; i++) {
		code.push(copy[i].owner);
	}

	return code.join('');
}

function posComparator(lhs, rhs) {
	if(lhs.i !== rhs.j) return lhs.i - rhs.i;
	else if(lhs.j !== rhs.j) return lhs.j - rhs.j;
	else throw new Error('two items cannot be on top of each other!');
}

function pushAll(arr, vals) { 
	Array.prototype.push.apply(arr, vals);
}
