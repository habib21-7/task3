import {configureStore} from '@reduxjs/toolkit';
import classSlice from './components/ClassDefinition/classSlice'; 
import studentSlice from './components/StudentList/studentSlice';
import gradesSlice from './components/StudentList/gradesSlice';

export const store = configureStore({
    reducer: {
        classSlice: classSlice ,
        studentSlice: studentSlice,
        gradesSlice: gradesSlice,
    },
});