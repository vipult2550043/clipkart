import mongoose from "mongoose";


const reviewSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' 

    },
    createdAt: {
        type: Date,
        default:Date.now()
    }

}, {
    timsestamps: true
});

const productSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' //Add relationship between product

    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true,
        trim: true

    },
    category: {
        type: String,
        required: true

    },
    description: {
        type: String,
        required: true

    },
    reviews: [reviewSchema],

    rating: {
        type: Number,
        required: true,
        default: 0

    },
    numReviews: {
        type: Number,
        required: true,
        default: 0

    },
    price: {
        type: Number,
        required: true,
        default: 0

    },
    countInStock: {
        type: Number,
        required: true,
        default: 0

    }
}, {
    timestamps: true
})

const Product = mongoose.model('Product', productSchema);

export default Product;