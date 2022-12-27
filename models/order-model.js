const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const orderSchema = mongoose.Schema({
    userId : {
        type : String,
        required : true,
        unique : false
    },
    products : [
        {
            productId : {
                type : Schema.Types.ObjectId,
                required : true
            },
            quantity : {
                type : Number,
                default : 1
            }
        }
    ],
    totalPrice : {
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