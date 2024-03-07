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

  // for (const { fields, id } of cmsResponse) {
  //   await collection.push(new DataModellingVendors(fields, id));
  // }

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
    this.tag = fields.Tags || [];
    this.contact = fields["ASU Contact"] || [];
    this.videoSrc = fields["Demo URL Link (Wistia)"] || "";
    this.owner = fields["License Owner"] || [];
    this.ctaLink = fields["Tool URL"] || "";
    this.ctaToolRequestFormLink =
      textToUrl(fields["Vender Demo Form (URL)"]) || "";

    this.parallaxSectionImg = extractImageUrl(
      fields,
      "Feature Background Image (1280 X 550)"
    );

    this.heroSectionImg = extractImageUrl(
      fields,
      "Header Background Image (1280x260)"
    );

    this.cardLogo = extractImageUrl(fields, "Tool Logo (60x60)");
    this.ctaTryLink = fields["URL Link - Try Tool (Sandbox Environment)"] || "";
    this.ctaWebinarLink = fields["URL Link - Webinar"] || "";
    this.ctaSupportLink = fields["URL Link - Support (tool)"] || "";

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
    this.imageSize =
      imageDetails.length > 0
        ? {
            images: imageDetails.map((image) => ({
              url: image.filename || "",
            })),
          }
        : { images: [] };
  }
}

const extractImageUrl = (fields, key) => {
  const images = fields[key] || "";
  return images.length > 0 ? images[0].filename || "" : "";
};

// let imageContainer = new Set();

// const downloadImage = async () => {
//   // if (!imageContainer.has(images)) {
//   //   imageContainer.add(images);
//   // }
//   const downloadPath = "public/images/tool-img";

//   // if (!fs.existsSync(downloadPath)) {
//   //   fs.mkdirSync(downloadPath, { recursive: true });
//   // }

