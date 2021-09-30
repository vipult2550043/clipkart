import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Message from '../Components/Message';
import Loader from '../Components/Loader';
import { listProducts } from '../actions/productAction';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { ADMIN_RESET_PRODUCT_DETAILS, ADMIN_CREATE_PRODUCT_RESET } from '../types/types';
import { adminDeleteProductAction, adminCreateProductAction } from '../actions/productAction';

const AdminProductsScreen = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [reload, setReload] = useState(false)
    const productID = '6152b31a3ecd22d03e6047eb'
    /*Getting isAdmin from login action and redirecting if user is not admin*/
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    /*Getting Product List from store productList*/
    const productList = useSelector(state => state.productList);
    const { loading, products, error } = productList;

    /*Getting Product List after deleting*/
    const adminProductDelete = useSelector(state => state.adminProductDelete);
    const { loading: productDeleteLoading, product, error: productDeleteError } = adminProductDelete;

    /*Getting dummy product from create product reducer*/
    /*Getting Product List after deleting*/
    const adminCreateProduct = useSelector(state => state.adminCreateProduct);
    const { successCreate, createdProduct, createdProductloading } = adminCreateProduct;




    useEffect(() => {
        /*Resetting product create*/
        dispatch({ type: ADMIN_CREATE_PRODUCT_RESET })

        if (userInfo) {
            if (!userInfo.isAdmin) {
                history.push('/')
            }
            if (successCreate) {


                /*If product create success if there then we will push to edit page*/
                history.push(`/admin/product/${createdProduct._id}/edit`)
            }
            else {
                dispatch(listProducts());

                /*Resetting product details to empty object*/
                dispatch({ type: ADMIN_RESET_PRODUCT_DETAILS })


            }
        }

    }, [history, userInfo, dispatch, reload, product, successCreate])

    /*Handler*/
    const deleteProductHandler = (productID, productName) => {
        if (window.confirm('Are you sure?')) {

            dispatch(adminDeleteProductAction(productID))

            toast.success(`Product removed ${productName}`, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000
            })

            /*Reloading Page after product is deleted*/
            setReload(!reload);
        }

    }

    const createProductHandler = () => {
        dispatch(adminCreateProductAction());

    }
    return (
        <>
            <ToastContainer />

            <Row className='align-items-center'>
                <Col>
                    <h1>PRODUCT LIST </h1>
                </Col>
                {loading ? '' : <>
                    <Col className='text-right' style={{ marginLeft: '45rem', marginBottom: '1rem' }}>
                        <Button className='my-3' type='submit' variant='primary' onClick={createProductHandler}>
                            <i className='fas fa-plus'></i> Create Product
                        </Button>
                    </Col>
                </>}

            </Row>

            {loading || productDeleteLoading || createdProductloading ? <Loader /> : error ? <Message variant='danger'>{error || productDeleteError}</Message> : (

                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>PRODUCT ID</th>
                            <th>PRODUCT NAME</th>
                            <th>PRICE</th>
                            <th>In Stock</th>
                            <th>BRAND</th>
                            <th>CATEGORY</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => {
                            return <tr key={product._id}>
                                <td style={{ textTransform: 'uppercase' }}>{product._id}</td>
                                <td>{product.name}</td>
                                <td><span style={{ fontFamily: 'Lucida Console", "Courier New", monospace' }}>&#8377;</span>{product.price}</td>
                                <td>{product.countInStock > 0 ? `${product.countInStock}` : 'Out of stock'}</td>
                                <td>{product.brand}</td>
                                <td>{product.category}</td>
                                <td>
                                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                        <Button className='btn-sm' variant='light'>
                                            <i className='fas fa-edit' ></i>
                                        </Button>
                                    </LinkContainer>
                                    <Button className='btn-sm' variant='danger' onClick={() => deleteProductHandler(product._id, product.name)}>
                                        <i className='fas fa-trash'></i>

                                    </Button>
                                </td>



                            </tr>
                        })}
                    </tbody>
                </Table>
            )}
        </>
    )
}

export default AdminProductsScreen
