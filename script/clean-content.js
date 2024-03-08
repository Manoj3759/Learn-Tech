"use strict";

import fs from "fs";
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
    } else {
      const fullPath = path.join(__dirname, "..", dirPath, file);

      if (
        path.extname(file) === ".json" ||
        dirPath.includes("public/images/tool-img")
      ) {
        arrayOfFiles.push(fullPath);

        try {
          fs.unlinkSync(fullPath);
          console.log(`Deleted: ${fullPath}`);
        } catch (error) {
          console.error(`Error deleting: ${fullPath}`, error);
        }
      }
    }
  });

  return arrayOfFiles;
};

function init() {
  try {
    // Delete JSON files in the "content" directory
    deleteAllFilesRecursively("content");

    // Delete files in the "public/images/tool-img" directory
    deleteAllFilesRecursively("public/images/tool-img");

    console.log("== Completed clean-content script");

    // Check if the "public/images/tool-img" directory is empty after deletion
    const toolImgFiles = fs.readdirSync("public/images/tool-img");
    if (toolImgFiles.length === 0) {
      console.log("== Successfully deleted files in 'public/images/tool-img'");
    } else {
      console.log("== Error: Files in 'public/images/tool-img' not deleted.");
    }
  } catch (error) {
    console.error("== Error during cleanup:", error);
  }
}

init();
