<template>
    <div class="text-center py-8 sm:py-12">
        <h1
            class="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-transparent bg-clip-text">
            Mobile Shop Now
        </h1>
    </div>

    <div class="w-[95%] sm:w-[85%] md:w-[90%] lg:w-[80%] m-auto 
                grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 
                gap-5 sm:gap-6 md:gap-6">

        <div v-for="shoe in Shoes" :key="shoe.name" class="Anim">
            <div class="w-full rounded-xl overflow-hidden shadow-lg bg-white">

                <!-- ❤️ Like Button -->
                <div class="flex justify-end p-2">
                    <i @click="Like(shoe)" :class="shoe.liked
                        ? 'fa-solid fa-heart text-xl sm:text-2xl lg:text-3xl text-red-500'
                        : 'fa-regular fa-heart text-xl sm:text-2xl lg:text-3xl text-gray-400'">
                    </i>
                </div>

                <!-- 📱 Image -->
                <div class="w-full h-[280px] sm:h-[320px] md:h-[260px] lg:h-[300px] flex items-center justify-center">
                    <img :src="shoe.img" class="max-h-full max-w-full object-contain" />
                </div>

                <!-- 📦 Details -->
                <div class="p-3 sm:p-4 bg-[#efe3e3]">
                    <h2 class="text-sm sm:text-lg md:text-base lg:text-lg font-bold my-2 leading-tight">
                        {{ shoe.name }}
                    </h2>

                    <div class="flex flex-wrap items-center gap-2">
                        <p class="text-base sm:text-xl font-bold text-green-700">
                            ₹{{ shoe.price }}
                        </p>

                        <p class="text-xs sm:text-lg text-gray-500 line-through">
                            {{ shoe.original }}
                        </p>

                        <p class="text-xs sm:text-lg text-black">
                            {{ shoe.discount }}
                        </p>
                    </div>

                    <!-- Buttons -->
                    <div class="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4">
                        <button @click="addcart(shoe)" class="w-full sm:w-1/2 py-2 bg-red-500 text-white rounded-lg">
                            Add to Cart
                        </button>

                        <button class="w-full sm:w-1/2 py-2 bg-yellow-500 text-black rounded-lg">
                            Buy Now
                        </button>
                    </div>
                </div>

            </div>
        </div>

        <!-- Toast -->
        <div v-if="showToast" class="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">
            Addcart Successful
        </div>
    </div>

    <!-- Footer -->
    <footer class="mt-10 bg-gray-900 text-white py-6 sm:py-8">
        <div class="w-[90%] sm:w-[80%] m-auto text-center space-y-3">
            <h2 class="text-lg sm:text-xl font-semibold">About Mobile Shop</h2>
            <p class="text-xs sm:text-sm text-gray-300">
                This website helps you explore latest smartphones with best deals.
            </p>
            <p class="text-xs sm:text-sm text-gray-400">
                Made by ❤️ Prince Sahani
            </p>
        </div>
    </footer>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Toast
const showToast = ref(false)

// Product Data
const Shoes = ref([
    {
        name: "OnePlus Nord 5 (256 GB, 8 GB RAM)",
        price: "32,700",
        original: "₹45,999",
        discount: "41% off",
        liked: false,
        img: "https://i.pinimg.com/1200x/0e/71/7d/0e717df5f4110925518a3eff916695d0.jpg"
    },
    {
        name: "Red Magic 9 Pro 5G Gaming Phone",
        price: "1,09,999",
        original: "₹1,34,999",
        discount: "41% off",
        liked: false,
        img: "https://i.pinimg.com/736x/11/39/21/113921b5d433d5e513f369f1d47db815.jpg"
    },
    {
        name: "vivo X200T (256 GB)",
        price: "59,999",
        original: "₹79,999",
        discount: "25% off",
        liked: false,
        img: "https://i.pinimg.com/736x/c8/23/d5/c823d5e2147d3c1a7b4ebcf488ff9c1a.jpg"
    },
    {
        name: "Samsung Galaxy A17 5G",
        price: "18,498",
        original: "₹22,999",
        discount: "6% off",
        liked: false,
        img: "https://i.pinimg.com/736x/b7/7d/cc/b77dccdf33680f8bf561e58f90cb0eaf.jpg"
    },
    {
        name: "iQOO 15 5G (16GB RAM)",
        price: "77,999",
        original: "₹83,999",
        discount: "7% off",
        liked: false,
        img: "https://i.pinimg.com/736x/de/cd/01/decd0110ce2d8d27d1a0435361ca1bb7.jpg"
    },
    {
        name: "Apple iPhone 15 (128 GB)",
        price: "56,999",
        original: "₹59,999",
        discount: "5% off",
        liked: false,
        img: "https://i.pinimg.com/736x/8f/20/74/8f20743342bf40dc9b7b7cb076591d05.jpg"
    }
])

// ❤️ Like Function
const Like = (item) => {
    item.liked = !item.liked
    const likedItems = Shoes.value.filter(i => i.liked)
    localStorage.setItem("liked", JSON.stringify(likedItems))
}

// 🛒 Add to Cart
const addcart = (shoe) => {
    const cart = JSON.parse(localStorage.getItem("Shoes")) || []
    cart.push(shoe)
    localStorage.setItem("Shoes", JSON.stringify(cart))

    showToast.value = true
    setTimeout(() => showToast.value = false, 2000)
}

// 🔄 Load liked data
onMounted(() => {
    const data = JSON.parse(localStorage.getItem("liked"))
    if (data) {
        Shoes.value.forEach(shoe => {
            shoe.liked = data.some(d => d.name === shoe.name)
        })
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