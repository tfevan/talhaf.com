<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { CalendarHeatmap } from 'vue3-calendar-heatmap'
import 'vue3-calendar-heatmap/dist/style.css'

/* global document, MutationObserver, fetch */

const props = defineProps({
  username: { type: String, default: 'tfevan' },
})

const COLORS_DARK = ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353']
const COLORS_LIGHT = ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39']

const isDark = () => document.documentElement.classList.contains('dark')
const rangeColor = ref(isDark() ? COLORS_DARK : COLORS_LIGHT)
const darkMode = ref(isDark())

let observer
onMounted(() => {
  observer = new MutationObserver(() => {
    const dark = isDark()
    rangeColor.value = dark ? COLORS_DARK : COLORS_LIGHT
    darkMode.value = dark
  })
  observer.observe(document.documentElement, { attributeFilter: ['class'] })
})
onUnmounted(() => observer?.disconnect())

const values = ref([])
const totalCommits = ref(0)
const loading = ref(true)
const error = ref(null)

const tooltipFormatter = (v) =>
  v.count === 0
    ? `No contributions on ${v.date}`
    : `${v.count} contribution${v.count > 1 ? 's' : ''} on ${v.date}`

async function fetchContributions() {
  loading.value = true
  error.value = null
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${props.username}?y=last`,
    )
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const json = await res.json()
    const contributions = json.contributions ?? []
    values.value = contributions.map((c) => ({ date: c.date, count: c.count }))
    totalCommits.value = contributions.reduce((s, c) => s + c.count, 0)
  } catch {
    error.value = 'Could not load contributions. Check username or network.'
  } finally {
    loading.value = false
  }
}

onMounted(fetchContributions)

const endDate = computed(() => new Date().toISOString().split('T')[0])
</script>

<template>
  <section class="gh-card">
    <h3 class="section-title">My GitHub Stats</h3>

    <p class="contrib-title">
      <template v-if="loading">Loading contributions…</template>
      <template v-else-if="error">Contribution graph</template>
      <template v-else>{{ totalCommits.toLocaleString() }} contributions in the last year</template>
    </p>

    <div v-if="loading" class="state-wrap">
      <span class="loader" />
    </div>

    <div v-else-if="error" class="state-wrap error-wrap">
      <p>{{ error }}</p>
      <button class="retry-btn" @click="fetchContributions">Retry</button>
    </div>

    <div v-else class="heatmap-scroll">
      <div class="heatmap-inner">
        <CalendarHeatmap
          :values="values"
          :end-date="endDate"
          :tooltip-formatter="tooltipFormatter"
          :range-color="rangeColor"
          :dark-mode="darkMode"
          :max="20"
          :round="2"
          class="heatmap"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
@reference 'tailwindcss';
.gh-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.72) 0%, rgba(255, 255, 255, 0.42) 100%);
  backdrop-filter: blur(20px) saturate(180%) brightness(1.05);
  -webkit-backdrop-filter: blur(20px) saturate(180%) brightness(1.05);
  border: 1px solid transparent;
  background-clip: padding-box;
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.1),
    0 2px 8px rgba(0, 0, 0, 0.06),
    inset 1px 1px 0 rgba(255, 255, 255, 0.9),
    inset -1px -1px 0 rgba(255, 255, 255, 0.2);
  outline: 1px solid rgba(255, 255, 255, 0.5);
  outline-offset: -1px;

  border-radius: 14px;
  padding: 1.25rem 1.5rem 1rem;
  max-width: 900px;
  margin: 0 auto;
  font-family: ui-sans-serif, system-ui, sans-serif;

  position: relative;
}

.gh-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 14px;
  background: linear-gradient(160deg, rgba(255, 255, 255, 0.55) 0%, rgba(255, 255, 255, 0) 40%);
  pointer-events: none;
  z-index: 0;
}

.gh-card > * {
  position: relative;
  z-index: 1;
}

:root.dark .gh-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.02) 100%);
  backdrop-filter: blur(20px) saturate(160%) brightness(0.95);
  -webkit-backdrop-filter: blur(20px) saturate(160%) brightness(0.95);

  outline: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.45),
    0 2px 8px rgba(0, 0, 0, 0.3),
    inset 1px 1px 0 rgba(255, 255, 255, 0.1),
    inset -1px -1px 0 rgba(0, 0, 0, 0.2);
}

:root.dark .gh-card::before {
  background: linear-gradient(160deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0) 45%);
}

.section-title {
  margin: 0 0 0.15rem;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: -0.3px;
  color: #1f2328;
}
:root.dark .section-title {
  color: #e6edf3;
}

.contrib-title {
  margin: 0 0 0.85rem;
  font-size: 0.8rem;
  font-weight: 400;
  color: #57606a;
}
:root.dark .contrib-title {
  color: #8b949e;
}

.state-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  padding: 2.5rem 0;
  font-size: 0.85rem;
  color: #57606a;
}
:root.dark .state-wrap {
  color: #8b949e;
}
.error-wrap {
  color: #cf222e;
}
:root.dark .error-wrap {
  color: #f85149;
}

.retry-btn {
  padding: 0.3rem 0.9rem;
  border-radius: 6px;
  border: 1px solid #cf222e;
  color: #cf222e;
  background: transparent;
  cursor: pointer;
  font-size: 0.75rem;
  transition: background 0.15s;
}
.retry-btn:hover {
  background: rgba(207, 34, 46, 0.08);
}
:root.dark .retry-btn {
  border-color: #f85149;
  color: #f85149;
}
:root.dark .retry-btn:hover {
  background: rgba(248, 81, 73, 0.08);
}

.heatmap-scroll {
  overflow-x: auto;
  overflow-y: visible;
  padding-bottom: 4px;
  scrollbar-width: thin;
  scrollbar-color: #d0d7de transparent;
}
:root.dark .heatmap-scroll {
  scrollbar-color: #30363d transparent;
}
.heatmap-scroll::-webkit-scrollbar {
  height: 5px;
}
.heatmap-scroll::-webkit-scrollbar-track {
  background: transparent;
}
.heatmap-scroll::-webkit-scrollbar-thumb {
  background: #d0d7de;
  border-radius: 10px;
}
:root.dark .heatmap-scroll::-webkit-scrollbar-thumb {
  background: #30363d;
}

.heatmap-inner {
  min-width: 660px;
}

.heatmap :deep(text.vch__month__label),
.heatmap :deep(text.vch__day__label) {
  fill: #57606a !important;
  font-size: 10px !important;
}
:root.dark .heatmap :deep(text.vch__month__label),
:root.dark .heatmap :deep(text.vch__day__label) {
  fill: #8b949e !important;
}

.heatmap :deep(.vch__legend) {
  justify-content: flex-end !important;
  gap: 4px;
  margin-top: 6px;
  font-size: 10px;
  color: #57606a;
}
:root.dark .heatmap :deep(.vch__legend) {
  color: #8b949e;
}

.heatmap :deep(.vch__legend div) {
  color: #57606a;
  font-size: 10px;
}
:root.dark .heatmap :deep(.vch__legend div) {
  color: #8b949e;
}

.heatmap :deep(.vch__legend-right) {
  margin-left: 0;
}

.heatmap :deep(.vch__legend-right .vch__legend) {
  display: flex;
  align-items: center;
  gap: 3px;
}

.loader {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid #d0d7de;
  border-top-color: #216e39;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
:root.dark .loader {
  border-color: #30363d;
  border-top-color: #39d353;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
