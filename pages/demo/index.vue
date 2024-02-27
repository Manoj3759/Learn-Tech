<template>
  <main>
    <!-- header section -->
    <header id="section-header">
      <globalHeader
        home-title="Teach Online"
        rfi-cta-link="#"
        logo-link-url="https://www.asu.edu/"
        logo-link-target="_blank"
        rfi-cta-text="Tool Request Form"
        @homeClick="triggerHome($event)"
        @asuLogoClick="triggerHomeLogo($event)"
        @navCollapseHidden="triggerMobileNavItems($event)"
        @navCollapseShown="triggerMobileNavItems($event)"
        @asuSearchEvent="triggerSearchNavItems($event)"
      ></globalHeader>
    </header>
    <!-- End -->
    <!-- Hero section -->
    <section id="hero_section">
      <div class="bg-img-hero-section">
        <div class="py-space-xl px-lg-space-xxl px-space-lg">
          <h1 class="h1-medium">
            <span class="bg-secondary p-space-xxs">Ally</span>
          </h1>
          <div class="py-space-xs d-flex">
            <span class="bg-light-1 p-space-xxs fs-xs me-space-xxs"
              >Accessibility</span
            ><span class="bg-light-1 p-space-xxs fs-xs me-space-xxs"
              >Engagement</span
            >
          </div>
        </div>
      </div>
    </section>
    <!-- End -->

    <!-- Sticky nav section -->
    <section id="sticky_nav_section">
      <navbar-sticky-atlas
        :nav-items="navItemObject"
        title="On this page:"
        nav-item-variant="light-1"
        background-variant="dark-3"
        title-variant="light-1"
        icon-variant="light-1"
        :always-show-sticky-slot="true"
      >
        <template #stuckMenu>
          <div class="text-end">
            <a
              class="btn btn-secondary text-medium font-weight-bold ml-space-sm"
              href="#program-rfi"
              @click="triggerStickyNavButton('')"
              >Ally Support</a
            >
          </div>
        </template>
      </navbar-sticky-atlas>
    </section>
    <!-- End -->

    <!-- video section -->
    <section id="video_section">
      <div class="p-lg-space-xxl px-space-xs py-space-lg">
        <video-modal-atlas
          class="bg-dark-3"
          video-position="right"
          video-source="https://www.youtube.com/embed/hWKvcHdTgdE"
          bg-image-source="images/hero-section-img.png"
          title-variant="light-1"
          @modalOpen="triggerplayBtnclickDataLayer('open', 'play button', '')"
          @modalClose="triggerplayBtnclickDataLayer('close', 'play button', '')"
        >
          <p class="text-light-1">
            <a href="#" class="text-light-1">Lorem ipsum</a>
            dolor sit amet consectetur adipisicing elit. Odit quidem ipsa minus,
            distinctio quo neque laboriosam. Laudantium inventore, enim
            cupiditate quod quibusdam repellat ea possimus id, voluptates soluta
            vero labore!
          </p></video-modal-atlas
        >
      </div>
    </section>
    <!-- End -->

    <!-- feature section -->
    <section id="feature_section">
      <section-parallax-atlas
        bg-image-source="images/feature-section-img.png"
        title="Features"
        title-size="large"
      >
        <template #body>
          <div>
            <p class="py-space-xs">
              Check back later for more information. We’re currently updating
              this page to bring you valuable content and support.
            </p>
            <ListTimeline
              :display-item-title="true"
              item-title-size="large"
              :items="listItemObject"
              number-bg-color="light-1"
            ></ListTimeline>
            <a href="#" class="btn btn-secondary" @click="triggerTryButton('')"
              >Try Ally</a
            >
          </div>
        </template>
      </section-parallax-atlas>
    </section>
    <!-- End -->

    <!-- preview section -->
    <section id="preview_section">
      <carousel-card-apollo
        :slides="slideItemObject"
        title="Preview"
        title-variant="light-1"
        section-background-variant="dark-3"
        @nextSlideClick="triggerNextSlideClick"
        @previousSlideClick="triggerPreviousSlideClick"
        @indicatorClick="triggerIndicatorClick"
        @cardClick="triggerCardClick"
      >
        <template v-slot="slotProps">
          <div
            class="col"
            v-for="item in slotProps.paginatedSlides"
            :key="item.slideKey"
          >
            <!-- <div class="card">
              <img
                :src="item.img"
                class="card-img-top"
                style="height: 275px"
                alt="card image"
              />
            </div> -->
            <imageModalAtlas
              :imgSourceUrl="item.img"
              @modalOpen="triggerplayBtnclickDataLayer('open', 'image', '')"
              @modalClose="triggerplayBtnclickDataLayer('close', 'image', '')"
            ></imageModalAtlas>
          </div>
        </template>
      </carousel-card-apollo>
    </section>
    <!-- End -->

    <!-- related tools section -->
    <section id="related_tool_section">
      <div class="container">
        <div class="py-lg-space xxl py-space-lg">
          <h1 class="h1-medium">Related tools</h1>

          <!-- card section -->
          <div class="d-lg-flex px-lg-0 py-lg-space-md px-space-xs py-space-md">
            <div
              class="bg-white border mx-lg-space-xs mb-space-xs p-space-md card_spacing d-flex justify-content-between flex-column"
            >
              <div>
                <span class="d-flex justify-content-start"
                  ><img src="~/assets/images/hero-section-logo.png" alt=""
                /></span>
                <div class="my-space-sm custom-line"></div>
                <h3
                  class="mb-space-sm mb-md-space-md h3-large text-dark-3 text-start"
                >
                  Ally
                </h3>
              </div>
              <div>
                <div class="py-space-xs d-flex">
                  <span class="bg-light-1 p-space-xxs fs-xs me-space-xxs"
                    >Accessibility</span
                  ><span class="bg-light-1 p-space-xxs fs-xs me-space-xxs"
                    >Engagement</span
                  >
                </div>
                <a
                  href="#"
                  class="btn btn-secondary"
                  @click="triggerCardButtton('')"
                  >Learn more</a
                >
              </div>
            </div>
          </div>
          <!-- End -->

          <!-- ASU license owner section  -->
          <div class="py-space-lg py-lg-space-xl border-top border-3 d-lg-flex">
            <div class="pe-space-lg py-space-xs">
              <h2 class="h2-medium fw-bold">ASU license owner</h2>
              <a
                href="#"
                class="btn btn-light py-space-xs"
                @click="triggerAsuOwner('')"
                >Academic Enterprise</a
              >
            </div>
            <div class="pe-space-lg py-space-xs">
              <h2 class="h2-medium fw-bold">ASU contact</h2>
              <a
                href="#"
                class="btn btn-light py-space-xs"
                @click="triggerAsuContact('')"
                >Academic Enterprise</a
              >
            </div>
          </div>
          <!-- End -->
        </div>
      </div>
    </section>
    <!-- End -->
  </main>
