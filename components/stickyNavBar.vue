<template>
  <section
    :class="sectionClass"
    class="sticky-nav"
    ref="nav"
    :style="sectionStyle"
  >
    <div class="container-lg px-0 px-lg-gutter">
      <div class="row gx-0">
        <div class="col-12">
          <nav
            aria-label="secondary navigation"
            class="navbar navbar-expand-lg px-0 pt-space-xxs pb-0"
          >
            <div
              class="nav-title-wrapper d-flex flex-row justify-content-between px-space-xs px-lg-0"
            >
              <span
                class="nav-title px-0 my-space-xs my-0 px-space-xs d-flex justify-content-around border-end border-light border-2"
              >
                <img
                  src="../assets/images/left-chevron.svg"
                  alt="left chevron logo"
                  height="24px"
                  width="14px"
                  class="me-space-xxs"
                />

                <a href="/" class="text-secondary flex-fill">Back to search</a>
              </span>

              <p
                class="nav-title px-0 py-space-xs my-0 mx-space-xs d-none d-lg-block"
                :class="titleClass"
              >
                {{ getNavTitle }}
              </p>
              <button
                class="collapse-icon w-50 d-flex align-items-center justify-content-between d-lg-none px-space-xs px-lg-0 py-space-xs"
                :class="togglerClass"
                @click="toggleMenu"
              >
                <p
                  class="nav-title px-0 py-space-xs my-0 me-space-xs"
                  :class="titleClass"
                >
                  {{ getNavTitle }}
                </p>
                <svg
                  :style="iconStyle"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                  <path
                    d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"
                  />
                </svg>
              </button>
            </div>

            <ul class="navbar-nav navbar-nav-collapsed" ref="menu">
              <li
                v-for="(item, key) in navItems"
                :key="key"
                class="nav-item text-medium px-space-xs px-lg-0"
              >
                <a
                  :id="getNavItemId(key)"
                  :class="navItemClass"
                  :ref="setNavItemRefs"
                  :aria-label="getLinkAriaLabel(item)"
                  :href="getNavItemHref(key)"
                  @click="handleNavItemClick"
                  class="nav-link d-inline-block position-relative py-space-xs mx-0"
                  >{{ item }}</a
                >
              </li>
            </ul>
            <div
              v-show="navIsStuck || alwaysShowStickySlot"
              class="side-menu"
              v-if="slots.stuckMenu"
            >
              <slot name="stuckMenu"></slot>
            </div>
          </nav>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { analyticsComposable } from "@rds-vue-ui/analytics-gs-composable";
import { computed, onMounted, onUnmounted, ref, useSlots, type Ref } from "vue";

interface NavItems {
  [key: string]: string;
}

interface IntersectedSections {
  [key: string]: boolean;
}

interface Props {
  navItems: NavItems;
  navItemVariant?: string;
  navItemWeight?: "bold" | "normal" | "light" | "lighter";
  textSize?: "xs" | "small" | "medium" | "large" | "xl";
  title?: string;
  titleVariant?: string;
  titleWeight?: "bold" | "normal" | "light" | "lighter";
  backgroundVariant?: string;
  borderVariant?: string;
  iconVariant?: string;
  addBoxShadow?: boolean;
  alwaysShowStickySlot?: boolean;
  underlineVariant?: string;
  underlineMultiple?: boolean;
  activeLinkVariant?: string;
}

const props = withDefaults(defineProps<Props>(), {
  navItemVariant: "dark-3",
  navItemWeight: "normal",
  textSize: "medium",
  titleVariant: "dark-3",
  titleWeight: "bold",
  backgroundVariant: "white",
  borderVariant: "light-4",
  iconVariant: "dark-3",
  addBoxShadow: false,
  alwaysShowStickySlot: false,
  underlineVariant: "secondary",
  underlineMultiple: false,
});

