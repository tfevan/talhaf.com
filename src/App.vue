<script setup>
import AppNavbar from '@/components/AppNavbar.vue'
import AboutSection from '@/components/AboutSection.vue'
import HeroSection from '@/components/HeroSection.vue'
import GitHubHeatmap from '@/components/GitHubHeatmap.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import SkillsSection from '@/components/SkillsSection.vue'
import ContactSection from '@/components/ContactSection.vue'
</script>

<template>
  <AppNavbar />
  <HeroSection id="home" />
  <AboutSection />
  <SkillsSection />
  <GitHubHeatmap username="tfevan" />

  <ContactSection />
  <FooterComponent />
</template>
