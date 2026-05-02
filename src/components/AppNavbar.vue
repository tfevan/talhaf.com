<script setup>
/* global window, document, IntersectionObserver */
import { ref, onMounted, onUnmounted } from 'vue'
import { useDark, useToggle, onClickOutside } from '@vueuse/core'
import TooltipText from '@/components/TooltipText.vue'
import IconGithub from '@/components/icons/IconGithub.vue'
import IconX from '@/components/icons/IconX.vue'
import IconStackOverflow from '@/components/icons/IconStackOverflow.vue'
import IconSun from '@/components/icons/IconSun.vue'
import IconMoon from '@/components/icons/IconMoon.vue'
import IconChevronRight from '@/components/icons/IconChevronRight.vue'
import IconHome from '@/components/icons/IconHome.vue'
import IconUser from '@/components/icons/IconUser.vue'
import IconZap from '@/components/icons/IconZap.vue'
import IconFolder from '@/components/icons/IconFolder.vue'
import IconMail from '@/components/icons/IconMail.vue'

const isDark = useDark()
const toggleDark = useToggle(isDark)
const isMenuOpen = ref(false)
const mobileMenuRef = ref(null)
onClickOutside(mobileMenuRef, () => {
  isMenuOpen.value = false
})

const activeSection = ref('home')

const navItems = [
  { label: 'Home', href: '#home', icon: IconHome },
  { label: 'About', href: '#about', icon: IconUser },
  { label: 'Skills', href: '#skills', icon: IconZap },
  { label: 'Projects', href: '#projects', icon: IconFolder },
  { label: 'Contact', href: '#contact', icon: IconMail },
]

let observer = null

