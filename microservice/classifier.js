// Imports
const fs = require('fs').promises;
const tf = require("@tensorflow/tfjs");
const tfnode = require("@tensorflow/tfjs-node");

// Clasification classes
const class_names = ['saus', 'apsnidzis', 'slapjš'];
const image_size = 128;
const image_channels = 3;

// Clasification logic
async function classify(file_path) {

    let result = { success: false, class: "" };
    let handler = tfnode.io.fileSystem('./classifier_model/model.json');
    let model = await tf.loadLayersModel(handler);
    let imageBuffer = await fs.readFile(file_path);
    let tfImage = tfnode.node.decodeImage(imageBuffer).resizeBilinear([image_size, image_size]);
    let predict = model.predict(tfImage.reshape([1, image_size, image_size, image_channels]));
    let image_class = tf.argMax(predict.dataSync());

    result.class = class_names[image_class.dataSync()];
    result.success = true;

    return result;
}

// Function export
module.exports = { classify };