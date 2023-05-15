import React from 'react';
import TopBar from '../components/top-bar/top-bar.jsx';

const MainLayout = ({children}) => (
  <>
    <TopBar />
    { children }
  </>
);

export default MainLayout;
