<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
    <!-- Card Component (Standard HTML/Tailwind) -->
    <div class="w-full max-w-md bg-white dark:bg-gray-800 shadow-2xl rounded-2xl overflow-hidden">
      <!-- Header -->
      <div class="flex flex-col items-center text-center gap-4 p-8">
        <span class="text-6xl">🧭</span>
        <h1
          class="text-3xl font-bold text-gray-800 dark:text-gray-100"
          v-text="'Tournavel Admin'"
        />
        <p class="text-gray-500 dark:text-gray-400" v-text="'Panele erişmek için giriş yapın.'" />
      </div>

      <!-- Form Content -->
      <form @submit.prevent="handleLogin" class="px-8 pb-8">
        <div class="flex flex-col gap-6">
          <!-- Email Input -->
          <div>
            <label
              for="email"
              class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
              >Email</label
            >
            <input
              type="email"
              id="email"
              v-model="email"
              placeholder="ornek@adres.com"
              class="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition outline-0"
              required
            />
          </div>

          <!-- Password Input -->
          <div>
            <label
              for="password"
              class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
              >Şifre</label
            >
            <input
              type="password"
              id="password"
              v-model="password"
              placeholder="••••••••"
              class="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition outline-0"
              required
            />
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 cursor-pointer"
          >
            Giriş Yap
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')

const handleLogin = async () => {
  if (!email.value || !password.value) {
    alert('Lütfen email ve şifre alanlarını doldurun.')
    return
  }

  const payload = {
    Password: password.value,
    ProfileNameOrEmail: email.value,
  }

  const status = await authStore.Login(payload)
  console.log(status)
  if (status) {
    router.push('/')
  }
}
</script>

<style scoped>
/* Bu component artık harici kütüphane stiline ihtiyaç duymaz. */
</style>
