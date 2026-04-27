<script setup>
import TechStackBackground from '@/components/TechStackBackground.vue'
</script>

<template>
  <section
    class="relative min-h-screen flex items-center justify-center transition-colors duration-300 pt-8 overflow-hidden"
  >
    <!-- Tech Logo Background -->
    <TechStackBackground :star-count="400" :logo-scale="1">
      <!-- Main Content -->
      <div
        class="relative z-10 flex flex-col items-center text-center px-6 max-w-2xl mx-auto gap-6"
      >
        <!-- Avatar -->
        <div
          class="w-28 h-28 rounded-full bg-purple-300 dark:bg-purple-500 overflow-hidden flex items-center justify-center shadow-lg"
        >
          <img
            src="https://avataaars.io/?avatarStyle=Circle&topType=ShortHairTheCaesarSidePart&accessoriesType=Blank&hairColor=Black&facialHairType=BeardLight&facialHairColor=Brown&clotheType=Hoodie&clotheColor=Gray02&eyeType=EyeRoll&eyebrowType=Angry&mouthType=Serious&skinColor=Light"
            alt="avatar"
            class="w-full h-full object-cover"
          />
        </div>

        <!-- Heading -->
        <h1
          class="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-zinc-900 dark:text-white leading-tight text-outlined"
        >
          Hi, I'm Talha F.
          <span class="block text-purple-600 dark:text-purple-400">Full-stack Developer</span>
        </h1>

        <!-- Subtext -->
        <p
          class="text-outlined text-base sm:text-xl text-zinc-900 dark:text-zinc-400 leading-relaxed"
        >
          Self-driven developer, passionate about building Laravel and Vue.js solutions, constantly
          pushing to grow in tech.
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-wrap items-center justify-center gap-4 mt-2">
          <a
            href="#contact"
            class="px-6 py-3 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-semibold text-sm hover:opacity-80 transition-opacity duration-200"
          >
            Lets Connect
          </a>
        </div>
      </div>
    </TechStackBackground>
  </section>
</template>
