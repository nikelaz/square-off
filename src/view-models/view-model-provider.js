import React, { createContext, useContext, useState } from 'react';

const ViewModelContext = createContext(null);

export const ViewModelProvider = ({ children }) => {
  const [progress, setProgress] = useState(0);
  const [images, setImages] = useState(null);
  const [refPageSource, setRefPageSource] = useState('');
  const [compPageSource, setCompPageSource] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [viewports, setViewports] = useState([]);

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
    if (args.images) setImages(args.images);
    if (args.refPageSource) setRefPageSource(args.refPageSource);
    if (args.compPageSource) setCompPageSource(args.compPageSource);
    if (args.statusMessage) setStatusMessage(args.statusMessage);
    if (args.viewports) setViewports(args.viewports);
  };

  const model = {
    progress,
    images,
    refPageSource,
    compPageSource,
    viewports,
    statusMessage,
    submitHandler
  };

  return (
    <ViewModelContext.Provider value={model}>
      { children }
    </ViewModelContext.Provider>
  );
};

export const useViewModel = () => useContext(ViewModelContext);
