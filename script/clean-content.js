// "use strict";

"use strict";

import fs from "fs";
// import fs from "fs";
// import path from "path";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const deleteAllFilesRecursively = (dirPath, arrayOfFiles) => {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function (file) {
    const filePath = path.join(dirPath, file);

    if (fs.statSync(filePath).isDirectory()) {
      arrayOfFiles = deleteAllFilesRecursively(filePath, arrayOfFiles);
    } else if (path.extname(file) === ".json") {
      const fullPath = path.join(__dirname, "..", dirPath, file);
      arrayOfFiles.push(fullPath);
      fs.unlinkSync(fullPath);
    }
  });

  return arrayOfFiles;
};

function init() {
  deleteAllFilesRecursively("content");
  console.log("== completed clean-content script");
}

init();
