import fs from 'fs';

class JSONFile {
  filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  exists() {
    return fs.existsSync(this.filePath);
  }

  read() {
    if (!this.exists()) {
      return;
    }

    const fileContent = fs.readFileSync(this.filePath);

    return JSON.parse(fileContent.toString());
  }

  save(content: any) {
    fs.writeFileSync(this.filePath, JSON.stringify(content, null, 2));
  }

  remove() {
    if (!this.exists()) {
      return;
    }

    fs.rmSync(this.filePath);
  }
}

export default JSONFile;
