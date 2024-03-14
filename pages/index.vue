<template>
  <main>
    <section class="container">
      <!-- intro section -->
      <section id="section-intro">
        <h1 class="h1-medium pt-space-xl"></h1>
        <p class="py-space-sm">
          Explore our library to find the support you need. Navigate through
          resources using tags organized by topics, tools, technology and media.
        </p>
      </section>
      <!-- End -->

      <section class="row">
        <!-- side bar filter section -->
        <aside
          id="section-filter-sidebar"
          class="col-lg-3 d-lg-block d-none p-space-xxs pt-0 mt-space-sm sticky-top bg-white"
        >
          <div
            class="border-bottom py-space-xs d-flex align-items-center justify-content-between"
          >
            <span class="fw-bold fs-large"
              >Filters ({{
                filteredVendorsTags.length + filteredVendorsCategory.length
              }})</span
            >
            <span
              role="button"
              class="text-primary text-decoration-underline"
              @click="clearFilter"
              >Clear all</span
            >
          </div>
          <!-- category check box -->
          <div class="py-space-xs border-bottom">
            <div class="d-flex align-items-center justify-content-between">
              <span class="fw-bold">Categories</span>

              <a
                class="category-collapse"
                href="#collapse-categories"
                data-bs-toggle="collapse"
                aria-expanded="true"
                aria-controls="collapse-categories"
                @click="visibleCategories = !visibleCategories"
              >
                <img
                  :src="visibleCategories ? minusimg : plusimg"
                  alt="collapse icon"
                />
              </a>
            </div>
            <div
              id="collapse-categories"
              :class="{
                collapse: !visibleCategories,
                show: visibleCategories,
              }"
            >
              <div
                v-for="(item, idx) in vendorsCategory"
                :key="item"
                :id="`category-check-box-${idx}`"
                class="text-dark-3"
              >
                <input
                  type="checkbox"
                  :id="`${item}-category-checkbox-${idx}`"
                  v-model="filteredVendorsCategory"
                  :value="item"
                  @change="triggerCheckBoxClick(item, 'categories')"
                />
                <label
                  :for="`${item}-category-checkbox-${idx}`"
                  class="pt-space-xs px-space-xxs"
                  >{{ item }}</label
                >
              </div>
            </div>
          </div>
          <!-- End -->

          <!-- tag check box -->
          <div class="pb-space-xs border-bottom">
            <div
              class="d-flex align-items-center justify-content-between sticky-top bg-white py-space-xs"
            >
              <span class="fw-bold">Tags</span>

              <a
                class="category-collapse"
                href="#collapse-tag"
                data-bs-toggle="collapse"
                aria-expanded="true"
                aria-controls="collapse-tag"
                @click="visibleTag = !visibleTag"
              >
                <img
                  :src="visibleTag ? minusimg : plusimg"
                  alt="collapse icon"
                />
              </a>
            </div>
            <div
              id="collapse-tag"
              :class="{
                collapse: !visibleTag,
                show: visibleTag,
              }"
            >
              <div id="section-filter-sidebar-tag">
                <div
                  v-for="(item, idx) in vendorsTag"
                  :key="item"
                  :id="`tag-check-box-${idx}`"
                  class="text-dark-3"
                >
                  <input
                    type="checkbox"
                    :id="`${item}-tag-checkbox-${idx}`"
                    v-model="filteredVendorsTags"
                    :value="item"
                    @click="triggerCheckBoxClick(item, 'tags')"
                  />
                  <label
                    :for="`${item}-tag-checkbox-${idx}`"
                    class="pt-space-xs px-space-xxs"
                    >{{ item }}</label
                  >
                </div>
              </div>
            </div>
          </div>
          <!-- End -->
        </aside>
        <!-- End -->

        <div class="col-lg-9 p-space-xs pt-0 mt-lg-space-sm">
          <!-- search bar section -->
          <section id="search-search-bar" class="sticky-top bg-white">
            <div class="py-space-xs">
              <div id="search-input-wrapper">
                <input
                  id="search"
                  v-model="searchValue"
                  class="form-control"
                  type="text"
                  placeholder="Search resources by name or filter"
                  aria-label="search bar input"
                  @change="triggerSearchBar(searchValue)"
                />
              </div>
              <div class="d-lg-none d-grid gap-2 mt-space-xs">
                <a
                  class="btn btn-dark"
                  data-bs-toggle="offcanvas"
                  href="#offcanvasExample"
                  role="button"
                  aria-controls="offcanvasExample"
                  @click="triggerFilterSideBar"
                  >Filters</a
                >
              </div>
            </div>

            <!-- toggle bar section -->
            <div class="d-flex align-items-center justify-content-between">
              <p class="fw-bold p-space-xxxs">
                {{ filteredVendors.length }} results
              </p>
              <div class="d-flex">
                <div
                  class="grid-filter p-space-xxs bg-color-svg"
                  :class="{ 'bg-dark-3': gridDisplay == 'inline-block' }"
                  @click="changeDisplay('grid-filter')"
                >
                  <div v-if="gridDisplay !== 'inline-block'">
                    <img
                      src="/images/list-thin-light.svg"
                      height="15px"
                      width="18px"
                      alt="list icon light"
                    />
                  </div>
                  <div v-else>
                    <img
                      src="/images/list-thin-dark.svg"
                      height="15px"
                      width="18px"
                      alt="list icon dark"
                    />
                  </div>
                </div>
                <div
                  class="list-filter p-space-xxs bg-color-svg"
                  :class="{ 'bg-dark-3': listDisplay == 'inline-block' }"
                  @click="changeDisplay('list-filter')"
                >
                  <div v-if="listDisplay !== 'inline-block'">
                    <img
                      src="/images/grid-thin-light.svg"
                      height="18px"
                      width="18px"
                      alt="grid icon light"
                    />
                  </div>
                  <div v-else>
                    <img
                      src="/images/grid-thin-dark.svg"
                      height="18px"
                      width="18px"
                      alt="grid icon dark"
                    />
                  </div>
                </div>
              </div>
            </div>
            <!-- End -->
          </section>
          <!-- End -->

          <!-- MObile side bar section -->
          <div
            class="offcanvas offcanvas-start container"
            tabindex="-1"
            id="offcanvasExample"
            aria-labelledby="offcanvasExampleLabel"
          >
            <div class="offcanvas-header row">
              <div
                class="offcanvas-title d-flex align-items-center justify-content-between border-bottom pb-space-sm"
                id="offcanvasExampleLabel"
              >
                <button class="btn btn-light text-dark-2" @click="clearFilter">
                  Clear all
                </button>
                <button
                  type="button"
                  class="text-reset btn btn-secondary"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                  @click="triggerCloseButton"
                >
                  Close
                </button>
              </div>
              <div class="px-0">
                <p
                  class="fw-bold fs-large mx-space-xs border-bottom py-space-xs"
                >
                  Filters ({{
                    filteredVendorsTags.length + filteredVendorsCategory.length
                  }})
                </p>
              </div>
            </div>
            <div class="offcanvas-body pt-0">
              <!-- category check box -->
              <div class="border-bottom">
                <div class="d-flex align-items-center justify-content-between">
                  <span class="fw-bold">Categories</span>

                  <a
                    class="category-collapse"
                    href="#collapse-categories"
                    data-bs-toggle="collapse"
                    aria-expanded="true"
                    aria-controls="collapse-categories-mobile"
                    @click="visibleCategories = !visibleCategories"
                  >
                    <img
                      :src="visibleCategories ? minusimg : plusimg"
                      alt="collapse icon"
                    />
                  </a>
                </div>
                <div
                  id="collapse-categories-mobile"
                  :class="{
                    collapse: !visibleCategories,
                    show: visibleCategories,
                  }"
                >
                  <div
                    v-for="item in vendorsCategory"
                    :key="item"
                    :id="`${item}-category-check-box-mobile`"
                    class="text-dark-3"
                  >
                    <input
                      type="checkbox"
                      :id="`${item}-category-checkbox`"
                      v-model="filteredVendorsCategory"
                      :value="item"
                      @click="triggerCheckBoxClick(item, 'categories')"
                    />
                    <label
                      :for="`${item}-category-checkbox`"
                      class="pt-space-xs px-space-xxs"
                      >{{ item }}</label
                    >
                  </div>
                </div>
              </div>
              <!-- End -->

              <!-- tag check box -->
              <div class="py-space-xs border-bottom">
                <div
                  class="d-flex align-items-center justify-content-between sticky-top bg-white pb-space-xs"
                >
                  <span class="fw-bold">Tags</span>

                  <a
                    class="category-collapse"
                    href="#collapse-tag"
                    data-bs-toggle="collapse"
                    aria-expanded="true"
                    aria-controls="collapse-tag-mobile"
                    @click="visibleTag = !visibleTag"
                  >
                    <img
                      :src="visibleTag ? minusimg : plusimg"
                      alt="collapse icon"
                    />
                  </a>
                </div>
                <div
                  id="collapse-tag-mobile"
                  :class="{
                    collapse: !visibleTag,
                    show: visibleTag,
                  }"
                >
                  <div
                    v-for="(item, idx) in vendorsTag"
                    :key="item"
                    :id="`tag-checkbox-${idx}`"
                    class="text-dark-3"
                  >
                    <input
                      type="checkbox"
                      :id="`${item}-tag-checkbox-mobile-${idx}`"
                      v-model="filteredVendorsTags"
                      :value="item"
                      @click="triggerCheckBoxClick(item, 'tags')"
                    />
                    <label
                      :for="`${item}-tag-checkbox-mobile-${idx}`"
                      class="pt-space-xs px-space-xxs"
                      >{{ item }}</label
                    >
                  </div>
                </div>
              </div>
              <!-- End -->
            </div>
          </div>
          <!-- End -->

          <!-- view items section -->
          <section id="view_items_section">
            <!-- card section -->

            <section
              id="card_section"
              v-show="listDisplay == 'inline-block' ? true : false"
            >
              <div
                class="d-lg-flex px-lg-0 py-lg-space-md px-space-xs py-space-md row"
              >
                <div
                  v-for="(data, idx) in visibleVendors"
                  :key="idx"
                  class="bg-white border me-lg-space-xxs ms-lg-space-xs mb-space-xs p-space-md card_spacing d-flex justify-content-between flex-column"
                >
                  <div>
                    <span class="d-flex justify-content-start"
                      ><img
                        :src="`/images/tool-img/${data.cardLogo}`"
                        alt="card logo"
                        class="img-fluid"
                    /></span>
                    <div class="my-space-sm custom-line"></div>
                    <h3 class="mb-space-xs h3-large text-dark-3 text-start">
                      {{ data.title }}
                    </h3>
                  </div>

                  <div>
                    <div class="d-flex flex-wrap">
                      <template v-for="(item, idx) in data.tag" :key="idx">
                        <a
                          role="button"
                          class="bg-light-2 p-space-xxxs fs-xs m-space-xxxs text-dark-3"
                          @click="filterBAsedOnTags(item)"
                        >
                          {{ item }}
                        </a>
                      </template>
                      <a
                        role="button"
                        class="bg-light-2 p-space-xxxs fs-xs m-space-xxxs text-dark-3"
                        @click="filterBAsedOnCategory(data.category)"
                      >
                        {{ data.category }}
                      </a>
                    </div>
                    <a
                      :href="data.pageRoute"
                      class="btn btn-secondary mt-space-xs"
                      @click="triggerButtonClick(data.title)"
                      >Learn more</a
                    >
                  </div>
                </div>
              </div>
              <!-- show more button -->
              <div
                v-if="visibleVendors.length < filteredVendors.length"
                class="d-flex justify-content-center align-content-center"
              >
                <a
                  role="button"
                  @click="loadMore"
                  class="text-primary mb-space-sm fw-bold text-decoration-underline"
                >
                  Show more
                </a>
              </div>
              <div
                v-else-if="visibleVendors.length > 3"
                class="d-flex justify-content-center align-content-center"
              >
                <a
                  href="#"
                  role="button"
                  @click="loadLess"
                  class="text-primary mb-space-sm fw-bold text-decoration-underline"
                >
                  Show less
                </a>
              </div>
              <!-- End -->
            </section>
            <!-- list grid section -->
            <section
              id="list_grid_section"
              v-show="gridDisplay == 'inline-block' ? true : false"
            >
              <div
                class="px-lg-0 py-lg-space-md px-space-xs py-space-md d-none d-xl-block"
              >
                <div
                  v-for="(data, idx) in visibleVendors"
                  :key="idx"
                  class="col-12 bg-white border-bottom border-2 mb-space-xs p-space-md d-flex justify-content-between"
                >
                  <div class="col-9 d-flex">
                    <span class="d-flex justify-content-start pe-space-sm"
                      ><img
                        :src="`/images/tool-img/${data.cardLogo}`"
                        width="144px"
                        height="36px"
                        alt="card logo"
                    /></span>

                    <div class="d-flex flex-column">
                      <h3 class="h3-large text-dark-3 text-start">
                        {{ data.title }}
                      </h3>
                      <div class="py-space-xs d-flex flex-wrap">
                        <a
                          role="button"
                          class="bg-light-2 p-space-xxs fs-xs me-space-xxs mb-space-xxs text-dark-3"
                          @click="filterBAsedOnCategory(data.category)"
                        >
                          {{ data.category }}
                        </a>
                        <template
                          v-for="(item, idx) in displayedTags[idx]"
                          :key="idx"
                        >
                          <a
                            role="button"
                            class="bg-light-2 p-space-xxs fs-xs me-space-xxs text-dark-3 mb-space-xxs"
                            @click="filterBAsedOnTags(item)"
                            >{{ item }}</a
                          >
                        </template>
                        <a
                          v-if="
                            data.tag &&
                            displayedTags[idx] &&
                            displayedTags[idx].length < data.tag.length
                          "
                          :key="idx"
                          role="button"
                          class="bg-light-2 text-dark-3 fs-small me-space-xxs mb-space-xxs p-space-xxs"
                          @click="showAllTags(data.tag, idx)"
                        >
                          +{{ data.tag.length - displayedTags[idx].length }}
                        </a>
                        <a
                          class="bg-light-2 text-dark-3 fs-small me-space-xxs mb-space-xxs p-space-xxs"
                          role="button"
                          v-else-if="
                            displayedTags[idx] && displayedTags[idx].length > 2
                          "
                          @click="ShowLessTags(displayedTags[idx], idx)"
                        >
                          -{{ displayedTags[idx].length - 2 }}
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="col-3 d-flex justify-content-end">
                    <div>
                      <a
                        role="button"
                        :href="data.pageRoute"
                        class="btn btn-secondary"
                        @click="triggerButtonClick(data.title)"
                        >Learn more</a
                      >
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <!-- End -->

            <!-- list grid section mobile view -->
            <section
              id="list_grid_section_mobile"
              v-show="gridDisplay == 'inline-block' ? true : false"
            >
              <div
                class="px-lg-0 py-lg-space-md px-space-xs py-space-md d-xl-none d-block"
              >
                <div
                  v-for="(data, idx) in visibleVendors"
                  :key="idx"
                  class="bg-white border-bottom border-2 mx-lg-space-xs mb-space-xs p-space-md"
                >
                  <div class="row">
                    <h3 class="h3-large text-dark-3 text-start">
                      {{ data.title }}
                    </h3>
                    <div class="py-space-xs d-flex flex-wrap">
                      <div
                        v-for="(item, idx) in data.tag"
                        :key="idx"
                        class="my-space-xxs"
                      >
                        <a
                          role="button"
                          class="bg-light-2 p-space-xxs fs-xs me-space-xxs text-dark-3"
                          @click="filterBAsedOnTags(item)"
                          >{{ item }}</a
                        >
                      </div>
                      <div class="my-space-xxs">
                        <a
                          role="button"
                          class="bg-light-2 p-space-xxs fs-xs me-space-xxs text-dark-3"
                          @click="filterBAsedOnCategory(data.category)"
                        >
                          {{ data.category }}
                        </a>
                      </div>
                    </div>
                  </div>
                  <div>
                    <a
                      role="button"
                      :href="data.pageRoute"
                      class="btn btn-secondary"
                      @click="triggerButtonClick(data.title)"
                      >Learn more</a
                    >
                  </div>
                </div>
              </div>
              <!-- show more button -->
              <div
                v-if="visibleVendors.length < filteredVendors.length"
                class="d-flex justify-content-center align-content-center"
              >
                <a
                  role="button"
                  @click="loadMore"
                  class="text-primary mb-space-sm fw-bold text-decoration-underline"
                >
                  Show more
                </a>
              </div>
              <div
                v-else-if="visibleVendors.length > 3"
                class="d-flex justify-content-center align-content-center"
              >
                <a
                  href="#"
                  role="button"
                  @click="loadLess"
                  class="text-primary mb-space-sm fw-bold text-decoration-underline"
                >
                  Show less
                </a>
              </div>
              <!-- End -->
            </section>
            <!-- End -->
          </section>
          <!-- End -->
        </div>
      </section>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from "vue";

