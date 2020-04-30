const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    bucketname: {
        required: true,
        type: String,
        min: 6,
        max: 255
    },
    done:{
        required: true,
        type: string
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Item', ItemSchema);