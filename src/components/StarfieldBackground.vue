<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'

const props = defineProps({
  starCount: { type: Number, default: 220 },
  isDark: { type: Boolean, default: true },
})

/* global window, requestAnimationFrame, cancelAnimationFrame */

const canvas = ref(null)
let ctx = null
let animationId = null
let stars = []
let shootingStars = []
let lastShoot = 0

function randomBetween(a, b) {
  return a + Math.random() * (b - a)
}

function randomStarColor(isDark) {
  if (isDark) {
    const colors = [
      'rgba(255,255,255,',
      'rgba(200,220,255,',
      'rgba(255,240,200,',
      'rgba(180,255,255,',
      'rgba(255,200,230,',
    ]
    return colors[Math.floor(Math.random() * colors.length)]
  } else {
    const colors = [
      'rgba(120,120,200,',
      'rgba(140,100,210,',
      'rgba(100,140,220,',
      'rgba(160,110,200,',
      'rgba(110,160,215,',
    ]
    return colors[Math.floor(Math.random() * colors.length)]
  }
}

function initStars() {
  const { width, height } = canvas.value
  stars = []

  const groupCount = Math.floor(props.starCount / 3)

  for (let i = 0; i < groupCount; i++) {
    const baseX = Math.random() * width
    const baseY = Math.random() * height
    const sharedDriftX = randomBetween(-0.008, 0.008)
    const sharedDriftY = randomBetween(-0.004, 0.004)

    const count = Math.floor(randomBetween(2, 4))
    for (let j = 0; j < count; j++) {
      stars.push({
        x: baseX + randomBetween(-40, 40),
        y: baseY + randomBetween(-40, 40),
        radius: props.isDark ? randomBetween(1.0, 2.5) : randomBetween(1.5, 3.0),
        baseAlpha: props.isDark ? randomBetween(0.4, 1) : randomBetween(0.7, 1),
        alpha: 0,
        twinkleSpeed: randomBetween(0.004, 0.02),
        twinkleOffset: Math.random() * Math.PI * 2,
        driftX: sharedDriftX,
        driftY: sharedDriftY,
        color: randomStarColor(props.isDark),
      })
    }
  }
}

function spawnShootingStar() {
  const { width, height } = canvas.value
  shootingStars.push({
    x: randomBetween(0, width * 0.8),
    y: randomBetween(0, height * 0.4),
    length: randomBetween(80, 180),
    speed: randomBetween(7, 15),
    alpha: 1,
    angle: randomBetween(20, 40) * (Math.PI / 180),
    life: 1,
  })
}

function maybeSpawnShootingStar(now) {
  if (now - lastShoot > randomBetween(3000, 7000)) {
    lastShoot = now
    spawnShootingStar()
  }
}

function resize() {
  if (!canvas.value) return
  canvas.value.width = window.innerWidth
  canvas.value.height = window.innerHeight
  initStars()
}

function draw(now) {
  if (!canvas.value || !ctx) return
  const { width, height } = canvas.value
  ctx.clearRect(0, 0, width, height)

  stars.forEach((s) => {
    s.twinkleOffset += s.twinkleSpeed
    s.alpha = s.baseAlpha * (0.45 + 0.55 * Math.sin(s.twinkleOffset))

    s.x += s.driftX
    s.y += s.driftY
    if (s.x < 0) s.x = width
    if (s.x > width) s.x = 0
    if (s.y < 0) s.y = height
    if (s.y > height) s.y = 0

    // Glow for bigger stars
    if (s.radius > 1.3) {
      const grd = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.radius * 5)
      grd.addColorStop(0, s.color + s.alpha * 0.6 + ')')
      grd.addColorStop(1, s.color + '0)')
      ctx.beginPath()
      ctx.arc(s.x, s.y, s.radius * 5, 0, Math.PI * 2)
      ctx.fillStyle = grd
      ctx.fill()
    }

    ctx.beginPath()
    ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2)
    ctx.fillStyle = s.color + s.alpha + ')'
    ctx.fill()
  })

  // Shooting stars (dark mode only)
  if (props.isDark) {
    maybeSpawnShootingStar(now)
    shootingStars = shootingStars.filter((ss) => ss.alpha > 0)
    shootingStars.forEach((ss) => {
      ss.x += ss.speed * Math.cos(ss.angle)
      ss.y += ss.speed * Math.sin(ss.angle)
      ss.life -= 0.02
      ss.alpha = Math.max(0, ss.life)
      const tailX = ss.x - ss.length * Math.cos(ss.angle)
      const tailY = ss.y - ss.length * Math.sin(ss.angle)
      const grad = ctx.createLinearGradient(tailX, tailY, ss.x, ss.y)
      grad.addColorStop(0, `rgba(255,255,255,0)`)
      grad.addColorStop(1, `rgba(255,255,255,${ss.alpha})`)
      ctx.beginPath()
      ctx.moveTo(tailX, tailY)
      ctx.lineTo(ss.x, ss.y)
      ctx.strokeStyle = grad
      ctx.lineWidth = 1.5
      ctx.stroke()
    })
  }

  animationId = requestAnimationFrame(draw)
}

