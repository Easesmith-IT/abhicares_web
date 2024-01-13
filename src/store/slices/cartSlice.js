import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const initialState = {
  userId: "",
  items: [],
  totalPrice: 0,
  isCart: false,
  cartId: "",
  isLoading: true,
};

export const getCartDetails = createAsyncThunk("/cart/details", async () => {
  try {
    const res = axios.get(`${process.env.REACT_APP_API_URL}/cart-details`, {
      withCredentials: true,
    });

    const response = await res;
    console.log("cart details", response.data);
    return response.data;
  } catch (error) {
    if (error?.response?.data?.tokenExpired) {
      localStorage.removeItem("userName");
      localStorage.removeItem("userPhone");
    //   toast.error("Your session was expired!");
      return;
    }
    toast.error(error?.response?.data?.message);
  }
});

export const addItemToCart = createAsyncThunk(
  "/cart/add-item",
  async (data) => {
    console.log(data.id);
    try {
      const res = axios.post(
        `${process.env.REACT_APP_API_URL}/add-item-cart`,
        {
          itemId: data.id,
          type: data.type,
          // quantity: data.quantity,
          // userId:data.userId
        },
        { withCredentials: true }
      );

      const response = await res;
      console.log("add-item to cart", response);
      return response.data;
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  }
);

export const updateQty = createAsyncThunk(
  "/cart/update-item-quantity",
  async (data) => {
    try {
      const res = axios.post(
        `${process.env.REACT_APP_API_URL}/update-item-quantity/${data.id}`,
        {
          quantity: data.quantity,
        },
        { withCredentials: true }
      );

      const response = await res;
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  }
);

export const deleteItemFromCart = createAsyncThunk(
  "/cart/remove-item",
  async (data) => {
    try {
      const res = axios.post(
        `${process.env.REACT_APP_API_URL}/remove-cart-item/${data?.itemId}`,
        { type: data.type },
        { withCredentials: true }
      );

      const response = await res;
      console.log("delete", response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    changeCartLoadingState: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCartDetails.fulfilled, (state, action) => {
      if (action?.payload?.data) {
        state.isCart = true;
        state.items = action?.payload?.data;
        state.totalPrice = action?.payload?.totalOfferPrice;
        // state.cartId = action?.payload?.data[0]._id
      } else {
        state.isCart = false;
        state.items = [];
      }
    });
  },
});

export default cartSlice.reducer;
export const { changeCartLoadingState } = cartSlice.actions;
