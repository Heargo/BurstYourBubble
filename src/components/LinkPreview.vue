<template>
    <div>
        <div v-if="success && !error">
            <h1>{{title}}</h1>
            <p>{{description}}</p>
            <img :src="image" alt="">
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
export default {
    name:"LinkPreview",
    props: {
        link: {
            type: String,
            required: true
        }
    },
    data(){
        return {
            title: "Titre",
            description: "description",
            image: "",
            url: "",
            loading: false,
            error: false,
            errorMessage: "",
            success: false,
        }
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
                console.log(response.data);
                this.parseLinkPreviewData(response.data);
                this.loading = false;
                this.success = true;
                console.log("done");
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
            console.log(doc);
            //get og: properties
            let metas = doc.querySelectorAll('meta');
            metas.forEach(meta => {
                console.log(meta.getAttribute('property'));
                if(meta.getAttribute('property') == "og:title"){
                    this.title = meta.getAttribute('content');
                }
                if(meta.getAttribute('property') == "og:description"){
                    this.description = meta.getAttribute('content');
                }
                if(meta.getAttribute('property') == "og:image"){
                    this.image = meta.getAttribute('content');
                }
            });
            
        }
    }
}
</script>
<style lang="scss">
    
</style>