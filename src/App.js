import React,{useState} from 'react';
import {Routes, Route, useNavigate } from 'react-router-dom';
import { Container, Sidebar, Sidenav, Navbar, Nav,Header,Content} from 'rsuite';
import HomePage from './components/HomePage/HomePage';
import ClassDefinition from './components/ClassDefinition/ClassDefinition';
import StudentList from './components/StudentList/StudentList';
import StudentDetail from './components/StudentDetail/StudentDetail';
import AngleLeftIcon from '@rsuite/icons/legacy/AngleLeft';
import AngleRightIcon from '@rsuite/icons/legacy/AngleRight';
import GroupIcon from '@rsuite/icons/legacy/Group';
import PieChartIcon from '@rsuite/icons/PieChart';
import './App.css';
import Layout from './components/Layout';
import DashboardIcon from '@rsuite/icons/legacy/Dashboard';

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

const App = () => {

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
              <span style={{ marginLeft: 12 }}> Task3</span>
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
                <Route path='homepage' element={<HomePage />} />
                <Route path='classes' element={<ClassDefinition />} />
                <Route path='students' element={<StudentList />} />
              </Route>
            </Routes>
          </Content>
        </Container>
      </Container>
    </div>
  );
};

export default App;
