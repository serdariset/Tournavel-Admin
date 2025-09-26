<template>
  <div class="gap-2 flex justify-center flex-col w-full h-full">
    <n-spin :show="loading !== 0" class="h-full">
      <template #default>
        <n-space vertical v-if="loading !== 1">
          <n-button type="primary" size="medium" strong @click="createTag">
            <template #icon>
              <i class="fa-solid fa-plus" />
            </template>
            Etiket oluştur
          </n-button>
          <n-data-table
            class="shadow-md"
            :single-line="false"
            :data="tags"
            :columns="columns"
            :bordered="true"
            :row-key="(row: IGetTagResponse) => row.Id"
          />
        </n-space>
      </template>
      <template #description> Etiket Listesi Alınıyor... </template>
    </n-spin>

    <n-drawer placement="right" v-model:show="tagDisplay" width="500px">
      <n-drawer-content>
        <template #header> Etiket Oluştur </template>
        <template #default>
          <n-form-item label="Kaynak Anahtarı">
            <n-input v-model:value="tag.ResourceKey" placeholder="museum" maxlength="30" />
          </n-form-item>
          <n-form-item label="Renk">
            <n-color-picker v-model:value="tag.ColorHex" :show-alpha="false" :modes="['hex']" />
          </n-form-item>
          <n-form-item label="Icon">
            <n-input v-model:value="tag.Icon" placeholder="fa-solid fa-building" />
          </n-form-item>
          <n-form-item label="Öne Çıkar">
            <n-switch v-model:value="tag.IsFeatured" />
          </n-form-item>
        </template>
        <template #footer>
          <n-button type="success" @click="saveTag"> Kaydet</n-button>
        </template>
      </n-drawer-content>
    </n-drawer>
    <n-drawer placement="right" v-model:show="translationDisplay" width="500px">
      <n-drawer-content class="bg-stone-50">
        <template #header class="bg-stone-100"> Etiket Çevirileri </template>
        <template #default>
          <n-space vertical class="bg-white">
            <n-form
              v-for="translation in translations"
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
import { computed, h, onMounted, ref } from 'vue'
import { DataTableColumns, NButton, NColorPicker, NTag, useDialog, useMessage } from 'naive-ui'
import { IGetTagResponse, ITagTranslation, TagPayload, TagTranslationPayload } from '@/types/api'
import { SupportedLanguages } from '@/types/static/ILanguage'
const [route, tagStore, dialog, message] = [useRoute(), useTagStore(), useDialog(), useMessage()]

const loading = ref<number>(0)
const tagDisplay = ref<boolean>(false)
const translationDisplay = ref<boolean>(false)
const isNew = ref<boolean>(false)

const defaultTag: TagPayload = {
  ResourceKey: '',
  ColorHex: '#CCCCCC',
  Icon: null,
  IsFeatured: false,
  ParentId: route.params.id.toString(),
}
const defaultTranslation: TagTranslationPayload = {
  TagId: '',
  Name: '',
  LanguageCode: '',
  Description: '',
}

const tag = ref<TagPayload>({ ...defaultTag })
const translations = ref<TagTranslationPayload[]>([])

const tags = computed(() => tagStore.tag)

const columns = computed(() => {
  const data: DataTableColumns<IGetTagResponse> = [
    { key: 'Name', title: 'Name' },
    { key: 'Description', title: 'Description' },
    { key: 'ResourceKey', title: 'Resource Key', width: 150 },
    {
      key: 'ParentId',
      title: 'Kapsayıcı Etiket',
      width: 100,
      align: 'center',
      render: (row) =>
        h(NTag, { type: !row.ParentId ? 'success' : 'error', round: true }, () =>
          h('i', { class: !row.ParentId ? 'fa-solid fa-check' : 'fa-solid fa-times' })
        ),
    },
    {
      key: 'Icon',
      title: 'Icon',
      align: 'center',
      width: 75,
      render: (row) =>
        row.Icon?.trim()
          ? h(NTag, { color: { textColor: row.ColorHex || '#000000' }, round: true }, () =>
              h('i', { class: row.Icon })
            )
          : null,
    },
    {
      key: 'ColorHex',
      title: 'Color',
      render: (row) =>
        h(NColorPicker, {
          modes: ['hex'],
          size: 'small',
          showAlpha: false,
          disabled: row.ParentId === null,
          value: row.ColorHex,
          onUpdateValue: (color) => (row.ColorHex = color),
        }),
    },
    {
      key: 'Actions',
      title: 'Actions',
      align: 'right',
      render: (row) => {
        return [
          h(
            NButton,
            {
              strong: true,
              type: 'warning',
              size: 'small',
              disabled: row.ParentId === null,
              onClick: () => updateTag(row),
            },
            () => h('i', { class: 'fa-solid fa-sm fa-pen-to-square' })
          ),
          ' ',
          h(
            NButton,
            {
              strong: true,
              type: 'error',
              size: 'small',
              disabled: row.ParentId === null,
              onClick: () => deleteTag(row),
            },
            () => h('i', { class: 'fa-solid fa-sm fa-trash' })
          ),
          ' ',
          h(
            NButton,
            {
              strong: true,
              size: 'small',
              type: 'info',
              onClick: () => updateTranslation(row.Id, row.Translations),
            },
            () => h('i', { class: 'fa-solid fa-sm fa-globe' })
          ),
        ]
      },
    },
  ]
  return data
})

