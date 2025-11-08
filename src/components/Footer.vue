<template>
  <footer class="footer">
    <div class="footer-content">
      <p class="footer-text">
        {{ $t('footer.madeBy') }}
        <a href="https://github.com/craigloewen-msft/wedding-invite" target="_blank" rel="noopener noreferrer" class="footer-link">{{ $t('footer.openSource') }}</a>.
        {{ $t('footer.artCredit') }}
      </p>
      <p class="footer-text">
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
.footer {
  background-color: #f8f9fa;
  border-top: 1px solid #e9ecef;
  padding: 1rem 0;
  margin-top: 1rem;
  text-align: center;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.footer-text {
  margin: 0.25rem 0;
  font-size: 0.875rem;
  color: #6c757d;
}

.footer-link {
  color: #007bff;
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer-link:hover {
  color: #0056b3;
  text-decoration: underline;
}

@media (max-width: 768px) {
  .footer {
    padding: 0.75rem 0;
  }
  
  .footer-text {
    font-size: 0.8rem;
  }
}
</style>