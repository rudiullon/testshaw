var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('public'));
app.get('/', function (req, res) {
   res.sendFile( __dirname + "/" + "index.htm" );
})

app.post('/process_post', urlencodedParser, function (req, res) {
   // Prepare output in JSON format
   var word;
   var statusCode;
   var isPalindrome;
   
   
   
   word = req.body.word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").replace(/\s{2,}/g,"").toLowerCase();
   console.log(word);
   
   var sub_len = Math.floor(word.length/2);   
   var sub1 = word.substring(0,sub_len);
   
   if((word.length % 2)==1) sub_len = (sub_len+1)
   var sub2 = word.substring(sub_len).split("").reverse().join("");

	console.log(sub1,sub2);
   
   
   
   if(sub1 == sub2){
	   isPalindrome = true;
   }else{
	   isPalindrome = false;
   }
   
    
   
   if(isPalindrome){
	   statusCode = 200;
   }else{
	   statusCode = 400;
   }
   res.status(statusCode).json(word);
   
   
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Listening at http://%s:%s", host, port)

})