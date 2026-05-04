<template>
    <div class="w-full min-h-screen flex items-center justify-center px-2 relative overflow-hidden"
        style="background: linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #667eea 100%); background-size: 400% 400%; animation: gradientShift 15s ease infinite;">

        <!-- Animated background shapes -->
        <div class="absolute top-0 left-0 w-96 h-96 bg-blue-400 opacity-20 rounded-full blur-3xl animate-pulse"
            style="animation: float 20s infinite;"></div>
        <div class="absolute bottom-0 right-0 w-96 h-96 bg-purple-400 opacity-20 rounded-full blur-3xl animate-pulse"
            style="animation: float 25s infinite reverse;"></div>
        <div class="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-400 opacity-10 rounded-full blur-3xl"
            style="animation: float 30s infinite;"></div>

        <div
            class="w-full max-w-[380px] sm:max-w-[500px] md:max-w-[750px] lg:max-w-[1000px] xl:max-w-[1100px] h-auto md:h-[520px] m-auto flex flex-col md:flex-row shadow-2xl rounded-2xl overflow-hidden bg-gray-50 animate-fadeInScale relative z-10">

            <div class="hidden md:flex md:w-[50%] h-full items-center justify-center bg-red-500 animate-slideInLeft">
                <img class="h-full w-full object-cover"
                    src="https://i.pinimg.com/736x/7b/5a/34/7b5a3465d0ec30e8dd1f3d49e0dfe66a.jpg" />
            </div>

            <div class="w-full md:w-[50%] flex items-center justify-center p-3 sm:p-6 md:p-8 animate-slideInRight">

                <div class="w-full max-w-[350px] sm:max-w-[400px]">
                    <h2 class="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-5 text-center animate-slideInDown">
                        Login</h2>

                    <input v-model="username" type="text" placeholder="Enter username"
                        class="w-full mb-3 sm:mb-4 p-2 border rounded text-sm md:text-base placeholder-gray-400 animate-slideInUp transition-all duration-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400" />

                    <div class="relative mb-3 sm:mb-4 animate-slideInUp" style="animation-delay: 0.1s">
                        <input :type="showPassword ? 'text' : 'password'" v-model="password"
                            placeholder="Enter password"
                            class="w-full p-2 border rounded pr-10 text-sm md:text-base placeholder-gray-400 transition-all duration-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
                        <span @click="showPassword = !showPassword"
                            class="absolute right-2 top-2 cursor-pointer text-xs hover:text-blue-500 transition-colors">
                            {{ showPassword ? 'Hide' : 'Show' }}
                        </span>
                    </div>

                    <button @click="submit"
                        class="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 text-sm md:text-base animate-slideInUp transition-all duration-300 transform hover:scale-105"
                        style="animation-delay: 0.2s">
                        Login
                    </button>

                    <button @click="showForgot = true"
                        class="w-full mt-2 bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600 text-sm md:text-base animate-slideInUp transition-all duration-300 transform hover:scale-105"
                        style="animation-delay: 0.3s">
                        Forgot Password
                    </button>

                    <div v-if="showForgot" class="animate-fadeIn">
                        <input v-model="forgotUsername" type="text" placeholder="Enter username"
                            class="w-full mt-3 sm:mt-4 mb-2 p-2 border rounded text-sm md:text-base placeholder-gray-400 transition-all duration-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-green-400" />

                        <div class="relative mb-2">
                            <input :type="showNewPassword ? 'text' : 'password'" v-model="forgotNewPassword"
                                placeholder="Enter new password"
                                class="w-full p-2 border rounded pr-10 text-sm md:text-base placeholder-gray-400 transition-all duration-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-green-400" />
                            <span @click="showNewPassword = !showNewPassword"
                                class="absolute right-2 top-2 cursor-pointer text-xs hover:text-green-500 transition-colors">
                                {{ showNewPassword ? 'Hide' : 'Show' }}
                            </span>
                        </div>

                        <input v-model="newUsername" type="text" placeholder="Enter new username (optional)"
                            class="w-full mb-2 p-2 border rounded text-sm md:text-base placeholder-gray-400 transition-all duration-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-green-400" />

                        <button @click="resetCredentials"
                            class="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 text-sm md:text-base transition-all duration-300 transform hover:scale-105">
                            Reset
                        </button>
                    </div>

                    <p class="text-center mt-3 sm:mt-4 text-sm md:text-base">
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
const router = useRouter()

const showPassword = ref(false)
const showNewPassword = ref(false)

const showForgot = ref(false)
const forgotUsername = ref('')
const forgotNewPassword = ref('')
const newUsername = ref('')

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

async function resetCredentials() {
    if (!forgotUsername.value || !forgotNewPassword.value) return

    let res = await axios.get("http://localhost:3000/users")
    let users = res.data

    let found = users.find(
        (u) => u.user === forgotUsername.value
    )

    if (!found) {
        alert("User not found")
        return
    }

    let updatedUser = {
        ...found,
        user: newUsername.value || found.user,
        pass: forgotNewPassword.value
    }

    let r = await axios.put(`http://localhost:3000/users/${found.id}`, updatedUser)

    if (r.status === 200) {
        alert("Credentials updated")
        showForgot.value = false
        forgotUsername.value = ''
        forgotNewPassword.value = ''
        newUsername.value = ''
    }
}

function goSignup() {
    router.push('/Signup')
}

onMounted(() => {
    const user = localStorage.getItem("use")
    if (user) {
        router.push('/Home')
    }
})
</script>

<style scoped>
@keyframes fadeInScale {
    from {
        opacity: 0;
        transform: scale(0.95);
    }

    to {
        opacity: 1;
        transform: scale(1);
    }
}

@keyframes slideInLeft {
    from {
        opacity: 0;
        transform: translateX(-30px);
    }

    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes slideInRight {
    from {
        opacity: 0;
        transform: translateX(30px);
    }

    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes slideInDown {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes slideInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

.animate-fadeInScale {
    animation: fadeInScale 0.6s ease-out;
}

.animate-slideInLeft {
    animation: slideInLeft 0.6s ease-out;
}

.animate-slideInRight {
    animation: slideInRight 0.6s ease-out;
}

.animate-slideInDown {
    animation: slideInDown 0.5s ease-out;
}

.animate-slideInUp {
    animation: slideInUp 0.5s ease-out forwards;
    opacity: 0;
}

.animate-fadeIn {
    animation: fadeIn 0.4s ease-out;
}

@keyframes gradientShift {
    0% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0% 50%;
    }
}

@keyframes float {

    0%,
    100% {
        transform: translateY(0) translateX(0);
    }

    25% {
        transform: translateY(-20px) translateX(10px);
    }

    50% {
        transform: translateY(-40px) translateX(-10px);
    }

    75% {
        transform: translateY(-20px) translateX(15px);
    }
}
</style>