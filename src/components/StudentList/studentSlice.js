import { createSlice } from '@reduxjs/toolkit';

export const studentSlice = createSlice({
  name: 'studentSlice',
  initialState: {
    students: [],
  },
  reducers: {
    addStudent: (state, action) => {
      state.students.push(action.payload);
    },
    editStudent: (state, action) => {
      const { id, updatedStudent } = action.payload;
      const index = state.students.findIndex((student) => student.id === id);
      if (index !== -1) {
        state.students[index] = { ...state.students[index], ...updatedStudent };
      }
    },
    deleteStudent: (state, action) => {
      const id = action.payload;
      state.students = state.students.filter((student) => student.id !== id);
    },
  },
});

export const { addStudent, editStudent, deleteStudent } = studentSlice.actions;

export default studentSlice.reducer;