import Fuse from "fuse.js";

import { analyticsComposable } from "@rds-vue-ui/analytics-gs-composable";

// useHead({
//   title: "EdTech Connect | IDNM",
//   htmlAttrs: {
//     lang: "en",
//   },
//   meta: [
//     { charset: "utf-8" },
//     { name: "viewport", content: "width=device-width, initial-scale=1" },
//     {
//       hid: "description",
//       name: "description",
//       content:
//         "Explore a range of online learning tools from assessment and grading to curriculum, AI resources and more.",
//     },
//     { name: "format-detection", content: "telephone=no" },
//   ],
//   link: [{ rel: "icon", type: "image/x-icon", href: "favicon.ico" }],
// });

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

interface fuseOptions {
  isCaseSensitive: boolean;
  includeScore: boolean;
  useExtendedSearch: boolean;
  includeMatches: boolean;
  minMatchCharLength: 1;
  shouldSort: boolean;
  findAllMatches: boolean;
  location: number;
  threshold: number;
  distance: number;
  keys: string[];
}

interface vendorsData {
  title: string;
  category: string;
  tag: string[] | null;
}

interface visibleVendorsData {
  title?: string;
  category?: string;
  tag?: string[];
  cardLogo?: string;
  pageRoute?: string;
}

let fuseInstance = ref();

