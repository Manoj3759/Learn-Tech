<template>
  <div id="app-default-layout">
    <header id="section-header">
      <HeaderStandard
        home-title="EdTech Connect"
        :display-rfi-cta="false"
        :display-apply-now="false"
        :navItems="headerNavItems"
      ></HeaderStandard>
    </header>
    <main>
      <slot />
    </main>
    <footer id="section-footer">
      <footer-standard @tertiaryMenuLinkClick="triggerDlTertiaryMenu"
        ><template #primary-section>
          <!-- <div class="bg-dark-3">
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
          </div> -->
          <div>
            <div class="bg-dark-3 pt-space-sm pt-lg-space-md">
              <div class="container">
                <div class="row px-space-xs px-lg-0 mb-space-sm mb-lg-space-md">
                  <div class="col-12 col-lg-6 mb-space-xs mb-lg-0">
                    <img
                      loading="lazy"
                      src="../assets/images/asu-footer-logo.png"
                      alt="ASU Online"
                      class="img-fluid"
                    />
                  </div>
                </div>
                <hr class="mx-space-xs mx-lg-0 my-0 footer-border-bottom" />
              </div>
            </div>
            <section
              class="bg-dark-3 text-white py-space-md pb-lg-space-xl pt-lg-space-lg"
            >
              <div class="container">
                <div class="row px-space-xs px-lg-0">
                  <div class="col-12 col-lg-4">
                    <p class="fs-large mb-0 text-light-1 fw-bold mb-space-sm">
                      Instructional Design and New Media
                    </p>
                    <a
                      href="https://airtable.com/apppjYD56k3fq9H2G/pagEXwlJgSpUVw6EQ/form"
                      class="btn bg-secondary mb-space-xs px-space-md text-medium"
                      @click="triggerDlContact"
                      >Contact US</a
                    >

                    <div class="d-block d-lg-none border-top border-white">
                      <a
                        class="d-block w-100 px-0 py-space-sm mobile-parent text-decoration-none collapsed"
                        aria-expanded="false"
                        aria-controls="ft-ps-online-degrees"
                        style="overflow-anchor: none"
                      >
                        <div
                          class="d-flex flex-row justify-content-between align-items-center"
                        >
                          <p
                            class="mb-0 text-large text-left text-white fw-bold"
                          >
                            Our service areas
                          </p>
                          <div
                            class="ml-space-xs ml-md-space-sm ml-lg-space-md"
                          >
                            <a
                              class="ml-space-xs ml-md-space-sm ml-lg-space-md"
                              data-bs-toggle="collapse"
                              href="#collapse-our-service"
                              role="button"
                              aria-expanded="false"
                              aria-controls="collapse-our-service"
                            >
                              <img
                                src="../assets/images/down-arrow.svg"
                                alt="down arrow icon"
                                height=" 20px"
                                width=" 20px"
                              />
                            </a>
                          </div>
                        </div>
                      </a>
                      <div id="collapse-our-service" class="collapse">
                        <div class="collapse-content mb-space-xs">
                          <p
                            v-for="(item, index) in primaryFooter.ourServices"
                            :key="index"
                            class="text-light-1"
                          >
                            <a
                              :href="item.url"
                              target="_blank"
                              class="mb-space-xs text-small text-light-1"
                            >
                              {{ item.title }}
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="d-block d-lg-none border-top border-white">
                      <a
                        class="d-block mobile-parent1 w-100 px-0 py-space-sm text-decoration-none collapsed"
                        aria-expanded="false"
                        aria-controls="ft-ps-tuition"
                        style="overflow-anchor: none"
                      >
                        <div
                          class="d-flex flex-row justify-content-between align-items-center"
                        >
                          <p
                            class="mb-0 text-large text-left text-white fw-bold"
                          >
                            Other resources
                          </p>
                          <div
                            class="ml-space-xs ml-md-space-sm ml-lg-space-md"
                          >
                            <a
                              class="ml-space-xs ml-md-space-sm ml-lg-space-md"
                              data-bs-toggle="collapse"
                              href="#collapse-other-resources"
                              role="button"
                              aria-expanded="false"
                              aria-controls="collapse-other-resources"
                            >
                              <img
                                src="../assets/images/down-arrow.svg"
                                alt="down arrow icon"
                                height=" 20px"
                                width=" 20px"
                              />
                            </a>
                          </div>
                        </div>
                      </a>
                      <div id="collapse-other-resources" class="collapse">
                        <div class="collapse-content mb-space-xs">
                          <p>
                            <a
                              title="Studios"
                              href="/studios"
                              target="_self"
                              class="mb-space-xs text-small text-white"
                            >
                              Studios
                            </a>
                          </p>
                          <p>
                            <a
                              title="Resources"
                              href="/resources"
                              target="_self"
                              class="mb-space-xs text-small text-white"
                            >
                              Resources
                            </a>
                          </p>
                          <p>
                            <a
                              title="Contact us"
                              href="/contact"
                              target="_self"
                              class="mb-space-xs text-small text-white"
                            >
                              Contact us
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="d-block d-lg-none border-top border-white">
                      <a
                        class="d-block mobile-parent2 w-100 px-0 py-space-sm text-decoration-none collapsed"
                        aria-expanded="false"
                        aria-controls="ft-ps-admission"
                        style="overflow-anchor: none"
                      >
                        <div
                          class="d-flex flex-row justify-content-between align-items-center"
                        >
                          <p
                            class="mb-0 text-large text-left text-white fw-bold"
                          >
                            Partner sites
                          </p>
                          <a
                            class="ml-space-xs ml-md-space-sm ml-lg-space-md"
                            data-bs-toggle="collapse"
                            href="#collapse-partner-sites"
                            role="button"
                            aria-expanded="false"
                            aria-controls="collapse-partner-sites"
                          >
                            <img
                              src="../assets/images/down-arrow.svg"
                              alt="down arrow icon"
                              height=" 20px"
                              width=" 20px"
                            />
                          </a>
                        </div>
                      </a>
                      <div id="collapse-partner-sites" class="collapse">
                        <div class="collapse-content mb-space-xs">
                          <p>
                            <a
                              title="asu.edu"
                              href="https://asu.edu"
                              target="_self"
                              class="mb-space-xs text-small text-white"
                            >
                              asu.edu
                            </a>
                          </p>
                          <p>
                            <a
                              title="ASU Online"
                              href="https://asuonline.asu.edu"
                              target="_self"
                              class="mb-space-xs text-small text-white"
                            >
                              ASU Online
                            </a>
                          </p>
                          <p>
                            <a
                              title="EdPlus"
                              href="https://edplus.asu.edu"
                              target="_self"
                              class="mb-space-xs text-small text-white"
                            >
                              EdPlus
                            </a>
                          </p>
                          <p>
                            <a
                              title="Teach Online"
                              href="https://teachonline.asu.edu"
                              target="_self"
                              class="mb-space-xs text-small text-white"
                            >
                              Teach Online
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="d-none d-lg-block col-lg-8">
                    <div class="row pl-space-xl pb-space-lg">
                      <div class="col-4">
                        <p class="text-medium text-white fw-bold mb-space-xs">
                          Our service areas
                        </p>
                        <div
                          v-for="(item, index) in primaryFooter.ourServices"
                          :key="index"
                        >
                          <p class="mb-space-xs footermenu-item">
                            <a
                              :href="item.url"
                              target="_blank"
                              class="text-small text-white"
                            >
                              {{ item.title }}
                            </a>
                          </p>
                        </div>
                      </div>
                      <div class="col-4">
                        <p
                          class="text-medium text-white fw-bold mb-space-xs"
                          data-v-22a323ba=""
                        >
                          Other resources
                        </p>
                        <p class="mb-space-xs footermenu-item">
                          <a
                            title="Studios"
                            href="/studios"
                            target="_self"
                            class="text-small text-white"
                            data-v-22a323ba=""
                          >
                            Studios
                          </a>
                        </p>
                        <p class="mb-space-xs footermenu-item">
                          <a
                            title="Resources"
                            href="/resources"
                            target="_self"
                            class="text-small text-white"
                            data-v-22a323ba=""
                          >
                            Resources
                          </a>
                        </p>
                        <p class="mb-0 footermenu-item">
                          <a
                            title="Contact us"
                            href="/contact"
                            target="_self"
                            class="text-small text-white"
                            data-v-22a323ba=""
                          >
                            Contact us
                          </a>
                        </p>
                      </div>
                      <div class="col-4">
                        <p class="text-medium text-white fw-bold mb-space-xs">
                          Partner sites
                        </p>
                        <p class="mb-space-xs footermenuitem">
                          <a
                            title="asu.edu"
                            href="https://asu.edu"
                            target="_self"
                            class="text-small text-underline text-secondary"
                            data-v-22a323ba=""
                          >
                            asu.edu
                          </a>
                        </p>
                        <p class="mb-space-xs footermenuitem">
                          <a
                            title="ASU Online"
                            href="https://asuonline.asu.edu"
                            target="_self"
                            class="text-small text-underline text-secondary"
                            data-v-22a323ba=""
                          >
                            ASU Online
                          </a>
                        </p>
                        <p class="mb-space-xs footermenuitem">
                          <a
                            title="EdPlus"
                            href="https://edplus.asu.edu"
                            target="_self"
                            class="text-small text-underline text-secondary"
                            data-v-22a323ba=""
                          >
                            EdPlus
                          </a>
                        </p>
                        <p class="mb-space-xs footermenuitem">
                          <a
                            title="Teach Online"
                            href="https://teachonline.asu.edu"
                            target="_self"
                            class="text-small text-underline text-secondary"
                            data-v-22a323ba=""
                          >
                            Teach Online
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
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
import HeaderStandard from "../components/globalHeader.vue";
// import { HeaderStandard } from "@rds-vue-ui/header-standard";
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

