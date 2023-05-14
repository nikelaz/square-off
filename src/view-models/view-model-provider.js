import React, { createContext, useContext, useState } from 'react';

const ViewModelContext = createContext(null);

export const ViewModelProvider = ({ children }) => {
  const [progress, setProgress] = useState(0);
  const [refImage, setRefImage] = useState(null);
  const [compImage, setCompImage] = useState(null);
  const [diffImage, setDiffImage] = useState(null);

  const submitHandler = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    const ipcRenderer = window.ipcRenderer;
  
    ipcRenderer.on('ComparisonController-compareUrls-reply', updateStatusOnReply);
    
    setProgress(1);
    ipcRenderer.send('ComparisonController-compareUrls', data);
  };

  const updateStatusOnReply = (e, args) => {
    if (args.progress) setProgress(args.progress);
    if (args.refImage) setRefImage(args.refImage);
    if (args.compImage) setCompImage(args.compImage);
    if (args.diffImage) setDiffImage(args.diffImage);
  };

  const model = {
    progress,
    refImage,
    compImage,
    diffImage,
    submitHandler
  };

  return (
    <ViewModelContext.Provider value={model}>
      { children }
    </ViewModelContext.Provider>
  );
};

export const useViewModel = () => useContext(ViewModelContext);