<template>
    <div>
        <div v-if="!loading && !error && store.articleFetchedCounter==store.articleToFetch" class="feed">
            <LinkPreview v-for="article in store.feed" :key="article" :article="article"></LinkPreview>
        </div>
        <div v-else-if="loading">
            <p>Loading... </p>
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
    created(){
        //get feed when component is created
        this.getFeed();
    },
    data(){
        return {
            loading: false,
            error: false,
            success: false,
        }
    },
    methods: {

        /**
         *Charge un feed adapté à l'utilisateur et l'enregistre dans la variable feed
         */
        getFeed(){
            
            //setup vars
            this.loading = true;
            this.error = false;
            this.success = false;
            var topicsRequests = [];
            var numArticlePerFlux = 2;

            //get all topics urls
            for(var i = 0; i < this.topics.length; i++){
                console.log("topic : "+this.topics[i]);
                this.store.RSSDATABASE[this.topics[i]].forEach(url => {
                    console.log("url : "+url);
                    topicsRequests.push({request:axios.get(this.store.CORSFIX+url),topic:this.topics[i],url:url});
                });
            }
            
            this.store.articleToFetch = topicsRequests.length * numArticlePerFlux;
            //get articles from all topics
            axios.all(topicsRequests.map(function(tr) {return tr.request;}),{
                headers: {
                'Content-Type': 'application/json',
                
            }})
            .then(axios.spread((...responses) => {
                //foreach rss flux, get articles
                for(var i = 0; i < responses.length; i++){
                    var response = responses[i];
                    var topic = topicsRequests[i].topic;
                    //add numArticlePerFlux articles per rss flux to feed
                    this.parseFeedData(response.data,numArticlePerFlux,topic);
                }

                // // this.store.addUncategorizedArticles(this.feed);
                // this.store.sortArticles();

                //loading finished and no error
                this.loading = false;
                this.success = true;
            }))
            //handle error
            .catch(error => {
                this.error = true;
                this.loading = false;
                console.log(error);
            });
        },
        /**
         * Transform RSS data into articles and push them into feed
         * @param {*} data data from rss feed
         * @param {int} num Number of article to add to the feed
         * @param {*} topic Topic of the rss flux
         */
        parseFeedData(data,num,topic){
            // Use a DocumentFragment to store and then mass inject a list of DOM nodes
            let doc = new DOMParser().parseFromString(data, 'text/xml');
            //get og: properties
            let items = doc.querySelectorAll('item');
            //loop through each item and get the link
            for(let i = 0; i < num; i++){
                //get link to the article
                let link = items[i].querySelector('link').textContent;
                if(!link){link = items[i].querySelector('guid').textContent} //sometimes the link is not in the link tag, but in the guid tag
                
                //init article
                var article = {
                    link: link,
                    topic: topic,
                    image:null,
                    title:null,
                    description:null,
                    source:null,
                    score: 0
                }

                //fetch data from the article then add it to the feed
                axios.get(this.store.CORSFIX+article.link,{
                    headers: {
                    'Content-Type': 'application/json'
                }})
                .then(response => {
                    var data = response.data;
                    article = this.parseOgData(data,article);
                    //add to feed
                    this.store.feed.push(article);
                    if(article.title!=this.store.feed[this.store.feed.length-1].title){
                        console.log("article added to feed",article.title);
                        console.log("in feed at postion : "+this.store.feed[this.store.feed.length-1].title);
                    }
                    console.log(this.store.feed[this.store.feed.length-1].title)
                    this.store.articleFetchedCounter++;
                    this.store.sortArticles();

                })
                .catch(error => {
                    console.log(error);
                    this.store.articleFetchedCounter++;
                    this.store.sortArticles();
                });
                
            }
        },
        /**
         * Parse data from the article and add it to the article object
         * @param {*} data data from the article
         * @param {*} article article object
         */
        parseOgData(data,article){
            // Use a DocumentFragment to store and then mass inject a list of DOM nodes
            let doc = new DOMParser().parseFromString(data, 'text/html');
            //get og: properties
            let metas = doc.querySelectorAll('meta');
            //loop through each meta and get the appropriate og: property
            metas.forEach(meta => {
                //title
                if(meta.getAttribute('property') == "og:title"){
                    article.title = meta.getAttribute('content');
                }
                //description
                if(meta.getAttribute('property') == "og:description"){
                    article.description = meta.getAttribute('content');
                }
                //image
                if(meta.getAttribute('property') == "og:image"){
                    article.image = meta.getAttribute('content');
                }
                //source
                if(meta.getAttribute('property') == "og:site_name"){
                    article.source = meta.getAttribute('content');
                }
            });
            //get url domain name
            let url = new URL(article.link);
            article.url = url.hostname;
            
            return article;
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