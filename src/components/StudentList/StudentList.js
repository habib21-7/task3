import React, { useState } from 'react';
import { Input, Button, Table, Panel, Form, DatePicker, SelectPicker, Checkbox, Modal } from 'rsuite';
import { useSelector, useDispatch } from 'react-redux';
import { addStudent, editStudent, deleteStudent } from './studentSlice';
import { addGrade, editGrade, deleteGrade } from './gradesSlice';

const StudentList = () => {
  const students = useSelector((state) => state.studentSlice.students);
  const classes = useSelector((state) => state.classSlice.classes);
  const grades = useSelector((state) => state.gradesSlice.grades);
  const dispatch = useDispatch();
  const [editedStudentId, setEditedStudentId] = useState(null);
  const [studentName, setStudentName] = useState('');
  const [studentDOB, setStudentDOB] = useState(null);
  const [studentGender, setStudentGender] = useState('');
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [selectedStudentClasses, setSelectedStudentClasses] = useState([]);
  const [selectedStudentName, setSelectedStudentName] = useState('');
  const [localGrades, setLocalGrades] = useState({});

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
      studentGender
    ) {
      const previousClasses = students
        .find((student) => student.id === editedStudentId)?.classes || [];
  
      const removedClasses = previousClasses.filter(
        (prevClass) => !selectedClasses.includes(prevClass)
      );
  
      const updatedStudent = {
        name: studentName,
        dob: studentDOB.toLocaleDateString(),
        gender: studentGender,
        classes: selectedClasses,
      };
  
      dispatch(editStudent({ id: editedStudentId, updatedStudent }));

      removedClasses.forEach((removedClass) => {
        dispatch(deleteGrade({ studentId: editedStudentId, classId: removedClass }));
      });
  
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

  const handleDetailsClick = (rowData) => {
    setSelectedStudentId(rowData.id);
    setSelectedStudentName(rowData.name);
    setSelectedStudentClasses(rowData.classes || []);
    const initialGrades = {};
    rowData.classes.forEach((className) => {
      const gradeEntry = grades.find(
        (grade) => grade.studentId === rowData.id && grade.classId === className
      );
      initialGrades[className] = gradeEntry ? gradeEntry.grade : '';
    });
    setLocalGrades(initialGrades);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setLocalGrades({});
  };

  const handleSaveGrades = () => {
    selectedStudentClasses.forEach((className) => {
      const gradeEntryIndex = grades.findIndex(
        (grade) => grade.studentId === selectedStudentId && grade.classId === className
      );

      const newGradeEntry = {
        studentId: selectedStudentId,
        classId: className,
        grade: localGrades[className] || '',
      };

      if (gradeEntryIndex !== -1) {
        dispatch(editGrade(newGradeEntry));
      } else {
        dispatch(addGrade(newGradeEntry));
      }
    });

    setShowDetails(false);
    setLocalGrades({});
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
          <Table.Cell>
            {(rowData) => (
              <>
                <Button onClick={() => handleDetailsClick(rowData)}>Details</Button>
              </>
            )}
          </Table.Cell>
        </Table.Column>
        <Table.Column width={300}>
          <Table.HeaderCell>Action</Table.HeaderCell>
          <Table.Cell>
            {(rowData) => (
              <>
                <Button onClick={() => handleEditClick(rowData)}>Edit</Button>{' | '}
                <Button onClick={() => handleDeleteStudent(rowData.id)}>Delete</Button>
              </>
            )}
          </Table.Cell>
        </Table.Column>
      </Table>
      <>
        <Modal open={showDetails} onClose={handleCloseDetails}>
          <Modal.Header>
            <Modal.Title>{selectedStudentName}'s Classes & Grades</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedStudentClasses.length > 0 ? (
              selectedStudentClasses.map((className) => (
                <div key={className} style={{ display: 'flex' }}>
                  <h4>{className}:</h4>
                  <Input
                    name="grade"
                    placeholder="Grade"
                    value={localGrades[className] || ''}
                    onChange={(value) => setLocalGrades({ ...localGrades, [className]: value })}
                    style={{ width: '20%' }}
                  />
                </div>
              ))
            ) : (
              <div>No classes for the student {selectedStudentName}.</div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleSaveGrades} appearance="primary">
              Save Grades
            </Button>
            <Button onClick={handleCloseDetails} appearance="subtle">
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </>
      <Panel>
        <Form formValue={{ editedStudentId, studentName, studentDOB, studentGender }}>
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
              data={[
                { value: 'Male', label: 'Male' },
                { value: 'Female', label: 'Female' },
              ]}
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
                  style={{
                    marginRight: '20px',
                    marginBottom: '10px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Checkbox
                    value={classInfo.name}
                    checked={selectedClasses.includes(classInfo.name)}
                    onChange={(checked) =>
                      handleClassCheckboxChange(classInfo.name, checked)
                    }
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
