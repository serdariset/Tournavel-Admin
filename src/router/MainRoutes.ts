import { RouteRecordRaw } from 'vue-router'

const MainRoutes: RouteRecordRaw[] = [
  {
    name: 'home-page',
    path: '/',
    component: () => import('@/views/main/Home.vue'),
    meta: {
      isMain: true,
      name: 'Anasayfa'
    },
  },
  {
    path: '/resource',
    meta: {
      isMain: true,
      name: 'Kaynaklar'
    },
    children: [
      {
        path: 'travel-point',
        component: () => import('@/views/main/resource/travel-point/TravelPoint.vue'),
        meta: {
          isMain: true,
          name: 'Seyahat Noktaları'
        }
      },
      {
        path: 'tag-settings',
        component: () => import('@/views/main/resource/tag/TagSettings.vue'),
        meta: {
          isMain: true,
          name: 'Etiket Ayarları'
        },
      },
      {
        path: 'tag-details/:id',
        component: () => import('@/views/main/resource/tag/TagDetails.vue'),
        meta: {
          isMain: true,
          name: 'Etiket Detayları'
        },
      },
      {
        path: 'amenities',
        component: () => import('@/views/main/resource/amenity/Amenity.vue'),
        meta: {
          isMain: true,
          name: 'Olanaklar'
        },
      },
      {
        path: 'gear',
        component: () => import('@/views/main/resource/gear/Gear.vue'),
        meta: {
          isMain: true,
          name: 'Ekipmanlar'
        },
      }
    ],
  },
]

export default MainRoutes
