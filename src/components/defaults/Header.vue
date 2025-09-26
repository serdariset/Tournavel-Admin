<template>
	<header class="w-full h-24 flex items-center justify-between px-6 border-2  bg-white border-gray-200">
		<div class="flex items-center gap-3">
			<n-icon size="28" class="text-indigo-600">
				<i class="fa-solid fa-compass"></i>
			</n-icon>
			<span class="font-bold text-lg tracking-wide text-stone-800">{{ router.meta.name }}</span>
		</div>
	</header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { NButton, NIcon, NDropdown, NAvatar, NSwitch } from 'naive-ui'

const router = useRoute()
const isDark = ref(false)
const userOptions = [
	{ label: 'Profilim', key: 'profile' },
	{ label: 'Çıkış Yap', key: 'logout' }
]
</script>

<style scoped>
/* Ekstra stiller gerekirse buraya ekleyebilirsin */
</style>
