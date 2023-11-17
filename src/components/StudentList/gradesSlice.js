import { createSlice } from '@reduxjs/toolkit';

export const gradesSlice = createSlice({
  name: 'gradesSlice',
  initialState: {
    grades: [],
  },
  reducers: {
    addGrade: (state, action) => {
      state.grades.push(action.payload);
    },
    editGrade: (state, action) => {
      const { studentId, classId, grade } = action.payload;
      const index = state.grades.findIndex(
        (entry) => entry.studentId === studentId && entry.classId === classId
      );
      if (index !== -1) {
        state.grades[index] = { ...state.grades[index], grade };
      }
    },
    deleteGrade: (state, action) => {
      const { studentId, classId } = action.payload;
      state.grades = state.grades.filter(
        (entry) => !(entry.studentId === studentId && entry.classId === classId)
      );
    },
  },
});

export const { addGrade, editGrade, deleteGrade } = gradesSlice.actions;

export default gradesSlice.reducer;
