import React, {useState} from "react";
import * as service from "../../services/reviews-service";
import Tuit from "../tuits/tuit";

export const Review = () => {
    const testReviews = [
        {restaurantid: "123", uid: "123", reviewid: "1234", review: "Great restaurant!"},
        {restaurantid: "123", uid: "456", reviewid: "2345", review: "Decent price for its quality"},
        {restaurantid: "123", uid: "789", reviewid: "3456", review: "Amazing"}
    ]

    const findAllReviews = (restaurantid) =>
        service.findAllReviews(restaurantid);

    const createReview = (restaurantid, uid, review) =>
        service.createReview(restaurantid, uid, review)
            .then(findAllReviews(restaurantid));

    const updateReview = (restaurantid, uid, reviewid, review) =>
        service.updateReview(restaurantid, uid, reviewid, review)
            .then(findAllReviews(restaurantid));

    const deleteReview = (restaurantid, uid, reviewid) =>
        service.deleteReview(restaurantid, uid, reviewid)
            .then(findAllReviews(restaurantid));

    const [review, setReview] = useState({review: ''});
    const reviewChangeHandler = (event) => {
        const currentReview = event.target.value;
        const newReview = {
            review: currentReview
        };
        setReview(newReview);
    }


    return (
        <div>
            <h2>Professional Reviews</h2>
            <input placeholder={"Input review here"}
                   onChange={reviewChangeHandler}
                   value={review.review}/>
            <button onClick={createReview}>Submit</button>
            <ul>
                {
                    testReviews.map && testReviews.map(item => {
                        return (
                            <Tuit tuit={item.review}/>
                        );
                    })
                }
            </ul>
        </div>
    )
}