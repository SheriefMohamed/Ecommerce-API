const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = mongoose.Schema({
    title : {
        type : String,
        required : true,
        unique : true
    },
    description : {
        type : String,
        required : true
    },
    images : [{ type: Schema.Types.ObjectId, ref: "Images" }],
    category : {
        type : Array,
    },
    size : {
        type : String,
    },
    color : {
        type : String,
    },
    price : {
        type : Number,
        required : true
    },
    qty : {
        type : Number,
        required : true
    }
}, {
    timestamp : true
});

module.exports = mongoose.model("Product", productSchema);