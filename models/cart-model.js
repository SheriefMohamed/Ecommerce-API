const mongoose = require('mongoose');
const cartSchema = mongoose.Schema({
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
    ]
}, {
    timestamp : true
});

module.exports = mongoose.model("Cart", cartSchema);