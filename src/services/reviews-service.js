import axios from "axios";
const BASE_URL = "http://localhost:4000";

const RESTAURANTS_API = `${BASE_URL}/api/restaurant`;
const REVIEWS_API = `${BASE_URL}/api/reviews`;

export const findAllReviews = () =>
    axios.get(`${REVIEWS_API}`)
        .then(response => response.data)

export const findAllReviewsForRestaurant = (restaurantid) =>
    axios.get(`${RESTAURANTS_API}/${restaurantid}/reviews`)
        .then(response => response.data);

export const findAllReviewsByCritic = (criticid) =>
    axios.get(`${BASE_URL}/users/${criticid}/reviews`)
        .then(response => response.data);

export const findReviewById = (reviewid) =>
    axios.get(`${REVIEWS_API}/${reviewid}`)
        .then(response => response.data);

export const createReview = (restaurantid, uid, review) =>
    axios.post(`${RESTAURANTS_API}/${restaurantid}/users/${uid}/reviews`, review)
        .then(response => response.data);

export const updateReview = (reviewid, review) =>
    axios.put(`${REVIEWS_API}/${reviewid}`, review)
        .then(response => response.data);

export const deleteReview = (reviewid) =>
    axios.delete(`${REVIEWS_API}/${reviewid}`)
        .then(response => response.data);
