const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    pricePerDay: { type: Number, required: true },
    imageUrl: { type: String },
    available: { type: Boolean, default: true },
    type: { type: String, required: true }, // e.g. SUV, Sedan
    location: { type: String, required: true },
    features: [String]
}, { timestamps: true });

module.exports = mongoose.model('Car', CarSchema);
