<script setup>
import { ref, computed } from 'vue'

import {
  PhpIcon,
  LaravelIcon,
  JavaScriptIcon,
  VueIcon,
  NuxtIcon,
  NodeIcon,
  HtmlIcon,
  CssIcon,
  TailwindCssIcon,
  MariaDbIcon,
  MySqlIcon,
  PostgresIcon,
  RedisIcon,
  MemcachedIcon,
  MongoDbIcon,
  RestIcon,
  GitIcon,
  OpenApiIcon,
  GraphQlIcon,
  SwaggerIcon,
  PostmanIcon,
  VsCodeIcon,
  AwsIcon,
  LinuxIcon,
  VercelIcon,
  CloudflareIcon,
  CiCdIcon,
  ApacheIcon,
  NginxIcon,
  BootstrapIcon,
} from '@/components/icons/skills'

const activeTab = ref('all')

const tabs = [
  { id: 'all', label: 'All' },
  { id: 'code', label: 'Code' },
  { id: 'database', label: 'Database' },
  { id: 'api', label: 'API' },
  { id: 'tools', label: 'Tools' },
]

const skills = [
  // code
  { name: 'PHP', icon: PhpIcon, category: 'code' },
  { name: 'Laravel', icon: LaravelIcon, category: 'code' },
  { name: 'JavaScript', icon: JavaScriptIcon, category: 'code' },
  { name: 'Vue.js', icon: VueIcon, category: 'code' },
  { name: 'Nuxt.js', icon: NuxtIcon, category: 'code' },
  { name: 'Node.js', icon: NodeIcon, category: 'code' },
  { name: 'HTML5', icon: HtmlIcon, category: 'code' },
  { name: 'CSS3', icon: CssIcon, category: 'code' },
  { name: 'Bootstrap', icon: BootstrapIcon, category: 'code' },
  { name: 'TailwindCSS', icon: TailwindCssIcon, category: 'code' },
  // database
  { name: 'MariaDB', icon: MariaDbIcon, category: 'database' },
  { name: 'MySQL', icon: MySqlIcon, category: 'database' },
  { name: 'PostgreSQL', icon: PostgresIcon, category: 'database' },
  { name: 'Redis', icon: RedisIcon, category: 'database' },
  { name: 'Memcached', icon: MemcachedIcon, category: 'database' },
  { name: 'MongoDB', icon: MongoDbIcon, category: 'database' },
  // API
  { name: 'REST API', icon: RestIcon, category: 'api' },
  { name: 'GraphQL', icon: GraphQlIcon, category: 'api' },
  { name: 'OpenAPI', icon: OpenApiIcon, category: 'api' },
  { name: 'Swagger', icon: SwaggerIcon, category: 'api' },
  { name: 'Postman', icon: PostmanIcon, category: 'api' },
  // Tools
  { name: 'Git', icon: GitIcon, category: 'tools' },
  { name: 'VS Code', icon: VsCodeIcon, category: 'tools' },
  { name: 'AWS', icon: AwsIcon, category: 'tools' },
  { name: 'Linux', icon: LinuxIcon, category: 'tools' },
  { name: 'Vercel', icon: VercelIcon, category: 'tools' },
  { name: 'Cloudflare', icon: CloudflareIcon, category: 'tools' },
  { name: 'CI/CD', icon: CiCdIcon, category: 'tools' },
  { name: 'Apache', icon: ApacheIcon, category: 'tools' },
  { name: 'Nginx', icon: NginxIcon, category: 'tools' },
]

const filteredSkills = computed(() =>
  activeTab.value === 'all' ? skills : skills.filter((s) => s.category === activeTab.value),
)
</script>

<template>
  <section id="skills" class="py-16 px-4 font-sans">
    <!-- Header -->
    <div class="text-center mt-8 mb-10">
      <h2 class="text-3xl font-bold text-gray-900 dark:text-slate-100 mb-2">Skills</h2>
      <div class="w-10 h-0.5 bg-gray-400 mx-auto rounded-full" />
      <p class="mt-3 text-sm text-gray-500 dark:text-gray-400">
        Technologies and tools I work with
      </p>
    </div>

    <!-- Filter Tabs -->
    <div class="flex flex-wrap justify-center gap-2 mb-10">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        :class="[
          'text-sm font-medium px-3 py-1.5 border-b-2 transition-all duration-150 cursor-pointer bg-transparent',
          activeTab === tab.id
            ? 'border-gray-600 dark:border-gray-100 text-gray-950 dark:text-white'
            : 'border-transparent text-gray-700 dark:text-gray-400 hover:text-gray-900 hover:border-gray-400 dark:hover:text-gray-200',
        ]"
        @click="activeTab = tab.id"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Skills Grid -->
    <div class="max-w-2xl mx-auto">
      <TransitionGroup
        name="skill-list"
        tag="div"
        class="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 gap-3 relative"
      >
        <div
          v-for="skill in filteredSkills"
          :key="skill.name"
          class="group flex flex-col items-center gap-2 py-3.5 px-2 rounded-xl border border-gray-200 dark:border-white/5 bg-gradient-to-br from-white via-gray-50/40 to-amber-100/30 dark:from-gray-800 dark:via-slate-900 dark:to-neutral-800 shadow-sm hover:shadow-md hover:shadow-amber-100 dark:hover:shadow-amber-900/20 hover:border-amber-400 dark:hover:border-amber-400/60 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
        >
          <div
            class="w-8 h-8 flex items-center justify-center dark:text-white group-hover:scale-120 transition-transform duration-400"
          >
            <component :is="skill.icon" class="w-7 h-7" />
          </div>
          <span
            class="text-[0.70rem] font-medium text-center text-gray-600 dark:text-gray-300 group-hover:text-amber-500 leading-tight transition-colors duration-200"
          >
            {{ skill.name }}
          </span>
        </div>
      </TransitionGroup>
    </div>
  </section>
</template>

<style scoped>
.skill-list-enter-active {
  transition: all 0.25s ease;
}
.skill-list-leave-active {
  transition: all 0.15s ease;
  position: absolute;
}
.skill-list-enter-from {
  opacity: 0;
  transform: scale(0.88);
}
.skill-list-leave-to {
  opacity: 0;
  transform: scale(0.88);
}
.skill-list-move {
  transition: transform 0.25s ease;
}
</style>
