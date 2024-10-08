const express = require("express");
const router = express.Router();
const Order = require("../models/Orders");

// Function to add order data
async function addOrderData(req, res) {
    try {
        let data = req.body.sub_order_data;
        let respObj = [];
        if (data && data.length > 0) {
            for (let item of data) {
                respObj.push({
                    "name": item.name,
                    "quantity": item.qty,
                    "option": item.size,
                    "amount": item.price
                });
            }
        }

        // Check if email exists in the database
        let eID = await Order.findOne({ 'email': req.body.email });
        //console.log(eID);

        if (eID === null) {
            // If email does not exist, create a new order with order_date and items
            let resp = await Order.create({
                email: req.body.email,
                sub_order_data: [{
                    order_date: new Date(),
                    items: respObj
                }]
            });
            resp = resp.toJSON();
            //console.log(resp);
            res.json({ success: true });
        } else {
            // If email exists, push new order data (with a new order_date and items array)
            await Order.findOneAndUpdate(
                { email: req.body.email },
                {
                    $push: {
                        sub_order_data: {
                            order_date: new Date(),
                            items: respObj
                        }
                    }
                }
            );
            res.json({ success: true });
        }
    } catch (error) {
        console.log("Server Error:", error);
        res.status(500).send("Server Error");
    }
}

// Route to handle adding order data
router.post("/orderData", (req, res) => {
    addOrderData(req, res);
});

// Function to fetch user order data
async function myOrderData(req, res) {
    try {
        // Wait for the order data
        let myData = await Order.findOne({ 'email': req.body.email });
        
        // Check if data exists and send a proper response
        if (myData) {
            myData = myData.toJSON();
            res.status(200).json({ mainData: myData });
        } else {
            res.status(404).json({ mainData: [] }); // 404 Not Found when no data is present
        }
    } catch (error) {
        console.error("Error fetching order data: ", error); // Log the error for debugging
        res.status(500).json({ message: "Server Error" }); // Send 500 Server Error
    }
}

// Route to handle fetching user order data
router.post("/myOrderData", async (req, res) => {
    await myOrderData(req, res);
});

module.exports = router;
