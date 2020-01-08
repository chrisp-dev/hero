const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util');
const Table = require('./lib/Table');

const app = express();
const PORT = process.env.PORT || 3000;

const readFileAsync = util.promisify(fs.readFile);

const TableList = [];

readFileAsync(path.join(__dirname, "Tables.json"))
    .then(data => {
        if (data.length) {
            const dat = JSON.parse(data);
            dat.forEach((element) => {
                const table2 = new Table(element)
                TableList.push(table2);

                if (tables.length < 5) {
                    tables.push(table2);
                } else {
                    waitlist.push(table2);
                }
                // console.log(element);                
            });
            // TableList.push(...JSON.parse(data));
        }
    }).catch(err => {
        console.log(err);
    });

// app.use
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/assets', express.static(path.join(__dirname, "assets", "styles")));
app.use('/images', express.static(path.join(__dirname, "assets", "images")));
app.use(express.static(path.join(__dirname, "views")));
// app.get
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, "views", "hot-reserve.html"));
});

app.get('/api/tablelist', (req, res) => {
    res.json(TableList);
});

app.get('/api/waitlist/:id', (req, res) => {
    let reserveId = req.params.id;
});

app.post('/api/reserve', (req, res) => {
    // console.log(req.body);
    const newTable = new Table(req.body);
    console.log(newTable);
    TableList.push(newTable);
    fs.writeFile("Tables.json", JSON.stringify(TableList), (err) => {
        console.log('file written');
        res.json(newTable);
    });
});


var tables = [];

var waitlist = [];

app.post("/api/tables", function (req, res) {

    var newReservation = req.body;

    console.log(newReservation);

    tables.push(newReservation);

    res.json(newReservation);
});


// app.listen
app.listen(PORT, function () {
    console.log("Listening on port " + PORT);
});