const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
// ====================  Get ALL  ====================
router.get('/', async(req, res) => {
   // find all tags
   try {
    const tag = await Tag.findAll({
      // be sure to include its associated Products
      include:[
        {
          model: Product,
          attributes: ["id","product_name","price","stock","category_id"]
        }
      ]
    });
    // Successful responses
    res.status(200).json(tag);
  } catch (err) {
    // Server error responses
    res.status(500).json(err);
  }
});
// ====================  Get BY ID  ====================
router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
   try {
    const tag = await Tag.findAll({
      // be sure to include its associated Products
      where:{
        id:req.params.id
      },
      include:[
        {
          model: Product,
          attributes: ["id","product_name","price","stock","category_id"]
        }
      ]
    });
    // Successful responses
    res.status(200).json(tag);
  } catch (err) {
    // Server error responses
    res.status(500).json(err);
  }
});

// ====================  Post   ====================
router.post('/', async(req, res) => {
  // create a new tag
  try {
    const tag = await Tag.create({
      tag_name:req.body.tag_name
    });
    if (!tag) {
      // Client error responses
      res.status(404).json({message:"No category created"});
      return;
    }
    // Successful responses
    res.status(200).json(tag);

  } catch (err) {
    // Server error responses
    res.status(500).json(err);
  }
});

// ====================  PUT   ====================
router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tag = await Tag.update(req.body,{
      where:{
        id:req.params.id
      }
    });
    if (!tag) {
      // Client error responses
      res.status(404).json({message:"No tag created"});
      return;
    }
    // Successful responses
    res.status(200).json(tag);

  } catch (err) {
    // Server error responses
    res.status(500).json(err);
}
});

// ====================  Destroy   ====================
router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tag = await Tag.destroy({
      where: {
        id:req.params.id
      }
    });
    if (!tag) {
      // Client error responses
      res.status(404).json({message:"No tag created"});
      return;
    }
    // Successful responses
    res.status(200).json(tag);

  } catch (err) {
    // Server error responses
    res.status(500).json(err);
  }
});

module.exports = router;
