<template>
  <g class="butterfly-layer">
    <!-- Butterfly 1 — hidden by default, visible on hover -->
    <g class="butterfly butterfly-1">
      <animateMotion
        dur="18s"
        repeatCount="indefinite"
        path="M60,80 C110,40 160,120 210,80 C260,40 310,100 290,150 C270,200 200,180 160,190 C120,200 40,130 60,80Z"
      />
      <g transform="scale(0.45)">
        <ellipse cx="-4" cy="0" rx="6" ry="4" fill="var(--card-green)" opacity="0.65" transform="rotate(-20)" />
        <ellipse cx="4" cy="0" rx="6" ry="4" fill="var(--card-green)" opacity="0.65" transform="rotate(20)" />
        <ellipse cx="0" cy="0" rx="1.5" ry="3" fill="var(--c-text-body)" />
      </g>
    </g>

    <!-- Butterfly 2 — faintly visible by default -->
    <g class="butterfly butterfly-2">
      <animateMotion
        dur="22s"
        repeatCount="indefinite"
        path="M300,280 C250,230 200,330 150,270 C100,210 180,170 220,190 C260,210 320,260 300,280Z"
      />
      <g transform="scale(0.38)">
        <ellipse cx="-4" cy="0" rx="6" ry="4" fill="var(--card-yellow)" opacity="0.6" transform="rotate(-20)" />
        <ellipse cx="4" cy="0" rx="6" ry="4" fill="var(--card-yellow)" opacity="0.6" transform="rotate(20)" />
        <ellipse cx="0" cy="0" rx="1.5" ry="3" fill="var(--c-text-body)" />
      </g>
    </g>
  </g>
</template>

<style scoped>
.butterfly-layer {
  pointer-events: none;
}

.butterfly-1 {
  opacity: 0;
  transition: opacity 0.8s ease;
}

.butterfly-2 {
  opacity: 0.15;
  transition: opacity 0.8s ease;
}

/* Reveal on hover of parent SVG area */
.butterfly-layer:hover .butterfly-1 {
  opacity: 1;
}

.butterfly-layer:hover .butterfly-2 {
  opacity: 0.7;
}
</style>
