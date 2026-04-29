<script setup>
import AppNavbar from '@/components/AppNavbar.vue'
import HeroSection from '@/components/HeroSection.vue'
import GitHubHeatmap from '@/components/GitHubHeatmap.vue'
import ContactForm from '@/components/ContactForm.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import SkillsSection from '@/components/SkillsSection.vue'
</script>

<template>
  <AppNavbar />
  <HeroSection />
  <SkillsSection />
  <GitHubHeatmap username="tfevan" />

  <ContactForm />
  <FooterComponent />
</template>
