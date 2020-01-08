const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// app.use
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.get
app.get('/', function (req, res) {
    res.send("Welcome to the API!");
});
// app.listen
app.listen(PORT, function () {
    console.log("Listening on port " + PORT);
});