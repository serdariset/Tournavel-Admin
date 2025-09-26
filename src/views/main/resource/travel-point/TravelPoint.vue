<template>
  <div class="gap-2">
    <n-spin :show="loading !== 0">
      <template #default>
        <n-space vertical>
          <n-space>
            <n-button type="primary" size="medium">
              Seyahat Noktası Oluştur
            </n-button>
            <n-button type="primary">
              Keşfet
            </n-button>
          </n-space>
          <n-data-table
            class="shadow-md"
            :single-line="false"
            :data="travelPoints"
            :columns="columns"
            :bordered="true"
            :row-key="(row: IGetTravelPointListResponse) => row.Id"
          />
        </n-space>
      </template>
      <template #description> Olanaklar Listesi Alınıyor... </template>
    </n-spin>
  </div>
</template>

<script setup lang="ts">
import { IGetTravelPointListResponse, ITravelPointPayload } from '@/types/api'
import { DataTableColumns } from 'naive-ui'

const [travelPointStore, aiStore] = [useTravelPointStore(), useAIStore()]

const loading = ref<number>(0)
const display = ref<boolean>(false)
const isNew = ref<boolean>(false)

const defaultTravelPoint : ITravelPointPayload = {
  Id: '',
  Latitude: 0,
  Longitude: 0,
  CountryId: '',
  CityId: '',
  Address: null,
  Website: null,
  PhoneNumber: null,
  IsTemporarilyClosed: false,
  IsVerified: false,
  CoverImageUrl: null
}

const travelPoint = ref<ITravelPointPayload>(defaultTravelPoint)
const travelPoints = computed(() => travelPointStore.travelPoints)

const columns = computed(() => {
  const data: DataTableColumns<IGetTravelPointListResponse> = [
    { key: 'Name', title: 'Name' },
    { key: 'Description', title: 'Description' },
    { key: 'Latitude', title: 'Latitude' },
    { key: 'Longitude', title: 'Longitude' },
    { key: 'Country', title: 'Country' },
    { key: 'City', title: 'City' },
    { key: 'Address', title: 'Address' },
    { key: 'Website', title: 'Website' },
    { key: 'PhoneNumber', title: 'PhoneNumber' },
    { key: 'IsTemporarilyClosed', title: 'IsTemporarilyClosed' },
    { key: 'IsVerified', title: 'IsVerified' },
    { key: 'CoverImageUrl', title: 'CoverImageUrl' }
  ]
  return data
})



onMounted(() => getTravelPointList())

const getTravelPointList = async () => {
  const payload = {
    Skip: 0,
    Take: 10,
  }
  loading.value = 1

  await travelPointStore.GetTravelPointList(payload)
  loading.value = 0
}
</script>

<style scoped></style>
