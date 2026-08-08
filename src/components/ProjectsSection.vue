<script setup>
/* global document */
import { ref } from 'vue'
import piAnalytics from '@/assets/images/pi_analytics.webp'
import Microly from '@/assets/images/microly.webp'
import Firely from '@/assets/images/firely_banner.webp'

const selectedProject = ref(null)

function openModal(project) {
  selectedProject.value = project
  document.body.style.overflow = 'hidden'
}

function closeModal() {
  selectedProject.value = null
  document.body.style.overflow = ''
}

const projects = [
  {
    title: 'Firely - Create Custom Branded Short URLs Instantly (SPA)',
    description:
      'Firely is a branded URL shortener built with Vue.js and Laravel. It supports deep links, WhatsApp links with custom messages, and advanced targeting by location, device, and platform, along with pixel tracking. As a SaaS platform, it includes automated billing and a REST API with OpenAPI Specification support.',
    image: Firely,
    tags: [
      'Laravel 12',
      'Vue.js 3',
      'ViteJS',
      'TailwindCSS 4',
      'SaaS',
      'Multi Tenant',
      'Multi Domain',
      'Automotion',
      'OpenAPI',
    ],
    status: 'In Progress',
    liveUrl: null,
    modal: {
      description:
        'MindMap AI is an intelligent note-taking and mind-mapping tool designed to help you think clearly. It auto-summarizes long articles, generates smart tags using NLP, and visualizes connections between your notes in a beautiful interactive canvas.',
      features: [
        'Single-Page Application (SPA) for fast & smooth navigation',
        'Multi-tenant architecture for SaaS scalability.',
        'Custom domain support for branded short links.',
        'Multi-workspace support with team collaboration.',
        'Unlimited URL shortening with custom splash pages, link cloaking & link grouping.',
        'Custom slug & vanity URL support.',
        'Full REST API with developer documentation.',
        'Geo & device based targeting.',
        'WhatsApp link generation with custom messages & emoji support.',
        'Custom link preview (Open Graph) editor.',
        'Real-time URL diagnostics.',
        'Detailed click analytics & traffic insights.',
        'Link expiration & scheduling (date/time based).',
        'UTM parameter builder & campaign tracking.',
        'Custom analytics dashboard with exportable reports.',
        'Dynamic QR code generation.',
        'One-click social sharing.',
        'Responsive & intuitive UI design.',
        'Password protected links.',
        'Built-in spam detection.',
        'Multi-gateway payment support (PayPal, Stripe, Adyen, Razorpay, Paystack & more).',
        'Captcha integration (reCAPTCHA, hCaptcha & Cloudflare Turnstile).',
        'Auto managed GeoIP database updates, cleanup & data retention.',
        'Malware & phishing link detection.',
        'Team collaboration with permission levels.',
      ],
      liveUrl: 'https://firely.xyz',
    },
  },
  {
    title: 'Pi Analytics - Track Your Site Visitor',
    description:
      'Pi Analytics is a self-hosted PHP/MySQL web analytics tool that tracks website traffic using cookies and provides detailed visitor reports, including search engines, keywords, language, and popular pages. After a quick 5-minute setup, you receive a JavaScript tracking tag to install on your websites.',
    image: piAnalytics,
    tags: ['Laravel 12', 'Bootstrap', 'Multi Tenant', 'Multi Domain', 'SaaS'],
    status: 'Live',
    liveUrl: 'https://www.codester.com/items/44209/pi-analytics-track-your-site-visitor',
  },
  {
    title: 'Microly - Multi Tenant URL Shortener SaaS',
    description:
      'Microly is a URL management platform that lets you shorten links, target audiences by location, device, or platform, and track detailed analytics for each link. It also supports integration with services like Bitly, Rebrandly, TinyURL, Cuttly, BL.INK, and T2M, allowing you to manage everything directly from the Microly dashboard.',
    image: Microly,
    tags: ['Laravel 12', 'Bootstrap', 'Multi Tenant', 'Multi Domain', 'SaaS'],
    status: 'Live',
    liveUrl: 'https://www.codester.com/items/41712/microly-multi-tenant-url-shortener-saas',
  },
]
</script>

