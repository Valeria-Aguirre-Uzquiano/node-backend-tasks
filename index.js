//https://stackoverflow.com/questions/9177049/express-js-req-body-undefined

var express = require("express");
var bodyParser = require('body-parser')

var jsonParser = bodyParser.json()
//var urlencodedParser = bodyParser.urlencoded({ extended: false })
var surrogateKey = 1;

var app = express();

var tasks = []

app.get("/", (req, res, next) => {
    res.json("{ 'message': 'Tasks server online'}");
});

app.post("/tasks", jsonParser, (req, res, next) => {
    req.body.id = surrogateKey++;
    tasks.push(req.body);
    console.log(req.body);
    res.send("OK");
});

app.get("/tasks", (req, res, next) => {
    res.json(tasks);
});

app.get('/tasks/:taskId', function (req, res) {
    //res.send("GET executed with path variable: " + req.params.taskId);
    var idb = req.params.taskId;
    var tkf = [];
    var rs = tasks.find(function (pos, index) {
        if (pos.id == idb) {
            return true;
        }
    });
    tkf.push(rs);
    //console.log("res : "+JSON.stringify(tkf));
    res.json(tkf);
});
/*
app.put('/tasks/:taskId',  jsonParser, function(req, res) {
    var idb = req.params.taskId;
    var tkf = [];
    tkf.push(req.body);
    tasks.find(function(pos,index) {
        if(pos.id == idb){
            pos.title = req.body.title;
            pos.detail = req.body.detail;
            //console.log(typeof req.body);
            //console.log(req.body.title);
            console.log("new> "+pos);
            res.send("update succesful");
        }
    });
    
    
});
*/

app.put('/tasks/:taskId', jsonParser, function (req, res) {

    const status = req.query.status;
    //console.log(status);
    if (status != "") {
        var idb = req.params.taskId;
        var tkf = [];
        tkf.push(req.body);
        tasks.find(function (pos, index) {
            if (pos.id == idb) {
                pos.title = req.body.title;
                pos.detail = req.body.detail;
                pos.status = status;
                res.send("update succesful");
            }
        });


    } else {
        var idb = req.params.taskId;
        var tkf = [];
        tkf.push(req.body);
        tasks.find(function(pos,index) {
            if(pos.id == idb){
                pos.title = req.body.title;
                pos.detail = req.body.detail;
                //console.log(typeof req.body);
                //console.log(req.body.title);
                console.log("new> "+pos);
                res.send("update succesful");
            }
        });
    }
});

app.delete('/tasks/:taskId', function (req, res) {
    var idb = req.params.taskId;
    tasks.splice( idb-1, 1 );
    res.send("delete succesful");
    //res.send("DELETE invoked on /tasks/ with path variable:" + req.params.taskId);
});


app.listen(3000, () => {
    console.log("Servidor HTTP funcionando");
});