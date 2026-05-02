<script setup>
import AppNavbar from '@/components/AppNavbar.vue'
import AboutSection from '@/components/AboutSection.vue'
import HeroSection from '@/components/HeroSection.vue'
import GitHubHeatmap from '@/components/GitHubHeatmap.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import SkillsSection from '@/components/SkillsSection.vue'
import ContactSection from '@/components/ContactSection.vue'
import ProjectsSection from '@/components/ProjectsSection.vue'
import { useDark } from '@vueuse/core'

useDark({
  selector: 'html',
  attribute: 'class',
  valueDark: 'dark',
  valueLight: 'light',
  initialValue: 'dark',
})
</script>

<template>
  <AppNavbar />
  <HeroSection id="home" />
  <AboutSection />
  <SkillsSection />
  <GitHubHeatmap username="tfevan" />
  <ProjectsSection />
  <ContactSection />
  <FooterComponent />
</template>
