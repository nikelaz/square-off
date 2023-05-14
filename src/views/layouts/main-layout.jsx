import React from 'react';
import TabsBar from '../components/tabs-bar/tabs-bar.jsx';

const MainLayout = ({children}) => (
  <>
    <TabsBar />
    {children}
  </>
);

export default MainLayout;
