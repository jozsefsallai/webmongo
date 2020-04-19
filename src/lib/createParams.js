export default function (params) {
  const output = new URLSearchParams();
  Object.keys(params).forEach(key => {
    output.append(key, params[key]);
  });
  return output;
}
