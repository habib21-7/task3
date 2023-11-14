import {configureStore} from '@reduxjs/toolkit';
import classSlice from './components/ClassDefinition/classSlice'; 
import studentSlice from './components/StudentList/studentSlice';

export const store = configureStore({
    reducer: {
        classSlice: classSlice ,
        studentSlice: studentSlice,
    },
});