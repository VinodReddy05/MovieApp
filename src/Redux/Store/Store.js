import { configureStore } from '@reduxjs/toolkit' // import from redux documentation
import counterReducer from "../Slices/counterSlice"



export const store = configureStore({  //this as well import from redux
    reducer: {
        counter:counterReducer,
        

    } })

