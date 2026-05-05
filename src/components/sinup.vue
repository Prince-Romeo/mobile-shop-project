<template>
    <div class="login-wrapper">
        <div class="blob blob-1"></div>
        <div class="blob blob-2"></div>
        <div class="blob blob-3"></div>

        <div class="login-card">
            <div class="login-image">
                <img src="https://i.pinimg.com/736x/7b/5a/34/7b5a3465d0ec30e8dd1f3d49e0dfe66a.jpg" alt="Login visual" />
                <div class="image-overlay">
                    <h2>Welcome Back</h2>
                    <p>Login to continue your journey</p>
                </div>
            </div>

            <div class="login-form">
                <div class="form-inner">
                    <div class="form-header">
                        <div class="form-icon">🔐</div>
                        <h1>Login</h1>
                        <p>Enter your credentials to continue</p>
                    </div>

                    <div class="field-group">
                        <label>Username</label>
                        <input v-model="username" type="text" placeholder="Enter username"
                            :class="{ 'input-error': errors.username }" @input="errors.username = ''" />
                        <span class="field-error" v-if="errors.username">{{ errors.username }}</span>
                    </div>

                    <div class="field-group">
                        <label>Password</label>
                        <div class="input-wrap">
                            <input v-model="password" :type="showPassword ? 'text' : 'password'"
                                placeholder="Enter password" :class="{ 'input-error': errors.password }"
                                @input="errors.password = ''" />
                            <button class="toggle-btn" @click="showPassword = !showPassword" type="button">
                                {{ showPassword ? 'Hide' : 'Show' }}
                            </button>
                        </div>
                        <span class="field-error" v-if="errors.password">{{ errors.password }}</span>
                    </div>

                    <button class="btn btn-primary" @click="submit" :disabled="loading">
                        <span v-if="loading" class="spinner"></span>
                        <span v-else>Login</span>
                    </button>

                    <button class="btn btn-secondary" @click="showForgot = !showForgot" type="button">
                        {{ showForgot ? 'Cancel Reset' : 'Forgot Password?' }}
                    </button>

                    <transition name="slide-fade">
                        <div class="forgot-box" v-if="showForgot">
                            <p class="forgot-title">Reset Credentials</p>

                            <div class="field-group">
                                <label>Registered Username</label>
                                <input v-model="forgotUsername" type="text" placeholder="Enter your username" />
                            </div>

                            <div class="field-group">
                                <label>New Password</label>
                                <div class="input-wrap">
                                    <input v-model="forgotNewPassword" :type="showNewPassword ? 'text' : 'password'"
                                        placeholder="Enter new password" />
                                    <button class="toggle-btn" @click="showNewPassword = !showNewPassword"
                                        type="button">
                                        {{ showNewPassword ? 'Hide' : 'Show' }}
                                    </button>
                                </div>
                            </div>

                            <div class="field-group">
                                <label>New Username <span class="optional">(optional)</span></label>
                                <input v-model="newUsername" type="text" placeholder="Leave blank to keep current" />
                            </div>

                            <button class="btn btn-success" @click="resetCredentials">
                                Reset Credentials
                            </button>
                        </div>
                    </transition>

                    <p class="signup-text">
                        Don't have an account?
                        <span @click="goSignup">Sign up</span>
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

const BASE_URL = 'http://192.168.1.16:3000'

const username = ref('')
const password = ref('')
const router = useRouter()
const showPassword = ref(false)
const showNewPassword = ref(false)
const showForgot = ref(false)
const forgotUsername = ref('')
const forgotNewPassword = ref('')
const newUsername = ref('')
const loading = ref(false)
const errors = ref({ username: '', password: '' })

async function submit() {
    errors.value = { username: '', password: '' }

    if (!username.value) {
        errors.value.username = 'Username is required'
        return
    }
    if (!password.value) {
        errors.value.password = 'Password is required'
        return
    }

    loading.value = true
    try {
        let res = await axios.get(`${BASE_URL}/users`)
        let users = res.data
        let found = users.find(
            (u) => u.user === username.value && u.pass === password.value
        )
        if (found) {
            localStorage.setItem('use', JSON.stringify(found))
            router.push('/Account')
        } else {
            errors.value.username = ' '
            errors.value.password = 'Invalid username or password'
        }
    } catch (e) {
        errors.value.password = 'Server error. Please try again.'
    } finally {
        loading.value = false
    }
}

async function resetCredentials() {
    if (!forgotUsername.value || !forgotNewPassword.value) {
        alert('Please fill in username and new password')
        return
    }

    let res = await axios.get(`${BASE_URL}/users`)
    let users = res.data
    let found = users.find((u) => u.user === forgotUsername.value)

    if (!found) {
        alert('User not found')
        return
    }

    let updatedUser = {
        ...found,
        user: newUsername.value || found.user,
        pass: forgotNewPassword.value,
    }

    let r = await axios.put(`${BASE_URL}/users/${found.id}`, updatedUser)
    if (r.status === 200) {
        alert('Credentials updated successfully')
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
    const user = localStorage.getItem('use')
    if (user) {
        router.push('/Home')
    }
})
</script>

<style scoped>
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

.login-wrapper {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #667eea 100%);
    background-size: 400% 400%;
    animation: gradientShift 15s ease infinite;
    padding: 1.5rem;
    position: relative;
    overflow: hidden;
}

.blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    pointer-events: none;
    opacity: 0.18;
}

.blob-1 {
    width: 400px;
    height: 400px;
    background: #a78bfa;
    top: -100px;
    left: -80px;
    animation: float 20s infinite;
}

