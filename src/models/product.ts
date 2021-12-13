import { products } from "../data";

export const getAllProducts = (request, response) => {
    response.json(JSON.stringify(products));
}