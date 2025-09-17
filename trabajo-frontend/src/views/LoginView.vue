<template>
  <div class="container">
    <div class="card">
      <h1>Iniciar sesión</h1>
      <form @submit.prevent="handleLogin">
        <input v-model="usuario" placeholder="Usuario" />
        <input v-model="password" type="password" placeholder="Contraseña" />
        <button type="submit">Ingresar</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const usuario = ref('')
const password = ref('')
const router = useRouter()

function handleLogin() {
  // ======= lógica de ejemplo (frontend-only) =======
  // Aquí normalmente validarías con backend. Como tu rol es frontend,
  // hacemos una comprobación simple y navegamos al dashboard.
  if (!usuario.value || !password.value) {
    alert('Ingrese usuario y contraseña (esto es solo demo).')
    return
  }
  // navegamos a la ruta 'Dashboard'
  router.push({ name: 'Dashboard' })
}
</script>

<style scoped>
.container {
  display:flex;
  height:100vh;
  align-items:center;
  justify-content:center;
  background:#f3f4f6;
}
.card {
  background:white;
  padding:2rem;
  border-radius:10px;
  width:360px;
  box-shadow:0 8px 20px rgba(0,0,0,0.08);
}
h1 { margin:0 0 1rem 0; font-size:1.25rem; text-align:center; }
input {
  width:100%;
  padding:0.6rem;
  margin-bottom:0.75rem;
  border:1px solid #d1d5db;
  border-radius:6px;
  box-sizing:border-box;
}
button {
  width:100%;
  padding:0.6rem;
  border-radius:6px;
  border:none;
  background:#2563eb;
  color:white;
  cursor:pointer;
}
button:hover { background:#1e40af; }
</style>