//   let imageArray = [
//     "https://v5.airtableusercontent.com/v3/u/26/26/1709762400000/4edWAvJNT5pqIXkznX4QSg/fK8W98cZ18poLveR5ZvzlL6l7pdKj9azOPwMRP_utmetp5aKm8waJxFvVJCe5eMEELfRZlGYpqnnZygf8UBuD3nJY3BZzuCkkV9GotmIm0Ehw8fUBnxJw1wwvaxyP9E-wRqi6-ZVfGDNw5_3Sgj1blSXj6dU1Fw9XnOqLRarLr4/L94LJ5_mAdtn-dpY3YBCTyy5XeN3PcaVVW9bszSy_H0",
//     "https://v5.airtableusercontent.com/v3/u/26/26/1709762400000/C6L5GQdkIZ11QMG6Dk_jMg/FsfxGGVoCM1I0eRhzkq2xdFmGjlGf5UMYwqMaM9ez5ZA8HokIfkjZtnfV2IhJ7Ja8WCj9kD80B7QfuG9Zpt6CpoVgTOI_9n3hbXzmT3KI0nyHKoAPzroupnXdV_Y9_LmCKKtB7xwSzSXbMmq2VunhFtHpxEzICOX_4V55yFrOiw/5qF0t-iQTj2fgKLsD7KGQlMUKs9gPKo4bQYTV6WQo_A",
//     "https://v5.airtableusercontent.com/v3/u/26/26/1709762400000/SVYF34WGyG1eZfgeaNPJqw/4owCVqCBqK10igYAiA4_mXqJkLS10DFd6GmQHhvmdyMNGZESavCIeqmQObqeRoXLuafIMJOtQ-Mimcb8S-cyvqOazjulUMbG3FULnH28dFR_OYMnCeQuwgnVci6kmJ64iyW9QDtTySfUi_PcZU_bDQ/jlqVz6AOPqBGD-r9EifhX15yaWXylR-gmr2U3wY5gms",
//     "https://v5.airtableusercontent.com/v3/u/26/26/1709762400000/cY_AFD1gGYNfJMyLGVAkqQ/ag32MXgq6sy4cSUWm-0Dl5fzZU7TRl2SKF0vqZV32-CvXbI0sxNkYQN5shAgK8d25mOXvpj004thhngfON4qYRN_hK7lcs6k-8jjsmUNL0LWYpShTBjgAfB8XNTgcI8kKzqPxvD-cTzUQBZ3JaWkQ_F_k_DNMQycoEiIkc7QWTU/7D6SIaqhHkKfPfi7F3M0WOwMsDo69QrXiRQw2MnRD8o",
//     "https://v5.airtableusercontent.com/v3/u/26/26/1709762400000/YuXooIohQJnM5LxQlScjxQ/oG0CDKzZJTGgEcv1SrkMmuaJl9TReZ5-jGzHt5KrTfL87nHcDCEvMNO-GW8RYg6ADqYMJ4QGHOUmwZq6O5B6IRblg-idNyqsq61JQ32ruBUQa17-VGRDf61uvb57vQP7pmp2a0aeOT4wUBotkzimQldZyQStCLw6P9tglDbGTY0/_MnlwU3UORAwvgzMbbl5Zr5FR2n4j5O7925ou8zOgxc",
//     "https://v5.airtableusercontent.com/v3/u/26/26/1709762400000/f6t-ANMaw_hVTwVFaTrlyg/hrHxH93DT5eFEcw4IxQ34N1A4mReW7wSRYau21rkDtGQo_gEAtd-NdhjF30e2_MMH-q-DjP--JDqsi9F2TZ520pFWu4PgmbU0CAJvr0yEz_IjXlebE1JAjCkrCQpqGYt-JoUhhJXEMFJDQOQv-tVGw/lLWj1TWwEnMpvFGt9sxugSGwbZKlrLWRKbrHXUkYi9Q",
//     "https://v5.airtableusercontent.com/v3/u/26/26/1709762400000/tM5eLpUxXUFK9U95DMs-vg/3jp2oSz-8KAYRzUROunOsCk4arv0h8e_Wlu6qsus-nSbFMv1_JH_6ETjrT7KXOrHujsQT_Pg4slW6duQlrzDsHV215wXv6wXoh4tdYhxhKAjYrpReFeYupkV_lfIHxlEzcdPrFp-ZVehadv8DiQcOqwyS9VTc-2BSZlXIKLwvbY/cZmITqWks3skxFmnkmNd4MWthrVOClU4KpZEx723-54",
//     "https://v5.airtableusercontent.com/v3/u/26/26/1709762400000/CG8EvRKx2_8q3nF4ifCuVw/v-Vi_OQ3xXlUl9_ngVbLXBklhJocejulDJAtMxyIZH4rsvZ4hLPxE8fiqerosac9x75LbeI39VbPgDhH_kGXuNbiqrIE0HmqphWpa-aqN2fK_3kIi89YQuPwidC2mH5sUg6ogyVHm60QCOwcv2XzXenl5C_r8bgiGGNUW3ZEleA/4PhrkqZv5kIYrs8kv-vNTbnIK58GUmEeHtvR4ssmsII",
//     "https://v5.airtableusercontent.com/v3/u/26/26/1709762400000/BtoUYI3-CPtoW4CN06v_5Q/VuehcvK_1EdjUP4SfqTeugW49OIk-xyMDistANd2S3OL9Y3ovRFYLoyQJWpkakz6i06SkQPz-iVntkb5hzTUw0PnN6JM958pWsobK1z0eLb12CiZKj9JCUlFHPyuvglQGb8kHsj0VA3KAIKajcAEKw/PfwkhoRzryRQp7vA73pu33GjTJox_42NGCDzsIRyiV4",
//     "https://v5.airtableusercontent.com/v3/u/26/26/1709762400000/skJQnSsBsw8HZWmVhBH0MQ/mu9Gk3IqDZS2kkTK_1zAOryfJEfasc4tFEcxYVaf4bpEb01exJpj16r8C6ddQvt_66XFvk2AnqRU9ysb1yRLGjKlJmPVxcihHJCZV_aDVRrkuBRW5VDqMA1w4sgwQl6d5m02y-izPeXEZCkQACDeBA/Hrj6xQF9js7Zh8OwDfmHIUl6Ff9jev6mFz24C_hOoCQ",
//     "https://v5.airtableusercontent.com/v3/u/26/26/1709762400000/JtcJZ7ftU-FTvnlh7XHrFA/EEZ5Ng02N04Yw9uSHYsqiPbFBIAkgLPduVy8jHS2tVFSw0S79_zoMgsOC-pugEY8b5_Qe1WY7B6PRa5msjxN2gF9iWYlO3qgXxq13pQxxBfm9NFZHIOoVbVwsjY2cIv8WJjpb4IyVsS5VXm011XOog/luuJTAiqgWNeNYc15NP2xsoUllvO3OpVY7OeNseKlWY",
//     "https://v5.airtableusercontent.com/v3/u/26/26/1709762400000/l1xuuRD9somB-34lRBi03w/9US7nN-kgclDeFDB1Ooorb3EDdVr5_lPXAX7jpstIb5t8l5KBCYYG1ImzQztd2opm9_EnbQvUKSIqwddiv2esppdEtI9b8qvPdRa9swGrBMyTUGzYlwXwxhWeoK63mMQmDn8af4YPDl7_6ZFaEkIdg/ORphXNlP3SOZglNxq-IJgHo94u04FtuEs2Drg5XA84I",
//     "https://v5.airtableusercontent.com/v3/u/26/26/1709762400000/oumpkDr7upa0ap-ur00YOw/GJK3Oa-QI4sZOqja9Xap3q0ysqEie2afcS3xdNUVRZcHRwcmXTjj3RjpPPaKg7MgUGSuN66RHOmFITWEklmYVit4QUYR2X68baR6T1mwR1Y41ayITdaOz0v2BigSuIII2NXySYBDSTXboOiBXkEix8FWCGS1ufLqFomek4EoMRU/CTFeuSQakk8CuAMKLh3ocSeB99lCKCUSRE-ZSyeKmns",
//     "https://v5.airtableusercontent.com/v3/u/26/26/1709762400000/Dd_L9jxJoY0kK1krmZ0rZw/n1kVT2YHkHhdrrS75KZYcy-H_ER7xXtRBKL2ok5TkHUBp1Gf3eT5sdD7IDCOLgTtHut_osRergNub2PBMiZvfRpQWczkb1mxgsGX6udDM9f_R8nhImJ7kHsM24U9JRXODr5RxInEtXyXyy2jpMBxBY2RytgriuU2JyYYcQZ4V-M/cwMkWIUtmuj-bjOiwTbQH4RZwrgDYzoWlWPbTW-o3aQ",
//     "https://v5.airtableusercontent.com/v3/u/26/26/1709762400000/CQa3XuJJ8GaXpw8TTyhSQg/h6DjskoddMJGK5lN-1NgcdNG9yKyWBzga5RpGIAiPezke6Qe1n2lPzn1Uu1N-NeUQpHlyqhv1HurIsymRYOmyETzxcbT06TfgBzdVnZdVWRUqMI835q4FpB6F_iuNjCIyZeRXET7TVkexCHWd7OE9ckX6nI28rqWEdfgsLgnqDU/kei5xpO5CTwIMbu3RkK_GpP4-iXUTeXg5GF1VT9tZVQ",
//     "https://v5.airtableusercontent.com/v3/u/26/26/1709762400000/HxeHga6m4K4udtj1hxRXMg/_afNAC9FEjWBRtxXKCJ-aJAQM1lqb6nxUQm-dyGYCR7HvuqftfsD5MxkDXE_NioHNqBqjGlJsTUDF_F7cm6PZVh92lWHGhlXdkpALK-C7brGjAgktZ2DoSVZbcvS_uWmc6Low3cl6neKTS_ALAottw/C8A4dwUQkJXBloRc1cW3QwoN6kIl7zm5xEpReHohmd4",
//     "https://v5.airtableusercontent.com/v3/u/26/26/1709762400000/qcDPokpzi1mLwpemKin0gg/YgOTcLaEyELeBUxLbGrboxxpECNN9dMWV38OkI_OsLSg3ytnNgL8WaBwqhhPPmhUffIP8YElO4SFgczv7e2_WbTlja7TkQM5E6sWCKrppp56G108oOMEw7ZaxuUihxeCkIfdo5IyMB-7ZkXqiu9fVw/JofnIixfE402_oEzDavAeq5D2jYmJlfyNOcHES-Ttt0",
//     "https://v5.airtableusercontent.com/v3/u/26/26/1709762400000/GGH10yXf_ZZE52yJvQz67Q/zA_HLETqIzZJ524fffyfp0kl8-Y4S0R05_FlSijo_osrYr5uo-ELY7g9i6j1JnCnihDWfHN76elaYeoBsVxbV0u5BGq3lA7GRQQXltemjO7NDGGI7GzOlkz8Myu7BqU88HrozT--SL15aZrpItZyQQ/NGs4VwLI3fQd8zk-GEIXtbLFk7FCHMwNe2hUvvr7K2Q",
//   ];

