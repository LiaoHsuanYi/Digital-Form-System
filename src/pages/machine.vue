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
                        <input type="datetime-local" class="field-input" v-model="form.date">
                    </div>
                    <div class="field-group">
                        <label class="field-label">{{ $t('machine.machine_no') }}</label> 
                        <input type="text" class="field-input" v-model="form.machineNo" required>
                    </div>
                    <div class="field-group">
                        <label class="field-label">{{ $t('machine.product_no') }}</label>
                        <input type="text" class="field-input" v-model="form.productNo" required>
                    </div>
                    <div class="field-group">
                        <label class="field-label">{{ $t('machine.product_type') }}</label> 
                        <input type="text" class="field-input" v-model="form.productType" required>
                    </div>
                    <div class="field-group">
                        <label class="field-label">{{ $t('machine.mold_id') }}</label>
                        <input type="text" class="field-input" v-model="form.moldId" required>
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
                            <input class="param-input" type="number" v-model.number="form.injectPress">
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
                             <!--when fileError != '', then output-->
                            <span v-if="fileError" class="file-error">{{ fileError }}</span>
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
  machineNo: '',
  productNo: '',
  productType: '',
  moldId: '',
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
    { key: '鑄塞漏水', label: t('machine.checklist[0]') },
    { key: '料管漏水', label: t('machine.checklist[1]') },
    { key: '模具漏水', label: t('machine.checklist[2]') },
    { key: '離型劑過多', label: t('machine.checklist[3]') },
    { key: '排氣閥阻塞', label: t('machine.checklist[4]') },
    { key: '離型劑噴頭漏水', label: t('machine.checklist[5]') },
    { key: '料管沒潤滑', label: t('machine.checklist[6]') },
    { key: '輸送機風扇沒運轉', label: t('machine.checklist[7]') },
    { key: '模具循環水沒開啟', label: t('machine.checklist[8]') }
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

<style scoped src="@/assets/machine.css">

</style>