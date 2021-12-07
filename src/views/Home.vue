<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <Auth/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Auth from '@/components/Auth.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld,
    Auth
  }
}
</script>