// events
const emits = defineEmits<{
  /**
   * Emitted when a nav link is clicked.
   */
  (e: "linkClick", event: Event): void;
  /**
   * Emitted when the navbar is expanded.
   */
  (e: "collapseShown", event: Event): void;
  /**
   * Emitted when the navbar is collapsed.
   */
  (e: "collapseHidden", event: Event): void;
}>();

const slots = useSlots();

const nav = ref<HTMLElement | null>();
const menu = ref<HTMLElement | null>();
// ref of all nav items
const navItemRefs = ref<HTMLElement[]>([]);
const setNavItemRefs = (el: any) => {
  if (el && !navItemRefs.value.includes(el)) {
    navItemRefs.value.push(el);
  }
};

const stickyObserver = ref<IntersectionObserver | null>(null);
const itemObserver = ref<IntersectionObserver | null>(null);

const intersectedSections = ref<IntersectedSections>({});
const lastVisitedSection = ref<number | null>(0);

const navIsStuck = ref(false);
const navIsExpanded = ref(false);

const sectionClass = computed(() => {
  let classList = `bg-${props.backgroundVariant} `;
  navIsStuck.value && props.addBoxShadow ? (classList += "shadow ") : null;
  navIsStuck.value ? (classList += "stuck-nav ") : null;
  return classList;
});

const sectionStyle = computed(() => {
  return `
      --nav-border-variant: ${
        props.borderVariant
          ? `var(--rds-${props.borderVariant})`
          : "transparent"
      };
      --active-highlight-variant: ${
        props.underlineVariant
          ? `var(--rds-${props.underlineVariant})`
          : "transparent"
      };
      --active-link-variant: ${
        props.activeLinkVariant
          ? `var(--rds-${props.activeLinkVariant})`
          : `var(--rds-${props.navItemVariant})`
      };
      border-bottom:1px solid var(--nav-border-variant);
      `;
});

const navItemClass = computed(() => {
  let classList = `text-${props.navItemVariant} fs-${props.textSize} fw-${props.navItemWeight} `;

  Object.keys(props.navItems).length <= 5
    ? (classList += "mx-lg-space-xxs ")
    : null;

  return classList;
});

const titleClass = computed(() => {
  let classList = `text-${props.titleVariant} fs-${props.textSize} fw-${props.titleWeight} `;

  props.title ? null : (classList += ` d-lg-none `);

  return classList;
});

const togglerClass = computed(() => {
  return navIsExpanded.value ? "expanded" : "collapsed";
});

const getNavTitle = computed(() => {
  // if no title prop, we use the last visitied section on mobile, or first nav item if no section is intersecting
  if (props.title) {
    return props.title;
  } else {
    return lastVisitedSection.value
      ? Object.values(props.navItems)[lastVisitedSection.value]
      : Object.values(props.navItems)[0];
  }
});

const getLastNavItem = computed(() => {
  return Object.keys(props.navItems).length - 1;
});

const iconStyle = computed(() => {
  return `fill: var(--rds-${props.iconVariant}, var(--rds-dark-3))`;
});

const getLinkAriaLabel = (item: string) => {
  return `link to ${item}`;
};

const getNavItemId = (key: string | number) => {
  return `nav-item-${key}`;
};

const getNavItemHref = (key: string | number) => {
  return `#${key}`;
};

const handleNavItemClick = (e: Event) => {
  e.preventDefault();
  const target = e.target as HTMLInputElement;

  const eventText = target.innerText ? target.innerText.toLowerCase() : "N/A";

  emits("linkClick", e);

  analyticsComposable.trackLinkEvent(
    "internal link",
    "main content",
    "sticky navbar",
    eventText,
    "sticky navbar"
  );

  const href = target.getAttribute("href");
  if (href && href != "" && href != "#") {
    if (document.getElementById(href.slice(1)) !== null) {
      const targetElement = document.getElementById(href.slice(1));
      const targetElemTop = targetElement
        ? targetElement.getBoundingClientRect().top
        : 0;
      const navBarHeight = nav.value!.getBoundingClientRect().height;

      // safe area of 1px
      const displacement = targetElemTop - navBarHeight + 1;
      window.scrollBy({
        top: displacement,
        behavior: "smooth",
      });
      // collapse mobile menu on link click
      navIsExpanded.value ? toggleMenu(e) : null;
    }
  }
};

