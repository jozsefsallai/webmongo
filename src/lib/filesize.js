export default function fileSize(bytes) {
  const units = ['B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
  const i = bytes === 0 ? 0 : Math.floor(Math.log(bytes) / Math.log(1024));
  const value = (bytes / Math.pow(1000, i)).toFixed(2);
  return `${value} ${units[i]}`;
}
