<template>
  <div class="layout">
    <aside class="sidebar">
      <h2>Mi App</h2>
      <nav>
        <ul>
          <li :class="{ active: active === 'Inicio' }" @click="setActive('Inicio')">Inicio</li>
          <li :class="{ active: active === 'Usuarios' }" @click="setActive('Usuarios')">Usuarios</li>
          <li :class="{ active: active === 'Reportes' }" @click="setActive('Reportes')">Reportes</li>
          <li class="logout" @click="goLogout">Cerrar sesión</li>
        </ul>
      </nav>
    </aside>

    <main class="content">
      <h1>{{ active }}</h1>

      <section v-if="active === 'Inicio'">
        <p>Panel de inicio: aquí va resumen, indicadores o widgets.</p>
      </section>

      <section v-else-if="active === 'Usuarios'">
        <p>Listado de usuarios (demo). Aquí montarás tu UI para tablas/CRUD.</p>
      </section>

      <section v-else-if="active === 'Reportes'">
        <p>Sección de reportes (demo).</p>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const active = ref('Inicio')
const router = useRouter()

function setActive(name) {
  active.value = name
}

function goLogout() {
  // regresamos a la vista de login
  router.push({ name: 'Login' })
}
</script>

<style scoped>
.layout { display:flex; height:100vh; }
.sidebar {
  width:220px;
  background:#0f172a;
  color:#e6eef8;
  padding:1rem;
  box-sizing:border-box;
}
.sidebar h2 { margin:0 0 1rem 0; font-size:1.1rem; }
.sidebar ul { list-style:none; padding:0; margin:0; }
.sidebar li {
  padding:0.6rem 0.5rem;
  border-radius:6px;
  cursor:pointer;
  margin-bottom:0.3rem;
}
.sidebar li.active, .sidebar li:hover { background:#111827; color:#fff; }
.sidebar .logout { margin-top:1rem; color:#fca5a5; }
.content {
  flex:1;
  padding:2rem;
  background:#f8fafc;
}
</style>