let gridDisplay = ref<string>("");
const searchValue = ref<string>("");

let displayedTags = ref<string[]>([]);
let filteredVendors = ref<string[]>([]);
let filteredVendorsTags = ref<string[]>([]);
let filteredVendorsCategory = ref<string[]>([]);
let vendorsCategory = ref<string[]>([]);
let vendorsTag = ref<string[]>([]);
let category: string[] = [];
let tag: string[] = [];

let visibleTag = ref<boolean>(true);
let visibleCategories = ref<boolean>(true);

let visibleItemsCount = ref<number>(9);

let listDisplay = ref<string>("inline-block");
let minusimg = ref<string>(
  "https://currentstudent.asuonline.asu.edu/sites/default/files/Icon%20-%20minus-circle-solid.png"
);
let plusimg = ref<string>(
  "https://currentstudent.asuonline.asu.edu/sites/default/files/plus-circle-solid.svg"
);

const fuseOptions = ref<fuseOptions>({
  isCaseSensitive: false,
  includeScore: true,
  useExtendedSearch: true,
  includeMatches: true,
  minMatchCharLength: 1,
  shouldSort: true,
  findAllMatches: false,
  location: 0,
  threshold: 0.2,
  distance: 200,
  keys: ["title", "tag", "category"],
});

const route = useRoute();
const currentRoute = route.query.tag;

