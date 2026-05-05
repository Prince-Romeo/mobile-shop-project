<template>
    <div class="auth-wrapper">
        <div class="auth-bg">
            <div class="bg-circle c1"></div>
            <div class="bg-circle c2"></div>
            <div class="bg-circle c3"></div>
        </div>

        <div class="auth-card">
            <div class="auth-image">
                <img src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80" alt="Login" />
                <div class="image-overlay">
                    <div class="overlay-logo">🛍️</div>
                    <h2>Mobile Shop</h2>
                    <p>Your one-stop mobile destination</p>
                </div>
            </div>

            <div class="auth-form">
                <div class="form-inner">

                    <!-- Tab Switch -->
                    <div class="tab-row">
                        <button class="tab-btn" :class="{ active: mode === 'login' }" @click="mode = 'login'">Sign
                            In</button>
                        <button class="tab-btn" :class="{ active: mode === 'signup' }" @click="mode = 'signup'">Sign
                            Up</button>
                    </div>

                    <!-- LOGIN FORM -->
                    <transition name="slide-fade" mode="out-in">
                        <div v-if="mode === 'login'" key="login">
                            <div class="form-header">
                                <h1>Welcome back</h1>
                                <p>Sign in to your account</p>
                            </div>

                            <div class="field-group">
                                <label>Username</label>
                                <div class="input-wrap">
                                    <span class="input-icon">👤</span>
                                    <input v-model="username" type="text" placeholder="Enter your username"
                                        :class="{ 'input-error': errors.username }" @input="errors.username = ''" />
                                </div>
                                <span class="field-error" v-if="errors.username">{{ errors.username }}</span>
                            </div>

                            <div class="field-group">
                                <label>Password</label>
                                <div class="input-wrap">
                                    <span class="input-icon">🔑</span>
                                    <input v-model="password" :type="showPassword ? 'text' : 'password'"
                                        placeholder="Enter your password" :class="{ 'input-error': errors.password }"
                                        @input="errors.password = ''" />
                                    <button class="toggle-btn" @click="showPassword = !showPassword" type="button">
                                        {{ showPassword ? 'Hide' : 'Show' }}
                                    </button>
                                </div>
                                <span class="field-error" v-if="errors.password">{{ errors.password }}</span>
                            </div>

                            <div class="form-actions">
                                <span class="forgot-link" @click="showForgot = !showForgot">
                                    {{ showForgot ? 'Cancel' : 'Forgot password?' }}
                                </span>
                            </div>

                            <button class="btn btn-primary" @click="submit" :disabled="loading">
                                <span v-if="loading" class="spinner"></span>
                                <span v-else>Sign In</span>
                            </button>

                            <transition name="slide-fade">
                                <div class="forgot-box" v-if="showForgot">
                                    <p class="forgot-title">🔒 Reset Credentials</p>
                                    <div class="field-group">
                                        <label>Registered Username</label>
                                        <div class="input-wrap">
                                            <span class="input-icon">👤</span>
                                            <input v-model="forgotUsername" type="text"
                                                placeholder="Enter your username" />
                                        </div>
                                    </div>
                                    <div class="field-group">
                                        <label>New Password</label>
                                        <div class="input-wrap">
                                            <span class="input-icon">🔑</span>
                                            <input v-model="forgotNewPassword"
                                                :type="showNewPassword ? 'text' : 'password'"
                                                placeholder="Enter new password" />
                                            <button class="toggle-btn" @click="showNewPassword = !showNewPassword"
                                                type="button">
                                                {{ showNewPassword ? 'Hide' : 'Show' }}
                                            </button>
                                        </div>
                                    </div>
                                    <div class="field-group">
                                        <label>New Username <span class="optional">(optional)</span></label>
                                        <div class="input-wrap">
                                            <span class="input-icon">✏️</span>
                                            <input v-model="newUsername" type="text"
                                                placeholder="Leave blank to keep current" />
                                        </div>
                                    </div>
                                    <button class="btn btn-success" @click="resetCredentials">Reset Credentials</button>
                                </div>
                            </transition>
                        </div>
                    </transition>

                    <!-- SIGNUP FORM -->
                    <transition name="slide-fade" mode="out-in">
                        <div v-if="mode === 'signup'" key="signup">
                            <div class="form-header">
                                <h1>Create account</h1>
                                <p>Join us today, it's free!</p>
                            </div>

                            <div class="field-group">
                                <label>Full Name</label>
                                <div class="input-wrap">
                                    <span class="input-icon">🙂</span>
                                    <input v-model="signupName" type="text" placeholder="Enter your full name"
                                        :class="{ 'input-error': signupErrors.name }" @input="signupErrors.name = ''" />
                                </div>
                                <span class="field-error" v-if="signupErrors.name">{{ signupErrors.name }}</span>
                            </div>

                            <div class="field-group">
                                <label>Username</label>
                                <div class="input-wrap">
                                    <span class="input-icon">👤</span>
                                    <input v-model="signupUser" type="text" placeholder="Choose a username"
                                        :class="{ 'input-error': signupErrors.user }" @input="signupErrors.user = ''" />
                                </div>
                                <span class="field-error" v-if="signupErrors.user">{{ signupErrors.user }}</span>
                            </div>

                            <div class="field-group">
                                <label>Email</label>
                                <div class="input-wrap">
                                    <span class="input-icon">📧</span>
                                    <input v-model="signupEmail" type="email" placeholder="Enter your email"
                                        :class="{ 'input-error': signupErrors.email }"
                                        @input="signupErrors.email = ''" />
                                </div>
                                <span class="field-error" v-if="signupErrors.email">{{ signupErrors.email }}</span>
                            </div>

                            <div class="field-group">
                                <label>Password</label>
                                <div class="input-wrap">
                                    <span class="input-icon">🔑</span>
                                    <input v-model="signupPass" :type="showSignupPass ? 'text' : 'password'"
                                        placeholder="Create a password" :class="{ 'input-error': signupErrors.pass }"
                                        @input="signupErrors.pass = ''" />
                                    <button class="toggle-btn" @click="showSignupPass = !showSignupPass" type="button">
                                        {{ showSignupPass ? 'Hide' : 'Show' }}
                                    </button>
                                </div>
                                <span class="field-error" v-if="signupErrors.pass">{{ signupErrors.pass }}</span>
                            </div>

                            <button class="btn btn-primary" @click="submitSignup" :disabled="signupLoading">
                                <span v-if="signupLoading" class="spinner"></span>
                                <span v-else>Create Account</span>
                            </button>
                        </div>
                    </transition>

                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const BASE_URL = 'https://mobile-shop-api-t0cw.onrender.com'
