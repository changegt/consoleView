var Koa = require('koa'),
	Router = require('koa-router'),
	KoaBody = require('koa-body'),
	fs = require('fs');

var app = new Koa();
var router = new Router();

var socketMain = require('./sockets/main');

var success = {
	errorCode: 0,
	errorMsg: 'success'
};

var error = {
	errorCode: -1,
	errorMsg: 'error'
};

var send = (ctx, next) => {
	const consoleHtml = ctx.request.body.console;
	if(ctx.request.body.type == 'js'){
		socketMain.then((ws) => {
			ws.send('<script type="text/javascript">'+consoleHtml+'</script>');
		});
	}else{
		socketMain.then((ws) => {
			ws.send('<style>'+consoleHtml+'</style>');
		});
	}
	ctx.body = success;
	next();
}

router
	.post('/send', send)
	.get('/html/console.html', (ctx, next) => {
		ctx.body = fs.readFileSync('html/console.html', 'utf-8');
		next();
	})
	.get('/html/view.html', (ctx, next) => {
		ctx.body = fs.readFileSync('html/view.html', 'utf-8');
		next();
	});


app
	.use(KoaBody())
  	.use(router.routes())
  	.use(router.allowedMethods());

app.listen(3000);