import { GO_TO_PRODUCT } from "../constants";

const products = (state = {}, {
    id, title, img, text, type,
}) => {
    switch (type) {
    case GO_TO_PRODUCT:
        return {
            id,
            title,
            img,
            text,
        };
    default:
        return state;
    }
};

export default products;
