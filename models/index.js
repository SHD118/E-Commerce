// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  through: {
    model: ProductTag,
    unique: false
  },
})

// Categories have many Products
Product.belongsTo(Category, { 
  foreignKey: "category_id",
  onDelete: "CASCADE"
});

// Products belongToMany Tags (through ProductTag)
Category.hasMany(Product, { 
  foreignKey: "category_id",
});
// Tags belongToMany Products (through ProductTag)
Product.belongsToMany(Tag, {through: ProductTag }, {
  foreignKey: "ProductTag_id"
});
// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {through: ProductTag}, {
  foreignKey: "TagProduct_id"
});
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
