var express = require('express');
var formidable = require('express-formidable');
var fs = require('fs');
var app = express(); 

app.use(express.static("public"));
app.use(formidable());

app.post('/create-post', function (req, res) {
    console.log(req.fields);
    //reading file 
    fs.readFile(__dirname + '/data/posts.json', function (error, file) {
    var parsedFile = JSON.parse(file); //parse string into js object
    parsedFile[Date.now()]=req.fields.blogpost; //adding a key:value into the array
    console.log(file.toString()); 
    //writing file 
        fs.writeFile(__dirname + '/data/posts.json', JSON.stringify(parsedFile), function (error, file) {
            console.log(parsedFile) }); //.stringify changing object back into JSON
});
});

app.get('/get-posts', function (req, res){
       res.sendFile(__dirname + '/data/posts.json');
    
});

app.listen(8080, function () {
  console.log('Server is listening on port 8080. Ready to accept requests!');
});