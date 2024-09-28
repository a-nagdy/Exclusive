import { Dispatch } from "redux";

// Assuming you have a setUser action defined somewhere similar to your initial code
import { setUser } from "@/app/store/slices/userSlice";

interface FetchOptions {
  email: string;
  password: string;
  setIsError: (value: boolean) => void;
  setIsLoading: (value: boolean) => void;
  setErrorMessage: (message: string) => void;
}

// Dynamic function to fetch user data and dispatch to Redux
export const getUserData =
  ({
    email,
    password,
    setIsError,
    setIsLoading,
    setErrorMessage,
  }: FetchOptions) =>
  async (dispatch: Dispatch) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      if (!response.ok) {
        const errorData = await response.json(); // Assuming the error message is in JSON format
        setIsError(true);
        setIsLoading(false);
        setErrorMessage(errorData.message);
        return;
      }
      const data = await response.json();
      dispatch(setUser(data));
      
      setIsLoading(false);
      return data;
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
      setErrorMessage("An error occurred while fetching user data");
      // Dispatch an error action here as well, if needed
    }
  };
