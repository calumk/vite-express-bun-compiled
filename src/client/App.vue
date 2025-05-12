<script setup>
import NavBar from './components/NavBar.vue';
</script>

<template>
  <div id="app">
    <NavBar />
    <main class="content">
      <router-view />
    </main>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Roboto', sans-serif;
}

body {
  min-height: 100vh;
  background-color: var(--surface-ground);
}

#app {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.content {
  padding: 1.5rem;
  border-radius: 10px;
}

.p-card {
  margin-bottom: 1.5rem;
}
</style>