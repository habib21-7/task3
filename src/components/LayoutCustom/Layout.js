import React from 'react';
import { Outlet } from 'react-router-dom';
import { Panel } from 'rsuite';

const Layout = ()=> {
    
    const panelStyle = {
        margin: '55px',
      }


  return (
    <Panel bordered style={panelStyle}>
        <Outlet />
    </Panel>
  );
}

export default Layout;
