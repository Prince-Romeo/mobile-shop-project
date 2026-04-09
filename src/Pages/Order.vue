<template>
    <div class="w-[95%] sm:w-[80%] m-auto">

        <div v-if="Shoes.length === 0" class="text-center text-gray-500 mt-10">
            No products found
        </div>

        <div v-else class="mt-4 space-y-4" v-for="phome in Shoes" :key="phome.name">

            <div class="Anime w-full bg-slate-500 p-4 rounded-lg flex flex-col sm:flex-row gap-4 items-center">

                <div class="w-full sm:w-[15%] flex justify-center">
                    <div
                        class="w-[120px] h-[160px] sm:w-[100px] sm:h-[140px] md:w-[120px] md:h-[160px] overflow-hidden rounded-md bg-white p-1">
                        <img :src="phome.img" class="w-full h-full object-contain" />
                    </div>
                </div>

                <div class="w-full sm:w-[65%]">
                    <h2 class="text-base sm:text-xl md:text-2xl font-bold text-white leading-tight">
                        {{ phome.name }}
                    </h2>

                    <div class="flex flex-wrap items-center gap-2 mt-2">
                        <p class="text-lg sm:text-xl md:text-2xl font-bold text-green-300">
                            ₹{{ phome.price }}
                        </p>

                        <p class="text-sm sm:text-base md:text-lg text-gray-300 line-through">
                            {{ phome.original }}
                        </p>

                        <p class="text-xs sm:text-sm md:text-base text-black bg-yellow-400 px-2 py-1 rounded">
                            {{ phome.discount }}
                        </p>
                    </div>
                </div>

                <div class="w-full sm:w-[20%] flex justify-center sm:justify-end items-center ">
                    <button @click="addcart(phome)"
                        class="w-full sm:w-auto text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition p-[10px]">
                        Remove
                    </button>
                </div>

            </div>

        </div>

        <div v-if="Shoes.length > 0"
            class="Anime w-full bg-slate-500 p-4 rounded-lg flex justify-between items-center mt-6">

            <h2 class="text-lg sm:text-xl md:text-2xl font-bold text-white">
                Total Price
            </h2>

            <p class="text-lg sm:text-xl md:text-2xl font-bold text-green-300">
                ₹{{ total }}
            </p>

        </div>

    </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import { useRouter } from 'vue-router'

const Shoes = ref([])

onMounted(() => {
    const data = JSON.parse(localStorage.getItem("Shoes"))
    Shoes.value = Array.isArray(data) ? data : []
})

const total = computed(() => {
    return Shoes.value.reduce((sum, item) => {
        return sum + Number(item.price.toString().replace(/,/g, ''))
    }, 0)
})

const addToCart = (item) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || []
    cart.push(item)
    localStorage.setItem("cart", JSON.stringify(cart))
    alert("Added to cart")
}

const addcart = (item) => {
    let data = JSON.parse(localStorage.getItem("Shoes")) || []
    data = data.filter(i => i.name !== item.name)
    localStorage.setItem("Shoes", JSON.stringify(data))
    Shoes.value = data
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
.Anime {
    transition: 0.3s ease;
}

.Anime:hover {
    transform: scale(1.02);
}
</style>