<script setup>
import { useDark } from '@vueuse/core'
import AppNavbar from '@/components/AppNavbar.vue'
import HeroSection from '@/components/HeroSection.vue'
import StarfieldBackground from '@/components/StarfieldBackground.vue'
import GitHubHeatmap from '@/components/GitHubHeatmap.vue'
import SkillsExpertise from '@/components/SkillsExpertise.vue'

const isDark = useDark()
</script>

<template>
  <StarfieldBackground :star-count="80" :is-dark="isDark">
    <AppNavbar />
    <HeroSection />
    <GitHubHeatmap username="tfevan" />
    <SkillsExpertise />
  </StarfieldBackground>
</template>

<style>
html,
body,
#app {
  height: 100%;
  min-height: 100vh;
}
</style>