//   // const imageArray = [...imageContainer];
//   // console.log("imageArray", imageArray);
//   const imageUrls = await Promise.all(
//     imageArray.map(async (imageUrl, index) => {
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

//         // Return the local path where the image is saved
//         return imagePath;
//       } catch (error) {
//         console.error(`Error downloading image ${index + 1}: ${error.message}`);
//         return null; // Handle the error as needed
//       }
//     })
//   );

//   // Filter out null values (in case of download errors)
//   return imageUrls.filter((url) => url !== null);
// };

// const downloadImage = async (imageUrl, downloadPath) => {
//   const imageName = "image.jpg"; // Extract the filename from the URL
//   const imagePath = path.join(downloadPath, imageName);

//   try {
//     const response = await axios({
//       method: "get",
//       url: imageUrl,
//       responseType: "stream",
//     });

//     // Ensure the directory exists before writing the file
//     if (!fs.existsSync(downloadPath)) {
//       fs.mkdirSync(downloadPath, { recursive: true });
//     }

//     // Pipe the response data to a writable stream
//     const writer = fs.createWriteStream(imagePath);
//     response.data.pipe(writer);

//     return new Promise((resolve, reject) => {
//       writer.on("finish", resolve);
//       writer.on("error", reject);
//     });
//   } catch (error) {
//     console.error(`Error downloading image: ${error.message}`);
//     throw error; // Rethrow the error to be handled by the caller
//   }
// };

