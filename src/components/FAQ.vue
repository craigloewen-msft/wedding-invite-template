<template>
  <section id="faq" class="s-faq">
    <div class="container">
      <h2>{{ $t('faqSection.title') }}</h2>
      <div class="faq-wrapper">
        <div class="faq-item" v-for="(questionKey, index) in questionKeys" :key="index">
          <button 
            class="faq-question"
            :class="{ active: openItems.includes(index) }"
            @click="toggleFAQ(index)"
            :aria-expanded="openItems.includes(index)"
          >
            <span>{{ $t(`faqSection.questions.${questionKey}.question`) }}</span>
            <svg class="faq-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <transition name="faq-slide">
            <div v-if="openItems.includes(index)" class="faq-answer">
              <p v-html="$t(`faqSection.questions.${questionKey}.answer`)"></p>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'FAQ',
  data() {
    return {
      openItems: [],
      questionKeys: [
        'whatToBring',
        'plusOne',
        'giftRegistry',
        'weather',
        'directions',
        'dietary'
      ]
    }
  },
  methods: {
    toggleFAQ(index) {
      const position = this.openItems.indexOf(index)
      if (position > -1) {
        this.openItems.splice(position, 1)
      } else {
        this.openItems.push(index)
      }
    }
  }
}
</script>

<style scoped>
.s-faq {
  min-height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.s-faq h2 {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
  color: #4a4a4a;
  font-weight: 300;
  letter-spacing: -0.02em;
}

.faq-wrapper {
  max-width: 800px;
  margin: 0 auto;
}

.faq-item {
  margin-bottom: 1rem;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
}

.faq-item:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border-color: #d1d5db;
}

.faq-question {
  width: 100%;
  padding: 1.5rem 2rem;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.1rem;
  font-weight: 500;
  color: #374151;
  transition: all 0.2s ease;
  line-height: 1.4;
}

.faq-question:hover {
  background: #f9fafb;
  color: #111827;
}

.faq-question.active {
  background: #f3f4f6;
  color: #111827;
}

.faq-question span {
  flex: 1;
  text-align: left;
}

.faq-icon {
  width: 20px;
  height: 20px;
  color: #6b7280;
  transition: transform 0.2s ease;
  flex-shrink: 0;
  margin-left: 1rem;
}

.faq-question.active .faq-icon {
  transform: rotate(180deg);
  color: #4b5563;
}

.faq-answer {
  padding: 1rem 2rem 1.5rem 2rem;
  background: #fff;
}

.faq-answer p {
  margin: 0;
  color: #6b7280;
  line-height: 1.6;
  font-size: 1rem;
}

/* Smooth slide animation */
.faq-slide-enter-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.faq-slide-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.faq-slide-enter-from {
  opacity: 0;
  max-height: 0;
  padding-top: 0;
  padding-bottom: 0;
}

.faq-slide-leave-to {
  opacity: 0;
  max-height: 0;
  padding-top: 0;
  padding-bottom: 0;
}

.faq-slide-enter-to,
.faq-slide-leave-from {
  opacity: 1;
  max-height: 200px;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .s-faq {
    padding: 2rem 0;
  }
  
  .s-faq h2 {
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  .faq-question {
    padding: 1.25rem 1.5rem;
    font-size: 1rem;
  }

  .faq-answer {
    padding: 0 1.5rem 1.25rem 1.5rem;
  }

  .faq-answer p {
    font-size: 0.95rem;
  }
}

/* Accessibility improvements */
.faq-question:focus {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* Animation improvements for reduced motion */
@media (prefers-reduced-motion: reduce) {
  .faq-slide-enter-active,
  .faq-slide-leave-active,
  .faq-icon,
  .faq-item {
    transition: none;
  }
}
</style>