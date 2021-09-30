import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap'
import { useHistory } from 'react-router';

const SearchBox = () => {
    const [keyword, setKeyword] = useState('');
    const history = useHistory();

    /*Handler*/
    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            history.push(`/search/${keyword}`)
            setKeyword('')
        } else {
            history.push('/')
        }
    }
    return (
        <>
            <Form inline onSubmit={(e) => e.preventDefault()}>
                <Form.Control
                    type='text'
                    name='q'
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder='Search Products...'
                    className='mr-sm-2 ml-sm-5'
                >
                </Form.Control>
            </Form>

            <Button className='p-2'
                variant='outline-success'
                onClick={submitHandler}
                style={{ marginLeft: '1rem' }}>
                Search
            </Button>
        </>

    )
}

export default SearchBox
