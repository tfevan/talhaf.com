<script setup>
import { ref } from 'vue'
import IconGithub from '@/components/icons/IconGithub.vue'
import IconX from '@/components/icons/IconX.vue'
import IconStackOverflow from '@/components/icons/IconStackOverflow.vue'
import IconExternalLink from '@/components/icons/IconExternalLink.vue'

const currentYear = ref(new Date().getFullYear())

const socials = [
  {
    label: 'Old Portfolio',
    href: 'https://portfolio.talhaf.com/',
    icon: IconExternalLink,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/tfevan',
    icon: IconGithub,
  },
  {
    label: 'X',
    href: 'https://x.com/tfevan',
    icon: IconX,
  },
  {
    label: 'Stack Overflow',
    href: 'https://stackoverflow.com/users/4575350/sta',
    icon: IconStackOverflow,
  },
]
</script>

<template>
  <footer
    class="relative border-t border-black/6 dark:border-white/6 transition-colors duration-300"
  >
    <div
      class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-400/40 to-transparent dark:via-amber-400/30"
    />

    <div class="max-w-5xl mx-auto px-6 py-5">
      <div class="flex flex-col md:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <span
            class="font-black tracking-tighter text-xs text-zinc-900 dark:text-white select-none"
          >
            <span class="text-purple-600 dark:text-amber-400">TALHA</span>F<span
              class="text-rose-600"
              >.</span
            >
          </span>
          <div class="w-px h-3.5 bg-black/10 dark:bg-white/10" />
          <p class="text-xs text-zinc-600 dark:text-zinc-400 tracking-wide">
            © {{ currentYear }} All rights reserved.
          </p>
        </div>

        <div class="flex items-center gap-1">
          <a
            v-for="social in socials"
            :key="social.label"
            :href="social.href"
            target="_blank"
            :class="[
              'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200',
              'text-zinc-500 dark:text-zinc-400',
              'hover:text-zinc-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/8',
            ]"
          >
            <component :is="social.icon" v-if="social.icon" class="w-3.5 h-3.5 opacity-70" />
            {{ social.label }}
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
