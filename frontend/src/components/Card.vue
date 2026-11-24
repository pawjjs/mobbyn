<template>

    <img :src="backgroundStyle" alt="" class="w-32 h-48 object-fit"/>

</template>


<script setup>
import { defineProps, ref, onMounted, computed } from 'vue';
import { getCardFileName } from '@/services/parseCardAssets';

const props = defineProps({
    s: String,
    r: String
})

const cardImages = import.meta.glob('../assets/deck/classic/*.png', {
  eager: true,
  import: 'default',
});

const backgroundStyle = computed(() => {
    const fileName = getCardFileName(props.s, props.r)
    const key =  `../assets/deck/classic/${fileName}`

    return cardImages[key] || ''
})







</script>