<template>
  <section id="projects" class="pt-16 px-4 font-sans pb-0">
    <!-- Header -->
    <div class="text-center mt-8 mb-10">
      <h2 class="text-3xl font-bold text-gray-900 dark:text-slate-100 mb-2">Personal Projects</h2>
      <div class="w-10 h-0.5 bg-gray-400 mx-auto rounded-full" />
      <p class="mt-3 text-sm text-gray-500 dark:text-gray-400">
        A few complete projects I've built from scratch.
      </p>
    </div>

    <!-- List -->
    <div class="max-w-xl mx-auto flex flex-col gap-8 pb-0">
      <article
        v-for="(project, index) in projects"
        :key="index"
        class="group bg-white dark:bg-slate-800/60 rounded-2xl overflow-hidden border border-gray-100 dark:border-slate-700/50 shadow-sm hover:shadow-xl dark:hover:shadow-slate-900/60 transition-all duration-400 hover:-translate-y-1 flex flex-col"
      >
        <!-- Image -->
        <div class="relative w-full overflow-hidden bg-gray-100 dark:bg-slate-700">
          <img
            :src="project.image"
            :alt="project.title"
            class="w-full h-auto object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />
          <span
            class="absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm"
            :class="
              project.status === 'Live'
                ? 'bg-emerald-500/90 text-white'
                : 'bg-amber-400/90 text-gray-900'
            "
          >
            {{ project.status }}
          </span>
          <span
            class="absolute bottom-3 left-3 text-4xl font-black text-white/20 leading-none select-none"
          >
            {{ String(index + 1).padStart(2, '0') }}
          </span>
        </div>

        <!-- Card Body -->
        <div class="flex flex-col flex-1 p-6">
          <h3 class="text-lg font-bold text-gray-900 dark:text-slate-100 mb-2 leading-snug">
            {{ project.title }}
          </h3>
          <p class="text-sm text-gray-500 dark:text-slate-400 leading-relaxed flex-1 mb-4">
            {{ project.description }}
          </p>

          <!-- Tech Tags -->
          <div class="flex flex-wrap gap-2 mb-5">
            <span
              v-for="tag in project.tags"
              :key="tag"
              class="text-xs font-medium px-2.5 py-1 rounded-lg bg-gradient-to-r from-stone-100 via-slate-50 to-slate-100 dark:from-slate-800 dark:via-gray-900 dark:to-slate-800 text-gray-600 dark:text-slate-300 border border-gray-200 dark:border-slate-600 select-all"
            >
              {{ tag }}
            </span>
          </div>

          <!-- Action -->
          <div
            class="flex items-center gap-3 mt-auto pt-4 border-t border-gray-100 dark:border-slate-700/60"
          >
            <!-- Direct link -->
            <a
              v-if="project.liveUrl"
              :href="project.liveUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-1.5 text-sm font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 transition-colors duration-200"
            >
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
                  d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6m0 0v6m0-6L10 14"
                />
              </svg>
              Live Demo
            </a>

            <!-- Modal -->
            <button
              v-else
              class="flex items-center gap-1.5 text-sm font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 transition-colors duration-200"
              @click="openModal(project)"
            >
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
                  d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20A10 10 0 0012 2z"
                />
              </svg>
              View Details
            </button>
          </div>
        </div>
      </article>
    </div>

    <!-- Modal Backdrop -->
    <Transition name="fade">
      <div
        v-if="selectedProject"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm cursor-pointer"
        @click.self="closeModal"
      >
        <!-- Modal Box -->
        <Transition name="slide-up">
          <div
            v-if="selectedProject"
            class="relative bg-white dark:bg-slate-900 rounded shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto cursor-auto [-webkit-overflow-scrolling:touch]"
          >
            <!-- Modal Image -->
            <div class="relative w-full overflow-hidden shrink-0">
              <img
                :src="selectedProject.image"
                :alt="selectedProject.title"
                class="w-full h-auto object-cover object-center"
                loading="eager"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

              <!-- Close Button -->
              <button
                class="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors duration-200 cursor-pointer"
                type="button"
                @click="closeModal"
              >
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <!-- Status -->
              <div class="absolute bottom-4 left-5">
                <span
                  class="text-xs font-semibold px-2.5 py-1 rounded-full mb-2 inline-block"
                  :class="
                    selectedProject.status === 'Live'
                      ? 'bg-emerald-500/90 text-white'
                      : 'bg-amber-400/90 text-gray-900'
                  "
                >
                  {{ selectedProject.status }}
                </span>
                <h3 class="text-2xl font-bold text-white leading-snug">
                  {{ selectedProject.title }}
                </h3>
              </div>
            </div>

            <!-- Modal Content -->
            <div class="p-6 space-y-5">
              <div>
                <h4
                  class="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-slate-500 mb-2"
                >
                  Description
                </h4>
                <p class="text-sm text-gray-600 dark:text-slate-300 leading-relaxed">
                  {{ selectedProject.modal.description }}
                </p>
              </div>

              <!-- Features -->
              <div>
                <h4
                  class="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-slate-500 mb-2"
                >
                  Key Features
                </h4>
                <ul class="space-y-1.5">
                  <li
                    v-for="feature in selectedProject.modal.features"
                    :key="feature"
                    class="flex items-start gap-2 text-sm text-gray-600 dark:text-slate-200"
                  >
                    <svg
                      class="w-4 h-4 mt-0.5 shrink-0 text-purple-500 dark:text-purple-400"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2.5"
                      viewBox="0 0 24 24"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {{ feature }}
                  </li>
                </ul>
              </div>

              <!-- Tech Stack -->
              <div>
                <h4
                  class="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-slate-500 mb-2"
                >
                  Tech Stack
                </h4>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="tag in selectedProject.tags"
                    :key="tag"
                    class="text-xs font-medium px-2.5 py-1 rounded-lg bg-gradient-to-r from-stone-100 via-slate-50 to-slate-100 dark:from-slate-800 dark:via-gray-900 dark:to-slate-800 text-gray-600 dark:text-slate-300 border border-gray-200 dark:border-slate-600 select-all"
                  >
                    {{ tag }}
                  </span>
                </div>
              </div>

              <!-- Live URL -->
              <div
                v-if="selectedProject.modal.liveUrl"
                class="pt-2 border-t border-stone-300 dark:border-slate-700/60"
              >
                <h4
                  class="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-slate-500 mb-2"
                >
                  Demo Live URL
                </h4>
                <a
                  :href="selectedProject.modal.liveUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-2 text-sm font-semibold text-indigo-500 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors duration-200"
                >
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
                      d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  {{ selectedProject.modal.liveUrl }}
                </a>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </section>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.slide-up-enter-active,
.slide-up-leave-active {
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}
.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(24px);
  opacity: 0;
}

/* Modal custom scrollbar */
.overflow-y-auto {
  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 transparent;
}
.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}
.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}
.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
  border-radius: 999px;
}
/* dark mode scrollbar */
@media (prefers-color-scheme: dark) {
  .overflow-y-auto {
    scrollbar-color: #475569 transparent;
  }

  .overflow-y-auto::-webkit-scrollbar-thumb {
    background-color: #475569;
  }
}
</style>
