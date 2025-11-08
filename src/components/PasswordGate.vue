<template>
  <div id="password-gate" class="password-gate">
    <div class="password-card" role="dialog" aria-modal="true" :aria-label="$t('passwordGate.title')">
      <LanguageSwitcher />
      
      <h2>{{ $t('passwordGate.title') }}</h2>
      <p>{{ $t('passwordGate.subtitle') }}</p>
      
      <form @submit.prevent="checkPassword" class="password-form">
        <input
          v-model="passwordInput"
          type="password"
          :placeholder="$t('passwordGate.passwordPlaceholder')"
          :aria-label="$t('passwordGate.passwordPlaceholder')"
          @keyup.enter="checkPassword"
          autofocus
        />
        <div class="password-actions">
          <button type="submit" class="btn-primary">{{ $t('passwordGate.enterButton') }}</button>
          <button type="button" class="btn-clear" @click="resetPasswordInput">{{ $t('passwordGate.clearButton') }}</button>
        </div>
      </form>
      <p v-if="errorMessage" class="error" role="alert">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { derivePBKDF2Hex, constantTimeCompare } from '../utils/crypto'
import LanguageSwitcher from './LanguageSwitcher.vue'

const { t } = useI18n()

const props = defineProps({
  passwordHash: { type: String, default: () => import.meta.env.VITE_PASSWORD_HASH || '' },
  passwordSalt: { type: String, default: () => import.meta.env.VITE_PASSWORD_SALT || '' },
  passwordIterations: { type: Number, default: () => Number(import.meta.env.VITE_PASSWORD_ITERATIONS) || 200000 }
})
const emit = defineEmits(['unlocked'])

const passwordInput = ref('')
const errorMessage = ref('')

async function checkPassword() {
  if (!passwordInput.value) {
    errorMessage.value = t('passwordGate.errors.enterPassword')
    return
  }

  if (!props.passwordHash || !props.passwordSalt) {
    errorMessage.value = t('passwordGate.errors.notConfigured')
    return
  }

  try {
    const inputHash = await derivePBKDF2Hex(passwordInput.value.trim(), props.passwordSalt, props.passwordIterations)
    if (constantTimeCompare(inputHash, props.passwordHash)) {
      errorMessage.value = ''
      passwordInput.value = ''
      emit('unlocked')
    } else {
      errorMessage.value = t('passwordGate.errors.incorrect')
      passwordInput.value = ''
    }
  } catch (e) {
    console.error('Password verification error', e)
    errorMessage.value = t('passwordGate.errors.verificationError')
  }
}

function resetPasswordInput() {
  passwordInput.value = ''
  errorMessage.value = ''
}
</script>

<style scoped>
.password-gate {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, rgba(3,7,18,0.96), rgba(3,7,18,0.98));
  z-index: 9999;
  padding: 2rem;
}

.password-card {
  width: min(600px, 94%);
  background: rgba(255,255,255,0.02);
  border-radius: 16px;
  padding: 2rem;
  color: #fff;
  text-align: center;
  box-shadow: 0 20px 60px rgba(2,6,23,0.6);
  border: 1px solid rgba(255,255,255,0.06);
  backdrop-filter: blur(20px);
}
.password-card h2 { 
  margin: 0 0 .5rem; 
  font-size: 1.5rem; 
  font-weight: 600;
  color: rgba(255, 255, 255, 0.95);
}
.password-card p { 
  margin: 0 0 1.5rem; 
  color: rgba(255,255,255,0.8);
  font-size: 1rem;
}

.password-form { display: flex; gap: .75rem; flex-direction: column; align-items: stretch; }
.password-form input[type="password"] {
  padding: .75rem 1rem;
  border-radius: 8px;
  border: 1px solid rgba(255,255,255,0.08);
  background: rgba(0,0,0,0.35);
  color: #fff;
  font-size: 1rem;
}
.password-actions { display: flex; gap: .5rem; justify-content: center; margin-top: .5rem }
.btn-primary {
  background: var(--color-primary);
  color: #000000;
  border: none;
  padding: .6rem .9rem;
  border-radius: 8px;
}
.btn-clear {
  background: transparent;
  color: rgba(255,255,255,0.85);
  border: 1px solid rgba(255,255,255,0.06);
  padding: .55rem .8rem;
  border-radius: 8px;
}
.error { color: #ff9b9b; margin-top: .6rem }

@media (max-width: 480px) {
  .password-card { 
    padding: 1.5rem;
    border-radius: 12px;
  }
  .password-form input[type="password"] { font-size: .95rem }
  .password-card h2 {
    font-size: 1.25rem;
  }
}
</style>
