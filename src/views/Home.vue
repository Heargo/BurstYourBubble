<template>
  <div class="home">
    <div class="bubbleRelative">
      <h1>Éclate ta bulle !</h1>
      <button @click="redirect('interests')" class="bubble">ICI</button>
    </div>
    <div class="argument">
      <img src="@/assets/svg/undraw_launching_re_tomg.svg" alt="explore">
      <div>
          <h2>Un algorithme qui vous montre <span>ce que vous n'aimez pas</span></h2>
          <p>Les algorithmes vous proposent du contenu sans cesse toujours adapté à vous goûts.
            De ce fait, vous restez dans votre bulle d'idée et de convictions.
            Éclate ta bulle a pour objectif de vous proposer du contenu en <strong>excluant</strong> ce que vous aimez afin de vous aider à rester curieux.
          </p>
      </div>
    </div>
    <div class="warning" v-if="showWarning">
      <p>Les articles présents sur ce site ne proviennent pas de sources suffisamment variées pour être réellement utilisé. De plus, la qualité des articles n'est pas vérifiée. Pour participer et proposer des nouvelles sources rendez-vous <a href="">sur le github</a></p>
      <img src="@/assets/svg/close-outline.svg" alt="close" @click="showWarning=false">
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import LinkPreview from '@/components/LinkPreview.vue'
import { useStore } from '@/stores/store'

export default {
  name: 'Home',
  data() {
    return {
      link:"",
      showWarning: true,
    }
  },
  setup() {
    const store = useStore()
    return {
      store,
    }
  },
  methods: {
    redirect(route){
      //if there is no interests saved in store, redirect to interests page
      if(this.store.getSavedTopics().length==0){
        this.$router.push(route)
      }
      //else redirect to feed page since user already started the app
      else{
        this.$router.push('feed')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .home{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    min-height: 100vh;
    background-color: #f5f5f5;

    @include width-under(1000px){
         $size:50px;
         $top:150px;
         $right:calc(50% - $size/2);
         justify-content: center;
    }
  }
  h1{
    font-size: 5rem;
    @include width-under(1000px){
      font-size: 3rem;
    }
  }
  .warning{
    position:absolute;
    top:0;
    left:0;
    width:100%;
    background-color:$red;
    font-weight: bold;
    
    a{
      color:$white;
      text-decoration:underline;
    }

      img{
        $size_img:30px;
        width:$size_img;
        height:$size_img;
        cursor: pointer;
      }
  }
  .argument{
    width: 100vw;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-around;
    flex-wrap: wrap-reverse;
    div{
      width: 40%;
      @include width-under(1000px){
        width: 90%;
      }
      h2{
          text-align: left;
          font-size: 2.5rem;
          span{
            color:$color_callToAction;
          }
          @include width-under(1000px){
            font-size: 1.5rem;
          }
      }
      p{
        font-size: 1.3rem;
        text-align: left;
        width: 80%;
        max-width: 600px;
        @include width-under(1000px){
          width: 90%;
          font-size: 1rem;
        }
      }
    }
    img{
      width: 55%;
      max-width: 600px;
      margin: 0;
    }
  }


  .bubbleRelative{
    position: relative;
    @include width-under(600px) {
      height: 40vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
    }
    .bubble{
      position: absolute;
      border-radius: 50%;
      text-decoration: none;
      font-size: 2rem;
      animation: bubble 10s linear infinite;
      background-color:$color_callToAction;
      color:$color_bg;
      outline:none;
      border:none;
      cursor: pointer;

      @include width-under(600px) {
        position: inherit;
        animation:none;
        border-radius: 50%;
        padding: 4vh;
        font-size: 1.3rem;
        
      }
      @include width-over(600px) {
          $size:80px;
          top:20px;
          right:-100px;
          width:$size;
          height: $size;
          line-height: $size;
          font-size: 1.8rem;
      }
      @include width-over(900px) {
          $size:100px;
          top:50px;
          right:-150px;
          width:$size;
          height: $size;
          line-height: $size;
          font-size: 2rem;
      }
      
    }
  }  

  @keyframes bubble{
    0%{
      transform: translateY(0);
    }
    50%{
      transform: translateY(20px);
    }
    100%{
      transform: translateY(0);
    }
  }
  
</style>
