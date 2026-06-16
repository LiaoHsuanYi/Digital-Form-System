<template>
<Navbar /> 
<div class="form-bg">
  <div class="form-body">
    <form @submit.prevent="submitDailysheet">
      <div class="form-title">
          壓鑄工作日報表
      </div>
        
      <section>
        <div class="sec-head">
            <div class="sec-bar"></div>
            <div class="sec-lbl">機器資料</div>
        </div>

        <div class="machine-grid">
            <div class="field-group">
                <label class="field-label">日期</label>
                <input type="date" class="field-input" v-model="form.date" readonly>
            </div>
            <div class="field-group">
                <label class="field-label">機器編號</label>
                <input type="text" class="field-input" v-model="form.machineNo" required>
            </div>
        </div>
      </section>

      <section>
        <div class="sec-head">
            <div class="sec-bar"></div>
            <div class="sec-lbl">個人資料</div>
        </div>

        <div v-for="(person, index) in form.people" :key="index" class="person-row">
            <div class="field-group">
                <label class="field-label">班別</label> 
                <select class="field-input" v-model="person.shift" required>
                    <option value="">請選擇</option>
                    <option value="早班">早班</option>
                    <option value="晚班">晚班</option>
                </select>
            </div>    
            <div class="field-group">
                <label class="field-label">工號</label> 
                <input type="text" class="field-input" v-model="person.employeeNo" required>
            </div>
            <div class="field-group">
                <label class="field-label">姓名</label>
                <input type="text" class="field-input" v-model="person.name" required>
            </div>
            <div class="field-group">
                <label class="field-label">出勤時數</label> 
                <input type="number" class="field-input" v-model="person.workhrs" required>
            </div>

            <button type="button" 
                v-if="index === 0" 
                class="action-btn person-add-btn" 
                @click="addPerson" 
                :disabled="form.people.length >= 3"
                >
                <span class="person-btn-icon">+</span>
            </button>

            <button type="button" 
                v-else
                class="action-btn person-remove-btn" 
                @click="removePerson"
                >
                <span class="person-btn-icon">-</span>
            </button>
        </div>
      </section>

      <section>
        <div class="sec-head">
          <div class="sec-bar"></div>
          <div class="sec-lbl">生產項目</div>
        </div>
  
        <div class="card-list">
          <article
            v-for="(item, index) in form.productItems"
            :key="index"
            class="prod-card"
          >
            <div class="card-index">{{ index + 1 }}</div>
  
            <div class="card-main">
              <div class="card-title">{{ item.productType }}</div>
              <div class="card-sub">{{ item.productNo }}</div>
            </div>
  
            <div class="card-meta">
              <div class="meta-item">
                <p class="meta-label">數量</p>
                <div class="meta-val">{{ item.totalQuan }}</div>
              </div>
              <div class="divider"></div>
              <div class="meta-item">
                <p class="meta-label">時間</p>
                <div class="meta-val">{{ item.runTime }}</div>
              </div>
              <div class="divider"></div>
              <span class="badge" :class="isComplete(item) ? 'badge-complete' : 'badge-incomplete'">
                {{ isComplete(item) ? 'Complete' : 'Incomplete' }}
              </span>
            </div>
  
            <div class="card-actions">
              <button type="button" class="btn-icon" @click="openEditProduct(index)">✎</button>
              <button type="button" class="btn-icon del" @click="form.productItems.splice(index, 1)">✕</button>
            </div>
          </article>
        </div>
  
        <button type="button" class="prod-add-btn" @click="openAddProduct">
          + 新增生產項目
        </button>
      </section>

      <div class="submit-wrap">
          <button type="submit" class="submit-btn">Submit</button>
      </div>
  
      <!-- productForm -->
      <productForm
        v-if="showProductModal"
        :edit-data="productEditData"
        :is-edit="productEditIndex !== null"
        @save="handleProductSave"
        @close="closeProductModal"
      />
 
    </form>
  </div>
</div>
<Footer /> 
</template>

<script setup>
import Navbar from '@/components/navbar.vue'
import Footer from '@/components/footer.vue'
import productForm from '@/components/productForm.vue'
import { formatNow } from '@/utils/date.js'
import { reactive, ref, watch } from 'vue'


//create new data
//people +-
function addPerson() {
  if (form.people.length >= 3) return

  form.people.push({
    shift: '',
    employeeNo: '',
    name: '',
    workhrs: ''
  })
}

function removePerson(index) {
  if (form.people.length <= 1) return

  form.people.splice(index, 1)
}


const STORAGE_KEY = 'dailysheet_draft'
 
//initialization: read draft from localStorage
const savedDraft = localStorage.getItem(STORAGE_KEY)

//main form
const form = reactive(
  savedDraft
    ? JSON.parse(savedDraft)
    : {
        date: formatNow('date'),
        machineNo: '',
        people: [
            {
                shift: '',
                employeeNo: '',
                name: '',
                workhrs: ''
            }
        ],
        productItems: [],
        stopItems: [],
        startNum: '',
        endNum: ''
      }
)

//data actively save to localStorage
watch(form, () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(form))
}, { deep: true })

