import React from 'react';

const ConditionalRenderer = ({ condition, children }) => (
  condition ? children : null
);

export default ConditionalRenderer;
