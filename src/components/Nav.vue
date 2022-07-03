<template>
    <div class="navContainer" v-if="store.userIsSetup">
        <router-link class="navItem" to="feed">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><title>Newspaper</title><path d="M368 415.86V72a24.07 24.07 0 00-24-24H72a24.07 24.07 0 00-24 24v352a40.12 40.12 0 0040 40h328" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32"/><path d="M416 464h0a48 48 0 01-48-48V128h72a24 24 0 0124 24v264a48 48 0 01-48 48z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M240 128h64M240 192h64M112 256h192M112 320h192M112 384h192"/><path d="M176 208h-64a16 16 0 01-16-16v-64a16 16 0 0116-16h64a16 16 0 0116 16v64a16 16 0 01-16 16z"/></svg>
            </div>
        </router-link>
        <router-link class="navItem" to="profile">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><title>Person</title><path d="M344 144c-3.92 52.87-44 96-88 96s-84.15-43.12-88-96c-4-55 35-96 88-96s92 42 88 96z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><path d="M256 304c-87 0-175.3 48-191.64 138.6C62.39 453.52 68.57 464 80 464h352c11.44 0 17.62-10.48 15.65-21.4C431.3 352 343 304 256 304z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/></svg>
            </div>
        </router-link>
        <router-link class="navItem" to="/interests">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><title>Settings</title><path d="M262.29 192.31a64 64 0 1057.4 57.4 64.13 64.13 0 00-57.4-57.4zM416.39 256a154.34 154.34 0 01-1.53 20.79l45.21 35.46a10.81 10.81 0 012.45 13.75l-42.77 74a10.81 10.81 0 01-13.14 4.59l-44.9-18.08a16.11 16.11 0 00-15.17 1.75A164.48 164.48 0 01325 400.8a15.94 15.94 0 00-8.82 12.14l-6.73 47.89a11.08 11.08 0 01-10.68 9.17h-85.54a11.11 11.11 0 01-10.69-8.87l-6.72-47.82a16.07 16.07 0 00-9-12.22 155.3 155.3 0 01-21.46-12.57 16 16 0 00-15.11-1.71l-44.89 18.07a10.81 10.81 0 01-13.14-4.58l-42.77-74a10.8 10.8 0 012.45-13.75l38.21-30a16.05 16.05 0 006-14.08c-.36-4.17-.58-8.33-.58-12.5s.21-8.27.58-12.35a16 16 0 00-6.07-13.94l-38.19-30A10.81 10.81 0 0149.48 186l42.77-74a10.81 10.81 0 0113.14-4.59l44.9 18.08a16.11 16.11 0 0015.17-1.75A164.48 164.48 0 01187 111.2a15.94 15.94 0 008.82-12.14l6.73-47.89A11.08 11.08 0 01213.23 42h85.54a11.11 11.11 0 0110.69 8.87l6.72 47.82a16.07 16.07 0 009 12.22 155.3 155.3 0 0121.46 12.57 16 16 0 0015.11 1.71l44.89-18.07a10.81 10.81 0 0113.14 4.58l42.77 74a10.8 10.8 0 01-2.45 13.75l-38.21 30a16.05 16.05 0 00-6.05 14.08c.33 4.14.55 8.3.55 12.47z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/></svg>
            </div>
        </router-link>
    </div>
</template>
<script>
import { useStore } from '@/stores/store'  
export default {
    name: 'Nav',
    setup() {
        const store = useStore()
        return {
        store,
        }
    },
}
</script>
<style lang="scss" scoped>
    $size: 32px;
    .navContainer{
        position: fixed;
        top:calc(50% - $size * 3);
        right: 2rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        box-shadow: 2px 5px 10px rgba(0,0,0,0.5);
        border-radius: 20px;
        margin:1rem 0;
        width: fit-content;
        background-color: $color_bg;
        @include width-under(1050px){
            flex-direction: row;
            left:calc(50% - $size * 3);
            bottom: 0rem;
            top:initial;
            z-index: 3;
            height: fit-content;
        }
        .navItem{
            border-radius:20px;
            margin:0.2rem 0.5rem;
            padding: 0.5rem;
            div{
                display: flex;
                align-items: center;
                justify-content: center;
                svg{
                    width: $size;
                    height: $size;
                    fill:$color_txt;
                    *{
                        stroke: $color_txt;
                    }
                }
            }
            &.router-link-active{
                    background: #BE09DA;
                    background: -webkit-radial-gradient(top right, #BE09DA, $color_callToAction);
                    background: -moz-radial-gradient(top right, #BE09DA, $color_callToAction);
                    background: radial-gradient(to bottom left, #BE09DA, $color_callToAction);
                svg{
                    fill:$color_bg;
                    *{
                        stroke: $color_bg;

                    }
                }
            }
        }
    }
</style>