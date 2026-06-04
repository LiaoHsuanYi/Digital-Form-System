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

<style scoped>
/* components/navbar.vue */
.topbar {
  background: var(--card);
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px 30px;
  position: relative;
}

.topbar-logo {
  height: 80px !important;
  width: auto !important;
  display: block;
}

.topbar-back {
  position: absolute;
  right: 20px;
  top: 20px;
  font-size: 16px;
  border: 1.5px solid var(--border);
  border-radius: 7px;
  padding: 5px 14px;
  cursor: pointer;
  background: #fff;
  color: #3f3f3f;
  transition: all 0.18s;
}

.topbar-back:hover {
  border-color: var(--green);
  color: var(--green);
}

.subnav {
  display: flex;
  align-items: center;
  background: var(--card);
  border-bottom: 2px solid #efefef;
  min-height: 50px !important;
}

.subnav-brand {
  font-size: 24px;
  font-weight: 700;
  color: var(--text);
  padding-left: 20px;
  padding-right: 20px;
  border-right: 1.5px solid #e8e8e8;
  margin-right: 2px;
  height: 50px;
  display: flex;
  align-items: center;
  text-decoration: none;
}

.subnav-brand:hover {
  color: var(--green);
  background: var(--green-light);
}

.subnav-link {
  font-size: 18px;
  color: #3f3f3f;
  padding: 0 14px;
  height: 50px;
  display: flex;
  align-items: center;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  margin-bottom: -2px;
  transition: all 0.18s;
  text-decoration: none;
}

.subnav-link:hover {
  color: var(--green);
}

.subnav-link.active {
  color: var(--green);
  border-bottom-color: var(--green);
  font-weight: 600;
}

.subnav-dropdown {
  position: relative;
}

.subnav-dropdown:hover .subnav-dropdown-menu {
  display: block;
}

.subnav-dropdown-menu {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  min-width: 160px;
  z-index: 999;
  overflow: hidden;
}

.subnav-dropdown-item {
  display: block;
  padding: 11px 16px;
  font-size: 18px;
  color: #3f3f3f;
  text-decoration: none;
  transition: all 0.15s;
}

.subnav-dropdown-item:hover {
  background: var(--green-light);
  color: var(--green);
}

.topbar-logo {
  height: 40px;
  width: auto;
  display: block;
}
</style>