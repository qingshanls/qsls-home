<script setup lang="ts">
import {
  DEFAULT_GAME_STATUS,
  BACKGROUND_IMAGE,
  STATUS_API_URL,
} from '@/config'

/** 游戏状态键名类型 */
type GameStatusKey = keyof typeof DEFAULT_GAME_STATUS

const backgroundLoaded = ref(false)
const backgroundFailed = ref(false)
const backgroundImage = ref(import.meta.env.VITE_BACKGROUND_IMAGE || BACKGROUND_IMAGE)
const statusDict = ref<Record<string, string>>({ ...DEFAULT_GAME_STATUS })

/** 数据状态 */
const apiLoading = ref(false)
const apiError = ref(false)

watch(backgroundLoaded, () => {
  if (backgroundLoaded.value) {
    const loadingEl = document.querySelector('#loading')
    if (loadingEl) {
      loadingEl.classList.add('loaded')
      setTimeout(() => {
        loadingEl.remove()
      }, 1000)
    }
  }
})

/** 预加载背景图片 */
function loadBackgroundImage() {
  const apiBg = import.meta.env.VITE_BACKGROUND_IMAGE
  backgroundImage.value = apiBg || BACKGROUND_IMAGE

  const imgEl = new Image()
  imgEl.onload = () => {
    backgroundLoaded.value = true
    imgEl.remove()
  }
  imgEl.onerror = () => {
    // 图片加载失败时仍然移除 loading，使用纯色背景兜底
    backgroundFailed.value = true
    backgroundLoaded.value = true
    imgEl.remove()
  }
  imgEl.src = backgroundImage.value

  // 设置 CSS 背景变量
  document.body.style.setProperty('--o-bg', `url(${backgroundImage.value})`)
}

/** 获取远程游戏状态 */
async function fetchRemoteConfig() {
  const apiUrl = import.meta.env.VITE_STATUS_API_URL || STATUS_API_URL
  if (!apiUrl)
    return // 未配置 API 地址，使用本地默认值

  apiLoading.value = true
  apiError.value = false

  try {
    const res = await fetch(apiUrl)
    if (!res.ok)
      throw new Error(`HTTP ${res.status}`)

    const data = await res.json()
    for (const key in data) {
      const value = data[key]
      if (value !== null && typeof value === 'string') {
        statusDict.value[key] = value
      }
    }
  }
  catch (e) {
    console.error('获取远程状态失败:', e)
    apiError.value = true
    // 失败时回退到默认值
    statusDict.value = { ...DEFAULT_GAME_STATUS }
  }
  finally {
    apiLoading.value = false
  }
}

/** 获取游戏状态文本 */
function t(key: string) {
  return statusDict.value[key] || ''
}

onMounted(() => {
  loadBackgroundImage()
  fetchRemoteConfig()
})
</script>

<template>
  <Transition name="bg-show">
    <div
      v-show="backgroundLoaded"
      class="bg fixed left-0 top-0 z-[-1] h-screen w-screen"
      :class="{ 'bg-fallback': backgroundFailed }"
    />
  </Transition>
  <div class="z-10 flex min-h-screen w-full flex-col items-center justify-center text-white">
    <div
      v-show="backgroundLoaded"
      class="min-h-screen w-full overflow-hidden bg-black/40 transition-all duration-300 md:flex"
    >
      <UserProfile avatar="favicon.png" username="QSLS" github="https://github.com/qingshanls" />
      <div class="flex flex-1 items-center p-4 sm:px-10 sm:py-16">
        <div class="flex flex-col gap-4">
          <div>
            <Title title="站点" />
            <div class="flex flex-wrap gap-3">
              <LinkBlock title="博客" link="https://blog.qingshanls.icu" />
              <LinkBlock title="图库" link="https://image.qingshanls.icu" />
            </div>
          </div>
          <div>
            <Title title="Game" />
            <div class="flex flex-wrap gap-3">
              <WithStatus :text="t('homepage.status.genshin')">
                <TextBlock>
                  <img src="/icon/game/genshin.png" class="inline-block w-5 rounded">
                  原神
                </TextBlock>
              </WithStatus>
              <WithStatus :text="t('homepage.status.starrail')">
                <TextBlock class="flex items-center gap-2">
                  <img src="/icon/game/starrail.png" class="inline-block w-5 rounded">
                  崩坏：星穹铁道
                </TextBlock>
              </WithStatus>
              <WithStatus :text="t('homepage.status.zzz')">
                <TextBlock class="flex items-center gap-2">
                  <img src="/icon/game/zzz.png" class="inline-block w-5 rounded">
                  绝区零
                </TextBlock>
              </WithStatus>
              <WithStatus :text="t('homepage.status.arknights')">
                <TextBlock class="flex items-center gap-2">
                  <img src="/icon/game/arknights.png" class="inline-block w-5 rounded">
                  明日方舟
                </TextBlock>
              </WithStatus>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>