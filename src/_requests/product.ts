import { AxiosResponse } from "axios";
import { ProductsQueryResponse } from "src/@types/product";
import { shopClient } from "src/_clients";

export async function productsQuery(id?: number): Promise<AxiosResponse<ProductsQueryResponse>> {
    return shopClient.get(`/products/${id || ""}`)
}