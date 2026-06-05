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

            <section> <!-- parameters to be determined then write functions-->
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

                                <input
                                    class="param-input"
                                    :class="{ 'inputError-red': warning.n2press }"
                                    type="number"
                                    @input="checkN2press"
                                    v-model.number="form.n2press"
                                    required
                                />

                                <label v-if="warning.n2press" class="field-error inputError-red">
                                    {{ warning.n2press }}
                                </label>
                            </div>
                        <div class="param-group">
                            <span class="param-label">{{ $t('machine.setting.labels[2]') }}</span>
                            <input class="param-input" type="number" v-model.number="form.openTime" required>
                        </div>
                        <div class="param-group">
                            <span class="param-label">{{ $t('machine.setting.labels[3]') }}</span>
                            <input class="param-input" type="number" v-model.number="form.pressTime" required>
                        </div>

                        <div class="param-subcard">
                            <div class="param-subcard-title">{{ $t('machine.setting.labels[4]') }}</div>
                            <div class="sub-grid">
                                <div class="param-group">
                                    <span class="param-sublabel">{{ $t('machine.setting.sublabels[0]') }}</span>
                                    <input
                                        class="param-input"
                                        :class="tempclass"
                                        type="number"
                                        v-model.number="form.setTemp"
                                        @input="checktemp"
                                        required
                                    />
                                </div>
                                <div class="param-group">
                                    <span class="param-sublabel">{{ $t('machine.setting.sublabels[1]') }}</span>
                                    <input
                                        class="param-input"
                                        :class="tempclass"
                                        type="number"
                                        @input="checktemp"
                                        v-model.number="form.realTemp"
                                        required
                                    />
                                    <label v-if="warning.temp" class="field-error" :class="tempclass">
                                        {{ warning.temp }}
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="param-subcard">
                            <div class="param-subcard-title">{{ $t('machine.setting.labels[5]') }}</div>
                            <div class="sub-grid">
                                <div class="param-group">
                                    <span class="param-sublabel">{{ $t('machine.setting.sublabels[2]') }}</span>
                                    <input class="param-input" type="number" v-model.number="form.fix_relTime" required>
                                </div>
                                <div class="param-group">
                                    <span class="param-sublabel">{{ $t('machine.setting.sublabels[3]') }}</span>
                                    <input class="param-input" type="number" v-model.number="form.mov_relTime" required>
                                </div>
                            </div>
                        </div>

                        <div class="param-group">
                            <span class="param-label">{{ $t('machine.setting.labels[6]') }}</span>
                            <input class="param-input" type="number" v-model.number="form.lowSpeed" required>
                        </div>
                        <div class="param-group">
                            <span class="param-label">{{ $t('machine.setting.labels[7]') }}</span>
                            <input class="param-input" type="number" v-model.number="form.highSpeed" required>
                        </div>
                        <div class="param-group">
                            <span class="param-label">{{ $t('machine.setting.labels[8]') }}</span>
                            <input class="param-input" type="number" v-model.number="form.position" required>
                        </div>
                        <div class="param-group">
                            <span class="param-label">{{ $t('machine.setting.labels[9]') }}</span>
                            <input class="param-input" type="number" v-model.number="form.injectPress" required>
                        </div>
                    </div>
                </div>
            </section>

            <section v-if="inputReason">
                <div class="reason-panel">
                    <div class="reason-header">
                        <div class="reason-header-left">
                            {{ $t('machine.labels[2]') }}
                        </div>
                        <span class="reason-tag">⚠ Error Field</span>
                    </div>
                    <input type="text" class="reason-input" v-model="form.reason" :placeholder="$t('machine.reasonInput')" required>
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
import { reactive, ref, computed } from 'vue'
import { formatNow } from '@/utils/date.js'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

//initialization
const checkRequired = ref();
const tempclass = ref('');
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
  temp: '',
  fix_relTime: '',
  mov_relTime: '',
  lowSpeed: '',
  highSpeed: '',
  position: '',
  injectPress: '',
});

//clear & reset
const resetform = () => { 
    Object.keys(form).forEach(key => {
        if (Array.isArray(form[key])) 
            form[key] = [];
        else 
            form[key] = '';
    })
    form.date = formatNow('minute');
    form.material = 'ADC12';

    tempclass.value = '';
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

//function check
function checkN2press() //n2 press validation
{
    if(form.n2press < 0)
    {
        warning.n2press = t('machine.error');
    }
    else if (form.n2press <= 8.3)
    {
        warning.n2press = t('machine.warning');
    }
    else
    {
        warning.n2press = '';
    }
}

function checktemp()
{
    if(form.setTemp != '' && form.realTemp != '')
    {
        if(form.setTemp < 0 || form.realTemp < 0)
        {
            warning.temp = t('machine.error');
        }
        else if(form.realTemp - form.setTemp > 10)
        {
            warning.temp = t('machine.highTemp');
            tempclass.value = 'inputError-red';
        }
        else if(form.setTemp - form.realTemp > 10)
        {
            warning.temp = t('machine.lowTemp');
            tempclass.value = 'inputError-blue';
        }
        else
        {
            warning.temp = '';
            tempclass.value = '';
        }

    }
    
}

//reason block display control
const inputReason = computed(() => {
    return Object.values(warning).some(value => value !== '')
})

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

    if (form.issues.length === 0 && form.reason === '') 
    {
        return confirm(t('machine.setOK'));
    }
    else if(form.issues.length === 0 && form.reason !== '')
    {
        return confirm(t('machine.setNG'));
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

/* input warning */
.param-input.inputError-red {
  border-color: #e74c3c;
  background: #fff8f8;
}

.param-input.inputError-red:focus {
  box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1);
}

.field-error.inputError-red {
  font-size: 16px;
  color: #e74c3c;
  margin-top: 3px;
  display: block;
}

.param-input.inputError-blue {
  border-color: #3498db;
  background: #f5fbff;
}

.param-input.inputError-blue:focus {
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
}

.field-error.inputError-blue {
  font-size: 16px;
  color: #3498db;
  margin-top: 3px;
  display: block;
}

.span2 { grid-column: span 2; }

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

/* reason */
.reason-panel {
  background: var(--card);
  border: 1px solid #f5c6c0;
  border-radius: 14px;
  padding: 20px 22px;
  margin-bottom: 18px;
  box-shadow: 0 1px 4px rgba(231, 76, 60, 0.06);
}

.reason-header {
  display: flex;
  align-items: center;
  justify-content: space-between;  
  margin-bottom: 14px;
}

.reason-header-left {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 20px;
  font-weight: 600;
  color: var(--text);
}

.reason-header-left::before {
  content: '';
  display: inline-block;
  width: 3px;
  height: 18px;
  background: #e74c3c;
  border-radius: 2px;
  margin-right: 5px;
}

.reason-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #fff0ee;
  border: 1.5px solid #f5c6c0;
  color: #c0392b;
  border-radius: 8px;
  padding: 5px 14px;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.3px;
}

.reason-input {
  width: 100%;
  border: 1.5px solid var(--border);
  border-radius: 9px;
  padding: 11px 14px;
  font-size: 16px;
  color: var(--text);
  outline: none;
  background: #fafafa;
  transition: border 0.18s, box-shadow 0.18s;
  resize: vertical;
  min-height: 44px;
}

.reason-input:focus {
  border-color: #e74c3c;
  box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1);
  background: #fff;
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