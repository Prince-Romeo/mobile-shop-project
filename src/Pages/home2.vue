<template>
    <div class="text-center py-8">
        <h1 class="text-4xl font-bold">Home Page</h1>
        <button @click="logout" class="mt-5 bg-red-500 text-white px-4 py-2 rounded">
            Logout
        </button>
    </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
    const user = localStorage.getItem("user")
    if (!user) {
        router.push('/')
    }
})

const logout = () => {
    localStorage.removeItem("user")
    router.push('/')
}
</script>