import { ref, computed, watchEffect } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useDesignsStore } from '@/stores/designs';
import type { Design } from '@/types/design';
import * as yup from 'yup';
import { ValidationError } from 'yup';

export function useDesignForm() {
  const route = useRoute();
  const router = useRouter();
  const designsStore = useDesignsStore();

  const isLoading = ref(false);
  const isEdit = computed(() => route.params.id !== 'new');
  const designId = ref(isEdit.value ? (route.params.id as string) : String(Date.now()).slice(-3));

  const form = ref<Omit<Design, 'id'>>({
    title: '',
    url: '',
    img: [],
    status: 'unpublished',
  });

  const errors = ref<{ [key: string]: string | undefined }>({});

  const schema = yup.object({
    title: yup.string().required('Назва обовʼязкова'),
    url: yup.string().url('Некоректний URL').required('URL обовʼязковий'),
    img: yup.array().min(1, 'Виберіть хоча б одне зображення'),
    id: yup.string()
      .max(3, 'ID не може бути довшим за 3 символи')
      .required()
      .test(
        'is-unique',
        'Такий ID вже існує',
        async (value) => {
          if (isEdit.value || !value) return true;
          return !designsStore.getById(value);
        }
      ),
  });

  const validate = async () => {
    try {
      await schema.validate({ ...form.value, id: designId.value }, { abortEarly: false });
      errors.value = {};
      return true;
    } catch (e) {
      if (e instanceof ValidationError) {
        const newErrors: { [key: string]: string } = {};
        e.inner.forEach((error) => {
          if (error.path) {
            newErrors[error.path] = error.message;
          }
        });
        errors.value = newErrors;
      }
      return false;
    }
  };

  watchEffect(() => {
    if (isEdit.value && designId.value) {
      const existing = designsStore.getById(designId.value);
      if (existing) {
        const { id, ...rest } = existing;
        form.value = { ...rest };
      }
    } else {
      form.value = {
        title: '',
        url: '',
        img: [],
        status: 'unpublished',
      };
    }
  });

  const handleDelete = () => {
    if (isEdit.value && designId.value) {
      designsStore.remove(designId.value);
      router.push('/');
    }
  };

  const handleSubmit = async () => {
    const isValid = await validate();
    if (!isValid) return;
    isLoading.value = true;
    setTimeout(() => {
      if (isEdit.value) {
        designsStore.update(designId.value, form.value);
      } else {
        const newDesign: Design = {
          ...form.value,
          id: designId.value
        };
        designsStore.add(newDesign);
      }
      isLoading.value = false;
      router.push('/');
    }, 500);
  };

  return {
    isLoading,
    isEdit,
    designId,
    form,
    errors,
    handleSubmit,
    handleDelete,
  };
} 