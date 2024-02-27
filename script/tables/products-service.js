// // ED TECH PRODUCTS TABLE
// // https://airtable.com/appkN3CwBio83L9pF/api/docs#javascript/table:ed%20tech%20products
// // Base = appkN3CwBio83L9pF

// const BASE = "appkN3CwBio83L9pF";
// const tableName = "Ed Tech Products";
// // const Airtable = require('airtable')
// // const util = require('../utils/FileUtils.js')
// // const client = new Airtable({ apiKey: process.env.AIRTABLE_AUTH }).base(BASE)
// // const { generateFileWritePromises } = require('../utils/FileUtils.js')
// import Airtable from "airtable";
// import dotenv from "dotenv";

// dotenv.config();
// // const util = require('../utils/FileUtils.js')
// const client = new Airtable({ apiKey: process.env.AIRTABLE_AUTH }).base(BASE);
// // const { generateFileWritePromises } = require("../utils/FileUtils.js");
// import {
//   generateFileWritePromises,
//   markDownDescriptionToLinks,
// } from "../utils/FileUtils.js";

// const getData = (resolve, reject) => {
//   const allRecords = [];
//   client(tableName)
//     .select({
//       view: "Grid view",
//     })
//     .eachPage(
//       function page(records, fetchNextPage) {
//         records.forEach(function (record) {
//           allRecords.push(record);
//         });
//         fetchNextPage();
//       },
//       async function done(err) {
//         if (err) {
//           console.error(err);
//           return reject();
//         } else {
//           const instanceCollection = generateCollection(allRecords);

//           // get collection's writeFile promises
//           const writeFilePromises = generateFileWritePromises(
//             instanceCollection,
//             "./content/products",
//             "title"
//           );

//           // write all content to files in current batch
//           await Promise.all(writeFilePromises);
//           return resolve();
//         }
//       }
//     );
// };

// const init = async () => {
//   try {
//     console.log("== started Ed_Tech_Products_script");
//     await new Promise((resolve, reject) => getData(resolve, reject));

//     console.log("== finished Ed_Tech_Products_script script");
//   } catch (err) {
//     throw new Error(err);
//   }
// };

// const generateCollection = (cmsResponse) => {
//   const collection = [];

//   cmsResponse.forEach(({ fields, id }) => {
//     collection.push(getInstance(fields, id));
//   });

//   return collection;
// };
// const getInstance = (fields, id) => {
//   return {
//     id,
//     asu_departments: fields["ASU Departments"] || [],
//     tools:
//       combineTools(
//         fields["Canvas Learning Tools (LTIs)"],
//         fields["Other Embedded Products and Tools"]
//       ) || [],
//     co_dev_partners: fields["Co-Development Partners"] || [],
//     description: markDownDescriptionToLinks(fields.Description) || "",
//     contacts: fields.Contacts || [],
//     edtech_products: fields["Other Ed Tech Products Used"] || [],
//     other_embedded_products: fields["Other Embedded Products and Tools"] || [],
//     external_funding: fields["External Funding"] || [],
//     grouping: fields.Grouping || [],
//     title: fields.Name || "",
//     type: "Product",
//   };
// };

// const combineTools = (tool1, tool2) => {
//   if (tool1 && tool2) {
//     return [...tool1, ...tool2];
//   } else if (tool1) {
//     return tool1;
//   } else {
//     return tool2;
//   }
// };
// // module.exports = {
// //   init,
// // };
// export default { init };
