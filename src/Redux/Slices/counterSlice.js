import { createSlice } from '@reduxjs/toolkit' // imported from redux documentation


const initialState = { count: 0 }


const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
     setCountIncrement:(state)=>{
        state.count += 1;
     },
     setCountDecrement:(state)=>{
      state.count -= 1;
     },
     setCountToZero:(state) =>{
      state.count = 0;
     }
    },
  })
 
export const  {setCountIncrement , setCountDecrement , setCountToZero} = counterSlice.actions
export default counterSlice.reducer