// Re-color stars when mode switches
watch(
  () => props.isDark,
  () => {
    if (canvas.value) initStars()
  },
)

onMounted(() => {
  ctx = canvas.value.getContext('2d')
  resize()
  window.addEventListener('resize', resize)
  animationId = requestAnimationFrame(draw)
})

onUnmounted(() => {
  window.removeEventListener('resize', resize)
  cancelAnimationFrame(animationId)
})
</script>

<template>
  <div class="starfield-wrapper" :class="isDark ? 'mode-dark' : 'mode-light'">
    <canvas ref="canvas" class="starfield-canvas"></canvas>
    <div class="nebula-layer">
      <div v-for="n in 6" :key="n" class="nebula-cloud" :class="`nebula-${n}`"></div>
    </div>

    <div class="content-layer">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.starfield-wrapper {
  position: relative;
  min-height: 100vh;
  overflow-x: hidden;
  transition: background 0.5s ease;
}

.mode-dark {
  background: #030712;
}
.mode-light {
  background: #fafbff;
}

/* ── Canvas: fixed viewport background, lowest z-index ── */
.starfield-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  pointer-events: none;
}

/* ── Nebula: fixed, above canvas, below content ── */
.nebula-layer {
  position: fixed;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}

.nebula-cloud {
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
  animation: nebulaFloat linear infinite;
}

/* Dark mode nebula */
.mode-dark .nebula-1 {
  background: radial-gradient(ellipse, #4f46e5, transparent 70%);
  opacity: 0.14;
}
.mode-dark .nebula-2 {
  background: radial-gradient(ellipse, #7c3aed, transparent 70%);
  opacity: 0.11;
}
.mode-dark .nebula-3 {
  background: radial-gradient(ellipse, #0ea5e9, transparent 70%);
  opacity: 0.1;
}
.mode-dark .nebula-4 {
  background: radial-gradient(ellipse, #ec4899, transparent 70%);
  opacity: 0.09;
}
.mode-dark .nebula-5 {
  background: radial-gradient(ellipse, #06b6d4, transparent 70%);
  opacity: 0.08;
}
.mode-dark .nebula-6 {
  background: radial-gradient(ellipse, #6366f1, transparent 70%);
  opacity: 0.11;
}

/* Light mode nebula (pastel, more visible) */
.mode-light .nebula-1 {
  opacity: 0.12;
}
.mode-light .nebula-2 {
  opacity: 0.1;
}
.mode-light .nebula-3 {
  opacity: 0.09;
}
.mode-light .nebula-4 {
  opacity: 0.08;
}
.mode-light .nebula-5 {
  opacity: 0.07;
}
.mode-light .nebula-6 {
  opacity: 0.09;
}

/* Sizes & positions (shared) */
.nebula-1 {
  width: 650px;
  height: 420px;
  top: -100px;
  left: -100px;
  animation-duration: 38s;
  animation-delay: 0s;
}
.nebula-2 {
  width: 520px;
  height: 360px;
  top: 5%;
  right: -80px;
  animation-duration: 52s;
  animation-delay: -12s;
}
.nebula-3 {
  width: 700px;
  height: 320px;
  bottom: 25%;
  left: 8%;
  animation-duration: 45s;
  animation-delay: -20s;
}
.nebula-4 {
  width: 420px;
  height: 420px;
  bottom: -80px;
  right: 12%;
  animation-duration: 60s;
  animation-delay: -30s;
}
.nebula-5 {
  width: 380px;
  height: 260px;
  top: 38%;
  left: 38%;
  animation-duration: 70s;
  animation-delay: -5s;
}
.nebula-6 {
  width: 560px;
  height: 310px;
  top: 62%;
  right: 28%;
  animation-duration: 55s;
  animation-delay: -40s;
}

@keyframes nebulaFloat {
  0% {
    transform: translate(0, 0) scale(1);
  }
  25% {
    transform: translate(28px, -18px) scale(1.04);
  }
  50% {
    transform: translate(-18px, 28px) scale(0.97);
  }
  75% {
    transform: translate(18px, 14px) scale(1.03);
  }
  100% {
    transform: translate(0, 0) scale(1);
  }
}

/* ──────────────────────────────────────────────────────────
   MOST IMPORTANT: content-layer z-index: 2
   এটা না থাকলে তারা component এর পেছনে দেখা যায় না।
   কিন্তু child component গুলোর background transparent রাখতে হবে!
   ────────────────────────────────────────────────────────── */
.content-layer {
  position: relative;
  z-index: 2;
  min-height: 100vh;
}
</style>
