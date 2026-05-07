<script setup>
defineProps({
  text: { type: String, required: true },
  speaker: { type: String, default: '' },
  autoHide: { type: Boolean, default: false },
})

const emit = defineEmits(['close'])
</script>

<template>
  <div
    class="bubble-wrap"
    :class="{ 'clickable-bubble': autoHide }"
    @click="autoHide && emit('close')"
  >
    <span v-if="speaker" class="bubble-speaker">{{ speaker }}</span>
    <div class="speech-bubble">
      <p class="bubble-text">{{ text }}</p>
    </div>
  </div>
</template>

<style scoped>
.bubble-wrap {
  position: relative;
  max-width: 320px;
  animation: bounce-in 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.clickable-bubble {
  cursor: pointer;
  transition: transform var(--transition-press);
}

.clickable-bubble:active {
  transform: scale(0.96);
}

.bubble-speaker {
  display: block;
  font-size: 0.78rem;
  color: var(--c-text-muted);
  font-weight: 600;
  margin-bottom: 4px;
  padding-left: 12px;
  letter-spacing: 0.02em;
}

.speech-bubble {
  position: relative;
  background: var(--card-default);
  border-radius: var(--radius-organic);
  padding: var(--space-md) var(--space-lg);
  box-shadow: 0 4px 0 0 rgba(189, 174, 160, 0.25);
  border: 2px solid var(--c-border-card);
}

/* CSS tail via ::after — inner fill triangle */
.speech-bubble::after {
  content: "";
  position: absolute;
  bottom: -14px;
  left: 28px;
  width: 0;
  height: 0;
  border-left: 14px solid transparent;
  border-right: 14px solid transparent;
  border-top: 16px solid var(--c-border-card);
}

/* Inner tail overlay to match bubble background */
.speech-bubble::before {
  content: "";
  position: absolute;
  bottom: -10px;
  left: 30px;
  width: 0;
  height: 0;
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
  border-top: 14px solid var(--card-default);
  z-index: 1;
}

.bubble-text {
  font-size: 0.95rem;
  color: var(--c-text-body);
  line-height: 1.6;
  margin: 0;
}
</style>
