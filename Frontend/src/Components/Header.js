import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { userLogout } from '../actions/userAction';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom'
import { RESET_CART_ITEM_AFTER_ORDER } from '../types/types';
import SearchBox from './SearchBox';


const Header = () => {
    const userSelector = useSelector(state => state.userLogin);
    const { userInfo } = userSelector;
    const dispatch = useDispatch();
    const history = useHistory();

    const logoutHandler = () => {
        dispatch(userLogout());

        localStorage.removeItem('shippingAddress');
        
        /*Removing cart items after logout*/
        dispatch({ type: RESET_CART_ITEM_AFTER_ORDER })

        toast.success(`Logged Out Successfully`, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000
        })

        history.push('/');
        
    }

    return (
        <header>
            <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect style={{height:'5.5rem'}}>
                <Container>
                    <ToastContainer />
                    <LinkContainer to='/'>
                        <Navbar.Brand >CLIPKART</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <SearchBox/>
                        <Nav className="ml-auto" style={{ marginLeft: '36rem' }}>
                            <LinkContainer to='/cart'>
                                <Nav.Link >Cart<i className='fas fa-shopping-cart' style={{ marginLeft: '0.5rem' }}></i></Nav.Link>
                            </LinkContainer>

                            {userInfo && userInfo.isAdmin ? <>
                            
                                {userInfo ? <NavDropdown title={userInfo.name.split(' ')[0] } id='adminUser'>
                                  
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>
                                            Profile
                                        </NavDropdown.Item>
                                    </LinkContainer>
                            
                                    <LinkContainer to='/admin/orders'>
                                        <NavDropdown.Item>
                                            Orders
                                        </NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to='/admin/users'>
                                        <NavDropdown.Item>
                                            Users
                                        </NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to='/admin/products'>
                                        <NavDropdown.Item>
                                            Products
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>  : <>
                                    <LinkContainer to='/login'>
                                        <Nav.Link>{userInfo ? userInfo.name : 'Sign In'}<i className='fas fa-user' style={{ marginLeft: '0.5rem' }}></i></Nav.Link>
                                    </LinkContainer>
                                </>}
                            </> : <>
                                
                                    {userInfo ? <NavDropdown title={userInfo.name.split(' ')[0]} id='username'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>
                                            Profile
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown> : <>
                                    <LinkContainer to='/login'>
                                        <Nav.Link>{userInfo ? userInfo.name.split(' ')[0] : 'Sign In'}<i className='fas fa-user' style={{ marginLeft: '0.5rem' }}></i></Nav.Link>
                                    </LinkContainer>
                                </>}

                            </>}

                            
                        </Nav>
                    </Navbar.Collapse>

                </Container>
            </Navbar>
        </header>
    )
}

export default Header
