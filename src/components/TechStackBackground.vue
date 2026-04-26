text

<template>
  <div class="tech-bg-wrapper" :style="wrapperStyle">
    <!-- Nebula glow layer -->
    <div class="nebula" :style="nebulaStyle" aria-hidden="true" />

    <!-- Starfield canvas -->
    <canvas ref="starCanvas" class="starfield" aria-hidden="true" />

    <!-- Floating tech logos -->
    <div class="logo-layer" aria-hidden="true">
      <div v-for="logo in logoItems" :key="logo.name" class="logo-item" :style="logo.style">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <span class="logo-icon" v-html="logo.svg" />
        <span class="logo-label">{{ logo.name }}</span>
      </div>
    </div>

    <!-- Slot: actual page content -->
    <div class="content-slot">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Props
const props = defineProps({
  starCount: { type: Number, default: 200 },
  logoScale: { type: Number, default: 1 },
})

//Dark mode
const isDark = ref(false)

function syncDark() {
  /* eslint-disable-next-line no-undef */
  isDark.value = document.documentElement.classList.contains('dark')
}

// Reactive background & nebula
const wrapperStyle = computed(() => ({
  background: isDark.value ? '#020818' : '#f1f5f9',
  transition: 'background 0.4s ease',
}))

const nebulaStyle = computed(() => {
  const a = isDark.value ? ['0.08', '0.06', '0.05'] : ['0.14', '0.11', '0.09']
  return {
    background: `
      radial-gradient(ellipse 80% 50% at 20% 30%, rgba(99,102,241,${a[0]}) 0%, transparent 60%),
      radial-gradient(ellipse 60% 40% at 80% 70%, rgba(14,165,233,${a[1]}) 0%, transparent 55%),
      radial-gradient(ellipse 50% 60% at 50% 50%, rgba(168,85,247,${a[2]}) 0%, transparent 70%)
    `,
  }
})

