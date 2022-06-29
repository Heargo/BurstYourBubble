<template>
    <div class="container" >
        <div @click="openArticle(article.link)" class="card">
            <img :src="article.image" alt="preview">
            <div class="content">
                <div class="label">
                    <p class="topic">{{article.topic}}</p>
                    <p class="source">{{article.source}}</p>
                </div>
                <h3>{{article.title}}</h3>
            </div>

        </div>
    </div>
</template>
<script>
import { useStore } from '@/stores/store'
export default {
    name:"LinkPreview",
    props: {
        article: {
            type: Object,
            required: true
        },
    },
    setup() {
        const store = useStore()
        return {
        store,
        }
    },
    methods: {
        openArticle(link){
            this.store.updateProfile(this.article)
            window.open(link, '_blank');
        }
    }
}
</script>
<style lang="scss" scoped>
    .container{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .card{
        position:relative;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        max-width: 800px;
        height: auto;
        background-color:$color_bg;
        color:$color_txt;
        border-radius: 20px;
        margin:1rem 0;
        .content{
            position: absolute;
            z-index: 2;
            bottom: 0;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center; 
            width: 100%;
            background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 1) 100%);
            color:$white;
            border-radius: 20px;
            h3{
                width: calc(100% - 1.5rem);
                font-family: 'Poppins', sans-serif;
                font-size: 1.3rem;
                text-align: left;
                margin: 0.5rem 0.8rem;
            }
            .label{
                width: 100%;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                .source, .topic{
                    font-weight: bold;
                    margin:0;
                    padding: 0.1rem 0.3rem;   
                }
                .source{
                    background-color:$color_bg;
                    border-top-right-radius: 5px;
                    border-bottom-right-radius: 5px;
                }
                .topic{
                    color:$color_bg;
                    background-color:$color_callToAction;

                }
                
            }
        }
        img{
            width:100%;
            height:300px;
            object-fit: cover;
            border-radius: 20px;
        }
        p{
            font-family: 'Montserrat', sans-serif;
            color:$color_txt;
        }
    }
    
</style>