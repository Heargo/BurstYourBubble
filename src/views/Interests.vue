<template>
    <div class="container">
        <h1>Choisissez vos centre d'intêrets</h1>
        <img class="interestsImg" src="@/assets/svg/undraw_exciting_news_re_y1iw.svg" alt="interests">
        <div class="interests">
            <p v-for="i in store.getTopics()" :key="i" :class="{selected:store.isTopicSaved(i),noselect:true}" @click="store.toggleTopic(i)">{{i}}</p>
        </div>
        <button @click="deleteSelected" v-if="store.SavedTopics.length>0">J'ai terminé</button>
    </div>
</template>
<script>
import { useStore } from '@/stores/store'

export default {
    name:'interests',
    setup() {
        const store = useStore()
        return {
        store,
        }
    },
    methods: {
        deleteSelected(){
            //prevent empty favorites
            var selections = document.querySelectorAll('.selected');
            if(selections.length ==0){ return;}

            //get all dom element with class selected
            selections.forEach(function(e){
                e.classList.add('deleteAnimation')
                //wait 0.8s before deleting the element
                setTimeout(function(){
                    e.remove();
                },800)
            })
            //wait 2s before redirecting to the home page
            var router =this.$router;
            var st = this.store;
            setTimeout(function(){
                st.setUserSetup(true);
                router.push('/feed');
            },2000)
        }
    }
}
</script>
<style lang="scss" scoped>
    .container{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .interestsImg{
        height: 30vh;
        width: auto;
        @include width-under(600px){
            margin-bottom: 1rem;
        }   
    }
    .interests{
        display: flex;
        align-items: center;
        align-content: center;
        justify-content: center;
        flex-wrap: wrap;
        min-height: 20vh;
        width: 100%;
        max-width: 800px;
        
        p{
            text-align: center;
            vertical-align: middle;
            width: fit-content;
            font-size: 1.3rem;
            border: 2px solid $color_txt;
            border-radius: 10px;
            padding: 0.3rem;
            margin:0.2rem 0.5rem;
            cursor: pointer;
            &.selected{
                border-color: $red;
                background-color:$red;
                color:$color_bg;
            }
            &.deleteAnimation{
                animation: fadeOut 0.8s ease-in-out;
            }
        }
    }
    button{
        border: none;
        border-radius: 15px;
        outline:none;
        font-size: 1.4rem;
        padding: 0.3rem 0.8rem;
        background-color:$color_callToAction;
        color:$color_bg;
        margin-top: 2rem;
        cursor: pointer;
    }
    //destroy keyframe animation
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }


</style>