let pageData: visibleVendorsData[] = await queryContent("vendors")
  .only(["title", "tag", "category", "cardLogo", "pageRoute"])
  .find();

// mounted
onMounted(() => {
  searchPrograms();
  // Push the sliced array into displayedTags array
  pageData.forEach((tag: visibleVendorsData) => {
    displayedTags.value.push(tag.tag.slice(0, 2));
  });
});

const data: visibleVendorsData[] = JSON.parse(JSON.stringify(pageData));
// initialise Fuse with the index
fuseInstance.value = new Fuse(data, fuseOptions.value);

//computed
// fetch a particular number of items in the array of filteredVendors
const visibleVendors = computed(() => {
  return filteredVendors.value.slice(0, visibleItemsCount.value);
});

//methods
// fetch all items in the array of filteredVendors
const loadMore = () => {
  visibleItemsCount.value = filteredVendors.value.length;
};

// fetch all items in the array with length 9
const loadLess = () => {
  visibleItemsCount.value = 6;
};

const showAllTags = (tags: string[], i: number): void => {
  displayedTags.value[i] = [...tags];
};

const ShowLessTags = (tagArray: string[], i: number) => {
  console.log("tagArray", tagArray);
  return (displayedTags.value[i] = tagArray.slice(0, 2));
};

