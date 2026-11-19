<template>

    <h2 class="font-['ExileFont'] text-6xl">
            DUREŃ
        </h2>
        
        <button class="px-4 py-2 font-bold bg-sky-300 rounded-lg cursor-pointer hover:bg-sky-500 transition-all">
            Zagraj
        </button>

        <button @click="router.push('/login')" class="px-4 py-2 font-bold bg-sky-300 rounded-lg cursor-pointer hover:bg-sky-500 transition-all">
            Załóż konto
        </button>

    

</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

</script>