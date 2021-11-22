const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({ include: [{ model: Product }] });;
    
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findBypK(req.params.id, { include: [{ model: Product }] });
    if (!category) {
      res.status(404).json({ message: 'No category with this ID, please try enter a valid ID' });
      return;
    }
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
    
});

router.post('/', async (req, res) => {
  // create a new category
  try {
  const category = await Category.create(req.body.category_name)

  res.status(200).json(category);
} catch (err) {
  res.status(500).json(err);
}
  
});

router.put('/:id', async(req, res) => {
  // update a category by its `id` value
  try {
    const category = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    }) 
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
    
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const category = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!category) {
      res.status(404).json({ message: 'No category with this ID was found...' });
      return;
    }

    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
