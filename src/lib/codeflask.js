import CodeFlask from 'codeflask';

function codeflask(element) {
  return new CodeFlask(element, {
    language: 'js',
    lineNumbers: true,
    defaultTheme: false
  });
}

export default codeflask;
