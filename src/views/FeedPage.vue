<template>
  <div class="top">
    <h1>Ma <span>bulle<img class="cross" src="@/assets/svg/cross.svg" alt=""></span></h1>
    <Feed class="feedContainer" :topics="store.getTopicUnsaved()"></Feed>
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
  h1{
    position:fixed;
    top:0;
    z-index: 3;
    background-color: $color_bg;
    width:100%;
    margin:0;
    padding-top: 1.5rem;
    padding-bottom: 0.5rem;
    span{
      position:relative;
      img{
        position: absolute;
        top:-240px;
        right:-225px;
        transform: scale(0.12);
      }
    }
  }
  .feedContainer{
    margin-top: 4rem;
  }
</style>
