<script setup lang="ts">
import { ref, computed } from "vue";

const props = defineProps<{ modelValue: string[] }>();
const emit = defineEmits<{ (e: "update:modelValue", value: string[]): void }>();

const files = computed(() => props.modelValue);
const fileInput = ref<HTMLInputElement | null>(null);

// --- File Handling ---
const onDropFile = (e: DragEvent) => {
  e.preventDefault();
  if (e.dataTransfer?.files) handleFiles(e.dataTransfer.files);
};
const onClick = () => {
  fileInput.value?.click();
};
const onFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.files) handleFiles(target.files);
};
function handleFiles(fileList: FileList) {
  const arr: string[] = [...files.value];
  Array.from(fileList).forEach((file) => {
    arr.push(URL.createObjectURL(file));
  });
  emit("update:modelValue", arr);
}
const onDragOverFile = (e: DragEvent) => {
  e.preventDefault();
};
const removeFile = (index: number) => {
  const newFiles = [...files.value]
  newFiles.splice(index, 1)
  emit('update:modelValue', newFiles)
}

// --- Sorting Logic ---
const draggedIndex = ref<number | null>(null);

const onDragStart = (index: number) => {
  draggedIndex.value = index;
};
const onDropItem = (targetIndex: number) => {
  if (draggedIndex.value === null || draggedIndex.value === targetIndex) {
    draggedIndex.value = null;
    return;
  }
  const newFiles = [...files.value];
  const draggedItem = newFiles.splice(draggedIndex.value, 1)[0];
  newFiles.splice(targetIndex, 0, draggedItem);
  emit("update:modelValue", newFiles);
  draggedIndex.value = null;
};
const onDragEnd = () => {
  draggedIndex.value = null;
};

defineExpose({ handleFiles, onDragStart, onDropItem })
</script>

<template>
  <div class="app-drag-and-drop">
    <input
      ref="fileInput"
      type="file"
      multiple
      accept="image/*"
      class="app-drag-and-drop__input"
      @change="onFileChange"
    />
    <div
      v-if="!files.length"
      class="app-drag-and-drop__placeholder"
      @click="onClick"
      @drop.prevent="onDropFile"
      @dragover.prevent="onDragOverFile"
    >
      <img
        src="/assets/svg/dnd-placeholder.svg"
        alt="Drag & Drop"
        class="app-drag-and-drop__placeholder-img"
      />
    </div>
    <div v-else class="app-drag-and-drop__container">
      <div class="app-drag-and-drop__list" @dragover.prevent>
        <div
          v-for="(img, index) in files"
          :key="img"
          class="app-drag-and-drop__thumb"
          :class="{ dragging: draggedIndex === index }"
          draggable="true"
          @dragstart="onDragStart(index)"
          @drop.prevent="onDropItem(index)"
          @dragend.prevent="onDragEnd"
        >
          <img :src="img" alt="preview" class="app-drag-and-drop__preview-img" />
          <button class="app-drag-and-drop__delete-btn" @click.stop="removeFile(index)">
            <img src="/assets/svg/trash-can.svg" alt="Delete" />
          </button>
        </div>
      </div>
      <div class="app-drag-and-drop__add" @click="onClick">
        <img src="/assets/svg/union.svg" alt="Add" />
      </div>
    </div>
  </div>
</template>
