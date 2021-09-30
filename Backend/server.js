import express from 'express'
import dotenv from 'dotenv';
import connectDB from './config/db.js'
import colors from 'colors'; //For using custom color in console
import productRoute from './routes/productRoute.js';
import userRoute from './routes/userRoute.js';
import orderRoute from './routes/orderRoute.js';
import uploadRoutes from './routes/uploadRoutes.js'
import path from 'path';
import morgan from 'morgan';

/*Server Configuration*/
const app = express();
dotenv.config();
connectDB();
const PORT = process.env.PORT || 5000;
app.use(express.json());

/*It will show the routes api we hit on console*/
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}


/*Product,User and Order Routes*/
app.use('/api/products', productRoute);
app.use('/api/users', userRoute);
app.use('/api/orders', orderRoute);

/*Upload Image Route*/
app.use('/api/upload', uploadRoutes);

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

/*paypal route*/
app.get('/api/config/paypal', async (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))



/*After production mode for deployment*/
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname,'/Frontend/build')))
    
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname,'Frontend','build','index.html'))
    })
} else {
    app.get('/', (req, res) => {
        res.send('Api running..')
    })
}


/*Server Config*/
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on Port ${PORT}`.yellow.underline.bold)
})