import { setProducts } from "@/app/store/slices/productSlice";
import { Dispatch } from "redux";

interface FetchOptions {
  limit: number;
  page: number;
  setIsLoading: (value: boolean) => void;
  setIsError: (value: boolean) => void;
  setErrorMessage: (message: string) => void;
}

export const getProductsData =
  ({ limit, page, setIsLoading, setIsError, setErrorMessage }: FetchOptions) =>
  async (dispatch: Dispatch) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products?limit=${limit}&page=${page}`
      );
      if (!response.ok) {
        const errorData = await response.json();
        setIsError(true);
        setIsLoading(false);
        setErrorMessage(errorData.message);
        return;
      }
      const data = await response.json();
      setIsLoading(false);
      dispatch(setProducts(data.products)); // Dispatch the products array specifically
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
      setErrorMessage("An error occurred while fetching product data");
    }
  };
