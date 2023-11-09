import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartList: JSON.parse(localStorage.getItem("cartList")) || [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCartRequest: (state, action) => {
      const { data } = action.payload;
      const newCartList = [...state.cartList];
      const productExistIndex = state.cartList.findIndex(
        (item) => item.productId === data.productId
      );
      if (productExistIndex !== -1) {
        newCartList.splice(productExistIndex, 1, {
          ...newCartList[productExistIndex],
          quantity: newCartList[productExistIndex].quantity + data.quantity,
        });
      } else {
        newCartList.unshift(data);
      }
      state.cartList = newCartList;
      localStorage.setItem("cartList", JSON.stringify(newCartList));
    },
    updateCartRequest: (state, action) => {
      const { productId, quantity } = action.payload;
      const newCartList = [...state.cartList];
      const index = state.cartList.findIndex(
        (item) => item.productId === productId
      );
      newCartList.splice(index, 1, {
        ...newCartList[index],
        quantity: quantity,
      });
      state.cartList = newCartList;
      localStorage.setItem("cartList", JSON.stringify(newCartList));
    },
    deleteCartRequest: (state, action) => {
      const { productId } = action.payload;
      const newCartList = state.cartList.filter(
        (item) => item.productId !== productId
      );
      state.cartList = newCartList;
      localStorage.setItem("cartList", JSON.stringify(newCartList));
    },
    clearCartRequest: (state, action) => {
      state.cartList = [];
      localStorage.setItem("cartList", JSON.stringify([]));
    },
  },
});

export const {
  addToCartRequest,
  updateCartRequest,
  deleteCartRequest,
  clearCartRequest,
} = cartSlice.actions;

export default cartSlice.reducer;
