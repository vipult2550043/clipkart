import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'react-bootstrap'
import Rating from './Rating';
import { Link } from 'react-router-dom';
const Products = ({ product }) => {
    return (
        <Card className='my-3 p-3 rounded' id='mainScreenCard' >
            <Link to={`/product/${product._id}`}>
                <Card.Img src={product.image} variant='top' style={{ width: '15rem', height: '14rem', objectFit: 'fit' }}></Card.Img>
            </Link>
            <Card.Body>
                <Link to={`/product/${product._id}`}>
                    <Card.Title as='div'>
                        <strong>{product.name}</strong>
                    </Card.Title>

                    <Card.Text as='div'>
                        <Rating
                            value={product.rating}
                            text={`${product.numReviews} reviews`}
                        >
                        </Rating>
                    </Card.Text>
                    <Card.Text as='h3'><span style={{ fontFamily: 'Lucida Console", "Courier New", monospace' }}>&#8377;</span>{product.price}</Card.Text>
                </Link>
            </Card.Body>
        </Card>
    )
}
//Sending color props as default value
Rating.defaultProps = {
    color: '#f8e825'
}
Rating.propTypes = {
    value: PropTypes.number,
    text: PropTypes.string.isRequired,
    color: PropTypes.string
}
export default Products