const router = useRouter()

// Mode
const mode = ref('login')

// Login
const username = ref('')
const password = ref('')
const showPassword = ref(false)
const showForgot = ref(false)
const showNewPassword = ref(false)
const forgotUsername = ref('')
const forgotNewPassword = ref('')
const newUsername = ref('')
const loading = ref(false)
const errors = ref({ username: '', password: '' })

// Signup
const signupName = ref('')
const signupUser = ref('')
const signupEmail = ref('')
const signupPass = ref('')
const showSignupPass = ref(false)
const signupLoading = ref(false)
const signupErrors = ref({ name: '', user: '', email: '', pass: '' })

async function submit() {
    errors.value = { username: '', password: '' }
    if (!username.value) { errors.value.username = 'Username is required'; return }
    if (!password.value) { errors.value.password = 'Password is required'; return }
    loading.value = true
    try {
        let res = await axios.get(`${BASE_URL}/users`)
        let users = res.data
        let found = users.find((u) => u.user === username.value && u.pass === password.value)
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

async function submitSignup() {
    signupErrors.value = { name: '', user: '', email: '', pass: '' }
    let valid = true
    if (!signupName.value.trim()) { signupErrors.value.name = 'Full name is required'; valid = false }
    if (!signupUser.value.trim() || signupUser.value.length < 3) { signupErrors.value.user = 'Username must be at least 3 characters'; valid = false }
    if (!signupEmail.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupEmail.value)) { signupErrors.value.email = 'Enter a valid email'; valid = false }
    if (!signupPass.value || signupPass.value.length < 6) { signupErrors.value.pass = 'Password must be at least 6 characters'; valid = false }
    if (!valid) return

    signupLoading.value = true
    try {
        let res = await axios.get(`${BASE_URL}/users`)
        let users = res.data
        if (users.find(u => u.user === signupUser.value)) { signupErrors.value.user = 'Username already taken'; signupLoading.value = false; return }
        if (users.find(u => u.email === signupEmail.value)) { signupErrors.value.email = 'Email already registered'; signupLoading.value = false; return }

        let newUser = {
            user: signupUser.value,
            pass: signupPass.value,
            name: signupName.value,
            email: signupEmail.value,
            location: '',
            phone: ''
        }
        let r = await axios.post(`${BASE_URL}/users`, newUser)
        if (r.status === 201) {
            localStorage.setItem('use', JSON.stringify(r.data))
            router.push('/Account')
        }
    } catch (e) {
        signupErrors.value.pass = 'Server error. Please try again.'
    } finally {
        signupLoading.value = false
    }
}

async function resetCredentials() {
    if (!forgotUsername.value || !forgotNewPassword.value) { alert('Please fill in username and new password'); return }
    let res = await axios.get(`${BASE_URL}/users`)
    let users = res.data
    let found = users.find((u) => u.user === forgotUsername.value)
    if (!found) { alert('User not found'); return }
    let updatedUser = { ...found, user: newUsername.value || found.user, pass: forgotNewPassword.value }
    let r = await axios.put(`${BASE_URL}/users/${found.id}`, updatedUser)
    if (r.status === 200) {
        alert('Credentials updated successfully')
        showForgot.value = false
        forgotUsername.value = ''
        forgotNewPassword.value = ''
        newUsername.value = ''
    }
}

onMounted(() => {
    const user = localStorage.getItem('use')
    if (user) { router.push('/Home') }
})
</script>

<style scoped>
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

.auth-wrapper {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #0a0a0f;
    padding: 1.5rem;
    position: relative;
    overflow: hidden;
}

.auth-bg {
    position: absolute;
    inset: 0;
    pointer-events: none;
}

.bg-circle {
    position: absolute;
    border-radius: 50%;
    filter: blur(120px);
    opacity: 0.12;
}

.c1 {
    width: 500px;
    height: 500px;
    background: #4f46e5;
    top: -150px;
    left: -100px;
}

.c2 {
    width: 400px;
    height: 400px;
    background: #0ea5e9;
    bottom: -100px;
    right: -80px;
}

.c3 {
    width: 300px;
    height: 300px;
    background: #8b5cf6;
    top: 40%;
    left: 40%;
}

.auth-card {
    position: relative;
    z-index: 10;
    display: flex;
    width: 100%;
    max-width: 920px;
    min-height: 580px;
    background: #fff;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 32px 80px rgba(0, 0, 0, 0.4);
    animation: cardIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
}

@keyframes cardIn {
    from {
        opacity: 0;
        transform: translateY(24px) scale(0.97);
    }

    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

.auth-image {
    display: none;
    position: relative;
    width: 46%;
    overflow: hidden;
    flex-shrink: 0;
}

.auth-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

.image-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(160deg, rgba(79, 70, 229, 0.88) 0%, rgba(14, 165, 233, 0.78) 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #fff;
    padding: 2rem;
    text-align: center;
}

.overlay-logo {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.image-overlay h2 {
    font-size: 1.8rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
}

.image-overlay p {
    font-size: 0.95rem;
    opacity: 0.85;
}

@media (min-width: 720px) {
    .auth-image {
        display: flex;
        flex-direction: column;
    }
}

.auth-form {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem 2rem;
    background: #fff;
    overflow-y: auto;
}

.form-inner {
    width: 100%;
    max-width: 340px;
}

.tab-row {
    display: flex;
    background: #f1f5f9;
    border-radius: 12px;
    padding: 4px;
    margin-bottom: 1.75rem;
}

.tab-btn {
    flex: 1;
    padding: 9px;
    border: none;
    background: transparent;
    color: #64748b;
    font-size: 0.875rem;
    font-weight: 600;
    border-radius: 9px;
    cursor: pointer;
    transition: all 0.22s;
}

.tab-btn.active {
    background: #fff;
    color: #4f46e5;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.form-header {
    margin-bottom: 1.5rem;
}

.form-header h1 {
    font-size: 1.6rem;
    font-weight: 700;
    color: #0f172a;
    letter-spacing: -0.5px;
    margin-bottom: 4px;
}

.form-header p {
    font-size: 0.875rem;
    color: #64748b;
}

.field-group {
    margin-bottom: 1rem;
}

.field-group label {
    display: block;
    font-size: 0.78rem;
    font-weight: 600;
    color: #334155;
    margin-bottom: 6px;
    letter-spacing: 0.3px;
}

.optional {
    font-weight: 400;
    color: #94a3b8;
}

.input-wrap {
    position: relative;
    display: flex;
    align-items: center;
}

.input-icon {
    position: absolute;
    left: 12px;
    font-size: 13px;
    pointer-events: none;
}

.field-group input {
    width: 100%;
    padding: 11px 44px;
    border: 1.5px solid #e2e8f0;
    border-radius: 11px;
    font-size: 0.875rem;
    color: #0f172a;
    background: #f8fafc;
    outline: none;
    transition: all 0.2s;
}

.field-group input:focus {
    border-color: #4f46e5;
    background: #fff;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.12);
}

.field-group input.input-error {
    border-color: #f87171;
    box-shadow: 0 0 0 3px rgba(248, 113, 113, 0.1);
}

.field-error {
    display: block;
    font-size: 0.75rem;
    color: #ef4444;
    margin-top: 4px;
}

.toggle-btn {
    position: absolute;
    right: 12px;
    background: none;
    border: none;
    font-size: 0.72rem;
    font-weight: 600;
    color: #4f46e5;
    cursor: pointer;
    padding: 2px 4px;
}

.toggle-btn:hover {
    color: #3730a3;
}

.form-actions {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;
    margin-top: -0.25rem;
}

.forgot-link {
    font-size: 0.78rem;
    color: #4f46e5;
    cursor: pointer;
    font-weight: 500;
}

.forgot-link:hover {
    text-decoration: underline;
}

.btn {
    width: 100%;
    padding: 12px;
    border-radius: 11px;
    font-size: 0.925rem;
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
    background: linear-gradient(135deg, #4f46e5, #7c3aed);
    color: #fff;
    box-shadow: 0 4px 16px rgba(79, 70, 229, 0.35);
}

.btn-primary:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 6px 22px rgba(79, 70, 229, 0.45);
}

.btn-primary:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.btn-success {
    background: linear-gradient(135deg, #10b981, #059669);
    color: #fff;
    box-shadow: 0 4px 14px rgba(16, 185, 129, 0.3);
    margin-top: 0.25rem;
}

.btn-success:hover {
    transform: translateY(-1px);
}

.spinner {
    width: 16px;
    height: 16px;
    border: 2px solid rgba(255, 255, 255, 0.4);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

.forgot-box {
    background: #f0fdf4;
    border: 1.5px solid #bbf7d0;
    border-radius: 14px;
    padding: 1.1rem;
    margin-bottom: 0.5rem;
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
    transition: all 0.28s ease;
}

.slide-fade-leave-active {
    transition: all 0.2s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    opacity: 0;
    transform: translateY(8px);
}

@media (max-width: 480px) {
    .auth-card {
        border-radius: 18px;
    }

    .auth-form {
        padding: 1.75rem 1.25rem;
    }
}
</style>