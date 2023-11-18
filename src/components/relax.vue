<script setup>
import { ref } from 'vue'
const greeting = ref('Hello Relax!')
</script>

<template>
  <p class="greeting">{{ greeting }}</p>
</template>

<style>
.greeting {
  color: deepskyblue;
  font-weight: bold;
}
</style>
