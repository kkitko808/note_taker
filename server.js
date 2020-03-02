// var jsdom = require("jsdom");
// const { JSDOM } = jsdom;
// const { window } = new JSDOM();
// const { document } = (new JSDOM('')).window;
// global.document = document;
// var $ = jQuery = require('jquery')(window);


const fs = require("fs");
const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"))
})
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"))
})

app.get("/api/notes", function (req, res) {
    fs.readFile(path.join(__dirname, "./db/db.json"), "utf8", (err, data) => {
        if (err) throw err;
        console.log(JSON.parse(data))
        return res.json(JSON.parse(data))
    })
})

app.post("/api/notes", function (req, res) {
    fs.readFile(path.join(__dirname, "./db/db.json"), "utf8", (err, data) => {
        if (err) throw err;
        data = JSON.parse(data)
        data.push({ title: req.body.title, text: req.body.text })
        console.log(data)
        fs.writeFile(path.join(__dirname, "./db/db.json"), JSON.stringify(data), (err) => { if (err) throw err; })
    })
    res.end();
})
app.delete("/api/notes/:id", function (req, res) {
    fs.readFile(path.join(__dirname, "./db/db.json"), "utf8", (err, data) => {
        if (err) throw err;
        data = JSON.parse(data)
        data.splice(req.params.id, 1);
        fs.writeFile(path.join(__dirname, "./db/db.json"), JSON.stringify(data), (err) => { if (err) throw err; })
    })
})
// -------------------- route catch all
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"))
})

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});