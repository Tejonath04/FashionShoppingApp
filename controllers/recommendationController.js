const UserCreds = require('../models/UserCreds'); 
const Catalog = require('../models/Catalog'); 

async function ProductRecommendation(req, res) {
  try {
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({ error: 'Username is required in the request body' });
    }

    
    const user = await UserCreds.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const preferredCategory = user.preferredCategory;

    if (!preferredCategory) {
      
      const randomProducts = await Catalog.aggregate([{ $sample: { size: 10 } }]);
      return res.json(randomProducts);
    }

   
    const topProducts = await Catalog.find({ product_category: preferredCategory })
      .sort({ rank: 1 })
      .limit(10);

    if (topProducts.length === 0) {
      
      const randomProducts = await Catalog.aggregate([{ $sample: { size: 10 } }]);
      return res.json(randomProducts);
    }

    return res.json(topProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  ProductRecommendation,
};
