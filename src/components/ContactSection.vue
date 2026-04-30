<script setup>
/* global hcaptcha, document, fetch, setTimeout */
import { ref, reactive, onMounted, nextTick, watch } from 'vue'
import { useDark } from '@vueuse/core'

const isDark = useDark()
const W3FORMS_ACCESS_KEY = '6a4caf78-6818-4abe-8844-bbaeacd26f94'

const form = reactive({ name: '', email: '', message: '' })
const errors = reactive({ name: '', email: '', message: '', captcha: '' })
const focusedField = ref(null)
const state = ref('idle')
const errorMsg = ref('')
let captchaWidgetId = null

function validate() {
  errors.name = form.name.trim() ? '' : 'Name is required.'
  errors.message = form.message.trim() ? '' : 'Message is required.'
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!form.email.trim()) {
    errors.email = 'Email is required.'
  } else if (!emailRe.test(form.email)) {
    errors.email = 'Please enter a valid email address.'
  } else {
    errors.email = ''
  }

  // hCaptcha validation
  const response = hcaptcha?.getResponse(captchaWidgetId)
  errors.captcha = response ? '' : 'Please complete the captcha verification.'

  return !errors.name && !errors.email && !errors.message && !errors.captcha
}

async function sendMessage() {
  if (state.value === 'error') state.value = 'idle'
  if (!validate()) return

  state.value = 'loading'
  errorMsg.value = ''

  const captchaResponse = hcaptcha?.getResponse(captchaWidgetId)

  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: W3FORMS_ACCESS_KEY,
        name: form.name,
        email: form.email,
        message: form.message,
        'h-captcha-response': captchaResponse,
      }),
    })

    const data = await res.json()

    if (data.success) {
      state.value = 'success'
      resetForm()
    } else {
      throw new Error(data.message || 'Submission failed.')
    }
  } catch (err) {
    state.value = 'error'
    errorMsg.value = err.message || 'Something went wrong. Please try again later.'
  }
}

function resetForm() {
  form.name = ''
  form.email = ''
  form.message = ''
  errors.name = ''
  errors.email = ''
  errors.message = ''
  errors.captcha = ''

  if (typeof hcaptcha !== 'undefined' && captchaWidgetId !== null) {
    hcaptcha.reset(captchaWidgetId)
  }
}

// Initialize hCaptcha properly
onMounted(async () => {
  await nextTick()

  const script = document.createElement('script')
  script.src = 'https://js.hcaptcha.com/1/api.js'
  script.async = true
  script.defer = true
  document.head.appendChild(script)

  // Initial render
  setTimeout(() => {
    const captchaContainer = document.querySelector('.h-captcha')
    if (captchaContainer && typeof hcaptcha !== 'undefined') {
      captchaWidgetId = hcaptcha.render(captchaContainer, {
        sitekey: '50b2fe65-b00b-4b9e-ad62-3ba471098be2',
        theme: isDark.value ? 'dark' : 'light',
        size: 'normal',
      })
    }
  }, 800)
})

// Re-render captcha when dark mode toggles
watch(isDark, () => {
  if (typeof hcaptcha === 'undefined' || captchaWidgetId === null) return

  const container = document.querySelector('.h-captcha')
  if (!container) return

  // Clear previous captcha
  container.innerHTML = ''

  // Re-render with updated theme
  nextTick(() => {
    captchaWidgetId = hcaptcha.render(container, {
      sitekey: '50b2fe65-b00b-4b9e-ad62-3ba471098be2',
      theme: isDark.value ? 'dark' : 'light',
      size: 'normal',
    })
  })
})
</script>

