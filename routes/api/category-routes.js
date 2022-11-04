const router = require('express').Router();
const { Category, Product } = require('../../models');
const { sync } = require('../../models/Product');

// The `/api/categories` endpoint

// ====================  Get ALL  ==================== 
router.get('/', async(req, res) => {
  // find all categories
  try {
    const category = await Category.findAll({
      // be sure to include its associated Products
      include:[
        {
          model: Product,
          attributes: ["id","product_name","price","stock","category_id"]
        }
      ]
    });
    // Successful responses
    res.status(200).json(category);
  } catch (err) {
    // Server error responses
    res.status(500).json(err);
  }
  
});
// ====================  Get BY ID  ==================== 
router.get('/:id',async (req, res) => {
  // find one category by its `id` value
  try {
    const category = await Category.findOne({
    // be sure to include its associated Products
    includ:[
      {
        model:Product,
        attributes:["id","product_name","price","stock","category_id"]
      }
    ]
  });
  if (!category) {
    // Client error responses
    res.status(404).json({message:"No product found with this ID"});
    return;
  }
  // Successful responses
  res.status(200).json(category);
  } catch (err) {
    // Server error responses
    res.status(500).json(err);
  }
});

// ====================  Post   ====================
router.post('/', async (req, res) => {
  try {
    // create a new category
    const category = await Category.create({
      category_name: req.body.category_name,
    });
    if (!category) {
      // Client error responses
      res.status(404).json({message:"No category created"});
      return;
    }
    // Successful responses
    res.status(200).json(category);

  } catch (err) {
    // Server error responses
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const category = await Category.update(req.body,{
      where:{
        id:req.params.id
      }
    });
    if (!category) {
      // Client error responses
      res.status(404).json({message:"No category created"});
      return;
    }
    // Successful responses
    res.status(200).json(category);
  } catch (err) {
    // Server error responses
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const category = await Category.destroy(req.body,{
      where:{
        id:req.params.id
      }
    });
    if (!category) {
      // Client error responses
      res.status(404).json({message:"No category created"});
      return;
    }
    // Successful responses
    res.status(200).json(category);
  } catch (err) {
    // Server error responses
    res.status(500).json(err);
  }
});

module.exports = router;
