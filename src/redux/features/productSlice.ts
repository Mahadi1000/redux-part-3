import { IProduct } from "@/types/globalTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductState {
    products: IProduct[];
    status : boolean;
}

const initialState : ProductState = {
    products : [],
    status : true
}

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        addProduct : (state, action: PayloadAction<IProduct>)=>{
            state.products.push(action.payload)
        },
        removeProduct: (state, action: PayloadAction<IProduct>)=> {
            state.products = state.products.filter(product => product._id!== action.payload._id)
        }

    }
})
export const { addProduct, removeProduct }= productSlice.actions

export default productSlice.reducer