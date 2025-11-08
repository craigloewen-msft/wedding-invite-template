<template>
  <!-- Password gate: show this full-screen prompt until unlocked -->
  <div id="app-root">
    <transition name="fade-only" @after-leave="onGateLeave" mode="out-in">
      <PasswordGate
        v-if="locked"
        :password-hash="passwordHash"
        :password-salt="passwordSalt"
        :password-iterations="passwordIterations"
        @unlocked="locked = false"
      />

       <!-- Original app content is shown once unlocked -->
       <div class="app-content" v-else>
         <Intro @invitation-opened="invitationOpened = true" />
         <div id="main" class="container" v-show="invitationOpened">
          <SectionNav :currentSection="currentSection" @select="select" />

           <section class="main-content">
             <transition name="fade" mode="out-in">
               <component :is="currentComponent" :key="currentSection" />
             </transition>
           </section>
         </div>
         <Footer v-show="invitationOpened" />
       </div>
     </transition>
   </div>
 </template>
 
 <script>
import Intro from './components/Intro.vue'
import Details from './components/Details.vue'
import Gallery from './components/Gallery.vue'
import FAQ from './components/FAQ.vue'
import PasswordGate from './components/PasswordGate.vue'
import SectionNav from './components/SectionNav.vue'
import Footer from './components/Footer.vue'

export default {
   name: 'App',
   components: { Intro, Details, Gallery, FAQ, PasswordGate, SectionNav, Footer },
   data() {
     return {
       currentSection: 'details',
       showAnimation: true,
       invitationOpened: false,
 
       // Password gate state
       locked: true,
 
       // Store only the hashed password + salt + iterations (set via Vite env variables)
       // Provide empty defaults so the gate remains closed if not configured
       passwordHash: import.meta.env.VITE_PASSWORD_HASH || '',
       passwordSalt: import.meta.env.VITE_PASSWORD_SALT || '',
       passwordIterations: Number(import.meta.env.VITE_PASSWORD_ITERATIONS) || 200000
     }
   },
   mounted() {
     // If previously unlocked in this browser, restore unlocked state
     try {
       // const unlocked = localStorage.getItem('wedding_unlocked_v1')
       // if (unlocked === 'true') this.locked = false
     } catch (e) {
       // ignore localStorage errors
     }
   },
   computed: {
     currentComponent() {
       const map = {
         details: 'Details',
         gallery: 'Gallery',
         faq: 'FAQ'
       }
       return map[this.currentSection] || 'Details'
     }
   },
   methods: {
     select(section) {
       this.currentSection = section
     },

     transitionIsOver() {
       // placeholder: existing code may expect this method
     },
     
     onGateLeave() {
       // After the gate finishes its leave animation, ensure the main app can receive focus
       // for accessibility and call any other transition-completion hooks.
       try {
         const main = document.getElementById('main')
         if (main && typeof main.focus === 'function') main.focus()
       } catch (e) {
         // ignore focus errors
       }
       // call the existing placeholder hook so other logic can piggyback
       this.transitionIsOver()
     }
   }
 }
 </script>
 
 <style scoped>
/* Site-wide transitions and layout remain here. Component-specific styles moved into components. */

/* Fade transition for main content (updated for proper layout) */
.fade-enter-active, .fade-leave-active {
  transition: opacity 180ms ease, transform 180ms ease;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  display: block;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

.fade-enter-to, .fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}

/* Prevent pointer events on overlaying leave state to avoid accidental interactions */
.fade-leave-active {
  pointer-events: none;
}

/* Simple fade for the outer gate transition (locked <-> unlocked) */
.fade-only-enter-active, .fade-only-leave-active {
  transition: opacity 1220ms ease;
}
.fade-only-enter-from, .fade-only-leave-to {
  opacity: 0;
}
.fade-only-enter-to, .fade-only-leave-from {
  opacity: 1;
}

.app-content {
  background-color: #fff;
  display: flex;
  flex-direction: column;
}

#main {
  flex: 1;
  scroll-margin-top: 1rem;
}

/* Ensure main-content flows naturally in the document */
.main-content { 
  position: relative;
  min-height: 80vh; /* Reasonable minimum */
}

/* Use relative positioning for components to maintain document flow */
.main-content > * { 
  position: static;
  width: 100%;
}

/* Override for transitions - only during transition do we use absolute positioning */
.main-content .fade-enter-active,
.main-content .fade-leave-active {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
}
</style>
