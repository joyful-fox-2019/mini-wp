<template>
    <b-field class="file">
        <b-upload v-model="file">
            <a class="button is-primary">
                <i class="fas fa-upload" style="margin-right:5px;"></i>
                <span>Upload Article Image</span>
            </a>
        </b-upload>
        <span class="file-name" v-if="file">
            {{ file.name }}
        </span>
    </b-field>
    
</template>

<script>
    export default {
        data() {
            return {
                file: null
            }
        }
    }
</script>