</template>
<script lang="ts" setup>
import { NavbarStickyAtlas } from "@rds-vue-ui/navbar-sticky-atlas";
import { VideoModalAtlas } from "@rds-vue-ui/video-modal-atlas";
import { SectionParallaxAtlas } from "@rds-vue-ui/section-parallax-atlas";
import { ListTimeline } from "@rds-vue-ui/list-timeline";
import { CarouselCardApollo } from "@rds-vue-ui/carousel-card-apollo";
import globalHeader from "../components/globalHeader.vue";
import imageModalAtlas from "../components/imageModalAtlas.vue";
import { ref } from "vue";
import { analyticsComposable } from "@rds-vue-ui/analytics-gs-composable";

useHead({
  title: "",
  htmlAttrs: {
    lang: "en",
  },
  meta: [
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    {
      hid: "description",
      name: "description",
      content: "",
    },
    { name: "format-detection", content: "telephone=no" },
  ],
});

interface navItem {
  video_section: string;
  feature_section: string;
  preview_section: string;
  related_tool_section: string;
}

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

const navItemObject = ref<navItem>({
  video_section: "Overview",
  feature_section: "Feature",
  preview_section: "Preview",
  related_tool_section: "Related tools",
});

const listItemObject = ref([
  {
    title: "Feature",
    text: "More updates are on the way.",
  },
  {
    title: "Feature",
    text: "More updates are on the way.",
  },
  {
    title: "Feature",
    text: "More updates are on the way.",
  },
]);