<template>
  <section id="skills" class="pt-16 px-4 font-sans">
    <!-- Header -->
    <div class="text-center mt-8 mb-10">
      <h2 class="text-3xl font-bold text-gray-900 dark:text-slate-100 mb-2">Contact</h2>
      <div class="w-10 h-0.5 bg-gray-400 mx-auto rounded-full" />
      <p class="mt-3 text-sm text-gray-500 dark:text-gray-400">
        Got an idea or just want to connect? Drop me a message.
      </p>
    </div>

    <!-- Contact Form -->
    <div class="max-w-2xl mx-auto mb-16">
      <Transition
        enter-active-class="transition-all duration-500"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-all duration-300"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
        mode="out-in"
      >
        <!-- Success -->
        <div
          v-if="state === 'success'"
          key="success"
          class="flex flex-col items-center justify-center gap-4 py-16 text-center"
        >
          <div
            class="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/40"
          >
            <svg
              class="h-8 w-8 text-emerald-500"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Message sent!</h3>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            Thanks for reaching out — I'll get back to you as soon as possible.
          </p>
        </div>

        <!--f form -->
        <div v-else key="form">
          <!-- Honeypot (W3Forms spam protection) -->
          <input
            type="checkbox"
            name="botcheck"
            class="hidden"
            style="display: none"
            tabindex="-1"
            autocomplete="off"
          />

          <!-- Name + Email row -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <!-- Name -->
            <div>
              <div class="relative">
                <label
                  :class="[
                    'absolute left-4 transition-all duration-200 pointer-events-none select-none z-10',
                    form.name || focusedField === 'name'
                      ? 'top-2 text-xs font-semibold tracking-widest uppercase text-purple-500 dark:text-amber-400'
                      : 'top-1/2 -translate-y-1/2 text-sm text-gray-400 dark:text-gray-500',
                  ]"
                  >Name</label
                >
                <input
                  v-model="form.name"
                  type="text"
                  name="name"
                  class="w-full pt-6 pb-2.5 px-4 rounded-xl outline-none bg-white dark:bg-white/5 border border-stone-300 dark:border-white/10 text-gray-900 dark:text-white text-sm transition-all duration-300 focus:border-purple-400/70 dark:focus:border-amber-500/50 backdrop-blur-sm"
                  @focus="focusedField = 'name'"
                  @blur="focusedField = null"
                />
              </div>
              <p v-if="errors.name" class="mt-1 ml-1 text-xs text-red-500">{{ errors.name }}</p>
            </div>

            <!-- Email -->
            <div>
              <div class="relative">
                <label
                  :class="[
                    'absolute left-4 transition-all duration-200 pointer-events-none select-none z-10',
                    form.email || focusedField === 'email'
                      ? 'top-2 text-xs font-semibold tracking-widest uppercase text-purple-500 dark:text-amber-400'
                      : 'top-1/2 -translate-y-1/2 text-sm text-gray-400 dark:text-gray-500',
                  ]"
                  >E-Mail</label
                >
                <input
                  v-model="form.email"
                  type="email"
                  name="email"
                  class="w-full pt-6 pb-2.5 px-4 rounded-xl outline-none bg-white dark:bg-white/5 border border-stone-300 dark:border-white/10 text-gray-900 dark:text-white text-sm transition-all duration-300 focus:border-purple-400/70 dark:focus:border-amber-500/50 backdrop-blur-sm"
                  @focus="focusedField = 'email'"
                  @blur="focusedField = null"
                />
              </div>
              <p v-if="errors.email" class="mt-1 ml-1 text-xs text-red-500">{{ errors.email }}</p>
            </div>
          </div>

          <!-- Message -->
          <div class="mb-5">
            <div class="relative">
              <label
                :class="[
                  'absolute left-4 transition-all duration-200 pointer-events-none select-none z-10',
                  form.message || focusedField === 'message'
                    ? 'top-2 text-xs font-semibold tracking-widest uppercase text-purple-500 dark:text-amber-400'
                    : 'top-4 text-sm text-gray-400 dark:text-gray-500',
                ]"
                >Message</label
              >
              <textarea
                v-model="form.message"
                name="message"
                rows="7"
                class="w-full pt-8 pb-3 px-4 rounded-xl outline-none resize-none bg-white dark:bg-white/5 border border-stone-300 dark:border-white/10 text-gray-900 dark:text-white text-sm leading-relaxed transition-all duration-300 focus:border-purple-400/70 dark:focus:border-amber-500/50 backdrop-blur-sm"
                @focus="focusedField = 'message'"
                @blur="focusedField = null"
              ></textarea>
            </div>
            <p v-if="errors.message" class="mt-1 ml-1 text-xs text-red-500">{{ errors.message }}</p>
          </div>

          <!-- Error banner -->
          <Transition
            enter-active-class="transition-all duration-300"
            enter-from-class="opacity-0 -translate-y-2"
            enter-to-class="opacity-100 translate-y-0"
          >
            <div
              v-if="state === 'error'"
              class="flex items-center gap-2 mb-4 px-4 py-3 rounded-xl bg-red-50/80 dark:bg-red-950/40 border border-red-200/60 dark:border-red-800/40 text-red-600 dark:text-red-400 text-sm"
            >
              <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                />
              </svg>
              {{ errorMsg }}
            </div>
          </Transition>

          <!-- hCaptcha -->
          <div class="my-6">
            <div
              class="h-captcha"
              data-sitekey="50b2fe65-b00b-4b9e-ad62-3ba471098be2"
              :data-theme="isDark ? 'dark' : 'light'"
              data-size="normal"
            ></div>
            <p v-if="errors.captcha" class="mt-1 ml-1 text-xs text-red-500">{{ errors.captcha }}</p>
          </div>

          <!-- Submit Button -->
          <button
            :disabled="state === 'loading'"
            class="w-full relative overflow-hidden py-4 px-6 rounded-xl font-semibold text-sm tracking-wide text-white bg-gradient-to-r from-purple-500 via-violet-500 to-purple-600 hover:from-purple-600 hover:via-violet-600 hover:to-purple-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 group dark:from-amber-400 dark:via-yellow-400 dark:to-amber-500 dark:hover:from-amber-500 dark:hover:via-yellow-500 dark:hover:to-amber-600 dark:shadow-amber-500/30 dark:hover:shadow-amber-500/50 dark:text-gray-900"
            @click="sendMessage"
          >
            <!-- Shimmer effect -->
            <span
              class="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-700 pointer-events-none"
            ></span>

            <span class="relative flex items-center justify-center gap-2">
              <template v-if="state === 'loading'">
                <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  />
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Sending...
              </template>
              <template v-else>
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Send Message
              </template>
            </span>
          </button>
        </div>
      </Transition>
    </div>
  </section>
</template>
