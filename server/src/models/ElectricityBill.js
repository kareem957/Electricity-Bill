const mongoose = require("mongoose");
const paginate = require("mongoose-paginate");

const ElectricityBill = new mongoose.Schema({
    billId: {
        type: String,
        required: true,
        unique: true,
    },
    billDate: {
        type: Date,
        required: true,
        default: Date.now,
    },
    billPaidDate: {
        type: Date,
        required: true,
        default: Date.now,
    },
    unitConsumed: {
        type: Number,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
});

ElectricityBill.plugin(paginate);

module.exports = mongoose.model("ElectricityBill", ElectricityBill);
