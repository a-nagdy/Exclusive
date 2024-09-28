import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductState {
  products: any[]; // Adjust the type based on your product structure
}

const initialState: ProductState = {
  products: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<any[]>) => {
      state.products = action.payload; // Ensure this is correctly setting the products
    },
  },
});

export const { setProducts } = productSlice.actions;

export default productSlice.reducer;
