<script setup>
import { ref, reactive } from 'vue'

const ACCESS_KEY = '6a4caf78-6818-4abe-8844-bbaeacd26f94'

const form = reactive({
  name: '',
  email: '',
  message: '',
})

const state = ref('idle')
const errorMsg = ref('')
const focusedField = ref(null)

async function sendMessage() {
  if (!form.name || !form.email || !form.message) {
    errorMsg.value = 'Please fill in all fields.'
    state.value = 'error'
    return
  }

  state.value = 'loading'
  errorMsg.value = ''

  try {
    const payload = new FormData()
    payload.append('access_key', ACCESS_KEY)
    payload.append('name', form.name)
    payload.append('email', form.email)
    payload.append('message', form.message)

    const res = await fetch('https://api.w3forms.com/submit', {
      method: 'POST',
      body: payload,
    })

    const data = await res.json()

    if (data.success) {
      state.value = 'success'
      form.name = ''
      form.email = ''
      form.message = ''
    } else {
      throw new Error(data.message || 'Submission failed.')
    }
  } catch (err) {
    errorMsg.value = err.message || 'Something went wrong. Please try again.'
    state.value = 'error'
  }
}
</script>

<template>
  <section id="contact" class="px-5 py-12 md:px-10 md:py-16 lg:px-32 xl:px-48">
    <!-- Header -->
    <div class="mt-8 text-center mb-12">
      <h2
        class="text-outlined text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight"
      >
        Contact
      </h2>
      <p
        class="text-outlined text-gray-500 dark:text-gray-400 text-base md:text-lg leading-relaxed mx-auto"
      >
        I'll respond within 12 hours. Let's build something great together.
      </p>
    </div>

    <div class="relative flex items-center justify-center px-4 mb-8">
      <!-- Card -->
      <div
        class="relative w-full max-w-4xl rounded-3xl border border-white/40 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-2xl shadow-2xl p-10 md:p-14 transition-all duration-500"
      >
        <Transition
          enter-active-class="transition-all duration-700 ease-out"
          enter-from-class="opacity-0 scale-95 translate-y-4"
          enter-to-class="opacity-100 scale-100 translate-y-0"
        >
          <div
            v-if="state === 'success'"
            class="flex flex-col items-center justify-center gap-5 py-16 text-center"
          >
            <div class="relative flex items-center justify-center w-20 h-20">
              <div
                class="absolute inset-0 rounded-full bg-emerald-500/20 dark:bg-emerald-400/10 animate-ping"
              ></div>
              <div
                class="relative flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 shadow-lg"
              >
                <svg
                  class="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <div>
              <p class="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Your mail sent successfully!
              </p>
              <p class="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-xs mx-auto">
                I will respond to you within
                <span class="font-semibold text-purple-500 dark:text-purple-400">12 hours</span>.
                Thank you for reaching out!
              </p>
            </div>
          </div>
        </Transition>

        <!-- Form -->
        <Transition
          enter-active-class="transition-all duration-500"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="transition-all duration-300"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div v-if="state !== 'success'">
            <!-- Name + Email row -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <!-- Name -->
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
                  class="w-full pt-6 pb-2.5 px-4 rounded-xl outline-none bg-white/60 dark:bg-white/5 border border-gray-200/80 dark:border-white/10 text-gray-900 dark:text-white text-sm transition-all duration-300 focus:border-purple-400/70 dark:focus:border-amber-500/50 backdrop-blur-sm"
                  @focus="focusedField = 'name'"
                  @blur="focusedField = null"
                />
              </div>

              <!-- Email -->
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
                  class="w-full pt-6 pb-2.5 px-4 rounded-xl outline-none bg-white/60 dark:bg-white/5 border border-gray-200/80 dark:border-white/10 text-gray-900 dark:text-white text-sm transition-all duration-300 focus:border-purple-400/70 dark:focus:border-amber-500/50 backdrop-blur-sm"
                  @focus="focusedField = 'email'"
                  @blur="focusedField = null"
                />
              </div>
            </div>

            <!-- Message -->
            <div class="relative mb-5">
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
                rows="7"
                class="w-full pt-8 pb-3 px-4 rounded-xl outline-none resize-none bg-white/60 dark:bg-white/5 border border-gray-200/80 dark:border-white/10 text-gray-900 dark:text-white text-sm leading-relaxed transition-all duration-300 focus:border-purple-400/70 dark:focus:border-amber-500/50 backdrop-blur-sm"
                @focus="focusedField = 'message'"
                @blur="focusedField = null"
              ></textarea>
            </div>

            <!-- Error -->
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

            <!-- Submit Button -->
            <button
              :disabled="state === 'loading'"
              class="w-full relative overflow-hidden py-4 px-6 rounded-xl font-semibold text-sm tracking-wide text-white bg-gradient-to-r from-purple-500 via-violet-500 to-purple-600 hover:from-purple-600 hover:via-violet-600 hover:to-purple-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 group dark:from-amber-400 dark:via-yellow-400 dark:to-amber-500 dark:hover:from-amber-500 dark:hover:via-yellow-500 dark:hover:to-amber-600 dark:shadow-amber-500/30 dark:hover:shadow-amber-500/50 dark:text-gray-900"
              @click="sendMessage"
            >
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

            <p class="mt-4 text-center text-xs text-gray-400 dark:text-gray-600">
              🔒 Your data is safe. I will never share your information.
            </p>
          </div>
        </Transition>
      </div>
    </div>
  </section>
</template>
