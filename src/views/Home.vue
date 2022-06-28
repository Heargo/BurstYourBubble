<template>
  <div class="home">
    <!-- <LinkPreview link="https://www.ledauphine.com/science-et-technologie/2022/06/09/l-usmb-et-les-centres-culturels-des-savoie-renouvellent-leur-partenariat"></LinkPreview> -->
    <h1>FEED</h1>
    <Feed :rssLink="this.$store.state.CORSFIX+'https://www.francetvinfo.fr/societe.rss'"></Feed>
  </div>
</template>

<script>
// @ is an alias to /src
// import LinkPreview from '@/components/LinkPreview.vue'
import Feed from '@/components/Feed.vue'
export default {
  name: 'Home',
  components: {
    // LinkPreview,
    Feed
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
