<template>
    <div class="container">
        <div v-if="success && !error" class="card">
            <img :src="image" alt="preview">
            <div class="content">
                <div class="label">
                    <p class="topic">{{topic}}</p>
                    <p class="source">{{source}}</p>
                </div>
                <h3>{{title}}</h3>
            </div>

        </div>
        <div v-else-if="loading">
            <p>Loading...</p>
        </div>
        <div v-else-if="error">
            <p>erreur : {{error}}</p>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import { useStore } from '@/stores/store'
export default {
    name:"LinkPreview",
    props: {
        link: {
            type: String,
            required: true
        },
        topic: {
            type: String,
            required: true
        }
    },
    setup() {
        const store = useStore()
        return {
        store,
        }
    },
    data(){
        return {
            title: "Titre",
            description: "description",
            source:"internet",
            image: "",
            url: "",
            loading: false,
            error: false,
            errorMessage: "",
            success: false,
        }
    },
    mounted(){
       this.getLinkPreview(this.link)
    },
    watch: {
        link: function(newVal){
            this.getLinkPreview(newVal)
        }
    },
    methods: {
        getLinkPreview(){
            this.loading = true;
            this.error = false;
            this.success = false;
            this.errorMessage = "";
            this.getLinkPreviewData();
        },
        getLinkPreviewData(){
            axios.get(this.link,{
                headers: {
                'Content-Type': 'application/json'
            }})
            .then(response => {
                this.parseLinkPreviewData(response.data);
                this.loading = false;
                this.success = true;
            })
            .catch(error => {
                this.loading = false;
                this.error = true;
                this.errorMessage = error.response.data.message;
            });
        },
        parseLinkPreviewData(data){
            // Use a DocumentFragment to store and then mass inject a list of DOM nodes
            let doc = new DOMParser().parseFromString(data, 'text/html');
            //get og: properties
            let metas = doc.querySelectorAll('meta');
            metas.forEach(meta => {
                if(meta.getAttribute('property') == "og:title"){
                    this.title = meta.getAttribute('content');
                }
                if(meta.getAttribute('property') == "og:description"){
                    this.description = meta.getAttribute('content');
                }
                if(meta.getAttribute('property') == "og:image"){
                    this.image = meta.getAttribute('content');
                }
                //source
                if(meta.getAttribute('property') == "og:site_name"){
                    this.source = meta.getAttribute('content');
                }
            });
            //get url domain name
            let url = new URL(this.link);
            this.url = url.hostname;
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