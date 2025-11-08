<template>
  <div class="language-switcher">
    <div class="switcher-label">{{ $t('passwordGate.selectLanguage') }}</div>
    <div class="switcher-buttons">
      <button 
        v-for="locale in availableLocales" 
        :key="locale.code"
        @click="switchLanguage(locale.code)"
        :class="{ active: currentLocale === locale.code }"
        class="language-option"
        :aria-label="`Switch to ${locale.name}`"
      >
        <span class="flag">{{ locale.flag }}</span>
        <span class="lang-name">{{ locale.name }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { availableLocales } from '../locales'
import { computed } from 'vue'

const { locale } = useI18n()
const currentLocale = computed(() => locale.value)

function switchLanguage(newLocale) {
  locale.value = newLocale
  
  // Save to localStorage
  try {
    localStorage.setItem('wedding-locale', newLocale)
  } catch (e) {
    // ignore localStorage errors
  }
  
  // Update URL parameter
  const url = new URL(window.location)
  url.searchParams.set('lang', newLocale)
  window.history.replaceState({}, '', url)
}
</script>

<style scoped>
.language-switcher {
  margin-bottom: 1.5rem;
  text-align: center;
}

.switcher-label {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 500;
}

.switcher-buttons {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  flex-wrap: wrap;
}

.language-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.25rem;
  border: 2px solid rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 0.875rem;
  font-weight: 500;
  backdrop-filter: blur(8px);
  min-width: 80px;
  position: relative;
  overflow: hidden;
}

.language-option::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.language-option:hover::before {
  opacity: 1;
}

.language-option:hover {
  border-color: rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.95);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.language-option.active {
  border-color: rgba(255, 255, 255, 0.5);
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3), 
              inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.language-option.active::before {
  opacity: 1;
}

.flag {
  font-size: 1.5rem;
  line-height: 1;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
  position: relative;
  z-index: 1;
}

.lang-name {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  position: relative;
  z-index: 1;
}

@media (max-width: 480px) {
  .language-switcher {
    margin-bottom: 1.25rem;
  }
  
  .switcher-buttons {
    gap: 0.5rem;
  }
  
  .language-option {
    padding: 0.75rem 1rem;
    min-width: 70px;
  }
  
  .flag {
    font-size: 1.25rem;
  }
  
  .lang-name {
    font-size: 0.7rem;
  }
}
</style>