onMounted(() => getTag())

const getTag = async () => {
  const payload = {
    Id: route.params.id.toString(),
  }
  loading.value = 1

  await tagStore.GetTag(payload)
  loading.value = 0
}

const saveTag = async () => {
  const payloadBase = {
    ResourceKey: tag.value.ResourceKey.toLowerCase(),
    ColorHex: tag.value.ColorHex,
    Icon: tag.value.Icon,
    IsFeatured: tag.value.IsFeatured,
  }

  const payload: TagPayload = isNew.value
    ? { ...payloadBase }
    : { ...payloadBase, Id: tag.value.Id }

  loading.value = 2
  tagDisplay.value = false

  try {
    if (isNew.value) {
      await tagStore.CreateTag(payload)
      message.success('Etiket başarıyla oluşturuldu!')
    } else {
      await tagStore.UpdateTag(payload)
      message.success('Etiket başarıyla güncellendi!')
      getTag()
    }
  } catch (err) {
    message.error('İşlem sırasında bir hata oluştu.')
    console.error(err)
  } finally {
    loading.value = 0
    setDefault()
  }
}

const createTag = () => {
  isNew.value = true
  tagDisplay.value = true
}

const updateTag = (row: IGetTagResponse) => {
  tag.value = {
    ResourceKey: row.ResourceKey,
    ColorHex: row.ColorHex,
    Icon: row.Icon,
    IsFeatured: row.IsFeatured,
    Id: row.Id,
    ParentId: row.ParentId,
  }

  tagDisplay.value = true
  isNew.value = false
}

const deleteTag = (row: IGetTagResponse) => {
  dialog.error({
    title: 'Silme İşlemi',
    content: 'Silme işlemini onaylıyor musunuz?',
    positiveText: 'Evet',
    negativeText: 'İptal',
    closeOnEsc: true,
    closable: false,
    onPositiveClick: () => {
      loading.value = 3
      tagStore.DeleteTag({ Id: row.Id }).finally(() => {
        loading.value = 0
        message.success('Etiket başarıyla silindi!')
      })
    },
  })
}

const updateTranslation = (id: string, trs: ITagTranslation[]) => {
  const nonExistLanguages: string[] = []

  SupportedLanguages.forEach((lang) => {
    const exists = trs.some((t) => t.LanguageCode === lang)
    if (!exists) {
      nonExistLanguages.push(lang)
    }
  })

  const newTranslations = nonExistLanguages.map((lang) => {
    return {
      Id: '',
      ...defaultTranslation,
      LanguageCode: lang,
      TagId: id,
    }
  })

  translations.value = [...trs, ...newTranslations]
  translationDisplay.value = true
}

const saveTranslations = async () => {
  loading.value = 1
  translationDisplay.value = false

  for (const translation of translations.value) {
    const payloadBase = {
      TagId: translation.TagId,
      Name: translation.Name,
      LanguageCode: translation.LanguageCode,
      Description: translation.Description,
    }

    const payload: TagTranslationPayload = translation.Id
      ? { ...payloadBase, Id: translation.Id }
      : { ...payloadBase }

    if (translation.Id) {
      await tagStore.UpdateTagTranslation(payload)
    } else {
      await tagStore.CreateTagTranslation(payload)
    }
  }

  loading.value = 0
  setDefault()
  getTag()
}

const setDefault = () => {
  tag.value = { ...defaultTag }
  translations.value = []
}
</script>

<style scoped></style>
