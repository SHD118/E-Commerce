const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tag = await Tag.findAll({ include: [{ model: Product }] });
    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tag = await Tag.findByPk(req.params.id, { include: [{ model: Product }] });


    if (!tag) {
      res.status(404).json({ message: 'No Tag with this ID, please try enter a valid ID' });
      return;
    }


  res.status(200).json(tag);
} catch (err) {
  res.status(500).json(err);
}
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tag = await Tag.create(req.body.category_name)

    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json(err);
  }

});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tag = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    })

    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json(err);
  }
  
});


router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  try {
    const tag = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!tag) {
      res.status(404).json({ message: 'No Tag with this ID, please try enter a valid ID' });
      return;
    }

    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
