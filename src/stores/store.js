import { defineStore } from 'pinia'

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useStore = defineStore('main', {
    state: () => {
        return {
            CORSFIX: '',//https://cors-anywhere.herokuapp.com/',
            RSSDATABASE:{
                "Politique": ["https://www.francetvinfo.fr/politique.rss"],
                "Economie": ["https://www.francetvinfo.fr/economie.rss"],
                "Culture": ["https://www.francetvinfo.fr/culture.rss"],
                "Societe": ["https://www.francetvinfo.fr/societe.rss"], 
                "Sport": [""],//? to find
                "Cinema": [""],//? to find
                "Lifestyle": [""],//? to find
                "Actualites": [""],//? to find
                "Evenements": [""],//? to find
                "International": [""],//? to find
                "Technologie": [""],//? to find
                "Religion": [""], //? to find

            },
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
        toggleTopic(topic)
        {   
            if(this.isTopicSaved(topic))
                this.SavedTopics.splice(this.SavedTopics.indexOf(topic),1);
            else
                this.SavedTopics.push(topic);

            //upadate local storage
            localStorage.setItem('SavedTopics', JSON.stringify(this.SavedTopics));
        }
      },
})