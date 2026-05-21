<template>

    <Header />
    <Navbar />

    <div class="btncontainer">
        <div class="row mb-5">
            <label class="h3">{{ $t('common.lngset') }}</label>
        </div>
        <div class="row"> <!--need to revise if function-->
            <div class="col" v-if="locale == 'zh'">
                <button type="button" class="btn btn-warning btn1" @click="changeLang('zh')">
                {{ $t('common.zh') }} </button>
            </div>

            <div class="col" v-if="locale !== 'th'">
                <button type="button" class="btn btn-warning btn1" @click="changeLang('th')">
                {{ $t('common.th') }} </button>
            </div>

            <div class="col" v-if="locale !== 'id'">
                <button type="button" class="btn btn-warning btn1" @click="changeLang('id')">
                {{ $t('common.id') }} </button>
            </div>      
        </div>
    </div>

    <Footer />

</template>

<style scoped>
.btncontainer{
  display: flex; 
  flex-direction: column;         
  justify-content: center; 
  align-items: center;     
  height: 60vh;
}
.h3{
  font-size: 40px;
  font-weight: bolder;
  text-align: center;
}
.btn1{
  font-size: 30px;
  padding: 30px;
  min-width: max-content;
  margin: 0 15px;
}
</style>

<script setup>
import Footer from '@/components/footer.vue'
import Header from '@/components/header.vue';
import Navbar from '@/components/navbar.vue'

const changeLang = (lang) => {
  locale.value = lang;
    localStorage.setItem('lang', lang);
}
</script>