const fs = require('fs');

class JSONFile {
  filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  exists() {
    return fs.existsSync(this.filePath);
  }

  read() {
    const fileContent = fs.readFileSync(this.filePath);

    return JSON.parse(fileContent);
  }

  save(content: any) {
    fs.writeFileSync(this.filePath, JSON.stringify(content, null, 2));
  }

  remove() {
    fs.rmSync(this.filePath);
  }
}

export default JSONFile;
