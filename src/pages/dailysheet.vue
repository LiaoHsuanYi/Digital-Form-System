<template>
<Navbar /> 
<div class="form-bg">
    <div class="form-body">
        <form>
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
                        <input type="date" class="field-input" v-model="form.date">
                    </div>
                    <div class="field-group">
                        <label class="field-label">機器編號</label>
                        <input type="text" class="field-input" v-model="form.machineNo">
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
                        <select class="field-input" v-model="person.shift">
                            <option value="">請選擇</option>
                            <option value="早班">早班</option>
                            <option value="晚班">晚班</option>
                        </select>
                    </div>    
                    <div class="field-group">
                        <label class="field-label">工號</label> 
                        <input type="text" class="field-input" v-model="person.employeeNo">
                    </div>
                    <div class="field-group">
                        <label class="field-label">姓名</label>
                        <input type="text" class="field-input" v-model="person.name">
                    </div>
                    <div class="field-group">
                        <label class="field-label">出勤時數</label> 
                        <input type="number" class="field-input" v-model="person.workhrs">
                    </div>

                    <button type="button" 
                        v-if="index === 0" 
                        class="action-btn add-btn" 
                        @click="addPerson" 
                        :disabled="form.people.length >= 3"
                        >
                        <span class="btn-icon">+</span>
                    </button>

                    <button type="button" 
                        v-else
                        class="action-btn remove-btn" 
                        @click="removePerson"
                        >
                        <span class="btn-icon">-</span>
                    </button>
                </div>
            </section>

            <section>
                <div class="sec-head">
                    <div class="sec-bar"></div>
                    <div class="sec-lbl">生產項目</div>
                </div>

                <div class="card-list">
                    <div 
                    v-for="(item, index) in form.productItems"
                    :key="index">
                    
                    
                    </div>
                </div>

            </section>



        </form>
    </div>
</div>
    
<Footer /> 
</template>

<script setup>
import Navbar from '@/components/navbar.vue'
import Footer from '@/components/footer.vue'
import { formatNow } from '@/utils/date.js'
import { reactive } from 'vue'

//initialization
//main form
const form = reactive({
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
})

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
    stopReason: '',
    stop_NGquan: ''
})

const productForm = reactive(createProduct());
const stopForm = reactive(createStop());

//clear & reset
const resetform = () => {
    Object.keys(form).forEach(key => {
        if (Array.isArray(form[key])) 
            form[key] = [];
        else 
            form[key] = '';
    })
    form.date = formatNow('date');
}

const resetProduct = () => {
    Object.assign(productForm, createProduct())
}

const resetStop = () => {
    Object.assign(stopForm, createStop())
}

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
</script>

<style scoped>
.machine-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 24px;
}

.person-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr auto;
  align-items: end; 
  gap: 10px;
  margin: 15px 0 15px;
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
  transition: background 0.15s, transform 0.1s;
  align-self: end;
}
 
.action-btn:active {
  transform: scale(0.95);
}
 
.btn-icon {
  font-size: 18px;
  line-height: 1;
}

.add-btn {
  border-color: #3ab87a;
  color: #3ab87a;
}
 
.add-btn:hover {
  background: #e1f5ee;
}
 
.remove-btn {
  border-color: #ccc;
  color: #999;
}
 
.remove-btn:hover {
  border-color: #e57373;
  color: #e57373;
  background: #fff5f5;
}


/* 卡片列表容器 */
.card-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* 單張卡片 */
.prod-card {
  background: var(--color-background-primary);
  border: 0.5px solid var(--color-border-tertiary);
  border-radius: 12px;
  padding: 14px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: border-color 0.15s;
}
.prod-card:hover {
  border-color: var(--color-border-secondary);
}

/* 左側序號圓圈 */
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
}

/* 產品名稱區 */
.card-main { flex: 1; min-width: 0; }
.card-title {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-primary);
  margin: 0 0 2px;
}
.card-sub {
  font-size: 12px;
  color: var(--color-text-secondary);
  margin: 0;
}

/* 數量、時間、狀態區 */
.card-meta {
  display: flex;
  gap: 16px;
  align-items: center;
  flex-shrink: 0;
}
.meta-item { text-align: center; }
.meta-label {
  font-size: 11px;
  color: var(--color-text-tertiary);
  margin: 0 0 1px;
}
.meta-val {
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text-primary);
}

/* 分隔線 */
.divider {
  width: 0.5px;
  height: 32px;
  background: var(--color-border-tertiary);
}

/* 狀態標籤 */
.badge {
  font-size: 11px;
  font-weight: 500;
  padding: 3px 10px;
  border-radius: 20px;
  white-space: nowrap;
}
.badge-complete   { background: #e1f5ee; color: #0f6e56; }
.badge-incomplete { background: #faeeda; color: #854f0b; }

/* 操作按鈕 */
.card-actions { display: flex; gap: 6px; flex-shrink: 0; }
.btn-icon {
  width: 30px;
  height: 30px;
  border: 0.5px solid var(--color-border-tertiary);
  border-radius: 8px;
  background: var(--color-background-primary);
  color: var(--color-text-secondary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  transition: background 0.15s;
}
.btn-icon:hover { background: var(--color-background-secondary); color: var(--color-text-primary); }
.btn-icon.del:hover {
  background: #fcebeb;
  color: #a32d2d;
  border-color: #f09595;
}

/* 新增按鈕 */
.add-btn {
  margin-top: 12px;
  width: 100%;
  padding: 10px;
  border: 1px dashed #5dcaa5;
  border-radius: 8px;
  background: transparent;
  color: #0f6e56;
  font-size: 13px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: background 0.15s;
}
.add-btn:hover { background: #e1f5ee; }
</style>