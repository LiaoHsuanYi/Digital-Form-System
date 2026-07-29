<template>
<Navbar />
<div class="form-bg">
    <div class="form-body">
        <form ref="checkRequired" @submit.prevent="submitMachine">
            <div class="form-title">
                {{ $t('machine.title') }}
            </div>
            
            <section>
                <div class="sec-head">
                    <div class="sec-bar"></div>
                    <div class="sec-lbl">{{  $t('machine.labels[0]') }}</div>
                </div>
                <div class="field-grid">
                    <div class="field-group">
                        <label class="field-label">{{ $t('machine.date') }}</label>
                        <input type="datetime-local" class="field-input" v-model="form.date" readonly>
                    </div>
                    <div class="field-group">
                        <label class="field-label">{{ $t('machine.machineNo') }}</label> 
                        <input type="text" class="field-input" v-model="form.machineNo" @blur="identifyParams" required>
                    </div>
                    <div class="field-group">
                        <label class="field-label">{{ $t('machine.batchNo') }}</label>
                        <input type="text" class="field-input" v-model="form.batchNo" @blur="returnMoldId" required>
                    </div>
                    <div class="field-group">
                        <label class="field-label">{{ $t('machine.machineType') }}</label> 
                        <input type="text" class="field-input" v-model="form.machineType" required>
                    </div>
                    <div class="field-group">
                        <label class="field-label">{{ $t('machine.moldId') }}</label>
                        <input type="text" class="field-input" v-model="form.moldId" readonly>
                    </div>
                </div>
            </section>

            <section v-if="checkParams"> 
                <div class="sec-head">
                    <div class="sec-bar"></div>
                    <div class="sec-lbl">{{ $t('machine.labels[1]') }}</div>
                </div>

                <div class="params-panel">
                    <div class="param-grid">

                        <div class="param-group">
                            <span class="param-label">{{ $t('machine.setting.labels[0]') }}</span>
                            <div class="radio-group">
                                <input type="radio" id="adc12" checked>
                                <label for="adc12">ADC12</label>
                            </div>
                        </div>
                        <div class="param-group">
                            <span class="param-label">{{ $t('machine.setting.labels[1]') }}</span>
                            <input class="param-input" type="number" step="any" v-model.number="form.n2Press" required>
                            </div>
                        <div class="param-group">
                            <span class="param-label">{{ $t('machine.setting.labels[2]') }}</span>
                            <input class="param-input" type="number" step="any" v-model.number="form.openTime" required>
                        </div>
                        <div class="param-group">
                            <span class="param-label">{{ $t('machine.setting.labels[3]') }}</span>
                            <input class="param-input" type="number" step="any" v-model.number="form.pressTime" required>
                        </div>

                        <div class="param-subcard">
                            <div class="param-subcard-title">{{ $t('machine.setting.labels[4]') }}</div>
                            <div class="sub-grid">
                                <div class="param-group">
                                    <span class="param-sublabel">{{ $t('machine.setting.sublabels[0]') }}</span>
                                    <input class="param-input" type="number" step="any" v-model.number="form.setTemp" required>
                                </div>
                                <div class="param-group">
                                    <span class="param-sublabel">{{ $t('machine.setting.sublabels[1]') }}</span>
                                    <input class="param-input" type="number" step="any" v-model.number="form.realTemp" required>
                                </div>
                            </div>
                        </div>
                        <div class="param-subcard">
                            <div class="param-subcard-title">{{ $t('machine.setting.labels[5]') }}</div>
                            <div class="sub-grid">
                                <div class="param-group">
                                    <span class="param-sublabel">{{ $t('machine.setting.sublabels[2]') }}</span>
                                    <input class="param-input" type="number" step="any" v-model.number="form.fixRelTime" required>
                                </div>
                                <div class="param-group">
                                    <span class="param-sublabel">{{ $t('machine.setting.sublabels[3]') }}</span>
                                    <input class="param-input" type="number" step="any" v-model.number="form.movRelTime" required>
                                </div>
                            </div>
                        </div>

                        <div class="param-group">
                            <span class="param-label">{{ $t('machine.setting.labels[6]') }}</span>
                            <input class="param-input" type="number" step="any" v-model.number="form.lowSpeed" required>
                        </div>
                        <div class="param-group">
                            <span class="param-label">{{ $t('machine.setting.labels[7]') }}</span>
                            <input class="param-input" type="number" step="any" v-model.number="form.highSpeed" required>
                        </div>
                        <div class="param-group">
                            <span class="param-label">{{ $t('machine.setting.labels[8]') }}</span>
                            <input class="param-input" type="number" step="any" v-model.number="form.position" required>
                        </div>
                        <div class="param-group">
                            <span class="param-label">{{ $t('machine.setting.labels[9]') }}</span>
                            <input class="param-input" type="number" step="any" v-model.number="form.injectPress">
                        </div>
                    </div>
                </div>
            </section>

            <section> 
                <div class="sec-head">
                    <div class="sec-bar"></div>
                    <div class="sec-lbl">{{  $t('machine.labels[3]') }}</div>
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
                    <label class="sec-lbl">{{  $t('machine.labels[4]') }}</label>
                </div>
                <div class="upload-zone" @click="triggerUpload">
                    <div class="upload-content">
                        <div class="upload-icon">📁</div>
                        <div class="upload-text">
                            <!--when fileError != '', then output-->
                            <span v-if="fileError" class="file-error">
                                {{ fileError }}
                            </span>
                            <div v-else-if="form.files.length" class="file-selected">
                                <div v-for="(file, index) in form.files" :key="index">
                                    {{ file.name }}
                                </div>
                            </div>
                            <span v-else>
                                {{ $t('machine.fileUpload') }}
                            </span>
                        </div>
                    </div>

                    <input 
                        type="file" 
                        multiple
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
import { reactive, ref, watch, computed } from 'vue'
import { formatNow } from '@/utils/date.js'
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()