// sorting of items
const sortByTitle = (a: vendorsData, b: vendorsData): number => {
  if (a.title.toLowerCase() < b.title.toLowerCase()) {
    return -1;
  } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
    return 1;
  }
  return 0;
};

// search value using fuse JS
const searchPrograms = () => {
  const query = getSearchQuery();
  if (query.length > 0) {
    const searchResult = fuseInstance.value.search({
      $or: query,
    });
    filteredVendors.value = searchResult.map((vendors) => {
      return vendors.item;
    });
  } else {
    filteredVendors.value = data.sort(sortByTitle);
  }
};

function getSearchQuery() {
  const searchQuery = [];

  // populate filters - if pre-selected before input of search query
  if (searchValue.value !== "") {
    searchQuery.push({ title: searchValue.value });
    searchQuery.push({ tag: searchValue.value });
    searchQuery.push({ category: searchValue.value });
  }
  if (filteredVendorsTags.value.length > 0) {
    const interestAreaQuery = { $or: [] };
    filteredVendorsTags.value.forEach((item) => {
      interestAreaQuery.$or.push({ tag: `^${item}` });
    });

    searchQuery.push(interestAreaQuery);
  }
  if (filteredVendorsCategory.value.length > 0) {
    const categoryQuery = { $or: [] };

    filteredVendorsCategory.value.forEach((item) => {
      categoryQuery.$or.push({ category: `^${item}` });
    });

    searchQuery.push(categoryQuery);
  }

  return searchQuery;
}

