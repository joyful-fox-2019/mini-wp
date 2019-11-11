<template>
    <div class="root" style="margin: auto; width: 80%; height: 100%">
        <div class="header">
            <input type="text"  placeholder="Your title goes here">
        </div>
        <div class="editor">
            <wysiwyg class="texteditor"></wysiwyg>
        </div>
    </div> 
</template>

<script>
import wysiwyg from '../../vueWysiwyg'
export default {
      components: {
        wysiwyg: wysiwyg.component
    },
}
</script>

<style>
    input {
        height: 12vh;
        width: 70%;
        font-size: 2.4rem;
        text-align: center;
        border: none;
    }
    .header{
        width: 100%;
        display: flex;
        justify-content: center;
        margin-bottom: 5vh;
    }
    .texteditor{
        margin: 0px;
        width: 100%;
    }
    .root{
        width: 80%;
    }
</style>