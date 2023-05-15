import React from 'react';
import MainLayout from '../layouts/main-layout.jsx';
import { DiffEditor, loader } from "@monaco-editor/react";
import * as monaco from 'monaco-editor';
import { useViewModel } from '../../view-models/view-model-provider.js';

loader.config({ monaco });

const Code = () => {
  const model = useViewModel();

  return (
    <MainLayout>
      <DiffEditor
        height="calc(100vh - 52px)"
        originalLanguage="html"
        modifiedLanguage="html"
        original={model.refPageSource}
        modified={model.compPageSource}
        theme="vs-dark"
        options={{
          originalEditable: true
        }}
      />
    </MainLayout>
  );
};

export default Code;