const slideItemObject = ref([
  { img: "images/Group 119826.png" },
  { img: "images/feature-section-img.png" },
  { img: "images/feature-section-img.png" },
  { img: "images/feature-section-img.png" },
  { img: "images/feature-section-img.png" },
]);

// create gtm trigger events
const triggerStickyNavButton = (text: string) => {
  const eventObject = {
    event: "link",
    action: "click",
    name: "onclick",
    type: "internal link",
    region: "main content",
    section: "sticky navbar",
    text: text,
  };
  analyticsComposable.trackEvent(eventObject);
};

const triggerTryButton = (text: string): void => {
  const eventObject = {
    event: "link",
    action: "click",
    name: "onclick",
    type: "internal link",
    region: "main content",
    section: "features",
    text: text.toLocaleLowerCase(),
  };
  analyticsComposable.trackEvent(eventObject);
};

const triggerCardClick = () => {
  const eventObject = {
    event: "link",
    action: "click",
    name: "onclick",
    type: "internal link",
    region: "main content",
    section: "preview",
    text: "coming soon",
  };
  analyticsComposable.trackEvent(eventObject);
};

const triggerIndicatorClick = () => {
  const eventObject = {
    event: "select",
    action: "click",
    name: "onclick",
    type: "pagination",
    region: "main content",
    section: "preview",
    text: "owl dot",
  };
  analyticsComposable.trackEvent(eventObject);
};

const triggerCardButtton = (section: string): void => {
  const eventObject = {
    event: "link",
    action: "click",
    name: "onclick",
    type: "internal link",
    region: "main content",
    section: section.toLocaleLowerCase(),
    text: "learn more",
    component: "related tools",
  };
  analyticsComposable.trackEvent(eventObject);
};

const triggerPreviousSlideClick = () => {
  const eventObject = {
    event: "select",
    action: "click",
    name: "onclick",
    type: "carousel",
    region: "main content",
    section: "preview",
    text: "left chevron",
  };
  analyticsComposable.trackEvent(eventObject);
};

const triggerAsuOwner = (text: string): void => {
  const eventObject = {
    event: "link",
    action: "click",
    name: "onclick",
    type: "internal link",
    region: "main content",
    section: "asu license owner",
    text: text.toLowerCase(),
  };
  analyticsComposable.trackEvent(eventObject);
};

const triggerAsuContact = (text: string): void => {
  const eventObject = {
    event: "link",
    action: "click",
    name: "onclick",
    type: "internal link",
    region: "main content",
    section: "asu license owner",
    text: text.toLowerCase(),
  };
  analyticsComposable.trackEvent(eventObject);
};

const triggerNextSlideClick = () => {
  const eventObject = {
    event: "select",
    action: "click",
    name: "onclick",
    type: "carousel",
    region: "main content",
    section: "preview",
    text: "right chevron",
  };
  analyticsComposable.trackEvent(eventObject);
};

const triggerplayBtnclickDataLayer = (
  data: string,
  text: string,
  section: string
): void => {
  const eventObject = {
    event: "modal",
    action: data,
    name: "onclick",
    type: "click",
    region: "main content",
    section: section.toLocaleLowerCase(),
    text: text,
  };
  analyticsComposable.trackEvent(eventObject);
};

const triggerHome = (eventObject: TrackingData): void => {
  analyticsComposable.trackEvent(eventObject);
};

const triggerHomeLogo = (eventObject: TrackingData): void => {
  analyticsComposable.trackEvent(eventObject);
};

// const triggerNavItems = (eventObject: TrackingData): void => {
//   analyticsComposable.trackEvent(eventObject);
// };
const triggerMobileNavItems = (eventObject: TrackingData): void => {
  analyticsComposable.trackEvent(eventObject);
};
const triggerSearchNavItems = (eventObject: TrackingData): void => {
  analyticsComposable.trackEvent(eventObject);
};
</script>
<style lang="scss">
.bg-img-hero-section {
  background-image: url("~/assets/images/hero-section-img.png");
  background-repeat: no-repeat;
  background-size: cover;
}
.card_spacing {
  cursor: default;
  border-bottom: 3px solid var(--rds-secondary, #ffc627) !important;
  @media (min-width: 991px) {
    width: 255px;
    height: 420px;
  }
}
.custom-line {
  width: 54px;
  height: 8px;
  background-color: #ffc627;
}
</style>
