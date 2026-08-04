<template>

  <div class="topbar">
    <div class="topbar-left">
      <select class="topbar-lang" :value="locale" @change="changeLang">
          <option value="zh" selected>繁體中文</option>
          <option value="th">ภาษาไทย</option>
          <option value="id">Bahasa Indonesia</option>
      </select>
    </div>
    <img src="@/assets/logo.jpg" class="topbar-logo">
      <div class="topbar-right">
      <button class="logout-btn" @click="router.push('/')">登出</button>
    </div>
  </div>

  <div class="subnav">
    <router-link to="/mbx" class="subnav-brand">{{ t('navbar.title[0]') }}</router-link>

    <div class="subnav-dropdown">
      <a class="subnav-link" :class="{ on: isCheckRoute }">
        {{ t('navbar.title[1]') }} ▾
      </a>
      <div class="subnav-dropdown-menu">
        <router-link to="/machine" class="subnav-dropdown-item">
          {{ t('navbar.subtitles[0]') }}
        </router-link>
        <router-link to="/appearance" class="subnav-dropdown-item">
          {{ t('navbar.subtitles[1]') }}
        </router-link>
      </div>
    </div>
    <router-link to="/dailysheet" class="subnav-link" :class="{ on: isDailyRoute }">
        {{ t('navbar.title[2]') }}
    </router-link>
  </div>

</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

const router = useRouter()
const route = useRoute()
const { t, locale } = useI18n()

// determine active route for navbar highlighting
const isCheckRoute = computed(() =>
  ['/machine', '/appearance'].includes(route.path)
)
const isDailyRoute = computed(() =>
  route.path === '/dailysheet'
)

function changeLang(e) {
  const newLocale = e.target.value;
  locale.value = newLocale;           
  localStorage.setItem('locale', newLocale);    
}
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

.topbar-left {
  position: absolute;
  left: 25px;
  top: 20px;
}

.logout-btn {
  border: 1px solid #FF2E2E;
  background: #fff;
  padding: 6px 14px;
  border-radius: 7px;
  font-size: 16px;
  font-weight: bold;
  color: #FF2E2E;
  white-space: nowrap;
}

.logout-btn:hover {
  background-color: #FF2E2E;
  color: white;
}

.topbar-right {
  position: absolute;
  right: 25px;
  top: 20px;
  display: flex;
  align-items: center;
}

.topbar-lang {
  font-size: 16px;
  border: 1.5px solid var(--border);
  border-radius: 7px;
  padding: 5px 10px;
  cursor: pointer;
  background: #fff;
  color: #3f3f3f;
  transition: all 0.18s;
}

.topbar-lang:hover {
  border-color: var(--green-hover);
  color: var(--green-hover);
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