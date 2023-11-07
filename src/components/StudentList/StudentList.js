import React, { useState } from 'react';
import { Input, Button } from 'rsuite';

const StudentList = (props) => {
  const [studentName, setStudentName] = useState('');
  const [studentDOB, setStudentDOB] = useState('');
  const [studentGender, setStudentGender] = useState('');
  const [studentClasses, setStudentClasses] = useState([]);

  const handleCreateStudent = () => {
    if (studentName && studentDOB && studentGender) {
      const newStudent = {
        name: studentName,
        dob: studentDOB,
        gender: studentGender,
        classes: studentClasses, 
      };
      
      props.createdStudents(newStudent);

      setStudentName('');
      setStudentDOB('');
      setStudentGender('');
      setStudentClasses([]); 
    }
  };

  return (
    <div>
      {/* <ul>
        {props.students.map((studentInfo) => (
          <li key={studentInfo.id}>
            Name: {studentInfo.name}
          </li>
        ))}
      </ul> */}
      <h1>Students</h1>
      <Input
        placeholder="Name"
        value={studentName}
        onChange={(value) => setStudentName(value)}
        style={{ width: '20%' }}
      />
      <Input
        placeholder="Date of Birth"
        value={studentDOB}
        onChange={(value) => setStudentDOB(value)}
        style={{ width: '20%' }}
      />
      <Input
        placeholder="Gender"
        value={studentGender}
        onChange={(value) => setStudentGender(value)}
        style={{ width: '20%' }}
      />
      <br />
      <Button onClick={handleCreateStudent}>Add</Button>
    </div>
  );
};

export default StudentList;
