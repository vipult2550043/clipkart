import OrderModel from '../models/OrderModel.js';
import asyncHandler from 'express-async-handler';

/*@desc Create new order*/
/* @route POST/api/order */
//@access Private
const addOrderItems = async (req, res) => {
    try {
        const {
            orderItems,
            itemPrice,
            shippingPrice,
            paymentMethod,
            taxPrice,
            totalPrice,
            shippingAddress } = req.body;
        

        if (orderItems===undefined || !Object.keys(orderItems).length ) {
            throw new Error('No Items present');
        }
        else {
            const order = await OrderModel.create({
                orderItems,
                user: req.user._id,
                itemPrice,
                shippingPrice,
                paymentMethod,
                taxPrice,
                totalPrice,
                shippingAddress

            })
            res.status(201).send(order);
        }

    } catch (e) {
        res.status(400).send(e.message);
    }
}


/*@desc Fetch All Placed Order Details*/
/* @route GET/api/orders/admin */
//@access Private
const getAllPlacedOrder = async (req, res) => {
    try {
        const order = await OrderModel.find({})
        if (order) {
            res.status(200).send(order)
        }
        else {
            res.status(404).send({ message: "Order Not Found!" })
        }
    } catch (e) {
        res.status(400).send(e.message);
    }
}


/*@desc Fetch Placed Order Details by ID*/
/* @route GET/api/order/:id */
//@access Private
const getSinglePlacedOrder = async (req, res) => {
    try {
        const order = await OrderModel.findById(req.params.id).populate('user','name email') //user name we take from order model ref populate creates an reference between order and user and it will attach name and email of that user
        if (order) {
            res.status(200).send(order)
        }
        else {
            res.status(404).send({ message: "Order Not Found!" })
        }
    } catch (e) {
        res.status(400).send(e.message);
    }
}


/*@desc Get order paid update */
/* @route GET/api/orders/:id/pay */
//@access Private
const updateOrderToPaid = async (req, res) => {
    try {
        const order = await OrderModel.findById(req.params.id);
        if (order) {
            order.isPaid = true;
            order.paidAt = Date.now();
            order.paymentResult = {
                id: req.body.id,
                status: req.body.status,
                update_time: req.body.update_time,
                email_address: req.body.payer.email_address
            }
            const updatedOrder = await order.save();
            res.status(200).send(updatedOrder)
        }
        else {
            res.status(404).send({ message: "Order Not Found!" })
        }
    } catch (e) {
        res.status(400).send(e.message);
    }
}

/*@desc Get orders for user */
/* @route GET/api/orders/allorder */
//@access Public
const getAllUserOrders = async (req, res) => {
    try {
        const orders = await OrderModel.find({user:req.user._id }); //checking by user id for all orders by a user

        if (orders) {
            res.status(200).send(orders)

        }
       else{
            res.status(404).send({ message: "Order Not Found!" })
        }
    } catch (e) {
        res.status(400).send(e.message);
    }
}

/*@desc Get orders for user */
/* @route GET/api/orders/allorder/admin */
//@access Private
const adminGetAllUserOrders = async (req, res) => {
    try {
        const orders = await OrderModel.find({ }); 

        if (orders) {
            res.status(200).send(orders)

        }
        else {
            res.status(404).send({ message: "Order Not Found!" })
        }
    } catch (e) {
        res.status(400).send(e.message);
    }
}
export { adminGetAllUserOrders,addOrderItems, getAllPlacedOrder, getSinglePlacedOrder, updateOrderToPaid, getAllUserOrders }