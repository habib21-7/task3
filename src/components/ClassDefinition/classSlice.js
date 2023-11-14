import {createSlice} from '@reduxjs/toolkit';


export const classSlice = createSlice({
    name: 'classSlice',
    initialState: {
        id: 0,
        name: '',
    },
    reducers: {
        setClassDefintion: (state, action) => {
            state.name = state.name + action.payload;
        },
    },
});

export const {setClassDefintion} = classSlice.actions;

export default classSlice.reducer;