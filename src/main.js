import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import './assets/main.css'
import { messages, defaultLocale } from './locales'

// Get locale from URL parameter, localStorage, or use default
function getInitialLocale() {
  // Check URL parameter first (?lang=ko)
  const urlParams = new URLSearchParams(window.location.search);
  const urlLocale = urlParams.get('lang');
  if (urlLocale && messages[urlLocale]) {
    return urlLocale;
  }
  
  // Check localStorage
  try {
    const savedLocale = localStorage.getItem('wedding-locale');
    if (savedLocale && messages[savedLocale]) {
      return savedLocale;
    }
  } catch (e) {
    // ignore localStorage errors
  }
  
  // Check browser language
  const browserLocale = navigator.language.split('-')[0];
  if (messages[browserLocale]) {
    return browserLocale;
  }
  
  return defaultLocale;
}

const i18n = createI18n({
  locale: getInitialLocale(),
  fallbackLocale: defaultLocale,
  messages,
  legacy: false, // Use Composition API
  globalInjection: true
})

const app = createApp(App)
app.use(i18n)
app.mount('#app')

// Re-run the vendor initializers once the SPA app is mounted so plugins can bind to Vue DOM
if (window && window.ssInit) {
  window.ssInit();
}
