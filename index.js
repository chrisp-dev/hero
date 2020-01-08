const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util');
const Table = require('./lib/Table');

const app = express();
const PORT = process.env.PORT || 3000;

const readFileAsync = util.promisify(fs.readFile);

let TableList = [];

let tables = [];

let waitlist = [];

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
    res.json(tables);
});

app.get("/api/wholelist", (req, res) => {
    res.json(TableList)
})

app.delete('/api/tablelist/:id', (req, res) => {
    const id = JSON.parse(req.params.id);
    const tmpTbl = [];
    tables = [];
    waitlist = [];
    for (let i = 0; i < TableList.length; i++) {
        if (TableList[i].id === id) {
            console.log(`Removing Reservation ${TableList[i].id}`);
        } else {
            tmpTbl.push(TableList[i]);
            if (i < 5) {
                tables.push(TableList[i]);
            } else {
                waitlist.push(TableList[i]);
            }
        }
    }

    TableList = tmpTbl;

    fs.writeFile("Tables.json", JSON.stringify(TableList), (err) => {
        console.log('Saved Tables.json updates');
    });
    res.send("Successfully deleted");
});

app.get('/api/waitlist', (req, res) => {
    let reserveId = req.params.id;
    res.json(waitlist)
});

app.post('/api/reserve', (req, res) => {
    const newTable = new Table(req.body);
    TableList.push(newTable);

    for (let i = 0; i < TableList.length; i++) {
        if (i <= 4) {
            tables.push(TableList[i]);
        } else {
            waitlist.push(TableList[i])
        }
    }

    fs.writeFile("Tables.json", JSON.stringify(TableList), (err) => {
        console.log('file written');
        res.json(newTable);
    });
});


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