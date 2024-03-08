// https://nuxt.com/docs/api/configuration/nuxt-config
import fs from "fs";
import Path from "path";
const contentDirectory: string[] = [];

fs.readdir("./content/vendors/", (err, files) => {
  files.forEach((file) => {
    contentDirectory.push("/" + Path.parse(file).name);
  });
});
export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr: false,
  app: {
    head: {
      link: [{ rel: "icon", type: "image/x-icon", href: "favicon.ico" }],
    },
  },
  css: ["~/assets/scss/styles.scss"],
  components: [
    {
      path: "~/node_modules/@rds-vue-ui/",
      ignore: ["**/*.ts"],
    },
  ],
  plugins: [
    "~/plugins/useBootstrap.client.js",
    "~/plugins/fontawesome.js",
    "~/plugins/gtm.js",
  ],
  modules: ["@nuxt/content"],
  content: {
    experimental: {
      clientDB: true,
    },
  },
  generate: {
    routes: contentDirectory,
  },
});
