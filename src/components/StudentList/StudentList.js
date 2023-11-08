import React, { useState } from 'react';
import { Input, Button, Checkbox, Table, Panel, Form, DatePicker,SelectPicker } from 'rsuite';

const StudentList = (props) => {
  const [studentName, setStudentName] = useState('');
  const [studentDOB, setStudentDOB] = useState(null);
  const [studentGender, setStudentGender] = useState('');
  const [selectedClasses, setSelectedClasses] = useState([]);


  const handleCreateStudent = () => {
    if (studentName && studentDOB && studentGender) {
      const newStudent = {
        name: studentName,
        dob: studentDOB.toLocaleDateString(), 
        gender: studentGender,
        classes: selectedClasses,
      };

      props.createdStudents(newStudent);

      setStudentName('');
      setStudentDOB(null); 
      setStudentGender('');
      setSelectedClasses([]);
    }
  };

  const handleClassCheckboxChange = (value, checked) => {
    if (checked) {
      setSelectedClasses([...selectedClasses, value]);
    } else {
      setSelectedClasses(selectedClasses.filter((name) => name !== value));
    }
  };

  return (
    <div>
      <h1>Students List</h1>
      <Table
        data={props.students}
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
        <Table.Column width={300}>
          <Table.HeaderCell>Classes</Table.HeaderCell>
          <Table.Cell dataKey="classes">
            {(rowData) => {
              return rowData.classes ? rowData.classes.join(', ') : 'No classes selected';
            }}
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
            <br />
            <h5>Classes</h5>
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
              {props.classes.map((classInfo) => (
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
            <Button appearance="primary" onClick={handleCreateStudent}>
              Add Student
            </Button>
          </div>
        </Form>
      </Panel>
    </div>
  );
};

export default StudentList;
