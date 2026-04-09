<template>

    <div class="w-[95%] sm:w-[80%] m-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mt-[89px]">

        <div v-for="shoe in r" :key="shoe.name" class="Anim">

            <div class="w-full rounded-xl overflow-hidden shadow-lg bg-white">

                <div class="flex justify-end p-2">
                    <i @click="Like(shoe)" :class="shoe.liked
                        ? 'fa-solid fa-heart text-xl sm:text-2xl md:text-3xl text-red-500'
                        : 'fa-regular fa-heart text-xl sm:text-2xl md:text-3xl text-gray-400'">
                    </i>
                </div>

                <div class="w-full h-[280px] sm:h-[400px] md:h-[600px]">
                    <img :src="shoe.img" class="w-full h-full" />
                </div>

                <div class="p-3 sm:p-4 bg-[#efe3e3]">

                    <h2 class="text-sm sm:text-lg md:text-xl font-bold my-2 leading-tight">
                        {{ shoe.name }}
                    </h2>

                    <div class="flex flex-wrap items-center gap-2">
                        <p class="text-base sm:text-xl md:text-2xl font-bold text-green-700">
                            ₹{{ shoe.price }}
                        </p>

                        <p class="text-xs sm:text-lg md:text-xl text-gray-500 line-through">
                            {{ shoe.original }}
                        </p>

                        <p class="text-xs sm:text-lg md:text-xl text-black">
                            {{ shoe.discount }}
                        </p>
                    </div>

                    <div class="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4">
                        <button @click="addcart(shoe)"
                            class="w-full sm:w-1/2 py-2 text-sm sm:text-base bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                            Add to Cart
                        </button>

                        <button
                            class="w-full sm:w-1/2 py-2 text-sm sm:text-base bg-yellow-500 text-black rounded-lg hover:bg-yellow-600 transition">
                            Buy Now
                        </button>
                    </div>

                </div>

            </div>

        </div>

        <div v-if="r.length === 0" class="text-center col-span-3 text-gray-500 text-xl mt-10">
            No Favorites Yet
        </div>

        <div v-if="showToast"
            class="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg transition">
            Addcart Successful
        </div>

    </div>

</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const r = ref([])
const showToast = ref(false)

onMounted(() => {
    const data = JSON.parse(localStorage.getItem("liked")) || []
    r.value = data
})

const Like = (shoe) => {
    shoe.liked = !shoe.liked
    r.value = r.value.filter(item => item.liked)
    localStorage.setItem("liked", JSON.stringify(r.value))
}

const addcart = (shoe) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || []
    cart.push(shoe)
    localStorage.setItem("cart", JSON.stringify(cart))

    showToast.value = true
    setTimeout(() => {
        showToast.value = false
    }, 2000)
}

const router = useRouter()

onMounted(() => {
    const user = localStorage.getItem("use")

    if (!user) {
        router.push('/Sinup')
    }
})
</script>

<style>
.Anim {
    transition: 0.3s ease;
}

.Anim:hover {
    transform: scale(1.03);
}
</style>