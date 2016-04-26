var express = require('express');
var app = express();
var path = require('path');
var mysql = require('mysql');

var connection = mysql.createConnection({
	host		:	'us-cdbr-iron-east-03.cleardb.net',
	user		:	'b64cbd83d37bd6',
	password	:	'a420b2d7',
	database	:	'heroku_5782540bc7a582f'
});


 

app.listen(process.env.PORT || 8081);

app.get('/', function(req, res)
{

	res.sendFile(path.join(__dirname + '/practice.html'));

});


app.get('/data', function(request, response) {

	
connection.query('SELECT * FROM heroku_5782540bc7a582f.city where heroku_5782540bc7a582f.city.ID = ?', [request.query.ID], function(err, rows, fields){
		if (err){
			console.log('error: ', err);
			throw err;
		}
		response.json(rows);
	});
});

app.use(function(req, res, next) 
{
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Headers", "Content-Type");
        res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
        next();  
});


console.log('server is ready at 8081');

