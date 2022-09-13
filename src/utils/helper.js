export function generateImagePreviewSrc(file) {
  if (file !== null && file.type.includes('image')) {
    return URL.createObjectURL(file);
  }
  return null;
}
