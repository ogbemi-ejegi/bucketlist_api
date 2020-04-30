const mongoose = require('mongoose');

const BucketSchema = new mongoose.Schema({
    bucketname: {
        required: true,
        type: String,
        min: 6,
        max: 255
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Bucket', BucketSchema);