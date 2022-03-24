import React, {useState} from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";

const ProductForm = (props) => {

    let [title,setTitle] = useState("");
    let [price,setPrice] = useState("");
    let [description,setDescription] = useState("");
    let [formErrors, setFormErrors] = useState({})


    const history = useHistory();

    const createProduct = (e)=>{
        e.preventDefault();

        let formInfo = {title, price, description};

        axios.post("http://localhost:8000/api/products",formInfo)
            .then(res=>{
                console.log("posting product-->", res);
                if(res.data.error){
                    setFormErrors(res.data.error.errors);
                } else {
                    props.setFormSubmitted(!props.formSubmitted)
                    
                    setTitle("");
                    setPrice("");
                    setDescription("");
                    setFormErrors({});

                    history.push("/")
                }
            })
            .catch(err=>{
                console.log("ERROR OCCUR! PRODUCT FORM->", err);
            })
    }

    return (
        <div>
            <form onSubmit={createProduct}>
                
                <div className="form-group">
                    <label htmlFor="">Title:</label>
                    <input type="text" name="" id="" className="form-control" onChange={(e)=>{setTitle(e.target.value)}} value={title} />
                    <p className="text-danger">{formErrors.title?.message}</p>
                </div>

                <div className="form-group">
                    <label htmlFor="">Price:</label>
                    <input type="number" name="" id="" className="form-control" onChange={(e)=>{setPrice(e.target.value)}} value={price} />
                    <p className="text-danger">{formErrors.price?.message}</p>

                </div>
                <div className="form-group">
                    <label htmlFor="">Description:</label>
                    <input type="text" name="" id="" className="form-control" onChange={(e)=>{setDescription(e.target.value)}} value={description} />
                    <p className="text-danger">{formErrors.description?.message}</p>

                </div>
                <input type="submit" value="Create" />
            </form>
        </div>
    );
};

export default ProductForm;