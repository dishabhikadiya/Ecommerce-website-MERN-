const mongoose = require("mongoose");
const Product = require("../Model/productModel.js");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const sendEmail = require("../utils/sendEmail");
const User = require("../Model/userModel");
// create Admin

exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});
// get all product
exports.getAllProductsss = catchAsyncErrors(async (req, res, next) => {
  console.log("--------------------------------", req.query);
  const resultperpage = 10;
  let productCount = await Product.countDocuments();
  // console.log("productCount", productCount);
  let apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultperpage);
  const products = await apiFeature.query;

  let filteredProductsCount = products.length;

  apiFeature.pagination(resultperpage);

  products = await apiFeature.query.clone();

  res.status(200).json({
    success: true,
    products,
    productCount,
    resultperpage,
    filteredProductsCount,
  });
});
//  update product --admin

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHander("product not found", 404));
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  return res.status(200).json({
    success: true,
    product,
    productCount,
  });
});

exports.getAllProducts = catchAsyncErrors(async (req, res) => {
  console.log("333333333", req.query);
  const resultPerPage = 8;
  const productsCount = await Product.countDocuments();

  console.log("productsCount", productsCount);

  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter();

  let products = await apiFeature.query;
  console.log("products", products);

  let filteredProductsCount = products.length;

  apiFeature.pagination(resultPerPage);

  products = await apiFeature.query.clone();
  console.log("products77777", products);

  return res.status(200).json({
    success: true,
    products,
    // productsCount,
    resultPerPage,
    filteredProductsCount,
  });
});
// get all product details
exports.getProductdetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  console.log("getProductdetails", req.params.id);
  if (!product) {
    return next(new ErrorHander("product not found", 404));
  }
  res.status(200).json({
    success: true,
    product,
    // productCount,
  });
});
// delete product
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findByIdAndDelete({
    _id: req.params.id,
  });
  console.log("id ===", req.params.id, product);

  await product.remove();

  res.status(200).json({
    success: true,
    message: product ? "delete" : "notdelete",
  });
});
// Get All Reviews of a product
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// Create New Review or Update the review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  console.log("=====", req.body);

  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(req.params.id);
  console.log("product", product);
  // console.log("productID", productId);
  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );
  console.log("isReviewed", isReviewed);

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    console.log("-------", product);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Delete Review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});
