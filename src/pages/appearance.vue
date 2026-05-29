<template>
<Navbar />
<form ref="checkRequired" @submit.prevent="submitAppearance">
    <section>
        <div class="container">
            <div class="row">
                <span class="badge bg-dark mt-5 mb-5" style="font-weight: bolder; font-size: x-large;">{{ $t('appearance.title') }}</span>
            </div>
        </div>
        <div class="container">
            <h3><span class="badge bg-success mb-3">{{ $t('appearance.labels[0]') }}</span></h3>
            <div class="row mb-4">
                <div class="col">
                    <label class="label">{{ $t('appearance.date') }}</label>
                    <input type="datetime-local" class="form-control" v-model="form.date">
                </div>
                <div class="col">
                    <label class="label">{{ $t('appearance.machine_no') }}</label> 
                    <input type="text" class="form-control" v-model="form.machine_no" required>
                </div>
                <div class="col">
                    <label class="label">{{ $t('appearance.material_no') }}</label>
                    <input type="text" class="form-control" v-model="form.material_no" required>
                </div>
                <div class="col">
                    <label class="label">{{ $t('appearance.material_type') }}</label> 
                    <input type="text" class="form-control" v-model="form.material_type" required>
                </div>
                <div class="col">
                    <label class="label">{{ $t('appearance.mold_id') }}</label>
                    <input type="text" class="form-control" v-model="form.mold_id" required>
                </div>
            </div>
        </div>
    </section>

    <section>
    <div class="container mb-5">
        <h3><span class="badge bg-success mb-3">{{ $t('appearance.labels[1]') }}</span></h3>
        <table class="look"> 
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
                    <td v-for="item in items">
                        <input type="checkbox" 
                               class="form-check-input"
                               :checked="isChecked(item, defect.key)"
                               @change="packDefect(item, defect.key, $event.target.checked)"
                        >
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    </section>

    <div class="container text-center">
        <button type="submit" class="btn btn-outline-success btn-lg col-4 mb-4">Submit</button>
    </div>
</form>

<Footer />

</template>

<script setup>
import Navbar from '@/components/navbar.vue'
import Footer from '@/components/footer.vue'
import { reactive, ref } from 'vue'
import { formatNow } from '@/utils/date.js'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

//initialization
const checkRequired = ref();
const form = reactive({
    date: formatNow('minute'),
    machine_no: '',
    material_no: '',
    material_type: '',
    mold_id: '',
    defects: []
})

//clear & reset
const resetform = () => {
    form.date = formatNow('minute');
    form.machine_no = '';
    form.material_no = '';
    form.material_type = '';
    form.mold_id = '';
    form.defects = [];
}

//value assignment
const items = [1, 2, 3, 4]
const defectType = [
    {key: 'crack', label: t('appearance.checklist.defects[0]')},
    {key: 'loss', label: t('appearance.checklist.defects[1]')},
    {key: 'burn', label: t('appearance.checklist.defects[2]')},
    {key: 'skew', label: t('appearance.checklist.defects[3]')},
    {key: 'flow', label: t('appearance.checklist.defects[4]')},
    {key: 'dent', label: t('appearance.checklist.defects[5]')},
    {key: 'deform', label: t('appearance.checklist.defects[6]')},
    {key: 'stamp', label: t('appearance.checklist.defects[7]')},
    {key: 'tool_ng', label: t('appearance.checklist.defects[8]')},
    {key: 'oil', label: t('appearance.checklist.defects[9]')},
    {key: 'stick', label: t('appearance.checklist.defects[10]')},
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
        return confirm(t('appearance.look_ok'));
    }
    else
    {
        return confirm(t('appearance.look_ng', { count: count }));
    }
}

//submit
const submitAppearance = async() => {
    if(!checkLook())
        return;

    resetform();
}

</script>