<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const navItems = [
  { id: 'plaza',    label: '广场',   route: '/',         iconColor: 'var(--card-green)' },
  { id: 'house',    label: '小屋',   route: '/about',    iconColor: 'var(--card-yellow)' },
  { id: 'museum',   label: '博物馆', route: '/blog',     iconColor: 'var(--card-blue)' },
  { id: 'workshop', label: '工坊',   route: '/skills',   iconColor: 'var(--card-orange)' },
  { id: 'campsite', label: '露营地', route: '/projects', iconColor: 'var(--card-teal)' },
  { id: 'beach',    label: '沙滩',   route: '/relax',    iconColor: 'var(--card-sky)' },
]

const activeId = computed(() => {
  const item = navItems.find((n) => n.route === route.path)
  return item ? item.id : null
})

function navigate(item) {
  if (route.path !== item.route) {
    router.push(item.route)
  }
}

/* --- Clock --- */
const now = ref(new Date())
let clockTimer = null
onMounted(() => { clockTimer = setInterval(() => { now.value = new Date() }, 1000) })
onUnmounted(() => clearInterval(clockTimer))

const timeStr = computed(() => {
  const h = now.value.getHours().toString().padStart(2, '0')
  const m = now.value.getMinutes().toString().padStart(2, '0')
  return `${h}:${m}`
})
</script>

<template>
  <nav class="top-nav">
    <div class="nav-inner">
      <!-- Logo -->
      <router-link to="/" class="nav-logo" aria-label="回到广场">
        <svg viewBox="0 0 32 32" width="26" height="26" aria-hidden="true">
          <rect x="14" y="18" width="4" height="10" rx="2" fill="#8B7355"/>
          <ellipse cx="16" cy="10" rx="10" ry="9" fill="var(--card-green)"/>
          <ellipse cx="13" cy="13" rx="7" ry="6" fill="var(--card-teal)" opacity="0.7"/>
          <ellipse cx="19" cy="11" rx="7" ry="6" fill="var(--card-lime)" opacity="0.6"/>
          <circle cx="12" cy="9" r="1.6" fill="var(--card-pink)"/>
          <circle cx="20" cy="8" r="1.8" fill="var(--card-yellow)"/>
        </svg>
        <span class="logo-text">一座岛</span>
      </router-link>

      <!-- Nav items -->
      <div class="nav-links">
        <button
          v-for="item in navItems"
          :key="item.id"
          class="nav-item"
          :class="{ active: activeId === item.id }"
          :style="{ '--icon-color': item.iconColor }"
          @click="navigate(item)"
          :aria-current="activeId === item.id ? 'page' : undefined"
        >
          <!-- Plaza: tree -->
          <svg v-if="item.id === 'plaza'" viewBox="0 0 20 20" width="18" height="18" class="nav-icon" aria-hidden="true"><rect x="8" y="12" width="4" height="7" rx="2" fill="currentColor" opacity="0.5"/><ellipse cx="10" cy="6" rx="7" ry="6" fill="currentColor"/><circle cx="7" cy="5" r="1.2" fill="var(--card-pink)"/><circle cx="12" cy="4" r="1.4" fill="var(--card-yellow)"/></svg>
          <!-- House -->
          <svg v-else-if="item.id === 'house'" viewBox="0 0 20 20" width="18" height="18" class="nav-icon" aria-hidden="true"><path d="M2 9 L10 2 L18 9" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><rect x="5" y="9" width="10" height="9" rx="1.5" fill="currentColor" opacity="0.3"/><rect x="8" y="12" width="4" height="6" rx="1.5" fill="currentColor"/></svg>
          <!-- Museum -->
          <svg v-else-if="item.id === 'museum'" viewBox="0 0 20 20" width="18" height="18" class="nav-icon" aria-hidden="true"><rect x="3" y="4" width="14" height="13" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"/><line x1="7" y1="4" x2="7" y2="17" stroke="currentColor" stroke-width="1.2"/><line x1="13" y1="4" x2="13" y2="17" stroke="currentColor" stroke-width="1.2"/></svg>
          <!-- Workshop -->
          <svg v-else-if="item.id === 'workshop'" viewBox="0 0 20 20" width="18" height="18" class="nav-icon" aria-hidden="true"><circle cx="10" cy="10" r="4.5" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="10" cy="10" r="1.8" fill="currentColor"/><line x1="10" y1="5.5" x2="10" y2="3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><line x1="14" y1="7" x2="16.5" y2="5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/><line x1="6" y1="7" x2="3.5" y2="5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>
          <!-- Campsite -->
          <svg v-else-if="item.id === 'campsite'" viewBox="0 0 20 20" width="18" height="18" class="nav-icon" aria-hidden="true"><polygon points="10,2 2,17 18,17" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><line x1="10" y1="2" x2="10" y2="17" stroke="currentColor" stroke-width="0.8" stroke-dasharray="2 2" opacity="0.5"/><polygon points="10,2 2,17 10,17" fill="currentColor" opacity="0.15"/></svg>
          <!-- Beach -->
          <svg v-else-if="item.id === 'beach'" viewBox="0 0 20 20" width="18" height="18" class="nav-icon" aria-hidden="true"><path d="M2 12 C6 7 10 7 14 12 C17 7 18 7 18 12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M2 16 C6 12 10 12 14 16" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" opacity="0.5"/></svg>
          <span class="nav-label">{{ item.label }}</span>
        </button>
      </div>

      <!-- Clock -->
      <div class="nav-clock">
        <span class="clock-time">{{ timeStr }}</span>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.top-nav {
  position: sticky;
  top: 0;
  z-index: var(--z-sidebar);
  background: var(--c-bg-warm);
  border-bottom: 2px solid var(--c-border-card);
  box-shadow: 0 2px 0 0 rgba(189, 174, 160, 0.2);
}

