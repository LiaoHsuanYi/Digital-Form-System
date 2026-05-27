<template>
<Header />
<Navbar />
<form ref="checkRequired" @submit.prevent="submitMachine">
    <section>
        <div class="container">
            <div class="row">
                <span class="badge bg-dark mt-5 mb-5" style="font-weight: bolder; font-size: x-large;">{{ $t('machine.title') }}</span>
            </div>
        </div>
        <div class="container">
            <h3><span class="badge bg-success mb-3">{{  $t('machine.labels[0]') }}</span></h3>
            <div class="row mb-4">
                <div class="col">
                    <label class="label">{{ $t('machine.date') }}</label>
                    <input type="datetime-local" class="form-control" v-model="form.date">
                </div>
                <div class="col">
                    <label class="label">{{ $t('machine.machine_no') }}</label> 
                    <input type="text" class="form-control" v-model="form.machine_no" required>
                </div>
                <div class="col">
                    <label class="label">{{ $t('machine.material_no') }}</label>
                    <input type="text" class="form-control" v-model="form.material_no" required>
                </div>
                <div class="col">
                    <label class="label">{{ $t('machine.material_type') }}</label> 
                    <input type="text" class="form-control" v-model="form.material_type" required>
                </div>
                <div class="col">
                    <label class="label">{{ $t('machine.mold_id') }}</label>
                    <input type="text" class="form-control" v-model="form.mold_id" required>
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
                    <input type="text" class="form-control" placeholder="請填寫原因@." v-model="form.reason">
                </div>
            </div>
        </div>
    </section>-->

    <section> <!-- name to be modified-->
        <div class="container">
            <h3><span class="badge bg-success mb-4">{{ $t('machine.labels[1]') }}</span></h3>
            <div class="row">
                <div
                    class="col-4 mb-3"
                    v-for="issue in issueType"
                    :key="issue.key"
                >
                    <label class="h5">
                        <input
                            class="form-check-input"
                            type="checkbox"
                            v-model="form.issues"
                            :value="issue.key"
                        >
                        {{ issue.label }}
                    </label>
                </div>
            </div>
        </div>
    </section>

    <section>
        <div class="container">
            <div class="row-3">
            <h3><span class="badge bg-success mb-3">{{ $t('machine.labels[2]') }}</span></h3>
            </div>
            <div class="row mb-5">
                <div class="col-6">
                    <input type="file" class="form-control" accept=".jpg, .png" @change="fileconvert" ref="fileInput">
                    <p class="red mt-3">{{ fileError }}</p>
                </div>
            </div>
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
import Navbar from '@/components/navbar.vue'
import Header from '@/components/header.vue';
import Footer from '@/components/footer.vue'
import { reactive, ref } from 'vue'
import { formatNow } from '@/utils/date.js'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

//initialization
const checkRequired = ref();
const fileInput = ref('');
const fileError = ref('');
const form = reactive({ 
  date: formatNow('minute'),
  machine_no: '',
  material_no: '',
  material_type: '',
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
  issues: [],
  files: []
})

//clear & reset
const resetform = () => { 
    form.date = formatNow('minute');
    form.machine_no = '';
    form.material_no = '';
    form.material_type = '';
    form.mold_id = '';
    form.issues = [];
    form.files = [];
    fileInput.value.value = '';
}

//value assignment
const issueType = [
    { key: '1', label: t('machine.checklist[0]') },
    { key: '2', label: t('machine.checklist[1]') },
    { key: '3', label: t('machine.checklist[2]') },
    { key: '4', label: t('machine.checklist[3]') },
    { key: '5', label: t('machine.checklist[4]') },
    { key: '6', label: t('machine.checklist[5]') },
    { key: '7', label: t('machine.checklist[6]') },
    { key: '8', label: t('machine.checklist[7]') },
    { key: '9', label: t('machine.checklist[8]') }
]

//file convert
const fileconvert = (e) => {

  form.files = Array.from(e.target.files)

}

//validation
const checkSet = () => {
    
    if (!checkRequired.value.checkValidity()) //check required
    {
        checkRequired.value.reportValidity();
        return false;
    }

    if (form.issues.length === 0) 
    {
        return confirm(t('machine.set_ok'));
    }
    else
    {
        if (form.files.length === 0) 
        {      
            fileError.value = t('machine.file_ng');
            return false;
        }
        else
        {
            if(form.files[0].size > 5 *1024 * 1024) //size to be modified
            {
                fileError.value = t('machine.file_limit');
                return false;
            }
            else 
            {
                fileError.value = "";
                return true;
            }
        }
    }
}

//form submit
const submitMachine = async() => {
    if(!checkSet())
        return;

    resetform();
}



</script>