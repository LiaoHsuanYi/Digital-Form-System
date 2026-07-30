<template>
<Navbar />
<div class="form-bg">
    <div class="form-body">
        <form ref="checkRequired" @submit.prevent="submitAppearance">
            <div class="form-title">
                {{ $t('appearance.title') }}
            </div>
            
            <section>           
                <div class="sec-head">
                    <div class="sec-bar"></div>
                    <div class="sec-lbl">{{  $t('appearance.labels[0]') }}</div>
                </div>
                <div class="field-grid">
                    <div class="field-group">
                        <label class="field-label">{{ $t('appearance.date') }}</label>
                        <input type="datetime-local" class="field-input" v-model="form.date" readonly>
                    </div>
                    <div class="field-group">
                        <label class="field-label">{{ $t('appearance.machineNo') }}</label> 
                        <input type="text" class="field-input" v-model="form.machineNo" required>
                    </div>
                    <div class="field-group">
                        <label class="field-label">{{ $t('appearance.batchNo') }}</label>
                        <input type="text" class="field-input" v-model="form.batchNo" @blur="returnMoldId" required>
                    </div>
                    <div class="field-group">
                        <label class="field-label">{{ $t('appearance.machineType') }}</label> 
                        <input type="text" class="field-input" v-model="form.machineType"required>
                    </div>
                    <div class="field-group">
                        <label class="field-label">{{ $t('appearance.moldId') }}</label>
                        <input type="text" class="field-input" v-model="form.moldId" readonly>
                    </div>
                </div>
            </section>

            <section>
                <div class="sec-head">
                    <div class="sec-bar"></div>
                    <div class="sec-lbl">{{  $t('appearance.labels[1]') }}</div>
                </div>

                <div class="insp-wrap">
                    <table class="insp-table">
                        <thead>
                        <tr>
                            <th>{{ $t('appearance.checklist.title') }}</th>
                            <th>{{ $t('appearance.checklist.items[0]') }}</th>
                            <th>{{ $t('appearance.checklist.items[1]') }}</th>
                            <th>{{ $t('appearance.checklist.items[2]') }}</th>
                            <th>{{ $t('appearance.checklist.items[3]') }}</th>
                        </tr>
                        </thead>

                        <tbody>
                        <tr v-for="defect in defectType" :key="defect.key">
                            <td>{{ defect.label }}</td>

                            <td v-for="item in items" :key="item" class="check-td">
                                <label class="insp-check-cell">
                                    <input
                                    type="checkbox"
                                    :checked="isChecked(item, defect.key)"
                                    @change="packDefect(item, defect.key, $event.target.checked)"
                                    >
                                </label>
                            </td>
                        </tr>
                        </tbody>
                    </table>
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
import { reactive, ref, watch } from 'vue'
import { formatNow } from '@/utils/date.js'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const STORAGE_KEY = 'appearance_draft'
 
//initialization: read draft from localStorage
const savedDraft = localStorage.getItem(STORAGE_KEY)
const parsedDraft = savedDraft ? JSON.parse(savedDraft) : null

//initialization
const checkRequired = ref();
//main form
const form = reactive({
  ...(parsedDraft || {
    machineNo: '',
    machineType: '',
    batchNo: '',
    moldId: '',
    defects: []
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
}

//value assignment
const items = [1, 2, 3, 4]
const defectType = [
  {key: '拉模、裂紋', label: t('appearance.checklist.defects[0]')},
  {key: '缺肉、多肉', label: t('appearance.checklist.defects[1]')},
  {key: '燒付', label: t('appearance.checklist.defects[2]')},
  {key: '模銷斷、歪斜', label: t('appearance.checklist.defects[3]')},
  {key: '流紋', label: t('appearance.checklist.defects[4]')},
  {key: '起泡、凹陷', label: t('appearance.checklist.defects[5]')},
  {key: '變形', label: t('appearance.checklist.defects[6]')},
  {key: '週期章無打點', label: t('appearance.checklist.defects[7]')},
  {key: '檢具NG', label: t('appearance.checklist.defects[8]')},
  {key: '油汙、手套痕', label: t('appearance.checklist.defects[9]')},
  {key: '模具黏模', label: t('appearance.checklist.defects[10]')},
]

//pack checkbox defects
const isChecked = (item, type) => {
  return form.defects.some(x => x.item === item && x.type === type);
}
const packDefect = (item, type, checked) => {
  const index = form.defects.findIndex(
    x => x.item === item && x.type === type
  );

  if (checked && index === -1) 
  {
    form.defects.push({ item, type });
  }

  if (!checked && index !== -1) 
  {
    form.defects.splice(index, 1);
  }
}

//validation
const checkLook = () => {
    if (!checkRequired.value.checkValidity()) //check required
    {
        checkRequired.value.reportValidity();
        return false;
    }

    const count = form.defects.length;
    if(count === 0) 
    {
        return confirm(t('appearance.lookOK'));
    }
    else
    {
        return confirm(t('appearance.lookNG', { count: count }));
    }
}

//submit
const submitAppearance = async() => {
  if(!checkLook())
      return;

  form.moldId = String(form.moldId).padStart(3, '#0');

  //console.log(form);
  resetform();

  //API
}

</script>

<style scoped>
/* table */
.insp-wrap {
  background: var(--card);
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid var(--border);
  margin-bottom: 26px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.05);
}

.insp-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 18px;
}

.insp-table thead tr {
  background: #ECF9F3;
}

.insp-table th {
  color: var(--sub);
  font-weight: 600;
  padding: 13px 14px;
  text-align: center;
  font-size: 20px;
  letter-spacing: 0.3px;
}

.insp-table th:first-child {
  text-align: left;
  padding-left: 20px;
}

.insp-table td {
  padding: 0;
  border-bottom: 1px solid #f4f4f4;
  text-align: center;
  color: #363636;
}

.insp-table td:first-child {
  padding: 11px 14px 11px 20px;
  text-align: left;
  font-weight: 600;
  color: #222;
}

.insp-table tbody td.check-td {
  position: relative;
}

.insp-table tbody td.check-td::before {
  content: "";
  position: absolute;
  top: 7px;
  left: 0;
  bottom: 7px;
  border-left: 2px dashed #d8d8d8;
  pointer-events: none;
}

.insp-check-cell {
  min-height: 42px;
  display: grid;
  place-items: center;
  cursor: pointer;
}

.insp-check-cell:hover {
  border-color: var(--green);
  background: var(--green-light);
}

.insp-table input[type="checkbox"] {
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
  margin: 0 auto;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
}

.insp-table input[type="checkbox"]:checked {
  background: var(--green);
  border-color: var(--green);
}

.insp-table input[type="checkbox"]:checked::before {
  content: "";
  width: 10px;
  height: 6px;
  border-left: 2px solid #fff;
  border-bottom: 2px solid #fff;
  transform: rotate(-45deg) translate(1px, -1px);
}
</style>