<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import SpeechBubble from '../shared/SpeechBubble.vue'
import { greetings, islandStats, recentUpdates } from '../../data/islandData.js'

const greeting = ref(greetings[Math.floor(Math.random() * greetings.length)])
const leaves = ref([])
let leafTimer = null

function spawnLeaf() {
  if (leaves.value.length >= 2) return
  leaves.value.push({
    id: Date.now() + Math.random(),
    x: Math.random() * 160 + 20,
  })
}

onMounted(() => {
  spawnLeaf()
  leafTimer = setInterval(() => {
    leaves.value = leaves.value.filter(l => Date.now() - l.id < 4000)
    if (leaves.value.length < 2) spawnLeaf()
  }, 4000)
})

onUnmounted(() => clearInterval(leafTimer))
</script>

<template>
  <div class="plaza-view">
    <h1 class="view-title">
      <svg class="title-icon" viewBox="0 0 32 32" width="32" height="32" aria-hidden="true">
        <rect x="14" y="14" width="4" height="16" rx="2" fill="#8B7355" />
        <ellipse cx="16" cy="9" rx="13" ry="10" fill="var(--card-green)" />
        <ellipse cx="13" cy="11" rx="9" ry="8" fill="var(--card-teal)" opacity="0.7" />
        <ellipse cx="19" cy="10" rx="8" ry="7" fill="var(--card-yellow)" opacity="0.5" />
      </svg>
      广场大树
    </h1>
    <p class="view-sub">岛上最古老的树，见证了所有知识的生长。</p>

    <div class="tree-container">
      <svg viewBox="0 0 260 290" class="tree-svg" xmlns="http://www.w3.org/2000/svg" aria-label="广场大树">
        <!-- Ground / Grass area -->
        <ellipse cx="130" cy="240" rx="125" ry="35" fill="var(--card-green)" opacity="0.2" />
        <ellipse cx="130" cy="240" rx="105" ry="28" fill="var(--card-teal)" opacity="0.15" />
        <!-- Grass blades on ground -->
        <g stroke="var(--card-green)" stroke-width="2" stroke-linecap="round" opacity="0.5">
          <line x1="50" y1="232" x2="48" y2="220" />
          <line x1="55" y1="234" x2="53" y2="223" />
          <line x1="200" y1="230" x2="202" y2="218" />
          <line x1="206" y1="232" x2="208" y2="221" />
          <line x1="70" y1="238" x2="68" y2="227" />
          <line x1="180" y1="236" x2="182" y2="224" />
          <line x1="90" y1="240" x2="88" y2="229" />
          <line x1="165" y1="239" x2="167" y2="228" />
        </g>
        <!-- Small flowers on ground -->
        <g opacity="0.7">
          <circle cx="65" cy="228" r="2.5" fill="var(--card-pink)" />
          <circle cx="65" cy="228" r="1" fill="var(--card-yellow)" />
          <circle cx="195" cy="224" r="2.2" fill="var(--card-purple)" />
          <circle cx="195" cy="224" r="0.9" fill="var(--card-yellow)" />
          <circle cx="175" cy="230" r="2" fill="var(--card-pink)" />
          <circle cx="175" cy="230" r="0.8" fill="var(--card-yellow)" />
        </g>

        <!-- Tree shadow on ground — sits at grass surface level -->
        <ellipse cx="135" cy="215" rx="40" ry="9" fill="rgba(90,74,58,0.08)" />

        <!-- Trunk — wider at base, tapering into grass -->
        <path d="M118 225 Q116 185 120 155 L122 105 L138 105 L140 155 Q144 185 142 225 Z"
              fill="#8B7355" stroke="#6a5a40" stroke-width="1.5" />
        <!-- Trunk bark lines -->
        <line x1="125" y1="215" x2="124" y2="170" stroke="#6a5a40" stroke-width="0.8" opacity="0.4" />
        <line x1="135" y1="220" x2="134" y2="165" stroke="#6a5a40" stroke-width="0.8" opacity="0.3" />
        <!-- Root bumps — partially hidden in grass -->
        <ellipse cx="118" cy="227" rx="8" ry="4" fill="#7a6548" />
        <ellipse cx="142" cy="227" rx="8" ry="4" fill="#7a6548" />

        <!-- Main crown — irregular organic shapes -->
        <g class="crown-group" transform-origin="130px 115px">
          <!-- Layer 1: deep green base — wide spread -->
          <ellipse cx="110" cy="105" rx="62" ry="42" fill="var(--card-green)" class="crown-1" />
          <ellipse cx="150" cy="110" rx="48" ry="36" fill="var(--card-green)" opacity="0.8" class="crown-1b" />
          <ellipse cx="80" cy="113" rx="43" ry="33" fill="var(--card-green)" opacity="0.7" class="crown-1c" />

          <!-- Layer 2: teal mid — asymmetrical spread -->
          <ellipse cx="120" cy="80" rx="52" ry="38" fill="var(--card-teal)" class="crown-2" />
          <ellipse cx="95" cy="86" rx="40" ry="30" fill="var(--card-teal)" opacity="0.8" class="crown-2b" />
          <ellipse cx="145" cy="84" rx="36" ry="28" fill="var(--card-teal)" opacity="0.6" class="crown-2c" />

          <!-- Layer 3: warm yellow-green highlight -->
          <ellipse cx="115" cy="62" rx="42" ry="30" fill="var(--card-yellow)" opacity="0.45" class="crown-3" />
          <ellipse cx="140" cy="66" rx="33" ry="24" fill="var(--card-yellow)" opacity="0.35" class="crown-3b" />

          <!-- Layer 4: bright lime top highlight -->
          <ellipse cx="125" cy="48" rx="38" ry="26" fill="var(--card-lime)" class="crown-4" />
          <ellipse cx="105" cy="52" rx="30" ry="20" fill="var(--card-lime)" opacity="0.7" class="crown-4b" />
        </g>

        <!-- Fruits scattered in crown -->
        <circle cx="75" cy="90" r="4.5" fill="var(--card-pink)" class="fruit" />
        <circle cx="155" cy="85" r="4" fill="var(--card-yellow)" class="fruit fruit-2" />
        <circle cx="95" cy="64" r="3.8" fill="var(--card-pink)" class="fruit fruit-3" />
        <circle cx="142" cy="56" r="4" fill="var(--card-yellow)" class="fruit fruit-4" />
        <circle cx="115" cy="98" r="3.5" fill="var(--card-pink)" class="fruit fruit-5" />
        <circle cx="62" cy="102" r="3.2" fill="var(--card-yellow)" class="fruit fruit-6" />
      </svg>

      <!-- Falling leaves -->
      <div
        v-for="leaf in leaves"
        :key="leaf.id"
        class="falling-leaf"
        :style="{ left: leaf.x + 'px' }"
      >
        <svg viewBox="0 0 20 20" width="14" height="14" aria-hidden="true">
          <path
            d="M10 2 C5 5 2 12 4 16 C6 20 10 18 10 14 C10 18 14 20 16 16 C18 12 15 5 10 2Z"
            fill="var(--card-green)"
          />
        </svg>
      </div>
    </div>

    <SpeechBubble
      v-if="greeting"
      :text="greeting.text"
      :speaker="greeting.speaker"
      class="greeting-bubble"
    />

    <div class="recent-updates">
      <h2 class="section-heading">最近的果实</h2>
      <div class="update-cards">
        <div
          v-for="(item, i) in recentUpdates"
          :key="i"
          class="update-card card"
          :class="'card-' + item.cardColor"
        >
          <span class="update-year">{{ item.year }}</span>
          <span class="update-text">{{ item.text }}</span>
        </div>
      </div>
    </div>

    <!-- Island Stats -->
    <div class="stats-row">
      <div class="stat-pill">
        <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
          <rect x="2" y="2" width="12" height="12" rx="2" fill="none" stroke="var(--c-accent-mint)" stroke-width="1.5" />
          <line x1="5" y1="6" x2="11" y2="6" stroke="var(--c-accent-mint)" stroke-width="1.2" stroke-linecap="round" />
          <line x1="5" y1="9" x2="11" y2="9" stroke="var(--c-accent-mint)" stroke-width="1.2" stroke-linecap="round" />
          <line x1="5" y1="12" x2="8" y2="12" stroke="var(--c-accent-mint)" stroke-width="1.2" stroke-linecap="round" />
        </svg>
        <span class="stat-num">{{ islandStats.blogs }}</span>
        <span class="stat-label">博客</span>
      </div>
      <div class="stat-pill">
        <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
          <circle cx="8" cy="5" r="3" fill="none" stroke="var(--c-accent-mint)" stroke-width="1.5" />
          <path d="M3 14 L6 10 L9 12 L13 7" fill="none" stroke="var(--c-accent-mint)" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <span class="stat-num">{{ islandStats.skills }}</span>
        <span class="stat-label">技能</span>
      </div>
      <div class="stat-pill">
        <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
          <rect x="1" y="2" width="14" height="12" rx="2" fill="none" stroke="var(--c-accent-mint)" stroke-width="1.5" />
          <rect x="4" y="5" width="8" height="6" rx="1" fill="var(--c-accent-mint)" opacity="0.3" />
          <line x1="6" y1="5" x2="6" y2="11" stroke="var(--c-accent-mint)" stroke-width="0.8" />
          <line x1="10" y1="5" x2="10" y2="11" stroke="var(--c-accent-mint)" stroke-width="0.8" />
        </svg>
        <span class="stat-num">{{ islandStats.projects }}</span>
        <span class="stat-label">项目</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.plaza-view {
  max-width: 650px;
  margin: 0 auto;
  padding: var(--space-lg);
  animation: fade-in-up 0.6s ease both;
}