searchPrograms();
data.filter((program) => {
  if (
    !category.includes(program.category) &&
    program.category !== "" &&
    program.category !== undefined
  ) {
    category.push(program.category);
  }

  if (program.tag !== null) {
    program.tag.forEach((vendor) => {
      if (!tag.includes(vendor)) {
        tag.push(vendor);
      }
    });
  }
  vendorsCategory.value = category.sort();
  vendorsTag.value = tag.sort();
});

// toggle between views (card / grid)
const changeDisplay = (action: string): void => {
  if (action === "list-filter") {
    listDisplay.value = "inline-block";
    gridDisplay.value = "none";
    const eventObject = {
      event: "link",
      action: "click",
      name: "onclick",
      type: "internal link",
      region: "main content",
      section: "learning technology platform",
      text: "list icon",
    };
    analyticsComposable.trackEvent(eventObject);
  } else {
    gridDisplay.value = "inline-block";
    listDisplay.value = "none";
    const eventObject = {
      event: "link",
      action: "click",
      name: "onclick",
      type: "internal link",
      region: "main content",
      section: "learning technology platform",
      text: "tile icon",
    };
    analyticsComposable.trackEvent(eventObject);
  }
};

// filter cards based on tags
const filterBAsedOnTags = (val: string): void => {
  filteredVendorsTags.value[0] = val;
  const sectionId = document.getElementById("view_items_section");

  if (sectionId) {
    sectionId.scrollIntoView({ behavior: "smooth" });
  }
};