const STORAGE_KEY = 'machine_draft'
 
//initialization: read draft from localStorage
const savedDraft = localStorage.getItem(STORAGE_KEY)
const parsedDraft = savedDraft ? JSON.parse(savedDraft) : null

//initialization
const checkRequired = ref();
const checkParams = ref(true);
const fileInput = ref('');
const fileError = ref('');
//main form
const form = reactive({
  ...(parsedDraft || {
    machineNo: '',
    machineType: '',
    batchNo: '',
    moldId: '',
    material: 'ADC12',
    n2Press: '',
    openTime: '',
    pressTime: '',
    setTemp: '',
    realTemp: '',
    fixRelTime: '',
    movRelTime: '',
    lowSpeed: '',
    highSpeed: '',
    position: '',
    injectPress: '',
    issues: [],
    files: []
  }),
  date: formatNow('minute')   
})

//automatically show moldId
const returnMoldId = () => {
    form.moldId = form.batchNo.split('-')[1] || '';
    form.moldId = String(form.moldId).padStart(3, '#0');
}

//data actively save to localStorage
watch(form, () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(form))
}, { deep: true })

//clear & reset
const resetform = () => {
  localStorage.removeItem(STORAGE_KEY)
  Object.keys(form).forEach(key => {
    if (Array.isArray(form[key])) form[key] = [];
    else form[key] = '';
  })
    form.date = formatNow('minute');
    form.material = 'ADC12';

    fileInput.value.value = '';
    fileError.value = '';
    checkParams.value = true;
}

//value assignment
const issueType = computed(() => [
    { key: '鑄塞漏水', label: t('machine.checklist[0]') },
    { key: '料管漏水', label: t('machine.checklist[1]') },
    { key: '模具漏水', label: t('machine.checklist[2]') },
    { key: '離型劑過多', label: t('machine.checklist[3]') },
    { key: '排氣閥阻塞', label: t('machine.checklist[4]') },
    { key: '離型劑噴頭漏水', label: t('machine.checklist[5]') },
    { key: '料管沒潤滑', label: t('machine.checklist[6]') },
    { key: '輸送機風扇沒運轉', label: t('machine.checklist[7]') },
    { key: '模具循環水沒開啟', label: t('machine.checklist[8]') }
])

//setting parameters block display or not
const allowMachine = [
  'DIE-011',
  'DIE-012',
  'DIE-014',
  'DIE-015',
  'DIE-016',
  'DIE-017'
]

function identifyParams()
{
    checkParams.value = !allowMachine.includes(form.machineNo)
}

//file processing
const triggerUpload = () => {
    fileInput.value.click();
};

const handleFileChange = (event) => {

    const selectedFiles = Array.from(event.target.files);
    fileError.value = '';

    if (selectedFiles.length === 0) return;

    for (const file of selectedFiles) {
        if (file.size > 5 * 1024 * 1024) {
            fileError.value = t('machine.fileLimit');
            event.target.value = '';
            return;
        }
    }
    form.files = selectedFiles;
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
        return confirm(t('machine.setOK'));
    }

    if (form.files.length === 0) 
    {
        fileError.value = t('machine.fileNG');
        return false;
    }
    
    return true;
};

//form submit
const submitMachine = async() => {
    if(!checkSet())
        return;

    form.moldId = String(form.moldId).padStart(3, '#0');
    resetform();
}

</script>

<style scoped>
/* setting */
.params-panel {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 20px 22px;
  margin-bottom: 18px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
}

.param-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px 18px;
}

.param-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.param-label {
  font-size: 20px;
  font-weight: 600;
  color: var(--text);
}

.param-sublabel {
  font-size: 18px;
  font-weight: 550;
  color: var(--sub);
  margin: 2px 0 2px;
}

.param-input {
  border: 1.5px solid var(--border);
  border-radius: 8px;
  padding: 9px 12px;
  font-size: 16px;
  color: var(--text);
  outline: none;
  background: var(--input-bg, #f7f8fa);
  width: 100%;
  transition: border 0.18s, box-shadow 0.18s;
}

.param-input:focus {
  border-color: var(--green);
  box-shadow: 0 0 0 3px var(--green-glow);
  background: #fff;
}

.param-input:hover:not(:focus) {
  border-color: var(--border-hover, #b0b8c1);
}

/* group container */
.param-subcard {
  grid-column: span 2;
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 12px 14px 14px;
  margin: 10px 0 5px;
  background: var(--card);
}

.param-subcard-title {
  font-size: 20px;
  font-weight: 600;
  color: var(--text);
  display: flex;
  align-items: center;
  gap: 6px;
}

.param-subcard-title::before {
  content: '';
  display: inline-block;
  width: 3px;
  height: 18px;
  background: var(--green);
  border-radius: 2px;
  margin-right: 5px;
}

.sub-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.radio-group {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 6px;
}

.radio-group input[type="radio"] {
  width: 16px;
  height: 16px;
}

.radio-group label {
  font-size: 16px;
  color: var(--text);
  cursor: pointer;
}

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
  padding: 12px 12px;
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

.file-error{
  font-weight: bold; 
  color: red;
}

.file-selected {
  color: var(--green);
  font-weight: 600;
}
</style>