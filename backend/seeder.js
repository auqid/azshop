import dotenv from 'dotenv';
import 'colors'; // extends String.prototype with the colour helpers used below
import users from './data/users.js';
import products from './data/products.js';
import reviewsByProduct from './data/reviews.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;
    const userIdByName = Object.fromEntries(
      createdUsers.map((u) => [u.name, u._id])
    );

    const sampleProducts = products.map((product) => {
      const seedReviews = (reviewsByProduct[product.name] || []).map((r) => ({
        name: r.user,
        user: userIdByName[r.user],
        rating: r.rating,
        comment: r.comment,
      }));

      const rating =
        seedReviews.length > 0
          ? Math.round(
              (seedReviews.reduce((acc, r) => acc + r.rating, 0) /
                seedReviews.length) *
                10
            ) / 10
          : 0;

      return {
        ...product,
        user: adminUser,
        reviews: seedReviews,
        numReviews: seedReviews.length,
        rating,
      };
    });

    await Product.insertMany(sampleProducts);

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
