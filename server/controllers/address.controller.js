const Address = require('../models/address.models');

async function addAddress(req, res) {
    try {
        const user = req.user;
        console.log(user);
        const address = new Address({...req.body, user : user._id});
        await address.save();
    }catch(err){
        console.log(err);
    }
}