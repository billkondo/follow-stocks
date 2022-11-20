import path from 'path';

const buildTestFilePath = (filePath: string) => {
  return path.join(__dirname, ...filePath.split('/'));
};

export default buildTestFilePath;
