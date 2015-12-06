module.exports = {
	encode: encode,
	decode: decode
};

var table = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+_';

function encode(value) {
	if(value > table.length) 
		throw new Error(value + ' exceeds maximum encoding value (' + table.length ')!');
	else if (value < 0)
		throw new Error(value + ' exceeds minimum encoding value (0)!');
	return table.charAt(value);
}

function decode(value) {
	var ret = table.indexOf(value);
	if(ret < 0)
		throw new Error(value + ' is not a legal character!');
	return ret;
}
