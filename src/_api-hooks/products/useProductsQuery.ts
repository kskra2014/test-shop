
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { ErrorResponse } from 'src/@types/ErrorResponse';
import { ProductsQueryResponse } from 'src/@types/product';
import { productsQuery } from 'src/_requests/product';


type productsQueryType = {
  id?: number,
}

export function useProductsQuery(
  queryFnArgs: productsQueryType,
  options?: UseQueryOptions<AxiosResponse<ProductsQueryResponse>, ErrorResponse>,
) {
  const queryKey = ["nursesQuery", JSON.stringify(queryFnArgs)];

  return useQuery<AxiosResponse<ProductsQueryResponse>, ErrorResponse>(
    queryKey,
    async (): Promise<AxiosResponse<ProductsQueryResponse>> => productsQuery(queryFnArgs.id),
    options
  );
}