// // Example usage
// const downloadPath = "public/images/tool-img";
// let imageUrls = [
//   "https://v5.airtableusercontent.com/v3/u/26/26/1709762400000/4edWAvJNT5pqIXkznX4QSg/fK8W98cZ18poLveR5ZvzlL6l7pdKj9azOPwMRP_utmetp5aKm8waJxFvVJCe5eMEELfRZlGYpqnnZygf8UBuD3nJY3BZzuCkkV9GotmIm0Ehw8fUBnxJw1wwvaxyP9E-wRqi6-ZVfGDNw5_3Sgj1blSXj6dU1Fw9XnOqLRarLr4/L94LJ5_mAdtn-dpY3YBCTyy5XeN3PcaVVW9bszSy_H0",
//   "https://v5.airtableusercontent.com/v3/u/26/26/1709762400000/C6L5GQdkIZ11QMG6Dk_jMg/FsfxGGVoCM1I0eRhzkq2xdFmGjlGf5UMYwqMaM9ez5ZA8HokIfkjZtnfV2IhJ7Ja8WCj9kD80B7QfuG9Zpt6CpoVgTOI_9n3hbXzmT3KI0nyHKoAPzroupnXdV_Y9_LmCKKtB7xwSzSXbMmq2VunhFtHpxEzICOX_4V55yFrOiw/5qF0t-iQTj2fgKLsD7KGQlMUKs9gPKo4bQYTV6WQo_A",
//   "https://v5.airtableusercontent.com/v3/u/26/26/1709762400000/SVYF34WGyG1eZfgeaNPJqw/4owCVqCBqK10igYAiA4_mXqJkLS10DFd6GmQHhvmdyMNGZESavCIeqmQObqeRoXLuafIMJOtQ-Mimcb8S-cyvqOazjulUMbG3FULnH28dFR_OYMnCeQuwgnVci6kmJ64iyW9QDtTySfUi_PcZU_bDQ/jlqVz6AOPqBGD-r9EifhX15yaWXylR-gmr2U3wY5gms",
//   "https://v5.airtableusercontent.com/v3/u/26/26/1709762400000/cY_AFD1gGYNfJMyLGVAkqQ/ag32MXgq6sy4cSUWm-0Dl5fzZU7TRl2SKF0vqZV32-CvXbI0sxNkYQN5shAgK8d25mOXvpj004thhngfON4qYRN_hK7lcs6k-8jjsmUNL0LWYpShTBjgAfB8XNTgcI8kKzqPxvD-cTzUQBZ3JaWkQ_F_k_DNMQycoEiIkc7QWTU/7D6SIaqhHkKfPfi7F3M0WOwMsDo69QrXiRQw2MnRD8o",
//   "https://v5.airtableusercontent.com/v3/u/26/26/1709762400000/YuXooIohQJnM5LxQlScjxQ/oG0CDKzZJTGgEcv1SrkMmuaJl9TReZ5-jGzHt5KrTfL87nHcDCEvMNO-GW8RYg6ADqYMJ4QGHOUmwZq6O5B6IRblg-idNyqsq61JQ32ruBUQa17-VGRDf61uvb57vQP7pmp2a0aeOT4wUBotkzimQldZyQStCLw6P9tglDbGTY0/_MnlwU3UORAwvgzMbbl5Zr5FR2n4j5O7925ou8zOgxc",
//   "https://v5.airtableusercontent.com/v3/u/26/26/1709762400000/f6t-ANMaw_hVTwVFaTrlyg/hrHxH93DT5eFEcw4IxQ34N1A4mReW7wSRYau21rkDtGQo_gEAtd-NdhjF30e2_MMH-q-DjP--JDqsi9F2TZ520pFWu4PgmbU0CAJvr0yEz_IjXlebE1JAjCkrCQpqGYt-JoUhhJXEMFJDQOQv-tVGw/lLWj1TWwEnMpvFGt9sxugSGwbZKlrLWRKbrHXUkYi9Q",
//   "https://v5.airtableusercontent.com/v3/u/26/26/1709762400000/tM5eLpUxXUFK9U95DMs-vg/3jp2oSz-8KAYRzUROunOsCk4arv0h8e_Wlu6qsus-nSbFMv1_JH_6ETjrT7KXOrHujsQT_Pg4slW6duQlrzDsHV215wXv6wXoh4tdYhxhKAjYrpReFeYupkV_lfIHxlEzcdPrFp-ZVehadv8DiQcOqwyS9VTc-2BSZlXIKLwvbY/cZmITqWks3skxFmnkmNd4MWthrVOClU4KpZEx723-54",
//   "https://v5.airtableusercontent.com/v3/u/26/26/1709762400000/CG8EvRKx2_8q3nF4ifCuVw/v-Vi_OQ3xXlUl9_ngVbLXBklhJocejulDJAtMxyIZH4rsvZ4hLPxE8fiqerosac9x75LbeI39VbPgDhH_kGXuNbiqrIE0HmqphWpa-aqN2fK_3kIi89YQuPwidC2mH5sUg6ogyVHm60QCOwcv2XzXenl5C_r8bgiGGNUW3ZEleA/4PhrkqZv5kIYrs8kv-vNTbnIK58GUmEeHtvR4ssmsII",
//   "https://v5.airtableusercontent.com/v3/u/26/26/1709762400000/BtoUYI3-CPtoW4CN06v_5Q/VuehcvK_1EdjUP4SfqTeugW49OIk-xyMDistANd2S3OL9Y3ovRFYLoyQJWpkakz6i06SkQPz-iVntkb5hzTUw0PnN6JM958pWsobK1z0eLb12CiZKj9JCUlFHPyuvglQGb8kHsj0VA3KAIKajcAEKw/PfwkhoRzryRQp7vA73pu33GjTJox_42NGCDzsIRyiV4",
//   "https://v5.airtableusercontent.com/v3/u/26/26/1709762400000/skJQnSsBsw8HZWmVhBH0MQ/mu9Gk3IqDZS2kkTK_1zAOryfJEfasc4tFEcxYVaf4bpEb01exJpj16r8C6ddQvt_66XFvk2AnqRU9ysb1yRLGjKlJmPVxcihHJCZV_aDVRrkuBRW5VDqMA1w4sgwQl6d5m02y-izPeXEZCkQACDeBA/Hrj6xQF9js7Zh8OwDfmHIUl6Ff9jev6mFz24C_hOoCQ",
//   "https://v5.airtableusercontent.com/v3/u/26/26/1709762400000/JtcJZ7ftU-FTvnlh7XHrFA/EEZ5Ng02N04Yw9uSHYsqiPbFBIAkgLPduVy8jHS2tVFSw0S79_zoMgsOC-pugEY8b5_Qe1WY7B6PRa5msjxN2gF9iWYlO3qgXxq13pQxxBfm9NFZHIOoVbVwsjY2cIv8WJjpb4IyVsS5VXm011XOog/luuJTAiqgWNeNYc15NP2xsoUllvO3OpVY7OeNseKlWY",
//   "https://v5.airtableusercontent.com/v3/u/26/26/1709762400000/l1xuuRD9somB-34lRBi03w/9US7nN-kgclDeFDB1Ooorb3EDdVr5_lPXAX7jpstIb5t8l5KBCYYG1ImzQztd2opm9_EnbQvUKSIqwddiv2esppdEtI9b8qvPdRa9swGrBMyTUGzYlwXwxhWeoK63mMQmDn8af4YPDl7_6ZFaEkIdg/ORphXNlP3SOZglNxq-IJgHo94u04FtuEs2Drg5XA84I",
//   "https://v5.airtableusercontent.com/v3/u/26/26/1709762400000/oumpkDr7upa0ap-ur00YOw/GJK3Oa-QI4sZOqja9Xap3q0ysqEie2afcS3xdNUVRZcHRwcmXTjj3RjpPPaKg7MgUGSuN66RHOmFITWEklmYVit4QUYR2X68baR6T1mwR1Y41ayITdaOz0v2BigSuIII2NXySYBDSTXboOiBXkEix8FWCGS1ufLqFomek4EoMRU/CTFeuSQakk8CuAMKLh3ocSeB99lCKCUSRE-ZSyeKmns",
//   "https://v5.airtableusercontent.com/v3/u/26/26/1709762400000/Dd_L9jxJoY0kK1krmZ0rZw/n1kVT2YHkHhdrrS75KZYcy-H_ER7xXtRBKL2ok5TkHUBp1Gf3eT5sdD7IDCOLgTtHut_osRergNub2PBMiZvfRpQWczkb1mxgsGX6udDM9f_R8nhImJ7kHsM24U9JRXODr5RxInEtXyXyy2jpMBxBY2RytgriuU2JyYYcQZ4V-M/cwMkWIUtmuj-bjOiwTbQH4RZwrgDYzoWlWPbTW-o3aQ",
//   "https://v5.airtableusercontent.com/v3/u/26/26/1709762400000/CQa3XuJJ8GaXpw8TTyhSQg/h6DjskoddMJGK5lN-1NgcdNG9yKyWBzga5RpGIAiPezke6Qe1n2lPzn1Uu1N-NeUQpHlyqhv1HurIsymRYOmyETzxcbT06TfgBzdVnZdVWRUqMI835q4FpB6F_iuNjCIyZeRXET7TVkexCHWd7OE9ckX6nI28rqWEdfgsLgnqDU/kei5xpO5CTwIMbu3RkK_GpP4-iXUTeXg5GF1VT9tZVQ",
//   "https://v5.airtableusercontent.com/v3/u/26/26/1709762400000/HxeHga6m4K4udtj1hxRXMg/_afNAC9FEjWBRtxXKCJ-aJAQM1lqb6nxUQm-dyGYCR7HvuqftfsD5MxkDXE_NioHNqBqjGlJsTUDF_F7cm6PZVh92lWHGhlXdkpALK-C7brGjAgktZ2DoSVZbcvS_uWmc6Low3cl6neKTS_ALAottw/C8A4dwUQkJXBloRc1cW3QwoN6kIl7zm5xEpReHohmd4",
//   "https://v5.airtableusercontent.com/v3/u/26/26/1709762400000/qcDPokpzi1mLwpemKin0gg/YgOTcLaEyELeBUxLbGrboxxpECNN9dMWV38OkI_OsLSg3ytnNgL8WaBwqhhPPmhUffIP8YElO4SFgczv7e2_WbTlja7TkQM5E6sWCKrppp56G108oOMEw7ZaxuUihxeCkIfdo5IyMB-7ZkXqiu9fVw/JofnIixfE402_oEzDavAeq5D2jYmJlfyNOcHES-Ttt0",
//   "https://v5.airtableusercontent.com/v3/u/26/26/1709762400000/GGH10yXf_ZZE52yJvQz67Q/zA_HLETqIzZJ524fffyfp0kl8-Y4S0R05_FlSijo_osrYr5uo-ELY7g9i6j1JnCnihDWfHN76elaYeoBsVxbV0u5BGq3lA7GRQQXltemjO7NDGGI7GzOlkz8Myu7BqU88HrozT--SL15aZrpItZyQQ/NGs4VwLI3fQd8zk-GEIXtbLFk7FCHMwNe2hUvvr7K2Q",
// ];

