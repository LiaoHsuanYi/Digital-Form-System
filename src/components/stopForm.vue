<template>
  <Teleport to="body">
    <div class="modal-overlay" @click.self="$emit('close')">

      <div class="modal-box">
        <div class="modal-header">
          <span class="modal-title">
            {{ isEdit ? $t('dailysheet.edit_stop') : $t('dailysheet.add_stop') }}
            <span class="modal-hint">{{ $t('dailysheet.reminder') }}</span>
          </span>
          <button class="modal-close" type="button" @click="$emit('close')">✕</button>
        </div>

        <div class="modal-body">
          <div class="section-group">
            <p class="group-label">Product Info</p>
            <div class="form-row">
              <div class="form-field">
                <label class="form-label">{{ $t('dailysheet.stop_form.labels[0]') }}<span class="required">*</span></label>
                <input v-model="local.productNo" type="text" class="form-input" :class="{ error: errors.productNo }">
                <span v-if="errors.productNo" class="error-msg">{{ $t('dailysheet.required') }}</span>
              </div>
              <div class="form-field">
                <label class="form-label">{{ $t('dailysheet.stop_form.labels[1]') }}<span class="required">*</span></label>
                <input v-model="local.productType" type="text" class="form-input" :class="{ error: errors.productType }">
                <span v-if="errors.productType" class="error-msg">{{ $t('dailysheet.required') }}</span>
              </div>
              <div class="form-field">
                <label class="form-label">{{ $t('dailysheet.stop_form.labels[2]') }}<span class="required">*</span></label>
                <input v-model="local.moldId" type="text" class="form-input" :class="{ error: errors.moldId }" placeholder="#">
                <span v-if="errors.moldId" class="error-msg">{{ $t('dailysheet.required') }}</span>
              </div>
            </div>
          </div>

          <div class="section-group">
            <p class="group-label">Machine Info</p>
            <div class="form-row">
              <div class="form-field">
                <label class="form-label">{{ $t('dailysheet.stop_form.labels[3]') }}<span class="required">*</span></label>
                <input v-model.number="local.firstShot" type="number" min="0" class="form-input" :class="{ error: errors.firstShot }">
                <span v-if="errors.firstShot" class="error-msg">{{ $t('dailysheet.required') }}</span>
              </div>
              <div class="form-field">
                <label class="form-label">{{ $t('dailysheet.stop_form.labels[4]') }}<span class="required">*</span></label>
                <input v-model.number="local.lastShot" type="number" min="0" class="form-input" :class="{ error: errors.lastShot }">
                <span v-if="errors.lastShot" class="error-msg">{{ $t('dailysheet.required') }}</span>
              </div>
              <div class="form-field">
                <label class="form-label">{{ $t('dailysheet.stop_form.labels[5]') }}</label>
                <input :value="computedTotal" type="number" class="form-input" readonly>
              </div>
            </div>
          </div>

          <div class="section-group">
            <p class="group-label">Quantity Info
              <span class="tooltip-wrapper" ref="TooltipRef">
                <i class="ti ti-info-circle tooltip-icon" @click.stop="showTip = !showTip"></i>
                <div v-if="showTip" class="tooltip-popover">
                  <img src="@/assets/productIssue.jpg" class="tooltip-image" />
                </div>
              </span>
            </p>
            <div class="form-row">
              <div class="form-field">
                <label class="form-label">{{ $t('dailysheet.stop_form.labels[6]') }}<span class="required">*</span></label>
                <select class="form-input" v-model="local.productIssue" :class="{ error: errors.productIssue }">
                  <option value="">{{ $t('dailysheet.stop_form.select') }}</option>
                  <option value="黏膜">A</option>
                  <option value="燒附">B</option>
                  <option value="拉模">C</option>
                  <option value="模崩">D</option>
                  <option value="模裂">E</option>
                  <option value="壓傷">F</option>
                  <option value="沖蝕">G</option>
                  <option value="缺肉">H</option>
                  <option value="多肉">I</option>
                  <option value="顆粒">J</option>
                  <option value="斷差">K</option>
                  <option value="洩料">L</option>
                  <option value="水路異常">M</option>
                  <option value="Pin問題">N</option>
                  <option value="頂針問題">O</option>
                  <option value="油壓缸處理">P</option>
                  <option value="年週章頂針調整">Q</option>
                  <option value="其他">R</option>
                </select>
                <span v-if="errors.productIssue" class="error-msg">{{ $t('dailysheet.required') }}</span>
              </div>
              <div class="form-field">
                <label class="form-label">{{ $t('dailysheet.stop_form.labels[7]') }}<span class="required">*</span></label>
                <input v-model.number="local.stop_NGquan" :class="{ error: errors.stop_NGquan }" type="number" min="0" class="form-input">  
                <span v-if="errors.stop_NGquan" class="error-msg">{{ $t('dailysheet.required') }}</span>
              </div>
              <div class="form-field">
                <label class="form-label">{{ $t('dailysheet.stop_form.labels[8]') }}</label>
                <input v-model.number="local.coldQuan" type="number" min="0" class="form-input">  
              </div>
            </div>
          </div>

          <p class="group-label">Downtime Info</p>
          <div v-for="(item, index) in local.stopReason" :key="index" class="section-group">
            <div class="form-row">
              <div class="form-field">
                <label class="form-label" v-if="index === 0">{{ $t('dailysheet.stop_form.labels[9]') }}<span class="required">*</span></label> 
                <select class="form-input" v-model="item.stopIssue" :class="{ error: errors.stopIssue }">

                  <option value="">{{ $t('dailysheet.stop_form.select') }}</option>
                  <optgroup :label="$t('dailysheet.stop_form.optgroups[0]')">
                    <option value="試模">1</option>
                    <option value="烤模">2</option>
                    <option value="模具上模">3</option>
                    <option value="模具下模">4</option>
                    <option value="模具維修">5</option>
                    <option value="模具保養">6</option>
                    <option value="模具檢查">7</option>
                    <option value="剪邊模故障">8</option>
                    <option value="模具機構異常">9</option>
                    <option value="模具模面清理">10</option>
                  </optgroup>
                  <optgroup :label="$t('dailysheet.stop_form.optgroups[1]')">
                    <option value="換柱塞">11</option>
                    <option value="換料管">12</option>
                    <option value="湯溫不足">13</option>
                    <option value="油管漏油">14</option>
                    <option value="設備保養">15</option>
                    <option value="調整合模力">16</option>
                    <option value="添加液壓油">17</option>
                    <option value="壓鑄機故障">18</option>
                    <option value="給湯機故障">19</option>
                    <option value="取出機故障">20</option>
                    <option value="真空機故障">21</option>
                    <option value="噴霧機故障">22</option>
                    <option value="料管卡鋁屑處理">23</option>
                  </optgroup>
                  <optgroup :label="$t('dailysheet.stop_form.optgroups[2]')">
                    <option value="調整噴霧">24</option>
                    <option value="整理清潔">25</option>
                    <option value="教育集會">26</option>
                    <option value="支援外單位">27</option>
                    <option value="其他">28</option>
                  </optgroup>
                </select>
              </div>
              <div class="form-field">
                <label class="form-label" v-if="index === 0">{{ $t('dailysheet.stop_form.labels[10]') }}<span class="required">*</span></label>
                <input v-model.number="item.stopTime" type="number" min="0" class="form-input" :class="{ error: errors.stopTime }" placeholder="? mins">
              </div>
              <button type="button"
                v-if="index === 0" 
                class="action-btn stop-add-btn" 
                @click="addstopReason"
                >
                <span class="stop-btn-icon">+</span>
              </button>

              <button type="button" 
                v-else
                class="action-btn stop-remove-btn" 
                @click="removestopReason(index)"
                >
                <span class="person-btn-icon">-</span>
              </button>
            </div>
            <div class="error-row" v-if="index === 0 && (errors.stopIssue == true || errors.stopTime == true)">
              <div class="error-left" :style="{ visibility: errors.stopIssue ? 'visible' : 'hidden' }">
                {{ $t('dailysheet.required') }}
              </div>
              <div class="error-right" :style="{ visibility: errors.stopTime ? 'visible' : 'hidden' }">
                {{ $t('dailysheet.required') }}
              </div>
              <div class="ghost-spacer"></div>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn-cancel" @click="$emit('close')">Cancel</button>
          <button type="button" class="btn-save" @click="handleSave">Save</button>
        </div>

      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  editData: { type: Object, default: null },
  isEdit:   { type: Boolean, default: false }
})

