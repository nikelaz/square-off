import React from 'react';
import MainLayout from '../layouts/main-layout.jsx';
import { DiffEditor } from "@monaco-editor/react";
import { useViewModel } from '../../view-models/view-model-provider.js';

const Index = () => {
  const model = useViewModel();

  return (
    <MainLayout>
      <DiffEditor
        height="90vh"
        originalLanguage="html"
        modifiedLanguage="html"
        original={model.refPageSource}
        modified={model.compPageSource}
        theme="vs-dark"
      />
    </MainLayout>
  );
};

export default Index;
