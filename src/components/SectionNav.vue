<template>
  <nav class="site-nav">
    <button :class="{active: currentSection==='details'}" @click="$emit('select','details')">{{ $t('details') }}</button>
    <button :class="{active: currentSection==='gallery'}" @click="$emit('select','gallery')">{{ $t('gallery') }}</button>
    <button :class="{active: currentSection==='faq'}" @click="$emit('select','faq')">{{ $t('faq') }}</button>
  </nav>
</template>

<script setup>
const props = defineProps({ currentSection: { type: String, default: 'details' } })
</script>

<style scoped>
.site-nav {
  display: flex;
  gap: .5rem;
  justify-content: center;
  align-items: center;
  padding: .75rem 0;
  position: sticky;
  top: 0;
  background: rgba(255,255,255,0.9);
  z-index: 20;
  backdrop-filter: blur(6px);
  border-bottom: 1px solid rgba(0,0,0,0.04);
}

.site-nav button {
  background: transparent;
  color: #303030;
  border: 1px solid transparent;
  padding: .5rem .85rem;
  border-radius: 6px;
}

.site-nav button:hover { background: var(--color-accent); }
.site-nav button.active { background: var(--color-primary); color: #2e2e2e; }
</style>
