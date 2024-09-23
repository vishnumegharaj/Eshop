const { type } = require('@testing-library/user-event/dist/type');
const mongoose = require('mongoose');

const Orders = mongoose.model("Order",new mongoose.Schema({

  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },

  orderDetails: [
    {
      productId: {
        type:  mongoose.Schema.ObjectId,
        required: true
      },
      name : {
        type: String,
        required: true
      },
      quantity : { 
        type: Number,
        required: true
      },
      price : { 
        type: Number,
        required: true
      },
     
    }
  ],

  shippingInfo: {

    contactNumber : {
      type: Number, 
      required: true
    },
    street :{
      type: String,
      required: true
    },
    state :{
      type: String,
      required: true
    },
    city :{
      type: String,
      required: true
    },
    zipcode:{
      type: Number,
      required: true
    }

  },

  

 

 


}, { timestamps: true }
));




module.exports = Orders;
