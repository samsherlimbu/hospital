import { createSlice } from '@reduxjs/toolkit'

const initialState = { 
    backgroundcolor:'red',
    with:50,
    height:50
}

const boxSlice = createSlice({
  name: 'box',
  initialState,
  reducers: {
    changeHeight(state){
        state.height = state.height+1
    }
  },
})

export const { changeHeight } = boxSlice.actions
export default boxSlice.reducer