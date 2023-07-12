const express = require("express");

let router = express.Router(),
{
    orderDetails
} = require("../controller/orders");

router.get("/order-details",orderDetails);


module.exports = router;
