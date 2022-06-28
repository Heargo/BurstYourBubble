<template>
    <div class="container">
        <div v-if="success && !error" class="card">
            <div>
                <h1>{{title}}</h1>
                <img :src="image" alt="preview">
            </div>
            <!-- <p>{{description}}</p> -->
            <p>{{source}}</p>

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
        h1{
            font-size: 1.3rem;
            text-align: left;
            //font-weight: normal;
        }
        div{
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center; 
        }
        img{
            width:200px;
            height:100px;
            object-fit: cover;
        }
        p{
            font-family: 'Montserrat', sans-serif;
        }
    }
    
</style>