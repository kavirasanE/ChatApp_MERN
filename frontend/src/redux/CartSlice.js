import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    Items: localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : []
};
const CartSlice = createSlice({
    initialState,
    name: "cart",
    reducers: {

    }
})

export default CartSlice;