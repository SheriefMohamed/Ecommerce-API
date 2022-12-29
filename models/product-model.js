const mongoose = require('mongoose');
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
    image : {
        type : String,
        required : true
    },
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