<template>

    <Navbar />
    <div class="lang-body">
        <div class="lang-card">
            <div class="lang-card-title">{{ $t('common.lngset') }}</div>
            
            <div class="lang-btns">
                <button v-if="locale != 'zh'" type="button" class="lang-btn" @click="changeLang('zh')">
                    {{ $t('common.zh') }}
                </button>

                <button v-if="locale != 'th'" type="button" class="lang-btn" @click="changeLang('th')">
                    {{ $t('common.th') }}
                </button>

                <button v-if="locale != 'id'" type="button" class="lang-btn" @click="changeLang('id')">
                    {{ $t('common.id') }}
                </button>
            </div>
        </div>

    </div>
    <Footer />

</template>
<script setup>
import Footer from '@/components/footer.vue'
import Navbar from '@/components/navbar.vue'
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()

const changeLang = (lang) => {
    locale.value = lang;
    localStorage.setItem('lang', lang);
}
</script>