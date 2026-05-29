<template>
    <div class="login-bg d-flex justify-content-center align-items-center vh-100">
        <div class="login-card">
            <img src="@/assets/logo.jpg" alt="Taigene Logo" class="login-logo">
            <span class="lglabel-main">使用者登入</span>
            <span class="lglabel-sub">User Login</span>
            <div class="login-divider"></div>

            <input type="text" class="login-input" placeholder="帳號 Username">
            <input type="password" class="login-input" placeholder="密碼 Password">

            <button class="login-btn" @click="router.push('/index')">登入</button>
        </div>
    </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>