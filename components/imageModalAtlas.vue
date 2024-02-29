<template>
  <div class="card" style="height: 275px">
    <div class="row gx-0">
      <div
        class="col-12 bg-dark-3 vma-lazy"
        :class="{ 'vma-lazy': bgImageLazy }"
        @click="handleModalOpen($event)"
      >
        <img
          style="height: 273px"
          :src="props.imgSourceUrl"
          class="img-fluid"
          alt="card image"
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
  console.log("opennnnnnnnnnnn");
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
</style>
