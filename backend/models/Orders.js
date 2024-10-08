const mongoose = require("mongoose");

const { Schema } = mongoose;

// Item schema for each individual order
const OrderItemSchema = new Schema({
    name: {
        type: String,
        required: true, // Add required if necessary
    },
    quantity: {
        type: String,
        required: true, // Add required if necessary
    },
    
    option: {
        type: String,
        required: false, // Optional field
    },
    amount: {
        type: String,
        required: true, // Add required if necessary
    },
});

// Order schema where each batch of orders contains a date and an array of order items
const OrderSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    sub_order_data: [
        {
            order_date: {
                type: Date,
                required: true, // Ensure each array of orders has a date
                default: Date.now, // Defaults to the current date if not provided
            },
            items: [OrderItemSchema], // An array of items for that specific order date
        },
    ],
});

module.exports = mongoose.model('orders', OrderSchema);
