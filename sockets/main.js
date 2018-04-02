var Sockets = require('./socket');
var sendJs, sendCss;

module.exports = new Promise((resolve, reject) => {
	Sockets(resolve, reject);
});
