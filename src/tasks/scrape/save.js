import fs from 'fs';
import path from 'path';

const createDir = ({ filePath }) =>
  new Promise((resolve, reject) => {
    const dirPath = path.dirname(filePath);
    console.log({ dirPath });
    fs.mkdir(dirPath, { recursive: true }, err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });

const createFile = ({ filePath, fileContents }) =>
  new Promise((resolve, reject) => {
    fs.writeFile(filePath, fileContents, err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });

const saveFile = async ({ filePath, fileContents }) => {
  const absoluteFilePath = `${path.resolve()}${filePath}`;
  console.log({ absoluteFilePath });
  await createDir({ filePath: absoluteFilePath });
  await createFile({ filePath: absoluteFilePath, fileContents });
};

export { saveFile };
