import mongoose from "mongoose";
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import products from "./data/products.js";
import UserModel from './models/UserModel.js';
import ProductModel from './models/ProductModel.js'
import OrderModel from './models/OrderModel.js';
import connectDB from "./config/db.js";

dotenv.config();
connectDB();
const importData = async () => {
    try {
        await OrderModel.deleteMany();
        await UserModel.deleteMany();
        await ProductModel.deleteMany();
        const createdUsers = await UserModel.insertMany(users);
        const adminUser = createdUsers[0]._id;

        const sampleProducts = products.map((product) => {
            return {...product,user:adminUser}
        })
        await ProductModel.insertMany(sampleProducts);
        console.log('Data Imported'.green.inverse);
        process.exit();
    } catch (e) {
        console.log(`${e}`.red.inverse);
        process.exit(1);
    }
}

const destroyData = async () => {
    try {
        await OrderModel.deleteMany();
        await UserModel.deleteMany();
        await ProductModel.deleteMany();
        
        console.log('Data Destroyed'.red.inverse);
        process.exit();
    } catch (e) {
        console.log(`${e}`.red.inverse);
        process.exit(1);
    }
}
if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}