import React, { useState } from 'react';
import { Input, Button, Table, Panel, Form, DatePicker, SelectPicker, Checkbox } from 'rsuite';
import { useSelector, useDispatch } from 'react-redux';
import { addStudent, editStudent, deleteStudent } from './studentSlice';

const StudentList = () => {
  const students = useSelector((state) => state.studentSlice.students);
  const classes = useSelector((state) => state.classSlice.classes);
  const dispatch = useDispatch();
  const [editedStudentId, setEditedStudentId] = useState(null);
  const [studentName, setStudentName] = useState('');
  const [studentDOB, setStudentDOB] = useState(null);
  const [studentGender, setStudentGender] = useState('');
  const [selectedClasses, setSelectedClasses] = useState([]);

  const handleCreateStudent = () => {
    if (studentName && studentDOB && studentGender && selectedClasses.length > 0) {
      const newStudent = {
        id: Date.now(),
        name: studentName,
        dob: studentDOB.toLocaleDateString(),
        gender: studentGender,
        classes: selectedClasses,
      };

      dispatch(addStudent(newStudent));

      setStudentName('');
      setStudentDOB(null);
      setStudentGender('');
      setSelectedClasses([]);
    }
  };

  const handleEditStudent = () => {
    if (
      editedStudentId !== null &&
      studentName &&
      studentDOB &&
      studentGender &&
      selectedClasses.length > 0
    ) {
      const updatedStudent = {
        name: studentName,
        dob: studentDOB.toLocaleDateString(),
        gender: studentGender,
        classes: selectedClasses,
      };

      dispatch(editStudent({ id: editedStudentId, updatedStudent }));

      setEditedStudentId(null);
      setStudentName('');
      setStudentDOB(null);
      setStudentGender('');
      setSelectedClasses([]);
    }
  };

  const handleDeleteStudent = (id) => {
    dispatch(deleteStudent(id));
  };

  const handleEditClick = (student) => {
    setEditedStudentId(student.id);
    setStudentName(student.name);
    setStudentDOB(new Date(student.dob));
    setStudentGender(student.gender);
    setSelectedClasses(student.classes || []);
  };

  const handleClassCheckboxChange = (value, checked) => {
    if (checked && !selectedClasses.includes(value)) {
      setSelectedClasses([...selectedClasses, value]);
    } else {
      setSelectedClasses(selectedClasses.filter((name) => name !== value));
    }
  };

  return (
    <div>
      <h1>Students List</h1>
      <Table
        data={students}
        virtualized={true}
        height={400}
        autoHeight={true}
        style={{ width: '100%' }}
      >
        <Table.Column width={200}>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.Cell dataKey="name" />
        </Table.Column>
        <Table.Column width={200}>
          <Table.HeaderCell>DOB</Table.HeaderCell>
          <Table.Cell dataKey="dob" />
        </Table.Column>
        <Table.Column width={100}>
          <Table.HeaderCell>Gender</Table.HeaderCell>
          <Table.Cell dataKey="gender" />
        </Table.Column>
        <Table.Column width={200}>
          <Table.HeaderCell>Classes</Table.HeaderCell>
          <Table.Cell dataKey="classes">
            {(rowData) => {
              return rowData.classes ? rowData.classes.join(', ') : 'No classes selected';
            }}
          </Table.Cell>
        </Table.Column>
        <Table.Column width={100}>
          <Table.HeaderCell>Action</Table.HeaderCell>
          <Table.Cell>
            {(rowData) => (
              <span>
                <a onClick={() => handleEditClick(rowData)}>Edit</a> |{' '}
                <a onClick={() => handleDeleteStudent(rowData.id)}>Delete</a>
              </span>
            )}
          </Table.Cell>
        </Table.Column>
      </Table>
      <Panel>
        <Form formValue={{ studentName, studentDOB, studentGender }}>
          <div style={{ display: 'flex' }}>
            <Input
              name="studentName"
              placeholder="Name"
              onChange={(value) => setStudentName(value)}
              style={{ width: '20%' }}
            />
            <DatePicker
              name="studentDOB"
              placeholder="Date of Birth"
              format="yyyy-MM-dd"
              value={studentDOB}
              onChange={(value) => setStudentDOB(value)}
              style={{ width: '20%' }}
              cleanable={false}
            />
            <SelectPicker
              name="studentGender"
              placeholder="Gender"
              data={[{ value: 'Male', label: 'Male' }, { value: 'Female', label: 'Female' }]}
              value={studentGender}
              onChange={(value) => setStudentGender(value)}
              style={{ width: '20%' }}
            />
          </div>
          <div>
            <h5>Classes</h5>
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
              {classes.map((classInfo) => (
                <label
                  key={classInfo.id}
                  style={{ marginRight: '20px', marginBottom: '10px', display: 'flex', alignItems: 'center' }}
                >
                  <Checkbox
                    value={classInfo.name}
                    checked={selectedClasses.includes(classInfo.name)}
                    onChange={(checked) => handleClassCheckboxChange(classInfo.name, checked)}
                  />
                  <span style={{ marginLeft: '5px' }}>{classInfo.name}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            {editedStudentId !== null ? (
              <Button appearance="primary" onClick={handleEditStudent}>
                Save Edit
              </Button>
            ) : (
              <Button appearance="primary" onClick={handleCreateStudent}>
                Add Student
              </Button>
            )}
          </div>
        </Form>
      </Panel>
    </div>
  );
};

export default StudentList;
