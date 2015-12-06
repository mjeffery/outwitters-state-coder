var stateCoder = module.exports = {
	encode: require('./lib/encode')
};

if(!!window) window.stateCoder = stateCoder;
