
const divider = 1024;

export default function calculateFileSize(bytes) {
  return `${(bytes / divider ** 2).toFixed(2)} MB`;
}