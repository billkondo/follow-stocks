import fs from 'fs';
import JSONFile from 'main/storage/JSONFile';
import path from 'path';

describe('JSON File', () => {
  let jsonFile: JSONFile;

  const testFilePath = path.join(__dirname, 'test.json');

  const createTestFile = (content = '') =>
    fs.writeFileSync(testFilePath, content);

  beforeEach(() => {
    jsonFile = new JSONFile(testFilePath);
  });

  afterEach(() => {
    fs.rmSync(testFilePath, { force: true });
  });

  it('should check if json file exists', () => {
    createTestFile();

    expect(jsonFile.exists()).toBeTruthy();
  });

  it('should read json file content', () => {
    createTestFile('{ "key": "value" }');

    expect(jsonFile.read()).toEqual({
      key: 'value',
    });
  });

  it('should save json file content', () => {
    const testContent = {
      '1': 'one',
      '2': 'two',
    };

    createTestFile();

    jsonFile.save(testContent);

    expect(jsonFile.read()).toEqual(testContent);
  });

  it('should remove json file', () => {
    createTestFile();

    expect(fs.existsSync(testFilePath)).toBeTruthy();

    jsonFile.remove();

    expect(fs.existsSync(testFilePath)).toBeFalsy();
  });
});
