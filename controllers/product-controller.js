const Product = require("../models/product-model");
const _ = require("lodash");
const imageController = require('./images-controller');

exports.postProduct = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).send("Please provide an image !");
    }
    const product = new Product(
      _.pick(req.body, [
        "title",
        "description",
        "category",
        "size",
        "color",
        "price",
        "qty"
      ])
    );
    const image = await imageController.UploadImage(req.file.path);
    product.images.push(image);
    const savedProduct = await product.save();
    res.status(200).send(savedProduct);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
exports.updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate('images');
    if (!product) {
      return res.status(404).send("Product not found!");
    }
    let productUpdates = req.body;
    productUpdates.images = product.images;
    if (req.file) {
      const image = await imageController.UploadImage(req.file.path)
      productUpdates.images.push(image)
    }
    productUpdates = await Product.findByIdAndUpdate(req.params.id, productUpdates, {
      new: true,
    }).populate('images');
    res.status(201).send(productUpdates);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndRemove(req.params.id).populate('images');
    if (!product) {
      return res.status(404).send("Product not found!");
    }
    product.images.map(async image => {
      await imageController.deleteImage(image.imgUrl,image._id);
    })
    return res.status(201).send("Product deleted !");
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate('images');
    return res.status(201).send(product);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getProducts = async (req, res, next) => {
    const qCategory = req.query.category
  try {
    let products;
    qCategory 
        ? products = await Product.find({category :  {
            $in: [qCategory]
        }})
        : products = await Product.find().populate('images');
    return res.status(201).send(products);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