// Logo definitions
const LOGOS = [
  {
    name: 'Laravel',
    color: '#FF2D20',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="1.17em" height="1.2em" viewBox="0 0 256 264"><path fill="#ff2d20" d="M255.856 59.62c.095.351.144.713.144 1.077v56.568c0 1.478-.79 2.843-2.073 3.578L206.45 148.18v54.18a4.14 4.14 0 0 1-2.062 3.579l-99.108 57.053c-.227.128-.474.21-.722.299c-.093.03-.18.087-.278.113a4.15 4.15 0 0 1-2.114 0c-.114-.03-.217-.093-.325-.134c-.227-.083-.464-.155-.68-.278L2.073 205.938A4.13 4.13 0 0 1 0 202.36V32.656c0-.372.052-.733.144-1.083c.031-.119.103-.227.145-.346c.077-.216.15-.438.263-.639c.077-.134.19-.242.283-.366c.119-.165.227-.335.366-.48c.119-.118.274-.206.408-.309c.15-.124.283-.258.453-.356h.005L51.613.551a4.14 4.14 0 0 1 4.125 0l49.546 28.526h.01c.165.104.305.232.454.351c.134.103.284.196.402.31c.145.149.248.32.371.484c.088.124.207.232.279.366c.118.206.185.423.268.64c.041.118.113.226.144.35c.095.351.144.714.145 1.078V138.65l41.286-23.773V60.692c0-.36.052-.727.145-1.072c.036-.124.103-.232.144-.35c.083-.217.155-.44.268-.64c.077-.134.19-.242.279-.366c.123-.165.226-.335.37-.48c.12-.118.269-.206.403-.309c.155-.124.289-.258.454-.356h.005l49.551-28.526a4.13 4.13 0 0 1 4.125 0l49.546 28.526c.175.103.309.232.464.35c.128.104.278.197.397.31c.144.15.247.32.37.485c.094.124.207.232.28.366c.118.2.185.423.267.64c.047.118.114.226.145.35m-8.115 55.258v-47.04l-17.339 9.981l-23.953 13.792v47.04l41.297-23.773zm-49.546 85.095V152.9l-23.562 13.457l-67.281 38.4v47.514zM8.259 39.796v160.177l90.833 52.294v-47.505L51.64 177.906l-.015-.01l-.02-.01c-.16-.093-.295-.227-.444-.34c-.13-.104-.279-.186-.392-.3l-.01-.015c-.134-.129-.227-.289-.34-.433c-.104-.14-.227-.258-.31-.402l-.005-.016c-.093-.154-.15-.34-.217-.515c-.067-.155-.154-.3-.196-.464v-.005c-.051-.196-.061-.403-.082-.604c-.02-.154-.062-.309-.062-.464V63.57L25.598 49.772l-17.339-9.97zM53.681 8.893L12.399 32.656l41.272 23.762L94.947 32.65L53.671 8.893zm21.468 148.298l23.948-13.786V39.796L81.76 49.778L57.805 63.569v103.608zM202.324 36.935l-41.276 23.762l41.276 23.763l41.271-23.768zm-4.13 54.676l-23.953-13.792l-17.338-9.981v47.04l23.948 13.787l17.344 9.986zm-94.977 106.006l60.543-34.564l30.264-17.272l-41.246-23.747l-47.489 27.34l-43.282 24.918z"/></svg>`,
  },
  {
    name: 'Vue.js',
    color: '#42d392',
    svg: `<svg viewBox="0 0 50 43" xmlns="http://www.w3.org/2000/svg"><path d="M31.25 0L25 10.42 18.75 0H0l25 43.3L50 0H31.25z" fill="#42D392"/><path d="M31.25 0L25 10.42 18.75 0H9.77L25 27.08 40.23 0H31.25z" fill="#35495E"/></svg>`,
  },
  {
    name: 'Tailwind',
    color: '#38bdf8',
    svg: `<svg viewBox="0 0 50 30" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M25 0C18.335 0 14.17 3.334 12.5 10 14.998 6.667 17.913 5.416 21.25 5.833c1.981.248 3.396 1.683 4.963 3.272C28.713 11.65 31.818 15 38.75 15c6.665 0 10.83-3.334 12.5-10-2.498 3.333-5.413 4.584-8.75 4.167-1.981-.248-3.396-1.683-4.963-3.272C35.037 3.35 31.932 0 25 0zM12.5 15C5.835 15 1.67 18.334 0 25c2.498-3.333 5.413-4.584 8.75-4.167 1.981.248 3.396 1.683 4.963 3.272C16.213 26.65 19.318 30 26.25 30c6.665 0 10.83-3.334 12.5-10-2.498 3.333-5.413 4.584-8.75 4.167-1.981-.248-3.396-1.683-4.963-3.272C22.537 18.35 19.432 15 12.5 15z" fill="#38BDF8"/></svg>`,
  },
  {
    name: 'Vite',
    color: '#a855f7',
    svg: `<svg viewBox="0 0 50 48" xmlns="http://www.w3.org/2000/svg"><path d="M49.51 8.36L26.17 47.67a1.43 1.43 0 0 1-2.34.08L.27 8.4A1.43 1.43 0 0 1 1.5 6.3l22.9 4.32a1.43 1.43 0 0 0 .53 0L48.3 6.28a1.43 1.43 0 0 1 1.21 2.08z" fill="#BD34FE"/><path d="M35.44.65l-15.68 3a.68.68 0 0 0-.55.67l-1 16.38a.68.68 0 0 0 .78.71l4.33-.66a.68.68 0 0 1 .78.8l-1.28 6.2a.68.68 0 0 0 .84.8l2.67-.81a.68.68 0 0 1 .84.8l-2.03 9.8 12.63-24.6 1.52-8.74a.68.68 0 0 0-.55-.78L36.1.69a.68.68 0 0 0-.67-.04z" fill="#FFD62E"/></svg>`,
  },
  {
    name: 'REST API',
    color: '#f97316',
    svg: `<svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="17" width="48" height="16" rx="8" stroke="#f97316" stroke-width="2.5"/><circle cx="17" cy="25" r="4" fill="#f97316"/><circle cx="25" cy="25" r="4" fill="#f97316" opacity="0.6"/><circle cx="33" cy="25" r="4" fill="#f97316" opacity="0.3"/><path d="M7 10l5-5M7 40l5 5M43 10l-5-5M43 40l-5 5" stroke="#f97316" stroke-width="2" stroke-linecap="round" opacity="0.5"/></svg>`,
  },
  {
    name: 'OpenAPI',
    color: '#10b981',
    svg: `<svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="25" cy="25" r="22" stroke="#10b981" stroke-width="2.5"/><path d="M10 25a15 15 0 0 1 30 0" stroke="#10b981" stroke-width="2" stroke-linecap="round"/><path d="M14 18l8 14M28 18l8 14" stroke="#10b981" stroke-width="2" stroke-linecap="round"/><circle cx="25" cy="25" r="4" fill="#10b981"/></svg>`,
  },
  {
    name: 'GraphQL',
    color: '#e10098',
    svg: `<svg viewBox="0 0 50 55" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M25 4L46.65 16.5v25L25 54 3.35 41.5v-25L25 4z" stroke="#E10098" stroke-width="2.5"/><circle cx="25" cy="4" r="3.5" fill="#E10098"/><circle cx="46.65" cy="16.5" r="3.5" fill="#E10098"/><circle cx="46.65" cy="41.5" r="3.5" fill="#E10098"/><circle cx="25" cy="54" r="3.5" fill="#E10098"/><circle cx="3.35" cy="41.5" r="3.5" fill="#E10098"/><circle cx="3.35" cy="16.5" r="3.5" fill="#E10098"/><path d="M3.35 16.5h43.3M3.35 41.5h43.3M25 4L3.35 41.5M25 4l21.65 37.5M3.35 16.5L25 54M46.65 16.5L25 54" stroke="#E10098" stroke-width="1.2" opacity="0.35"/></svg>`,
  },
  {
    name: 'JavaScript',
    color: '#f7df1e',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 32 32"><path fill="#f5de19" d="M2 2h28v28H2z"/><path d="M20.809 23.875a2.87 2.87 0 0 0 2.6 1.6c1.09 0 1.787-.545 1.787-1.3c0-.9-.716-1.222-1.916-1.747l-.658-.282c-1.9-.809-3.16-1.822-3.16-3.964c0-1.973 1.5-3.476 3.853-3.476a3.89 3.89 0 0 1 3.742 2.107L25 18.128A1.79 1.79 0 0 0 23.311 17a1.145 1.145 0 0 0-1.259 1.128c0 .789.489 1.109 1.618 1.6l.658.282c2.236.959 3.5 1.936 3.5 4.133c0 2.369-1.861 3.667-4.36 3.667a5.06 5.06 0 0 1-4.795-2.691Zm-9.295.228c.413.733.789 1.353 1.693 1.353c.864 0 1.41-.338 1.41-1.653v-8.947h2.631v8.982c0 2.724-1.6 3.964-3.929 3.964a4.085 4.085 0 0 1-3.947-2.4Z"/></svg>`,
  },
  {
    name: 'Node.js',
    color: '#68a063',
    svg: `<svg viewBox="0 0 50 55" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M25 1.5a2 2 0 0 1 1 .27l20 11.55a2 2 0 0 1 1 1.73v23.1a2 2 0 0 1-1 1.73L26 51.43a2 2 0 0 1-2 0L4 39.88a2 2 0 0 1-1-1.73V15.05a2 2 0 0 1 1-1.73L24 1.77a2 2 0 0 1 1-.27z" stroke="#68A063" stroke-width="2.5"/><path d="M16.5 33.5c.5 2.5 2.5 4 5 4 3 0 5-1.5 5-4.5 0-2.5-1.5-3.5-4-4.5l-1-.5c-1.5-.5-2-.8-2-1.8 0-.8.7-1.5 1.8-1.5 1 0 1.7.5 2.2 1.5l2.5-1.5c-1-1.8-2.5-2.7-4.7-2.7-2.8 0-4.7 1.8-4.7 4.3 0 2.5 1.5 3.5 3.8 4.5l1 .5c1.7.7 2.2 1.2 2.2 2.2 0 1.2-1 1.8-2.5 1.8-1.5 0-2.5-.8-3-2.3l-2.6 1.5z" fill="#68A063"/></svg>`,
  },
  {
    name: 'MariaDB',
    color: '#c0765a',
    svg: `<svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="25" cy="12" rx="20" ry="7" stroke="#C0765A" stroke-width="2.5"/><path d="M5 12v8c0 3.87 9 7 20 7s20-3.13 20-7v-8" stroke="#C0765A" stroke-width="2.5"/><path d="M5 20v8c0 3.87 9 7 20 7s20-3.13 20-7v-8" stroke="#C0765A" stroke-width="2.5"/><path d="M5 28v6c0 3.87 9 7 20 7s20-3.13 20-7v-6" stroke="#C0765A" stroke-width="2.5"/><path d="M38 7c3-4 8-5 10-5" stroke="#C0765A" stroke-width="2" stroke-linecap="round" opacity="0.6"/></svg>`,
  },
  {
    name: 'MySQL',
    color: '#4479a1',
    svg: `<svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="25" cy="12" rx="20" ry="7" stroke="#4479A1" stroke-width="2.5"/><path d="M5 12v10c0 3.87 9 7 20 7s20-3.13 20-7V12" stroke="#4479A1" stroke-width="2.5"/><path d="M5 22v10c0 3.87 9 7 20 7s20-3.13 20-7V22" stroke="#4479A1" stroke-width="2.5"/><path d="M5 32v6c0 3.87 9 7 20 7s20-3.13 20-7v-6" stroke="#4479A1" stroke-width="2.5"/></svg>`,
  },
  {
    name: 'PostgreSQL',
    color: '#336791',
    svg: `<svg viewBox="0 0 50 55" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="25" cy="14" rx="18" ry="13" stroke="#336791" stroke-width="2.5"/><path d="M7 14v22c0 6 8 11 18 11s18-5 18-11V14" stroke="#336791" stroke-width="2.5"/><path d="M15 20v14M25 18v18M35 20v14" stroke="#336791" stroke-width="1.5" stroke-linecap="round" opacity="0.45"/><path d="M30 5c4-3 10-3 13 0" stroke="#336791" stroke-width="2" stroke-linecap="round" opacity="0.6"/></svg>`,
  },
  {
    name: 'MongoDB',
    color: '#47a248',
    svg: `<svg viewBox="0 0 50 60" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M25 2C25 2 8 20 8 35a17 17 0 0 0 15 16.8V58h4V51.8A17 17 0 0 0 42 35C42 20 25 2 25 2z" stroke="#47A248" stroke-width="2.5"/><path d="M25 10v40" stroke="#47A248" stroke-width="2" stroke-linecap="round" opacity="0.45"/></svg>`,
  },
  {
    name: 'Redis',
    color: '#dc382c',
    svg: `<svg viewBox="0 0 50 42" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 29l22 10 22-10-22-10L3 29z" stroke="#DC382C" stroke-width="2.2"/><path d="M3 22l22 10 22-10" stroke="#DC382C" stroke-width="2.2"/><path d="M3 15l22 10 22-10L25 5 3 15z" stroke="#DC382C" stroke-width="2.2"/><path d="M33 8l8 3-8 3-8-3 8-3z" fill="#DC382C" opacity="0.5"/></svg>`,
  },
  {
    name: 'Memcached',
    color: '#74c78c',
    svg: `<svg viewBox="0 0 50 52" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="4" width="42" height="12" rx="6" stroke="#74C78C" stroke-width="2.2"/><rect x="4" y="20" width="42" height="12" rx="6" stroke="#74C78C" stroke-width="2.2"/><rect x="4" y="36" width="42" height="12" rx="6" stroke="#74C78C" stroke-width="2.2"/><circle cx="14" cy="10" r="3" fill="#74C78C"/><circle cx="14" cy="26" r="3" fill="#74C78C"/><circle cx="14" cy="42" r="3" fill="#74C78C"/></svg>`,
  },
  {
    name: 'Git',
    color: '#f05032',
    svg: `<svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg"><path d="M47.5 22.94L27.06 2.5a4 4 0 0 0-5.66 0L17 6.9l5.72 5.72a4.75 4.75 0 0 1 6.01 6.05l5.5 5.5a4.75 4.75 0 1 1-2.85 2.65l-5.13-5.13v13.5a4.75 4.75 0 1 1-3.9-.12V21.5a4.75 4.75 0 0 1-2.6-6.23L14.07 9.6 2.5 21.17a4 4 0 0 0 0 5.66l20.44 20.44a4 4 0 0 0 5.66 0L47.5 28.6a4 4 0 0 0 0-5.66z" fill="#F05032"/></svg>`,
  },
  {
    name: 'AWS',
    color: '#ff9900',
    svg: `<svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.36 16l-3.5 9.46h1.3l.74-2.1h3.6l.73 2.1h1.35L14.08 16h-.72zm-.96 6.3l1.34-3.84 1.33 3.84H13.4zM21.7 25.46l-3-9.46h-1.4l3.7 9.46h1.37l3.7-9.46h-1.4l-3 9.46zM28.77 16l-3.5 9.46h1.3l.74-2.1h3.6l.73 2.1h1.35L29.49 16h-.72zm-.96 6.3l1.34-3.84 1.33 3.84h-2.67zM14.7 37c-4.62-1.6-8.33-5.2-10.07-9.77C3.05 23.77 3.2 19.3 5 15.4" stroke="#FF9900" stroke-width="2" stroke-linecap="round"/><path d="M35.3 37c4.62-1.6 8.33-5.2 10.07-9.77 1.58-4.46 1.43-8.93-.37-12.83" stroke="#FF9900" stroke-width="2" stroke-linecap="round"/><path d="M9 13l-4-1.5 1.5-4M41 13l4-1.5-1.5-4" stroke="#FF9900" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  },
  {
    name: 'Linux',
    color: '#ca8a04',
    svg: `<svg viewBox="0 0 50 55" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M25 2c-4 0-8 6-8 14 0 4 1 8 3 11-3 2-8 5-10 10-1 3 0 6 3 7 2 1 5 0 8-1l4 2 4-2c3 1 6 2 8 1 3-1 4-4 3-7-2-5-7-8-10-10 2-3 3-7 3-11 0-8-4-14-8-14z" stroke="#ca8a04" stroke-width="2.2"/><circle cx="21" cy="18" r="2" fill="#ca8a04"/><circle cx="29" cy="18" r="2" fill="#ca8a04"/><path d="M21 24c1 2 3 3 4 3s3-1 4-3" stroke="#ca8a04" stroke-width="1.5" stroke-linecap="round"/><path d="M10 44h30M15 44v7M25 44v7M35 44v7" stroke="#ca8a04" stroke-width="2" stroke-linecap="round"/></svg>`,
  },
  {
    name: 'Cloudflare',
    color: '#f6821f',
    svg: `<svg viewBox="0 0 50 35" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M36.84 15.6c.16-.55.25-1.12.25-1.72a6.88 6.88 0 0 0-13.15-2.87 4.58 4.58 0 0 0-7.19 3.88c0 .24.02.48.05.71A5.73 5.73 0 0 0 8 21c0 3.17 2.57 5.74 5.74 5.74h21.8A5.74 5.74 0 0 0 41.28 21a5.74 5.74 0 0 0-4.44-5.4z" stroke="#F6821F" stroke-width="2.2"/><path d="M32 21a4 4 0 0 1-4-4" stroke="#F6821F" stroke-width="1.5" stroke-linecap="round" opacity="0.6"/></svg>`,
  },
  {
    name: 'Nuxt.js',
    color: '#00dc82',
    svg: `<svg viewBox="0 0 60 44" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.65 4L2 40h20" stroke="#00DC82" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M34.65 4L14 40h40L34.65 4z" stroke="#00DC82" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  },
]

// Build logo items once on mount
function rand(min, max) {
  return Math.random() * (max - min) + min
}
function px(range = 70) {
  return `${((Math.random() - 0.5) * range).toFixed(1)}px`
}

const logoItems = ref([])

function buildLogoItems() {
  logoItems.value = LOGOS.map((logo) => {
    const size = (rand(28, 54) * props.logoScale).toFixed(0)
    const dur = rand(15, 32).toFixed(1)
    const delay = (-rand(0, 30)).toFixed(1)
    const gDur = rand(2.5, 5.5).toFixed(1)
    const gDelay = (-rand(0, 5)).toFixed(1)
    const r0 = ((Math.random() - 0.5) * 18).toFixed(1)
    const r1 = (parseFloat(r0) + (Math.random() - 0.5) * 12).toFixed(1)
    const r2 = (parseFloat(r0) - (Math.random() - 0.5) * 10).toFixed(1)
    const opLo = rand(0.4, 0.55).toFixed(2)
    const opHi = Math.min(parseFloat(opLo) + rand(0.25, 0.4), 1).toFixed(2)

    return {
      name: logo.name,
      svg: logo.svg,
      style: {
        left: `${rand(3, 94).toFixed(2)}%`,
        top: `${rand(2, 93).toFixed(2)}%`,
        '--color': logo.color,
        '--size': `${size}px`,
        '--dur': `${dur}s`,
        '--delay': `${delay}s`,
        '--g-dur': `${gDur}s`,
        '--g-delay': `${gDelay}s`,
        '--r0': `${r0}deg`,
        '--r1': `${r1}deg`,
        '--r2': `${r2}deg`,
        '--dx1': px(),
        '--dy1': px(),
        '--dx2': px(),
        '--dy2': px(),
        '--dx3': px(),
        '--dy3': px(),
        '--dx4': px(),
        '--dy4': px(),
        '--op-lo': opLo,
        '--op-hi': opHi,
      },
    }
  })
}

// Starfield canvas
const starCanvas = ref(null)
let rafId = null
let stars = []

function resizeCanvas() {
  const c = starCanvas.value
  if (!c) return
  c.width = c.offsetWidth
  c.height = c.offsetHeight
  buildStars()
}

function buildStars() {
  const c = starCanvas.value
  if (!c) return
  stars = Array.from({ length: props.starCount }, () => ({
    x: Math.random() * c.width,
    y: Math.random() * c.height,
    r: rand(0.15, 1.45),
    a: Math.random(),
    spd: rand(0.004, 0.014),
    dir: Math.random() > 0.5 ? 1 : -1,
  }))
}

function drawStars() {
  const c = starCanvas.value
  if (!c) return
  const ctx = c.getContext('2d')
  ctx.clearRect(0, 0, c.width, c.height)
  // dark → white stars, light → dark slate stars
  const rgb = isDark.value ? '210,225,255' : '30,41,59'
  for (const s of stars) {
    s.a += s.spd * s.dir
    if (s.a >= 1 || s.a <= 0) s.dir *= -1
    ctx.beginPath()
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(${rgb},${s.a})`
    ctx.fill()
  }
  rafId = globalThis.requestAnimationFrame(drawStars)
}