const emit = defineEmits(['save', 'close'])

const createEmpty = () => ({
  productNo: '',
  productType: '',
  moldId: '',
  firstShot: '',
  lastShot: '',
  totalTime: '',
  productIssue: '',
  stop_NGquan: '',
  coldQuan: '',
  stopReason: [
    {
      stopIssue: '',
      stopTime: ''
    }
  ]
})

function addstopReason() 
{
  local.stopReason.push({
    stopIssue: '',
    stopTime: ''
  })
}

function removestopReason(index) 
{
  if (local.stopReason.length <= 1) 
    return;

  local.stopReason.splice(index, 1);
}

//tooltip
const showTip = ref(false)
const TooltipRef = ref(null)

function handleClickOutside(event) {
  if (TooltipRef.value && !TooltipRef.value.contains(event.target)) {
    showTip.value = false
  }
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onUnmounted(() => document.removeEventListener('click', handleClickOutside))

// If editData has value, then edit. If not, then create
const local = reactive(props.editData ? { ...props.editData } : createEmpty())

const errors = reactive({
  productNo: false,
  productType: false,
  moldId: false,
  firstShot: false,
  lastShot: false,
  productIssue: false,
  stop_NGquan: false,
  stopIssue: false,
  stopTime: false
})

const computedTotal = computed(() => {
  return local.stopReason.reduce((total, item) => {
    const time = parseInt(item.stopTime) || 0;
    return total + time;
  }, 0);
})

const requiredFields = ['productNo', 'productType', 'moldId', 'firstShot', 'lastShot', 'productIssue', 'stop_NGquan']

const validate = () => {
  let valid = true
  requiredFields.forEach(key => {
    errors[key] = local[key] === '' || local[key] === null || local[key] === undefined
    if (errors[key]) valid = false
  })
  
  //validate stopReason array independently
  const firstStop = local.stopReason[0];
  errors.stopIssue = !firstStop.stopIssue;
  errors.stopTime = !firstStop.stopTime;

  if (errors.stopTime || errors.stopIssue ) 
  {
    valid = false
  }

  return valid;
}

const handleSave = () => {
  if (!validate()) return
  local.moldId = String(local.moldId).padStart(3, '#0');
  emit('save', { ...local })
}

watch(
  () => local.stopReason, (newIssue) => {
      local.totalTime = newIssue.reduce((total, item) => {
      return total + (Number(item.stopTime) || 0);
    }, 0);
  },
  {deep: true}
)

</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99999;
  overflow: auto;
}

