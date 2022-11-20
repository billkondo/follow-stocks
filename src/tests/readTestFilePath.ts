import fs from 'fs';
import buildTestFilePath from './buildTestFilePath';

const readTestFilePath = (filePath: string) => {
  const actualPath = buildTestFilePath(filePath);

  return fs.readFileSync(actualPath);
};

export default readTestFilePath;
