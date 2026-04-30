<template>
  <section id="about" class="px-5 pt-12 md:px-10 md:pt-16 lg:px-32 xl:px-48">
    <div class="mt-8 skills-section">
      <!-- Header -->
      <div class="text-center mt-8 mb-10">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-slate-100 mb-2">About</h2>
        <div class="w-10 h-0.5 bg-gray-400 mx-auto rounded-full" />
        <p class="mt-3 text-sm text-gray-500 dark:text-gray-400">
          Crafting digital experiences where code meets creativity.
        </p>
      </div>

      <!-- Premium Glassmorphism Card with Top Shadow -->
      <div class="max-w-3xl mx-auto px-4">
        <div
          class="relative p-9 md:p-12 rounded-3xl bg-white/75 dark:bg-slate-900/75 backdrop-blur-3xl border border-white/70 dark:border-white/10 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.25)] dark:shadow-[0_30px_80px_-15px_rgba(0,0,0,0.55)] overflow-hidden"
        >
          <!-- Glass Effect Layers -->
          <div
            class="absolute inset-0 bg-gradient-to-br from-indigo-100/30 via-transparent to-purple-100/20 dark:from-indigo-500/10 dark:via-transparent dark:to-purple-500/10 rounded-3xl pointer-events-none"
          />

          <div
            class="absolute inset-0 bg-[radial-gradient(at_35%_20%,rgba(255,255,255,0.22)_0%,transparent_60%)] dark:bg-[radial-gradient(at_35%_20%,rgba(255,255,255,0.08)_0%,transparent_70%)] pointer-events-none"
          />

          <!-- Content -->
          <div
            class="relative pt-1 space-y-6 text-[17.2px] leading-relaxed text-gray-700 dark:text-gray-100"
          >
            <p>
              I am <span class="font-bold text-indigo-600 dark:text-indigo-400">Talha Faisal</span>,
              a passionate <span class="font-bold">Full-Stack Developer</span> with a strong love
              for clean, efficient, and secure code.
            </p>

            <p>
              My journey into programming began at a very young age. Even though I graduated with a
              degree in Electrical Engineering, my true passion has always been coding. In 2019, I
              decided to turn my passion into a profession and started working as a professional
              developer.
            </p>

            <p>
              Over the years, I have worked with various programming languages including
              <span class="font-bold">PHP</span>, <span class="font-bold">JavaScript</span>,
              <span class="font-bold">Python</span>, <span class="font-bold">Ruby</span>,
              <span class="font-bold">Rust</span>, and <span class="font-bold">Golang</span>.
              Currently, I specialize in
              <span class="font-bold text-violet-600 dark:text-violet-400">Laravel</span> and
              <span class="font-bold text-emerald-600 dark:text-emerald-400">Vue.js</span>, crafting
              robust backend systems and dynamic frontend experiences.
            </p>

            <p>
              For me, coding is not just a career, it's a deeply fulfilling hobby. I genuinely enjoy
              solving complex problems and continuously improving my craft. In my free time, I
              actively contribute to <span class="font-bold">Stack Overflow</span>, which has
              significantly helped me sharpen my skills and stay updated with best practices.
            </p>

            <p class="pb-1">
              I am particularly focused on writing high-quality code with strong emphasis on clean
              architecture, security, performance optimization, and maintainability.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
