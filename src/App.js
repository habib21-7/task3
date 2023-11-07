import React,{useState} from 'react';
import {Routes, Route, useNavigate } from 'react-router-dom';
import { Container, Sidebar, Sidenav, Navbar, Nav,Header,Content} from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import HomePage from './components/HomePage/HomePage';
import ClassDefinition from './components/ClassDefinition/ClassDefinition';
import StudentList from './components/StudentList/StudentList';
import AngleLeftIcon from '@rsuite/icons/legacy/AngleLeft';
import AngleRightIcon from '@rsuite/icons/legacy/AngleRight';
import GroupIcon from '@rsuite/icons/legacy/Group';
import PieChartIcon from '@rsuite/icons/PieChart';
import Layout from './components/LayoutCustom/Layout';
import DashboardIcon from '@rsuite/icons/legacy/Dashboard';
import './App.css';

const App = () => {

  const [classesNum, setClassesNum] = useState(0);
  const [studentsNum, setStudentsNum] = useState(0);

  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);


  const handleCreateClass = (newClass) => {
    if (newClass) {
      const newClassObj = { 
        id: classes.length + 1, name: newClass 
      };
      setClasses([...classes, newClassObj]);
      setClassesNum(classesNum + 1);
    }
  };

  const handleCreateStudent = (newStudent) => {
    if (newStudent) {
      const newStudentObj = { 
        id: students.length + 1, 
        name: newStudent.name,
        dob:newStudent.dob,
        gender:newStudent.gender,
        classess:newStudent.classes
      };
      setStudents([...students, newStudentObj]);
      setStudentsNum(studentsNum + 1);
    };
  }

  const headerStyles = {
    padding: 18,
    fontSize: 16,
    height: 56,
    background: '#2F4F4F',
    color: ' #fff',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  };
  
  const NavToggle = ({ expand, onChange }) => {
    return (
      <Navbar appearance="subtle" className="nav-toggle">
        <Nav pullRight>
          <Nav.Item onClick={onChange} style={{ width: 56, textAlign: 'center' }}>
            {expand ? <AngleLeftIcon /> : <AngleRightIcon />}
          </Nav.Item>
        </Nav>
      </Navbar>
    );
  };

  const navigate = useNavigate();

  const [expand, setExpand] = React.useState(true);
  return (
    <div className="show-fake-browser sidebar-page">
      <Container>
        <Sidebar
          style={{ display: 'flex', flexDirection: 'column' }}
          width={expand ? 260 : 56}
          collapsible
        >
          <Sidenav.Header>
            <div style={headerStyles}>
              <span style={{ marginLeft: 12 }}>Student Data Hub</span>
            </div>
          </Sidenav.Header>
          <Sidenav expanded={expand} defaultOpenKeys={['3']} appearance="subtle">
            <Sidenav.Body>
              <Nav>
                <Nav.Item eventKey="1" active icon={<DashboardIcon/>} onClick={() => navigate('/layout/homepage')}>
                  Home
                </Nav.Item>
                <Nav.Item eventKey="2" icon={<PieChartIcon />} onClick={() => navigate('/layout/classes')}>
                  Classes
                </Nav.Item>
                <Nav.Item eventKey="3" icon={<GroupIcon />} onClick={() => navigate('/layout/students')}>
                  Students
                </Nav.Item>
              </Nav>
            </Sidenav.Body>
          </Sidenav>
          <NavToggle expand={expand} onChange={() => setExpand(!expand)} />
        </Sidebar>
        <Container>   
          <Header ></Header>
          <Content>
            <Routes>
              <Route path='/layout' element={<Layout />}>
                <Route path='homepage' element={<HomePage createdClasses={handleCreateClass} classesNumber={classesNum}/>} />
                <Route path='classes' element={<ClassDefinition createdClasses={handleCreateClass} classesNumber={classesNum} classes={classes}/>} />
                <Route path='students' element={<StudentList createdStudents={handleCreateStudent} studentsNumber={studentsNum} students={students} classes={classes}/>} />
              </Route>
            </Routes>
          </Content>
        </Container>
      </Container>
    </div>
  );
};

export default App;
