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

            <section> 
                <div class="sec-head">
                    <div class="sec-bar"></div>
                    <div class="sec-lbl">機器參數</div>
                </div>

                <div class="params-panel">
                    <div class="param-grid">

                        <div class="param-group">
                            <span class="param-label">合金材料</span>
                            <div class="radio-group">
                                <input type="radio" id="adc12" checked>
                                <label for="adc12">ADC12</label>
                            </div>
                        </div>
                        <div class="param-group">
                            <span class="param-label">氮氣壓力</span>
                            <input class="param-input" type="number" v-model.number="form.n2press" required>
                        </div>
                        <div class="param-group">
                            <span class="param-label">開模時間（秒）</span>
                            <input class="param-input" type="number" v-model.number="form.openTime" required>
                        </div>
                        <div class="param-group">
                            <span class="param-label">增壓時間（秒）</span>
                            <input class="param-input" type="number" v-model.number="form.pressTime" required>
                        </div>

                        <div class="param-subcard">
                            <div class="param-subcard-title">鋁湯溫度</div>
                            <div class="sub-grid">
                                <div class="param-group">
                                    <span class="param-sublabel">設定溫度</span>
                                    <input class="param-input" type="number" v-model.number="form.setTemp" required>
                                </div>
                                <div class="param-group">
                                    <span class="param-sublabel">實際溫度</span>
                                    <input class="param-input" type="number" v-model.number="form.realTemp" required>
                                </div>
                            </div>
                        </div>
                        <div class="param-subcard">
                            <div class="param-subcard-title">離型劑時間（秒）</div>
                            <div class="sub-grid">
                                <div class="param-group">
                                    <span class="param-sublabel">固定側</span>
                                    <input class="param-input" type="number" v-model.number="form.fix_relTime" required>
                                </div>
                                <div class="param-group">
                                    <span class="param-sublabel">活動側</span>
                                    <input class="param-input" type="number" v-model.number="form.mov_relTime" required>
                                </div>
                            </div>
                        </div>

                        <div class="param-group">
                            <span class="param-label">低速</span>
                            <input class="param-input" type="number" v-model.number="form.lowSpeed" required>
                        </div>
                        <div class="param-group">
                            <span class="param-label">高速</span>
                            <input class="param-input" type="number" v-model.number="form.highSpeed" required>
                        </div>
                        <div class="param-group">
                            <span class="param-label">高速行程位置</span>
                            <input class="param-input" type="number" v-model.number="form.position" required>
                        </div>
                        <div class="param-group">
                            <span class="param-label">鑄造壓力</span>
                            <input class="param-input" type="number" v-model.number="form.injectPress" required>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div class="reason-panel">
                    <div class="reason-header">
                        <div class="reason-header-left">
                            異常原因
                        </div>
                        <span class="reason-tag">⚠ 異常填寫欄位</span>
                    </div>
                    <input type="text" class="reason-input" v-model="form.reason" placeholder="請輸入異常原因">
                </div>
            </section>


            <section> 
                <div class="sec-head">
                    <div class="sec-bar"></div>
                    <div class="sec-lbl">{{  $t('machine.labels[1]') }}</div>
                </div>
                <div class="check-panel">
                    <div class="check-grid">
                        <label 
                        class="check-item mb-1" 
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

            <section> 
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
  material: 'ADC12',
  n2press: '',
  openTime: '',
  pressTime: '',
  setTemp: '',
  realTemp: '',
  fix_relTime: '',
  mov_relTime: '',
  lowSpeed: '',
  highSpeed: '',
  position: '',
  injectPress: '',
  reason: '',
  issues: [],
  files: []
})
const warning = reactive({
  n2press: '',
  openTime: '',
  pressTime: '',
  setTemp: '',
  realTemp: '',
  fix_relTime: '',
  mov_relTime: '',
  lowSpeed: '',
  highSpeed: '',
  position: '',
  injectPress: '',
});

//clear & reset
const resetform = () => { 
    form.date = formatNow('minute');
    form.machine_no = '';
    form.material_no = '';
    form.material_type = '';
    form.mold_id = '';
    form.material = 'ADC12';
    form.n2press = '';
    form.openTime = '';
    form.pressTime = '';
    form.setTemp = '';
    form.realTemp = '';
    form.fix_relTime = '';
    form.mov_relTime = '';
    form.lowSpeed = '';
    form.highSpeed = '';
    form.position = '';
    form.injectPress = '';
    form.reason = '';
    form.issues = [];
    form.files = [];
    fileInput.value.value = '';
    fileName.value = '';
    fileError.value = '';
    Object.keys(warning).forEach(key => {
        warning[key] = '';
    });
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

<style scoped>
/* checkbox */
.check-panel {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 20px;
  margin-bottom: 22px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
}

.check-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.check-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 13px;
  border: 1.5px solid #eee;
  border-radius: 9px;
  cursor: pointer;
  background: #fafafa;
  transition: all 0.18s;
  user-select: none;
}

.check-item:hover {
  border-color: var(--green);
  background: var(--green-light);
}

.check-item input[type="checkbox"] {
  appearance: none;
  -webkit-appearance: none;
  box-sizing: border-box;
  width: 18px;
  height: 18px;
  border: 2px solid #ccc;
  border-radius: 4px;
  background: #fff;
  display: grid;
  place-items: center;
  flex: 0 0 18px;
  margin: 0;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
}

.check-item input[type="checkbox"]:checked {
  background: var(--green);      
  border-color: var(--green);
}

.check-item input[type="checkbox"]:checked::before {
  content: "";
  width: 10px;
  height: 6px;
  border-left: 2px solid #fff;  
  border-bottom: 2px solid #fff;
  transform: rotate(-45deg) translate(1px, -1px);
}

.check-item span {
  font-size: 18px;
  color: #363636;
  font-weight: 600;
  line-height: 1.2;
}

/* file upload */
.upload-zone {
  border: 2px dashed #d8d8d8;
  border-radius: 12px;
  padding: 30px;
  cursor: pointer;
  background: var(--card);
  transition: all 0.2s;
  margin-bottom: 26px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
  display: flex;
  justify-content: center; 
  align-items: center;     
  min-height: 120px;
}

.upload-zone:hover {
  border-color: var(--green);
  background: var(--green-light);
}

.upload-content {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px; 
}

.upload-icon {
  font-size: 28px;
  color: #a0a0a0;
}

.upload-text {
  font-size: 18px;
  color: #363636;
  font-weight: 500;
}

.file-selected {
  color: var(--green);
  font-weight: 600;
}
</style>