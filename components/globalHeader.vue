<template>
  <header
    class="bg-white base-header"
    :class="{ 'sticky-top': isSticky }"
    ref="root"
  >
    <div class="d-block d-lg-none mobile-nav border-bottom">
      <div class="container-fluid px-0">
        <div class="row gx-0">
          <div class="col-12">
            <div
              class="d-flex align-items-center justify-content-between pt-space-sm px-space-xs"
            >
              <a
                :href="`#${mainContentId}`"
                class="sr-only sr-only-focusable fs-xs"
                >Skip to main content</a
              >
              <a
                href="https://accessibility.asu.edu/report"
                class="sr-only sr-only-focusable fs-xs"
                >Report an accessibility problem</a
              >
              <!-- mobile asu logo -->
              <a
                :href="logoLinkUrl"
                :target="logoLinkTarget"
                @click="handleAsuLogoClick"
              >
                <img
                  src="https://live-asuocms.ws.asu.edu/sites/default/files/asu-horizontal-logo.png"
                  alt="Arizona State University logo"
                  class="horizontal-logo"
                />
              </a>

              <button
                @click="handleMobileNavToggle()"
                class="btn p-0 rounded-0"
                aria-label="expand site navigation"
              >
                <font-awesome-icon
                  :class="
                    mobileNavExpanded ? `mobile-nav-close` : `mobile-nav-open`
                  "
                  :icon="mobileNavExpanded ? faTimes : faBars"
                  size="2x"
                  :aria-label="mobileNavExpanded ? `close icon` : `open icon`"
                ></font-awesome-icon>
              </button>
            </div>

            <div class="pt-space-xs">
              <!-- mobile home -->
              <a
                href="/"
                class="fw-bold text-dark-3 fs-large"
                @click="handleHomeClick(homeTitle.toLowerCase())"
              >
                <p class="px-space-xs">
                  {{ homeTitle }}
                </p>
              </a>
              <transition
                name="mobile-nav"
                @enter="startCollapseAnimation"
                @after-enter="endCollapseAnimation"
                @before-leave="startCollapseAnimation"
                @after-leave="endCollapseAnimation"
              >
                <div
                  ref="mobileCollapse"
                  v-if="mobileNavExpanded"
                  role="region"
                  class="collapse"
                >
                  <div class="mobile-nav-items">
                    <a
                      class="d-block border-bottom w-100 pb-space-xs px-space-xs text-dark-3 fs-large"
                      href="/"
                      data-cy="asuo-home-button"
                    >
                      <p
                        class="position-relative width-max-content mb-0 fs-large text-left text-dark-3"
                        :class="{
                          'active-collapse': isHomepage(),
                        }"
                      >
                        Home
                      </p>
                    </a>
                    <!-- nav-items -->
                    <rds-accordion start-collapsed>
                      <div
                        class="nav-items"
                        v-for="(item, index) in navItemsRef"
                        :key="index"
                        :class="
                        index !== navItemsRef!.length - 1 ? 'border-bottom' : ``
                      "
                      >
                        <div v-if="hasChildren(item)">
                          <collapse-item
                            class="mobile-menu-collapse"
                            :display-highlight="false"
                            border-variant="light-4"
                            content-background-variant="white"
                            button-size="sm"
                            :data-cy="generateCypressId(item.htmlLink.text)"
                            :collapse-id="
                              generateCollapseId(item.htmlLink.text)
                            "
                            @collapse-shown="handleCollapseShow(item)"
                            @collapse-hidden="handleCollapseHide(item)"
                          >
                            <template #title-slot>
                              <span
                                class="position-relative"
                                :class="{ 'active-collapse': isActive(item) }"
                                >{{ item.htmlLink.text }}</span
                              >
                            </template>

                            <template v-if="item.children">
                              <ul class="ps-0 mb-0">
                                <li
                                  class="remove-ul-dots pb-space-xxs"
                                  v-for="(child, index) in item.children"
                                  :key="index"
                                >
                                  <a
                                    class="fs-medium text-dark-3"
                                    :aria-label="child.htmlLink.text"
                                    :href="child.htmlLink.uri"
                                    :target="
                                      formatLinkTarget(child.htmlLink.target)
                                    "
                                    @click="
                                      handleNavLinkClick(
                                        child.htmlLink.text,
                                        'main navbar'
                                      )
                                    "
                                    :data-cy="
                                      generateCypressId(
                                        child.htmlLink.text,
                                        true
                                      )
                                    "
                                  >
                                    {{ child.htmlLink.text }}
                                  </a>
                                </li>
                              </ul>
                            </template>
                          </collapse-item>
                        </div>
                        <div v-else>
                          <a
                            class="d-block w-100 p-space-xs fs-large text-dark-3"
                            :aria-label="item.htmlLink.text"
                            :href="item.htmlLink.uri"
                            :target="formatLinkTarget(item.htmlLink.target)"
                            @click="
                              handleNavLinkClick(
                                item.htmlLink.text,
                                'main navbar'
                              )
                            "
                            :data-cy="generateCypressId(item.htmlLink.text)"
                          >
                            <p
                              class="position-relative width-max-content mb-0 fs-large text-start text-dark-3"
                              :class="{
                                'active-collapse': isActive(item),
                              }"
                            >
                              {{ item.htmlLink.text }}
                            </p>
                          </a>
                        </div>
                      </div>
                    </rds-accordion>
                  </div>

                  <div class="mobile-navbar-footer bg-light-2 border-top">
                    <div class="p-space-xs position-relative">
                      <!-- mobile search -->
                      <font-awesome-icon
                        :icon="faSearch"
                        aria-label="open search"
                        class="position-absolute mobile-search-icon"
                      ></font-awesome-icon>
                      <input
                        class="form-control rounded-0 search-input"
                        type="search"
                        name="mobile-search"
                        id="mobile-search"
                        placeholder="Search ASU"
                        aria-label="search ASU"
                        v-model="searchText"
                        @keyup.enter="searchAsu"
                      />
                    </div>

                    <div class="nav-grid">
                      <a
                        v-for="(unItem, index) in universalNavItems"
                        :key="index"
                        :href="unItem.link"
                        @click="handleNavLinkClick(unItem.text, 'main navbar')"
                        class="nav-link py-space-sm px-space-xs w-100 text-small text-dark-3 text-center"
                      >
                        {{ unItem.text }}
                      </a>
                    </div>
                  </div>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- desktop-universal-nav -->
    <div
      class="d-none d-lg-block bg-light-2 universal-nav"
      :class="{ scrolled: pageVerticalOffset > 0 }"
    >
      <div class="container-lg">
        <div class="row">
          <div class="col-12">
            <div
              class="nav-search d-flex align-items-center justify-content-end"
            >
              <ul class="nav align-items-center">
                <!-- skip links -->
                <li>
                  <a
                    :href="`#${mainContentId}`"
                    class="sr-only sr-only-focusable"
                    >Skip to main content</a
                  >
                </li>
                <li>
                  <a
                    href="https://accessibility.asu.edu/report"
                    class="sr-only sr-only-focusable"
                    >Report an accessibility problem</a
                  >
                </li>
                <!-- top nav links -->
                <li
                  class="nav-item"
                  v-for="(item, index) in universalNavItems"
                  :key="index"
                >
                  <a
                    :href="item.link"
                    target="_blank"
                    class="nav-link text-dark-3 fs-xs pe-space-xxs top-nav-link"
                    @click="handleNavLinkClick(item.text, 'topbar')"
                  >
                    {{ item.text }}
                  </a>
                </li>
              </ul>

              <!-- desktop search -->
              <div class="search-bar d-flex position-relative overflow-hidden">
                <button class="search-bar__submit" aria-label="open ASU search">
                  <font-awesome-icon
                    :icon="faSearch"
                    aria-label="open search"
                  ></font-awesome-icon>
                </button>
                <input
                  type="search"
                  class="search-bar__input"
                  name="search asu"
                  id="search-asu"
                  aria-label="search ASU"
                  placeholder="Search ASU"
                  v-model="searchText"
                  @keyup.enter="searchAsu"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- desktop-main-nav -->
    <div class="d-none d-lg-block border-bottom header-text">
      <div class="container-lg">
        <div class="row">
          <div :class="navColumnClass">
            <div class="d-flex justify-content-start pt-space-xs">
              <!-- ASU logo -->
              <a
                :href="logoLinkUrl"
                :target="logoLinkTarget"
                @click="handleAsuLogoClick"
              >
                <img
                  class="vertical-logo"
                  src="https://live-asuocms.ws.asu.edu/sites/default/files/asu-vertical-logo.png"
                  alt="Arizona State University"
                />
              </a>

              <div class="d-flex flex-column w-100">
                <!-- home title -->
                <p class="unit-title fw-bold mb-space-xxxs">
                  <a
                    href="/"
                    class="unit-link text-dark-3"
                    @click="handleHomeClick(homeTitle)"
                    >{{ homeTitle }}</a
                  >
                </p>

                <div class="d-flex flex-row justify-content-between w-100">
                  <div>
                    <nav
                      aria-label="primary navigation"
                      role="navigation"
                      class="navbar main-nav navbar-expand-lg bg-white p-0"
                    >
                      <ul
                        class="navbar-nav"
                        :class="{
                          'nav-item-active-home': true,
                        }"
                      >
                        <!-- home icon -->
                        <li class="nav-item">
                          <a
                            title="Home"
                            class="nav-link text-dark-3"
                            href="/"
                            @click="handleHomeClick('home icon')"
                            data-cy="asuo-home-button"
                          >
                            <font-awesome-icon
                              :icon="faHome"
                              aria-label="Home"
                              class="home-icon"
                            ></font-awesome-icon>
                          </a>
                        </li>
                        <!-- nav-items with/without dropdowns -->

                        <li
                          class="nav-item dropdown"
                          v-for="(item, index) in navItemsRef"
                          :key="index"
                          :class="{
                            'nav-item-active': isActive(item),
                          }"
                        >
                          <!-- with dropdown -->
                          <div v-if="hasChildren(item)">
                            <rds-dropdown
                              :id="generateLinkId(item.htmlLink.text, index)"
                              class="dropdown-nav-item px-space-xxs pt-space-xxs pb-space-xxxs"
                              button-classes="btn-dropdown-focus"
                              :offset="12"
                              no-caret
                              no-button-style
                              @toggle="
                                handleNavLinkClick(
                                  item.htmlLink.text,
                                  'main navbar'
                                )
                              "
                              :data-cy="generateCypressId(item.htmlLink.text)"
                            >
                              <template #button-content>
                                <span class="pe-space-xxxs">
                                  {{ item.htmlLink.text }}
                                </span>
                                <font-awesome-icon
                                  :aria-label="
                                    item.isActive
                                      ? 'Close dropdown'
                                      : 'Open dropdown'
                                  "
                                  :icon="
                                    item.isActive ? faChevronUp : faChevronDown
                                  "
                                  size="xs"
                                  class="text-dark-3"
                                ></font-awesome-icon
                              ></template>
                              <!-- dropdown items -->
                              <template v-if="item.children">
                                <div
                                  v-for="(child, index) in item.children"
                                  :key="index"
                                >
                                  <rds-dropdown-divider
                                    v-if="child.hasBorderTop"
                                    class="my-space-xxs mx-space-xs"
                                  ></rds-dropdown-divider>
                                  <rds-dropdown-item
                                    :href="child.htmlLink.uri"
                                    :target="
                                      formatLinkTarget(child.htmlLink.target)
                                    "
                                    class="dropdown-item-padding py-space-xxxs"
                                    @click="
                                      handleNavLinkClick(
                                        child.htmlLink.text,
                                        'main navbar'
                                      )
                                    "
                                    :data-cy="
                                      generateCypressId(
                                        child.htmlLink.text,
                                        true
                                      )
                                    "
                                  >
                                    {{ child.htmlLink.text }}
                                  </rds-dropdown-item>
                                </div>
                              </template>
                            </rds-dropdown>
                          </div>
                          <!-- without dropdown -->
                          <a
                            v-else
                            :href="item.htmlLink.uri"
                            :target="formatLinkTarget(item.htmlLink.target)"
                            class="nav-link text-dark-3 text-center mb-space-xxs"
                            @click="
                              handleNavLinkClick(
                                item.htmlLink.text,
                                'main navbar'
                              )
                            "
                            :class="{
                              'nav-item-active': isActive(item),
                            }"
                            :data-cy="generateCypressId(item.htmlLink.text)"
                            >{{ item.htmlLink.text }}</a
                          >
                        </li>
                      </ul>
                    </nav>
                  </div>
                  <!-- cta-block -->
                  <div
                    class="d-flex align-items-center justify-content-end cta-div mt-lg-nspace-xxs mt-nspace-xl-xs"
                  >
                    <slot name="cta-block"></slot>
                    <!-- optional RFI CTA -->
                    <a
                      v-if="displayRfiCta"
                      class="btn ms-lg-space-xxs ms-xxl-space-xs fs-small btn-size"
                      :href="`#${rfiAnchorId}`"
                      :class="rfiCtaClass"
                      @click="scrollToRFI"
                      data-cy="rfi-button"
                    >
                      {{ rfiCtaText }}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import {
  faBars,
  faChevronDown,
  faChevronUp,
  faHome,
  faSearch,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { CollapseItem } from "@rds-vue-ui/collapse-item";
import {
  computed,
  nextTick,
  onBeforeMount,
  onMounted,
  onUnmounted,
  ref,
} from "vue";
import { RdsAccordion } from "@rds-vue-ui/rds-accordion";
import {
  RdsDropdown,
  RdsDropdownDivider,
  RdsDropdownItem,
} from "@rds-vue-ui/rds-dropdown";

interface NavItemLink {
  text: string;
  uri: string;
  target: string;
}

interface NavItemChild {
  hasBorderTop: boolean;
  htmlLink: NavItemLink;
}

interface NavItemDualChild {
  childOne: NavItemChild[] | [];
  childTwo: NavItemChild[] | [];
}

interface NavItem {
  isActive: boolean;
  htmlLink: NavItemLink;
  children?: NavItemChild[] | [];
  dualChildren?: NavItemDualChild | {};
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

interface Props {
  isSticky?: boolean;
  logoLinkUrl: string;
  logoLinkTarget: "_blank" | "_self" | "_parent" | "_top";
  homeTitle: string;
  navItems: NavItem[];
  mainContentId?: string;
  displayRfiCta?: boolean;
  displayApplyNow?: boolean;
  rfiCtaVariant?: string;
  rfiAnchorId?: string;
  rfiCtaText?: string;
  signInRedirectUrl?: string;
  route?: URL | any;
}

const props = withDefaults(defineProps<Props>(), {
  isSticky: true,
  logoLinkUrl: "https://www.asu.edu/",
  logoLinkTarget: "_blank",
  mainContentId: "content",
  displayRfiCta: true,
  displayApplyNow: true,
  rfiCtaVariant: "secondary",
  rfiAnchorId: "rfi-section",
  rfiCtaText: "Request info",
  signInRedirectUrl: "https://asuonline.asu.edu/",
});

/** Events */
const emits = defineEmits<{
  /** Event is fired when the use uses the search bar.   */
  (e: "asuSearchEvent", trackingData: TrackingData): void;
  /** The event is fired when the asu logo is clicked.   */
  (e: "asuLogoClick", trackingData: TrackingData): void;
  /** The event is fired when home icon or page title is clicked. */
  (e: "homeClick", trackingData: TrackingData): void;
  /** The event is fired when nav link is clicked.  */
  (e: "navLinkClick", trackingData: TrackingData): void;
  /** The event is fired when nav collapse is shown.     */
  (e: "navCollapseShown", trackingData: TrackingData): void;
  /** The event is fired when nav collapse is hidden.   */
  (e: "navCollapseHidden", trackingData: TrackingData): void;
  /** The event is fired when the optional RFI CTA is clicked. */
  (e: "requestInfoClick", trackingData: TrackingData): void;
}>();

const root = ref<HTMLElement | null>();

const pageVerticalOffset = ref(0);

const searchText = ref("");

const mobileCollapse = ref<HTMLInputElement | null>(null);
const mobileNavExpanded = ref(false);

const navItemsRef = ref<NavItem[]>();
const isLoggedIn = ref(false);
const userName = ref<string | null>();
const universalNavItems = computed(() => {
  let items = [
    {
      text: "ASU Home",
      link: "https://asu.edu",
    },
    {
      text: "My ASU",
      link: "https://my.asu.edu",
    },
    {
      text: "Colleges and Schools",
      link: "https://asu.edu/about/colleges-and-schools/",
    },
  ];

  if (isLoggedIn.value) {
    items.push({
      text: `${userName.value} (Sign out)`,
      link: "https://weblogin.asu.edu/cas/logout",
    });
  } else {
    items.push({
      text: "Sign in",
      link: `https://weblogin.asu.edu/cgi-bin/login?callapp=${props.signInRedirectUrl}`,
    });
  }

  return items;
});

const navColumnClass = computed(() => {
  if (props.displayApplyNow || props.displayRfiCta) {
    return "col-12";
  }
  return "col-10";
});

const rfiCtaClass = computed(() => {
  return `btn-${props.rfiCtaVariant}`;
});

const getPageVerticalOffset = () => {
  pageVerticalOffset.value = window.scrollY;
};

const generateCollapseId = (title: string) => {
  return `${title.toLowerCase()}-header-collapse`
    .replace("/", "")
    .split(" ")
    .join("-");
};

const getCookie = (cname: string) => {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};

const searchAsu = () => {
  const trackingData = {
    event: "search",
    name: "onenter",
    action: "type",
    type: "main search",
    region: "navbar",
    section: "topbar",
    text: searchText.value,
    component: "header - global",
  };

  emits("asuSearchEvent", trackingData);

  window.open(`https://search.asu.edu/?q=${searchText}`, "_blank");
};

const generateLinkId = (title: string, index: number) => {
  return `${title.toLowerCase()}-${index}`.split(" ").join("-");
};

const isActive = (item: NavItem) => {
  if (item.isActive) {
    return true;
  } else {
    return false;
  }
};

const isHomepage = () => {
  if (props.route?.pathname) {
    return true;
  } else if (window.location.pathname) {
    return true;
  } else {
    return false;
  }
};

const hasChildren = (item: NavItem) => {
  return item.children !== undefined && item.children.length > 0;
};

const handleAsuLogoClick = () => {
  const trackingData = {
    event: "link",
    name: "onclick",
    action: "click",
    type: "internal link",
    region: "navbar",
    section: "main navbar",
    text: "asu logo",
    component: "header - global",
  };

  emits("asuLogoClick", trackingData);
};

const handleHomeClick = (text: string) => {
  const trackingData = {
    event: "link",
    name: "onclick",
    action: "click",
    type: "internal link",
    region: "navbar",
    section: "main navbar",
    text: text.toLowerCase(),
    component: "header - global",
  };

  emits("homeClick", trackingData);
};

const handleNavLinkClick = (itemText: string, section: string) => {
  resetItems();

  const trackingData = {
    event: "link",
    name: "onclick",
    action: "click",
    type: "internal link",
    region: "navbar",
    section: section,
    text: itemText.toLowerCase(),
    component: "header - global",
  };

  emits("navLinkClick", trackingData);
};

const resetItems = () => {
  navItemsRef.value!.forEach((item) => {
    item.isActive = false;
  });
};

const handleCollapseHide = (item: NavItem) => {
  item.isActive = false;
};

const handleCollapseShow = (item: NavItem) => {
  item.isActive = true;
};

const handleMobileNavToggle = () => {
  mobileNavExpanded.value = !mobileNavExpanded.value;

  const trackingData = {
    event: "collapse",
    name: "onclick",
    action: mobileNavExpanded.value ? "open" : "close",
    type: "click",
    region: "navbar",
    section: "main navbar",
    text: "menu button mobile",
    component: "header - global",
  };

  mobileNavExpanded.value
    ? emits("navCollapseShown", trackingData)
    : emits("navCollapseHidden", trackingData);
};

const scrollToRFI = (e: Event) => {
  e.preventDefault();

  let href = "";
  if (e.target instanceof Element) {
    href = e.target.getAttribute("href")!;
  }

  if (href && href != "" && href != "#") {
    const targetElement = document.getElementById(href.slice(1));
    const targetElemTop = targetElement!.getBoundingClientRect().top;
    const navBarHeight = root.value!.getBoundingClientRect().height;

    // adding 4 to avoid scrollspy flicker
    const displacement = targetElemTop - navBarHeight + 4;

    window.scrollBy({
      top: displacement,
      behavior: "smooth",
    });
  }

  const trackingData = {
    event: "link",
    name: "onclick",
    action: "click",
    type: "internal link",
    region: "navbar",
    section: "main navbar",
    text: props.rfiCtaText.toLowerCase(),
    component: "header - global",
  };

  emits("requestInfoClick", trackingData);
};

const formatLinkTarget = (target: string) => {
  if (target == "_self" || target == "_blank") return target;

  if (target == "SELF") {
    return "_self";
  } else {
    return "_blank";
  }
};

const generateCypressId = (text: string, child = false) => {
  const kebabCase = (str: string) => {
    const regex =
      /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g;
    return str.match(regex)!.join("-").toLowerCase();
  };
  const cypressId = kebabCase(text);

  return child ? `cy-${cypressId}-option` : `cy-${cypressId}`;
};

const startCollapseAnimation = (el: HTMLElement | Element) => {
  if (el instanceof HTMLElement) {
    if (mobileNavExpanded.value == true) {
      el.style.height = "0px";
      el.style.height = el.scrollHeight + "px";
    } else {
      el.style.height = el.scrollHeight + "px";
      setTimeout(() => {
        el.style.height = "0px";
      }, 10);
    }
  }
};

const endCollapseAnimation = (el: HTMLElement | Element) => {
  if (el instanceof HTMLElement) {
    el.style.height = "";
  }
};

onBeforeMount(() => {
  navItemsRef.value = props.navItems;
});

onMounted(() => {
  async function setup() {
    await nextTick();
    window.addEventListener("scroll", getPageVerticalOffset, {
      passive: true,
    });

    let user = getCookie("SSONAME");
    if (user !== "") {
      isLoggedIn.value = true;
      userName.value = user;
    } else {
      isLoggedIn.value = false;
      userName.value = null;
    }
  }
  setup();
});

onUnmounted(() => {
  window.removeEventListener("scroll", getPageVerticalOffset);
});
</script>

<style lang="scss" scoped>
.remove-ul-dots {
  list-style: none;
}
.mobile-menu-collapse {
  margin: -1px;
}

.collapse {
  height: auto;
  overflow: hidden;
  width: 100%;
  // overriding bootstrap, might remove later
  &:not(.show) {
    display: block;
  }
}

.mobile-nav-enter-active,
.mobile-nav-leave-active {
  will-change: height, opacity;
  transition: height 0.2s ease;
  overflow: hidden;
}

.btn-dropdown-focus {
  &:focus {
    box-shadow: none;
    outline: 2px solid var(--rds-dark-3, #191919);
    border-radius: 0;
  }

  font-weight: 400;
  padding-left: 4px;
  padding-right: 4px;
}

.base-header {
  .collapsed > .when-open,
  .not-collapsed > .when-closed {
    display: none;
  }
}

.width-max-content {
  width: max-content;
}

div.mobile-nav {
  .mobile-nav-items {
    max-height: 400px;
    overflow-y: scroll;
  }

  img.horizontal-logo {
    height: 32px;
    width: auto;
  }
  .mobile-nav-close,
  .mobile-nav-open {
    height: 40px;
    width: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .mobile-nav-close {
    background: var(--rds-light-3, #e8e8e8);
    padding: 8px;
  }

  .search-input {
    width: 100%;
    background-color: var(--rds-white, #ffffff);
    border: 0;
    border-radius: 0;
    padding-left: 32px;
  }

  .mobile-search-icon {
    width: 16px;
    height: 16px;
    transform: translate(50%, -50%);
    top: 50%;
  }

  .nav-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-auto-flow: row;
    justify-items: start;
    width: 100%;
  }
  .nav-grid .nav-link {
    border-top: 1px solid var(--rds-light-4, #d0d0d0);
  }
  .nav-grid .nav-link:nth-child(even) {
    border-left: 1px solid var(--rds-light-4, #d0d0d0);
  }
  .active-collapse {
    &::after {
      content: "";
      display: block;
      height: 8px;
      background-color: var(--rds-secondary, #ffc627);
      width: 100%;
      position: absolute;
      bottom: -16px;
    }
  }
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
  .sr-only {
    font-size: 12px;
    padding: 7px;
    color: var(--rds-dark-3, #191919);
  }

  a.top-nav-link:hover {
    text-decoration: underline;
  }

  .scrolled {
    height: 0;
    overflow: hidden;
    transition: height 150ms cubic-bezier(0.18, 0.89, 0.32, 1.15);
  }
  div.universal-nav {
    .nav-search {
      padding: 3px 0;
    }

    button:focus {
      outline: 2px solid var(--rds-dark-3, #191919);
    }

    .search-bar {
      --size: 30px;
      height: var(--size);
      width: var(--size);
      padding: 3px;
      transition: width 500ms cubic-bezier(0.18, 0.89, 0.32, 1.15);

      &__input {
        font-size: 14px;
        border: 0;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        line-height: calc(var(--size) - 3px);
        opacity: 0;
        cursor: pointer;
      }

      &__submit {
        font-size: 14px;
        cursor: pointer;
        border: 0;
        background: transparent;
        width: calc(var(--size) - 10px);
        height: calc(var(--size) - 10px);
        margin-left: auto;
      }

      &:focus-within {
        width: 20%;
        outline: 2px solid var(--rds-dark-3, #191919);
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.35);

        .search-bar__input {
          opacity: 1;
          cursor: initial;
          width: calc(100% - var(--size));
          margin-left: 20px;
          padding-left: 4px;
          box-shadow: none;
          outline: 0;
        }

        .search-bar__submit {
          color: var(--rds-dark-3, #191919);
          background: var(--rds-white, #ffffff);
          position: absolute;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
          left: 0;
          top: 0;
          bottom: 0;
          height: var(--size);

          &:hover {
            outline: 2px solid var(--rds-dark-3, #191919);
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.35);
          }
        }
      }
    }
  }

  img.vertical-logo {
    display: block;
    height: 60px;
    width: auto;
    margin-right: 16px;
  }

  p.unit-title {
    font-size: 36px;
    line-height: 1;
    letter-spacing: -0.035rem;
  }

  nav.main-nav {
    .home-icon {
      margin-right: 2px;
    }

    .nav-item {
      position: relative;
      padding: 0;

      a {
        padding-bottom: 4px;
      }

      &::after {
        transition: width 0.5s cubic-bezier(0.19, 1, 0.19, 1);
        content: "";
        display: block;
        height: 8px;
        background-color: var(--rds-secondary, #ffc627);
        width: 0%;
        position: absolute;
        bottom: 0;
      }

      &:hover::after {
        width: calc(100% - 4px);
        margin-left: 2px;
      }
    }

    .nav-item-active {
      &::after {
        width: calc(100% - 4px);
        margin-left: 2px;
      }
    }
    .nav-item-active-home {
      &::after {
        content: "";
        display: block;
        height: 8px;
        background-color: var(--rds-secondary, #ffc627);
        width: 0%;
        position: absolute;
        bottom: 0;
        width: calc(100% - 94%);
        margin-left: 2px;
      }
    }

    .dropdown-item-padding {
      &:hover {
        color: var(--rds-primary, #8c1d40);
      }
    }

    .dropdown.show svg.fa-chevron-down {
      transform: rotate(180deg);
    }
    .dropdown svg.fa-chevron-down {
      transition: 0.5s cubic-bezier(0.19, 1, 0.19, 1);
    }
  }
}

/* Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {
  img.vertical-logo {
    display: block;
    height: 72px;
    width: auto;
    margin-right: 16px;
  }

  nav.main-nav {
    .nav-item {
      padding: 0 8px;
      &:hover::after {
        width: calc(100% - 16px);
      }
    }
    .nav-item-active {
      &::after {
        width: calc(100% - 16px);
      }
    }
  }
}

@media (min-width: 1400px) {
  nav.main-nav {
    .nav-item {
      &:hover::after {
        width: calc(100% - 16px);
      }
    }
    .nav-item-active {
      &::after {
        width: calc(100% - 16px);
      }
    }
  }
}
a {
  text-decoration: none !important;
}
</style>
