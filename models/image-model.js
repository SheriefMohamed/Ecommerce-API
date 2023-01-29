const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const imageSchema = new Schema({
    imgUrl: {
        type: String,
        required: true,
    }
});

exports.Images = mongoose.model("Images", imageSchema);