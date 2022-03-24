import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react'
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";

import AllProducts from './components/AllProducts';
import ProductForm from './components/ProductForm';
import OneProductDetail from './components/OneProductDetail';
import EditProductForm from './components/EditProductForm';

function App() {

  let [formSubmitted, setFormSubmitted] = useState(false);

  return (
    <BrowserRouter>
      <div className="App container">
        <h1>Product Manager</h1>
        <Link to="/" className="btn btn-info m-1">Home</Link>
        <Link to="/new" className="btn btn-success m-1">Add Product</Link>

        <Switch>
          <Route exact path="/">
            <AllProducts formSubmitted={formSubmitted}></AllProducts>
          </Route>
          <Route exact path="/new">
            <ProductForm formSubmitted={formSubmitted} setFormSubmitted={setFormSubmitted}></ProductForm>
          </Route>
          <Route exact path="/:_id">
            <OneProductDetail></OneProductDetail>
          </Route>
          <Route exact path="/:_id/edit">
            <EditProductForm></EditProductForm>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
