import CodeFlask from 'codeflask';
import 'codeflask/build/css/editor.min.css';

function codeflask(element) {
  return new CodeFlask(element, {
    language: 'js',
    lineNumbers: true,
    defaultTheme: false,
    csp: true
  });
}

export default codeflask;
