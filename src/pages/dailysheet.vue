<template>
<Navbar /> 
<div class="form-bg">
  <div class="form-body">
    <form @submit.prevent="submitDailysheet">
      <div class="form-title">
          {{ $t('dailysheet.title') }}
      </div>
        
      <section>
        <div class="sec-head">
          <div class="sec-bar"></div>
          <div class="sec-lbl">{{ $t('dailysheet.labels[0]') }}</div>
        </div>

        <div class="machine-grid">
          <div class="field-group">
              <label class="field-label">{{ $t('dailysheet.date') }}</label>
              <input type="date" class="field-input" v-model="form.date">
          </div>
          <div class="field-group">
              <label class="field-label">{{ $t('dailysheet.machineNo') }}</label>
              <select class="field-input" v-model="form.machineNo" required>
                  <option value="" selected>{{ $t('dailysheet.select') }}</option>
                  <option value="DIE-003">DIE-003</option>
                  <option value="DIE-004">DIE-004</option>
                  <option value="DIE-005">DIE-005</option>
                  <option value="DIE-006">DIE-006</option>
                  <option value="DIE-008">DIE-008</option>
                  <option value="DIE-009">DIE-009</option>
                  <option value="DIE-010">DIE-010</option>
                  <option value="DIE-011">DIE-011</option>
                  <option value="DIE-012">DIE-012</option>
                  <option value="DIE-013">DIE-013</option>
                  <option value="DIE-014">DIE-014</option>
                  <option value="DIE-015">DIE-015</option>
                  <option value="DIE-016">DIE-016</option>
                  <option value="DIE-017">DIE-017</option>
              </select>
          </div>
          <div class="field-group">
              <label class="field-label">{{ $t('dailysheet.firstShot') }}</label>
              <input type="number" class="field-input" v-model="form.firstShot" required>
          </div>
          <div class="field-group">
              <label class="field-label">{{ $t('dailysheet.lastShot') }}</label>
              <input type="number" class="field-input" v-model="form.lastShot" @blur="checkShots" required>
              <span class="error-msg" v-if="shotError">{{ shotError }}</span>
          </div>
        </div>
      </section>

      <section>
        <div class="sec-head">
          <div class="sec-bar"></div>
          <div class="sec-lbl">{{ $t('dailysheet.labels[1]') }}</div>
        </div>

        <div class="person-row">
          <div class="field-group">
              <label class="field-label">{{ $t('dailysheet.shift') }}</label> 
              <select class="field-input" v-model="form.shift" required>
                  <option value="" selected>{{ $t('dailysheet.select') }}</option>
                  <option value="早班">{{ $t('dailysheet.shiftOption[0]') }}</option>
                  <option value="中班">{{ $t('dailysheet.shiftOption[1]') }}</option>
                  <option value="晚班">{{ $t('dailysheet.shiftOption[2]') }}</option>
              </select>
          </div>    
          <div class="field-group">
              <label class="field-label">{{ $t('dailysheet.employeeNo1') }}</label> 
              <input type="text" class="field-input" v-model="form.employeeNo1" required>
          </div>
          <div class="field-group">
              <label class="field-label">{{ $t('dailysheet.employeeNo2') }}</label>
              <input type="text" class="field-input" v-model="form.employeeNo2">
          </div>
          <div class="field-group">
              <label class="field-label">{{ $t('dailysheet.workTime') }}</label> 
              <select v-if="form.shift === '早班'" class="field-input" v-model="form.workTime" required>
                <option value="570">570</option>
                <option value="720" selected>720</option>
              </select>
              <input v-else-if="form.shift === '中班'" class="field-input" v-model="form.workTime" readonly>
              <input v-else-if="form.shift === '晚班'" class="field-input" v-model="form.workTime" readonly>
              <input v-else class="field-input" readonly>
          </div>
        </div>
      </section>

      <section>
        <div class="sec-head">
          <div class="sec-bar"></div>
          <div class="sec-lbl">{{ $t('dailysheet.labels[2]')}}</div>
        </div>
  
        <div class="card-list">
          <article
            v-for="(item, index) in form.productItems"
            :key="index"
            class="prod-card"
          >
            <div class=" card-index card-index-production">
              {{ index + 1 }}
            </div>
  
            <div class="card-main">
              <div class="card-title">{{ item.machineType }}</div>
              <div class="card-sub">{{ item.batchNo }}</div>
            </div>
  
            <div class="card-meta">
              
                <span class="badge" :class="getBadgeClass(item.jobType)">
                  {{ changeBadge(item.jobType) }}
                </span>
              
              <div class="divider"></div>
              <div class="meta-item">
                <p class="meta-label">{{ $t('dailysheet.proQty') }}</p>
                <div class="meta-val">{{ item.totalQty }}</div>
              </div>
              <div class="divider"></div>
              <div class="meta-item">
                <p class="meta-label">{{ $t('dailysheet.proTime') }}</p>
                <div class="meta-val">{{ item.runTime }}</div>
              </div>
            </div>
  
            <div class="card-actions">
              <button type="button" class="btn-icon" @click="openEditProduct(index)">✎</button>
              <button type="button" class="btn-icon del" @click="form.productItems.splice(index, 1)">✕</button>
            </div>
          </article>
        </div>
  
        <button type="button" class="prod-add-btn" @click="openAddProduct">
          + {{ $t('dailysheet.addProduct') }}
        </button>
      </section>

      <section>
        <div class="sec-head">
          <div class="sec-bar"></div>
          <div class="sec-lbl">{{ $t('dailysheet.labels[3]')}}</div>
        </div>

        <div class="card-list">
          <article
            v-for="(item, index) in form.stopItems"
            :key="index"
            class="prod-card"
          >
            <div class="card-index card-index-trial">{{ index + 1 }}</div>
  
            <div class="card-main">
              <div class="card-title">{{ item.machineType }}</div>
              <div class="card-sub">{{ item.batchNo }}</div>
            </div>
  
            <div class="card-meta card-meta-single">
              <div class="meta-item">
                <p class="meta-label">{{ $t('dailysheet.stopTime') }}</p>
                <div class="meta-val">{{ item.totalStopTime }}</div>
              </div>
            </div>
  
            <div class="card-actions">
              <button type="button" class="btn-icon" @click="openEditStop(index)">✎</button>
              <button type="button" class="btn-icon del" @click="form.stopItems.splice(index, 1)">✕</button>
            </div>
          </article>
        </div>
  
        <button type="button" class="stop-add-btn" @click="openAddStop">
          + {{ $t('dailysheet.addStop') }}
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

      <!-- stopForm -->
      <stopForm
        v-if="showStopModal"
        :edit-data="stopEditData"
        :is-edit="stopEditIndex !== null"
        @save="handleStopSave"
        @close="closeStopModal"
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
import stopForm from '@/components/stopForm.vue'
import { formatNow } from '@/utils/date.js'
import { reactive, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const STORAGE_KEY = 'dailysheet_draft'
 
//initialization: read draft from localStorage
const savedDraft = localStorage.getItem(STORAGE_KEY)
const parsedDraft = savedDraft ? JSON.parse(savedDraft) : null

//main form
const form = reactive({
  ...(parsedDraft || {
    formType: '壓鑄工作日報表', 
    machineNo: '',
    firstShot: '',
    lastShot: '',
    shift: '',
    employeeNo1: '',
    employeeNo2: '',
    workTime: '',
    productItems: [],
    stopItems: []
  }),
  date: formatNow('date')   
})

//shot validation
const shotError = ref('');
const checkShots = () => {
  shotError.value = '';

  if (form.firstShot >= form.lastShot) {
    shotError.value = t('dailysheet.shotError');
  }
  else{
    shotError.value = '';
  }
}

//auto switch workTime
watch(() => form.shift, (shift) => {
  if (shift === '早班') form.workTime = 720;
  else if(shift === '中班') form.workTime = 480;
  else if (shift === '晚班') form.workTime = 740;
  else {};
})

//change language for jobType badge
const changeBadge = (jobType) => {
  if (jobType === '有標工作') return t('dailysheet.productForm.worktype[0]');
  else if (jobType === '試模') return t('dailysheet.productForm.worktype[1]');
  else if (jobType === '重修') return t('dailysheet.productForm.worktype[2]');
  return jobType;
}

//change badge class for jobType
const getBadgeClass = (jobType) => {
  if (jobType === '有標工作') return 'badge-production';
  else if (jobType === '試模') return 'badge-trial';
  else if (jobType === '重修') return 'badge-rework';
  return '';
}

//data save to localStorage
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
  form.date = formatNow('date');
}

