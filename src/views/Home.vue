<template>
  <div class="home">
    <!-- <LinkPreview link="https://www.ledauphine.com/science-et-technologie/2022/06/09/l-usmb-et-les-centres-culturels-des-savoie-renouvellent-leur-partenariat"></LinkPreview> -->
    <h1>FEED</h1>
    <Feed :rssLink="store.CORSFIX+store.getTopic('Societe')"></Feed>
  </div>
</template>

<script>
// @ is an alias to /src
// import LinkPreview from '@/components/LinkPreview.vue'
import Feed from '@/components/Feed.vue'
import { useStore } from '@/stores/store'

export default {
  name: 'Home',
  components: {
    // LinkPreview,
    Feed
  },
  setup() {
    const store = useStore()
    return {
      store,
    }
  },
  data() {
    return {
      link:""
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
