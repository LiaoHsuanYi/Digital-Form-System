<template>
<div class="container text-center">
        <img src="../assets/1.jpg" class="img-fluid w-50">
</div>
<Navbar />
<form>
    <section>
        <div class="container">
            <div class="row">
                <span class="badge bg-dark mt-5 mb-5" style="font-weight: bolder; font-size: x-large;">作業自主巡迴檢查表 - 參數與設備檢查</span>
            </div>
        </div>
        <div class="container">
            <h3><span class="badge bg-success mb-3">基本資料</span></h3>
            <div class="row mb-4">
                <div class="col-3">
                    <label class="label">日期和時間</label>
                    <input type="datetime-local" class="form-control" v-model="form.date">
                </div>
                <div class="col-3">
                    <label class="label">機台編號</label> <!--Barcode-->
                    <input type="text" class="form-control" v-model="form.machine_num">
                </div>
                <div class="col-3">
                    <label class="label">機種</label> <!--Barcode slice-->
                    <input type="text" class="form-control" v-model="form.machine_type">
                </div>
                <div class="col-3">
                    <label class="label">模號</label>
                    <input type="text" class="form-control" v-model="form.mold_id">
                </div>
            </div>
        </div>
    </section>



    <!--<section>
        <div class="container">
            <h3><span class="badge bg-success mb-3">機器參數</span></h3>
            <div class="row mb-4">
                <div class="col">
                    <label class="label">合金材料</label>
                    <div class="form-check">
                    <input class="form-check-input" type="radio" checked>
                        <h5>ADC12</h5>
                    </div>
                </div>
                <div class="col">
                    <label class="label">氮氣壓力</label>
                    <input type="number" class="form-control" v-model.number="form.n2_press">
                </div>
                <div class="col">
                    <label class="label">鋁湯設定溫度</label>
                    <input type="number" class="form-control" v-model.number="form.set_temp">
                </div>
                <div class="col">
                    <label class="label">實際溫度</label>
                    <input type="number" class="form-control" v-model.number="form.real_temp">
                </div>
            </div>

            <div class="row mb-4">
                <div class="col">
                    <label class="label">開模時間(秒)</label>
                    <input type="number" class="form-control" v-model.number="form.open_time">
                </div>
                <div class="col">
                    <label class="label">離型劑時間(秒)</label>
                    <input type="number" class="form-control" v-model.number="form.rel_time">
                </div>
                <div class="col">
                    <label class="label">增壓時間(秒)</label>
                    <input type="number" class="form-control" v-model.number="form.press_time">
                </div>
            </div>
            <div class="row mb-4">
                <div class="col">
                    <label class="label">低速</label>
                    <input type="number" class="form-control" v-model.number="form.low_speed">
                </div>
                <div class="col">
                    <label class="label">高速</label>
                    <input type="number" class="form-control" v-model.number="form.high_speed">
                </div>
                <div class="col">
                    <label class="label">高速行程位置</label>
                    <input type="number" class="form-control" v-model.number="form.position">
                </div>  
                <div class="col">
                    <label class="label">鑄造壓力</label>
                    <input type="number" class="form-control" v-model.number="form.inject_press">
                </div>  
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="d-flex justify-content-center">
                    <h2><span class="badge bg-danger rounded-pill mb-3">原因說明</span></h2>
                </div>
            </div>
            <div class="row mb-4">
                <div class="col">
                    <input type="text" class="form-control" placeholder="請填寫原因..." v-model="form.reason">
                </div>
            </div>
        </div>
    </section>-->

    <section> <!-- name to be modified-->
        <div class="container">
            <h3><span class="badge bg-success mb-4">鑄件砂孔預防確認</span></h3>
            <div class="row">
                <div class="col">
                    <label class="h5">
                    <input class="form-check-input" type="checkbox" v-model="form.issues">
                    鑄塞漏水
                    </label>
                </div>
                <div class="col">
                    <label class="h5">
                    <input class="form-check-input" type="checkbox" v-model="form.issues">
                    料管漏水
                    </label>            
                </div>
                <div class="col">
                    <label class="h5">
                    <input class="form-check-input" type="checkbox" v-model="form.issues">
                    模具漏水
                    </label>            
                </div>
            </div>
            <br>
            <div class="row">
                <div class="col">
                    <label class="h5">
                    <input class="form-check-input" type="checkbox" v-model="form.issues">
                    離型劑過多
                    </label>            
                </div>
                <div class="col">
                    <label class="h5">
                    <input class="form-check-input" type="checkbox" v-model="form.issues">
                    排氣閥阻塞
                    </label>            
                </div>
                <div class="col">
                    <label class="h5">
                    <input class="form-check-input" type="checkbox" v-model="form.issues">
                    離型劑噴頭漏水
                    </label>            
                </div>  
            </div>
            <br>
            <div class="row mb-4">
                <div class="col">
                    <label class="h5">
                    <input class="form-check-input" type="checkbox" v-model="form.issues">
                    料管沒潤滑
                    </label>            
                </div>
                <div class="col">
                    <label class="h5">
                    <input class="form-check-input" type="checkbox" v-model="form.issues">
                    輸送機風扇沒運轉
                    </label>            
                </div>
                <div class="col">
                    <label class="h5">
                    <input class="form-check-input" type="checkbox" v-model="form.issues">
                    模具循環水沒開啟
                    </label>            
                </div>
            </div>
        </div>
    </section>

    <section>
        <div class="container">
            <div class="row-3">
            <h3><span class="badge bg-success mb-3">檔案上傳</span></h3>
            </div>
            <div class="row mb-5">
                <div class="col-6">
                    <input type="file" class="form-control" accept=".jpg, .png">
                </div>
            </div>
            <p class="red2 mt-3 file_warn"></p> 
        </div>
    </section>


    <div class="container text-center">
        <button type="submit" class="btn btn-outline-success btn-lg col-4 mb-4">Submit</button>
    </div>
</form>

<Footer />

</template>

<style scoped>
.h5{
  font-size: 23px;
  font-weight: bolder;
}
</style>

<script setup>
import Navbar from '../components/navbar.vue'
import Footer from '../components/footer.vue'
import { reactive } from 'vue'
import { formatNow } from '../utils/date.js'

const form = reactive({
  date: formatNow('minute'),
  machine_num: '',
  machine_type: '',
  mold_id: '',
  /*material: 'ADC12',
  n2_press: '',
  set_temp: '',
  real_temp: '',
  open_time: '',
  rel_time: '',
  press_time: '',
  low_speed: '',
  high_speed: '',
  position: '',
  inject_press: '',
  reason: '',*/
  issues: []
})




</script>