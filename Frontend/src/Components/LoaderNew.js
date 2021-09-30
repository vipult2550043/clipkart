import React from 'react';
import { Spinner } from 'react-bootstrap';

const LoaderNew = () => {
    return (
        <Spinner
            animation='grow'
            variant='dark'
            size="sm"
            style={{ width: '30px', height: '30px', margin: 'auto', display: 'block', color: '#383b39' }}>
            <span className='sr-only'>
                Loading..
            </span>

        </Spinner>

    )
}

export default LoaderNew
