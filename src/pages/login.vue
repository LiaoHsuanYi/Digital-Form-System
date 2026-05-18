<template>

  <div class="container d-flex justify-content-center align-items-center vh-100">
    <div class="card p-4" style="width: 100%; max-width: 400px;">
        <div class="card-body">
            <img src="../assets/logo.jpg" class="w-100">
            <form> <!--to be modified for login function-->
                <div class="row mb-3">
                    <label class="lglabel">使用者登入</label>
                    <label class="lglabel">User Login</label>
                </div>
                <div class="row mb-3">
                    <input type="text" class="form-control" placeholder="帳號">
                </div>
                <div class="row mb-4">
                    <input type="password" class="form-control" placeholder="密碼">
                </div>
                <div class="row">
                    <button type="button" class="btn btn-success" @click="router.push('/index')">登入</button>
                </div>
            </form>
        </div>
    </div>
  </div>

</template>
<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>