<template>
  <section id="gallery" class="s-gallery">
    <div class="container">
      <h2>{{ $t('gallerySection.title') }}</h2>
      <div class="gallery-grid" aria-live="polite">
        <!-- Use a button-like element for thumbnails so we can open a lightbox instead of navigating away -->
        <button v-for="(img, idx) in images" :key="idx" type="button" class="thumb" @click="open(idx)"
          :aria-label="$t('gallerySection.openImage', { number: idx + 1 })">
          <img :src="img" :alt="$t('gallerySection.imageAlt', { number: idx + 1 })" loading="lazy" 
            :style="getImageStyle(img)" />
        </button>
      </div>

      <!-- Fullscreen lightbox/modal -->
      <div v-if="lightboxOpen" class="lightbox" role="dialog" aria-modal="true"
        :aria-label="$t('gallerySection.imageLabel', { current: currentIndex + 1, total: images.length })"
        @click.self="close">
        <button class="lightbox-close" @click="close" :aria-label="$t('gallerySection.closeImage')">×</button>
        <img :src="currentImage" :alt="currentAlt" class="lightbox-img" />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Gallery',
  data() {
    return {
      images: [],
      lightboxOpen: false,
      currentImage: null,
      currentAlt: '',
      currentIndex: -1,
      // Dictionary for per-image crop positioning
      // Add entries here to customize how specific images are cropped
      // Example: 'gallery1.jpeg': 'center top' or '30% 40%'
      photoSettings: {
        'gallery1.jpeg': '50% 75%',
      }
    }
  },
  async created() {
    // Automatically load all images from the gallery folder
    try {
      // Use Vite's import.meta.glob to get all images in the gallery folder
      const galleryModules = import.meta.glob('/assets/images/gallery/*', {
        eager: true,
        query: '?url',
        import: 'default'
      })
      
      // Convert the module paths to public URLs and sort them
      const imgs = Object.keys(galleryModules)
        .map(path => path.replace('/public', ''))
        .sort() // Sort alphabetically so gallery1.jpeg comes before gallery2.jpeg etc.
      
      this.images = imgs
    } catch (error) {
      console.error('Error loading gallery images:', error)
      // Fallback to empty array if something goes wrong
      this.images = []
    }
  },
  methods: {
    getImageStyle(imgPath) {
      // Extract filename from path (e.g., '/assets/images/gallery/photo1.jpg' -> 'photo1.jpg')
      const filename = imgPath.split('/').pop()
      const position = this.photoSettings[filename]
      
      return position ? { objectPosition: position } : {}
    },
    open(idx) {
      this.currentIndex = idx
      this.currentImage = this.images[idx]
      this.currentAlt = this.$t('gallerySection.imageAlt', { number: idx + 1 })
      this.lightboxOpen = true
      // prevent page scrolling while open
      document.documentElement.style.overflow = 'hidden'
    },
    close() {
      this.lightboxOpen = false
      this.currentImage = null
      this.currentAlt = ''
      this.currentIndex = -1
      document.documentElement.style.overflow = ''
    },
    onKeydown(e) {
      if (!this.lightboxOpen) return
      if (e.key === 'Escape') this.close()
      // optional: navigate with arrows
      if (e.key === 'ArrowRight') this.next()
      if (e.key === 'ArrowLeft') this.prev()
    },
    next() {
      if (this.images.length === 0) return
      const next = (this.currentIndex + 1) % this.images.length
      this.open(next)
    },
    prev() {
      if (this.images.length === 0) return
      const prev = (this.currentIndex - 1 + this.images.length) % this.images.length
      this.open(prev)
    }
  },
  mounted() {
    window.addEventListener('keydown', this.onKeydown)
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.onKeydown)
    document.documentElement.style.overflow = ''
  }
}
</script>

<style scoped>
.container {
  padding: 1rem;
}

.muted {
  color: var(--color-muted, #666);
}

.gallery-grid {
  display: grid;
  /* make thumbnails noticeably larger by increasing the min width */
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.gallery-grid .thumb {
  display: block;
  /* use aspect-ratio so the element always has height without relying on padding tricks */
  aspect-ratio: 3 / 2;
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.12);
  border: none;
  padding: 0;
  cursor: zoom-in;
  width: 100%;
}

.gallery-grid img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Lightbox styles */
.lightbox {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
}

.lightbox-img {
  max-width: 95%;
  max-height: 95%;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6);
  border-radius: 6px;
}

.lightbox-close {
  position: fixed;
  top: 1rem;
  right: 1rem;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  border: none;
  padding: 0.4rem 0.7rem;
  font-size: 1.5rem;
  line-height: 1;
  border-radius: 6px;
  cursor: pointer;
  z-index: 1100;
}
</style>
