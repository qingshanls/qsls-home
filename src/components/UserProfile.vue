<script setup lang="ts">
import { GithubAlt, TelegramPlane } from '@vicons/fa'

defineProps<{
  avatar: string
  username: string
  github?: string
  telegram?: string
  email?: string
}>()
</script>

<template>
  <div class="w-full md:w-[300px] xl:w-[400px]">
    <div class="flex w-full shrink-0 items-center justify-center bg-black/30 p-8 backdrop-blur-sm md:fixed md:h-screen md:w-[300px] xl:w-[400px]">
      <div class="flex items-center gap-3 md:flex-col">
        <img
          :src="avatar"
          class="size-[96px] transition-transform hover:scale-105 sm:size-[120px]"
          alt="avatar"
        >
        <div class="flex flex-col items-center gap-3">
          <div class="text-3xl font-bold">
            {{ username }}
          </div>
          <div class="flex gap-2">
            <a
              v-if="github"
              :href="github"
              class="group p-1 transition-transform hover:scale-110"
              target="_blank"
            >
              <GithubAlt class="size-8 transition-colors group-hover:text-gray-400" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