// Lifecycle
let ro = null
let observer = null

onMounted(() => {
  syncDark()
  buildLogoItems()

  // Watch
  observer = new globalThis.MutationObserver(syncDark)
  /* eslint-disable-next-line no-undef */
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  })

  resizeCanvas()
  drawStars()

  if (globalThis.ResizeObserver && starCanvas.value) {
    ro = new globalThis.ResizeObserver(resizeCanvas)
    ro.observe(starCanvas.value)
  }
})

onUnmounted(() => {
  globalThis.cancelAnimationFrame(rafId)
  ro?.disconnect()
  observer?.disconnect()
})
</script>

<style scoped>
.tech-bg-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.nebula {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  transition: background 0.4s ease;
}

.starfield {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0.7;
  pointer-events: none;
  z-index: 1;
}

.logo-layer {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 2;
}

.logo-item {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  pointer-events: auto;
  cursor: default;
  user-select: none;
  animation:
    tech-float var(--dur) ease-in-out infinite var(--delay),
    tech-glow var(--g-dur) ease-in-out infinite var(--g-delay);
}

.logo-icon {
  display: block;
  line-height: 0;
}

.logo-icon :deep(svg) {
  width: var(--size);
  height: var(--size);
  filter: drop-shadow(0 0 6px var(--color)) drop-shadow(0 0 14px var(--color));
  transition: filter 0.35s ease;
}

