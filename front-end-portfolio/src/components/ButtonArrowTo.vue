<template>
       <v-btn v-tooltip:bottom="props.tooltip" variant="text" icon="mdi-arrow-down" size="32" :to="props.to"/>
</template>

<script lang="ts" setup>
const props = defineProps({
    to: String,
    tooltip:String,
})
</script>