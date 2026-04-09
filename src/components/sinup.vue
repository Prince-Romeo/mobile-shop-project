<template>
    <div class="w-[100%] h-screen flex items-center justify-center bg-gray-100">

        <div class="w-[60%] h-[500px] m-auto flex shadow-lg rounded-lg overflow-hidden">

            <div class="bg-red-500 w-[50%] flex items-center justify-center">
                <img src="https://i.pinimg.com/736x/7b/5a/34/7b5a3465d0ec30e8dd1f3d49e0dfe66a.jpg" />
            </div>

            <div class="bg-gray-500 w-[50%] flex items-center justify-center">

                <div class="bg-white p-8 rounded shadow-md w-[80%]">
                    <h2 class="text-2xl font-bold mb-5 text-center">Login</h2>

                    <input v-model="username" type="text" placeholder="Username"
                        class="w-full mb-4 p-2 border rounded" />

                    <input v-model="password" type="password" placeholder="Password"
                        class="w-full mb-4 p-2 border rounded" />

                    <button @click="submit" class="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                        Login
                    </button>

                    <input v-model="newPassword" type="password" placeholder="New Password"
                        class="w-full mt-4 mb-2 p-2 border rounded" />

                    <button @click="updatePassword"
                        class="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
                        Update Password
                    </button>

                    <p class="text-center mt-4">
                        Don't have account?
                        <span @click="goSignup" class="text-blue-500 cursor-pointer">Signup</span>
                    </p>

                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const newPassword = ref('')
const router = useRouter()

async function submit() {
    if (!username.value || !password.value) return

    let res = await axios.get("http://localhost:3000/users")
    let users = res.data

    let found = users.find(
        (u) => u.user === username.value && u.pass === password.value
    )

    if (found) {
        localStorage.setItem("use", JSON.stringify(found))
        router.push('/Account')
    } else {
        alert("Invalid username or password")
    }
}

async function updatePassword() {
    if (!username.value || !password.value || !newPassword.value) return

    let res = await axios.get("http://localhost:3000/users")
    let users = res.data

    let found = users.find(
        (u) => u.user === username.value && u.pass === password.value
    )

    if (!found) {
        alert("Wrong current credentials")
        return
    }

    let updatedUser = {
        ...found,
        pass: newPassword.value
    }

    let r = await axios.put(`http://localhost:3000/users/${found.id}`, updatedUser)

    if (r.status === 200) {
        alert("Password updated")
        password.value = newPassword.value
        newPassword.value = ''
        localStorage.setItem("use", JSON.stringify(updatedUser))
    }
}

function goSignup() {
    router.push('/Signup')
}

onMounted(() => {
    const user = localStorage.getItem("use")
    if (user) {
        router.push('/Account')
    }
})
</script>