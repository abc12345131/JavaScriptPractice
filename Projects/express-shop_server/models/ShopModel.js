
const mongoose = require('mongoose')

const shopSchema = new mongoose.Schema({
    name: {type: String, required: true}, 
    address: {type: String, required: true}, 
    latitude: {type: Number}, 
    longitude: {type: Number},
    location: {type: Array, default: []},
    phone: {type: Number},
    category: {type: String},
    supports: {type: Array, default: []},
    status: {type: Number, default: 1},
    recent_order_num: {type: Number, default: 0},
    rating_count: {type: Number, default: 0},
    rating: {type: Number},
    promotion_info: {type: String},
    piecewise_agent_fee: {type: Object},
    opening_hours: {type: Array, default: []},
    license: {type: Object},
    is_new: {type: Boolean, default: true},
    is_premium: {type: Boolean, default: true},
    image_path: {type: String},
    identification: {type: Object},
    float_minimum_order_amount: {type: Number},
    float_delivery_fee: {type: Number},
    distance: {type: String},
    order_lead_time: {type: String}
})

const ShopModel = mongoose.model('shops', shopSchema)

module.exports = ShopModel