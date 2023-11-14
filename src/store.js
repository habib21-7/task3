import {configureStore} from '@reduxjs/toolkit';
import classSlice from './components/ClassDefinition/classSlice'; 

export const store = configureStore({
    reducer: {
        classSlice: classSlice ,
    },
});