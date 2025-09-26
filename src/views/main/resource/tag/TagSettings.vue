<template>
  <div class="gap-2">
    <n-spin :show="loading !== 0" class="h-full">
      <template #default>
        <n-space vertical v-if="loading !== 1">
          <n-button class="mb-2" type="primary" size="medium" @click="createTag"
            >Etiket oluştur</n-button
          >
          <n-data-table
            class="shadow-md"
            :single-line="false"
            :data="tags"
            :columns="columns"
            :bordered="true"
            :row-key="(row: IGetTagListResponse) => row.Id"
          />
        </n-space>
      </template>
      <template #description> Etiket Listesi Alınıyor... </template>
    </n-spin>
    <n-drawer placement="right" v-model:show="display" width="500px">
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
  </div>
</template>

<script setup lang="ts">
import { computed, h, onMounted, ref } from 'vue'
import {
  DataTableColumns,
  NButton,
  NColorPicker,
  NTag,
  useDialog,
  useMessage,
} from 'naive-ui'
import { IGetTagListResponse, TagPayload } from '@/types/api'

const [router, tagStore, dialog, message] = [useRouter(), useTagStore(), useDialog(), useMessage()]

const loading = ref<number>(0)
const display = ref<boolean>(false)
const isNew = ref<boolean>(false)

const defaultTag: TagPayload = {
  ResourceKey: '',
  ColorHex: '#CCCCCC',
  Icon: null,
  IsFeatured: false,
}



const tag = ref<TagPayload>({ ...defaultTag })

const tags = computed(() => tagStore.tags)

const columns = computed(() => {
  const data: DataTableColumns<IGetTagListResponse> = [
    { key: 'Name', title: 'Name' },
    { key: 'Description', title: 'Description' },
    { key: 'ResourceKey', title: 'Resource Key' },
    {
      key: 'Icon',
      title: 'Icon',
      align: 'center',
      width: 75,
      render: (row) =>
        row.Icon?.trim()
          ? h(NTag, { color: { textColor: row.ColorHex }, round: true }, () =>
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
            { strong: true, type: 'warning', size: 'small', onClick: () => updateTag(row) },
            { default: () => 'Update' }
          ),
          ' ',
          h(
            NButton,
            { strong: true, type: 'error', size: 'small', onClick: () => deleteTag(row) },
            { default: () => 'Delete' }
          ),
          ' ',
          h(
            NButton,
            {
              strong: true,
              size: 'small',
              type: 'info',
              onClick: () => router.push('/resource/tag-details/' + row.Id),
            },
            { default: () => 'Details' }
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

onMounted(() => getTagList())

const getTagList = async () => {
  const payload = {
    Skip: 0,
    Take: 10,
  }
  loading.value = 1

  await tagStore.GetTagList(payload)
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
    ? { ...payloadBase, ParentId: null }
    : { ...payloadBase, Id: tag.value.Id }

  loading.value = 2
  display.value = false
  try {
    if (isNew.value) {
      await tagStore.CreateTag(payload)
      message.success('Etiket başarıyla oluşturuldu!')
    } else {
      await tagStore.UpdateTag(payload)
      message.success('Etiket başarıyla güncellendi!')
    }
  } catch (err) {
    message.error('İşlem sırasında bir hata oluştu.')
    console.error(err)
  } finally {
    loading.value = 0
    setDefault()
    getTagList()
  }
}

const deleteTag = (row: IGetTagListResponse) => {
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

const updateTag = (row: IGetTagListResponse) => {
  tag.value = {
    ResourceKey: row.ResourceKey,
    ColorHex: row.ColorHex,
    Icon: row.Icon,
    IsFeatured: row.IsFeatured,
    Id: row.Id,
    ParentId: row.ParentId,
  }

  display.value = true
  isNew.value = false
}

const createTag = () => {
  tag.value.ParentId = null
  isNew.value = true
  display.value = true
}

const setDefault = () => {
  tag.value = { ...defaultTag }
}
</script>
