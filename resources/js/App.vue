<template>
    <div class="page">
        <nav class="navbar navbar-dark bg-dark">
            <div class="container">
                <router-link :to="{ name: 'Home' }" class="navbar-brand">LaraVue</router-link>
            </div>
        </nav>

        <div class="container py-4">
            <div class="row justify-content-center">
                <div class="col-md-8">
                    <router-view></router-view>
                </div>
           </div>
        </div>
    </div>
</template>