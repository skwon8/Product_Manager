import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";


const EditProductForm = () => {

    let [productInfo, setProductInfo] = useState({
        title: "",
        price: "",
        description: ""
    })

    let { _id } = useParams();

    const history = useHistory();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/products/${_id}`)
            .then(res => {
                console.log("Response->", res);
                setProductInfo(res.data.product)
            })
            .catch(err => {
                console.log("ERROR OCCUR!->", err);
            })
    }, [])

    const changeHandler = (e) => {
        setProductInfo({
            ...productInfo,
            [e.target.name]: e.target.value
        })
    }


// Updating product button not working. 
    const updateProduct = (e) => {
        e.preventDefault();

        axios.put(`http://localhost:8000/api/products/update/${_id}`, productInfo)
            .then(res => {
                console.log("Updated ->", res)
                history.push('/')
            })
            .catch(err => {
                console.log("ERROR OCCUR IN UPDATE!", err)
            })
    }

    return (
        <div>
            
            <p>Edit Product: {productInfo.title}</p>  {/* how to change it to show product name */}
            <form onSubmit={updateProduct}>
                <div className="form-group">
                    <label htmlFor="">Title:</label>
                    <input type="text" name="title" id="" className="form-control" onChange = {changeHandler} value={productInfo.title}/>
                </div>
                <div className="form-group">
                    <label htmlFor="">Price:</label>
                    <input type="number" name="price" id="" className="form-control" onChange={changeHandler} value={productInfo.price} />
                </div>
                <div className="form-group">
                    <label htmlFor="">Description:</label>
                    <input type="text" name="description" id="" className="form-control" onChange={changeHandler} value={productInfo.description} />
                </div>
                <input type="submit" value="Update Product" />
            </form>
        </div>
    );
};

export default EditProductForm;