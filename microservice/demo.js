// Imports
const express = require("express");
const multer = require("multer");
const path = require('path');
const fs = require('fs');
const ip = require("ip");
const app = express();
const port = 3000;

//Set Storage Engine
const storage = multer.diskStorage({
    destination: './uploads',
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

// Set upload
const upload = multer({ storage: storage }).single('image');

// Classifier.js import
const classifier = require("./classifier.js")

// Static files
app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/js", express.static(__dirname + "public/js"));
app.use("/img", express.static(__dirname + "public/img"));

// Set views and view engine
app.set("views", "./views");
app.set("view engine", "ejs");

// Endpoints
app.get("", (req, res) => {
    res.render("index");
});

app.post('', upload, async (req, res) => {

    let image_name = req.file.filename;
    let file_path = path.join(__dirname, `uploads/${image_name}`);
    let response = await classifier.classify(file_path);

    setTimeout(function () {
        fs.unlinkSync(file_path);
    }, 5000);

    if (response.success) {
        res.render("response-success", { response: response.class });
    } else {
        res.render("response-failed");
    }
});

app.listen(port, function () {
    console.log();
    console.log(`Api running on http://${ip.address()}:${port}`);
    console.log();
})