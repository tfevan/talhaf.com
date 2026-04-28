<template>
  <div class="tech-bg-wrapper" :style="wrapperStyle">
    <div class="nebula" :style="nebulaStyle" aria-hidden="true" />
    <div class="logo-layer" aria-hidden="true">
      <div v-for="logo in logoItems" :key="logo.name" class="logo-item" :style="logo.style">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <span class="logo-icon" v-html="logo.svg" />
        <span class="logo-label">{{ logo.name }}</span>
      </div>
    </div>
    <div class="content-slot">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  logoScale: { type: Number, default: 1 },
})

const isDark = ref(false)

function syncDark() {
  // eslint-disable-next-line no-undef
  isDark.value = document.documentElement.classList.contains('dark')
}

const wrapperStyle = computed(() => ({
  // background: isDark.value ? '#020818' : '#f1f5f9',
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

const LOGOS = [
  {
    name: 'Laravel',
    color: '#FF2D20',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="1.17em" height="1.2em" viewBox="0 0 256 264"><path fill="#ff2d20" d="M255.856 59.62c.095.351.144.713.144 1.077v56.568c0 1.478-.79 2.843-2.073 3.578L206.45 148.18v54.18a4.14 4.14 0 0 1-2.062 3.579l-99.108 57.053c-.227.128-.474.21-.722.299c-.093.03-.18.087-.278.113a4.15 4.15 0 0 1-2.114 0c-.114-.03-.217-.093-.325-.134c-.227-.083-.464-.155-.68-.278L2.073 205.938A4.13 4.13 0 0 1 0 202.36V32.656c0-.372.052-.733.144-1.083c.031-.119.103-.227.145-.346c.077-.216.15-.438.263-.639c.077-.134.19-.242.283-.366c.119-.165.227-.335.366-.48c.119-.118.274-.206.408-.309c.15-.124.283-.258.453-.356h.005L51.613.551a4.14 4.14 0 0 1 4.125 0l49.546 28.526h.01c.165.104.305.232.454.351c.134.103.284.196.402.31c.145.149.248.32.371.484c.088.124.207.232.279.366c.118.206.185.423.268.64c.041.118.113.226.144.35c.095.351.144.714.145 1.078V138.65l41.286-23.773V60.692c0-.36.052-.727.145-1.072c.036-.124.103-.232.144-.35c.083-.217.155-.44.268-.64c.077-.134.19-.242.279-.366c.123-.165.226-.335.37-.48c.12-.118.269-.206.403-.309c.155-.124.289-.258.454-.356h.005l49.551-28.526a4.13 4.13 0 0 1 4.125 0l49.546 28.526c.175.103.309.232.464.35c.128.104.278.197.397.31c.144.15.247.32.37.485c.094.124.207.232.28.366c.118.2.185.423.267.64c.047.118.114.226.145.35m-8.115 55.258v-47.04l-17.339 9.981l-23.953 13.792v47.04l41.297-23.773zm-49.546 85.095V152.9l-23.562 13.457l-67.281 38.4v47.514zM8.259 39.796v160.177l90.833 52.294v-47.505L51.64 177.906l-.015-.01l-.02-.01c-.16-.093-.295-.227-.444-.34c-.13-.104-.279-.186-.392-.3l-.01-.015c-.134-.129-.227-.289-.34-.433c-.104-.14-.227-.258-.31-.402l-.005-.016c-.093-.154-.15-.34-.217-.515c-.067-.155-.154-.3-.196-.464v-.005c-.051-.196-.061-.403-.082-.604c-.02-.154-.062-.309-.062-.464V63.57L25.598 49.772l-17.339-9.97zM53.681 8.893L12.399 32.656l41.272 23.762L94.947 32.65L53.671 8.893zm21.468 148.298l23.948-13.786V39.796L81.76 49.778L57.805 63.569v103.608zM202.324 36.935l-41.276 23.762l41.276 23.763l41.271-23.768zm-4.13 54.676l-23.953-13.792l-17.338-9.981v47.04l23.948 13.787l17.344 9.986zm-94.977 106.006l60.543-34.564l30.264-17.272l-41.246-23.747l-47.489 27.34l-43.282 24.918z"/></svg>`,
  },
  {
    name: 'Vue.js',
    color: '#42d392',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="1.4em" height="1.2em" viewBox="0 0 256 221"><path fill="#41b883" d="M204.8 0H256L128 220.8L0 0h97.92L128 51.2L157.44 0z"/><path fill="#41b883" d="m0 0l128 220.8L256 0h-51.2L128 132.48L50.56 0z"/><path fill="#35495e" d="M50.56 0L128 133.12L204.8 0h-47.36L128 51.2L97.92 0z"/></svg>`,
  },
  {
    name: 'Tailwind',
    color: '#38bdf8',
    svg: `<svg viewBox="0 0 50 30" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M25 0C18.335 0 14.17 3.334 12.5 10 14.998 6.667 17.913 5.416 21.25 5.833c1.981.248 3.396 1.683 4.963 3.272C28.713 11.65 31.818 15 38.75 15c6.665 0 10.83-3.334 12.5-10-2.498 3.333-5.413 4.584-8.75 4.167-1.981-.248-3.396-1.683-4.963-3.272C35.037 3.35 31.932 0 25 0zM12.5 15C5.835 15 1.67 18.334 0 25c2.498-3.333 5.413-4.584 8.75-4.167 1.981.248 3.396 1.683 4.963 3.272C16.213 26.65 19.318 30 26.25 30c6.665 0 10.83-3.334 12.5-10-2.498 3.333-5.413 4.584-8.75 4.167-1.981-.248-3.396-1.683-4.963-3.272C22.537 18.35 19.432 15 12.5 15z" fill="#38BDF8"/></svg>`,
  },
  {
    name: 'ViteJS',
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
    color: '#eab308',
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
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="1.77em" height="1.2em" viewBox="0 0 512 349"><path fill="#00758f" d="m152.31 230.297l15.56 50.487c3.496 11.463 4.954 19.465 4.37 24.026q12.765-34.188 17.839-74.513h18.71q-12.069 65.65-31.827 95.41c-10.262 15.289-21.504 22.933-33.746 22.933c-3.264 0-7.288-.986-12.063-2.944v-10.55c2.333.342 5.07.525 8.218.525q8.565-.002 13.816-4.742c4.193-3.849 6.292-8.175 6.292-12.97c0-3.274-1.637-9.993-4.896-20.157l-21.68-67.505zM33.223 199.266l28.5 86.956h.176l28.675-86.956h23.428c5.13 43.124 8.16 82.581 9.09 118.346H103.34q-1.044-50.148-5.768-94.32H97.4l-30.078 94.32H52.28l-29.896-94.32h-.176q-3.325 42.422-4.196 94.32H0c1.164-42.08 4.077-81.525 8.739-118.346z"/><path fill="#f29111" d="M352.498 197.51c30.657 0 45.986 19.586 45.986 58.739c0 21.276-4.61 37.347-13.821 48.204c-1.66 1.984-3.495 3.698-5.427 5.286l21.695 10.727l-.021-.001l-7.703 13.302l-28.253-16.485q-7.026 2.08-15.451 2.08c-15.053 0-26.297-4.387-33.731-13.15c-8.16-9.694-12.238-24.955-12.238-45.757c0-21.156 4.602-37.166 13.816-48.037c8.392-9.944 20.11-14.909 35.148-14.909m-93.88.172c10.957 0 20.92 2.932 29.894 8.775l-4.558 10.157c-7.679-3.264-15.25-4.903-22.716-4.903c-6.058 0-10.726 1.458-13.98 4.392c-3.272 2.908-5.296 6.65-5.296 11.212c0 7.01 4.994 13.089 14.215 18.225a816 816 0 0 1 9.031 5.011l.688.387l.345.194l.689.387l.344.194l.688.388c6.98 3.935 13.548 7.691 13.548 7.691c9.22 6.545 13.816 13.523 13.816 25.016c0 10.037-3.678 18.276-11.01 24.723c-7.337 6.418-17.194 9.636-29.538 9.636c-11.545 0-22.734-3.704-33.572-11.05l5.07-10.166c9.327 4.675 17.767 7.01 25.346 7.01c7.108 0 12.672-1.587 16.697-4.721c4.017-3.157 6.424-7.56 6.424-13.143c0-7.027-4.888-13.034-13.855-18.073a898 898 0 0 1-8.395-4.697l-.687-.389c-1.262-.713-2.533-1.435-3.778-2.142l-.675-.384c-6.055-3.444-11.29-6.453-11.29-6.453c-8.964-6.557-13.459-13.592-13.459-25.184c0-9.587 3.352-17.336 10.046-23.231q10.066-8.862 25.968-8.862m175.895 1.584v103.788h37.238v14.558h-56.124V199.266zm57.93 103.833v2.46h-4.094v12.04h-3.13v-12.04h-4.253v-2.46zm7.56 0l3.931 9.884l3.611-9.884h4.437v14.5h-2.95v-11.035l-4.11 11.035h-2.127l-4.117-11.035h-.158v11.035h-2.791v-14.5zM350.57 212.064c-18.066 0-27.104 14.91-27.104 44.71c0 17.07 2.395 29.448 7.176 37.163c4.428 7.14 11.363 10.703 20.806 10.703c18.066 0 27.103-15.026 27.103-45.064c0-16.831-2.395-29.103-7.17-36.822c-4.433-7.124-11.365-10.69-20.81-10.69"/><path fill="#00758f" d="M303.218 7.333c5.993-14.726 26.948-3.574 35.08 1.57c1.993 1.287 4.279 4.006 6.564 5.011c3.565.14 7.127.419 10.698.568c6.698 1.574 12.972 2.86 18.25 5.866c24.528 14.445 40.495 29.165 55.19 53.479c3.14 5.15 4.709 10.723 7.274 16.296c3.56 8.307 7.56 17.027 11.692 24.882c1.85 3.724 3.281 7.865 5.85 11.01c1.003 1.438 3.852 1.862 5.555 2.721c4.708 2.437 10.412 4.287 14.84 7.147c8.269 5.156 16.264 11.3 23.532 17.59c2.709 2.428 4.555 5.865 7.136 8.433v1.296c-2.291.703-4.574 1.423-6.859 2c-4.991 1.282-9.412.992-14.254 2.275c-2.992.868-6.707 2.013-9.845 2.304l.29.292c1.846 5.275 11.834 9.565 16.402 12.72c5.548 4.004 10.689 8.86 14.827 14.437c1.429 1.423 2.858 2.718 4.28 4.137c.994 1.438 1.274 3.298 2.28 4.58v.434c-1.114-.393-1.915-1.143-2.674-1.927l-.453-.473c-.453-.47-.91-.932-1.431-1.313c-3.148-2.15-6.274-4.722-9.422-6.721c-5.412-3.434-11.689-5.427-17.246-8.874c-3.142-2.001-6.137-4.28-9.132-6.57c-2.715-2.007-5.705-5.861-7.411-8.721c-1.005-1.58-1.143-3.437-2.291-4.58c.205-1.909 1.954-2.476 3.719-2.942l.406-.107c.609-.158 1.205-.316 1.725-.525c7.414-3.148 16.253-4.29 27.667-4.004c-.43-2.866-7.562-6.437-9.839-8.153c-4.57-3.294-9.409-6.731-14.257-9.729c-2.569-1.57-6.996-2.716-9.842-3.999c-3.851-1.574-12.41-3.147-14.544-6.145c-3.625-4.726-6.229-10.363-8.757-16.057l-.688-1.554l-.69-1.553c-2.988-6.857-6.7-14.006-9.695-21.027c-1.566-3.425-2.285-6.431-4-9.716c-10.407-20.158-25.81-37.035-44.485-48.904c-6.137-3.862-12.98-7.436-20.534-9.865c-4.281-1.293-9.419-.578-13.98-1.57h-3.002c-2.562-.722-4.701-3.438-6.7-4.87c-4.415-2.998-8.837-5.011-14.117-7.15c-1.85-.858-7.133-2.856-8.977-1.283c-1.142.287-1.721.718-2.002 1.864c-1.136 1.71-.137 4.286.57 5.863c2.142 4.57 5.134 7.286 7.85 11.148c2.416 3.425 5.417 7.287 7.13 11.011c3.696 8.005 5.417 16.874 8.842 24.878c1.27 3.01 3.279 6.435 5.128 9.15c1.567 2.155 4.416 3.713 5.278 6.441c1.718 2.86-2.572 12.297-3.565 15.294c-3.715 11.727-2.995 28.028 1.283 38.193l.228.536l.228.543c1.562 3.723 3.234 7.732 7.387 8.773c.286-.284 0-.135.567-.284c1.005-7.868 1.288-15.445 4-21.601c1.567-3.849 4.696-6.57 6.841-9.712c1.43.856 1.43 3.437 2.282 5.145c1.856 4.43 3.849 9.287 6.137 13.73c4.696 9.15 9.98 18.021 15.967 26.025c2.005 2.859 4.85 6.006 7.416 8.581c1.143.997 2.423 1.573 3.282 2.856h.28v.432c-4.278-1.577-6.99-6.003-10.402-8.587c-6.424-4.857-14.117-12.151-18.545-19.15c-1.852-4.018-3.854-7.869-5.85-11.867v-.289c-.853 1.142-.567 2.276-.994 4.004c-1.852 7.145-.426 15.296-6.843 17.866c-7.274 3.01-12.7-4.857-14.977-8.432c-7.276-11.866-9.269-31.884-4.138-48.043c1.14-3.577 1.295-7.867 3.285-10.723c-.43-2.582-2.42-3.288-3.571-4.87c-1.996-2.704-3.705-5.854-5.268-8.857c-3.002-5.866-5.138-12.875-7.417-19.166c-1.002-2.569-1.289-5.148-2.288-7.58c-1.704-3.712-4.845-7.436-7.268-10.72c-3.281-4.72-12.837-13.868-8.985-23.168m46.772 28.015c.381.382.841.716 1.317 1.045l.574.394c.765.53 1.506 1.088 1.96 1.848c.72 1.006.854 1.999 1.716 3.007c0 3.437-.996 5.722-3.007 7.146c0 0-.137.15-.278.29c-1.14-2.291-2.139-4.57-3.287-6.859c-1.414-1.998-3.413-3.583-4.565-5.866h-.277v-.287c1.721-.425 3.428-.718 5.847-.718"/></svg>`,
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
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 128 128"><path fill="#a41e11" d="M121.8 93.1c-6.7 3.5-41.4 17.7-48.8 21.6s-11.5 3.8-17.3 1S13 98.1 6.3 94.9c-3.3-1.6-5-2.9-5-4.2V78s48-10.5 55.8-13.2c7.8-2.8 10.4-2.9 17-.5s46.1 9.5 52.6 11.9v12.5c0 1.3-1.5 2.7-4.9 4.4"/><path fill="#d82c20" d="M121.8 80.5C115.1 84 80.4 98.2 73 102.1s-11.5 3.8-17.3 1S13 85.4 6.3 82.2C-.3 79-.5 76.8 6 74.3c6.5-2.6 43.2-17 51-19.7c7.8-2.8 10.4-2.9 17-.5s41.1 16.1 47.6 18.5c6.7 2.4 6.9 4.4.2 7.9"/><path fill="#a41e11" d="M121.8 72.5C115.1 76 80.4 90.2 73 94.1c-7.4 3.8-11.5 3.8-17.3 1S13 77.4 6.3 74.2c-3.3-1.6-5-2.9-5-4.2V57.3s48-10.5 55.8-13.2c7.8-2.8 10.4-2.9 17-.5s46.1 9.5 52.6 11.9V68c0 1.3-1.5 2.7-4.9 4.5"/><path fill="#d82c20" d="M121.8 59.8c-6.7 3.5-41.4 17.7-48.8 21.6c-7.4 3.8-11.5 3.8-17.3 1S13 64.7 6.3 61.5s-6.8-5.4-.3-7.9c6.5-2.6 43.2-17 51-19.7c7.8-2.8 10.4-2.9 17-.5s41.1 16.1 47.6 18.5c6.7 2.4 6.9 4.4.2 7.9"/><path fill="#a41e11" d="M121.8 51c-6.7 3.5-41.4 17.7-48.8 21.6c-7.4 3.8-11.5 3.8-17.3 1C49.9 70.9 13 56 6.3 52.8c-3.3-1.6-5.1-2.9-5.1-4.2V35.9s48-10.5 55.8-13.2c7.8-2.8 10.4-2.9 17-.5s46.1 9.5 52.6 11.9v12.5c.1 1.3-1.4 2.6-4.8 4.4"/><path fill="#d82c20" d="M121.8 38.3C115.1 41.8 80.4 56 73 59.9c-7.4 3.8-11.5 3.8-17.3 1S13 43.3 6.3 40.1s-6.8-5.4-.3-7.9c6.5-2.6 43.2-17 51-19.7c7.8-2.8 10.4-2.9 17-.5s41.1 16.1 47.6 18.5c6.7 2.4 6.9 4.4.2 7.8"/><path fill="#fff" d="m80.4 26.1l-10.8 1.2l-2.5 5.8l-3.9-6.5l-12.5-1.1l9.3-3.4l-2.8-5.2l8.8 3.4l8.2-2.7L72 23zM66.5 54.5l-20.3-8.4l29.1-4.4z"/><ellipse cx="38.4" cy="35.4" fill="#fff" rx="15.5" ry="6"/><path fill="#7a0c00" d="m93.3 27.7l17.2 6.8l-17.2 6.8z"/><path fill="#ad2115" d="m74.3 35.3l19-7.6v13.6l-1.9.8z"/></svg>`,
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

function rand(min, max) {
  return Math.random() * (max - min) + min
}

const logoItems = ref([])

function buildSlots(n) {
  const zones = [
    { xMin: 3, xMax: 28, yMin: 10, yMax: 82, w: 3 },
    { xMin: 72, xMax: 97, yMin: 10, yMax: 82, w: 3 },
    { xMin: 28, xMax: 72, yMin: 10, yMax: 24, w: 2 },
    { xMin: 28, xMax: 72, yMin: 76, yMax: 82, w: 2 },
  ]

  const totalW = zones.reduce((s, z) => s + z.w, 0)

  const placed = []
  const MIN_DIST = 14

  let attempts = 0
  while (placed.length < n && attempts < n * 40) {
    attempts++

    let r = Math.random() * totalW
    const zone =
      zones.find((z) => {
        r -= z.w
        return r <= 0
      }) ?? zones[0]

    const leftCount = placed.filter((p) => p.x < 50).length
    const rightCount = placed.filter((p) => p.x >= 50).length
    const half = Math.floor(n / 2)
    if (leftCount >= half && zone.xMax <= 50) continue
    if (rightCount >= half && zone.xMin >= 50) continue

    const x = rand(zone.xMin, zone.xMax)
    const y = rand(zone.yMin, zone.yMax)

    const tooClose = placed.some((p) => Math.hypot(p.x - x, (p.y - y) * 1.6) < MIN_DIST)
    if (tooClose) continue

    placed.push({ x, y })
  }

  while (placed.length < n) {
    const side = placed.length % 2 === 0
    placed.push({
      x: side ? rand(3, 28) : rand(72, 97),
      y: rand(3, 96),
    })
  }

  return placed
}

function buildLogoItems() {
  const slots = buildSlots(LOGOS.length)

  for (let i = slots.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[slots[i], slots[j]] = [slots[j], slots[i]]
  }

  logoItems.value = LOGOS.map((logo, i) => {
    const slot = slots[i]
    const size = (rand(28, 48) * props.logoScale).toFixed(0)
    const dur = rand(16, 30).toFixed(1)
    const delay = (-rand(0, 28)).toFixed(1)
    const gDur = rand(2.5, 5).toFixed(1)
    const gDelay = (-rand(0, 5)).toFixed(1)
    const r0 = ((Math.random() - 0.5) * 14).toFixed(1)
    const r1 = (parseFloat(r0) + (Math.random() - 0.5) * 10).toFixed(1)
    const r2 = (parseFloat(r0) - (Math.random() - 0.5) * 8).toFixed(1)
    const opLo = rand(0.38, 0.52).toFixed(2)
    const opHi = Math.min(parseFloat(opLo) + rand(0.25, 0.38), 1).toFixed(2)

    const driftX = slot.x < 50 ? rand(5, 40) : rand(-40, -5)
    const dyFn = () => `${((Math.random() - 0.5) * 50).toFixed(1)}px`

    return {
      name: logo.name,
      svg: logo.svg,
      style: {
        left: `${slot.x.toFixed(2)}%`,
        top: `${slot.y.toFixed(2)}%`,
        '--color': logo.color,
        '--size': `${size}px`,
        '--dur': `${dur}s`,
        '--delay': `${delay}s`,
        '--g-dur': `${gDur}s`,
        '--g-delay': `${gDelay}s`,
        '--r0': `${r0}deg`,
        '--r1': `${r1}deg`,
        '--r2': `${r2}deg`,
        '--dx1': `${(driftX * rand(0.3, 0.7)).toFixed(1)}px`,
        '--dy1': dyFn(),
        '--dx2': `${(driftX * rand(0.1, 0.5)).toFixed(1)}px`,
        '--dy2': dyFn(),
        '--dx3': `${(driftX * rand(0.5, 1.0)).toFixed(1)}px`,
        '--dy3': dyFn(),
        '--dx4': `${(driftX * rand(0.2, 0.6)).toFixed(1)}px`,
        '--dy4': dyFn(),
        '--op-lo': opLo,
        '--op-hi': opHi,
      },
    }
  })
}

let ro = null
let observer = null

onMounted(() => {
  syncDark()
  buildLogoItems()

  observer = new globalThis.MutationObserver(syncDark)
  // eslint-disable-next-line no-undef
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  })
})

onUnmounted(() => {
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
