<template>
<div class="center">
  <div class="container">
    <h3>Personnalisez votre avatar</h3>
      <img src="@/assets/svg/cross.svg" alt="close" class="close" @click="close()">
      <div class="scroll">
        <div class="allpreview">
          <img
            v-for="img in store.profilesIgm" :key="img"
            :src="getImageUrl(img)"
            :alt="img"
            class="preview"
            @click="select(img)"
          >
        </div>
      </div>
  </div>
</div>
</template>
<script>
import { useStore } from '@/stores/store'
  export default {
    name: 'Modal',
    methods: {
      close() {
        this.$emit('close');
      },
      select(img) {
        this.$emit('select', img);
      },
    },
    data(){
        return{
            nbImage:42
        }
    },
    setup() {
      const store = useStore();
      const getImageUrl = (name) => {
        return new URL(`../assets/profile/${name}`, import.meta.url).href
      }
      return {
        store,
        getImageUrl,
      }
    }
  };
</script>
<style lang="scss" scoped>
.center{
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
}
  .container{
    text-align: center;
    position: relative;
    width: calc(100% - 2rem);
    max-width: 700px;
    background-color: $color_bg;
    border-radius: 20px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;  
    .close{
      position: absolute;
      top: 0px;
      right: 0px;
      width: 50px;
      cursor: pointer;
    }
    .scroll{
      overflow: auto;
      max-height: 70vh;
      .allpreview{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        .preview{
          width: 90px;
          margin: 1rem;
          cursor: pointer;
          @include width-under(800px){
            width: 70px;
        }
        }
      }
    }
  }
</style>