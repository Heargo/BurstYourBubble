<template>
    <div>
        <div v-if="!loading && !error" class="feed">
            <LinkPreview v-for="article in feed.slice(0, n)" :key="article" :link="store.CORSFIX+article" :topic="topics[0]"></LinkPreview>
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
        topics: {
            type: Object,
            required: true
        },
        n:{
            type: Number,
            required: false,
            default: -1
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
            size: 0,
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
            var rssLink = this.store.getTopic(this.topics[0]);
            axios.get(rssLink,{
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
            //set n if not -1
            if(this.n == -1){
                this.size = this.feed.length;
            }else{
                this.size = this.n;
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