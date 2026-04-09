<template>
  <nav class="bg-[#0f172a] text-white px-6 py-3">

    <div class="flex items-center justify-between max-w-7xl mx-auto">

      <div class="flex items-center gap-2">
        <img src="../assets/cart.jpg" class="w-9 h-9 object-cover rounded-full" />
        <h1 class="text-xl sm:text-2xl font-semibold tracking-wide">.com</h1>
      </div>

      <div class="hidden md:flex items-center gap-8 text-lg">

        <router-link to="/Home"
          class="flex items-center gap-1 hover:text-gray-300 transition hover:underline underline-offset-4 decoration-2">
          <p>Home</p>
        </router-link>

        <router-link to="/Favorites" class="flex items-center gap-1 hover:text-gray-300 transition">
          <i class="fa-solid fa-heart text-sm"></i>
          <p class="hover:underline underline-offset-4 decoration-2">Favorites</p>
        </router-link>

        <router-link to="/Order" class="flex items-center gap-1 hover:text-gray-300 transition">
          <i class="fa-solid fa-bag-shopping text-sm"></i>
          <p class="hover:underline underline-offset-4 decoration-2">Order</p>
        </router-link>

        <router-link to="/Account" class="flex items-center gap-1 hover:text-gray-300 transition ">
          <i class="fa-solid fa-user text-sm"></i>
          <p class="hover:underline underline-offset-4 decoration-2">Account</p>
        </router-link>

      </div>

      <button @click="toggleMenu" class="md:hidden text-2xl">
        ☰
      </button>

    </div>

    <div v-if="isOpen" class="md:hidden mt-3 bg-[#1e293b] rounded-lg p-4 flex flex-col gap-4 text-center">

      <router-link @click="toggleMenu" to="/"
        class="hover:text-gray-300 hover:underline underline-offset-4 decoration-2">Home</router-link>

      <router-link @click="toggleMenu" to="/Favorites"
        class="hover:text-gray-300 hover:underline underline-offset-4 decoration-2">
        Favorites
      </router-link>

      <router-link @click="toggleMenu" to="/Order"
        class="hover:text-gray-300 hover:underline underline-offset-4 decoration-2">
        Order
      </router-link>

      <router-link @click="toggleMenu" to="/Account"
        class="hover:text-gray-300 hover:underline underline-offset-4 decoration-2">
        Account
      </router-link>

    </div>

  </nav>

  <router-view></router-view>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false
    }
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen
    }
  }
}
</script>