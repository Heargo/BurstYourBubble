import { defineStore } from 'pinia'
//  include the Keyword Extractor
import keyword_extractor from 'keyword-extractor'
// import.meta.env.VITE_CORSFIX


// useStore could be anything like useUser, useCart 
// the first argument is a unique id of the store across your application
export const useStore = defineStore('main', {
    state: () => {
        return {
            CORSFIX: import.meta.env.VITE_CORSFIX,
            RSSDATABASE:{
                "Politique": ["https://www.francetvinfo.fr/politique.rss","https://www.europe1.fr/rss/politique.xml","https://www.01net.com/actualites/politique-droits/feed/"],
                "Economie": ["https://www.francetvinfo.fr/economie.rss","https://www.europe1.fr/rss/economie.xml"],
                "Culture": ["https://www.francetvinfo.fr/culture.rss","https://www.france24.com/fr/culture/rss","https://www.01net.com/actualites/culture-medias/feed/"],
                "Societe": ["https://www.francetvinfo.fr/societe.rss"], 
                "Sport": ["https://www.france24.com/fr/sports/rss","https://www.europe1.fr/rss/sport.xml","https://feeds.leparisien.fr/leparisien/rss/sports"],
                "Environnement": ["https://www.france24.com/fr/plan%C3%A8te/rss"],
                "Cinéma": ["https://www.francetvinfo.fr/culture/cinema.rss"],
                // "Lifestyle": [""],//? to find
                // "Actualites": [""],//? to find
                // "Evenements": [""],//? to find
                // "International": [""],//? to find
                "Technologie": ["https://www.01net.com/actualites/science-recherche/feed/"],
                "Science": ["https://www.francetvinfo.fr/sciences.rss"],
                // "Religion": [""], //? to find
                "Jeux vidéos": ["https://www.01net.com/actualites/produits/jeux-video-produits/feed/"],

            },
            RSSNOCATEGORIES:["https://api.blast-info.fr/rss_articles.xml"],
            //get SavedTopics from local storage
            SavedTopics: JSON.parse(localStorage.getItem('SavedTopics')) || [],
            feed: [],
            articleToFetch: 0,
            articleFetchedCounter:0,
            userProfile: JSON.parse(localStorage.getItem('userProfile')) || {topics:{},keywords:{},profilePicture:"chat.png",username:"Username"},
            userIsSetup: localStorage.getItem('userIsSetup') || false,
            profilesIgm:[
                "antilope.png","baleine.png","berger-allemand.png","chat.png","chauve-souris.png",
                "dragon.png","herisson.png","lelephant.png","perroquet.png","poulpe.png","rauque.png",
                "renard.png","renne.png","serpent.png","singe.png","souris.png","taureau.png","vache.png"
                ],
        }
      },
      actions: {
        getTopic(topic){
            return this.RSSDATABASE[topic];
        },
        getTopics(){
            return Object.keys(this.RSSDATABASE);
        },
        isTopicSaved(topic)
        {
            return this.SavedTopics.includes(topic);            
        },
        getSavedTopics(){
            return this.SavedTopics;
        },
        toggleTopic(topic)
        {   
            if(this.isTopicSaved(topic))
                this.SavedTopics.splice(this.SavedTopics.indexOf(topic),1);
            else
                this.SavedTopics.push(topic);

            //upadate local storage
            localStorage.setItem('SavedTopics', JSON.stringify(this.SavedTopics));
        },
        getTopicUnsaved()
        {
            return Object.keys(this.RSSDATABASE).filter(topic => !this.isTopicSaved(topic));
        },
        setUserSetup(bool)
        {
            this.userIsSetup = bool;
            localStorage.setItem('userIsSetup', bool);
            //save user profile
            localStorage.setItem('userProfile', JSON.stringify(this.userProfile));
        },
        sortArticles(numOfArticles)
        {
            if(this.articleFetchedCounter==this.articleToFetch)
            {

                //shuffle articles
                this.feed.sort((a, b) => 0.5 - Math.random());
                //sort by score
                this.feed.sort((a, b) => a.score - b.score);
                
                if (numOfArticles>0){
                    console.log("get first "+numOfArticles+" articles");
                    //get the first numOfArticles articles
                    this.feed = this.feed.slice(0,numOfArticles);
                }
            }

        },
        updateProfileDecoration(name,img)
        {
            if (img!=null){
                this.userProfile.profilePicture = img;
            }
            if(name!=null){
                this.userProfile.username = name;
            }
            localStorage.setItem('userProfile', JSON.stringify(this.userProfile));
        },
        /**
         * Called when user click on a article. Allow to precise user profile and calculate scores
         * @param {object} article 
         */
        updateProfile(article)
        {
            //increment score for the article topic
            if(this.userProfile.topics[article.topic]){

                console.log("increment score for the article topic");
                this.userProfile.topics[article.topic]++;
            }
            else{
                console.log("create new topic interest start");    
                this.userProfile.topics[article.topic] = 1;
            }
            //extract keywords from the article
            this.extractKeywordsAndUpdateScore(article.title);
            this.extractKeywordsAndUpdateScore(article.description);


            //update local storage
            var stringify = JSON.stringify(this.userProfile);
            localStorage.setItem('userProfile', stringify);
        },
        /**
         * Score the article based on user profile (topics and keywords)
         * @param {object} article 
         * @returns 
         */
        scoreArticle(article)
        {
            //topic score
            let score = 0;
            if(Object.keys(this.userProfile.topics).includes(article.topic))
                score += this.userProfile.topics[article.topic];
            //title score
            for(let word of article.title)
            {
                if(Object.keys(this.userProfile.keywords).includes(word))
                    score += this.userProfile.keywords[word];
            }
            //description score
            for(let word of article.description)
            {
                if(Object.keys(this.userProfile.keywords).includes(word))
                    score += this.userProfile.keywords[word]*0.5;
            }

            return score;
        },
        extractKeywordsAndUpdateScore(string)
        {
            var keywords = keyword_extractor.extract(string,{
                language:"french",
                remove_digits: true,
                return_changed_case:true,
                remove_duplicates: false
            });
            //remove  _, . , / , ( , ) , [ , ] , { , }, «, »
            keywords = keywords.map(keyword => keyword.replace(/[_.,\/()\[\]{}«»]/g, ""));
            //remove empty keywords
            keywords = keywords.filter(keyword => keyword.length>1);
            //increment score for each keyword if they exist in the user profile else create it
            keywords.forEach(keyword => {
                if(Object.keys(this.userProfile.keywords).includes(keyword)){
                    this.userProfile.keywords[keyword]++;
                }
                else{
                    this.userProfile.keywords[keyword] = 1;
                }
            });
        },
        getUserNewInterestsTopics(){
            var res = Object.keys(this.userProfile.topics).filter(topic => this.userProfile.topics[topic]>=1);
            //sort by score
            res.sort((a, b) => this.userProfile.topics[b] - this.userProfile.topics[a]);
            //get the first 10 topics
            return res.slice(0,10);

        },
        getUserNewInterestsKeywords(){
            var res =Object.keys(this.userProfile.keywords).filter(keyword => this.userProfile.keywords[keyword]>1);
            //sort by score
            res.sort((a, b) => this.userProfile.keywords[b] - this.userProfile.keywords[a]);
            //get the first 40 keywords
            return res.slice(0,40);
        }
      },
})