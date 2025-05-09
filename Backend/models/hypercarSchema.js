const mongoose = require('mongoose');

const hypercarSchema = new mongoose.Schema({
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    description: { type: String, required: true },
    images: [String],
    specifications: {
        engine: {
            type: { type: String },
            displacement: { type: String },
            horsepower: { type: Number },
            torque: { type: Number },
            transmission: { type: String },
            drivetrain: { type: String }
        },
        performance: {
            topSpeed: { type: Number },
            zeroToSixty: { type: Number }, 
            quarterMile: { type: Number }, 
            nürburgringTime: { type: Number } 
        },
        dimensions: {
            length: { type: Number },
            width: { type: Number },
            height: { type: Number },
            wheelbase: { type: Number },
            curbWeight: { type: Number }
        },
    },
    availability: {
        isAvailable: { type: Boolean, default: true },
        location: { type: String },
        rentalPrice: {
            daily: { type: Number },
            weekly: { type: Number },
            monthly: { type: Number }
        }
    }
}, { timestamps: true });

const Hypercar = mongoose.model('Hypercar', hypercarSchema);

module.exports = Hypercar;