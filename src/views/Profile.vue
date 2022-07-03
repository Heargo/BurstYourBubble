<template>
    <div class="container">
        <div class="left">
            <div class="profilCustom">
                <img :src="getImageUrl(pp)" alt="">
                <input type="text" v-model="username" placeholder="Username">
            </div>
            <div class="myBubble">
                <h2>Ma bulle</h2>
                <p v-for="topic in store.getSavedTopics()" :key="topic" >{{topic}}</p>
            </div>
        </div>
        <div class="right">
            <h2>Je découvre...</h2>
            <Feed class="feedContainer" :numOfArticles="3"></Feed>
        </div>
    </div>
</template>
<script>
import { useStore } from '@/stores/store'
import Feed from '@/components/Feed.vue'
export default {
    name: 'Profile',
    components: {
        Feed
    },
    data() {
        return {
            username: this.store.userProfile.username,
            pp: this.store.userProfile.profilePicture,
        }
    },
    watch: {
        username: function(newValue) {
            console.log(newValue)
            this.store.updateProfileDecoration(newValue,null)
        },
        pp: function(newValue) {
            this.store.updateProfileDecoration(null,newValue)
        }
    },
    setup() {
        const store = useStore();
        const getImageUrl = (name) => {
            return new URL(`../assets/profile/${name}`, import.meta.url).href
        }
        return {
            store,
            getImageUrl,
        }
    }
}
</script>
<style lang="scss" scoped>
    .container{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        height: calc(100vh - 2px);
        .left{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100%;
            width: 100%;
            // border:solid 2px red;
            .profilCustom{
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                height: 50%;
                width: 100%;
                // border:solid 2px green;
                img{
                    width:100px;
                    height:100px;
                    border-radius:50%;
                    object-fit: cover;
                    margin-right: 2rem;
                }
                input{
                    border: none;
                    font-size: 1.5rem;
                    font-weight: bold;
                    color: $color_txt;
                }
            }
            .myBubble{
                height: 100%;
                width: 100%;
                // border:solid 2px blue;
            }

        }
        .right{
            overflow: hidden;
            height: 100%;
            width: 100%;
            .feedContainer{
                height: 100%;
                overflow: auto;            
            }
        }
    }
    /* ===== Scrollbar CSS ===== */
    /* Firefox */
    * {
        scrollbar-width: auto;
        scrollbar-color: $color_txt #ffffff;
    }

    /* Chrome, Edge, and Safari */
    *::-webkit-scrollbar {
        width: 16px;
    }

    *::-webkit-scrollbar-track {
        background: #ffffff;
    }

    *::-webkit-scrollbar-thumb {
        background-color: $color_txt;
        border-radius: 10px;
        border: 3px solid #ffffff;
    }
</style>