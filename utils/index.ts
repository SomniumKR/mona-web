export const fetchBlobFromDataURL = (dataURI: string) => {
  const byteString = atob(dataURI.split(',')[1]);

  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  const ab = new ArrayBuffer(byteString.length);

  const ia = new Uint8Array(ab);

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  const blob = new Blob([ab], { type: mimeString });
  return URL.createObjectURL(blob);
};
