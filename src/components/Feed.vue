<template>
    <div>
        <div v-if="!loading && !error" class="feed">
            <LinkPreview v-for="article in feed.slice(0, n)" :key="article" :link="store.CORSFIX+article.link" :topic="article.topic"></LinkPreview>
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
            var topicsRequests = [];
            for(var i = 0; i < this.topics.length; i++){
                console.log("topic : "+this.topics[i]);
                topicsRequests.push(axios.get(this.store.CORSFIX+this.store.RSSDATABASE[this.topics[i]]));
            }
            axios.all(topicsRequests,{
                headers: {
                'Content-Type': 'application/json'
            }})
            .then(axios.spread((...responses) => {
                //console.log(response.data);
                for(var i = 0; i < responses.length; i++){
                    var response = responses[i];
                    this.parseFeedData(response.data,3,this.topics[i]);
                }
                this.loading = false;
                this.success = true;
            }))
            .catch(error => {
                this.error = true;
                this.errorMessage = error.message;
                this.loading = false;
            });
        },
        parseFeedData(data,num,topic){
            // Use a DocumentFragment to store and then mass inject a list of DOM nodes
            let doc = new DOMParser().parseFromString(data, 'text/html');
            //get og: properties
            let items = doc.querySelectorAll('item');
            //loop through each item and get the link
            for(let i = 0; i < num; i++){
                //link to the article
                let link = items[i].querySelector('link').textContent;
                if(!link){
                    link = items[i].querySelector('guid').textContent;
                }
                //add link anda its related topic in feed
                var article = {
                    link: link,
                    topic: topic
                }
                this.feed.push(article);
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