.view-title {
  font-size: 2rem;
  font-family: var(--font-display);
  font-weight: 800;
  color: var(--c-text-heading);
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  margin-bottom: var(--space-xs);
}

.title-icon {
  flex-shrink: 0;
}

.view-sub {
  font-size: 1rem;
  color: var(--c-text-muted);
  margin-bottom: var(--space-lg);
}

/* ---------- Tree ---------- */
.tree-container {
  position: relative;
  width: 260px;
  height: 290px;
  margin: 0 auto var(--space-md);
}

.tree-svg {
  width: 100%;
  height: 100%;
  display: block;
}

.crown-group > * {
  transform-origin: 130px 105px;
}

.crown-1  { animation: sway 4s ease-in-out infinite; }
.crown-1b { animation: sway 4.3s ease-in-out infinite 0.3s; }
.crown-1c { animation: sway 3.7s ease-in-out infinite 0.6s; }
.crown-2  { animation: sway 4.5s ease-in-out infinite 0.5s; }
.crown-2b { animation: sway 4.8s ease-in-out infinite 0.8s; }
.crown-2c { animation: sway 4.1s ease-in-out infinite 1.0s; }
.crown-3  { animation: sway 3.8s ease-in-out infinite 0.8s; }
.crown-3b { animation: sway 4.2s ease-in-out infinite 1.1s; }
.crown-4  { animation: sway 4.2s ease-in-out infinite 1.2s; }
.crown-4b { animation: sway 3.9s ease-in-out infinite 1.4s; }

