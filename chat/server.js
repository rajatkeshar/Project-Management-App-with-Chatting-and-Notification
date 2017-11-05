var express = require('express');
var redis   = require("redis");
var session = require('express-session');
var redisStore = require('connect-redis')(session);
var bodyParser = require('body-parser');
var client  = redis.createClient();
var app = express();

client.flushdb();

var messages = [];
var users = [];


//serve static files on the server
app.use(express.static(__dirname + '/public'));

//session
app.use(session({
    secret: 'ssshhhhh',
    // create new redis store.
    store: new redisStore({ host: 'localhost', port: 6379, client: client}),
    saveUninitialized: true,
    resave: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var server = require('http').createServer(app);

//listning at port 8081
server.listen(8081, function() {
	console.log('listening at port 8081');
});

app.get('/',function(req,res){
	res.sendFile(__dirname + '/views/chat.html');
});

// Add Socket IO to your server
var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {

	//new user key(socketId)
	var userKey = socket.id;
	var REDIS_KEY_USER_INFO_HASH = "userInfo_" + userKey;
	var REDIS_KEY_USER_SOCKETS_SET = "userSockets_" + userKey;

	// Adding socket ID to user's socket ID set
    client.sadd(REDIS_KEY_USER_SOCKETS_SET, socket.id);
	
	socket.once('disconnect', function(data) {
		client.exists(REDIS_KEY_USER_SOCKETS_SET, function (err, isExist) {
			if (isExist) {
				client.srem(REDIS_KEY_USER_SOCKETS_SET, socket.id);
				socket.disconnect();
			} else {
				log.debug(REDIS_KEY_USER_SOCKETS_SET + " does not exist");
			}
		});
	});

	socket.on('message', function (data) {
		client.hgetall(REDIS_KEY_USER_INFO_HASH, function(err, userInfo) {
			console.log(userInfo);			
			io.sockets.emit('message', data);
			messages.push(data);
		});
	});

	socket.emit('historyMessage', { oldMessages: messages });

	socket.on('newUser', function (data) {
		var userInfo = {
			"userId": userKey,
			"name": data.onlineUser,
			"status" : "Available",
		};
		client.hmset(REDIS_KEY_USER_INFO_HASH, userInfo);

		users.push(data);
		io.sockets.emit('newUser', users); 
	});

});

