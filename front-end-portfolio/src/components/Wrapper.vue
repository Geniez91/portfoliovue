<template>
  <div id="editor"></div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import Editor from '@toast-ui/editor';

import '@toast-ui/editor/dist/toastui-editor.css';

const editor = ref<Editor | null>(null);

defineExpose({ editor });

const props = defineProps<{
    initialValue?:string;
}>();

onMounted(() => {
  editor.value = new Editor({
    el: document.querySelector('#editor') as HTMLElement,
    height: '500px',
    initialEditType: 'markdown',
    previewStyle: 'vertical',
    initialValue: props.initialValue ? props.initialValue : '# Hello World\nCeci est un test en Markdown.',
  });
});
</script>
