<template>
  <div class="gap-2">
    <n-spin :show="loading !== 0">
      <template #default>
        <n-space vertical>
          <n-button class="mb-2" type="primary" size="medium" @click="setDrawer(true)">
            Ekipman oluştur
          </n-button>
          <n-data-table
            class="shadow-md"
            :single-line="false"
            :data="gears"
            :columns="columns"
            :bordered="true"
            :row-key="(row: IGetAmenityListResponse) => row.Id"
          />
        </n-space>
      </template>
      <template #description> Olanaklar Listesi Alınıyor... </template>
    </n-spin>

    <n-drawer placement="right" v-model:show="display" width="500px">
      <n-drawer-content v-if="isGear">
        <template #header> Etiket Oluştur </template>
        <template #default>
          <n-form-item label="Olanak Anahtar Adı">
            <n-input v-model:value="gear.ResourceKey" placeholder="museum" maxlength="30" />
          </n-form-item>
          <n-form-item label="Icon">
            <n-input v-model:value="gear.Icon" placeholder="fa-solid fa-building" />
          </n-form-item>
        </template>
        <template #footer>
          <n-button type="success" @click="saveGear"> Kaydet</n-button>
        </template>
      </n-drawer-content>
      <n-drawer-content v-else>
        <template #header> Çevirileri Düzenle</template>
        <template #default>
          <n-space vertical class="bg-white">
            <n-form
              v-for="translation in gear.Translations"
              :key="translation.LanguageCode"
              class="gap-4 p-2 rounded-md shadow-md"
            >
              <n-form-item label="Name">
                <n-input v-model:value="translation.Name" placeholder="Museum" maxlength="30" />
              </n-form-item>
              <n-form-item label="Description">
                <n-input
                  v-model:value="translation.Description"
                  placeholder="Museum Description"
                  maxlength="100"
                />
              </n-form-item>
              <n-form-item label="Language">
                <n-input
                  v-model:value="translation.LanguageCode"
                  :options="SupportedLanguages"
                  :disabled="true"
                />
              </n-form-item>
            </n-form>
          </n-space>
        </template>
        <template #footer>
          <n-button type="success" @click="saveTranslations">Çevirileri Kaydet</n-button>
        </template>
      </n-drawer-content>
    </n-drawer>
  </div>
</template>

<script setup lang="ts">
import { IGearPayload, IGetAmenityListResponse, IGetGearListResponse } from '@/types/api'
import { DataTableColumns, NButton, NTag, useDialog, useMessage } from 'naive-ui'
import { SupportedLanguages } from '@/types/static/ILanguage'

const [gearStore, dialog, message] = [useGearStore(), useDialog(), useMessage()]

const loading = ref<number>(0)
const display = ref<boolean>(false)
const isNew = ref<boolean>(false)
const isGear = ref<boolean>(true)

const defaultGear: IGetGearListResponse = {
  Id: '',
  Name: '',
  Description: '',
  Icon: null,
  ResourceKey: '',
  Translations: [],
}

const gear = ref<IGetGearListResponse>(defaultGear)
const gears = computed(() => gearStore.gears)

const columns = computed(() => {
  const data: DataTableColumns<IGetGearListResponse> = [
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
            { strong: true, type: 'warning', size: 'small', onClick: () => setDrawer(false, row) },
            () => h('i', { class: 'fa-solid fa-sm fa-pen-to-square' })
          ),
          ' ',
          h(
            NButton,
            { strong: true, type: 'error', size: 'small', onClick: () => deleteGear(row) },
            () => h('i', { class: 'fa-solid fa-sm fa-trash' })
          ),
          ' ',
          h(
            NButton,
            {
              strong: true,
              size: 'small',
              type: 'info',
              onClick: () => setDrawer(false, row, false),
            },
            () => h('i', { class: 'fa-solid fa-sm fa-globe' })
          ),
        ]
      },
    },
  ]

  return data
})

onMounted(() => getGearList())

const getGearList = async () => {
  const payload = {
    Skip: 0,
    Take: 10,
  }
  loading.value = 1

  await gearStore.GetGearList(payload)
  loading.value = 0
}

const saveGear = async () => {
  if (!gear.value) return
  const payload: IGearPayload = {
    ResourceKey: gear.value.ResourceKey.toLowerCase(),
    Icon: gear.value.Icon,
  }

  loading.value = 2
  display.value = false
  if (isNew.value) {
    await gearStore.CreateGear(payload)
  } else {
    payload.Id = gear.value.Id
    await gearStore.UpdateGear(payload)
  }
  message.success('Olanak başarıyla kaydedildi!')
  loading.value = 0
  getGearList()
}

const deleteGear = (row: IGetGearListResponse) => {
  dialog.error({
    title: 'Silme İşlemi',
    content: 'Silme işlemini onaylıyor musunuz?',
    positiveText: 'Evet',
    negativeText: 'İptal',
    closeOnEsc: true,
    closable: false,
    onPositiveClick: () => {
      loading.value = 3
      gearStore.DeleteGear({ Id: row.Id }).finally(() => {
        loading.value = 0
        message.success('Ekipman başarıyla silindi!')
      })
    },
  })
}

const setDrawer = (IsNew: boolean, row?: IGetGearListResponse, IsGear?: boolean) => {
  isNew.value = IsNew
  display.value = true
  isGear.value = IsGear ?? true
  if (!IsNew && row) {
    gear.value = { ...row }
  } else {
    gear.value = { ...defaultGear }
  }
}

const saveTranslations = async () => {
  loading.value = 1


  for(const translation of gear.value.Translations) {
    const payload = {
      Name: translation.Name,
      LanguageCode: translation.LanguageCode,
      Description: translation.Description,
      Id: translation.TranslationId
    }

    await gearStore.UpdateGearTranslation(payload)

  }
  message.success('Çeviriler başarıyla kaydedildi!')
  loading.value = 0
  getGearList()
}
</script>

<style scoped></style>
