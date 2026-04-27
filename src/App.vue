<script setup>
import AppNavbar from '@/components/AppNavbar.vue'
import HeroSection from '@/components/HeroSection.vue'
import TechStackBackground from '@/components/TechStackBackground.vue'
</script>

<template>
  <!-- <TechStackBackground :star-count="400" :logo-scale="1"> -->
  <AppNavbar />
  <HeroSection />
  <!-- </TechStackBackground> -->
  <!-- <router-view /> -->
</template>

<style>
html,
body,
#app {
  height: 100%;
  min-height: 100vh;
}
</style>
