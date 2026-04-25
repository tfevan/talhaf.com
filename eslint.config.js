import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import vueConfigPrettier from '@vue/eslint-config-prettier'

export default [
  {
    ignores: ['node_modules', 'dist'],
  },

  js.configs.recommended,

  ...pluginVue.configs['flat/recommended'],

  vueConfigPrettier,

  {
    rules: {
      'vue/no-mutating-props': 'error',
      'no-unused-vars': 'warn',
    },
  },
]
