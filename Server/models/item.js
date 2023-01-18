const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({

    itemType: {
        type: String,
        require: true
    },
    condition: {
        type: String,
        require: true
    },
    ownerId: {
        type: String,
        require: true
    }
})

const Item = mongoose.model('items', itemSchema);
module.exports = Item;
