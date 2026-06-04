<template>
    
    <div class="dept-bg">
        <div class="dept-inner">
            <div class="text-center mb-4">
                <img src="@/assets/logo.jpg" class="dept-logo">
            </div>
            <div class="dept-title">精密製造處</div>
            <div class="dept-line"></div>

            <div class="dept-cards">
                <router-link to="/mbx" class="dept-card">
                    <span class="dept-card-icon">⚙️</span>
                    <div class="dept-card-label">零件製造部</div>
                </router-link>
                <div class="dept-card">
                    <span class="dept-card-icon">🔧</span>
                    <div class="dept-card-label">機械加工部</div>
                </div>
            </div>
        </div>
        <Footer />
    </div>

</template>

<script setup>
import Footer from '../components/footer.vue'
</script>

<style scoped>
.dept-bg {
  background: white;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
}

.dept-inner {
  text-align: center;
  width: 100%;
  max-width: 700px;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.dept-logo {
  width: 450px;
  height: auto;
  display: block;
  margin: 0 auto 20px;
}

.dept-title {
  font-size: 50px;
  font-weight: 700;
  color: var(--text);
  letter-spacing: 2px;
  margin-bottom: 10px;
}

.dept-line {
  width: 200px;
  height: 3px;
  background: var(--green);
  border-radius: 2px;
  margin: 0 auto 32px;
}

.dept-cards {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 30px;
  justify-content: center;
}

.dept-card {
  background: var(--card);
  border: 1.5px solid var(--border);
  border-radius: 18px;
  padding: 40px 60px;
  cursor: pointer;
  text-align: center;
  min-width: 250px;
  transition: all 0.22s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  text-decoration: none;
  display: inline-block;
  color: var(--text);
}

.dept-card:hover {
  border-color: var(--green);
  transform: translateY(-5px);
  box-shadow: 0 12px 32px var(--green-glow);
  background: var(--green-light);
  color: var(--text);
}

.dept-card-icon {
  font-size: 45px;
  margin-bottom: 18px;
  display: block;
  line-height: 1;
}

.dept-card-label {
  font-size: 30px;
  font-weight: 600;
  color: var(--text);
  letter-spacing: 0.5px;
}

.dept-footer {
  font-size: 12px;
  color: #c8c8c8;
  margin-top: 32px;
}
</style>