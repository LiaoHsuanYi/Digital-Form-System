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
