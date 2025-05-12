<script setup>
import { ref, onMounted } from "vue";
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Card from 'primevue/card';

const items = ref([]);
const newItemName = ref("");
const isLoading = ref(true);
const error = ref(null);

// Load initial items


onMounted(async () => {
    let response = await fetch("/api/list");
    const data = await response.json();
    items.value = data.items?.map(item => ({
            id: item.id,
            name: item.name
        })) || [];
    
    isLoading.value = false;
});

// Add a new item
function addItem() {
    if (!newItemName.value.trim()) return;
    
    const newId = Math.max(0, ...items.value.map(i => i.id)) + 1;
    items.value.push({
        id: newId,
        name: newItemName.value.trim()
    });
    
    newItemName.value = ""; // Clear input
}

// Remove an item
function removeItem(id) {
    const index = items.value.findIndex(item => item.id === id);
    if (index !== -1) {
        const itemName = items.value[index].name;
        items.value.splice(index, 1);
        
    }
}
</script>

<template>
    <Card>
        <template #content>
            <div v-if="isLoading" class="loading">
                Loading items...
            </div>
            
            <div v-else>
                <!-- Add item form -->
                <div class="add-item-form">
                    <InputText v-model="newItemName" placeholder="Enter new item name" @keyup.enter="addItem" />
                    <Button @click="addItem" class="add-button">Add Item</Button>
                </div>
                
                <!-- Items list -->
                <div class="items-list" v-if="items.length > 0">
                    <div v-for="item in items" :key="item.id" class="item-row">
                        <span class="item-name">{{ item.name }}</span>
                        <Button @click="removeItem(item.id)" class="remove-button" severity="danger" icon="pi pi-times" />
                    </div>
                </div>
                <div v-else class="no-items">
                    No items available. Add one above!
                </div>
            </div>
        </template>
    </Card>
</template>

<style scoped>
.loading {
    text-align: center;
    padding: 1rem;
    font-style: italic;
    color: #666;
}

.add-item-form {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
}

.add-button {
    flex-shrink: 0;
}

.items-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.item-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
    background-color: #f8f9fa;
    border-radius: 4px;
}

.item-name {
    flex-grow: 1;
}

.no-items {
    text-align: center;
    padding: 1rem;
    color: #666;
    font-style: italic;
}
</style>
