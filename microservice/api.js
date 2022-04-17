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

app.get('', (req, res) => {
    res.send('To use the API, post an image of road to the same URL. Provide image in body with param name "image".');
});

app.post('', upload, async (req, res) => {

    let image_name = req.file.filename;
    let file_path = path.join(__dirname, `uploads/${image_name}`);
    let response = await classifier.classify(file_path);

    setTimeout(function () {
        fs.unlinkSync(file_path);
    }, 5000);

    res.send(response);
});

app.listen(port, function () {
    console.log();
    console.log(`Api running on http://${ip.address()}:${port}`);
    console.log();
})