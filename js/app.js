var express = require('express');
var app = express();

app.post('/reg', function (req, res) {
	console.log(req.params.mobile);
  	console.log(req.params.pwd);
  	console.log(req.query.mobile);
  	console.log(req.query.pwd);
  	res.send('Hello World!');
});

var server = app.listen(3002, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});