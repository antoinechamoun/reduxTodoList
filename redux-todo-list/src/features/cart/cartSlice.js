import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { showModal } from "../modal/modalSlice";
import axios from "axios";
const url = "https://course-api.com/react-useReducer-cart-project";

const initialState = {
  cartItems: [],
  amount: 0,
  total: 0,
  isLoading: false,
};

export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  async (example, thunkAPI) => {
    try {
      //   console.log(example);
      //   console.log(thunkAPI);
      //   console.log(thunkAPI.getState());
      //   thunkAPI.dispatch(showModal());
      const res = await axios.get(url);
      return res.data;
    } catch (er) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    increase: (state, { payload }) => {
      const itemId = payload;
      const item = state.cartItems.find((item) => item.id === itemId);
      item.amount += 1;
    },
    decrease: (state, { payload }) => {
      const itemId = payload;
      const item = state.cartItems.find((item) => item.id === itemId);
      item.amount -= 1;
    },
    calculateTotals: (state) => {
      const amount = state.cartItems.reduce((prev, item) => {
        prev = prev + item.amount;
        return prev;
      }, 0);
      const total = state.cartItems.reduce((prev, item) => {
        prev = prev + item.price * item.amount;
        return prev;
      }, 0);
      state.total = total;
      state.amount = amount;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCartItems.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCartItems.fulfilled, (state, action) => {
      state.cartItems = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getCartItems.rejected, (state, action) => {
      console.log(action);
      state.isLoading = false;
    });
  },
});

export const { clearCart, removeItem, increase, decrease, calculateTotals } =
  cartSlice.actions;

export default cartSlice.reducer;
