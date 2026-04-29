<script setup>
import { ref } from 'vue'

const currentYear = new Date().getFullYear()

const links = [
  {
    label: 'Old Portfolio',
    href: 'https://portfolio.talhaf.com',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="currentColor" d="M14 3v2h3.59l-9.83 9.83l1.41 1.41L19 6.41V10h2V3m-2 16H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7h-2z"/></svg>`,
  },
  {
    label: 'Github',
    href: 'https://github.com/tfevan',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>`,
  },
  {
    label: 'X',
    href: 'https://x.com/tfevan',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
  },
  {
    label: 'Stack Overflow',
    href: 'https://stackoverflow.com/users/4575350/sta',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="currentColor" d="M17.36 20.2v-5.38h1.79V22H3v-7.18h1.8v5.38zM6.77 14.32l.37-1.76l8.79 1.85l-.37 1.76zm1.16-4.21l.76-1.61l8.14 3.78l-.76 1.62zm2.26-3.99l1.15-1.38l6.9 5.76l-1.15 1.37zm4.45-4.25L20 9.08l-1.44 1.07l-5.36-7.21zM6.59 18.41v-1.8h8.98v1.8z"/></svg>`,
  },
]

const hoveredIndex = ref(null)
</script>

<template>
  <footer class="relative w-full overflow-hidden">
    <!-- Subtle top border with gradient -->
    <div
      class="h-px w-full bg-gradient-to-r from-transparent via-slate-300 to-transparent dark:via-slate-600"
    ></div>

    <!-- Background layer -->
    <div class="bg-white/80 dark:bg-slate-900/95 backdrop-blur-sm relative">
      <div class="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 py-6 sm:py-7">
        <div
          class="flex flex-col items-center gap-5 sm:flex-row sm:items-center sm:justify-between"
        >
          <!-- Copyright -->
          <div class="flex items-center gap-2 transition-all duration-700">
            <span
              class="text-xs tracking-widest uppercase font-medium text-slate-500 dark:text-slate-300 select-none"
              >©</span
            >
            <p class="text-sm font-light tracking-wide text-slate-500 dark:text-slate-400">
              <span class="text-slate-700 dark:text-slate-200 font-semibold mr-2"
                >{{ currentYear }} Talha F.</span
              >
              <span class="text-slate-600 dark:text-slate-300 text-xs">All rights reserved.</span>
            </p>
          </div>

          <!-- Links -->
          <nav>
            <ul class="flex flex-wrap gap-x-1 gap-y-2">
              <li
                v-for="(link, index) in links"
                :key="link.label"
                class="transition-all duration-500"
              >
                <a
                  :href="link.href"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="group relative flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium tracking-wide transition-all duration-200"
                  :class="[
                    hoveredIndex === index
                      ? 'text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800',
                  ]"
                  @mouseenter="hoveredIndex = index"
                  @mouseleave="hoveredIndex = null"
                >
                  <!-- Icon -->
                  <span
                    class="flex-shrink-0 transition-transform duration-200"
                    :class="hoveredIndex === index ? 'scale-110' : ''"
                    v-html="link.icon"
                  ></span>

                  <!-- Label -->
                  <span>{{ link.label }}</span>

                  <!-- Arrow icon -->
                  <svg
                    class="flex-shrink-0 transition-all duration-200"
                    :class="
                      hoveredIndex === index
                        ? 'translate-x-0.5 -translate-y-0.5 opacity-100'
                        : 'opacity-50'
                    "
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M7 7h10v10" />
                    <path d="M7 17 17 7" />
                  </svg>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </footer>
</template>
