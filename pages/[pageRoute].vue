<template>
  <main>
    <!-- Hero section -->
    <section id="hero_section">
      <div
        class="bg-img-hero-section"
        :style="
          'background-image:linear-gradient(rgba(25,25,25,.25), rgba(25,25,25,.25)),url(' +
          getImageUrl(pageData.heroSectionImg) +
          ')'
        "
      >
        <div class="py-space-xl px-lg-space-xxl px-space-lg hero-section">
          <h1 class="h1-medium">
            <span class="bg-secondary p-space-xxs">{{ pageData.title }}</span>
          </h1>
          <div class="py-space-xs d-flex flex-wrap">
            <div v-for="(item, idx) in pageData.tag" :key="idx">
              <a
                @click="emitTags(item)"
                class="bg-light-2 p-space-xxxs fs-xs m-space-xxxs text-dark-3"
                role="button"
              >
                {{ item }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- End -->

    <!-- Sticky nav section -->

    <stickyNavBar
      :nav-items="navItemObject"
      title="On this page:"
      nav-item-variant="light-1"
      background-variant="dark-3"
      title-variant="light-1"
      icon-variant="light-1"
      :always-show-sticky-slot="true"
    >
      <template #stuckMenu>
        <div class="d-flex justify-content-end">
          <a
            v-if="pageData.ctaSupportLink"
            class="btn btn-secondary font-weight-bold ms-space-sm"
            :href="pageData.ctaSupportLink"
            target="_blank"
            @click="triggerStickyNavButton('')"
          >
            Support</a
          >
          <a
            v-if="pageData.ctaWebinarLink"
            class="btn btn-secondary text-medium font-weight-bold ms-space-sm"
            :href="pageData.ctaWebinarLink"
            target="_blank"
            @click="triggerStickyNavButton('')"
            >Webinar</a
          >
          <a
            v-if="pageData.ctaTryLink"
            class="btn btn-secondary text-medium font-weight-bold ms-space-sm"
            :href="pageData.ctaTryLink"
            target="_blank"
            @click="triggerStickyNavButton('')"
            >Try
          </a>
        </div>
      </template>
    </stickyNavBar>

    <!-- End -->

    <!-- video section -->

    <section id="video_section">
      <div class="p-lg-space-xxl px-space-xs py-space-lg">
        <video-modal-atlas
          :title="pageData.title"
          class="bg-dark-3"
          video-position="right"
          video-source="https://asuonline.wistia.com/medias/l6bb6qf05s"
          :bg-image-source="`/images/tool-img/${pageData.heroSectionImg}`"
          title-variant="light-1"
          @modalOpen="triggerplayBtnclickDataLayer('open', 'play button', '')"
          @modalClose="triggerplayBtnclickDataLayer('close', 'play button', '')"
        >
          <p class="text-light-1">
            <a :href="pageData.ctaLink" class="text-light-1"
              >{{ pageData.title }} </a
            >{{ pageData.text }}
          </p></video-modal-atlas
        >
      </div>
    </section>
    <!-- End -->

    <!-- feature section -->

    <section id="feature_section">
      <sectionParallax
        :bg-image-source="`/images/tool-img/${pageData.parallaxSectionImg}`"
        title="Features"
        title-size="large"
      >
        <template #body>
          <div>
            <p class="py-space-xs">
              {{ pageData.featureText }}
            </p>
            <ListTimeline
              :display-item-title="true"
              item-title-size="large"
              :items="pageData.features"
              number-bg-color="light-1"
            ></ListTimeline>
            <a
              :href="pageData.ctaFeaturesLink"
              target="_blank"
              class="btn btn-secondary"
              @click="triggerTryButton('')"
              >Try {{ pageData.title }}</a
            >
          </div>
        </template>
      </sectionParallax>
    </section>
    <!-- End -->

    <!-- preview section -->
    <section id="preview_section">
      <carousel-card-apollo
        :slides="pageData.previewImages"
        :slidesPerPage="4"
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
            <imageModalAtlas
              :imgSourceUrl="`/images/tool-img/${item.url}`"
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
          <div
            class="d-lg-flex px-lg-0 py-lg-space-md px-space-xs py-space-md row"
          >
            <div
              v-for="(data, idx) in visibleVendors"
              :key="idx"
              class="bg-white border ms-lg-space-xxs me-lg-space-xs mb-space-xs p-space-md card_spacing d-flex justify-content-between flex-column"
            >
              <div>
                <span class="d-flex justify-content-start"
                  ><img
                    :src="`/images/tool-img/${data.cardLogo}`"
                    alt="card logo"
                    class="img-fluid"
                /></span>
                <div class="my-space-sm custom-line"></div>
                <h3
                  class="mb-space-sm mb-md-space-md h3-large text-dark-3 text-start"
                >
                  {{ data.title }}
                </h3>
              </div>
              <div>
                <div class="d-flex flex-wrap">
                  <template v-for="(item, idx) in data.tag" :key="idx">
                    <a
                      class="bg-light-2 p-space-xxxs fs-xs m-space-xxxs text-dark-3"
                      @click="emitTags(item)"
                    >
                      {{ item }}
                    </a>
                  </template>
                </div>
                <a
                  :href="data.pageRoute"
                  class="btn btn-secondary mt-space-xs"
                  @click="triggerCardButtton(data.title)"
                  >Learn more</a
                >
              </div>
            </div>
          </div>
          <!-- End -->

          <!-- Load more button -->
          <div
            v-if="visibleVendors.length < relatedVendorsData.length"
            class="d-flex justify-content-center align-content-center"
          >
            <a
              role="button"
              @click="loadMore"
              class="text-primary mb-space-sm fw-bold text-decoration-underline"
            >
              Show more...
            </a>
          </div>

          <div
            v-else-if="visibleVendors.length > 4"
            class="d-flex justify-content-center align-content-center"
          >
            <a
              role="button"
              @click="loadLess"
              class="text-primary mb-space-sm fw-bold text-decoration-underline"
            >
              Show less...
            </a>
          </div>
          <!-- End -->

          <!-- ASU license owner section  -->
          <div class="py-space-lg py-lg-space-xl border-top border-3 d-lg-flex">
            <div class="pe-space-lg py-space-xs">
              <h2 class="h2-medium fw-bold">ASU license owner</h2>
              <div class="py-space-xs d-flex flex-wrap">
                <div v-for="(item, idx) in pageData.owner" :key="idx">
                  <a
                    href="#"
                    class="btn btn-light py-space-xs me-space-xxs"
                    @click="triggerAsuOwner(item)"
                    >{{ item }}</a
                  >
                </div>
              </div>
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
import { ref, computed } from "vue";

import stickyNavBar from "~/components/stickyNavBar.vue";
import sectionParallax from "~/components/sectionParallax.vue";
import imageModalAtlas from "../components/imageModalAtlas.vue";

import { VideoModalAtlas } from "@rds-vue-ui/video-modal-atlas";
import { SectionParallaxAtlas } from "@rds-vue-ui/section-parallax-atlas";
import { ListTimeline } from "@rds-vue-ui/list-timeline";
import { CarouselCardApollo } from "@rds-vue-ui/carousel-card-apollo";
import { analyticsComposable } from "@rds-vue-ui/analytics-gs-composable";

interface relatedVendorsData {
  title?: string;
  category?: string;
  tag?: string[];
  cardLogo?: string;
  pageRoute?: string;
}

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

let visibleItemsCount = ref<number>(4);
let relatedVendorsData = ref<relatedVendorsData[]>([]);
const navItemObject = ref<navItem>({
  video_section: "Overview",
  feature_section: "Feature",
  preview_section: "Preview",
  related_tool_section: "Related tools",
});

// testing purpose
// const listItemObject = ref([
//   {
//     title: "Feature",
//     text: "More updates are on the way.",
//   },
//   {
//     title: "Feature",
//     text: "More updates are on the way.",
//   },
//   {
//     title: "Feature",
//     text: "More updates are on the way.",
//   },
// ]);

// const slideItemObject = ref([
//   { img: "images/Group 119826.png" },
//   { img: "images/feature-section-img.png" },
//   { img: "images/feature-section-img.png" },
//   { img: "images/feature-section-img.png" },
//   { img: "images/feature-section-img.png" },
//   { img: "images/feature-section-img.png" },
//   { img: "images/feature-section-img.png" },
//   { img: "images/feature-section-img.png" },
// ]);

const route = useRoute();
const routeName = route.params.pageRoute as string;
const pageData = await queryContent("vendors")
  .where({ pageRoute: { $eq: routeName } })
  .findOne();

const router = useRouter();
const emitTags = (item: string): void => {
  router.push({ path: "/", query: { tag: item } });
};

const relatedData = await queryContent("vendors").find();

// Meta title and Meta description for sub pages
useHead({
  title: pageData.pageRoute,
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

//   fetch a particular number of items in the array of relatedVendorsData
const visibleVendors = computed(() => {
  return relatedVendorsData.value.slice(0, visibleItemsCount.value);
});

//   fetch all items in the array of relatedVendorsData
const loadMore = () => {
  visibleItemsCount.value = relatedVendorsData.value.length;
};

const loadLess = () => {
  visibleItemsCount.value = 4;
};

// loading bg img
const getImageUrl = (name: string): string => {
  return new URL(`../public/images/tool-img/${name}`, import.meta.url).href;
};

// filtering the cards based on tag in slug
const filteredData = relatedData.filter((data: relatedVendorsData) => {
  console.log("data", data);
  let shouldInclude = false;
  pageData.tag?.forEach((tag: string) => {
    console.log("inner loop", pageData.tag);
    if (data.tag.includes(tag)) {
      console.log("data", data, tag);
      shouldInclude = true;
      return;
    }
  });
  return shouldInclude;
});

relatedVendorsData.value = filteredData;

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

const triggerMobileNavItems = (eventObject: TrackingData): void => {
  analyticsComposable.trackEvent(eventObject);
};
const triggerSearchNavItems = (eventObject: TrackingData): void => {
  analyticsComposable.trackEvent(eventObject);
};
</script>

<style lang="scss">
.bg-img-hero-section {
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

.rds-modal-close.exterior svg[data-v-06e1beef] {
  fill: #fff;
}

svg[data-v-06e1beef]path[data-v-06e1beef] :focus {
  outline: none !important;
}

.header-image {
  background-image: linear-gradient(
    rgb(25, 25, 25, 0.25),
    rgba(25, 25, 25, 0.25)
  ) !important;
}
</style>
