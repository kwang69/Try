var express = require('express');
var multer = require('multer')



var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public')
  },
  filename: function (req, file, cb) {
    var type=file.mimetype.split("/")
    cb(null, file.fieldname + '.' +  type[1])
  }
})
 
var upload = multer({ storage: storage, dest: "public/" })


var app = express();
var bodyParser = require("body-parser")
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: false
}));

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '19960931',
  database: 'web'
});

connection.connect();



app.post('/upload', upload.single('file'), function(req, res) {
  // console.log(req.file);

  var sql = "INSERT INTO try (pic,type) VALUES (?,?)";
  var ret = {
    code: 0,
    msg: 'ok',
    path: null,
    type: null
  }
  connection.query(sql, [req.file.path, req.file.mimetype], function(err, result) {
    if (!err) {

    }
    ret.path = req.file.filename;
    ret.type = req.file.mimetype;
    res.send(ret);
  })

});


var server = app.listen(4000, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});