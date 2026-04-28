<script setup>
defineProps({
  text: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div class="relative group/tooltip inline-flex">
    <slot />
    <span
      class="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded-md text-xs font-medium whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 translate-y-1 group-hover/tooltip:translate-y-0 transition-all duration-200 pointer-events-none z-50 dark:bg-zinc-700 dark:text-zinc-100 dark:border dark:border-white/10 bg-zinc-500 text-white border border-zinc-800"
    >
      {{ text }}
    </span>
  </div>
</template>
