import React,{useState} from 'react';
import {Routes, Route, useNavigate } from 'react-router-dom';
import { Panel , Button} from 'rsuite';
import HomePage from './components/HomePage/HomePage';
import ClassDefinition from './components/ClassDefinition/ClassDefinition';
import StudentList from './components/StudentList/StudentList';
import StudentDetail from './components/StudentDetail/StudentDetail';
import './App.css';

const App = () => {

  const navigate = useNavigate();

  const panelStyle = {
    margin: '50px',
  }

  return (
    <Panel bordered header='Task3' style={panelStyle}>
      <Button onClick={() => navigate('/')}>Home</Button>
      <Button onClick={() => navigate('/classes')}>Classes</Button>
      <Button onClick={() => navigate('/students')}>Students</Button>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/classes' element={<ClassDefinition />} />
        <Route path='/students' element={<StudentList />} />
        <Route path='/students/:studentId' element={<StudentDetail />} />
      </Routes>
    </Panel>
  );
}

export default App;
