import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = Number(process.env.PAGINATION_LIMIT) || 8;
  const page = Number(req.query.pageNumber) || 1;

  const filter = {};

  // Search across name, brand, category and description
  if (req.query.keyword) {
    const regex = { $regex: req.query.keyword.trim(), $options: 'i' };
    filter.$or = [
      { name: regex },
      { brand: regex },
      { category: regex },
      { description: regex },
    ];
  }

  if (req.query.category) {
    filter.category = req.query.category;
  }

  const minPrice = Number(req.query.minPrice);
  const maxPrice = Number(req.query.maxPrice);
  if (minPrice > 0 || maxPrice > 0) {
    filter.price = {};
    if (minPrice > 0) filter.price.$gte = minPrice;
    if (maxPrice > 0) filter.price.$lte = maxPrice;
  }

  const minRating = Number(req.query.minRating);
  if (minRating > 0) {
    filter.rating = { $gte: minRating };
  }

  // Default keeps the curated seed order
  const sortMap = {
    price_asc: { price: 1 },
    price_desc: { price: -1 },
    rating: { rating: -1, numReviews: -1 },
    newest: { createdAt: -1 },
  };
  const sortBy = sortMap[req.query.sort] || { _id: 1 };

  const count = await Product.countDocuments(filter);
  const products = await Product.find(filter)
    .sort(sortBy)
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// @desc    List distinct product categories
// @route   GET /api/products/categories
// @access  Public
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Product.distinct('category');
  res.json(categories.sort());
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  // NOTE: checking for valid ObjectId to prevent CastError moved to separate
  // middleware. See README for more info.

  const product = await Product.findById(req.params.id);
  if (product) {
    return res.json(product);
  } else {
    // NOTE: this will run if a valid ObjectId but no product was found
    // i.e. product may be null
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  if (!name || !description || !brand || !category) {
    res.status(400);
    throw new Error('Name, description, craft house and category are required');
  }

  const numPrice = Number(price);
  const numStock = Number(countInStock);

  if (numPrice < 0 || numStock < 0) {
    res.status(400);
    throw new Error('Price and count in stock cannot be negative');
  }

  const product = new Product({
    name,
    price: numPrice || 0,
    user: req.user._id,
    image: image || '/images/placeholder.svg',
    brand,
    category,
    countInStock: numStock || 0,
    numReviews: 0,
    description,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  if (Number(price) < 0 || Number(countInStock) < 0) {
    res.status(400);
    throw new Error('Price and count in stock cannot be negative');
  }

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = Number(price);
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = Number(countInStock);

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Product already reviewed');
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);

  res.json(products);
});

export {
  getProducts,
  getCategories,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts,
};
