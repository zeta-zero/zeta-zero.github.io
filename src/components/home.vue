<script setup>
import { ref } from 'vue'
import BncRect from './BncRect.vue'
import HomeSchedule from './home-detial/homeschedule.vue'

const greeting = ref('Hello Home!');

</script>

<template>
    <bnc-rect class="h-bncrect" />
    <HomeSchedule class="h-hs"/>
</template>

<style>
.h-bncrect {
    justify-content:right;
    right: 0;
}

.h-hs{
    top: 0;
    left: 0;
    position: absolute;
    margin: auto;
    width: 100%;
    height: 100%;
    align-items: center;
    display: flex;
    justify-content: center;
}
</style>
