<template>
    <div
      class="cardWelcome"
      :style="{ width: props.width + 'px', height: props.height + 'px' }"
    >
      <v-img
        :src="props.imgSrc"
        class="circle-image"
        :width="props.width"
        :height="props.height"
        alt="Image en cercle d'ordinateur portable"
      />
    </div>
  </template>
<script lang="ts" setup>
const props = defineProps({
    width: Number,
    height:Number,
    imgSrc:String,
})
</script>

<style lang="css">
.cardWelcome{
  border: 1px solid;
  border-radius: 50%; 
  background-color: white;
  box-shadow: 0 4px 4px 0 rgba(253, 167, 167, 0.25); 
  overflow: hidden; 
  display: flex;
  justify-content: center; 
  align-items: center;
}

.circle-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>