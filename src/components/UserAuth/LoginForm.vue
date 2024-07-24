<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const email = ref('')
const password = ref('')
</script>

<template>
  <div class="display-flex-column">
    <h1>Login</h1>
    <input class="login-input" type="email" v-model="email" placeholder="Email" />
    <input class="login-input" type="password" v-model="password" placeholder="Password" />
    <RouterLink to="/form" v-slot="{ navigate }">
      <button class="btn" @click="navigate" role="link">Login</button>
    </RouterLink>
  </div>
</template>

<style>
.login-input {
  margin-bottom: 1rem;
  padding: 6px 12px;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  appearance: none;
  border-radius: 4px;
  transition:
    border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;
}
</style>
