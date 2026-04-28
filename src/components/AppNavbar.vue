<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useDark, useToggle, onClickOutside } from '@vueuse/core'
import TooltipText from '@/components/TooltipText.vue'

/* global window, document, IntersectionObserver */

const isDark = useDark()
const toggleDark = useToggle(isDark)
const isMenuOpen = ref(false)
const mobileMenuRef = ref(null)
onClickOutside(mobileMenuRef, () => {
  isMenuOpen.value = false
})

const activeSection = ref('home')

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

let observer = null

onMounted(() => {
  const sections = navItems.map(({ href }) => document.querySelector(href)).filter(Boolean)

  observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

      if (visible.length) {
        activeSection.value = visible[0].target.id
      }
    },
    {
      rootMargin: '-10% 0px -60% 0px',
      threshold: [0, 0.1, 0.2, 0.5, 1],
    },
  )

  sections.forEach((el) => observer.observe(el))
})

onUnmounted(() => observer?.disconnect())

const scrolled = ref(false)
const handleScroll = () => {
  scrolled.value = window.scrollY > 20
}
onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))

const handleNavClick = (e, href) => {
  e.preventDefault()
  isMenuOpen.value = false
  const target = document.querySelector(href)
  if (target) target.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <header class="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-5 pointer-events-none">
    <!-- mobileMenuRef -->
    <div ref="mobileMenuRef" class="pointer-events-auto relative w-full flex flex-col items-center">
      <!-- Pill Nav -->
      <nav
        :class="[
          'relative flex items-center gap-0 rounded-2xl px-5 transition-all duration-500',
          scrolled
            ? isDark
              ? 'bg-zinc-900/90 shadow-2xl shadow-black/40 backdrop-blur-xl border border-white/8'
              : 'bg-white/85 shadow-2xl shadow-black/12 backdrop-blur-xl border border-black/8'
            : isDark
              ? 'bg-zinc-900/70 shadow-xl shadow-black/30 backdrop-blur-md border border-white/6'
              : 'bg-white/70 shadow-xl shadow-black/8 backdrop-blur-md border border-black/6',
        ]"
        style="height: 56px"
      >
        <!-- LEFT: Logo -->
        <div class="flex items-center pr-4 md:pr-6">
          <a
            href="#home"
            :class="[
              'font-black tracking-tighter text-xl select-none transition-colors duration-300',
              isDark ? 'text-white' : 'text-zinc-900',
            ]"
            @click="(e) => handleNavClick(e, '#home')"
          >
            <span class="dark:text-amber-400 text-purple-600">TALHA</span>F<span
              class="text-rose-600"
              >.</span
            >
          </a>
        </div>

        <div :class="['hidden md:block w-px h-5 mx-1', isDark ? 'bg-white/15' : 'bg-black/12']" />

        <!-- CENTER: Nav Items (Desktop only) -->
        <ul class="hidden md:flex items-center px-4 gap-1">
          <li v-for="item in navItems" :key="item.label">
            <a
              :href="item.href"
              :class="[
                'relative px-3.5 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 group',
                activeSection === item.href.slice(1)
                  ? 'bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent'
                  : isDark
                    ? 'text-zinc-400 hover:text-white'
                    : 'text-zinc-500 hover:text-zinc-900',
              ]"
              style="font-family: 'DM Sans', sans-serif; letter-spacing: -0.01em"
              @click="(e) => handleNavClick(e, item.href)"
            >
              <!-- Active Label -->
              <span
                :class="[
                  'relative z-10',
                  activeSection === item.href.slice(1)
                    ? isDark
                      ? 'bg-gradient-to-r from-amber-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent'
                      : 'bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent'
                    : '',
                ]"
                >{{ item.label }}</span
              >

              <!-- Active indicator bg -->
              <span
                v-if="activeSection === item.href.slice(1)"
                :class="[
                  'absolute inset-0 rounded-lg',
                  isDark
                    ? 'bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-yellow-500/20 border border-amber-500/20'
                    : 'bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/15',
                ]"
              />

              <!-- Hover bg (only when not active) -->
              <span
                v-else
                :class="[
                  'absolute inset-0 rounded-lg scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-200',
                  isDark ? 'bg-white/8' : 'bg-black/5',
                ]"
              />
            </a>
          </li>
        </ul>

        <div :class="['hidden md:block w-px h-5 mx-1', isDark ? 'bg-white/15' : 'bg-black/12']" />

        <!-- RIGHT: Social Icons + Divider + Dark Toggle + Hamburger -->
        <div class="flex items-center pl-0 gap-1 md:gap-1.5 ml-1">
          <!-- GitHub -->
          <TooltipText text="GitHub">
            <a
              href="https://github.com/tfevan"
              target="_BLANK"
              :class="[
                'w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-lg transition-all duration-200 hover:scale-110',
                isDark
                  ? 'text-zinc-400 hover:text-white hover:bg-white/10'
                  : 'text-zinc-500 hover:text-zinc-900 hover:bg-black/6',
              ]"
              aria-label="GitHub"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"
                />
              </svg>
            </a>
          </TooltipText>

          <!-- X -->
          <TooltipText text="X">
            <a
              href="https://x.com/tfevan"
              target="_BLANK"
              :class="[
                'w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-lg transition-all duration-200 hover:scale-110',
                isDark
                  ? 'text-zinc-400 hover:text-white hover:bg-white/10'
                  : 'text-zinc-500 hover:text-zinc-900 hover:bg-black/6',
              ]"
              aria-label="X"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                />
              </svg>
            </a>
          </TooltipText>

          <!-- Stack Overflow -->
          <TooltipText text="Stack Overflow">
            <a
              href="https://stackoverflow.com/users/4575350/sta"
              target="_BLANK"
              :class="[
                'w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-lg transition-all duration-200 hover:scale-110',
                isDark
                  ? 'text-zinc-400 hover:text-white hover:bg-white/10'
                  : 'text-zinc-500 hover:text-zinc-900 hover:bg-black/6',
              ]"
              aria-label="Dribbble"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.2em"
                height="1.2em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M17.36 20.2v-5.38h1.79V22H3v-7.18h1.8v5.38zM6.77 14.32l.37-1.76l8.79 1.85l-.37 1.76zm1.16-4.21l.76-1.61l8.14 3.78l-.76 1.62zm2.26-3.99l1.15-1.38l6.9 5.76l-1.15 1.37zm4.45-4.25L20 9.08l-1.44 1.07l-5.36-7.21zM6.59 18.41v-1.8h8.98v1.8z"
                />
              </svg>
            </a>
          </TooltipText>

          <!-- Divider -->
          <div :class="['w-px h-5 mx-0.5 md:mx-1', isDark ? 'bg-white/15' : 'bg-black/12']" />

          <!-- Dark / Light Toggle -->
          <button
            :class="[
              'w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-lg transition-all duration-200 hover:scale-110 cursor-pointer',
              isDark ? 'text-amber-400 hover:bg-white/10' : 'text-purple-500 hover:bg-black/6',
            ]"
            :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
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

          <!-- Hamburger (mobile only) -->
          <button
            :class="[
              'md:hidden w-8 h-8 flex flex-col items-center justify-center gap-[5px] rounded-lg ml-0.5 transition-all duration-200 cursor-pointer',
              isDark ? 'text-zinc-400 hover:bg-white/10' : 'text-zinc-600 hover:bg-black/6',
            ]"
            aria-label="Toggle menu"
            @click="isMenuOpen = !isMenuOpen"
          >
            <span
              :class="[
                'block h-[1.5px] rounded-full transition-all duration-300 origin-center',
                isDark ? 'bg-zinc-300' : 'bg-zinc-700',
                isMenuOpen ? 'w-[17px] rotate-45 translate-y-[6.5px]' : 'w-[17px]',
              ]"
            />
            <span
              :class="[
                'block h-[1.5px] rounded-full transition-all duration-300',
                isDark ? 'bg-zinc-300' : 'bg-zinc-700',
                isMenuOpen ? 'w-0 opacity-0' : 'w-[17px]',
              ]"
            />
            <span
              :class="[
                'block h-[1.5px] rounded-full transition-all duration-300 origin-center',
                isDark ? 'bg-zinc-300' : 'bg-zinc-700',
                isMenuOpen ? 'w-[17px] -rotate-45 -translate-y-[6.5px]' : 'w-[17px]',
              ]"
            />
          </button>
        </div>
      </nav>

      <!-- Mobile Dropdown Menu -->
      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 -translate-y-2 scale-[0.97]"
        enter-to-class="opacity-100 translate-y-0 scale-100"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0 scale-100"
        leave-to-class="opacity-0 -translate-y-2 scale-[0.97]"
      >
        <div
          v-if="isMenuOpen"
          :class="[
            'md:hidden w-full mt-2 rounded-2xl overflow-hidden border',
            isDark
              ? 'bg-zinc-900/95 backdrop-blur-xl border-white/10 shadow-2xl shadow-black/40'
              : 'bg-white/95 backdrop-blur-xl border-black/8 shadow-2xl shadow-black/12',
          ]"
        >
          <ul class="py-2">
            <li v-for="item in navItems" :key="item.label">
              <a
                :href="item.href"
                :class="[
                  'flex items-center gap-3 px-5 py-3 text-sm font-medium transition-colors duration-150',
                  isDark
                    ? 'text-zinc-300 hover:text-white hover:bg-white/6'
                    : 'text-zinc-600 hover:text-zinc-900 hover:bg-black/4',
                ]"
                style="font-family: 'DM Sans', sans-serif"
                @click="isMenuOpen = false"
              >
                <span
                  :class="[
                    'w-1.5 h-1.5 rounded-full flex-shrink-0',
                    isDark ? 'bg-amber-400' : 'bg-indigo-500',
                  ]"
                />
                {{ item.label }}
              </a>
            </li>
          </ul>
        </div>
      </Transition>
    </div>
    <!-- /mobileMenuRef -->
  </header>
</template>
