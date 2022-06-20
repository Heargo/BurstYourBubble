<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <input type="text" v-model="link">
    <LinkPreview :link="link"></LinkPreview>
  
  </div>
</template>

<script>
// @ is an alias to /src
import LinkPreview from '@/components/LinkPreview.vue'
export default {
  name: 'Home',
  components: {
    LinkPreview
  },
  data() {
    return {
      link:""
    }
  }
}
</script>
<style lang="scss">
</style>