// const downloadAllImagesInParallel = async (imageUrls, downloadPath) => {
//   await Promise.all(
//     imageUrls.map((imageUrl) => downloadImage(imageUrl, downloadPath))
//   );
//   console.log("All images downloaded successfully.");
// };

// // Example usage
// (async () => {
//   try {
//     await downloadAllImagesInParallel(imageUrls, downloadPath);
//     console.log("All images downloaded successfully.");
//   } catch (error) {
//     console.error(`Failed to download images: ${error.message}`);
//   }
// })();

// const downloadImage = async (imageUrl, imagePath) => {
//   const response = await axios({
//     method: "get",
//     url: imageUrl,
//     responseType: "stream",
//   });

//   if (!fs.existsSync(path.dirname(imagePath))) {
//     fs.mkdirSync(path.dirname(imagePath), { recursive: true });
//   }

//   const writer = fs.createWriteStream(imagePath);
//   response.data.pipe(writer);

//   return new Promise((resolve, reject) => {
//     writer.on("finish", resolve);
//     writer.on("error", reject);
//   });
// };

// const downloadImagesFromVendors = async (vendors, downloadPath) => {
//   try {
//     for (const vendor of vendors) {
//       // Assuming each vendor has an array of image URLs in the 'imageSize' property
//       if (vendor.imageSize && vendor.imageSize.images.length > 0) {
//         for (const image of vendor.imageSize.images) {
//           const imageUrl = image.url;
//           const imageName = path.basename(imageUrl);
//           const imagePath = path.join(downloadPath, imageName);
//           await downloadImage(imageUrl, imagePath);
//           console.log(`Downloaded: ${imageUrl}`);
//         }
//       }
//     }
//     console.log("All images downloaded successfully.");
//   } catch (error) {
//     console.error(`Failed to download images: ${error.message}`);
//   }
// };

// // Example usage
// const vendors = [new DataModellingVendors(fields["Tool Logo (60x60)"], 1)];

// const downloadPath = "public/images/tool-img";

// downloadImagesFromVendors(vendors, downloadPath);

export default { init };