onMounted(() => {
  const sections = navItems.map(({ href }) => document.querySelector(href)).filter(Boolean)

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeSection.value = entry.target.id
        }
      })
    },
    {
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0,
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
    <div
      ref="mobileMenuRef"
      class="pointer-events-auto relative w-full md:w-auto flex flex-col items-center"
    >
      <nav
        :class="[
          'relative flex items-center gap-0 rounded-2xl px-5 transition-all duration-500 w-full',
          'border border-transparent [background-clip:padding-box]',
          'ring-1 ring-purple-400/30 dark:ring-amber-400/30',
          scrolled
            ? 'bg-white/85 shadow-2xl shadow-black/12 backdrop-blur-xl dark:bg-zinc-900/90 dark:shadow-black/40'
            : 'bg-white/70 shadow-xl shadow-black/8 backdrop-blur-md dark:bg-zinc-900/70 dark:shadow-black/30',
        ]"
        style="height: 56px"
      >
        <!-- Logo -->
        <div class="flex items-center pr-4 md:pr-6">
          <a
            href="#home"
            :class="[
              'font-black tracking-tighter text-xl select-none transition-colors duration-300',
              'text-zinc-900 dark:text-white',
            ]"
            @click="(e) => handleNavClick(e, '#home')"
          >
            <span class="dark:text-amber-400 text-purple-600">TALHA</span>F<span
              class="text-rose-600"
              >.</span
            >
          </a>
        </div>

        <div :class="['hidden md:block w-px h-5 mx-1', 'bg-black/12 dark:bg-white/15']" />

        <!-- Center - Nav Items (Desktop only) -->
        <ul class="hidden md:flex items-center px-4 gap-1">
          <li v-for="item in navItems" :key="item.label">
            <a
              :href="item.href"
              :class="[
                'relative px-3.5 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 group font-medium!',
                activeSection === item.href.slice(1)
                  ? 'bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent'
                  : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white',
              ]"
              style="font-family: 'DM Sans', sans-serif; letter-spacing: -0.01em"
              @click="(e) => handleNavClick(e, item.href)"
            >
              <!-- Active Label -->
              <span
                :class="[
                  'relative z-10',
                  activeSection === item.href.slice(1)
                    ? 'bg-gradient-to-r from-purple-500 to-pink-600 dark:from-amber-300 dark:via-orange-400 dark:to-yellow-300 bg-clip-text text-transparent'
                    : '',
                ]"
                >{{ item.label }}</span
              >

              <!-- Active indicator bg -->
              <span
                v-if="activeSection === item.href.slice(1)"
                :class="[
                  'absolute inset-0 rounded-lg',
                  'bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/15',
                  'dark:from-amber-500/20 dark:via-orange-500/20 dark:to-yellow-500/20 dark:border-amber-500/20',
                ]"
              />

              <!-- Hover bg (only when not active) -->
              <span
                v-else
                :class="[
                  'absolute inset-0 rounded-lg scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-200',
                  'bg-black/5 dark:bg-white/8',
                ]"
              />
            </a>
          </li>
        </ul>

        <div :class="['hidden md:block w-px h-5 mx-1', 'bg-black/12 dark:bg-white/15']" />

        <!-- Right - Social Icons + Divider + Dark Toggle + Hamburger -->
        <div class="flex items-center pl-0 gap-1 md:gap-1.5 ml-auto">
          <TooltipText text="GitHub">
            <a
              href="https://github.com/tfevan"
              target="_BLANK"
              :class="[
                'hidden md:flex w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-lg transition-all duration-200 hover:scale-110',
                'text-zinc-500 hover:text-zinc-900 hover:bg-black/6 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-white/10',
              ]"
              aria-label="GitHub"
            >
              <IconGithub />
            </a>
          </TooltipText>

          <TooltipText text="X">
            <a
              href="https://x.com/tfevan"
              target="_BLANK"
              :class="[
                'hidden md:flex w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-lg transition-all duration-200 hover:scale-110',
                'text-zinc-500 hover:text-zinc-900 hover:bg-black/6 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-white/10',
              ]"
              aria-label="X"
            >
              <IconX />
            </a>
          </TooltipText>

          <TooltipText text="Stack Overflow">
            <a
              href="https://stackoverflow.com/users/4575350/sta"
              target="_BLANK"
              :class="[
                'hidden md:flex w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-lg transition-all duration-200 hover:scale-110',
                'text-zinc-500 hover:text-zinc-900 hover:bg-black/6 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-white/10',
              ]"
              aria-label="Stack Overflow"
            >
              <IconStackOverflow />
            </a>
          </TooltipText>

          <div
            :class="['hidden md:block w-px h-5 mx-0.5 md:mx-1', 'bg-black/12 dark:bg-white/15']"
          />

          <!-- Dark / Light Toggle -->
          <button
            :class="[
              'w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-lg transition-all duration-200 hover:scale-110 cursor-pointer',
              'text-purple-500 hover:bg-black/6 dark:text-amber-400 dark:hover:bg-white/10',
            ]"
            :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
            @click="toggleDark()"
          >
            <IconSun v-if="isDark" />
            <IconMoon v-else />
          </button>

          <!-- Hamburger (mobile only) -->
          <button
            :class="[
              'md:hidden w-8 h-8 flex flex-col items-center justify-center gap-[5px] rounded-lg ml-0.5 transition-all duration-200 cursor-pointer',
              'text-zinc-600 hover:bg-black/6 dark:text-zinc-400 dark:hover:bg-white/10',
            ]"
            aria-label="Toggle menu"
            @click="isMenuOpen = !isMenuOpen"
          >
            <span
              :class="[
                'block h-[1.5px] rounded-full transition-all duration-300 origin-center',
                'bg-zinc-700 dark:bg-zinc-300',
                isMenuOpen ? 'w-[17px] rotate-45 translate-y-[6.5px]' : 'w-[17px]',
              ]"
            />
            <span
              :class="[
                'block h-[1.5px] rounded-full transition-all duration-300',
                'bg-zinc-700 dark:bg-zinc-300',
                isMenuOpen ? 'w-0 opacity-0' : 'w-[17px]',
              ]"
            />
            <span
              :class="[
                'block h-[1.5px] rounded-full transition-all duration-300 origin-center',
                'bg-zinc-700 dark:bg-zinc-300',
                isMenuOpen ? 'w-[17px] -rotate-45 -translate-y-[6.5px]' : 'w-[17px]',
              ]"
            />
          </button>
        </div>
      </nav>

      <!-- Mobile Dropdown Menu -->
      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 -translate-y-3 scale-[0.96]"
        enter-to-class="opacity-100 translate-y-0 scale-100"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0 scale-100"
        leave-to-class="opacity-0 -translate-y-3 scale-[0.96]"
      >
        <div
          v-if="isMenuOpen"
          :class="[
            'md:hidden w-full mt-2 rounded-2xl overflow-hidden border',
            'bg-white/97 backdrop-blur-2xl shadow-2xl shadow-black/15',
            'border-black/6 dark:border-white/8',
            'dark:bg-zinc-900/97 dark:shadow-black/50',
          ]"
        >
          <!-- Header -->
          <div
            :class="[
              'flex items-center justify-between px-5 py-3.5',
              'border-b border-black/5 dark:border-white/6',
            ]"
          >
            <span
              class="text-[10px] font-semibold tracking-widest uppercase text-zinc-400 dark:text-zinc-500"
            >
              Navigation
            </span>
            <span
              :class="[
                'text-[10px] font-semibold px-2.5 py-1 rounded-full',
                'bg-purple-100 text-purple-600 dark:bg-amber-400/15 dark:text-amber-400',
              ]"
            >
              talhaf.com
            </span>
          </div>

          <!-- Nav Items -->
          <ul class="p-2 flex flex-col gap-0.5">
            <li v-for="item in navItems" :key="item.label">
              <a
                :href="item.href"
                :class="[
                  'flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl transition-all duration-200',
                  activeSection === item.href.slice(1)
                    ? 'bg-gradient-to-r from-purple-50 to-pink-50 dark:from-amber-500/10 dark:to-orange-500/10'
                    : 'hover:bg-black/4 dark:hover:bg-white/5',
                ]"
                @click="(e) => handleNavClick(e, item.href)"
              >
                <span
                  :class="[
                    'w-8 h-8 flex items-center justify-center rounded-lg flex-shrink-0 text-sm transition-colors duration-200 text-purple-400 dark:text-amber-500',
                    activeSection === item.href.slice(1)
                      ? 'bg-purple-100 dark:bg-amber-400/20'
                      : 'bg-zinc-100 dark:bg-zinc-800',
                  ]"
                >
                  <component :is="item.icon" />
                </span>

                <span
                  :class="[
                    'flex-1 text-sm font-medium',
                    activeSection === item.href.slice(1)
                      ? 'text-purple-600 dark:text-amber-400'
                      : 'text-zinc-600 dark:text-zinc-300',
                  ]"
                >
                  {{ item.label }}
                </span>

                <span
                  v-if="activeSection === item.href.slice(1)"
                  class="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 dark:from-amber-400 dark:to-orange-400"
                />
                <IconChevronRight v-else />
              </a>
            </li>
          </ul>
          <div
            :class="[
              'flex gap-2 p-3 mx-2 mb-2 rounded-xl',
              'border border-black/5 dark:border-white/6',
              'bg-zinc-50/80 dark:bg-zinc-800/50',
            ]"
          >
            <a
              v-for="social in [
                { label: 'GitHub', href: 'https://github.com/tfevan', text: 'GH' },
                { label: 'X', href: 'https://x.com/tfevan', text: 'X' },
                {
                  label: 'Stack Overflow',
                  href: 'https://stackoverflow.com/users/4575350/sta',
                  text: 'SO',
                },
              ]"
              :key="social.label"
              :href="social.href"
              target="_BLANK"
              :aria-label="social.label"
              :class="[
                'flex-1 h-9 flex items-center justify-center rounded-lg text-xs font-semibold tracking-wide transition-all duration-200',
                'text-zinc-500 bg-white dark:bg-zinc-700 dark:text-zinc-400',
                'hover:bg-purple-50 hover:text-purple-600 dark:hover:bg-amber-400/15 dark:hover:text-amber-400',
                'border border-black/5 dark:border-white/5',
              ]"
            >
              {{ social.text }}
            </a>
          </div>
        </div>
      </Transition>
    </div>
  </header>
</template>
