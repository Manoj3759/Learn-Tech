import dotenv from "dotenv";
dotenv.config();

// import Products from "./tables/products-service.js";
// import Edtech from "./tables/ed-tech-test.js";
import Vendors from "./tables/vendors.js";
async function main() {
  // await Products.init();
  // await Edtech.init();
  await Vendors.init();
}

main();
