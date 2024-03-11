const BASE = "apppjYD56k3fq9H2G";
const TABLENAME = "tblK7OBNKssVQXngi";
import Airtable from "airtable";
import dotenv from "dotenv";

dotenv.config();
const client = new Airtable({ apiKey: process.env.AIRTABLE_AUTH_vendor }).base(
  BASE
);
import {
  generateFileWritePromises,
  filterDescriptionToText,
  textToUrl,
  sanitizeFilename,
} from "../utils/file-utils.js";
import fs from "fs";
import path from "path";
import axios from "axios";

// fetching each record from the airtable and storing at ./content/vendors based on title
const getData = (resolve, reject) => {
  const allRecords = [];

  client(TABLENAME)
    .select({
      view: "Website View",
    })
    .eachPage(
      function page(records, fetchNextPage) {
        records.forEach(function (record) {
          allRecords.push(record);
        });
        fetchNextPage();
      },
      async function done(err) {
        if (err) {
          console.error(err);
          return reject();
        } else {
          const instanceCollection = generateCollection(allRecords);
          await generateFileWritePromises(
            instanceCollection,
            "./content/vendors",
            "title"
          );
        }
      }
    );
};

const init = async () => {
  try {
    console.log("== started vendor-local");
    await new Promise((resolve, reject) => getData(resolve, reject));

    console.log("== finished vendor-local");
  } catch (err) {
    throw new Error(err);
  }
};

const generateCollection = (cmsResponse) => {
  const collection = [];

  cmsResponse.forEach(async ({ fields, id }) => {
    await collection.push(new DataModellingVendors(fields, id));
  });

  return collection;
};

// Class Constructor for Data Modelling
class DataModellingVendors {
  constructor(fields, id) {
    this.id = id;
    this.pageRoute = sanitizeFilename(fields.Tool) || "";
    this.title = fields.Tool || "";
    this.text = filterDescriptionToText(fields.Description) || "";
    this.featureText = fields["Tool Feature Intro Text"] || "";
    this.category = fields["Primary Category"] || "";
    this.videoSrc = fields["Demo URL Link (Wistia)"] || "";
    this.ctaLink = fields["Tool URL"] || "";
    this.ctaToolRequestFormLink =
      textToUrl(fields["Vender Demo Form (URL)"]) || "";
    this.ctaTryLink = fields["URL Link - Try Tool (Sandbox Environment)"] || "";
    this.ctaWebinarLink = fields["URL Link - Webinar"] || "";
    this.ctaSupportLink = fields["URL Link - Support (tool)"] || "";

    this.tag = fields.Tags || [];
    this.contact = fields["ASU Contact"] || [];
    this.owner = fields["License Owner"] || [];

    this.parallaxSectionImg = extractImageName(
      fields,
      "Feature Background Image (1280 X 550)"
    );

    this.heroSectionImg = extractImageName(
      fields,
      "Header Background Image (1280x260)"
    );

    this.cardLogo = extractImageName(fields, "Tool Logo (60x60)");

    const s1 = fields["Tools Features website formula"] || "";
    const toolFeatures = s1.split("$$");
    this.features = toolFeatures.map((toolFeatureText) => {
      if (toolFeatureText === null) {
        return { title: "", text: "" };
      }
      const [title, text] = toolFeatureText
        .split("$")
        .map((item) => item.trim());
      return {
        title: title || "",
        text: text || "",
      };
    });

    const imageDetails = fields["(1-4) Tool Preview Images"] || [];

    this.previewImages =
      imageDetails.length > 0
        ? imageDetails.map((image) => ({
            url: image.filename || "",
          }))
        : { images: [] };

    imageDetails.forEach(() => {
      extractImageUrl(fields, "(1-4) Tool Preview Images");
    });

    extractImageUrl(fields, "Tool Logo (60x60)");
    extractImageUrl(fields, "Header Background Image (1280x260)");
    extractImageUrl(fields, "Feature Background Image (1280 X 550)");
  }
}

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
    console.error(`Error downloading image: ${imagePath}`);
    return null;
  }
};

const extractImageUrl = async (fields, key) => {
  const images = fields[key] || [];
  const downloadPromises = images.map(
    async (img) => await downloadImage(img.url, img.filename)
  );

  return await Promise.all(downloadPromises);
};

const extractImageName = (fields, key) => {
  const images = fields[key] || "";

  const downloadPromises = images.length > 0 ? images[0].filename || "" : "";
  return downloadPromises;
};

export default { init };
