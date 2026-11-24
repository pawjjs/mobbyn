<template>

    <div>
        Tura: <span class="font-semibold">{{ turn.name }}</span>
    </div>

    <div v-for="player in players">
        <span class="font-semibold">{{ player.name }}</span>
        <div class="flex space-x-2">
            <div v-for="card in player.hand" >
                <Card :s="card.s" :r="card.r"/>
            </div>
        </div>
    </div>

</template>


<script setup>
import { ref, onMounted } from 'vue';
import Card from '@/components/Card.vue';
import { api } from '@/services/apiFetch';

const turn = ref([])
const players = ref([])

async function loadTurn() {
    try {
        turn.value = await api('/board/turn')
    }catch(error){
        console.log(error)
    }
}

async function loadPlayers() {
    try {
        players.value = await api('/board/players')
    }catch(error){
        console.log(error)
    }
}

onMounted(() => {
    loadTurn()
    loadPlayers()
})
</script>