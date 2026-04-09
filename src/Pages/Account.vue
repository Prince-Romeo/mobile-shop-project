<template>
    <div class="h-screen flex items-center justify-center bg-gray-100">

        <div class="bg-white w-[380px] p-6 rounded-lg shadow-md text-center">

            <div class="flex flex-col items-center mb-4">
                <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                    class="w-20 h-20 rounded-full mb-2" />
                <h2 class="text-2xl font-bold">{{ user.name }}</h2>
                <p class="text-gray-500">{{ user.location }}</p>
            </div>

            <div class="text-left mb-4">
                <p class="mb-2"><b>Username:</b> {{ user.user }}</p>
                <p class="mb-2"><b>Phone:</b> {{ user.phone }}</p>
                <p class="mb-2"><b>Email:</b> {{ user.email }}</p>
            </div>

            <div v-if="editMode" class="mb-4">
                <input v-model="editName" type="text" placeholder="Name" class="w-full mb-2 p-2 border rounded" />

                <input v-model="editLocation" type="text" placeholder="Location"
                    class="w-full mb-2 p-2 border rounded" />

                <input v-model="editPhone" type="text" placeholder="Phone" class="w-full mb-2 p-2 border rounded" />

                <input v-model="editEmail" type="text" placeholder="Email" class="w-full mb-2 p-2 border rounded" />

                <button @click="updateProfile" class="w-full bg-green-500 text-white p-2 rounded mb-2">
                    Save
                </button>
            </div>

            <button @click="editMode = true" class="w-full bg-blue-500 text-white p-2 rounded mb-2">
                Edit
            </button>

            <button @click="logout" class="w-full bg-red-500 text-white p-2 rounded">
                Logout
            </button>

        </div>

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()

const user = ref({})
const editMode = ref(false)

const editName = ref('')
const editLocation = ref('')
const editPhone = ref('')
const editEmail = ref('')

onMounted(() => {
    const data = localStorage.getItem("use")

    if (!data) {
        router.push('/')
    } else {
        user.value = JSON.parse(data)

        editName.value = user.value.name
        editLocation.value = user.value.location
        editPhone.value = user.value.phone
        editEmail.value = user.value.email
    }
})

async function updateProfile() {
    let updated = {
        id: user.value.id,
        user: user.value.user,
        pass: user.value.pass,
        name: editName.value,
        location: editLocation.value,
        phone: editPhone.value,
        email: editEmail.value
    }

    let res = await axios.put(`http://localhost:3000/users/${user.value.id}`, updated)

    if (res.status === 200) {
        user.value = updated
        localStorage.setItem("use", JSON.stringify(updated))
        editMode.value = false
    }
}

function logout() {
    localStorage.removeItem("use")
    router.push('/sinup')
}
</script>