.fruit {
  animation: pulse-glow 3s ease-in-out infinite;
}
.fruit-2 { animation-delay: 0.6s; }
.fruit-3 { animation-delay: 1.2s; }
.fruit-4 { animation-delay: 1.8s; }
.fruit-5 { animation-delay: 2.4s; }
.fruit-6 { animation-delay: 0.3s; }

/* ---------- Falling Leaves ---------- */
.falling-leaf {
  position: absolute;
  top: 80px;
  animation: leaf-fall 3.5s ease-in forwards;
  pointer-events: none;
}

/* ---------- Greeting Bubble ---------- */
.greeting-bubble {
  margin: 20px auto;
}

/* ---------- Recent Updates ---------- */
.recent-updates {
  margin-top: var(--space-md);
}

.section-heading {
  font-size: 1.15rem;
  font-family: var(--font-display);
  font-weight: 700;
  color: var(--c-text-heading);
  margin-bottom: 10px;
}

.update-cards {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.update-card {
  padding: 12px var(--space-md);
  display: flex;
  gap: 12px;
  align-items: center;
}

.update-year {
  font-weight: 700;
  font-size: 0.82rem;
  color: var(--c-accent-mint);
  white-space: nowrap;
}

.update-text {
  font-size: 0.95rem;
  color: var(--c-text-body);
}

/* ---------- Stats Row ---------- */
.stats-row {
  display: flex;
  gap: var(--space-md);
  margin-top: var(--space-lg);
  justify-content: center;
}

.stat-pill {
  display: flex;
  align-items: center;
  gap: 5px;
  background: var(--c-bg-content);
  border-radius: var(--radius-pill);
  padding: 6px 16px;
  box-shadow: 0 2px 0 0 rgba(189, 174, 160, 0.2);
}

.stat-num {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 1.1rem;
  color: var(--c-text-heading);
}

.stat-label {
  font-size: 0.78rem;
  color: var(--c-text-muted);
  font-weight: 500;
}
</style>
