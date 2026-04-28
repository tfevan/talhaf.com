<script setup>
import { ref } from 'vue'

const form = ref({
  name: '',
  email: '',
  message: '',
})

const loading = ref(false)
const success = ref(false)
const error = ref(null)

const ACCESS_KEY = 'YOUR_ACCESS_KEY_HERE'

async function submitForm() {
  error.value = null
  success.value = false
  loading.value = true

  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: ACCESS_KEY,
        name: form.value.name,
        email: form.value.email,
        message: form.value.message,
      }),
    })

    const data = await res.json()

    if (data.success) {
      success.value = true
      form.value = { name: '', email: '', message: '' }
    } else {
      error.value = 'Something went wrong. Try again.'
    }
  } catch (e) {
    error.value = 'Network error. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <section id="contact">
    <div class="mt-4 px-6 py-20 md:px-12 lg:px-32 bg-white dark:bg-black transition-colors">
      <div class="max-w-3xl mx-auto">
        <!-- Header -->
        <div class="text-center mb-12">
          <h2
            class="text-outlined text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight"
          >
            Contact Me
          </h2>
          <p
            class="text-outlined text-gray-500 dark:text-gray-400 text-base md:text-lg leading-relaxed mx-auto"
          >
            Let's build something exceptional together.
          </p>
        </div>

        <!-- Card -->
        <div class="relative p-[1px] rounded-2xl">
          <div
            class="rounded-2xl p-8 md:p-10 shadow-2xl backdrop-blur-xl bg-white dark:bg-[#0b0b0b]"
          >
            <form class="space-y-6" @submit.prevent="submitForm">
              <!-- Name + Email (Responsive Grid) -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Name -->
                <div>
                  <label class="text-sm font-medium text-black dark:text-yellow-500"> Name </label>
                  <input
                    v-model="form.name"
                    type="text"
                    required
                    placeholder="Your name"
                    class="mt-2 w-full px-4 py-3 rounded-xl bg-white dark:bg-black/60 border border-purple-500/40 dark:border-yellow-500/20 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-purple-600 dark:focus:border-yellow-400 focus:ring-2 focus:ring-purple-500/30 dark:focus:ring-yellow-500/30 transition-all"
                  />
                </div>

                <!-- Email -->
                <div>
                  <label class="text-sm font-medium text-black dark:text-yellow-500"> Email </label>
                  <input
                    v-model="form.email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    class="mt-2 w-full px-4 py-3 rounded-xl bg-white dark:bg-black/60 border border-purple-500/40 dark:border-yellow-500/20 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-purple-600 dark:focus:border-yellow-400 focus:ring-2 focus:ring-purple-500/30 dark:focus:ring-yellow-500/30 transition-all"
                  />
                </div>
              </div>

              <!-- Message -->
              <div>
                <label class="text-sm font-medium text-black dark:text-yellow-500"> Message </label>
                <textarea
                  v-model="form.message"
                  rows="5"
                  required
                  placeholder="Write your message..."
                  class="mt-2 w-full px-4 py-3 rounded-xl bg-white dark:bg-black/60 border border-purple-500/40 dark:border-yellow-500/20 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-purple-600 dark:focus:border-yellow-400 focus:ring-2 focus:ring-purple-500/30 dark:focus:ring-yellow-500/30 transition-all"
                />
              </div>

              <!-- Button -->
              <button
                type="submit"
                :disabled="loading"
                class="w-full py-3 rounded-xl font-semibold text-white dark:text-black bg-purple-600 hover:bg-purple-700 dark:bg-gradient-to-r dark:from-yellow-400 dark:via-amber-500 dark:to-yellow-600 dark:hover:brightness-110 transition-all duration-300 shadow-lg shadow-purple-500/20 dark:shadow-yellow-500/20 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <span v-if="loading">Sending...</span>
                <span v-else>Send Message</span>
              </button>

              <!-- Success -->
              <p v-if="success" class="text-green-500 text-sm text-center">
                ✅ Message sent successfully!
              </p>

              <!-- Error -->
              <p v-if="error" class="text-red-500 text-sm text-center">❌ {{ error }}</p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
