<template>
  <div id="app-default-layout">
    <main>
      <slot />
    </main>
    <footer id="section-footer">
      <footer-standard @tertiaryMenuLinkClick="triggerDlTertiaryMenu"
        ><template #primary-section>
          <div class="bg-dark-3">
            <div class="container">
              <img
                src="../assets/images/asu-footer-logo.png"
                width="235px"
                class="py-space-sm"
                alt="primary footer logo"
              />
              <hr />
              <div class="py-space-md py-lg-space-lg">
                <a
                  href="mailto:learntech@asu.edu"
                  class="btn btn-lg bg-secondary py-space-xs px-space-md text-medium"
                  @click="triggerDlContact"
                  >Contact US</a
                >
              </div>
            </div>
          </div>
        </template>
        <template #secondary-menu>
          <nav
            class="nav grid-flex-menu order-2 order-lg-1 mb-space-sm mb-lg-0"
          >
            <a
              v-for="(item, index) in sectionFooter"
              :key="index"
              :href="item.uri"
              :target="formatLinkTarget(item.target)"
              class="nav-link text-dark-3 menu-item fw-bold py-space-xxs py-lg-0"
              rel="noopener noreferrer"
              @click="handleSecondaryMenuLinkClick(item)"
            >
              {{ item.text }}
            </a>
          </nav>
        </template></footer-standard
      >
    </footer>
  </div>
</template>
<script setup lang="ts">
import { FooterStandard } from "@rds-vue-ui/footer-standard";
import { analyticsComposable } from "@rds-vue-ui/analytics-gs-composable";
import { ref } from "vue";

type TrackingData = {
  event: string;
  name: string;
  action: string;
  type: string;
  region: string;
  section: string;
  text: string;
  component?: string;
};

const sectionFooter = ref([
  {
    text: "Maps and Locations",
    uri: "https://www.asu.edu/map/interactive/",
    target: "_blank",
  },
  {
    text: "Jobs",
    uri: "https://www.asu.edu/asujobs",
    target: "_blank",
  },
  {
    text: "Directory",
    uri: "https://isearch.asu.edu/asu-people/",
    target: "_blank",
  },
  {
    text: "Contact ASU",
    uri: "https://www.asu.edu/contactasu/",
    target: "_blank",
  },
  {
    text: "My ASU",
    uri: "https://my.asu.edu/",
    target: "_blank",
  },
]);

const formatLinkTarget = (target: string): string => {
  if (target == "SELF") {
    return "_self";
  } else {
    return "_blank";
  }
};

// Data layer
const handleSecondaryMenuLinkClick = (value: { text: string }) => {
  const eventObject = {
    event: "link",
    name: "onclick",
    action: "click",
    type: "internal link",
    region: "footer",
    section: "secondary footer",
    text: value.text.toLowerCase(),
  };
  analyticsComposable.trackEvent(eventObject);
};

const triggerDlContact = () => {
  const eventObject = {
    event: "link",
    action: "click",
    name: "onclick",
    type: "external link",
    region: "footer",
    section: "primary footer",
    text: "contact us",
  };
  analyticsComposable.trackEvent(eventObject);
};

const triggerDlTertiaryMenu = (event: TrackingData): void => {
  analyticsComposable.trackEvent(event);
};
</script>

<style>
nav.grid-flex-menu {
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-auto-flow: column;
  justify-items: start;
  flex-wrap: wrap;
  width: 100%;
}
/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
  nav.grid-flex-menu {
    display: flex;
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;
  }
  a.menu-item:hover {
    text-decoration: underline;
  }
}
</style>
