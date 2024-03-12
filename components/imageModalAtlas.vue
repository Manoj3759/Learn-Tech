<template>
  <div class="card img-opacity">
    <div class="row gx-0">
      <div
        class="col-12 enlarge-img"
        :class="{ 'vma-lazy': bgImageLazy }"
        @click="handleModalOpen($event)"
      >
        <img
          :src="props.imgSourceUrl"
          class="img-fluid"
          alt="card image"
          style="height: 205px"
        />
      </div>
    </div>

    <!-- video modal -->

    <rds-modal
      :visible="showModal"
      centered
      exterior-close-btn
      size="xl"
      body-class="p-0"
      @hidden="handleModalClose($event)"
      bg-variant="transparent"
    >
      <div class="ratio ratio-16x9" :class="{ 'vma-lazy': bgImageLazy }">
        <img :src="props.imgSourceUrl" alt="modal img" />
      </div>
    </rds-modal>
  </div>
</template>

<script setup lang="ts">
import lozad from "lozad";
import { computed, onMounted, ref } from "vue";
// @ts-ignore
import { RdsModal } from "@rds-vue-ui/rds-modal";

interface Props {
  imgSourceUrl: string;
  bgImageLazy?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  bgImageLazy: true,
});

// events
const emits = defineEmits<{
  (e: "modalClose", event: Event): void;
  (e: "modalOpen", event: Event): void;
}>();

const showModal = ref(false);

const bgImage = computed(() => {
  if (!props.bgImageLazy) {
    return { "background-image": `url('${props.imgSourceUrl}')` };
  }
});

const handleModalOpen = (event: Event) => {
  showModal.value = true;
  emits("modalOpen", event);
};

const handleModalClose = (event: Event) => {
  showModal.value = false;
  emits("modalClose", event);
};

onMounted(() => {
  const observer = lozad(".vma-lazy");
  observer.observe();
});
</script>

<style lang="scss" scoped>
button.rds-modal-close {
  margin-top: 18px !important;
}

.enlarge-img {
  transition: transform 1s ease-in-out 3ms;
  border-radius: 0.5rem;
}

.img-opacity:hover {
  opacity: 0.75;
}

.enlarge-img:hover {
  transform: scale(1.1, 1.2);
  background-color: #191919;
}
</style>
