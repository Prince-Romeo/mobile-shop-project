<template>

    <div class="w-[95%] sm:w-[85%] md:w-[90%] lg:w-[80%] m-auto 
                grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 
                gap-5 sm:gap-6 md:gap-6 mt-[80px] sm:mt-[89px]">

        <div v-for="shoe in r" :key="shoe.name" class="Anim">

            <div class="w-full rounded-xl overflow-hidden shadow-lg bg-white">

                <div class="flex justify-end p-2">
                    <i @click="Like(shoe)" :class="shoe.liked
                        ? 'fa-solid fa-heart text-xl sm:text-2xl md:text-2xl lg:text-3xl text-red-500'
                        : 'fa-regular fa-heart text-xl sm:text-2xl md:text-2xl lg:text-3xl text-gray-400'">
                    </i>
                </div>

                <div class="w-full h-[280px] sm:h-[320px] md:h-[260px] lg:h-[300px] flex items-center justify-center">
                    <img :src="shoe.img" class="max-h-full max-w-full object-contain" />
                </div>

                <div class="p-3 sm:p-4 bg-[#efe3e3]">

                    <h2 class="text-sm sm:text-lg md:text-base lg:text-lg font-bold my-2 leading-tight break-words">
                        {{ shoe.name }}
                    </h2>

                    <div class="flex flex-wrap items-center gap-2">
                        <p class="text-base sm:text-xl md:text-lg lg:text-xl font-bold text-green-700">
                            ₹{{ shoe.price }}
                        </p>

                        <p class="text-xs sm:text-lg md:text-base lg:text-lg text-gray-500 line-through">
                            {{ shoe.original }}
                        </p>

                        <p class="text-xs sm:text-lg md:text-base lg:text-lg text-black">
                            {{ shoe.discount }}
                        </p>
                    </div>

                    <div class="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4">
                        <button @click="addcart(shoe)"
                            class="w-full sm:w-1/2 py-2 text-sm sm:text-base bg-red-500 text-white rounded-lg">
                            Add to Cart
                        </button>

                        <button class="w-full sm:w-1/2 py-2 text-sm sm:text-base bg-yellow-500 text-black rounded-lg">
                            Buy Now
                        </button>
                    </div>

                </div>

            </div>

        </div>

        <div v-if="r.length === 0"
            class="text-center col-span-1 sm:col-span-2 md:col-span-2 lg:col-span-3 text-gray-500 text-xl mt-10">
            No Favorites Yet
        </div>

        <div v-if="showToast"
            class="fixed top-3 right-3 sm:top-5 sm:right-5 bg-green-500 text-white px-3 sm:px-4 py-2 text-xs sm:text-sm rounded-lg shadow-lg">
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