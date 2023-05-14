import React from 'react';
import FormBar from '../components/form-bar/form-bar.jsx';

const FormLayout = ({children}) => (
  <>
    <FormBar />
    {children}
  </>
);

export default FormLayout;
