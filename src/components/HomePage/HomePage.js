import React from 'react';
import { useSelector } from 'react-redux';

const HomePage = () => {
  const classes = useSelector((state) => state.classSlice.classes);
  const students = useSelector((state) => state.studentSlice.students);

  return (
    <div>
      <h1>Summary</h1>
      <h4>Classes: {classes.length}</h4>
      <h4>Students: {students.length}</h4>
    </div>
  );
}

export default HomePage;
