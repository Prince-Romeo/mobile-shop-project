<template>
    <div class="flex items-center justify-center h-screen bg-gray-100">
        <div class="text-center">
            <h1 class="text-6xl font-bold text-red-500">404</h1>
            <p class="text-xl mt-4">Page Not Found</p>
            <p class="text-gray-500 mt-2">
                The page you are looking for doesn't exist.
            </p>

            <router-link to="/Home"
                class="mt-6 inline-block px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                Go Home
            </router-link>
        </div>
    </div>
</template>