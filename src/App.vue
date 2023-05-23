<script setup>
import { RouterView } from 'vue-router'
import Loading from './components/loading/Loading.vue'
</script>

<template>
  <component :is="$route.meta.layout || Loading" >
    <RouterView />
  </component>
</template>


