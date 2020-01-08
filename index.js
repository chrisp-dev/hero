const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

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

// app.get('/api/scoob', (req, res) => {
//     res.sendFile(path.join(__dirname, "views", "scoob.html"));
// });

// app.get('/api/graf', (req, res) => {
//     res.sendFile(path.join(__dirname, "assets", "images", "scoob.jpg"));
// });


var tables = [];

var waitlist = [];

app.post("/api/tables", function(req, res) {

    var newReservation = req.body;
  
    console.log(newReservation);
  
    tables.push(newReservation);
  
    res.json(newReservation);
});


 // app.listen
app.listen(PORT, function () {
    console.log("Listening on port " + PORT);
});