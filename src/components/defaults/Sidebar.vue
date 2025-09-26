<template>
  <div
    class="sidebar-wrapper w-[260px] bg-white h-full min-h-screen flex flex-col overflow-y-auto font-sans"
  >
    <div class="w-full gap-3 flex items-center px-2 h-24 border-b-2 border-b-gray-200">
      <img class="w-10 h-10" src="@/assets/icon.png" alt="Logo" />
      <span class="text-xl font-bold text-gray-800">Tournavel Admin</span>
    </div>

    <nav class="flex flex-col gap-2 p-3">
      <div v-for="menu in menus" :key="menu.name">
        <div
          class="flex items-center gap-3 cursor-pointer p-2.5 rounded-lg transition-all duration-200"
          @click="handleMenuClick(menu)"
          :class="getMenuItemClass(menu)"
        >
          <span class="w-5 h-5 text-center">
            <i :class="menu.icon" />
          </span>
          <span class="font-medium text-sm" v-text="menu.name" />
          <i
            v-if="menu.children"
            class="fa-solid fa-chevron-right ml-auto transition-transform duration-300 text-xs"
            :class="{ 'rotate-90': menu.isOpen }"
          />
        </div>

        <div
          v-if="menu.children && menu.isOpen"
          class="mt-2 ml-4 pl-4 flex flex-col gap-1 submenu-container"
        >
          <div
            v-for="child in menu.children"
            :key="child.name"
            class="submenu-item flex items-center gap-3 cursor-pointer p-2.5 rounded-lg transition-all duration-200"
            @click="handleMenuClick(child)"
            :class="getMenuItemClass(child)"
          >
            <span class="w-5 h-5 text-center">
              <i :class="child.icon" />
            </span>
            <span class="text-sm font-normal" v-text="child.name" />
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// Menü ve Rota Tanımlamaları
interface MenuItem {
  name: string
  icon: string
  route: string
  children?: MenuItem[]
  isOpen?: boolean // State'i doğrudan objeye ekliyoruz
}

const route = useRoute()
const router = useRouter()

// Başlangıç menü verisi
const initialMenus: MenuItem[] = [
  {
    name: 'Anasayfa',
    icon: 'fa-regular fa-house',
    route: '/',
  },
  {
    name: 'Kullanıcı İşlemleri',
    icon: 'fa-regular fa-users',
    route: '/users',
  },
  {
    name: 'Yönetim Paneli',
    icon: 'fa-regular fa-user-shield',
    route: '/admin',
  },
  {
    name: 'Kaynak Yönetimi',
    icon: 'fa-regular fa-folder-open',
    route: '/resource',
    isOpen: false, // Başlangıçta kapalı
    children: [
      {
        name: 'Seyahat Noktaları',
        icon: 'fa-regular fa-location-dot',
        route: '/resource/travel-point' 
      },
      {
        name: 'Etiketler',
        icon: 'fa-regular fa-tags',
        route: '/resource/tag-settings',
      },
      {
        name: 'Olanaklar',
        icon: 'fa-regular fa-list-check',
        route: '/resource/amenities',
      },
      {
        name: 'Ekipmanlar',
        icon: 'fa-regular fa-gear',
        route: '/resource/gear'
      }
    ],
  },
]

// Menü state'ini yönetmek için ref kullanıyoruz
const menus = ref<MenuItem[]>(initialMenus)

// Rota değiştiğinde aktif yolu reaktif olarak takip et
const currentPath = computed(() => route.path)

/**
 * Bir menü elemanının aktif olup olmadığını kontrol eder.
 * Alt menü elemanları aktif olduğunda parent'ı da aktif gösterir.
 */
const isMenuActive = (menu: MenuItem): boolean => {
  if (menu.children) {
    // Eğer parent menünün yoluyla başlıyorsa veya bir child aktifse, parent'ı aktif yap
    return (
      currentPath.value.startsWith(menu.route) ||
      menu.children.some((child) => child.route === currentPath.value)
    )
  }
  return menu.route === currentPath.value
}

/**
 * Menü elemanları için dinamik CSS sınıflarını döndürür.
 */
const getMenuItemClass = (menu: MenuItem): string => {
  if (isMenuActive(menu)) {
    return 'bg-indigo-700 text-white shadow-md'
  }
  return 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
}

/**
 * Menüye tıklandığında ilgili aksiyonu gerçekleştirir.
 * Alt menüsü varsa açar/kapatır, yoksa sayfaya yönlendirir.
 */
const handleMenuClick = (menuItem: MenuItem) => {
  if (menuItem.children) {
    // Alt menüsü olanlar için sadece aç/kapa
    menuItem.isOpen = !menuItem.isOpen
  } else {
    // Alt menüsü olmayanlar için sayfaya yönlendir
    router.push(menuItem.route)
  }
}
</script>

<style scoped>
/* Daha modern bir font ailesi için öneri */
.font-sans {
  font-family: 'Quicksand', sans-serif;
}

/* Sidebar scrollbar özelleştirme */
.sidebar-wrapper {
  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 #fff; /* bg-slate-300 ve beyaz */
}

.sidebar-wrapper::-webkit-scrollbar {
  width: 6px;
}

.sidebar-wrapper::-webkit-scrollbar-track {
  background: #fff;
}

.sidebar-wrapper::-webkit-scrollbar-thumb {
  background-color: #cbd5e1; /* bg-slate-300 */
  border-radius: 10px;
  border: 3px solid #fff;
}

/* Alt menüyü bağlayan L-şeklinde çizgiler */
.submenu-container {
  position: relative;
}

/* Dikey çizgi */
.submenu-container::before {
  content: '';
  position: absolute;
  left: 0;
  top: -8px; /* Üst menü elemanıyla boşluk bırakır */
  bottom: 10px; /* Son elemandan sonra bitirir */
  width: 2px;
  background-color: #e2e8f0; /* slate-200 */
  border-radius: 2px;
  z-index: 0;
}

/* Her alt menü elemanı için yatay çizgi */
.submenu-item {
  position: relative;
}

.submenu-item::before {
  content: '';
  position: absolute;
  left: -14px; /* Dikey çizgiye bağlar */
  top: 50%;
  transform: translateY(-50%);
  width: 14px;
  height: 2px;
  z-index: 0;
  background-color: #e2e8f0; /* slate-200 */
}
</style>
