<template>
    <div>
        <div v-if="!loading && !error" class="feed">
            <LinkPreview v-for="link in feed" :key="link" :link="store.CORSFIX+link"></LinkPreview>
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
import LinkPreview from './LinkPreview.vue'
import { useStore } from '@/stores/store'
export default {
    name: "Feed",
    components: {
        LinkPreview
    },
    props: {
        rssLink: {
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
    mounted(){
        this.getFeed();
    },
    data(){
        return {
            feed: [],
            loading: false,
            error: false,
            errorMessage: "",
            success: false,
        }
    },
    methods: {
        getFeed(){
            this.loading = true;
            this.error = false;
            this.success = false;
            this.errorMessage = "";
            this.getFeedData();
        },
        getFeedData(){
            axios.get(this.rssLink,{
                headers: {
                'Content-Type': 'application/json'
            }})
            .then(response => {
                //console.log(response.data);
                this.parseFeedData(response.data);
                this.loading = false;
                this.success = true;
            })
            .catch(error => {
                this.error = true;
                this.errorMessage = error.message;
                this.loading = false;
            });
        },
        parseFeedData(data){
            // Use a DocumentFragment to store and then mass inject a list of DOM nodes
            let doc = new DOMParser().parseFromString(data, 'text/html');
            //get og: properties
            let items = doc.querySelectorAll('item');
            //loop through each item and get the link
            for(let i = 0; i < items.length; i++){
                //console.log(items[i]);
                let link = items[i].querySelector('link').textContent;
                if(!link){
                    link = items[i].querySelector('guid').textContent;
                }
                //add link in feed
                this.feed.push(link);
                //console.log("link: ",link);
            }
        },
    }
}
</script>
<style lang="scss" scoped>
    .feed{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
</style>