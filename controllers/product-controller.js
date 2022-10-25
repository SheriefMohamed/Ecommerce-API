const Product = require("../models/product-model");
const _ = require("lodash");

exports.postProduct = async (req, res) => {
  try {
    const product = new Product(
      _.pick(req.body, [
        "title",
        "description",
        "image",
        "category",
        "size",
        "color",
        "price",
      ])
    );
    const savedProduct = await product.save();
    res.status(200).send(savedProduct);
  } catch (err) {
    res.status(404).send(err);
  }
};
exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(201).send(updatedProduct);
  } catch (err) {
    res.status(404).send(err);
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndRemove(req.params.id);
    return res.status(201).send("Product deleted !");
  } catch (err) {
    res.status(404).send(err);
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    return res.status(201).send(product);
  } catch (err) {
    res.status(404).send(err);
  }
};

exports.getProducts = async (req, res) => {
    const qCategory = req.query.category
  try {
    let products;
    qCategory 
        ? products = await Product.find({category :  {
            $in: [qCategory]
        }})
        : products = await Product.find() 
    return res.status(201).send(products);
  } catch (err) {
    res.status(404).send(err);
  }
};
