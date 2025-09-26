<template>
  <div class="w-full min-h-screen flex relative bg-stone-100">
    <div class="sidebar-wrapper flex-shrink-0 w-60 fixed top-0 left-0 z-10">
      <sidebar />
    </div>
    <div class="content-wrapper flex-1 ml-64 h-full">
      <Header />
      <div class="p-6">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/defaults/Header.vue'
import Sidebar from '@/components/defaults/Sidebar.vue'
</script>

<style scoped lang="scss"></style>
