const mongoose = require('mongoose');

const catalogSchema = new mongoose.Schema({
    product_id: String,
    product_category: String,
    rank: Number,
    brand_name:String,
    product_description: String,
    price: Number,
    image_link: String
});

module.exports = mongoose.model('Catalog', catalogSchema);
