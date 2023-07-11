const axios  = require('axios');
exports.orderDetails = async (req, res) => {
   try {
    let orderDetails
    const data = {
        vendorAccountId:157134,
        apiSecretKey:'1cb7d091-9aca-4cab-bee9-2bd0cc73b0d6'
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
        vendorAccountId:157134,
        apiSecretKey:'1cb7d091-9aca-4cab-bee9-2bd0cc73b0d6'
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

