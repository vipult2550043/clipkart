import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

const ProtectedRoute = ({ Cmp}) => {
    const history = useHistory()

    useEffect(() => {
        if (!localStorage.getItem('userInfo')) {
            history.push('/login')
        }
    }, [])

    return (
        <div>
            <Cmp />
        </div>
    )
}

export default ProtectedRoute