//productForm modal control
const showProductModal = ref(false);
const productEditIndex = ref(null);
const productEditData  = ref(null);
 
const openAddProduct = () => {
  productEditIndex.value = null;
  productEditData.value  = null;
  showProductModal.value = true;
}
 
const openEditProduct = (index) => {
  productEditIndex.value = index;
  productEditData.value  = { ...form.productItems[index] };
  showProductModal.value = true;
}
 
const handleProductSave = (data) => {
  if (productEditIndex.value !== null) 
  {
    form.productItems[productEditIndex.value] = { ...data };
  } 
  else {
    form.productItems.push({ ...data });
  }
  closeProductModal();
}
 
const closeProductModal = () => {
  showProductModal.value = false;
  productEditIndex.value = null;
  productEditData.value  = null;
}

//stopForm modal control
const showStopModal = ref(false);
const stopEditIndex = ref(null);
const stopEditData  = ref(null);
 
const openAddStop = () => {
  stopEditIndex.value = null;
  stopEditData.value  = null;
  showStopModal.value = true;
}
 
const openEditStop = (index) => {
  stopEditIndex.value = index;
  stopEditData.value  = { ...form.stopItems[index] };
  showStopModal.value = true;
}
 
const handleStopSave = (data) => {
  if (stopEditIndex.value !== null) 
  {
    form.stopItems[stopEditIndex.value] = { ...data };
  } 
  else {
    form.stopItems.push({ ...data });
  }
  closeStopModal();
}
 
