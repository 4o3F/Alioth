<script setup>
import routes from "./router/routes.js";
</script>

<template>
  <div class="drawer drawer-mobile">
    <input id="drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col overflow-x-scroll">
      <!-- Navbar -->
      <div class="w-full navbar bg-base-100">
        <div class="flex-none lg:hidden">
          <label for="drawer" class="btn btn-square btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-6 h-6 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          </label>
        </div>
        <div class="flex-1 px-2 mx-2">Alioth</div>
        <div class="flex-none hidden lg:block">
          <ul class="menu menu-horizontal">
            <!-- Navbar menu content here -->
            <li><router-link to="/">主页</router-link></li>
          </ul>
        </div>
      </div>
      <!-- Page content here -->
      <router-view></router-view>
    </div>
    <div class="drawer-side">
      <label for="drawer" class="drawer-overlay"></label>
      <ul class="menu p-4 overflow-y-auto w-72 bg-base-100">
        <!-- Sidebar here -->
        <li v-for="route in routes">
          <router-link v-if="route.sidebar" :to="route.path">{{route.name}}</router-link>
        </li>
      </ul>

    </div>
  </div>
</template>
