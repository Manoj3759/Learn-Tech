// // gtm.js
// ssr has to be false in nuxt config ts

export default defineNuxtPlugin(({ app }) => {
  // Insert Google Tag Manager script dynamically
  const script = document.createElement("script");
  script.innerHTML = `
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date()
    .getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d
    .createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j
    .src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','	GTM-55HMNPFK');
  `;

  // Append the script to the head of the document
  document.head.appendChild(script);

  // Google Tag Manager noscript iframe
  const noscript = document.createElement("noscript");
  noscript.innerHTML = `
    <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-W7LQSBN"
    height="0" width="0" style="display:none;visibility:hidden"></iframe>
  `;

  // Append the noscript iframe to the body of the document
  document.body.appendChild(noscript);
});
