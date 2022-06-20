<template >
    <div :style="cssProps" class="blobContainer">
        <img :src="require(`@/assets/svg/${src}`)" alt="img">
    </div>
</template>
<script>
export default {
    name: 'Blob',
    props: {
        position:{
            type: String,
            default: 'absolute'
        },
        Cheight:{
            type: String,
            default: '100vh'
        },
        Cwidth:{
            type: String,
            default: '100vw'
        },
        height:{
            type: String,
            default: '300px'
        },
        width:{
            type: String,
            default: '300px'
        },
        top:{
            type: String,
            default: 'auto'
        },
        bottom:{
            type: String,
            default: 'auto'
        },
        left:{
            type: String,
            default: 'auto'
        },
        right:{
            type: String,
            default: 'auto'
        },
        zindex:{
            type: String,
            default: '-1'
        },
        src:{
            type: String,
            required: true,
        },
        Cborder:{
            type: String,
            default: '0'
        },
    },
    computed: {
        cssProps() {
            var blobPos;
            if(this.position=="auto"){
                blobPos="auto";
            }else{
                blobPos="absolute";
            }
        return {
            '--position': this.position,
            '--top': this.top,
            '--bottom': this.bottom,
            '--left': this.left,
            '--right': this.right,
            '--height':this.height,
            '--width':this.width,
            '--zindex':this.zindex,
            '--Cwidth':this.Cwidth,
            '--Cheight':this.Cheight,
            '--Cborder':this.Cborder,
            '--positionBlob':blobPos
        }
        }
    }
}
</script>
<style lang="scss">

    .blobContainer{
        position: var(--position);
        top: 0;
        right: 0;
        width: var(--Cwidth);
        height: var(--Cheight);
        overflow: hidden;
        z-index: var(--zindex);
        border: var(--Cborder) solid black;
        //background-color: aliceblue;
        img{
            position: var(--positionBlob);
            width:var(--width);
            height:var(--height);
            top: var(--top);
            bottom: var(--bottom);
            left: var(--left);
            right: var(--right);    
            
           
        }
    }
    
</style>