<script setup>
import { ref } from 'vue';

const items = ref([
  { label: 'Home', to: '/' },
  { label: 'List', to: '/list' }
]);
</script>

<template>
  <div class="card">
    <Menubar :model="items" class="mb-4">
      <template #start>
        <img src="../assets/vue.svg" alt="Vue Logo" height="30" class="mr-2" />
        <span class="text-xl font-bold">Vue App</span>
      </template>
      <template #item="{ item }">
        <router-link :to="item.to" custom v-slot="{ navigate, isActive }">
          <a 
            @click="navigate" 
            :class="{'p-menuitem-link': true, 'router-link-active': isActive}"
          >
            {{ item.label }}
          </a>
        </router-link>
      </template>
    </Menubar>
  </div>
</template>

<style scoped>
.card {
  margin-bottom: 2rem;
}

:deep(.p-menubar) {
  border-radius: 10px;
}

:deep(.router-link-active) {
  font-weight: bold;
}
</style>
