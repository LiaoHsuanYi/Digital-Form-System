<template>

    <div class="container text-center">
        <img src="../assets/logo.jpg" class="img-fluid w-50">
    </div>

    <div class="btncontainer">
        <div class="row mb-5">
            <label class="h1">精密製造處</label>
        </div>
        <div class="row">
             <div class="col">
                <router-link to="/mbx"class="btn btn-warning idxbtn">零件製造部</router-link>
            </div>
            <div class="col">
                <button class="btn btn-warning idxbtn">機械加工部</button>
            </div>
        </div>
    </div>

    <Footer />
    
</template>

<script setup>
import Footer from '../components/footer.vue'
</script>

<style scoped>
.btncontainer{
  display: flex; 
  flex-direction: column;         
  justify-content: center; 
  align-items: center;     
  height: 60vh;
}
.h1{
  font-size: 70px;
  font-weight: bolder;
  text-align: center;
}
.idxbtn{
  font-size: 45px;
  padding: 30px;
  min-width: max-content;
  margin: 0 15px;
}
</style>
