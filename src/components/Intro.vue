<template>
  <section id="intro" class="s-intro">
    <div class="s-intro__slider">
      <div
        v-for="(img, i) in images"
        :key="i"
        class="s-intro__slide"
        :class="{ active: i === currentIndex }"
        :style="{ backgroundImage: `url(/assets/images/${img})` }"
      ></div>

      <div class="s-intro__content" :class="{ visible: contentVisible }">
        <div v-if="to" class="text-pretitle">{{ $t('intro.dear', { name: to }) }}</div>
        <div class="text-pretitle">{{ $t('intro.youreInvited') }}</div>
        <h1 class="text-huge-title">{{ $t('intro.weddingTitle') }}</h1>

        <button class="open-inv-btn mt-2" @click="openInvitation">{{ $t('intro.openInvitation') }}</button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Intro',
  emits: ['invitation-opened'],
  data() {
    return {
      to: '',
      images: ['hero-1.jpeg', 'hero-2.jpeg'],
      currentIndex: 0,
      timerId: null,
      contentVisible: false
    }
  },
  mounted() {
    // start slideshow
    this.timerId = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length
    }, 3000)

    // reveal intro content with a short delay to allow initial paint
    // small timeout gives a nicer appearance on first load
    setTimeout(() => {
      this.contentVisible = true
    }, 80)

    // Check the URL for an embedded recipient name and use it if present
    const urlName = this._getNameFromUrl()
    if (urlName) {
      this.to = urlName
    }
  },
  beforeUnmount() {
    if (this.timerId) {
      clearInterval(this.timerId)
      this.timerId = null
    }
  },
  methods: {
    openInvitation() {
      // Emit event to parent to show the main content
      this.$emit('invitation-opened')
      
      // Scroll to main content after a short delay to allow it to render
      setTimeout(() => {
        const el = document.getElementById('main')
        if (el && el.scrollIntoView) {
          el.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    },

    // Helper: extract a name from URL query, path, or hash.
    // Supports: ?to=Name, ?name=Name, /Name, or #/Name and replaces + or - with spaces.
    _getNameFromUrl() {
      try {
        let raw = ''

        // 1) try query params: ?to=Name or ?name=Name
        if (window && window.location && window.location.search) {
          const params = new URLSearchParams(window.location.search)
          raw = params.get('to') || params.get('name') || ''
        }

        // 2) try hash like #/Name or #to=Name
        if (!raw && window && window.location && window.location.hash) {
          const h = window.location.hash.replace(/^#/, '')
          if (h.startsWith('to=')) raw = h.split('=')[1]
          else if (h.startsWith('/')) raw = h.slice(1)
        }

        // 3) try pathname: /Name
        if (!raw && window && window.location && window.location.pathname) {
          const p = window.location.pathname
          if (p && p !== '/') raw = p.replace(/^\//, '')
        }

        if (!raw) return ''

        // decode URI components, convert pluses/hyphens to spaces, trim
        raw = decodeURIComponent(raw)
        raw = raw.replace(/\+/g, ' ').replace(/-/g, ' ').trim()

        // basic sanitization: allow common name characters and spaces
        raw = raw.replace(/[^a-zA-Z0-9\s\.,&'’()-]/g, '')

        // Title-case each word for nicer display
        raw = raw
          .split(/\s+/)
          .filter(Boolean)
          .map(w => w.charAt(0).toUpperCase() + w.slice(1))
          .join(' ')

        return raw
      } catch (e) {
        return ''
      }
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&family=Playfair+Display:wght@400;700&display=swap');

.s-intro__slider {
  position: relative;
  height: 100vh;
  overflow: hidden;
}

.s-intro__slide {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center center;
  opacity: 0;
  transition: opacity 2s ease-in-out;
  transform-origin: center center;
  overflow: hidden;
}

/* dark overlay so text remains readable over the slideshow */
.s-intro__slide::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgb(0, 0, 0, 0.1);
  opacity: 0;
  transition: opacity 0.6s ease;
  pointer-events: none;
}

.s-intro__slide.active::before {
  opacity: 1;
}

.s-intro__slide.active {
  opacity: 1;
  z-index: 1;
}

/* Fade/slide-in for intro content */
.s-intro__content {
  position: absolute;
  left: 6vw;
  top: 6vh;
  z-index: 2;
  max-width: min(640px, 54%);
  padding: 1.25rem 1.5rem;
  color: #fff;
  text-align: left;

  /* glassy card for better contrast over images */
  background: linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02));
  backdrop-filter: blur(8px) saturate(120%);
  -webkit-backdrop-filter: blur(8px) saturate(120%);
  border-radius: 12px;
  box-shadow: 0 12px 30px rgba(0,0,0,0.5);

  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}

/* Visible state toggled after mount */
.s-intro__content.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Add small staggered delays to children for a nicer effect */
.s-intro__content .text-pretitle {
  display: block;
  color: rgba(255,255,255,0.9);
  font-family: 'Montserrat', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
  letter-spacing: 1.8px;
  text-transform: uppercase;
  font-size: 1.4rem;
  margin-bottom: 0.25rem;

  opacity: 0;
  transform: translateY(6px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.s-intro__content.visible .text-pretitle {
  opacity: 1;
  transform: translateY(0);
}

.s-intro__content .text-huge-title {
  margin: 0;
  color: #fff;
  font-family: 'Playfair Display', Georgia, serif;
  font-weight: 700;
  font-size: clamp(1.8rem, 5vw, 4.5rem);
  line-height: 1.02;
  text-shadow: 0 6px 22px rgba(0,0,0,0.45);

  opacity: 0;
  transform: translateY(6px);
  transition: opacity 0.7s ease 0.12s, transform 0.7s ease 0.12s;
}

.s-intro__content.visible .text-huge-title {
  opacity: 1;
  transform: translateY(0);
}

/* 'Dear' line styling (keeps the same markup but distinguishes it visually) */
.s-intro__content .text-pretitle + strong {
  display: inline-block;
  margin-left: 6px;
  color: rgba(255,255,255,0.95);
  font-weight: 800;
}

/* Update the open-inv-btn styles to be a neutral/colourless "ghost" button: transparent background, white border and text, subtle hover/focus/active states for polish. */
.open-inv-btn {
  margin-top: 1rem;
  padding: .7rem 1.1rem;
  border-radius: 999px;
  background: transparent;
  color: #fff; /* keep it monochrome */
  font-weight: 700;
  border: 1px solid rgba(255,255,255,0.85);
  box-shadow: 0 6px 20px rgba(0,0,0,0.35), inset 0 -1px 0 rgba(255,255,255,0.02);
  opacity: 0;
  transform: translateY(6px);
  transition: opacity 0.6s ease 0.2s, transform 0.25s cubic-bezier(.2,.9,.2,1), background 0.18s ease, box-shadow 0.18s ease, color 0.18s ease;
  cursor: pointer;
  backdrop-filter: blur(2px);
}

.open-inv-btn:hover {
  transform: translateY(-3px);
  background: rgba(255,255,255,0.06);
  box-shadow: 0 14px 30px rgba(0,0,0,0.45);
}

.open-inv-btn:active {
  transform: translateY(0);
  background: rgba(255,255,255,0.04);
}

.open-inv-btn:focus {
  outline: 3px solid rgba(255,255,255,0.12);
  outline-offset: 3px;
}

.s-intro__content.visible .open-inv-btn {
  opacity: 1;
  transform: translateY(0);
}

/* Responsive tweaks */
@media (max-width: 820px) {
  .s-intro__content {
    left: 4vw;
    right: 4vw;
    max-width: none;
    padding: 1rem;
  }
  .s-intro__content .text-huge-title {
    font-size: 2rem;
  }
  .open-inv-btn {
    width: fit-content;
  }
}
</style>
