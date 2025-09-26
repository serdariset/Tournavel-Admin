<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-dialog-provider>
      <n-message-provider>
        <main-layout v-if="isMainLayout" />
        <auth-layout v-else />
      </n-message-provider>
    </n-dialog-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import MainLayout from '@/layouts/MainLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import { NConfigProvider, NDialogProvider, NMessageProvider, GlobalThemeOverrides } from 'naive-ui'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const isMainLayout = computed(() => route.meta.isMain)

const themeOverrides: GlobalThemeOverrides = {
  common: {
    fontFamily: 'Quicksand sans-serif',
  },
  DataTable: {
    borderRadius: '10px',
    thColor: '#475569',
    thTextColor: '#ffffff',
    tdColorHover: '#f1f5f9',
    tdColorStriped: '#fafafa',
    tdColor: '#fff',
    thFontWeight: '700',
    common: {
      fontWeight: 'bold',
    },
  },
  Form: {
    labelFontWeight: 'bold',
  },
  Drawer: {
    titleFontWeight: 'bold',
  },
  Button: {
    borderRadiusMedium: '10px',
  }
  
}
</script>

<style>
.n-data-table td {
  font-weight: bold;
}
</style>
