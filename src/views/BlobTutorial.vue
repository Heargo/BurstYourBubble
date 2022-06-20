<template>
    <div>
        <div class="informations">
            <article>
                <h2>Default Blob</h2>
                <p>The default blob only requires 1 parameter, the name of the svg blob you want to show. The file must be in this path :</p>
                <code class="prettyprint"> src/assets/svg/YOURFILE </code> 
                <p>The code should look like that :</p>
                <code class="prettyprint">&lt;Blob src="blob.svg"/&gt;</code>
                <p>Congrats ! you just made your first blob. This is as simple as that.</p>
            </article>
            <p>But now I guess you wanna place it somewhere usefull and change the size to make your background look nicer right ?</p>
            <article>
                <h2>Size and placement</h2>
                <p>To affect the size and the placement <b>of the blob</b> you can add the following attributes :</p>
                <code class="prettyprint">
                    &lt;Blob
                        src="blob.svg"
                        width="500px" height="500px" right="0" bottom="0"   
                        /&gt;
                </code>
                <Blob
                src="blob.svg"
                width="500px" height="500px" right="0" bottom="0"   
                />
                <p>Yes, it's the blob on the right.</p>
            </article>
            <article>
                <h2>Different positions</h2> 
                <p>You may have noticited it but the whole component is in absolute position by default. to change that you want to add a position attribute.
                Let's make the position in "auto" and change the size of the container. Let's also add the Cborder attribute to help us visualize the container</p>
                <code class="prettyprint">
                    &lt;Blob
                        position="auto" src="blob.svg"
                        Cwidth="100px" Cheight="100px"
                        width="100px" height="100px" 
                        Cborder="1px"  
                        /&gt;
                </code>
                <Blob
                position="auto" src="blob.svg"
                Cwidth="100px" Cheight="100px"
                width="100px" height="100px"
                Cborder="1px"
                />
                <p>The container is an important concept to understand, the blob will not be visible outside of the container. This is interesting if you want to place the blob more precisely.
                    If we change the size of the blob and keep the same size for the container, it will look like that :</p>
                <code class="prettyprint">
                    &lt;Blob
                        position="auto" src="blob.svg"
                        Cwidth="100px" Cheight="100px"
                        width="200px" height="100px"
                        Cborder="1px" 
                        /&gt;
                </code>
                <Blob
                position="auto" src="blob.svg"
                Cwidth="100px" Cheight="100px"
                width="200px" height="100px"
                Cborder="1px"
                />
                <p>Note that to stretch your svg without preserving the ratio you need to add <code>preserveAspectRatio="none"</code> in your svg file.</p>

                <Blob
                position="fixed" src="blob.svg"
                />
                <p>finally, if you want a blob that stay fixed in the background when you scroll (like in the top left corner) just use "fixed" in position.</p>
                <code class="prettyprint">
                    &lt;Blob
                        position="fixed" src="blob.svg"
                        /&gt;
                </code>
            </article>
            <article>
                <h2>Z index</h2>
                <p>You can adjust the z-index with the zindex attribute. by default the z-index is -1</p>
                <code class="prettyprint">
                    &lt;Blob
                        src="blob.svg"
                        zindex="-1"   
                        /&gt;
                </code>
                <Blob
                src="blob.svg"
                width="500px" height="500px" right="0" bottom="0"   
                />
            </article>
        </div>
    </div>

</template>

<script>
import Blob from '@/components/Blob.vue'
export default {
    components:{
        Blob
    },
    mounted() {
        let externalScript = document.createElement('script')
        externalScript.setAttribute('src', 'https://cdn.jsdelivr.net/gh/google/code-prettify@master/loader/run_prettify.js')
        document.head.appendChild(externalScript)
  },
}
</script>
<style lang="scss">
.informations{
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin-bottom: 50px;
    article{
        text-align: left;
        width:50%;
        p{
            width: 100%;
            font-style: normal;
        }
        
    }
    p{
        text-align: left;
        width:50%;
        font-style: italic;
    }
    
}
    
</style>