//create active form
//productItems
const createProduct = () => ({
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

//stopItems
const createStop = () => ({
    productNo: '',
    productType: '',
    stopTime: '',
    moldReason: '',
    machineReason: '',
    stop_NGquan: ''
})

//clear & reset
const resetform = () => {
  localStorage.removeItem(STORAGE_KEY)
  Object.keys(form).forEach(key => {
    if (Array.isArray(form[key])) form[key] = [];
    else form[key] = '';
  })
  form.date = formatNow('date');
  form.people = [{ shift: '', employeeNo: '', name: '', workhrs: '' }];
}

//productForm modal control
const showProductModal = ref(false)
const productEditIndex = ref(null)
const productEditData  = ref(null)
 
const openAddProduct = () => {
  productEditIndex.value = null
  productEditData.value  = null
  showProductModal.value = true
}
 
const openEditProduct = (index) => {
  productEditIndex.value = index
  productEditData.value  = { ...form.productItems[index] }
  showProductModal.value = true
}
 
const handleProductSave = (data) => {
  if (productEditIndex.value !== null) {
    form.productItems[productEditIndex.value] = { ...data }
  } else {
    form.productItems.push({ ...data })
  }
  closeProductModal()
}
 
const closeProductModal = () => {
  showProductModal.value = false
  productEditIndex.value = null
  productEditData.value  = null
}
 
// ── 完成判斷 ──
const isComplete = (item) => {
  return Number(item.OKquantity) > 0 && Number(item.NGquantity) === 0
}
 
//form submit
const submitDailysheet = () => {
  console.log(form);
  // API

  resetform()
}
</script>

<style scoped>
.machine-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 24px;
}
 
/* ── 個人資料列 ── */
.person-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr auto;
  align-items: end;
  gap: 10px;
  margin: 15px 0;
}
.action-btn {
  width: 46px;
  height: 46px;
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
.person-btn-icon {
  font-size: 18px;
  line-height: 1;
}
.person-add-btn {
  border-color: #3ab87a;
  color: #3ab87a;
}
.person-add-btn:hover { background: #e1f5ee; }
.person-remove-btn {
  border-color: #ccc;
  color: #999;
}
.person-remove-btn:hover {
  border-color: #e57373;
  color: #e57373;
  background: #fff5f5;
}
 
/* productItems */
.card-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 4px;
}
.prod-card {
  background: #fff;
  border: 0.5px solid #e4e4e4;
  border-radius: 12px;
  padding: 14px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: border-color 0.15s;
}
.prod-card:hover { border-color: #bbb; }
.card-index {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #e1f5ee;
  color: #0f6e56;
  font-size: 13px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin: 10px;
}
.card-main { flex: 1; min-width: 0; }
.card-title {
  font-size: 18px;
  font-weight: 800;
  color: var(--title);
  margin: 0 0 2px;
}
.card-sub {
  font-size: 14px;
  color: var(--text);
  margin: 0;
}
.card-meta {
  display: flex;
  gap: 16px;
  align-items: center;
  flex-shrink: 0;
}
.meta-item { text-align: center; }
.meta-label {
  font-size: 15px;
  color: var(--sub);
  margin: 0 0 1px;
}
.meta-val {
  font-size: 18px;
  font-weight: 500;
  color: var(--text);
}
.divider {
  width: 0.5px;
  height: 40px;
  background: #e4e4e4;
}
.badge {
  font-size: 15px;
  font-weight: 500;
  padding: 8px 13px;
  border-radius: 20px;
  white-space: nowrap;
}
.badge-complete   { background: #e1f5ee; color: #0f6e56; }
.badge-incomplete { background: #faeeda; color: #854f0b; }
.card-actions { display: flex; gap: 6px; flex-shrink: 0; }
.btn-icon {
  width: 40px;
  height: 40px;
  border: 0.5px solid #e4e4e4;
  border-radius: 8px;
  background: #fff;
  color: #4b4b4b;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  transition: background 0.15s;
}
.btn-icon:hover { background: #f5f5f5; color: #1c1c1c; }
.btn-icon.del:hover { background: #fcebeb; color: #a32d2d; border-color: #f09595; }
 
/* stopItems */
.prod-add-btn {
  margin-top: 12px;
  width: 100%;
  padding: 10px;
  border: 1px dashed #5dcaa5;
  border-radius: 8px;
  background: transparent;
  color: #0f6e56;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: background 0.15s;
}
.prod-add-btn:hover { background: #e1f5ee; }
 
/* ── 送出按鈕（移除 transform，改用 box-shadow 加深做 hover 回饋）── */
.submit-wrap {
  text-align: center;
  margin-top: 24px;
}
.submit-btn {
  background: #3dbf82;
  color: #fff;
  border: none;
  border-radius: 11px;
  padding: 8px 80px;
  font-size: 24px;
  font-weight: 600;
  cursor: pointer;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 16px rgba(61, 191, 130, 0.18);
  transition: background 0.2s, box-shadow 0.2s;
  font-family: inherit;
}
.submit-btn:hover {
  background: #2daa72;
  box-shadow: 0 8px 22px rgba(61, 191, 130, 0.35);
}
 
</style> 