import { defineStore } from 'pinia'

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useStore = defineStore('main', {
    state: () => {
        return {
            // CORSFIX: 'https://cors-proxy-heargo.herokuapp.com/',
            CORSFIX: '',
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
        sortArticles(articles)
        {


            //delete articles with same link/name ?

            //shuffle articles
            for (let i = articles.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [articles[i], articles[j]] = [articles[j], articles[i]];
            }

            //sort by score
            articles = articles.sort((a,b) => {
                return new Date(b.score) - new Date(a.score);
            });
            return articles;

        }
      },
})