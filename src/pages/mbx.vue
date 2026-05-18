<template>

    <div class="container text-center">
        <img src="../assets/logo.jpg" class="img-fluid w-50">
    </div>

    <Navbar />

    <!-- to be modified language selector -->
    <!--<div class="btncontainer">
        <div class="row mb-5">
            <label class="h3">{{ $t('lngSet.label') }}</label>
        </div>
        <div class="row">
            <div class="col" v-if="locale !== 'zh'">
                <button type="button" class="btn btn-warning btn1" @click="changeLang('zh')">
                {{ $t('lngSet.button[0]') }} </button>
            </div>

            <div class="col" v-if="locale !== 'th'">
                <button type="button" class="btn btn-warning btn1" @click="changeLang('th')">
                {{ $t('lngSet.button[1]') }} </button>
            </div>

            <div class="col" v-if="locale !== 'id'">
                <button type="button" class="btn btn-warning btn1" @click="changeLang('id')">
                {{ $t('lngSet.button[2]') }} </button>
            </div>      
        </div>
    </div>-->

    <Footer />

</template>
<script setup>
import Footer from '../components/footer.vue'
import Navbar from '../components/navbar.vue'

/*to be modified language selector
import { useI18n } from 'vue-i18n'
const { locale, t } = useI18n()
const changeLang = (lang) => {
  locale.value = lang
}*/
</script>