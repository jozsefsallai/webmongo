import CodeMirror from 'codemirror';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material-darker.css';
import 'codemirror/mode/javascript/javascript.js';

const defaultConfig = {
  lineNumbers: true,
  lineWrapping: true,
  indentUnit: 2,
  tabSize: 2,
  mode: 'javascript',
  theme: 'material-darker',
  autofocus: true,
  smartIndent: false
};

export {
  CodeMirror,
  defaultConfig
};