.logo-item:hover .logo-icon :deep(svg) {
  filter: drop-shadow(0 0 12px var(--color)) drop-shadow(0 0 32px var(--color))
    drop-shadow(0 0 64px var(--color));
}

.logo-label {
  font-family: 'Courier New', Courier, monospace;
  font-size: 8px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  white-space: nowrap;
  color: var(--color);
  opacity: 0.7;
  text-shadow: 0 0 8px var(--color);
  transition: opacity 0.3s;
}

.logo-item:hover .logo-label {
  opacity: 1;
}

.content-slot {
  position: relative;
  z-index: 10;
  width: 100%;
  min-height: 100%;
}

@keyframes tech-float {
  0% {
    transform: translate(0, 0) rotate(var(--r0));
  }
  20% {
    transform: translate(var(--dx1), var(--dy1)) rotate(var(--r1));
  }
  40% {
    transform: translate(var(--dx2), var(--dy2)) rotate(var(--r2));
  }
  60% {
    transform: translate(var(--dx3), var(--dy3)) rotate(var(--r1));
  }
  80% {
    transform: translate(var(--dx4), var(--dy4)) rotate(var(--r2));
  }
  100% {
    transform: translate(0, 0) rotate(var(--r0));
  }
}

@keyframes tech-glow {
  0%,
  100% {
    opacity: var(--op-lo);
  }
  50% {
    opacity: var(--op-hi);
  }
}
</style>
