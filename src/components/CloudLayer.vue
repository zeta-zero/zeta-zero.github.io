<template>
  <g class="cloud-layer">
    <!-- Cloud 1 — near (120, 28) -->
    <g class="cloud-group" style="animation-duration: 20s;">
      <ellipse cx="130" cy="30" rx="30" ry="11" fill="#fdfdfa" opacity="0.45" />
      <ellipse cx="115" cy="24" rx="20" ry="13" fill="#fdfdfa" opacity="0.55" />
      <ellipse cx="150" cy="26" rx="18" ry="10" fill="#fdfdfa" opacity="0.5" />
    </g>
    <!-- Cloud 2 — near (255, 38) -->
    <g class="cloud-group" style="animation-duration: 24s; animation-delay: -6s;">
      <ellipse cx="260" cy="40" rx="24" ry="9" fill="#fdfdfa" opacity="0.35" />
      <ellipse cx="248" cy="34" rx="16" ry="11" fill="#fdfdfa" opacity="0.45" />
      <ellipse cx="275" cy="36" rx="13" ry="7" fill="#fdfdfa" opacity="0.4" />
    </g>
  </g>
</template>

<style scoped>
.cloud-layer {
  pointer-events: none;
}

.cloud-group {
  animation: cloud-drift 20s ease-in-out infinite;
}

@keyframes cloud-drift {
  0%, 100% { transform: translateX(0); }
  50%      { transform: translateX(14px); }
}
</style>
