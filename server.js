var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;


app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.listen(PORT, function () {
    console.log('Kickoff app listening on port' + PORT);
})

app.use(express.static(__dirname + '/public'));
app.use("/index.html", express.static(__dirname + '/index.html'));
