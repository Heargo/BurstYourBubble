<template>
  <div>
    <h1>SOCIETE</h1>
    <Feed :rssLink="store.CORSFIX+store.getTopic('Societe')"></Feed>
  </div>
</template>

<script>
// @ is an alias to /src
// import LinkPreview from '@/components/LinkPreview.vue'
import Feed from '@/components/Feed.vue'
import { useStore } from '@/stores/store'

export default {
  name: 'FeedPage',
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
      link:"",
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
