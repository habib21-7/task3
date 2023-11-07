import React, { useState } from 'react';
import { Input, Button } from 'rsuite';

const StudentList = (props) => {
  const [studentName, setStudentName] = useState('');
  const [studentDOB, setStudentDOB] = useState('');
  const [studentGender, setStudentGender] = useState('');
  const [selectedClasses, setSelectedClasses] = useState([]);

  const handleCreateStudent = () => {
    if (studentName && studentDOB && studentGender) {
      const newStudent = {
        name: studentName,
        dob: studentDOB,
        gender: studentGender,
        classes: selectedClasses,
      };

      props.createdStudents(newStudent);

      setStudentName('');
      setStudentDOB('');
      setStudentGender('');
      setSelectedClasses([]);
    }
  };

  const handleClassCheckboxChange = (e, className) => {
    if (e.target.checked) {
      setSelectedClasses([...selectedClasses, className]);
    } else {
      setSelectedClasses(selectedClasses.filter((name) => name !== className));
    }
  };

  return (
    <div>
      <h1>Students List</h1>
      <ul>
        {props.students.map((studentInfo) => (
          <li key={studentInfo.id}>
            Name: {studentInfo.name}
            <br />
            DOB: {studentInfo.dob}
            <br />
            Gender: {studentInfo.gender}
            <br />
            Classes: {studentInfo.classess ? studentInfo.classess.join(', ') : 'No classes selected'}
          </li>
        ))}
      </ul>
      <div style={{ display: 'flex', flexDirection: 'column', width: '20%' }}>
        <Input
          placeholder="Name"
          value={studentName}
          onChange={(value) => setStudentName(value)}
        />
        <Input
          placeholder="Date of Birth"
          value={studentDOB}
          onChange={(value) => setStudentDOB(value)}
        />
        <Input
          placeholder="Gender"
          value={studentGender}
          onChange={(value) => setStudentGender(value)}
        />
        <div>
          <h4>Select Classes:</h4>
          {props.classes.map((classInfo) => (
            <label key={classInfo.id}>
              <input
                type="checkbox"
                value={classInfo.name}
                onChange={(e) => handleClassCheckboxChange(e, classInfo.name)}
                checked={selectedClasses.includes(classInfo.name)}
              />
              {classInfo.name}
            </label>
          ))}
        </div>
        <Button onClick={handleCreateStudent}>Add</Button>
      </div>
    </div>
  );
};

export default StudentList;
