<script setup>
import { ref } from 'vue'

const currentYear = ref(new Date().getFullYear())
</script>

<template>
  <footer
    class="bg-gray-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 py-4 transition-colors"
  >
    <div class="max-w-7xl mx-auto px-12">
      <div class="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0">
        <!-- Copyright -->
        <div class="flex items-center gap-2 transition-all duration-700">
          <span class="text-gray-500 text-sm leading-none">©</span>
          <p class="text-sm font-light tracking-wide text-slate-500 dark:text-slate-400">
            <span class="text-slate-700 dark:text-slate-200 font-semibold mr-2">2026 Talha F.</span
            ><span class="text-slate-600 dark:text-slate-300 text-xs">All rights reserved.</span>
          </p>
        </div>

        <!-- Social Links -->
        <div class="flex items-center gap-3 text-xs font-medium text-zinc-600 dark:text-zinc-400">
          <a
            href="https://portfolio.talhaf.com/"
            target="_blank"
            class="hover:text-zinc-900 dark:hover:text-white transition-colors duration-200 underline decoration-[0.5px] underline-offset-[6px]"
          >
            Old Portfolio
          </a>

          <a
            href="https://github.com/tfevan"
            target="_blank"
            class="hover:text-zinc-900 dark:hover:text-white transition-colors duration-200 underline decoration-[0.5px] underline-offset-[6px]"
          >
            Github
          </a>
          <a
            href="https://x.com/tfevan"
            target="_blank"
            class="hover:text-zinc-900 dark:hover:text-white transition-colors duration-200 underline decoration-[0.5px] underline-offset-[6px]"
          >
            X
          </a>
          <a
            href="https://stackoverflow.com/users/4575350/sta"
            target="_blank"
            class="hover:text-zinc-900 dark:hover:text-white transition-colors duration-200 underline decoration-[0.5px] underline-offset-[6px]"
          >
            Stack Overflow
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