const underlineToggler = (objectRef: Ref<IntersectedSections>) => {
  if (objectRef.value && Object.keys(objectRef.value).length > 0) {
    let activeElementCount = 0;
    for (let i = 0; i < Object.keys(objectRef.value).length; i++) {
      let navElement = navItemRefs.value[i];
      // stop if only first item should be highlighted
      if (navIsStuck.value && navElement !== undefined) {
        if (
          Object.values(objectRef.value)[i] == true &&
          activeElementCount < 1
        ) {
          navElement.classList.add("nav-link-active");
          lastVisitedSection.value = i;
          // if underlineMultiple is true, we don't increment i and all sections that the window is intersecting are underlined.
          // Otherwise only the first intersecting section is marked as active
          props.underlineMultiple ? null : activeElementCount++;
        } else if (
          Object.values(objectRef.value)[i] == false ||
          activeElementCount >= 1
        ) {
          navElement.classList.remove("nav-link-active");
        }
      } else if (navElement !== undefined) {
        navElement.classList.remove("nav-link-active");
      } else {
        break;
      }
    }
    // we style the last visted section if nothing is currently intersecting & the nav is sticky
    if (activeElementCount == 0 && navIsStuck.value) {
      // set lastVisitedSection as active if inside nav area, otherwise we set the last navItem as active
      if (
        lastVisitedSection.value &&
        navItemRefs.value[lastVisitedSection.value].classList
      ) {
        navItemRefs.value[lastVisitedSection.value].classList.add(
          "nav-link-active"
        );
      } else if (navItemRefs.value[getLastNavItem.value].classList) {
        navItemRefs.value[getLastNavItem.value].classList.add(
          "nav-link-active"
        );
      }
    }
  }
};

const stickyIntersectionCallback = (entries: IntersectionObserverEntry[]) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navIsStuck.value = true;
    } else {
      navIsStuck.value = false;
      lastVisitedSection.value = null;
    }
    underlineToggler(intersectedSections);
  });
};

const createStickyObserver = (root: Document | Element) => {
  stickyObserver.value = new IntersectionObserver(stickyIntersectionCallback, {
    root: root,
    rootMargin: "0px 0px -98.5% 0px",
    threshold: 0,
  });
};

const itemIntersectionCallback = (entries: IntersectionObserverEntry[]) => {
  entries.forEach((entry) => {
    let entryId = entry.target.id;

    if (entry.isIntersecting) {
      intersectedSections.value[entryId] = true;
    } else {
      intersectedSections.value[entryId] = false;
    }
    underlineToggler(intersectedSections);
  });
};

const createItemObserver = (root: Document | Element, header: HTMLElement) => {
  let headerSpacing = `${(header.scrollHeight + 2) * -1}px`;

  itemObserver.value = new IntersectionObserver(itemIntersectionCallback, {
    root: root,
    rootMargin: headerSpacing,
    threshold: 0,
  });
};

