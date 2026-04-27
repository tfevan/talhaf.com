<template>
  <nav ref="navRef" class="fixed top-2 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-1rem)] md:w-fit">
    <div
      class="bg-white/75 dark:bg-amber-950/85 backdrop-blur-lg border border-amber-200/60 dark:border-amber-500/25 rounded-3xl px-6 h-16 flex items-center justify-between shadow-[0_8px_40px_-8px_rgb(180,140,0,0.35),0_-4px_20px_-5px_rgb(180,140,0,0.15),0_0_0_1px_rgb(180,140,0,0.08)] w-full md:w-fit gap-4"
    >
      <!-- Left: Logo -->
      <RouterLink
        to="/"
        active-class=""
        exact-active-class=""
        class="text-amber-900 dark:text-amber-400 text-xl font-bold tracking-tight shrink-0 w-fit !bg-transparent hover:!bg-transparent"
      >
        TALHA<span class="text-amber-600 dark:text-amber-500">F</span
        ><span class="text-amber-500">.</span>
      </RouterLink>

      <!-- Center: Nav Links -->
      <ul class="hidden md:flex items-center gap-1 justify-center flex-1 px-4">
        <li v-for="link in navLinks" :key="link.label">
          <RouterLink
            :to="link.to"
            class="group relative inline-flex flex-col items-center text-base px-4 pt-2 pb-2.5 transition-colors duration-300 whitespace-nowrap"
            :class="
              link.label === 'Contact'
                ? 'text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300'
                : $route.path === link.to
                  ? 'text-amber-900 dark:text-amber-300'
                  : 'text-amber-800 dark:text-amber-200/50 hover:text-amber-900 dark:hover:text-amber-200'
            "
            active-class=""
          >
            <span class="relative">
              <!-- invisible bold clone to reserve space, prevents layout shift -->
              <span class="invisible font-medium block h-0" aria-hidden="true">{{
                link.label
              }}</span>
              <span class="font-medium" :class="$route.path === link.to ? '' : 'font-normal'">{{
                link.label
              }}</span>
              <span
                v-if="link.label !== 'Contact'"
                class="absolute -bottom-1 left-0 h-px transition-all duration-300 bg-amber-500 dark:bg-amber-400"
                :class="
                  $route.path === link.to
                    ? 'w-full opacity-100'
                    : 'w-0 group-hover:w-full opacity-40'
                "
              />
            </span>
          </RouterLink>
        </li>
      </ul>

      <!-- Right: Social Links + Dark Mode -->
      <div class="flex items-center gap-3">
        <!-- Social Icons — desktop -->
        <a
          v-for="s in socialLinks"
          :key="s.label"
          :href="s.href"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="s.label"
          class="hidden md:block text-amber-800 dark:text-amber-500/80 hover:text-amber-600 dark:hover:text-amber-300 transition-colors p-2.5 rounded-full hover:bg-amber-100 dark:hover:bg-amber-900/50 shadow-inner shadow-amber-200/50 dark:shadow-amber-900/30 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path :d="s.icon" />
          </svg>
        </a>

        <!-- Divider — শুধু desktop এ -->
        <span class="hidden md:block w-px h-4 bg-amber-900/20 dark:bg-amber-500/20"></span>

        <!-- Dark Mode Toggle — সব জায়গায় -->
        <button
          class="text-amber-800 dark:text-amber-500/80 hover:text-amber-600 dark:hover:text-amber-300 transition-colors p-2.5 rounded-full hover:bg-amber-100 dark:hover:bg-amber-900/50 shadow-inner shadow-amber-200/50 dark:shadow-amber-900/30 cursor-pointer"
          aria-label="Toggle dark mode"
          @click="toggleDark()"
        >
          <svg
            v-if="isDark"
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        </button>

        <!-- Mobile Hamburger -->
        <button
          class="cursor-pointer md:hidden text-amber-700 dark:text-amber-500 hover:text-amber-900 dark:hover:text-amber-300 transition-colors p-1.5 rounded-full hover:bg-amber-100 dark:hover:bg-amber-500/10"
          aria-label="Toggle menu"
          @click="toggleMenu"
        >
          <svg
            v-if="!menuOpen"
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="menuOpen"
        class="md:hidden mt-2 w-full bg-white/90 dark:bg-amber-950/90 backdrop-blur-xl border border-amber-200/50 dark:border-amber-500/20 rounded-2xl px-4 py-3 shadow-2xl"
      >
        <ul class="flex flex-col gap-1 py-0 my-0">
          <li v-for="link in navLinks" :key="link.label" class="flex items-center justify-center">
            <RouterLink
              :to="link.to"
              class="flex items-center justify-center w-full text-base px-4 h-11 rounded-full transition-all duration-300 leading-none"
              :class="
                link.label === 'Resume' || link.label === 'Contact'
                  ? 'text-amber-600 dark:text-amber-400 font-semibold hover:bg-amber-100 dark:hover:bg-amber-500/10'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-amber-900 dark:hover:text-amber-200 hover:bg-amber-100 dark:hover:bg-amber-500/10'
              "
              active-class="!text-amber-900 dark:!text-white !bg-amber-100 dark:!bg-amber-500/20 shadow-sm ring-1 ring-amber-200 dark:ring-amber-500/30"
              @click="menuOpen = false"
            >
              {{ link.label }}
            </RouterLink>
          </li>
        </ul>

        <!-- Social Icons — mobile -->
        <div
          class="flex items-center justify-center gap-2 px-4 pt-3 mt-2 border-t border-amber-200/30 dark:border-amber-500/20"
        >
          <a
            v-for="s in socialLinks"
            :key="s.label"
            :href="s.href"
            target="_blank"
            rel="noopener noreferrer"
            class="text-amber-700 dark:text-amber-500/80 hover:text-amber-500 transition-colors p-2.5 rounded-full hover:bg-amber-100 dark:hover:bg-amber-500/10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path :d="s.icon" />
            </svg>
          </a>
        </div>
      </div>
    </Transition>
  </nav>
</template>
