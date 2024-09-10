import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { EditorView } from '@codemirror/view';

const ConfigurationEditor = ({ value, onChange }) => {
  // Ensure value is always a string
  const stringValue = typeof value === 'string' ? value : JSON.stringify(value, null, 2);

  const handleChange = (newValue) => {
    onChange(newValue);
  };

  return (
    <CodeMirror
      value={stringValue}
      height="300px"
      extensions={[json(), EditorView.lineWrapping]}
      onChange={handleChange}
      theme="dark"
      basicSetup={{
        lineNumbers: true,
        foldGutter: true,
        highlightActiveLine: true,
        autocompletion: true,
      }}
    />
  );
};

export default ConfigurationEditor;