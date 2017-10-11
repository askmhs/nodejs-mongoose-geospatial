const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * Defining schema
 */
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

/**
 * Exporting and creating schema
 */
export default mongoose.model('Restaurant', restaurant);