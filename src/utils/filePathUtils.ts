const fileExtensionRegex = /(?:\.([^.]+))?$/;

/*
    index: 0 -> returns extension with dot prefix, e.g. getExtension("hello.json", 0) -> ".json"
    index: 1 -> returns extension without dot prefix, e.g. getExtension("hello.json", 1) -> "json"
 */
export const getExtension = (fileName: string, index = 1) => {
  const split = fileExtensionRegex.exec(fileName);
  return split && split[index].toLowerCase();
};

export const getFileNameWithoutExtension = (fileName: string) => {
  const extension = getExtension(fileName, 0);
  if (!extension) {
    return fileName;
  }

  return fileName.split(extension)[0];
};

export const getContentType = (file: File) => {
  switch (getExtension(file.name)) {
    case 'pdf':
      return 'application/pdf';
    case 'jpg':
    case 'jpeg':
    case 'heic':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    default:
      return 'text/plain';
  }
};
