<template>
<div class="container text-center">
        <img src="../assets/logo.jpg" class="img-fluid w-50">
</div>
<Navbar />
<form ref="checkRequired" @submit.prevent="submitAppearance">
    <section>
        <div class="container">
            <div class="row">
                <span class="badge bg-dark mt-5 mb-5" style="font-weight: bolder; font-size: x-large;">作業自主巡迴檢查表 - 外觀檢視</span>
            </div>
        </div>
        <div class="container">
            <h3><span class="badge bg-success mb-3">基本資料</span></h3>
            <div class="row mb-4">
                <div class="col-3">
                    <label class="label">日期和時間</label>
                    <input type="datetime-local" class="form-control" v-model="form.date">
                </div>
                <div class="col-3">
                    <label class="label">機器編號</label> <!--Barcode-->
                    <input type="text" class="form-control" v-model="form.machine_num" required>
                </div>
                <div class="col-3">
                    <label class="label">機種</label> <!--Barcode slice-->
                    <input type="text" class="form-control" v-model="form.machine_type" required>
                </div>
                <div class="col-3">
                    <label class="label">模號</label>
                    <input type="text" class="form-control" v-model="form.mold_id" required>
                </div>
            </div>
        </div>
    </section>

    <section>
    <div class="container mb-5">
        <h3><span class="badge bg-success mb-3">外觀檢查</span></h3>
        <table class="look"> 
            <thead>
                <tr>
                    <th>項目 / 抽檢序號</th>
                    <th>第一顆</th>
                    <th>第二顆</th>
                    <th>第三顆</th>
                    <th>第四顆</th>
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
import Navbar from '../components/navbar.vue'
import Footer from '../components/footer.vue'
import { reactive, ref } from 'vue'
import { formatNow } from '../utils/date.js'

//initialization
const checkRequired = ref();
const form = reactive({
  date: formatNow('minute'),
  machine_num: '',
  machine_type: '',
  mold_id: '',
  defects: []
})

//clear & reset
const resetform = () => {
  form.date = formatNow('minute')
  form.machine_num = ''
  form.machine_type = ''
  form.mold_id = ''
  form.defects = []
}

//value assignment
const items = [1, 2, 3, 4]
const defectType = [
    {key: 'crack', label: '拉模、裂紋'},
    {key: 'loss', label: '缺肉、多肉'},
    {key: 'burn', label: '燒付'},
    {key: 'skew', label: '模銷斷、歪斜'},
    {key: 'flow', label: '流紋'},
    {key: 'dent', label: '起泡、凹陷'},
    {key: 'deform', label: '變形'},
    {key: 'stamp', label: '週期章無打點'},
    {key: 'tool_ng', label: '檢具NG'},
    {key: 'oil', label: '油汙、手套痕'},
    {key: 'stick', label: '模具黏模'},
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

const checkLook = () => {
    if (!checkRequired.value.checkValidity()) //check required
    {
        checkRequired.value.reportValidity();
        return false;
    }

    const count = form.defects.length;
    if(count === 0) 
    {
        return confirm("目前沒有勾選任何異狀，確認資料無誤後，完成送出");
    }
    else
    {
        return confirm("偵測到" + `${count}` + "項異狀，確認資料無誤後，完成送出");
    }
}
const submitAppearance = async() => {
    if(!checkLook())
        return;

    resetform();
}

</script>