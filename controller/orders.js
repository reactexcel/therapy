const axios  = require('axios');
exports.orderDetails = async (req, res) => {
   try {
    let orderDetails
    const data = {
        vendorAccountId:process.env.VENDOR_ID,
        apiSecretKey:process.env.API_SECRET
    }
    const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://store.payproglobal.com/api/Orders/GetList',
        Headers:{
            'Content-Type': 'application/json',
        },
        data
    }
    const dataOrderDetails = {
        vendorAccountId:process.env.VENDOR_ID,
        apiSecretKey:process.env.API_SECRET
    }
    
    let orderList = await  axios.request(config)
    orderList.data.orders.map(async order=>{
        dataOrderDetails.orderId = order.id
        const configOrderDetails = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://store.payproglobal.com/api/Orders/GetOrderDetails',
            Headers:{
                'Content-Type': 'application/json',
            },
            dataOrderDetails
        }
        let orderDetail = await  axios.request(configOrderDetails);
        console.log(orderDetail,"order---")
        orderDetails.push(orderDetail.data.response)
    })
    res.status.send({
        data:orderDetails
    })
   } catch (error) {
    console.log(error.response.data,"error"); 
   }
};

