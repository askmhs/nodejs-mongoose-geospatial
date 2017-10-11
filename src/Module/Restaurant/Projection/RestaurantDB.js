const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const restaurant = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    location: {
        type: [Number],
        index: '2d'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
});

export default mongoose.model('Restaurant', restaurant);