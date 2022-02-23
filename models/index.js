// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
// Product.belongsTo(Category, {
//   through: {
//     model: ProductTag,
//     unique: false
//   },
// })

// Categories have many Products
Product.belongsTo(Category, { 
  foreignKey: "category_id",
 
});

// Products belongToMany Tags (through ProductTag)
Category.hasMany(Product, { 
  foreignKey: "category_id",
  onDelete: "CASCADE"
});
// Tags belongToMany Products (through ProductTag)
Product.belongsToMany(Tag,
  { 
  through: {
    model: ProductTag,
    unique: false
    },
    as: 'product_to_tag',
})
 
 

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product , {
  through: {
    model: ProductTag,
    unique: false
    },
    as: 'tag_to_product',
  // foreignKey: "TagProduct_id"
});
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
