const exceljs = require('exceljs');
const Catalog = require('../models/Catalog'); 

async function getRandomRecords() {
  const count = await Catalog.countDocuments();
  const randomRecords = await Catalog.aggregate([{ $sample: { size: 10 } }]);
  return randomRecords;
}

async function loadData(req, res) {
  try {
  
    await Catalog.deleteMany();

    // Load data from Excel
    const workbook = new exceljs.Workbook();
    await workbook.xlsx.readFile('ProductCatalog.xlsx');
    const worksheet = workbook.getWorksheet(1);

    const data = [];
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber > 1) {
        const rowValues = row.values;
        const catalogEntry = {
          product_id: rowValues[1],
          product_category: rowValues[2],
          rank: rowValues[3],
          brand_name: rowValues[4],
          product_description: rowValues[5],
          price: rowValues[6],
          image_link: rowValues[7],
        };
        data.push(catalogEntry);
      }
    });

    
    await Catalog.insertMany(data);

    // Filter data based on search keyword
    const { searchKeyword, price_min, price_max } = req.body;
    const filter = {
      brand_name: { $regex: new RegExp(searchKeyword, 'i') }, 
    };

    
    if (price_min !== undefined && price_max !== undefined) {
      filter.price = { $gte: price_min, $lte: price_max };
    }

    
    let result = await Catalog.find(filter).sort({ rank: 1 });

    
    if (result.length === 0) {
      result = await getRandomRecords();
    }

    res.json(result.slice(0, 10)); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  loadData,
};