.blob-2 {
    width: 350px;
    height: 350px;
    background: #38bdf8;
    bottom: -80px;
    right: -60px;
    animation: float 25s infinite reverse;
}

.blob-3 {
    width: 250px;
    height: 250px;
    background: #f472b6;
    top: 40%;
    left: 45%;
    animation: float 30s infinite;
}

@keyframes float {

    0%,
    100% {
        transform: translate(0, 0);
    }

    25% {
        transform: translate(16px, -18px);
    }

    50% {
        transform: translate(-12px, -32px);
    }

    75% {
        transform: translate(18px, -16px);
    }
}

@keyframes gradientShift {

    0%,
    100% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }
}

.login-card {
    position: relative;
    z-index: 10;
    display: flex;
    width: 100%;
    max-width: 900px;
    min-height: 520px;
    background: #fff;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 24px 64px rgba(0, 0, 0, 0.18);
    animation: cardIn 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
}

@keyframes cardIn {
    from {
        opacity: 0;
        transform: translateY(20px) scale(0.97);
    }

    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

.login-image {
    display: none;
    position: relative;
    width: 50%;
    overflow: hidden;
}

.login-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

.image-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 2rem;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.65), transparent);
    color: #fff;
}

.image-overlay h2 {
    font-size: 1.6rem;
    font-weight: 700;
    margin-bottom: 4px;
}

.image-overlay p {
    font-size: 0.95rem;
    opacity: 0.85;
}

@media (min-width: 720px) {
    .login-image {
        display: block;
    }
}

.login-form {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2.5rem 2rem;
}

@media (min-width: 720px) {
    .login-form {
        width: 50%;
    }
}

.form-inner {
    width: 100%;
    max-width: 340px;
}

.form-header {
    text-align: center;
    margin-bottom: 1.75rem;
}

.form-icon {
    font-size: 2.25rem;
    margin-bottom: 0.5rem;
}

.form-header h1 {
    font-size: 1.65rem;
    font-weight: 700;
    color: #1e1b4b;
    margin-bottom: 4px;
}

.form-header p {
    font-size: 0.875rem;
    color: #6b7280;
}

.field-group {
    margin-bottom: 1rem;
}

.field-group label {
    display: block;
    font-size: 0.8rem;
    font-weight: 600;
    color: #374151;
    margin-bottom: 6px;
    letter-spacing: 0.3px;
}

.optional {
    font-weight: 400;
    color: #9ca3af;
}

.input-wrap {
    position: relative;
}

.field-group input {
    width: 100%;
    padding: 11px 14px;
    border: 1.5px solid #e5e7eb;
    border-radius: 10px;
    font-size: 0.9rem;
    color: #111827;
    background: #f9fafb;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
}

.input-wrap input {
    padding-right: 56px;
}

.field-group input:focus {
    border-color: #6366f1;
    background: #fff;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
}

.field-group input.input-error {
    border-color: #f87171;
    box-shadow: 0 0 0 3px rgba(248, 113, 113, 0.12);
}

.field-error {
    display: block;
    font-size: 0.78rem;
    color: #ef4444;
    margin-top: 5px;
}

.toggle-btn {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    font-size: 0.78rem;
    font-weight: 600;
    color: #6366f1;
    cursor: pointer;
    padding: 2px 4px;
    transition: color 0.2s;
}

.toggle-btn:hover {
    color: #4338ca;
}

.btn {
    width: 100%;
    padding: 11px;
    border-radius: 10px;
    font-size: 0.92rem;
    font-weight: 600;
    cursor: pointer;
    border: none;
    margin-bottom: 0.6rem;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
}

.btn-primary {
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    color: #fff;
    box-shadow: 0 4px 14px rgba(99, 102, 241, 0.35);
}

.btn-primary:hover:not(:disabled) {
    box-shadow: 0 6px 20px rgba(99, 102, 241, 0.45);
    transform: translateY(-1px);
}

.btn-primary:disabled {
    opacity: 0.65;
    cursor: not-allowed;
}

.btn-secondary {
    background: #f3f4f6;
    color: #374151;
    border: 1.5px solid #e5e7eb;
}

.btn-secondary:hover {
    background: #e5e7eb;
}

.btn-success {
    background: linear-gradient(135deg, #10b981, #059669);
    color: #fff;
    box-shadow: 0 4px 14px rgba(16, 185, 129, 0.3);
}

.btn-success:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 18px rgba(16, 185, 129, 0.4);
}

.spinner {
    width: 16px;
    height: 16px;
    border: 2px solid rgba(255, 255, 255, 0.4);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
    display: inline-block;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

.forgot-box {
    background: #f0fdf4;
    border: 1.5px solid #bbf7d0;
    border-radius: 12px;
    padding: 1.1rem;
    margin-bottom: 0.75rem;
}

.forgot-title {
    font-size: 0.85rem;
    font-weight: 700;
    color: #065f46;
    margin-bottom: 0.85rem;
}

.forgot-box .field-group {
    margin-bottom: 0.7rem;
}

.forgot-box input {
    background: #fff;
}

.slide-fade-enter-active {
    transition: all 0.3s ease;
}

.slide-fade-leave-active {
    transition: all 0.2s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    opacity: 0;
    transform: translateY(-8px);
}

.signup-text {
    text-align: center;
    font-size: 0.875rem;
    color: #6b7280;
    margin-top: 0.5rem;
}

.signup-text span {
    color: #6366f1;
    font-weight: 600;
    cursor: pointer;
}

.signup-text span:hover {
    text-decoration: underline;
}
</style>