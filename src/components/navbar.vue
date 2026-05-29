<template>

    <div class="topbar">
        <img src="@/assets/logo.jpg" class="topbar-logo">
        <button class="topbar-back" @click="router.push('/index')">返回首頁</button>
    </div>

    <div class="subnav">
        <router-link to="/mbx" class="subnav-brand">{{ t('common.title') }}</router-link>

        <div class="subnav-dropdown">
            <a class="subnav-link" :class="{ on: isCheckRoute }">
                {{ t('common.navbar[0].title') }} ▾
            </a>
            <div class="subnav-dropdown-menu">
                <router-link to="/machine" class="subnav-dropdown-item">
                    {{ t('common.navbar[0].subtitles[0]') }}
                </router-link>
                <router-link to="/appearance" class="subnav-dropdown-item">
                    {{ t('common.navbar[0].subtitles[1]') }}
                </router-link>
            </div>
        </div>
        <router-link to="/dailysheet" class="subnav-link" :class="{ on: isDailyRoute }">
            {{ t('common.navbar[1].title') }}
        </router-link>
    </div>

</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

// determine active route for navbar highlighting
const isCheckRoute = computed(() =>
  ['/machine', '/appearance'].includes(route.path)
)
const isDailyRoute = computed(() =>
  route.path === '/dailysheet'
)
</script>