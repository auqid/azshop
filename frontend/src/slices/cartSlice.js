import {createSlice} from '@reduxjs/toolkit'


const initialState = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : {cartItems:[]};
const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        //any functions that have to do with cart add remove
    }
})

export default cartSlice.reducer;