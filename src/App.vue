<template>
<div>
  <router-view/>
  <Nav></Nav>
</div>
</template>


<script>
import Nav from '@/components/Nav.vue'
export default {
  name: 'Home',
  components: {
    Nav
  }
}
</script>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    padding-bottom: 90px ;
}
</style>
