<script setup>
import { ref, useTemplateRef } from 'vue'
import { RouterLink } from 'vue-router'
import { useDark, useToggle, onClickOutside } from '@vueuse/core'

const menuOpen = ref(false)
const isDark = useDark()
const toggleDark = useToggle(isDark)

const navRef = useTemplateRef('navRef')
onClickOutside(navRef, () => {
  menuOpen.value = false
})

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Overview', to: '/about' },
  { label: 'Skills', to: '/about' },
  { label: 'Projects', to: '/about' },
  { label: 'Contact', to: '/about' },
]

const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/tfevan',
    icon: 'M12 0C5.373 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.929.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z',
  },
  {
    label: 'X',
    href: 'https://x.com/tfevan',
    icon: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  },
  {
    label: 'Stack Overflow',
    href: 'https://stackoverflow.com/users/4575350/sta',
    icon: 'M15.725 19.748v-5.163h1.722v6.885H2.077v-6.885H3.8v5.163h11.925zM6.295 16.4l.37-1.686 8.44 1.854-.37 1.686-8.44-1.854zm1.14-4.163.826-1.447 7.42 4.247-.826 1.447-7.42-4.247zm2.35-3.697 1.19-1.108 5.569 5.99-1.19 1.108-5.57-5.99zm3.373-3.142 1.478-.678 3.467 7.566-1.478.678-3.467-7.566zM6.17 19.748v-1.722h8.44v1.722H6.17z',
  },
]
</script>

<template>
  <nav ref="navRef" class="fixed top-2 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-1rem)] md:w-fit">
    <div
      class="bg-white/10 dark:bg-amber-950/20 backdrop-blur-[1px] border border-amber-200/50 dark:border-amber-500/20 rounded-3xl px-6 h-16 flex items-center justify-between shadow-[0_-4px_24px_0_rgba(180,140,0,0.1),0_4px_24px_0_rgba(180,140,0,0.1)] w-full md:w-fit gap-4"
    >
      <!-- Left: Logo -->
      <RouterLink
        to="/"
        active-class=""
        exact-active-class=""
        class="text-amber-900 dark:text-amber-400 text-xl font-bold tracking-tight shrink-0 w-fit !bg-transparent hover:!bg-transparent"
      >
        TALHA<span class="text-amber-600 dark:text-amber-500">F</span
        ><span class="text-amber-500">.</span>
      </RouterLink>

      <!-- Center: Nav Links -->
      <ul class="hidden md:flex items-center gap-1 justify-center flex-1 px-4">
        <li v-for="link in navLinks" :key="link.label">
          <RouterLink
            :to="link.to"
            class="group relative text-base px-4 pt-2 pb-2.5 rounded-full transition-all duration-300 whitespace-nowrap"
            :class="
              link.label === 'Contact'
                ? 'text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 font-medium'
                : $route.path === link.to
                  ? 'text-amber-900 dark:text-white bg-amber-100 dark:bg-amber-500/20 shadow-sm ring-1 ring-amber-200 dark:ring-amber-500/40'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-amber-900 dark:hover:text-amber-200 hover:bg-amber-50 dark:hover:bg-amber-500/10'
            "
            active-class=""
          >
            {{ link.label }}
          </RouterLink>
        </li>
      </ul>

      <!-- Right: Social Links + Dark Mode -->
      <div class="flex items-center gap-3">
        <!-- Social Icons — desktop -->
        <a
          v-for="s in socialLinks"
          :key="s.label"
          :href="s.href"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="s.label"
          class="hidden md:block text-amber-800 dark:text-amber-500/80 hover:text-amber-600 dark:hover:text-amber-300 transition-colors p-2.5 rounded-full hover:bg-amber-100 dark:hover:bg-amber-900/50 shadow-inner shadow-amber-200/50 dark:shadow-amber-900/30 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path :d="s.icon" />
          </svg>
        </a>

        <!-- Divider — শুধু desktop এ -->
        <span class="hidden md:block w-px h-4 bg-amber-900/20 dark:bg-amber-500/20"></span>

        <!-- Dark Mode Toggle — সব জায়গায় -->
        <button
          class="text-amber-800 dark:text-amber-500/80 hover:text-amber-600 dark:hover:text-amber-300 transition-colors p-2.5 rounded-full hover:bg-amber-100 dark:hover:bg-amber-900/50 shadow-inner shadow-amber-200/50 dark:shadow-amber-900/30 cursor-pointer"
          aria-label="Toggle dark mode"
          @click="toggleDark()"
        >
          <svg
            v-if="isDark"
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        </button>

        <!-- Mobile Hamburger -->
        <button
          class="cursor-pointer md:hidden text-amber-700 dark:text-amber-500 hover:text-amber-900 dark:hover:text-amber-300 transition-colors p-1.5 rounded-full hover:bg-amber-100 dark:hover:bg-amber-500/10"
          aria-label="Toggle menu"
          @click="toggleMenu"
        >
          <svg
            v-if="!menuOpen"
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="menuOpen"
        class="md:hidden mt-2 w-full bg-white/90 dark:bg-amber-950/90 backdrop-blur-xl border border-amber-200/50 dark:border-amber-500/20 rounded-2xl px-4 py-3 shadow-2xl"
      >
        <ul class="flex flex-col gap-1">
          <li v-for="link in navLinks" :key="link.label">
            <RouterLink
              :to="link.to"
              class="block text-base px-4 py-2 rounded-full transition-colors duration-200"
              :class="
                link.label === 'Resume' || link.label === 'Contact'
                  ? 'text-amber-600 dark:text-amber-400 font-semibold'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-amber-900 dark:hover:text-amber-200'
              "
              active-class="!text-amber-900 dark:!text-white !bg-amber-100 dark:!bg-amber-500/20"
              @click="menuOpen = false"
            >
              {{ link.label }}
            </RouterLink>
          </li>
        </ul>

        <!-- Social Icons — mobile -->
        <div
          class="flex items-center justify-center gap-2 px-4 pt-3 mt-2 border-t border-amber-200/30 dark:border-amber-500/20"
        >
          <a
            v-for="s in socialLinks"
            :key="s.label"
            :href="s.href"
            target="_blank"
            rel="noopener noreferrer"
            class="text-amber-700 dark:text-amber-500/80 hover:text-amber-500 transition-colors p-2.5 rounded-full hover:bg-amber-100 dark:hover:bg-amber-500/10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path :d="s.icon" />
            </svg>
          </a>
        </div>
      </div>
    </Transition>
  </nav>
</template>
