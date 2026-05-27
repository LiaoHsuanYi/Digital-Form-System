<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <div class="d-flex align-items-center ms-5"> 
                <router-link to="/mbx" class="navbar-brand"  style="font-size: x-large; font-weight: bolder;">{{ t('common.title') }}</router-link>
            <div class="dropdown ms-2">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto">
                        <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown">
                            {{ t('common.navbar[0].title') }}
                        </a>
                        <ul class="dropdown-menu">
                            <router-link to="/machine" class="dropdown-item">{{ t('common.navbar[0].subtitles[0]') }}</router-link>
                            <router-link to="/appearance" class="dropdown-item">{{ t('common.navbar[0].subtitles[1]') }}</router-link>
                        </ul>
                        </li>
                        <li class="nav-item">
                            <router-link to="/dailysheet" class="nav-link">{{ t('common.navbar[1].title') }}</router-link>
                        </li>
                    </ul>
                </div>
            </div> 
            </div>   
        </div>
    </nav>
</template>
<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>