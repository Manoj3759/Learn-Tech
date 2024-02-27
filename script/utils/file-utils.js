import { writeFileSync } from "fs";

// Json creation based on title
const generateFileWritePromises = async (
  collection,
  basePath,
  fileNameProp
) => {
  for (const item of collection) {
    if (item[fileNameProp]) {
      const sanitizedFileName = sanitizeFilename(item[fileNameProp]);

      writeFileSync(
        `${basePath}/${sanitizedFileName}.json`,
        JSON.stringify(item),
        "utf8"
      );
    }
  }
};

// extract file name by removing unwanted characters
const sanitizeFilename = (fileName) => {
  return fileName.replace(/[/\\?%*:|"<>]/g, "-").replace(/ +/g, "-");
};

// extract text by removing unwanted characters
const filterDescriptionToText = (description) => {
  if (!description) return "";
  return description
    .replace(/^\[[^\]]+\]/, "")
    .replace(/\([^)]*\)+/gm, "")
    .replace(/\n/g, "");
};

// extract URL from text by removing unwanted characters
const textToUrl = (text) => {
  if (!text) return "";
  return text
    .replace(/^\[[^\]]+\]/, "")
    .replace(/([()])/g, "")
    .replace(/ +/g, "")
    .replace(/\n/g, "");
};

// extract only video id
const extractVideoId = (text) => {
  if (!text) return "";
  return text.replace(/<https:\/\/youtu\.be\/(\w+)>/, "$1").replace(/\n/g, "");
};

export {
  generateFileWritePromises,
  filterDescriptionToText,
  textToUrl,
  extractVideoId,
};
