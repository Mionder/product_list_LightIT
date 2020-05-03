/* eslint-disable import/prefer-default-export */
import { GO_TO_PRODUCT } from "../constants";

export const setProduct = (id, title, img, text) => ({
    type: GO_TO_PRODUCT,
    id,
    title,
    img,
    text,
});

export const setUser = (name, token) => ({
    type: "SET_USER",
    name,
    token,
});
