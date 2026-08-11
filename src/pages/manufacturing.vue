<template>

    <Navbar />
    
    <div class="lang-body">
        <div class="lang-card">
            <div class="lang-card-title">系統預設是繁體中文，有需要請至左上角選擇其他語言</div>
            <div class="lang-card-subth">ระบบเริ่มต้นเป็นจีนตัวเต็ม เปลี่ยนภาษาได้ที่มุมบนซ้าย</div>
            <div class="lang-card-subid">Sistem berbahasa Mandarin Tradisional. Pilih bahasa lain di kiri atas jika perlu.</div>
        </div>
    </div>

    <Footer />

</template>

<script setup>
import Footer from '@/components/footer.vue'
import Navbar from '@/components/navbar.vue'
</script>

<style scoped>
.lang-body {
  background: var(--bg);
  padding: 52px 20px;
  display: flex;
  height: calc(100vh - 245px);
  flex-direction: column;
  align-items: center; 
  justify-content: center; 
}

.lang-card {
  background: var(--card);
  border-radius: 36px;                      
  box-shadow: 0 8px 48px rgba(0, 0, 0, 0.07); 
  padding: 85px 50px;                     
  text-align: center;
  max-width: 1040px;                 
  width: 100%;
}

.lang-card-title {
  font-size: 32px;                           
  font-weight: 700;
  color: var(--title);
  margin-bottom: 20px;                     
}

.lang-card-subth {
  font-size: 24px;                           
  font-weight: 400;
  color: var(--text);   
  margin-bottom: 20px;                     
}
.lang-card-subid {
  font-size: 22px;                           
  font-weight: 400;
  color: var(--text);                    
}

.lang-btns {
  display: flex;
  gap: 24px;                                
  justify-content: center;
  flex-wrap: wrap;
}

.lang-btn {
  background: var(--green);
  border: 4px solid var(--green);            
  color: #fff;
  border-radius: 20px;                       
  padding: 20px 60px;                        
  font-size: 28px;                         
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  letter-spacing: 0.6px;                    
}

.lang-btn:hover {
  background: var(--green-hover);
  border-color: var(--green-hover);
  transform: translateY(-4px);              
  box-shadow: 0 12px 36px var(--green-glow); 
}
</style>