// Hack to make iconv load the encodings module, otherwise jest crashes. Compare
// https://github.com/sidorares/node-mysql2/issues/489
require('mysql2/node_modules/iconv-lite').encodingExists('foo');