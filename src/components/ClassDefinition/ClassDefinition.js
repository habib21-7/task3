import React, { useState } from 'react';
import { Input, Button } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import { useSelector, useDispatch } from 'react-redux';
import { addClass, editClass,deleteClass } from './classSlice';

const ClassDefinition = () => {
  const classes = useSelector((state) => state.classSlice.classes);
  const dispatch = useDispatch();
  const [newClass, setNewClass] = useState('');
  const [editingClassId, setEditingClassId] = useState(null);

  const handleAddClass = () => {
    if (editingClassId !== null) {
      dispatch(editClass({ id: editingClassId, name: newClass }));
      setEditingClassId(null);
    } else {
      dispatch(addClass(newClass));
    }
    setNewClass('');
  };

  const handleEditClick = (classId) => {
    const editingClass = classes.find((c) => c.id === classId);
    setEditingClassId(classId);
    setNewClass(editingClass.name);
  };

  const handleCancelEdit = () => {
    setEditingClassId(null);
    setNewClass('');
  };

  const handleDeleteClass = (classId) => {
    dispatch(deleteClass(classId));
  };

  return (
    <div>
      <div>
        <h2>Classes List</h2>
        <ul style={{ listStyle: 'none', padding: 0, fontSize: '20px' }}>
          {classes.map((classItem) => (
            <li key={classItem.id} style={{ display: 'flex', margin: '10px' }}>
              <span>
                <strong>{classItem.id}</strong>
              </span>
              <span>.</span>
              <span>
                {editingClassId === classItem.id ? (
                  <Input
                    style={{ width: '60%' }}
                    value={newClass}
                    onChange={(value) => setNewClass(value)}
                  />
                ) : (
                  <strong>{classItem.name}</strong>
                )}
              </span>
              <span>
                {editingClassId === classItem.id ? (
                  <>
                    <Button onClick={handleAddClass}>Save</Button>
                    <Button onClick={handleCancelEdit}>Cancel</Button>
                  </>
                ) : (
                  
                  <>
                    <Button onClick={() => handleEditClick(classItem.id)}>Edit</Button>
                    <Button onClick={() => handleDeleteClass(classItem.id)}>Delete</Button>
                  </>
                  
                )}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Input
          placeholder="Enter a new class"
          value={newClass}
          onChange={(value) => setNewClass(value)}
          style={{ width: '20%' }}
        />
        <Button onClick={handleAddClass}>
          {editingClassId !== null ? 'Save Edit' : 'Add'}
        </Button>
      </div>
    </div>
  );
};

export default ClassDefinition;
