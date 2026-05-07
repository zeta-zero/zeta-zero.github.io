<script setup>
import { ref, onMounted } from 'vue'
import IntroOverlay from './components/IntroOverlay.vue'
import IslandSidebar from './components/IslandSidebar.vue'

const showIntro = ref(false)
const showApp = ref(false)

onMounted(() => {
  const visited = localStorage.getItem('ac_island_visited')
  if (visited) {
    showApp.value = true
  } else {
    showIntro.value = true
  }
})

function onIntroDone() {
  localStorage.setItem('ac_island_visited', '1')
  showIntro.value = false
  showApp.value = true
}
</script>

<template>
  <IntroOverlay v-if="showIntro" @done="onIntroDone" />
  <div v-if="showApp" class="app-shell">
    <IslandSidebar />
    <main class="view-container">
      <router-view v-slot="{ Component }">
        <transition name="page-zoom" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<style>
/* Ensure full-page warm background — no white gaps */
html, body {
  background: var(--c-bg-page);
}

#app {
  background: var(--c-bg-page);
}

.app-shell {
  min-height: 100vh;
  background: var(--c-bg-page);
}

.view-container {
  max-width: 1100px;
  margin: 0 auto;
  padding: var(--space-xl) var(--space-lg);
  min-height: calc(100vh - 60px);
}

@media (max-width: 768px) {
  .view-container {
    padding: var(--space-md);
    min-height: calc(100vh - 50px);
  }
}

/* Page transitions — zoom + fade */
.page-zoom-enter-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.page-zoom-leave-active {
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
}
.page-zoom-enter-from {
  opacity: 0;
  transform: scale(0.96);
}
.page-zoom-leave-to {
  opacity: 0;
}
</style>
