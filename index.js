const express = require('express');
const path = require('path');
const Table = require('./lib/Table');

const app = express();
const PORT = process.env.PORT || 3000;

const TableList = [];

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
    console.log(req.body);
    TableList.push(new Table(req.body));
    res.json(req.body);
});

// app.listen
app.listen(PORT, function () {
    console.log("Listening on port " + PORT);
});