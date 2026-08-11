<template>
    <div class="login-bg d-flex justify-content-center align-items-center vh-100">
        <div class="login-card">
            <img src="@/assets/logo.jpg" alt="Taigene Logo" class="login-logo">
            <span class="lglabel-main">使用者登入</span>
            <span class="lglabel-sub">User Login</span>
            <div class="login-divider"></div>

            <input type="text" class="login-input" placeholder="帳號 Username">
            <input type="password" class="login-input" placeholder="密碼 Password">

            <button class="login-btn" @click="router.push('/manufacturing')">登入</button>
            <!--decided by department-->
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<style scoped>
.login-bg {
  background: var(--bg);
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
}

.login-card {
  background: var(--card);
  border-radius: 20px;
  box-shadow: 0 4px 32px rgba(0, 0, 0, 0.09);
  padding: 44px 40px 40px;
  width: 400px;
  max-width: 95vw;
  text-align: center;
}

.login-logo {
  width: 280px;
  height: auto;
  margin: 0 auto 22px;
  display: block;
}

.lglabel-main {
  display: block;
  font-size: 24px;
  font-weight: 700;
  color: var(--title);
  margin-bottom: 3px;
  letter-spacing: 0.5px;
}

.lglabel-sub {
  display: block;
  font-size: 18px;
  color: var(--text);
  margin-bottom: 8px;
  letter-spacing: 0.3px;
}

.login-divider {
  width: 32px;
  height: 2px;
  background: var(--green);
  border-radius: 2px;
  margin: 0 auto 24px;
}

.login-input {
  width: 100%;
  border: 1.5px solid var(--border);
  border-radius: 10px;
  padding: 13px 16px;
  font-size: 16px;
  color: var(--text);
  outline: none;
  background: #fafafa;
  margin-bottom: 12px;
  transition: border 0.18s, box-shadow 0.18s;
  display: block;
}

.login-input::placeholder {
  color: #bbb;
}

.login-input:focus {
  border-color: var(--green);
  background: #fff;
  box-shadow: 0 0 0 3px var(--green-glow);
}

.login-btn {
  width: 100%;
  background: var(--green);
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 5px;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
  letter-spacing: 1px;
  margin-top: 4px;
  transition: all 0.2s;
  box-shadow: 0 4px 14px var(--green-glow);
}

.login-btn:hover {
  background: var(--green-hover);
  box-shadow: 0 6px 20px rgba(61, 191, 130, 0.28);
}
</style>