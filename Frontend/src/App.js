import React from "react";
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from './screens/ProductScreen';
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import UserProfileScreen from "./screens/UserProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import RegisterUserScreen from './screens/UserRegisterScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import PlacedOrderDetailScreen from './screens/PlacedOrderDetailScreen';
import AdminOrdersScreen from './screens/AdminOrdersScreen';
import AdminUsersScreen from './screens/AdminUsersScreen';
import AdminProductsScreen from './screens/AdminProductsScreen';
import ProtectedRoute from "./Components/ProtectedRoute";
import AdminUserEditScreen from './screens/AdminUserEditScreen';
import AdminProductEditScreen from './screens/AdminProductEditScreen';
import AdminOrderEditScreen from './screens/AdminOrderEditScreen';



const App = () => {


  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Switch>
          <>
            <Container>
              <Route path='/login' exact component={LoginScreen}></Route>
              <Route path='/register' exact component={RegisterUserScreen}></Route>

              <Route path='/profile' exact >
                <ProtectedRoute Cmp={UserProfileScreen} />
              </Route>

              <Route path='/shipping' exact >
                <ProtectedRoute Cmp={ShippingScreen} />
              </Route>

              <Route path='/payment' exact >
                <ProtectedRoute Cmp={PaymentScreen} />
              </Route>

              <Route path='/placeorder' exact >
                <ProtectedRoute Cmp={PlaceOrderScreen} />
              </Route>

              <Route path='/product/:id' exact component={ProductScreen}></Route>
              <Route path='/cart/:id?' exact component={CartScreen}></Route>
              <Route path='/orders/:id' exact component={PlacedOrderDetailScreen}></Route>


              <Route path='/admin/orders' exact >
                <ProtectedRoute Cmp={AdminOrdersScreen} />
              </Route>

              <Route path='/admin/users' exact >
                <ProtectedRoute Cmp={AdminUsersScreen} />
              </Route>

              <Route path='/admin/products' exact >
                <ProtectedRoute Cmp={AdminProductsScreen} />
              </Route>

              <Route path='/admin/user/:id/edit' exact component={AdminUserEditScreen}></Route>
              <Route path='/admin/product/:id/edit' exact component={AdminProductEditScreen}></Route>
              <Route path='/admin/order/:id/edit' exact component={AdminOrderEditScreen}></Route>
              <Route path='/search/:keyword' exact component={HomeScreen}></Route>
              <Route path='/' exact component={HomeScreen}></Route>
            </Container>
          </>
        </Switch>
      </main>

      <Footer />
    </Router >
  );
}

export default App;
