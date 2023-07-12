const axios  = require('axios');
exports.orderDetails = async (req, res) => {
   try {
    let orderDetails = []
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
    await Promise.all(orderList.data.response.orders.map(async order=>{
        dataOrderDetails.orderId = order.id
        const configOrderDetails = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://store.payproglobal.com/api/Orders/GetOrderDetails',
            Headers:{
                'Content-Type': 'application/json',
            },
            data:dataOrderDetails
        }
        let orderDetail = await  axios.request(configOrderDetails);
        console.log(orderDetail.data.response,"order---")
        orderDetails.push(orderDetail.data.response)
    }))
    res.status(200).send({
        data:orderDetails
    })
   } catch (error) {
    return res.status(500).send(error)
   }
};

