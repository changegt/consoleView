var WebSocketServer = require('ws').Server,
	wss = new WebSocketServer({ port: 3100 });

var openSocket = (resolve, reject) => {
	try{
		wss.on('connection', function (ws) {
		    console.log('client connected');
		    ws.on('message', function (message) {
		        console.log(message);
		    });

		    resolve(ws);
		});
	}catch(e){
		reject();
	}
}

module.exports = openSocket;