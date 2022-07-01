<template>
    <div class="container">
        <div class="left">
            <div class="profilCustom">
                <img src="https://images.unsplash.com/photo-1502307100811-6bdc0981a85b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=378&q=80" alt="">
                <input type="text" v-model="username">
            </div>
        </div>
        <div class="right">

        </div>
    </div>
</template>
<script>
import { useStore } from '@/stores/store'
export default {
    name: 'Profile',
    data()
    {

    },
    setup() {
        const store = useStore()
        return {
            store,
        }
    }
}
</script>
<style lang="scss" scoped>
    .container{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: calc(100vh - 2px);
        border:solid 1px red;
    }
</style>