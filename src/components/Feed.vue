<template>
    <div>
        <div v-if="!loading && !error" class="feed">
            <LinkPreview v-for="article in feed" :key="article" :link="store.CORSFIX+article.link" :topic="article.topic"></LinkPreview>
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
            var topicsRequests = [];
            //get all topics urls
            for(var i = 0; i < this.topics.length; i++){
                console.log("topic : "+this.topics[i]);
                this.store.RSSDATABASE[this.topics[i]].forEach(url => {
                    console.log("url : "+url);
                    topicsRequests.push({request:axios.get(this.store.CORSFIX+url),topic:this.topics[i],url:url});
                });
            }        
            axios.all(topicsRequests.map(function(tr) {return tr.request;}),{
                headers: {
                'Content-Type': 'application/json'
            }})
            .then(axios.spread((...responses) => {
                for(var i = 0; i < responses.length; i++){
                    var response = responses[i];
                    var topic = topicsRequests[i].topic;
                    // console.log("Parsing for url: "+topicsRequests[i].url+" the topic is : "+topic);
                    this.parseFeedData(response.data,3,topic);
                }
                this.feed = this.store.sortArticles(this.feed);
                // console.log(this.feed)
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
            let doc = new DOMParser().parseFromString(data, 'text/xml');
            //get og: properties
            let items = doc.querySelectorAll('item');
            // console.log("there is "+items.length+" items in the feed");
            //loop through each item and get the link
            for(let i = 0; i < num; i++){
                // console.log("item : "+i);
                //link to the article
                let link = items[i].querySelector('link').textContent;
                if(!link){
                    link = items[i].querySelector('guid').textContent;
                }
                //add link anda its related topic in feed
                var article = {
                    link: link,
                    topic: topic,
                    score: 0
                }
                this.feed.push(article);
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