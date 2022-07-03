<template>
    <div>
        <div v-if="!loading && !error && store.articleFetchedCounter>=store.articleToFetch" class="feed">
            <ArticlePreview v-for="article in store.feed" :key="article" :article="article"></ArticlePreview>
        </div>
        <div v-else-if="!error && store.articleFetchedCounter<store.articleToFetch">
            <div id="loader"></div>
        </div>
        <div v-else-if="error" class="center">
            <img src="@/assets/svg/undraw_warning_re_eoyh.svg" alt="">
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import ArticlePreview from './ArticlePreview.vue'
import { useStore } from '@/stores/store'
export default {
    name: "Feed",
    components: {
        ArticlePreview
    },
    setup() {
        const store = useStore()
        return {
        store,
        }
    },
    mounted(){
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
            this.store.feed=[]; 
            this.store.articleToFetch = 0;
            this.store.articleFetchedCounter = 0;
            var topicsRequests = [];
            var numArticlePerFlux = 2;

            //get all topics urls
            var topics= this.store.getTopicUnsaved();
            for(var i = 0; i < topics.length; i++){
                this.store.RSSDATABASE[topics[i]].forEach(url => {
                    topicsRequests.push({request:axios.get(this.store.CORSFIX+url),topic:topics[i],url:url});
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
            for(var i = 0; i < num; i++){
                //get link to the article
                let link = items[i].querySelector('link').textContent;
                if(!link){link = items[i].querySelector('guid').textContent} //sometimes the link is not in the link tag, but in the guid tag
                
                //fetch data from the article then add it to the feed
                axios.get(this.store.CORSFIX+link,{
                    headers: {
                    'Content-Type': 'application/json'
                }})
                .then(response => {
                    var data = response.data;
                    var article = this.parseOgData(data,topic,link);
                    //add to feed
                    this.store.feed.push(article);
                    this.store.articleFetchedCounter++;
                    //attempt to sort the feed
                    this.store.sortArticles();

                })
                .catch(error => {
                    console.log(error);
                    this.store.articleFetchedCounter++;
                    //attempt to sort the feed
                    this.store.sortArticles();
                });
                
            }
        },
        /**
         * Parse data from the article and add it to the article object
         * @param {*} data data from the article
         * @param {*} article article object
         */
        parseOgData(data,topic,link){
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

            //score article base on user's preferences
            article.score = this.store.scoreArticle(article);
            
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
    .center{
        img{
            width: 80%;
            max-width: 600px;
            transform: translateY(20vh);
        }
    }

    /**===== nest5 =====*/
    $borderSize:4px;
    $borderRadius:100px;
    #loader {
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        height: 100px;
        width: 100px;
        margin: -25px 0 0 -25px;
        border: $borderSize solid transparent;
        border-top-color: $color_callToAction;
        border-radius: $borderRadius;
        -webkit-animation: spin11 2s linear infinite;
                animation: spin11 2s linear infinite;
    }

    #loader:before {
        content: "";
        position: absolute;
        top: 7px;
        right: 7px;
        bottom: 7px;
        left: 7px;
        border: $borderSize solid transparent;
        border-radius: $borderRadius;
        border-top-color: $color_txt2;
        -webkit-animation: spin11 3s linear infinite;
                animation: spin11 3s linear infinite;
    }

    #loader:after {
        content: "";
        position: absolute;
        top: 15px;
        right: 15px;
        bottom: 15px;
        left: 15px;
        border: $borderSize solid transparent;
        border-radius: $borderRadius;
        border-top-color: $color_txt;
        -webkit-animation: spin11 1.5s linear infinite;
                animation: spin11 1.5s linear infinite;
    }

    @-webkit-keyframes spin11 {
        from {
        -webkit-transform: rotate(0deg);
                transform: rotate(0deg);
        }
        to {
        -webkit-transform: rotate(359deg);
                transform: rotate(359deg);
        }
    }
    @keyframes spin11 {
        from {
        -webkit-transform: rotate(0deg);
                transform: rotate(0deg);
        -webkit-transform: rotate(0deg);
                transform: rotate(0deg);
        }
        to {
        -webkit-transform: rotate(359deg);
                transform: rotate(359deg);
        -webkit-transform: rotate(359deg);
                transform: rotate(359deg);
        }
    }
    /** END of nest5*/
</style>