<script setup lang="ts">
import { useDesignForm } from '~/composables/useDesignForm';
import AppButton from "@/components/AppButton.vue";
import AppSwitch from "@/components/AppSwitch.vue";
import AppDragAndDrop from "~/components/AppDragAndDrop.vue";
import AppLoader from '~/components/AppLoader.vue';
import AppInput from '~/components/AppInput.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const {
  isLoading,
  isEdit,
  designId,
  form,
  errors,
  handleSubmit,
  handleDelete
} = useDesignForm();
</script>

<template>
  <div class="design-form">
    <AppLoader v-if="isLoading" />
    <div class="design-form__header container">
      <AppButton
        class="design-form__back"
        variant="icon"
        @click="router.back()"
      >
        <img src="@/assets/svg/arrow-left.svg" alt="Back" />
      </AppButton>
      <AppSwitch
        v-model="form.status"
        label-left="Опубліковано"
        label-right="Не опубліковано"
      />
      <div class="design-form__actions">
        <AppButton v-if="isEdit" variant="outline" @click="handleDelete"
          >Видалити</AppButton
        >
        <AppButton variant="primary" @click="handleSubmit"
          >Зберегти і вийти</AppButton
        >
      </div>
    </div>
    <div class="design-form__body container">
      <div class="design-form__dnd">
        <AppDragAndDrop v-model="form.img"/>
        <p v-if="errors.img" class="app-input__error">{{ errors.img }}</p>
      </div>
      <div class="design-form__fields">
        <div class="design-form__main-fields">
          <AppInput v-model="designId" placeholder="###" :disabled="isEdit" :error="errors.id" />
          <AppInput v-model="form.title" placeholder="Назва дизайну" :error="errors.title" />
        </div>
        <AppInput v-model="form.url" placeholder="https://design###.horoshop.ua/" :error="errors.url" />
      </div>
    </div>
  </div>
</template>