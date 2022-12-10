const mongoose = require('mongoose');
const purchaseSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
    },
    address: {
        type: String,
    },
    products: {
        type: Array,
        require: true
    }
})

const Purchase = mongoose.model('purchases', purchaseSchema);
module.exports = Purchase;
