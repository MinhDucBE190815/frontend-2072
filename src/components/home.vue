<template>
  <div class="home">
    <h1>Assigment giai đoan 1</h1>
    <p>Phạm Minh Đức</p>

    <div class="navigation">
      <router-link to="/create-post" class="btn btn-primary me-2">create product</router-link>
      <router-link v-if="!isAuthenticated" to="/login" class="btn btn-secondary me-2">Login</router-link>
      <router-link v-if="!isAuthenticated" to="/register" class="btn btn-success">Register</router-link>
      <button v-if="isAuthenticated" @click="logout" class="btn btn-danger">Logout</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const isAuthenticated = ref(!!localStorage.getItem("authToken"));

const logout = () => {
  localStorage.removeItem("authToken");
  isAuthenticated.value = false;
  alert("You have been logged out!");
  router.push("/login");
};
</script>

<style>
.home {
  text-align: center;
  margin-top: 50px;
}

.navigation {
  margin-top: 20px;
}

.btn {
  margin: 5px;
}
</style>
