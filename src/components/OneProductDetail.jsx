import React, {useState, useEffect} from 'react';
import { useParams } from "react-router";
import axios from 'axios';
import { useHistory } from "react-router-dom";

const OneProductDetail = () => {

    const {_id} = useParams();
    const [info, setInfo] = useState({})
    const history = useHistory();

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/products/${_id}`)
            .then(res=>{
                console.log("Response->", res)
                setInfo(res.data.product);
            })
            .catch(err=>{
                console.log("ERROR OCCUR!->", err)
            })

    }, [])

    // delete button doesn't work
    const deleteProduct = ()=>{
        console.log("Deleting Product ID->", _id)
        axios.delete(`http://localhost:8000/api/products/delete/${_id}`)
            .then(res=>{
                console.log(res);
                history.push("/");
            })
            .catch(err=>{
                console.log(err)
            })
    }

    return (
        <div>
            <h2>{info.title}</h2>
            <p>Price: {info.price}</p>
            <p>Description: <b>{info.description}</b></p>
            <button onClick = {deleteProduct} className='btn btn-danger'>Delete {info.title}</button>
        </div>
    ); 
};

export default OneProductDetail;