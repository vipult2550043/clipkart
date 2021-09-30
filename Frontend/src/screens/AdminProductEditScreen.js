import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import FormContainer from '../Components/FormContainer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Message from '../Components/Message';
import Loader from '../Components/Loader';
import { Link } from 'react-router-dom';
import { detailsProduct, adminUpdateProductAction } from '../actions/productAction';
import { Form, Button } from 'react-bootstrap';

const AdminProductEditScreen = ({ match, history }) => {
    const productID = match.params.id;
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [countInStock, setCountInStock] = useState(0);
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('/sample/image.jpg');
    const [message, setMessage] = useState('')
    const [uploading, setUploading] = useState(false)


    const dispatch = useDispatch();

    /*Product Details List information*/
    const productDetails = useSelector(state => state.productDetails);
    const { product, loading } = productDetails;


    /*Product Update List information*/
    const adminUpdateProduct = useSelector(state => state.adminUpdateProduct);
    const { loading: updateProductLoading } = adminUpdateProduct;


    useEffect(() => {

        if (!product.name) {
            //Getting user profie by dispatching action
            dispatch(detailsProduct(productID));

        }
        else {
            setName(product.name);
            setPrice(product.price);
            setCountInStock(product.countInStock);
            setBrand(product.brand);
            setCategory(product.category);
            setDescription(product.description);
            setImage(product.image);
        }

    }, [dispatch, loading, product, productID]);

    /*File Upload Handler*/
    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        setUploading(true);

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            const { data } = await axios.post('/api/upload', formData, config);
            setImage(data);
            setUploading(false);
        } catch (error) {
            setUploading(false)
        }
    }

    const submitUpdateHandler = (e) => {
        e.preventDefault();

        /*Checking condition before updating the product*/
        if (name.length !== 0 && price && countInStock >= 0 && brand.length !== 0 && category.length !== 0 && description.length !== 0 && image.length !== 0) {
            dispatch(adminUpdateProductAction(productID, { name, price, countInStock, brand, category, description, image }))

            toast.success(`Product updated ${name}`, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000
            })
            setMessage('');
        }
        else {
            setMessage('Enter details in all fields')
        }

    }
    return (
        <>
            <Link className='btn btn-light my-2' to='/admin/products' style={{ textDecoration: 'underline' }}>Go Back</Link>

            <FormContainer>
                <h1> Edit Product</h1>
                <ToastContainer />
                {loading || updateProductLoading ? <Loader /> : ''}
                {message ? <Message variant='danger'>{message}</Message> : ''}
                <Form onSubmit={submitUpdateHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label >Product Name</Form.Label>
                        <Form.Control
                            type='productName'
                            placeholder='Enter product name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='price'>
                        <Form.Label >Price</Form.Label>
                        <Form.Control
                            type='number'
                            placeholder='Enter price'
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='countInStock'>
                        <Form.Label >In Stock</Form.Label>
                        <Form.Control
                            type='number'
                            placeholder='Qty In Stock'
                            value={countInStock}
                            onChange={(e) => setCountInStock(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='image'>
                        <Form.Label >Product Image</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter image url'
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                        >
                        </Form.Control>
                        <Form.File id='image_file'
                            lable='Choose File'
                            custom
                            onChange={uploadFileHandler}>
                        </Form.File>
                        {uploading && <Loader />}
                    </Form.Group>

                    <Form.Group controlId='brand'>
                        <Form.Label >Brand</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Brand Name'
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>


                    <Form.Group controlId='description'>
                        <Form.Label >Description</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Product Description'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>


                    <Form.Group controlId='category'>
                        <Form.Label >Category</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Category'
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Button type='submit' variant='primary' style={{ marginTop: '1rem' }}>
                        Update
                    </Button>
                </Form>


            </FormContainer>
        </>
    )
}

export default AdminProductEditScreen
