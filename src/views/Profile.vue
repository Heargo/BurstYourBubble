<template>
    <div class="container">
        <div class="left">
            <div class="profilCustom">
                <img :src="getImageUrl(pp)" alt="" @click="isModalVisible=!isModalVisible">
                <input type="text" v-model="username" placeholder="Username">
                <Modal v-show="isModalVisible" @close="closeModal" @select="selectImg"/>
            </div>
            <div class="myBubble">
                <div class="topics">
                    <h2>Mes nouveaux interêts</h2>
                    <div class="list">
                        <p class="topic" v-for="topic in store.getUserNewInterestsTopics()" :key="topic" >{{topic}}</p>
                    </div>

                </div>
                <div class="keywords">
                    <h2>Ce qui attire le plus mon attention</h2>
                    <div class="list">
                        <p class="keyword" v-for="topic in store.getUserNewInterestsKeywords()" :key="topic" >{{topic}}</p>
                    </div>
                </div>
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
import Modal from '@/components/Modal.vue'
export default {
    name: 'Profile',
    components: {
        Feed,
        Modal
    },
    data() {
        return {
            username: this.store.userProfile.username,
            pp: this.store.userProfile.profilePicture,
            isModalVisible: false,
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
    },
    methods: {
        showModal() {
            this.isModalVisible = true;
        },
        closeModal() {
            this.isModalVisible = false;
        },
        selectImg(i){
            this.pp=i;
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
            overflow: hidden;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            height: 100%;
            width: 100%;
            // border:solid 2px red;
            .profilCustom{
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                height: 300px;
                width: 100%;
                // border:solid 2px green;
                img{
                    height: 300px;
                    object-fit: cover;
                    margin-right: 2rem;
                    cursor: pointer;
                    transition: all 0.1s ease;
                    &:hover{
                        transform: matrix(1.01, 0, 0, 1.01, 0, 0);
                    }
                }
                input{
                    border: none;
                    font-size: 7rem;
                    width: 50%;
                    color: $color_txt;
                    font-family: 'The Nautigal', cursive;
                    font-optical-sizing: auto;
                    font-style: normal;
                    font-stretch: normal;
                    line-height: initial;
                    font-weight: bold;
                }
                @include width-under(1600px){
                    input{
                        font-size: 5rem;
                    }
                    img{
                        height: 200px;
                    }
                }
                @include width-under(1150px){
                    input{
                        font-size: 4rem;
                    }
                    img{
                        height: 150px;
                    }
                }
            }
            .myBubble{
                overflow: auto;
                width: 100%;
                .list{
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: center;
                    flex-wrap: wrap;
                    p{
                        border:solid 2px $color_txt;
                        text-transform: capitalize;
                        font-weight: bold;
                        border-radius: 20px;
                        padding: 0.5rem;
                        margin: 0.5rem;
                    }
                }
                .topics,.keywords{
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    border:solid 4px $color_txt2;
                    border-radius: 20px;
                    margin:2rem 1rem;
                    padding:1.5rem;
                    h2{
                        position: absolute;
                        width: fit-content;
                        border-radius: 20px;
                        padding:0.5rem 1rem;
                        top:-2.3rem;
                        left:0;
                        font-size: 1.3rem;
                        color: $color_bg;
                        background-color: $color_txt2;
                    }
                }
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
            h2{
                font-size: 2.5rem;
                margin:0.5rem; 
            }
        }
        @include width-under(1050px){
            flex-direction: column;
            justify-content: flex-start;
            .left{
                overflow: initial;
                height: fit-content;
                .profilCustom{
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    img{
                        height: 150px;
                        margin:0;
                    }
                    input{
                        font-size: 4rem;
                        text-align: center;
                        width: 100%;
                    }
                }
                .myBubble{
                    overflow: initial;
                    .topics,.keywords{
                        padding:1rem 0;
                        h2{
                            font-size: 1rem;
                            text-align: start;
                            width: 80%;
                            top:-2rem;
                            @include width-under(360px){
                                font-size: 0.8rem;
                                top:-1.7rem;
                            }
                        }
                        p{
                            font-size: 0.8rem;
                            margin:0.1rem;
                        }
                    }
                }
            }
            .right{
                height: fit-content;
                overflow: initial;
                .feedContainer{
                    overflow: initial;
                    margin: 0 0.7rem;
                }
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
        width: 10px;
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