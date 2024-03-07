<template>
  <section class="position-relative">
    <div class="container-fluid position-relative">
      <div class="row position-relative" :style="bgImage">
        <div
          class="col-12 header-image position-relative"
          :class="{ 'spa-lazy': bgImageLazy }"
          :data-background-image="dataBgImage"
        ></div>
      </div>
    </div>
    <div class="container content-container position-relative">
      <div
        class="py-space-md py-md-space-lg px-space-xs px-md-space-md p-lg-space-xl content-div position-relative"
        :class="containerClass"
      >
        <div class="row">
          <div class="col-12" :class="{ 'col-lg-8': displayIcon }">
            <p v-if="showLabel" class="mb-space-xxs">
              <span
                class="px-space-xxs spa-label fw-bold"
                :class="labelClass"
                v-html="label"
              ></span>
            </p>
            <component :is="titleLevel" class="pb-space-sm" :class="titleClass">
              {{ title }}
            </component>
            <!-- text slot -->
            <div>
              <slot name="text"></slot>
            </div>
          </div>
          <div
            v-if="displayIcon"
            class="col-lg-4 d-none d-lg-block text-center"
          >
            <img
              :data-src="iconSource"
              :src="bgImageLazy ? '' : iconSource"
              :alt="iconAlt"
              class="icon spa-lazy"
            />
          </div>
        </div>
        <!-- body slot -->
        <slot name="body"></slot>
      </div>
      <!-- footer slot -->
      <div>
        <slot name="footer"></slot>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import lozad from "lozad";
import { computed, onMounted } from "vue";

interface Props {
  containerBgVariant?: string;
  bgImageSource: string;
  bgImageLazy?: boolean;
  showLabel?: boolean;
  label?: string;
  labelSize?: "small" | "medium" | "large" | "xl";
  labelVariant?: string;
  labelBackgroundVariant?: string;
  title: string;
  titleLevel?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  titleSize?: "small" | "medium" | "large" | "xl";
  titleVariant?: string;
  displayIcon?: boolean;
  iconSource?: string;
  iconAlt?: string;
}

const props = withDefaults(defineProps<Props>(), {
  containerBgVariant: "light-2",
  bgImageLazy: true,
  showLabel: false,
  label: "lorem ipsum",
  labelSize: "small",
  labelVariant: "dark-3",
  labelBackgroundVariant: "secondary",
  titleLevel: "h2",
  titleSize: "medium",
  titleVariant: "dark-3",
  displayIcon: false,
  iconSource: "https://via.placeholder.com/100x100",
  iconAlt: "icon image alt",
});

const bgImage = computed(() => {
  if (!props.bgImageLazy) {
    return `--section-bg-image: linear-gradient(rgba(25,25,25,.25), rgba(25,25,25,.25)),url('${props.bgImageSource}')`;
  }
});
const dataBgImage = computed(() => {
  return props.bgImageLazy ? props.bgImageSource : null;
});
const containerClass = computed(() => {
  return `bg-${props.containerBgVariant}`;
});
const labelClass = computed(() => {
  return `fs-${props.labelSize} text-${props.labelVariant} bg-${props.labelBackgroundVariant}`;
});
const titleClass = computed(() => {
  return `${props.titleLevel}-${props.titleSize} text-${props.titleVariant}`;
});

onMounted(() => {
  if (props.bgImageLazy) {
    const observer = lozad(".spa-lazy", {
      loaded: function (el: HTMLElement) {
        el.style.setProperty(
          "--section-bg-image",
          `linear-gradient(rgba(25,25,25,.25), rgba(25,25,25,.25)),url("${el.getAttribute(
            "data-background-image"
          )}")`
        );
      },
    });
    observer.observe();
  }
});
</script>

<style lang="scss" scoped>
.header-image {
  height: 256px;
  position: relative;
  webkit-clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  -webkit-clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
}

.header-image:before {
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-position: center 5%;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: var(--section-bg-image);
}
.content-container {
  top: -4.5rem;
  /* added to fix clip-mask z-index issue */
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}
.content-div {
  min-height: 300px;
}
.spa-label {
  padding: 4px;
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) {
  .content-container {
    top: -70px;
  }
  .content-div {
    min-height: 350px;
  }
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
  .header-image {
    height: 550px;
  }
  .content-container {
    top: -96px;
    max-width: 1140px;
  }
  .content-div {
    min-height: 400px;
  }
  .icon {
    height: 187px;
  }
}

@media (min-width: 1200px) {
  .header-image:before {
    position: fixed;
  }
}
</style>
