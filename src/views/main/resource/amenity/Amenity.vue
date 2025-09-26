<template>
  <div class="gap-2">
    <n-spin :show="loading !== 0">
      <template #default>
        <n-space vertical>
          <n-button class="mb-2" type="primary" size="medium" @click="createAmenity">
            Etiket oluştur</n-button
          >
          <n-data-table
            class="shadow-md"
            :single-line="false"
            :data="amenities"
            :columns="columns"
            :bordered="true"
            :row-key="(row: IGetAmenityListResponse) => row.Id"
          />
        </n-space>
      </template>
      <template #description> Olanaklar Listesi Alınıyor... </template>
    </n-spin>
    <n-drawer placement="right" v-model:show="display" width="500px">
      <n-drawer-content>
        <template #header> Etiket Oluştur </template>
        <template #default>
          <n-form-item label="Olanak Anahtar Adı">
            <n-input v-model:value="amenity.ResourceKey" placeholder="museum" maxlength="30" />
          </n-form-item>
          <n-form-item label="Icon">
            <n-input v-model:value="amenity.Icon" placeholder="fa-solid fa-building" />
          </n-form-item>
        </template>
        <template #footer>
          <n-button type="success" @click="saveAmenity"> Kaydet</n-button>
        </template>
      </n-drawer-content>
    </n-drawer>
  </div>
</template>

<script setup lang="ts">
import { computed, h, onMounted, ref } from 'vue'
import { DataTableColumns, NButton, NTag, useDialog, useMessage } from 'naive-ui'
import { IAmenityPayload, IGetAmenityListResponse } from '@/types/api'

const [amenityStore, dialog, message] = [useAmenityStore(), useDialog(), useMessage()]

const loading = ref<number>(0)
const display = ref<boolean>(false)
const isNew = ref<boolean>(false)

const defaultAmenity: IAmenityPayload = {
  ResourceKey: '',
  Icon: null,
  Id: '',
}

const amenity = ref<IAmenityPayload>({ ...defaultAmenity })

const amenities = computed(() => amenityStore.amenities)

const columns = computed(() => {
  const data: DataTableColumns<IGetAmenityListResponse> = [
    { key: 'Name', title: 'Name' },
    { key: 'Description', title: 'Description' },
    { key: 'ResourceKey', title: 'Resource Key' },
    {
      key: 'Icon',
      title: 'Icon',
      align: 'center',
      width: 75,
      render: (row) =>
        row.Icon?.trim() ? h(NTag, { round: true }, () => h('i', { class: row.Icon })) : null,
    },
    {
      key: 'Actions',
      title: 'Actions',
      align: 'right',
      render: (row) => {
        return [
          h(
            NButton,
            { strong: true, type: 'warning', size: 'small', onClick: () => updateAmenity(row) },
            () => h('i', { class: 'fa-solid fa-sm fa-pen-to-square' })
          ),
          ' ',
          h(
            NButton,
            { strong: true, type: 'error', size: 'small', onClick: () => deleteAmenity(row) },
            () => h('i', { class: 'fa-solid fa-sm fa-trash' })
          ),
          ' ',
          h(
            NButton,
            {
              strong: true,
              size: 'small',
              type: 'info',
              onClick: () => console.log('details'),
            },
            () => h('i', { class: 'fa-solid fa-sm fa-globe' })
          ),
        ]
      },
    },
  ]

  return data
})

watch(
  () => display.value,
  (val) => !val && setDefault()
)

onMounted(() => getAmenityList())

const getAmenityList = async () => {
  const payload = {
    Skip: 0,
    Take: 10,
  }
  loading.value = 1

  await amenityStore.GetAmenityList(payload)
  loading.value = 0
}

const saveAmenity = async () => {
  const payload: IAmenityPayload = {
    ResourceKey: amenity.value.ResourceKey.toLowerCase(),
    Icon: amenity.value.Icon,
  }

  loading.value = 2
  display.value = false
  if (isNew.value) {
    await amenityStore.CreateAmenity(payload)
  } else {
    payload.Id = amenity.value.Id
    await amenityStore.UpdateAmenity(payload)
  }
  message.success('Olanak başarıyla kaydedildi!')
  loading.value = 0
  setDefault()
  getAmenityList()
}

const deleteAmenity = (row: IGetAmenityListResponse) => {
  dialog.error({
    title: 'Silme İşlemi',
    content: 'Silme işlemini onaylıyor musunuz?',
    positiveText: 'Evet',
    negativeText: 'İptal',
    closeOnEsc: true,
    closable: false,
    onPositiveClick: () => {
      loading.value = 3
      amenityStore.DeleteAmenity({ Id: row.Id }).finally(() => {
        loading.value = 0
        message.success('Olanak başarıyla silindi!')
      })
    },
  })
}

const updateAmenity = (row: IGetAmenityListResponse) => {
  amenity.value = {
    ResourceKey: row.ResourceKey,
    Icon: row.Icon,
    Id: row.Id,
  }

  display.value = true
  isNew.value = false
}

const createAmenity = () => {
  isNew.value = true
  display.value = true
}

const setDefault = () => {
  amenity.value = { ...defaultAmenity }
}
</script>

<style scoped></style>
