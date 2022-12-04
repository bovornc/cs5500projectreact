import React, {useEffect, useState} from "react";
// import { createFeature,deleteFeature } from "./featured-item-reducer";
import {useDispatch, useSelector} from "react-redux";
import {
    createFeaturedItemThunk,
    deleteFeaturedItemThunk, findAllFeaturedItemsThunk, findFeaturedItemsByRestaurantThunk
} from "../../../services/featured-item-thunks";
import {
    findAllFeaturedItems,
    findFeaturedItemsByRestaurant
} from "../../../services/featured-item-service";
import {useLocation} from "react-router-dom";
import {findRestaurantByIdThunk} from "../../../services/restaurants-thunks";

const EditFeature = () => {
    const {features} = useSelector(state=> state.features);

    const [editFood,setFood] = useState("");
    const [editPrice,setPrice] = useState("");
    const [editPhoto,setPhoto] = useState("emptyFood.jpeg");
    const [editPopular,setPopular] = useState(false);
    const dispatch = useDispatch();

    const {pathname} = useLocation();
    const paths = pathname.split('/');
    const restId = paths[paths.length-2];
    // console.log(restId);

    useEffect(  () => {
        dispatch(findFeaturedItemsByRestaurantThunk(restId));
    }, [dispatch, restId])

    const foodChangeHandler = (event) => {
        setFood(event.target.value);
        console.log(editFood);
    }

    const priceChangeHandler = (event) => {
        setPrice(event.target.value);
    }

    const photoChangeHandler = (event) => {
        setPhoto(event.target.files[0].name);
    }

    const popularChangeHandler = (event) => {
        setPopular(event.target.checked);
    }

    const createFeatureHandler = () => {
        const newFeature = {
            food: editFood,
            price: editPrice,
            photo: editPhoto,
            popular: editPopular,
            restaurant: restId
        }
        console.log(newFeature);
        dispatch(createFeaturedItemThunk(newFeature));
    }

    const deleteFeatureHandler = (featureId) => {
        dispatch(deleteFeaturedItemThunk(featureId));
    }

    return (
        <div className="ttr-border p-2 mb-3">
            <label className="fw-bolder p-2">Featured Items</label>
            {/* map item */}
            <ul>
                {
                features.map(feature =>
                    <li key={feature._id} className="border-0 list-group-item">
                        <div className="ttr-border row p-2 mb-3 m-1">
                            <div className="col-4 align-self-center">
                                <img className="card-img-top ttr-card-photo" alt="foodPic"
                                    src={`../images/${feature.photo}`}/>
                            </div>
                            <div className="col-7">
                                <div>Menu Item Name:</div>
                                <input id="itemName" value={feature.food}
                                    className="p-0 form-control" readOnly/>
                                <div>Menu Item Price:</div>
                                <input id="itemPrice" value={feature.price}
                                    className="p-0 form-control" readOnly/>
                                <input id="popularItem" type="checkbox" name="popularItem"
                                       checked = {feature.popular === true ? 'checked': ''} readOnly/>
                                <label className="p-2" htmlFor="popularItem">Popular Item</label>
                            </div>
                            {/* delete button */}
                            <div className="col-1 p-0 align-self-center ">
                                <i className="btn fa-regular fa-trash-can"
                                    onClick={()=>deleteFeatureHandler(feature._id)}> </i>
                            </div>
                        </div>
                    </li>
                )
                }
            </ul>
            {/* add new item */}
            <div className="ttr-border row p-2 mb-3 m-1">
                <div className="col-5 align-self-center">
                    <input type="file" id="foodPic" onChange={photoChangeHandler}
                    accept="image/jpeg, image/png, image/jpg"/>
                </div>
                <div className="col-7">
                    <div>Menu Item Name:</div>
                    <input id="itemName" value={editFood} 
                        onChange={foodChangeHandler}
                        className="p-0 form-control"/>
                    <div>Menu Item Price:</div>
                    <input id="itemPrice" value={editPrice} onChange={priceChangeHandler}
                        className="p-0 form-control"/>
                    <input id="popularItem" type="checkbox" onChange={popularChangeHandler}
                        name="popularItem" checked={editPopular}/>
                    <label id="popularItem" className="p-2">Popular Item</label>
                </div>
            </div>

            <div className="row justify-content-center">
                <button onClick={createFeatureHandler} type="button"
                className="col-3 btn btn-sm btn-secondary">Add Menu Item</button>
            </div>
        </div>
    )
};
export default EditFeature;