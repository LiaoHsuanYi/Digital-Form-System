<template>
<div class="topbar">
    <img src="@/assets/logo.jpg" class="topbar-logo">
</div>

<div class="app-bg">
    <div class="form-body">
        <div class="worklist-header">
            待簽核
            <badge class="worklist-count">3</badge>
        </div>

        <div class="table-wrap">
            <table>
                <thead>
                    <th>表單編號</th>
                    <th>表單種類</th>
                    <th>提交人</th>
                    <th>處理時間</th>
                    <th>備註</th>
                    <th>動作</th>
                </thead>
                <tbody> 
                  <tr v-for="item in barData">
                    <td>{{ item.id }}</td>
                    <td>{{ item.formType }}</td>
                    <td>{{ item.submitter }}</td>
                    <td>{{ item.dateTime }}</td>
                    <td>
                        <input class="remark-input">
                    </td>
                    <td>
                        <button class="confirm-btn">送出</button>
                    </td>
                  </tr>
                </tbody>
                
            </table>
        </div>
    </div>
</div>

<Footer />

</template>

<script setup>
import Footer from '@/components/footer.vue';

//virtual data -> need to display the specified form data
const barData = [
  {
    id: '1',
    formType: '自主巡檢表-設備點檢',
    submitter: 'Allen',
    dateTime: '2026-07-28 9:30',
  },
  {
    id: '2',
    formType: '自主巡檢表-外觀檢視',
    submitter: 'Joy',
    dateTime: '2026-07-29 4:30',
  },
  {
    id: '3',
    formType: '壓鑄工作日報表',
    submitter: 'Mark',
    dateTime: '2026-07-29 4:30',
  }
]
</script>

<style scoped>
.app-bg {
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 193px);
  font-family: 'Noto Sans TC', sans-serif;
  background: var(--bg);
}

.topbar {
  background: var(--card);
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px 30px;
  position: relative;
}
.topbar-logo {
  height: 80px !important;
  width: auto !important;
  display: block;
}
.worklist-header {
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 16px;
}

.worklist-count {
  background: #E30613;
  color: #fff;
  font-size: 18px;
  font-weight: 500;
  border-radius: 999px;
  padding: 2px 14px;
}

.table-wrap {
  background: #fff;
  border: 1px solid #E6E6EA;
  border-radius: 12px;
  overflow-x: auto;
}

table {
  width: 100%;
  min-width: 760px;
  table-layout: fixed;
  border-collapse: collapse;
  font-size: 16px;
}

thead th {
  background: #FAFAFB;
  border-bottom: 2px solid #E6E6EA;
  text-align: center;
  padding: 12px 16px;
  font-size: 18px;
  font-weight: 700;
  color: var(--text);
}

td {
  padding: 12px 16px;
  vertical-align: middle;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
}

tr:hover{
  background-color: #FFF0F2;
}

.remark-input {
  width: 100%;
  border: 1px solid #E6E6EA;
  border-radius: 6px;
  padding: 6px 10px;
  font-size: 16px;
  background: #FAFBFC;
}

.remark-input:focus {
  outline: 2px solid #E30613;
  outline-offset: 1px;
  border-color: transparent;
  background: #fff;
}

.confirm-btn {
  border: 1px solid #E30613;
  background: #fff;
  padding: 6px 14px;
  border-radius: 7px;
  font-size: 16px;
  font-weight: 600;
  color: #E30613;
  white-space: nowrap;
}

.confirm-btn:hover {
  background: #E30613;
  color: #fff;
}
</style>