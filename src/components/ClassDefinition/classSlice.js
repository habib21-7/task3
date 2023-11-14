import { createSlice } from '@reduxjs/toolkit';

export const classSlice = createSlice({
  name: 'classSlice',
  initialState: {
    classes: [],
  },
  reducers: {
    addClass: (state, action) => {
      state.classes.push({
        id: state.classes.length + 1,
        name: action.payload,
      });
    },
    editClass: (state, action) => {
      const { id, name } = action.payload;
      const classToEdit = state.classes.find((c) => c.id === id);
      if (classToEdit) {
        classToEdit.name = name;
      }
    },
    deleteClass: (state, action) => {
      const id = action.payload;
      state.classes = state.classes.filter((classItem) => classItem.id !== id);
    },
  },
});

export const { addClass, editClass,deleteClass } = classSlice.actions;

export default classSlice.reducer;
