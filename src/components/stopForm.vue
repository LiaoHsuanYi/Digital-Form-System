<template>
  <Teleport to="body">
    <div class="modal-overlay" @click.self="$emit('close')">

      <div class="modal-box">
        <div class="modal-header">
          <span class="modal-title">
            {{ isEdit ? '編輯停機項目' : '新增停機項目' }}
            <span class="modal-hint">全部必填 (All  required)</span>
          </span>
          <button class="modal-close" type="button" @click="$emit('close')">✕</button>
        </div>

        <div class="modal-body">
          <div class="section-group">
            <p class="group-label">Product Info</p>
            <div class="form-row">
              <div class="form-field">
                <label class="form-label">料號<span class="required">*</span></label>
                <input v-model="local.productNo" type="text" class="form-input" :class="{ error: errors.productNo }">
                <span v-if="errors.productNo" class="error-msg">必填</span>
              </div>
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
            </div>
          </div>

          <div class="section-group">
            <p class="group-label">Machine Info</p>
            <div class="form-row">
              <div class="form-field">
                <label class="form-label">首次射次<span class="required">*</span></label>
                <input v-model.number="local.firstShot" type="number" min="0" class="form-input" :class="{ error: errors.firstShot }">
                <span v-if="errors.firstShot" class="error-msg">必填</span>
              </div>
              <div class="form-field">
                <label class="form-label">末次射次<span class="required">*</span></label>
                <input v-model.number="local.lastShot" type="number" min="0" class="form-input" :class="{ error: errors.lastShot }">
                <span v-if="errors.lastShot" class="error-msg">必填</span>
              </div>
              <div class="form-field">
                <label class="form-label">停機總時間</label>
                <input :value="computedTotal" type="number" class="form-input" readonly>
              </div>
            </div>
          </div>

          <div class="section-group">
            <p class="group-label">Quantity Info</p>
            <div class="form-row">
              <div class="form-field">
                <label class="form-label">鑄件問題</label>
                <select class="form-input" v-model="local.productIssue">
                  <option value="">請選擇</option>
                  <option value="缺肉">缺肉</option>
                  <option value="流紋">流紋</option>
                  <option value="黏模">黏模</option>
                  <option value="拉模裂">拉模裂</option>
                  <option value="變形">變形</option>
                  <option value="砂孔">砂孔</option>
                  <option value="脫皮">脫皮</option>
                  <option value="斷料頭">斷料頭</option>
                </select>
              </div>
              <div class="form-field">
                <label class="form-label">停機NG數</label>
                <input v-model.number="local.stop_NGquan" type="number" min="0" class="form-input">  
              </div>
              <div class="form-field">
                <label class="form-label">冷模數量</label>
                <input v-model.number="local.coldQuan" type="number" min="0" class="form-input">  
              </div>
            </div>
          </div>

          <p class="group-label">Downtime Info</p>
          <div v-for="(item, index) in local.stopReason" :key="index" class="section-group">

            <div class="form-row">
              <div class="form-field">
                <label class="form-label" v-if="index === 0">模具問題</label> 
                <select class="form-input" v-model="item.stopIssue" :class="{ error: errors.stopIssue }">
                  <option value="">請選擇</option>
                  <option value="模具上模">模具上模</option>
                  <option value="模具下模">模具下模</option>
                  <option value="模具維修">模具維修</option>
                  <option value="試模">試模</option>
                  <option value="冷模">冷模</option>
                  <option value="燒付處理">燒付處理</option>
                  <option value="斷pin">斷pin</option>
                  <option value="頂針斷">頂針斷</option>
                  <option value="頂針長度調整">頂針長度調整</option>
                  <option value="模具模面清理">模具模面清理</option>
                  <option value="清理真空閥堵塞">清理真空閥堵塞</option>
                  <option value="油壓缸維修">油壓缸維修</option>
                  <option value="換週期章">換週期章</option>
                  <option value="缺肉">缺肉</option>
                  <option value="流紋">流紋</option>
                  <option value="黏模">黏模</option>
                  <option value="拉模裂">拉模裂</option>
                  <option value="變形">變形</option>
                  <option value="砂孔">砂孔</option>
                  <option value="脫皮">脫皮</option>
                  <option value="斷料頭">斷料頭</option>
                  <option value="其他">其他</option>
                </select>
              </div>
              <div class="form-field">
                <label class="form-label" v-if="index === 0">機台問題</label> 
                <select class="form-input" v-model="item.stopIssue" :class="{ error: errors.stopIssue }">
                  <option value="">請選擇</option>
                  <option value="壓鑄機故障">壓鑄機故障</option>
                  <option value="料管卡鋁屑處理">料管卡鋁屑處理</option>
                  <option value="換柱塞">換柱塞</option>
                  <option value="給湯機故障">給湯機故障</option>
                  <option value="湯溫不足">湯溫不足</option>
                  <option value="取出機故障">取出機故障</option>
                  <option value="添加液壓油">添加液壓油</option>
                  <option value="真空機故障">真空機故障</option>
                  <option value="調整噴霧">調整噴霧</option>
                  <option value="噴霧機故障">噴霧機故障</option>
                  <option value="設備保養">設備保養</option>
                  <option value="整理清潔">整理清潔</option>
                  <option value="支援外單位">支援外單位</option>
                  <option value="教育集會">教育集會</option>
                  <option value="換料管">換料管</option>
                  <option value="料管漏油">料管漏油</option>
                  <option value="調整合模力">調整合模力</option>
                  <option value="烤模">烤模</option>
                  <option value="剪邊模故障">剪邊模故障</option>
                  <option value="其他">其他</option>
                </select>
              </div>
              <div class="form-field">
                <label class="form-label" v-if="index === 0">停機時間<span class="required">*</span></label>
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
                請選擇一項原因
              </div>
              <div class="error-right" :style="{ visibility: errors.stopTime ? 'visible' : 'hidden' }">
                必填
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
import { reactive, computed, watch } from 'vue'

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


// If editData has value, then edit. If not, then create
const local = reactive(props.editData ? { ...props.editData } : createEmpty())

const errors = reactive({
  productNo: false,
  productType: false,
  moldId: false,
  firstShot: false,
  lastShot: false,
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

const requiredFields = ['productNo', 'productType', 'moldId', 'firstShot', 'lastShot']

const validate = () => {
  let valid = true
  requiredFields.forEach(key => {
    errors[key] = local[key] === '' || local[key] === null || local[key] === undefined
    if (errors[key]) valid = false
  })
  
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
.error-row {
  display: flex;   
  gap: 35px;
}

.error-left {
  flex: 7;
  font-size: 16px;
  color: #DF4E4E;
  text-align: center;
}

.error-right {
  flex: 3;
  font-size: 16px;
  color: #DF4E4E;
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
</style>