const closeStopModal = () => {
  showStopModal.value = false;
  stopEditIndex.value = null;
  stopEditData.value  = null;
}

//form validation
const checkDailysheet = () => {
  if(form.productItems.length === 0) 
  {
    alert(t('dailysheet.productItem'));
    return false;
  }
  if(form.stopItems.length === 0) 
  {
    alert(t('dailysheet.stopItem'));
    return false;
  }

  //totalTime validation
  let totalProTime = 0;
  let totalStopTime = 0;
  for (const item of form.productItems) 
  {  
    if (item.jobType !== '重修') 
    {
      totalProTime += Number(item.runTime) || 0;
    } 
  }
  for (const item of form.stopItems) 
  {
    totalStopTime += Number(item.totalStopTime) || 0;
  }

  let totalTime = totalProTime + totalStopTime;
  if (totalTime !== form.workTime) 
  {
    alert(t('dailysheet.timeAlert'));
    return false;
  }
  
  return true;
}

//form submit
const submitDailysheet = () => {

  if (!checkDailysheet()) 
    return;

  //console.log(form);
  
  // API

  resetform()
}
</script>

<style scoped>
/* machine */
.machine-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 10px;
  margin-bottom: 24px;
}
 
 .error-msg {
  margin-top: 5px;
  font-size: 16px;
  color: #FF2D2D;
  text-align: center;
  font-weight: bold;
}

/* employee */
.person-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  align-items: end;
  gap: 10px;
  margin: 15px 0;
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
  font-size: 13px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin: 10px;
}
.card-index-production { background: #e1f5ee; color: #0f6e56; }
.card-index-trial { background: #fadeda; color: #a31f0e; }

.card-main { flex: 1; min-width: 0; }
.card-title {
  font-size: 18px;
  font-weight: 600;
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
  justify-content: center;
  flex-shrink: 0;
}
.card-meta-single {
  justify-content: flex-start;
  min-width: 104px;  
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
  height: 45px;
  background: #e4e4e4;
}
.badge {
  font-size: 15px;
  font-weight: 500;
  align-self: center;
  align-items: center;
  padding: 10px 13px;
  justify-content: center;  
  min-width: 90px;  
  border-radius: 20px;
  white-space: nowrap;
  display: flex;
}
.badge-production   { background: #e1f5ee; color: #0f6e56; }
.badge-trial { background: #fadeda; color: #a31f0e; }
.badge-rework { background: #FCE4BA; color: #D15100; }

.card-actions { display: flex; gap: 6px; flex-shrink: 0; margin-left: 20px;}
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
  font-size: 16px;
  margin: 3px;
  transition: background 0.15s;
}
.btn-icon:hover { background: #f5f5f5; color: #1c1c1c; }
.btn-icon.del:hover { background: #fcebeb; color: #a32d2d; border-color: #f09595; }
 
/* productItems */
.prod-add-btn {
  margin-top: 12px;
  width: 100%;
  padding: 10px;
  border: 2px dashed #5dcaa5;
  border-radius: 8px;
  background: transparent;
  color: #0f6e56;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: background 0.15s;
  margin-bottom: 20px;
}
.prod-add-btn:hover { background: #e1f5ee; }
 
/* stopItems */
.stop-add-btn {
  margin-top: 12px;
  width: 100%;
  padding: 10px;
  border: 2px dashed #f38383;
  border-radius: 8px;
  background: transparent;
  color: #ff1f1f;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: background 0.15s;
  margin-bottom: 20px;
}
.stop-add-btn:hover { background: #ffd7d7; }

/* submit */
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