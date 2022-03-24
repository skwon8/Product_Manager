import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Link
} from "react-router-dom";

const AllProducts = (props) => {

    const [productList, setProductList] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/api/products")
            .then(res => {
                console.log("Response-->", res)
                setProductList(res.data.product);
            })
            .catch(err => {
                console.log("ERROR OCCUR!", err)
            })
    }, [props.formSubmitted])

    const deleteProduct = (productId) => {
        axios.delete(`http://localhost:8000/api/products/delete/${productId}`)
            .then(res => {
                console.log("res when deleting->", res)
                let filteredList = productList.filter((productObj) => {
                    return productObj._id !== productId
                })
                setProductList(filteredList)
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div>
            <h1>All Products</h1>
            {
                productList.map((productObj) => {
                    return (
                        <div className="card" key={productObj._id}>
                            <div className="card-body">
                                <h4 className="card-title"><Link to={`/${productObj._id}`}>{productObj.title}</Link></h4>
                                <p className="card-text">
                                    Price: {productObj.price}
                                </p>
                                <p className="card-text">
                                    Description: {productObj.description}
                                </p>
                                <br />
                                <Link to={`/${productObj._id}/edit`} className='btn btn-secondary m-3'>Edit {productObj.title}</Link>
                                <button onClick={() => { deleteProduct(productObj._id) }} className="btn btn-danger m-3">Delete</button>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
};

export default AllProducts;