const toggleMenu = (event: Event) => {
  // all collapse animation logic taken from https://css-tricks.com/using-css-transitions-auto-dimensions/ tech 3
  // get the height of the element's inner content, regardless of its actual size
  let element = menu.value;
  var sectionHeight = element!.scrollHeight;

  if (navIsExpanded.value) {
    // temporarily disable all css transitions
    var elementTransition = menu.value!.style.transition;
    menu.value!.style.transition = "";

    // on the next frame (as soon as the previous style change has taken effect),
    // explicitly set the element's height to its current pixel height, so we
    // aren't transitioning out of 'auto'
    requestAnimationFrame(function () {
      menu.value!.style.height = sectionHeight + "px";
      menu.value!.style.transition = elementTransition;

      // on the next frame (as soon as the previous style change has taken effect),
      // have the element transition to height: 0
      requestAnimationFrame(function () {
        menu.value!.style.height = 0 + "px";
        menu.value!.classList.add("navbar-nav-collapsed");
      });
    });
  } else {
    // have the element transition to the height of its inner content
    menu.value!.style.height = sectionHeight + "px";

    // when the next css transition finishes (which should be the one we just triggered)
    menu.value!.addEventListener("transitionend", function handler(e) {
      // remove props.event listener so it only gets triggered once
      menu.value!.removeEventListener("transitionend", handler);
      // remove "height" from the element's inline styles, so it can return to its initial value
      menu.value!.style.height = "";
      menu.value!.classList.remove("navbar-nav-collapsed");
    });
  }

  // gtag related code, only pushes to google if toggle is triggered by collapse toggle click
  analyticsComposable.trackCollapseEvent(
    "onclick",
    `${navIsExpanded.value ? "close" : "open"}`,
    "click",
    "main content",
    "sticky navbar",
    "menu button mobile",
    "sticky navbar"
  );
  navIsExpanded.value
    ? emits("collapseHidden", event)
    : emits("collapseShown", event);
  navIsExpanded.value = !navIsExpanded.value;
};

onMounted(() => {
  if (typeof window !== "undefined" && window !== null) {
    // backup iframe query if the sticky nav is in an iframe
    let observerRoot = document;

    // sticky observer code
    createStickyObserver(observerRoot);
    stickyObserver.value!.observe(nav.value!);

    // header/ nav item observer code
    createItemObserver(observerRoot, nav.value!);
    for (const property in props.navItems) {
      if (document.getElementById(`${property}`)) {
        let itemToObserve = document.getElementById(`${property}`);
        itemToObserve ? itemObserver.value!.observe(itemToObserve) : null;
      }
    }
  }
});

onUnmounted(() => {
  itemObserver.value!.disconnect();
  stickyObserver.value!.disconnect();
});
</script>

<style lang="scss" scoped>
.sticky-nav {
  position: -webkit-sticky;
  position: sticky !important;
  top: 0;
}
.stuck-nav {
  z-index: 1020;
}
.navbar {
  flex-direction: column;
  margin-bottom: -1px;
}

.navbar-nav {
  flex-direction: column;
  overflow: hidden;
  transition: height 0.2s ease-out;
}

.nav-link {
  outline-offset: -2px;
}
.nav-link:after {
  width: 0;
}

.nav-link-active {
  color: var(--active-link-variant) !important;
}
.nav-link:hover:after,
.nav-link-active:after {
  width: 100%;
}
.nav-link:after,
.nav-link-active:after {
  transition: width 0.5s cubic-bezier(0.19, 1, 0.19, 1);
  content: "";
  left: 0;
  height: 8px;
  background-color: var(--active-highlight-variant);
  position: absolute;
  bottom: 0px;
  z-index: 1;
}
.collapse-icon {
  border: none;
  padding: 0px !important;
  margin: auto 0;
  background: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}

.collapse-icon svg {
  transition: transform 0.2s;
}
.collapse-icon.collapsed svg {
  transform: rotate(-180deg);
}
.collapse-icon svg {
  width: 1.25rem;
  height: auto;
}
.side-menu {
  flex-grow: 1;
}

@media (max-width: 991px) {
  .side-menu {
    display: none;
  }
  .navbar-nav-collapsed {
    height: 0px;
  }
  .nav-title-wrapper,
  .navbar-nav,
  .nav-item a {
    width: 100%;
  }
  .nav-item a {
    border-top: 1px solid var(--nav-border-variant, var(--rds-light-4, #d0d0d0));
  }

  .nav-link-active:after {
    bottom: -1px;
  }
}
@media (min-width: 992px) {
  .navbar-nav {
    flex-direction: row;
    height: auto !important;
  }
  .navbar {
    flex-direction: row;
  }
}
</style>