.nav-inner {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  height: 60px;
  padding: 0 var(--space-lg);
  gap: var(--space-md);
}

/* Logo */
.nav-logo {
  display: flex;
  align-items: center;
  gap: 6px;
  text-decoration: none;
  flex-shrink: 0;
}
.nav-logo:hover { opacity: 0.7; }
.logo-text {
  font-family: var(--font-display);
  font-size: 0.95rem;
  font-weight: 800;
  color: var(--c-text-heading);
}

/* Nav links */
.nav-links {
  display: flex;
  align-items: center;
  gap: 4px;
  flex: 1;
  justify-content: center;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 9px 18px;
  border: none;
  background: transparent;
  border-radius: var(--radius-pill);
  font-family: var(--font-body);
  font-size: 0.92rem;
  font-weight: 700;
  color: var(--c-text-body);
  cursor: pointer;
  transition: all var(--transition-press);
  white-space: nowrap;
}
.nav-item:hover {
  background: rgba(189, 174, 160, 0.15);
  color: var(--c-text-heading);
}
.nav-item:active { transform: translateY(1px); }
.nav-item:focus-visible {
  outline: 3px solid var(--c-focus);
  outline-offset: 2px;
}

.nav-item.active {
  color: var(--c-text-heading);
  background: var(--c-bg-content);
  box-shadow: inset 0 2px 0 0 var(--c-shadow-btn);
  transform: translateY(1px);
}

.nav-icon {
  flex-shrink: 0;
  color: var(--icon-color);
}

.nav-label { line-height: 1; }

/* Clock */
.nav-clock {
  flex-shrink: 0;
}
.clock-time {
  font-family: var(--font-display);
  font-size: 0.9rem;
  font-weight: 800;
  color: var(--c-text-muted);
  background: var(--c-bg-content);
  padding: 6px 14px;
  border-radius: var(--radius-pill);
  border: 2px solid var(--c-border-card);
}

/* Responsive */
@media (max-width: 768px) {
  .nav-inner {
    height: 50px;
    padding: 0 var(--space-sm);
    gap: var(--space-xs);
  }
  .logo-text { display: none; }
  .nav-item {
    padding: 6px 10px;
    font-size: 0.78rem;
    gap: 4px;
  }
  .nav-item .nav-icon { width: 15px; height: 15px; }
  .clock-time { font-size: 0.78rem; padding: 4px 10px; }
}
</style>
