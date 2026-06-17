<template>
  <Teleport to="body">
    <div class="modal-overlay" @click.self="$emit('close')">

      <div class="modal-box">
        <div class="modal-header">
          <span class="modal-title">
            {{ isEdit ? '編輯生產項目' : '新增生產項目' }}
            <span class="modal-hint">全部必填 (All  required)</span>
          </span>
          <button class="modal-close" type="button" @click="$emit('close')">✕</button>
        </div>

        <div class="modal-body">
          <div class="section-group">
            <p class="group-label">Product Info</p>
            <div class="form-row">
              <div class="form-field">
                <label class="form-label">工作類型 <span class="required">*</span></label>
                <select class="form-input" v-model="local.jobType" :class="{ error: errors.jobType }">
                  <option value="">請選擇</option>
                  <option value="有標工作">有標工作</option>
                  <option value="試模">試模</option>
                </select>
                <span v-if="errors.jobType" class="error-msg">必填</span>
              </div>
              <div class="form-field">
                <label class="form-label">料號<span class="required">*</span></label>
                <input v-model="local.productNo" type="text" class="form-input" :class="{ error: errors.productNo }">
                <span v-if="errors.productNo" class="error-msg">必填</span>
              </div>
            </div>
            <div class="form-row">
              <div class="form-field">
                <label class="form-label">品名<span class="required">*</span></label>
                <input v-model="local.productType" type="text" class="form-input" :class="{ error: errors.productType }">
                <span v-if="errors.productType" class="error-msg">必填</span>
              </div>
              <div class="form-field">
                <label class="form-label">模號<span class="required">*</span></label>
                <input v-model="local.moldId" type="text" class="form-input" :class="{ error: errors.moldId }" placeholder="#">
                <span v-if="errors.moldId" class="error-msg">必填</span>
              </div>
              <div class="form-field">
                <label class="form-label">週期<span class="required">*</span></label>
                <input v-model="local.weekNo" type="text" class="form-input" :class="{ error: errors.weekNo }">
                <span v-if="errors.weekNo" class="error-msg">必填</span>
              </div>
            </div>
          </div>

          <div class="section-group">
            <p class="group-label">Item Info</p>
            <div class="form-row">
              <div class="form-field">
                <label class="form-label">OK數量<span class="required">*</span></label>
                <input v-model.number="local.OKquantity" type="number" min="0" class="form-input" :class="{ error: errors.OKquantity }">
                <span v-if="errors.OKquantity" class="error-msg">必填</span>
              </div>
              <div class="form-field">
                <label class="form-label">NG數量<span class="required">*</span></label>
                <input v-model.number="local.NGquantity" type="number" min="0" class="form-input" :class="{ error: errors.NGquantity }">
                <span v-if="errors.NGquantity" class="error-msg">必填</span>
              </div>
              <div class="form-field">
                <label class="form-label">總數量</label>
                <input :value="computedTotal" type="number" class="form-input" readonly>
              </div>
              <div class="form-field">
                <label class="form-label">運行時間<span class="required">*</span></label>
                <input v-model="local.runTime" type="text" class="form-input" :class="{ error: errors.runTime }" placeholder="? mins">
                <span v-if="errors.runTime" class="error-msg">必填</span>
              </div>
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
import { reactive, computed } from 'vue'

const props = defineProps({
  editData: { type: Object, default: null },
  isEdit:   { type: Boolean, default: false }
})

const emit = defineEmits(['save', 'close'])

const createEmpty = () => ({
  jobType: '',
  productNo: '',
  productType: '',
  moldId: '',
  weekNo: '',
  OKquantity: '',
  NGquantity: '',
  totalQuan: '',
  runTime: ''
})

// If editData has value, then edit. If not, then create
const local = reactive(props.editData ? { ...props.editData } : createEmpty())

const errors = reactive({
  jobType: false,
  productNo: false,
  productType: false,
  moldId: false,
  weekNo: false,
  OKquantity: false,
  NGquantity: false,
  runTime: false
})

const computedTotal = computed(() =>
  (Number(local.OKquantity) || 0) + (Number(local.NGquantity) || 0)
)

const requiredFields = ['jobType', 'productNo', 'productType', 'moldId', 'weekNo', 'OKquantity', 'NGquantity', 'runTime']

const validate = () => {
  let valid = true
  requiredFields.forEach(key => {
    errors[key] = local[key] === '' || local[key] === null || local[key] === undefined
    if (errors[key]) valid = false
  })
  return valid;
}

const handleSave = () => {
  if (!validate()) return
  emit('save', { ...local, totalQuan: computedTotal.value })
}
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

.error-msg {
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
</style>