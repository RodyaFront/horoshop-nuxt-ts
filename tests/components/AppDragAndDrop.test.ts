import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import AppDragAndDrop from '@/components/AppDragAndDrop.vue';

function createFile(name = 'file.png', type = 'image/png') {
  const file = new File(['dummy content'], name, { type });
  return file;
}

describe('AppDragAndDrop', () => {
  it('renders placeholder when no files', () => {
    const wrapper = mount(AppDragAndDrop, {
      props: { modelValue: [] },
    });
    expect(wrapper.find('.app-drag-and-drop__placeholder').exists()).toBe(true);
    expect(wrapper.findAll('.app-drag-and-drop__thumb').length).toBe(0);
  });

  it('renders thumbnails when files are present', () => {
    const wrapper = mount(AppDragAndDrop, {
      props: { modelValue: ['blob:http://localhost/image1', 'blob:http://localhost/image2'] },
    });
    expect(wrapper.findAll('.app-drag-and-drop__thumb').length).toBe(2);
    expect(wrapper.find('.app-drag-and-drop__placeholder').exists()).toBe(false);
  });

  it('emits update:modelValue when file is added via input', async () => {
    const wrapper = mount(AppDragAndDrop, {
      props: { modelValue: [] },
    });
    const file = createFile();
    const fileList = {
      0: file,
      length: 1,
      item: (_item: number) => file,
    } as unknown as FileList;
    await wrapper.vm.handleFiles(fileList);
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    const newValue = wrapper.emitted('update:modelValue')?.[0][0];
    expect(Array.isArray(newValue)).toBe(true);
    expect(newValue.length).toBe(1);
  });

  it('emits update:modelValue when file is removed', async () => {
    const wrapper = mount(AppDragAndDrop, {
      props: { modelValue: ['blob:http://localhost/image1'] },
    });
    await wrapper.find('.app-drag-and-drop__delete-btn').trigger('click');
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    const newValue = wrapper.emitted('update:modelValue')?.[0][0];
    expect(newValue).toEqual([]);
  });

  it('emits update:modelValue when files are reordered via drag-and-drop', async () => {
    const files = ['blob:http://localhost/image1', 'blob:http://localhost/image2', 'blob:http://localhost/image3'];
    const wrapper = mount(AppDragAndDrop, {
      props: { modelValue: files },
    });
    await wrapper.vm.onDragStart(0);
    await wrapper.vm.onDropItem(2);
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    const newValue = wrapper.emitted('update:modelValue')?.[0][0];
    expect(newValue).toEqual([
      'blob:http://localhost/image2',
      'blob:http://localhost/image3',
      'blob:http://localhost/image1',
    ]);
  });
}); 