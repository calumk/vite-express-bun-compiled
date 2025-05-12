<script setup>
</script>

<template>
    <div class="home">
        <Card class="mb-4">
            <template #header>
                <div class="flex justify-content-center">
                    <img src="../assets/vue.svg" alt="Vue Logo" class="vue-logo mr-2" />
                    <img src="../assets/bun.png" alt="Bun Logo" class="vue-logo" />
                </div>
            </template>
            <template #title>
                <h1 class="text-center text-4xl mb-2">Welcome to Calums App</h1>
            </template>
            <template #subtitle>
                <p class="text-center text-xl mb-5">A minimal Vue 3 application with PrimeVue components</p>
            </template>
            <template #content>
                <div class="grid">
                    <div class="col-12 md:col-4">
                        <Panel header="Modern Design">
                            <p>Clean UI with responsive components</p>
                        </Panel>
                    </div>
                    <div class="col-12 md:col-4">
                        <Panel header="Vue 3 Powered">
                            <p>Built with Vue 3 Composition API</p>
                        </Panel>
                    </div>
                    <div class="col-12 md:col-4">
                        <Panel header="Express Backend">
                            <p>Integrated with Express.js for API needs</p>
                        </Panel>
                    </div>
                </div>
            </template>
        </Card>
    </div>
</template>

<style scoped>
.home {
    padding: 1rem;
}

.vue-logo {
    height: 100px;
    animation: float 6s ease-in-out infinite;
}

@keyframes float {
    0% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(-15px);
    }
    100% {
        transform: translateY(0px);
    }
}
</style>