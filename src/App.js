import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import ContactData from './containers/Checkout/ContactData/ContactData';
import Orders from './containers/Orders/Orders';

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" exact element={<BurgerBuilder />} />
              <Route path="/checkout/*" exact element={<Checkout />}>
                <Route path="contact-data" element={<ContactData />} />
              </Route>
              <Route path="/orders" element={<Orders />} />
            </Routes>
          </Layout>
        </BrowserRouter>

      </div>
    );
  }
}

export default App;