// filter cards based on category
const filterBAsedOnCategory = (val: string): void => {
  filteredVendorsCategory.value[0] = val;
  const sectionId = document.getElementById("view_items_section");

  if (sectionId) {
    sectionId.scrollIntoView({ behavior: "smooth" });
  }
};

if (currentRoute) {
  filterBAsedOnTags(currentRoute);
}

// clear all the selected fields
const clearFilter = () => {
  searchValue.value = "";
  filteredVendorsTags.value = [];
  filteredVendorsCategory.value = [];
  const eventObject = {
    event: "link",
    action: "click",
    name: "onclick",
    type: "internal link",
    region: "main content",
    section: "filters",
    text: "clear all",
    component: "learning technology platform",
  };
  analyticsComposable.trackEvent(eventObject);
};

watch(
  [searchValue, () => searchPrograms()],
  [filteredVendorsCategory, () => searchPrograms()],
  [filteredVendorsTags, () => searchPrograms()]
);

// create gtm trigger events

const triggerCheckBoxClick = (text: string, section: string): void => {
  if (filteredVendorsTags) {
    const eventObject = {
      event: "select",
      action: "click",
      name: "onclick",
      type: "checkbox",
      region: "main content",
      section: section.toLowerCase(),
      text: text.toLowerCase(),
      component: "filters",
    };
    analyticsComposable.trackEvent(eventObject);
  } else {
    const eventObject = {
      event: "select",
      action: "unclick",
      name: "onclick",
      type: "checkbox",
      region: "main content",
      section: section.toLowerCase(),
      text: text.toLowerCase(),
      component: "filters",
    };
    analyticsComposable.trackEvent(eventObject);
  }
};

const triggerButtonClick = (section: string): void => {
  const eventObject = {
    event: "link",
    action: "click",
    name: "onclick",
    type: "internal link",
    region: "main content",
    section: section.toLowerCase(),
    text: "learn more",
    component: "learning technology platform",
  };
  analyticsComposable.trackEvent(eventObject);
};
const triggerSearchBar = (text: string): void => {
  const eventObject = {
    event: "search",
    action: "type",
    name: "onenter",
    type: "search resources",
    region: "main content",
    section: "learning technology platform",
    text: text.toLowerCase(),
  };
  analyticsComposable.trackEvent(eventObject);
};
const triggerFilterSideBar = () => {
  const eventObject = {
    event: "collapse",
    action: "open",
    name: "onclick",
    type: "click",
    region: "main content",
    section: "learning technology platform",
    text: "filters",
  };
  analyticsComposable.trackEvent(eventObject);
};

const triggerCloseButton = () => {
  const eventObject = {
    event: "collapse",
    action: "close",
    name: "onclick",
    type: "click",
    region: "navbar",
    section: "main navbar",
    text: "close button",
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
.card_spacing {
  cursor: default;
  border-bottom: 8px solid var(--rds-secondary, #ffc627) !important;
  @media (min-width: 991px) {
    width: 255px;
    height: 420px;
  }
}

.custom-line {
  width: 30px;
  height: 4px;
  background-color: #ffc627;
}

#section-filter-sidebar {
  max-height: calc(100vh);
}

#section-filter-sidebar-tag {
  max-height: calc(100vh - 64vh);
  overflow-y: auto;
}

input[type="checkbox"] {
  accent-color: #ffc627;
}

.category-collapse:focus {
  outline: none;
}

.svg-color {
  color: #fafafa;
}

.bg-color-svg {
  background-color: #f1f1f1;
}
.form-control {
  border-radius: 0px;
  z-index: 1;
}

#search-input-wrapper {
  position: relative;
  display: block;
}

#search-input-wrapper::after {
  content: "";
  position: absolute;
  z-index: 1;
  top: 0;
  bottom: 0;
  margin: auto;
  right: 10px;
  background: url("/images/search-icon.svg") no-repeat center;
  background-size: 23px auto;
  height: 30px;
  width: 30px;
}
</style>
