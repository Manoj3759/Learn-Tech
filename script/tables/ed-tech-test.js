const BASE = "appyj3VoF3WNtP5oI";
const tableName = "tblNG3crQrmDwjmlf";
import Airtable from "airtable";
import dotenv from "dotenv";

dotenv.config();
const client = new Airtable({ apiKey: process.env.AIRTABLE_AUTH_ed_tech }).base(
  BASE
);
import { generateFileWritePromises } from "../utils/FileUtils.js";

const getData = (resolve, reject) => {
  const allRecords = [];
  client(tableName)
    .select({
      view: "Grid view",
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

          // get collection's writeFile promises
          const writeFilePromises = generateFileWritePromises(
            instanceCollection,
            "./content/ed-tech",
            "name"
          );
          console.log(writeFilePromises);
          // write all content to files in current batch
          await Promise.all(writeFilePromises);
          return resolve();
        }
      }
    );
};

const init = async () => {
  try {
    console.log("== started ed-tech-local");
    await new Promise((resolve, reject) => getData(resolve, reject));

    console.log("== finished ed-tech-local");
  } catch (err) {
    throw new Error(err);
  }
};

const generateCollection = (cmsResponse) => {
  const collection = [];

  cmsResponse.forEach(({ fields, id }) => {
    collection.push(getInstance(fields, id));
  });

  return collection;
};
const getInstance = (fields, id) => {
  return {
    id,
    name: fields.Name || "",
    user_id: fields.UserId || "",
    phone: fields.Phone,
    features: fields.Features || [],
  };
};

export default { init };
