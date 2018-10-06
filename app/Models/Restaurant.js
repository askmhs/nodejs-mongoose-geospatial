import mongoose from "mongoose";

/**
 * Defining schema
 */
const restaurant = new mongoose.Schema({
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
        index: "2d"
    }
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});

/**
 * Exporting and creating schema
 */
export default mongoose.model('Restaurant', restaurant);