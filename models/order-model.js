const mongoose = require('mongoose');
const orderSchema = mongoose.Schema({
    userId : {
        type : String,
        required : true,
        unique : true
    },
    products : [
        {
            productId : {
                type : String,
                required : true
            },
            quantity : {
                type : Number,
                default : 1
            }
        }
    ],
    amount : {
        type : Number,
        required : true
    },
    address : {
        type : Object,
        required : true
    },
    status : {
        type : String,
        default : "pending"
    }
}, {
    timestamp : true
});

module.exports = mongoose.model("Order", orderSchema);