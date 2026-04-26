<template>
  <div style="width: 100vw; height: 100vh">
    <TechStackBackground :star-count="180" :logo-scale="1">
      <section
        class="min-h-screen flex items-center justify-center transition-colors duration-300 pt-8"
      >
        <div class="flex flex-col items-center text-center px-6 max-w-2xl mx-auto gap-6">
          <!-- Avatar -->
          <!-- <div
            class="w-28 h-28 rounded-full bg-purple-300 dark:bg-purple-500 overflow-hidden flex items-center justify-center shadow-lg"
          >
            <img
              src="https://avataaars.io/?avatarStyle=Circle&topType=ShortHairTheCaesarSidePart&accessoriesType=Blank&hairColor=Black&facialHairType=BeardLight&facialHairColor=Brown&clotheType=Hoodie&clotheColor=Gray02&eyeType=EyeRoll&eyebrowType=Angry&mouthType=Serious&skinColor=Light"
              alt="avatar"
              class="w-full h-full object-cover"
            />
          </div> -->

          <!-- Heading -->
          <!-- <p class="text-3xl mt-8 text-gray-700 font-medium tracking-wide font-sans">Hi</p> -->

          <h1
            class="relative text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight mt-"
          >
            <!-- Ring layer -->
            <span
              class="absolute inset-0 text-transparent [-webkit-text-stroke:3px_rgba(168,85,247,0.5)] [text-shadow: 3px_3px_0_rgba(168,85,247,0.25), -3px_-3px_0_rgba(168,85,247,0.25), 3px_-3px_0_rgba(168,85,247,0.25), -3px_3px_0_rgba(168,85,247,0.25), 0_0_10px_rgba(168,85,247,0.45), 0_0_20px_rgba(168,85,247,0.25) ]"
            >
              I'm TALHA F.
              <span class="block">Full-stack Developer</span>
            </span>

            <!-- Fill layer -->
            <span class="relative text-zinc-900 dark:text-white">
              I'm TALHA F.
              <span class="block text-purple-600 dark:text-purple-400"> Full-stack Developer </span>
            </span>
          </h1>

          <!-- Subtext -->
          <p
            class="relative text-base sm:text-lg max-w-md leading-relaxed text-zinc-800 dark:text-zinc-300"
          >
            <!-- outline layer -->
            <span
              class="absolute inset-0 text-transparent pointer-events-none [-webkit-text-stroke:1px_rgba(168,85,247,0.25)] [text-shadow: 0_0_6px_rgba(168,85,247,0.10) ]"
              aria-hidden="true"
            >
              Self-driven developer, passionate about building Laravel and Vue.js solutions,
              constantly pushing to grow in tech.
            </span>

            <!-- main text -->
            <span class="relative">
              Self-driven developer, passionate about building Laravel and Vue.js solutions,
              constantly pushing to grow in tech.
            </span>
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
      </section>
    </TechStackBackground>
  </div>
</template>

<script setup>
import TechStackBackground from './TechStackBackground.vue'
</script>