.modal-box {
  background: #ffffff;
  border-radius: 12px;
  width: 100%;
  max-width: 480px;
  max-height: 90vh;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.14);
  position: relative;
  z-index: 2147483001;
  transform: none !important;
  will-change: auto;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 18px;
  border-bottom: 1px solid #ebebeb;
}

.modal-title {
  font-size: 18px;
  font-weight: 500;
  color: #1a1a1a;
}

.modal-hint {
  font-size: 16px;
  font-weight: 400;
  color: #999;
  margin-left: 4px;
}

.modal-close {
  width: 26px;
  height: 26px;
  border: none;
  background: transparent;
  border-radius: 6px;
  color: #999;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-close:hover {
  background: #f0f0f0;
  color: #333;
}

.modal-body {
  padding: 16px 18px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  max-height: 65vh;
  overflow-y: auto;
}

.section-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.group-label {
  font-size: 16px;
  font-weight: 600;
  color: #1daa7a;
  padding-left: 8px;
  border-left: 2.5px solid #1daa7a;
  margin: 0;
}

.form-row {
  display: flex;
  gap: 10px;
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  min-width: 0;
}

.form-label {
  font-size: 16px;
  color: var(--text);
  font-weight: 600;
}

.required {
  margin-left: 2px;
  color: #DF4E4E;
  font-size: 16px;
}

.form-input {
  height: 36px;
  padding: 0 10px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  width: 100%;
  outline: none;
  font-family: inherit;
}

.form-input:focus {
  border-color: #1daa7a;
  box-shadow: 0 0 0 3px rgba(29, 170, 122, 0.12);
}

.form-input.error {
  border-color: #e57373;
  box-shadow: 0 0 0 3px rgba(229, 115, 115, 0.12);
}

.form-input[readonly] {
  background: #f7f7f7;
  color: #888;
}

.error-row {
  display: flex;
}

.error-left {
  flex: 1;
  font-size: 16px;
  color: #DF4E4E;
  text-align: center;
}

.error-right {
  flex: 1;
  font-size: 16px;
  color: #DF4E4E;
  text-align: center;
}

.ghost-spacer {
  width: 44px; 
  flex-shrink: 0; 
  visibility: hidden; 
  pointer-events: none;
}

.error-msg {
  margin-top: 5px;
  font-size: 16px;
  color: #DF4E4E;
  text-align: center;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  padding: 12px 18px;
  border-top: 1px solid #ebebeb;
}

.action-btn {
  width: 36px;
  height: 36px;
  border-radius: 6px;
  border: 1.5px solid;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: background 0.15s;
  align-self: end;
}
.stop-btn-icon {
  font-size: 16px;
  line-height: 1;
}
.stop-add-btn {
  border-color: #3ab87a;
  color: #3ab87a;
}
.stop-add-btn:hover { background: #e1f5ee; }
.stop-remove-btn {
  border-color: #ccc;
  color: #999;
}
.stop-remove-btn:hover {
  border-color: #e57373;
  color: #e57373;
  background: #fff5f5;
}

.btn-cancel {
  padding: 0 16px;
  height: 34px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: #ffffff;
  color: #666;
  font-size: 16px;
  cursor: pointer;
  font-family: inherit;
  transition: background 0.15s;
}
.btn-cancel:hover { background: #f5f5f5; }
.btn-save {
  padding: 0 18px;
  height: 34px;
  border: none;
  border-radius: 8px;
  background: #1daa7a;
  color: #ffffff;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  font-family: inherit;
  transition: background 0.15s;
}
.btn-save:hover { background: #179268; }

.tooltip-wrapper {
  position: relative;
  display: inline-flex;
}

.tooltip-icon {
  font-size: 15px;
  color: #999;
  cursor: pointer;
}

.tooltip-icon:hover {
  color: var(--green);
}

.tooltip-popover {
  position: absolute;
  top: 130%;
  left: 0;
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 8px;
  width: 200px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  z-index: 20;
}

.tooltip-image {
  width: 100%;
  border-radius: 4px;
  display: block;
}
</style>