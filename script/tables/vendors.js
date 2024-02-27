const BASE = "apppjYD56k3fq9H2G";
const tableName = "tblK7OBNKssVQXngi";
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
} from "../utils/FileUtils.js";

const getData = (resolve, reject) => {
  const allRecords = [];

  client(tableName)
    .select()
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
    this.category = fields["Primary Category"] || "";
    this.tag = fields.Tags || [];
    this.contact = fields["ASU Contact"] || [];
    this.videoSrc = extractVideoId(fields["Demo Video"]) || "";
    this.owner = fields["License Owner"] || [];
    this.ctaLink = fields["Tool URL"] || "";
    this.ctaToolRequestFormLink =
      textToUrl(fields["Vender Demo Form (URL)"]) || "";
  }
}

export default { init };
