import fs from 'fs';
import path from 'path';

const saveFile = ({ filePath, fileContents }) =>
  new Promise((resolve, reject) => {
    const absoluteFilePath = `${path.resolve()}${filePath}`;
    console.log(absoluteFilePath);
    fs.writeFile(absoluteFilePath, fileContents, err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });

export { saveFile };