const primaryFooter = ref({
  ourServices: [
    {
      title: "Instructional Design",
      url: "https://idnm.asu.edu/service-areas/instructional-design/",
    },
    {
      title: "New Media",
      url: "https://idnm.asu.edu/service-areas/new-media/",
    },
    {
      title: "Quality Assurance",
      url: "https://idnm.asu.edu/service-areas/quality-assurance/",
    },
    {
      title: "Learning Technologies",
      url: "https://idnm.asu.edu/service-areas/learning-technologies/",
    },
    {
      title: "Professional development and training",
      url: "https://idnm.asu.edu/service-areas/professional-development%E2%80%931/",
    },
  ],
});

const headerNavItems = ref([
  {
    isActive: false,
    htmlLink: {
      text: "Instructional Design and New media",
      uri: "https://idnm.asu.edu/",
      target: "SELF",
    },
  },
  {
    isActive: false,
    htmlLink: {
      text: "TeachOnline",
      uri: "https://teachonline.asu.edu/",
      target: "SELF",
    },
  },
  {
    isActive: false,
    htmlLink: {
      text: "Learning Experience",
      uri: "https://lx.asu.edu/",
      target: "SELF",
    },
  },
  {
    isActive: false,
    htmlLink: {
      text: "Contact",
      uri: "https://airtable.com/apppjYD56k3fq9H2G/pagEXwlJgSpUVw6EQ/form",
      target: "SELF",
    },
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
