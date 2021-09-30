import ProductModel from '../models/ProductModel.js';
import asyncHandler from 'express-async-handler';


/*@desc Fetch all products*/
/* @route GET/api/products */
//@access Public
const getProducts = asyncHandler(async (req, res) => {
    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {};

    try {
        const products = await ProductModel.find({ ...keyword });
        res.status(200).send(products);

    } catch (e) {
        res.status(400).send(e.message);
    }
})


/*@desc Top products Carosel*/
/* @route GET/api/products/top */
//@access Public
const getTopProducts = asyncHandler(async (req, res) => {


    try {
        const products = await ProductModel.find({}).sort({ rating: -1 }).limit(3);
        res.status(200).send(products);

    } catch (e) {
        res.status(400).send(e.message);
    }
})


/*@desc Fetch single products*/
/* @route GET/api/products/:id */
//@access Public
const getProductById = asyncHandler(async (req, res) => {
    try {
        const item = await ProductModel.findById(req.params.id);
        if (item) {
            res.status(200).send(item)
        }
        else {
            res.status(404).send({ message: "Product Not Found!" })
        }
    } catch (e) {
        res.status(500).send(e.message);

    }
})


/*@desc Fetch all products*/
/* @route GET/api/products/admin */
//@access Private
const adminGetAllProduct = asyncHandler(async (req, res) => {
    try {
        const products = await ProductModel.find({});
        res.status(200).send(products);

    } catch (e) {
        res.status(400).send(e.message);
    }
})



/*@desc Delete product*/
/* @route DELETE/api/products/admin/:id */
//@access Private
const adminDeleteProductById = asyncHandler(async (req, res) => {
    try {
        const product = await ProductModel.findByIdAndDelete(req.params.id);
        res.status(200).send(product);

    } catch (e) {
        res.status(400).send(e.message);
    }
})



/*@desc Create single user*/
/* @route POST/api/user */
//@access Public

const adminCreateProduct = asyncHandler(async (req, res) => {
    try {
        const product = new ProductModel({
            user: req.user._id,
            name: 'Sample name',
            image: '/image/sample.jpg',
            brand: 'Sample brand',
            category: 'Sample categogry',
            description: 'Sample description',
            price: 0,
            countInStock: 0,
            numReviews: 0
        });
        const createdproduct = await product.save(); //Saving to Database
        if (createdproduct) {
            res.status(201).send(createdproduct);
        } else {
            res.status(401).send('Not Authorized');
        }
    } catch (e) {
        res.status(500).send(e.message)

    }

})


/*@desc Update product*/
/* @route PUT/api/products/admin/:id */
//@access Private
const adminUpdateProductById = asyncHandler(async (req, res) => {

    const { name, price, category, description, countInStock, brand, image } = req.body;
    try {
        const product = await ProductModel.findById(req.params.id);
        if (product) {
            product.name = name;
            product.price = price;
            product.brand = brand;
            product.description = description;
            product.category = category;
            product.image = image;
            product.countInStock = countInStock;

            const updateproduct = await product.save(); //saving to Database
            res.status(200).send(updateproduct);

        } else {
            res.status(404).send('Product Not Found');

        }

    } catch (e) {
        res.status(400).send(e.message);
    }
})


/*@desc Create product review*/
/* @route POST/api/products/:id */
//@access Private
const createProductReviewById = asyncHandler(async (req, res) => {

    const { rating, comment } = req.body;
    try {
        const product = await ProductModel.findById(req.params.id);

        if (product) {

            const alreadyReviewed = product.reviews.find(review => review.user.toString() === req.user._id.toString())

            if (alreadyReviewed) {
                res.status(400);
                throw new Error('Product already reviewed')
            }

            const review = {
                name: req.user.name,
                rating: Number(rating),
                comment,
                user: req.user._id,
                createdAt: Date.now()

            }
            /*Pusing data in reviews array*/
            product.reviews.push(review);
            product.numReviews = product.reviews.length;
            product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

            await product.save();
            res.status(201).send('Review Added')
        } else {
            res.status(404).send('Product Not Found');

        }

    } catch (e) {
        res.status(400).send(e.message);
    }
})



/*@desc Reset numreview*/
/* @route GET/api/products */
//@access Private
const resetNumReviews = asyncHandler(async (req, res) => {

    try {
        const product = await ProductModel.find({});

        if (product) {


            /*Pusing data in reviews array*/
            product.numReviews = product.reviews.length;

            res.status(200).send(product.numReviews)
        } else {
            res.status(404).send('Product Not Found');

        }

    } catch (e) {
        res.status(400).send(e.message);
    }
})

export { getTopProducts, resetNumReviews, createProductReviewById, adminUpdateProductById, adminCreateProduct, adminDeleteProductById, getProducts, adminGetAllProduct, getProductById };