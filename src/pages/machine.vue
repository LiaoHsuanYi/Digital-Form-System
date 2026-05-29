<template>
<Navbar />
<div class="form-bg">
    <div class="form-body">
    <form ref="checkRequired" @submit.prevent="submitMachine">
        <section>
            <div class="form-hero">
                {{ $t('machine.title') }}
            </div>
            <div class="sec-head">
                <div class="sec-bar"></div>
                <div class="sec-lbl">{{  $t('machine.labels[0]') }}</div>
            </div>
            <div class="field-grid">
                <div class="field-group">
                    <label class="field-label">{{ $t('machine.date') }}</label>
                    <input type="datetime-local" class="field-input" v-model="form.date">
                </div>
                <div class="field-group">
                    <label class="field-label">{{ $t('machine.machine_no') }}</label> 
                    <input type="text" class="field-input" v-model="form.machine_no" required>
                </div>
                <div class="field-group">
                    <label class="field-label">{{ $t('machine.material_no') }}</label>
                    <input type="text" class="field-input" v-model="form.material_no" required>
                </div>
                <div class="field-group">
                    <label class="field-label">{{ $t('machine.material_type') }}</label> 
                    <input type="text" class="field-input" v-model="form.material_type" required>
                </div>
                <div class="field-group">
                    <label class="field-label">{{ $t('machine.mold_id') }}</label>
                    <input type="text" class="field-input" v-model="form.mold_id" required>
                </div>
            </div>
        </section>

        <!--<section>
            <div class="sec-head">
                <div class="sec-bar"></div>
                <div class="sec-lbl">機器參數</div>
            </div>
            <div class="field-group mb-4">
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
            <div class="sec-head">
                <div class="sec-bar"></div>
                <div class="sec-lbl">{{  $t('machine.labels[1]') }}</div>
            </div>
            <div class="check-panel">
                <div class="check-grid">
                    <label 
                    class="check-item" 
                    v-for="issue in issueType" 
                    :key="issue.key"
                    >
                        <input 
                            type="checkbox" 
                            class="form-check-input" 
                            v-model="form.issues" 
                            :value="issue.key" 
                        />
                        <span>{{ issue.label }}</span>
                    </label>
                </div>
            </div>
        </section>

        <section> <!--remember to modify error message-->
            <div class="sec-head">
                <div class="sec-bar"></div>
                <label class="sec-lbl">{{  $t('machine.labels[2]') }}</label>
            </div>
            <div class="upload-zone" @click="triggerUpload">
                <div class="upload-content">
                    <div class="upload-icon">📁</div>
                    <div class="upload-text">
                        <span v-if="fileError" class="file-error"  style="font-weight: bold; color: red;">
                            {{ fileError }}
                        </span>
                        <span v-else-if="fileName" class="file-selected">{{ fileName }}</span>
                        <span v-else>{{  $t('machine.file_upload') }}</span>
                    </div>
                </div>

                <input 
                    type="file" 
                    ref="fileInput" 
                    style="display: none" 
                    @change="handleFileChange" 
                    accept=".jpg, .png"
                />
            </div>
        </section>


        <div class="submit-wrap">
            <button type="submit" class="submit-btn">Submit</button>
        </div>
    </form>
    </div>
</div>
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
import Footer from '@/components/footer.vue'
import { reactive, ref } from 'vue'
import { formatNow } from '@/utils/date.js'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

//initialization
const checkRequired = ref();
const fileInput = ref('');
const fileName = ref('');
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
    fileName.value = '';
    fileError.value ='';
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

//file processing
const triggerUpload = () => {
    fileInput.value.click();
};

const handleFileChange = (event) => {

    const file = event.target.files[0];
    fileName.value = '';
    fileError.value = '';
    form.files = [];

    if (!file) return;

    if (file.size > 5 * 1024 * 1024) 
    {
        fileError.value = t('machine.file_limit');
        event.target.value = '';
        return;
    }

    fileName.value = file.name;
    form.files = [file];
};

//validation
const checkSet = () => {
    if (!checkRequired.value.checkValidity()) 
    {
        checkRequired.value.reportValidity();
        return false;
    }

    fileError.value = '';

    if (form.issues.length === 0) 
    {
        return confirm(t('machine.set_ok'));
    }

    if (form.files.length === 0) 
    {
        fileError.value = t('machine.file_ng');
        return false;
    }
    
    return true;
};

//form submit
const submitMachine = async() => {
    if(!checkSet())
        return;

    resetform();
}



</script>