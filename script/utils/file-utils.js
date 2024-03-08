// import { writeFileSync } from "fs";

import fs from "fs";
import path from "path";
import axios from "axios";

// Json creation based on title
const generateFileWritePromises = async (
  collection,
  basePath,
  fileNameProp
) => {
  for (const item of collection) {
    if (item[fileNameProp]) {
      const sanitizedFileName = sanitizeFilename(item[fileNameProp]);
      console.log("sanitizedFileName=========",sanitizedFileName)
      // writeFileSync(
      //   `${basePath}/${sanitizedFileName}.json`,
      //   JSON.stringify(item),
      //   "utf8"
      // );
    }
  }
};

//   const imageUrls = await Promise.all(
//     images.map(async (image, index) => {
//       const imageUrl = image.url || "";
//       const imageName = `image_${index + 1}.jpg`; // You can modify the naming convention as needed
//       const imagePath = path.join(downloadPath, imageName);

//       try {
//         // Download the image and save it to the specified path
//         const response = await axios({
//           method: "get",
//           url: imageUrl,
//           responseType: "stream",
//         });

//         response.data.pipe(fs.createWriteStream(imagePath));

//         return imagePath;
//       } catch (error) {
//         console.error(`Error downloading image ${index + 1}: ${error.message}`);
//         return null;
//       }
//     })
//   );

//   return imageUrls.filter((url) => url !== null);
// };

// extract file name by removing unwanted characters
const sanitizeFilename = (fileName) => {
  return fileName
    .replace(/[/\\?%*:|"<>]/g, "-")
    .replace(/ +/g, "-")
    .toLowerCase();
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

// remove
const downloadImage = async (imageUrl, imageName) => {
  const downloadPath = "public/images/tool-img";

  if (!fs.existsSync(downloadPath)) {
    fs.mkdirSync(downloadPath, { recursive: true });
  }

  const imagePath = path.join(downloadPath, imageName);
  try {
    const response = await axios({
      method: "get",
      url: imageUrl,
      responseType: "stream",
    });

    response.data.pipe(fs.createWriteStream(imagePath));

    return imagePath;
  } catch (error) {
    console.error(`Error downloading image: ${error.message}`);
    return null;
  }
};

const extractImageUrl = async (fields, key) => {
  const images = fields[key] || [];
  // console.log("imageeeeeeeeee", images);
  const downloadPromises = images.map((img) =>
    downloadImage(img.url, img.filename)
  );

  return Promise.all(downloadPromises);
};

const extractImageName = (fields, key) => {
  const images = fields[key] || "";

  const downloadPromises = images.length > 0 ? images[0].filename || "" : "";
  return downloadPromises;
};

export {
  generateFileWritePromises,
  filterDescriptionToText,
  textToUrl,
  extractVideoId,
  sanitizeFilename,
  extractImageName,
  extractImageUrl,
  downloadImage,
};
