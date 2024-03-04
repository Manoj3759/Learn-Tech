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
  extractVideoId,
} from "../utils/file-utils.js";

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
    this.title = fields.Tool || "";
    this.text = filterDescriptionToText(fields.Description) || "";
    this.featureText = fields["Tool Feature Intro Text"] || "";
    this.category = fields["Primary Category"] || "";
    this.tag = fields.Tags || [];
    this.contact = fields["ASU Contact"] || [];
    this.videoSrc = extractVideoId(fields["Demo Video"]) || "";
    this.owner = fields["License Owner"] || [];
    this.ctaLink = fields["Tool URL"] || "";
    this.ctaToolRequestFormLink =
      textToUrl(fields["Vender Demo Form (URL)"]) || "";
    this.parallaxSectionImg =
      fields["Feature Background Image (1280 X 550)"][0].url || "";
    this.heroSectionImg =
      fields["Header Background Image (1280x260)"][0].url || "";
    this.cardLogo = fields["Tool Logo (60x60)"][0].url || "";
    this.ctaTryLink = fields["URL Link - Try Tool (Sandbox Environment)"] || "";
    this.ctaWebinarLink = fields["URL Link - Webinar"] || "";
    this.ctaSupportLink = fields["URL Link - Support (tool)"] || "";

    const previewImages = [
      { img: fields["(1)Tool Preview Image"][0].url || null },
      { img: fields["(2)Tool Preview Image"][0].url || null },
      { img: fields["(3)Tool Preview Image"][0].url || null },
      { img: fields["(4)Tool Preview Image copy"][0].url || null },
    ];

    this.previewImages = previewImages.filter((image) => image.img !== null);

    const toolFeatures = [
      fields["(1) Tool Feature Text"] || null,
      fields["(2) Tool Feature Text"] || null,
      fields["(3) Tool Feature Text"] || null,
    ];

    
    this.features = toolFeatures.map((toolFeatureText) => {
      const [title, text] = toolFeatureText
        .split("$")
        .map((item) => item.trim());
      return {
        title: title || "",
        text: text || "",
      };
    });

    // test ------------
    // const imageDetails = fields["Feature Background Image (1280 X 550)"];
    // this.imageWidth = imageDetails ? imageDetails[0].width || 0 : 0;
    // this.imageHeight = imageDetails ? imageDetails[0].height || 0 : 0;
    //   const imageDetails = fields["Feature Background Image (1280 X 550)"] || {};
    //   this.imageSize = imageDetails
    //     ? {
    //         width: imageDetails[0].width || 0,
    //         height: imageDetails[0].height || 0,
    //       }
    //     : { width: 0, height: 0 };
    // Splitting Tool Feature Text into title and text

    // const featureObjectsArray = toolFeatureTextArray.map((item) => {
    //   const [title, text] = item.split("$").map((part) => part.trim());
    //   return { title, text };
    // });

    // this.features = {
    //   featureTitle: title || "",
    //   featureText: text || "",
    // };

    // ------------------main
    // const toolFeatureText = fields.toolFeature || "";
    // const [title, text] = toolFeatureText.split("$").map((item) => item.trim());

    // this.feature = [
    //   {
    //     featureTitle: title || "",
    //     featureText: text || "",
    //   },
    // ];

    // const toolFeatureText =
    //   fields[("(1) Tool Feature Text", "(2) Tool Feature Text")] || [];
    // const [title, text] = toolFeatureText.forEach((data) =>
    //   data.split("$").map((item) => item.trim())
    // );

    // this.feature = toolFeatureText
    //   .filter((url) => url)
    //   .map(() => ({
    //     featureTitle: title || "",
    //     featureText: text || "",
    //   }));

    // this.urls = urlFields
    //   .filter(url => url) // Filter out undefined or empty URLs
    //   .map(url => ({ link: url }));
  }
}

export default { init };
