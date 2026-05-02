<template>
  <section id="about" class="px-5 pt-12 md:px-10 md:pt-16 lg:px-32 xl:px-48">
    <div class="mt-8">
      <!-- Header -->
      <div class="text-center mt-8 mb-10">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-slate-100 mb-2">About</h2>
        <div class="w-10 h-0.5 bg-gray-400 mx-auto rounded-full" />
        <p class="mt-3 text-sm text-gray-500 dark:text-gray-400">
          Turning ideas into elegant digital solutions through clean code.
        </p>
      </div>

      <!-- Main Content -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        <!-- Left Side - Code Block -->
        <div class="lg:col-span-5 flex justify-center lg:justify-start">
          <div class="w-full max-w-[420px]">
            <div
              class="bg-zinc-950 dark:bg-black border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl"
            >
              <div class="bg-zinc-900 px-5 py-3 flex items-center gap-2 border-b border-zinc-800">
                <div class="flex gap-1.5">
                  <div class="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <p class="text-zinc-400 text-xs ml-3 font-medium">talha.js</p>
              </div>

              <!-- Code Content -->
              <div class="p-6 font-mono text-sm leading-relaxed text-zinc-300">
                <pre class="whitespace-pre-wrap">
<span class="text-blue-400">const</span> talha = &#123;
  name: <span class="text-emerald-400">"Talha Faisal"</span>,
  role: <span class="text-emerald-400">"Full-Stack Developer"</span>,
  experience: <span class="text-amber-400">"8+ years"</span>,
  started: <span class="text-amber-400">"2018"</span>,
  education: <span class="text-amber-400">"Electrical Engineering"</span>,
  specialization: [
    <span class="text-sky-400">"Laravel"</span>,
    <span class="text-sky-400">"Vue.js"</span>,
    <span class="text-sky-400">"Backend Systems"</span>
  ],
  passion: <span class="text-emerald-400">"Writing clean, secure &amp; performant code"</span>,
  motto: <span class="text-violet-400">"Coding is not just my job, it's my hobby"</span>
&#125;;
                </pre>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Side - Content -->
        <div class="lg:col-span-7 space-y-6 text-sm leading-relaxed">
          <p class="text-zinc-800 dark:text-zinc-300">
            I am
            <span class="font-semibold text-violet-700 dark:text-violet-400">Talha Faisal</span>, a
            passionate <span class="font-semibold">Full-Stack Developer</span> with a strong love
            for clean, efficient, and secure code.
          </p>

          <p class="text-zinc-700 dark:text-zinc-400">
            My journey into programming began at a very young age. Even though I graduated with a
            degree in Electrical Engineering, my true passion has always been coding. In 2019, I
            decided to turn my passion into a profession and started working as a professional
            developer.
          </p>

          <p class="text-zinc-700 dark:text-zinc-400">
            Over the years, I have worked with various programming languages including
            <span class="font-medium">PHP, JavaScript, Python, Ruby, Rust,</span> and
            <span class="font-medium">Golang</span>. Currently, I specialize in
            <span class="font-bold text-[#FF291A]">Laravel</span> and
            <span class="font-bold text-emerald-600 dark:text-emerald-400">Vue.js</span>, crafting
            robust backend systems and dynamic frontend experiences.
          </p>

          <p class="text-zinc-700 dark:text-zinc-400">
            For me, coding is not just a career, it's a deeply fulfilling hobby. I genuinely enjoy
            solving complex problems and continuously improving my craft. In my free time, I
            actively contribute to
            <a
              href="https://stackoverflow.com/users/4575350/sta"
              target="_blank"
              rel="noopener noreferrer"
              class="font-medium underline underline-offset-4 text-gray-700 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300"
            >
              Stack Overflow </a
            >, which has significantly helped me sharpen my skills and stay updated with best
            practices.
          </p>

          <p class="text-zinc-800 dark:text-zinc-300">
            I am particularly focused on writing high-quality code with strong emphasis on clean
            architecture, security, performance optimization, and maintainability.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
