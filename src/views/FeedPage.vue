<template>
  <div class="top">
    <h1>Rester <span>curieux</span>...</h1>
    <Feed class="feedContainer"></Feed>
  </div>
</template>

<script>
// @ is an alias to /src
import Feed from '@/components/Feed.vue'
import { useStore } from '@/stores/store'

export default {
  name: 'FeedPage',
  components: {
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
      position: relative;
      // color: $white;

      &::after{
        content: "";
        position: absolute;
        bottom: 0.5rem;
        left: 0;
        width: 100%;
        height: 1rem;
        background-color: $color_callToAction2;
        z-index: -1;
      }
      // img{
      //   position: absolute;
      //   top:-240px;
      //   right:-225px;
      //   transform: scale(0.12);
      // }
    }
  }
  .feedContainer{
    margin-top: 4rem;
  }

  
</style>
