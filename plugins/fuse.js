import * as Fuse from "fuse.js";
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide("Fuse", Fuse);
});
