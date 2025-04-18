<script setup lang="ts">
interface Dict {
  [key: string]: string
}

const backgroundLoaded = ref(false)
const backgroundImage = "https://image.qingshanls.icu/file/1744958267474_00006.jpg"
const statusDict = ref<Dict>({
  // 'homepage.status.genshin': '摆烂',
  // 'homepage.status.starrail': '摆烂',
  // 'homepage.status.zzz': '摆烂',
  // 'homepage.status.arknights': 'c',
})

watch(backgroundLoaded, () => {
  if (backgroundLoaded.value) {
    document.querySelector('#loading')?.classList.add('loaded')
    setTimeout(() => {
      document.querySelector('#loading')?.remove()
    }, 1000)
  }
})

onMounted(() => {
  setTimeout(() => {
    backgroundLoaded.value = true
  }, 5000)
  const imgEl = new Image()
  imgEl.onload = () => {
    backgroundLoaded.value = true
    imgEl.remove()
  }
  imgEl.src = backgroundImage
  document.body.style.setProperty(
    '--o-bg',
    `url(${backgroundImage})`,
  )
  fetchRemoteConfig()
})

function fetchRemoteConfig() {
  const keys = Object.keys(statusDict.value).join(',')
  fetch(``)
    .then(res => res.json())
    .then((data: Dict) => {
      for (const key in data) {
        const value = data[key]
        if (value === null)
          return
        statusDict.value[key] = value
      }
    })
}

function t(key: string) {
  return statusDict.value[key]
}
</script>

<template>
  <Transition name="bg-show">
    <div v-show="backgroundLoaded" class="bg fixed left-0 top-0 z-[-1] h-screen w-screen" />
  </Transition>
  <div class="z-10 flex min-h-screen w-full flex-col items-center justify-center text-white">
    <div v-show="backgroundLoaded"
      class="min-h-screen w-full overflow-hidden bg-black/40 transition-all duration-300 md:flex">
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
