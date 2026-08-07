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
      <button class="logout-btn" @click="router.push('/')">{{ t('navbar.logOut') }}</button>
    </div>
  </div>

  <div class="subnav">
    <router-link to="/mbx" class="subnav-brand">{{ t('navbar.title[0]') }}</router-link>
    <div class="subnav-links" :class="{ open: menuOpen }">
      <div class="subnav-dropdown">
        <a class="subnav-link" :class="{ on: isCheckRoute }" @click.stop="toggleDrop('check')">
          {{ t('navbar.title[1]') }} 
          <span class="chevron" :class="{ rotate: openDrop === 'check' }">▾</span>
        </a>
        <div v-show="openDrop === 'check'" class="subnav-dropdown-menu">
          <router-link to="/machine" class="subnav-dropdown-item" @click="closeAll">
            {{ t('navbar.subtitles[0]') }}
          </router-link>
          <router-link to="/appearance" class="subnav-dropdown-item" @click="closeAll">
            {{ t('navbar.subtitles[1]') }}
          </router-link>
        </div>
      </div>
      <div class="subnav-dropdown">
        <router-link to="/dailysheet" class="subnav-link" :class="{ on: isDailyRoute }">
          {{ t('navbar.title[2]') }}
        </router-link>
      </div>
 
    </div>

    <!--hamburger btn for mobile -->
    <button class="hamburger" :class="{ open: menuOpen }" @click="toggleMenu">
      <span></span>
      <span></span>
      <span></span>
    </button>
  </div>

</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ref, computed } from 'vue'

const router = useRouter()
const route = useRoute()
const { t, locale } = useI18n()
const menuOpen = ref(false)
const openDrop = ref(null)

// determine active route for navbar highlighting
const isCheckRoute = computed(() =>
  ['/machine', '/appearance'].includes(route.path)
)
const isDailyRoute = computed(() =>
  route.path === '/dailysheet'
)

const toggleDrop = (name) => {
  openDrop.value = openDrop.value === name ? null : name;
}
 
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
  if (!menuOpen.value) openDrop.value = null;
}

const closeAll = () => {
  menuOpen.value = false;
  openDrop.value = null;
}

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
  font-size: 15px;
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
  position: relative;
  display: flex;
  align-items: center;
  background: var(--card);
  border-bottom: 2px solid #efefef;
  min-height: 50px;
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
  flex-shrink: 0;
}
.subnav-brand:hover { color: var(--green); background: var(--green-light); }
 
.subnav-links {
  display: flex;
  align-items: center;
  height: 50px;
}
 
.subnav-link {
  font-size: 18px;
  color: #3f3f3f;
  padding: 0 14px;
  height: 50px;
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  margin-bottom: -2px;
  transition: color 0.18s;
  text-decoration: none;
  user-select: none;
}
.subnav-link:hover { color: var(--green); }
.subnav-link.on {
  color: var(--green);
  border-bottom-color: var(--green);
  font-weight: 600;
}
 
.chevron {
  font-size: 12px;
  display: inline-block;
  transition: transform 0.2s;
}
.chevron.rotate { transform: rotate(180deg); }
 
.subnav-dropdown {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
}
.subnav-dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
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
  transition: background 0.15s;
}
.subnav-dropdown-item:hover {
  background: var(--green-light);
  color: var(--green);
}
 
.hamburger {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: 40px;
  height: 40px;
  padding: 8px;
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 6px;
  transition: background 0.15s;
}
.hamburger:hover { background: var(--green-light); }
.hamburger span {
  display: block;
  width: 20px;
  height: 2px;
  background: #3f3f3f;
  border-radius: 2px;
  transition: transform 0.25s, opacity 0.25s;
  transform-origin: center;
  flex-shrink: 0;
}
.hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.hamburger.open span:nth-child(2) { opacity: 0; }
.hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
 
@media (max-width: 768px) {
  .hamburger { display: flex; }
 
  .subnav-links {
    display: none;
    position: absolute;
    top: 50px;
    left: 0;
    right: 0;
    height: auto;
    flex-direction: column;
    align-items: stretch;
    background: #fff;
    border-top: 1px solid #e8e8e8;
    border-bottom: 1px solid #e8e8e8;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    z-index: 200;
  }
  .subnav-links.open { display: flex; }
 
  .subnav-link {
    height: auto;
    padding: 14px 20px;
    border-bottom: 1px solid #f0f0f0;
    margin-bottom: 0;
    font-size: 16px;
  }
 
  .subnav-dropdown {
    height: auto;
    flex-direction: column;
    align-items: stretch;
  }
  .subnav-dropdown-menu {
    position: static;
    box-shadow: none;
    border: none;
    border-top: 1px solid #f0f0f0;
    border-radius: 0;
    background: #fafafa;
  }
  .subnav-dropdown-item {
    padding: 12px 20px 12px 36px;
    font-size: 15px;
    border-bottom: 1px solid #f0f0f0;
  }
}
</style>