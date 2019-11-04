<template>
    <div class="tabs is-centered is-boxed">
        <ul>
            <li>
            <a>
                <span class="icon is-small"><i class="fas fa-upload"></i></span>
                <span>Published</span>
            </a>
            </li>
            <li class="is-active">
            <a>
                <span class="icon is-small"><i class="fas fa-drafting-compass"></i></span>
                <span>Drafts</span>
            </a>
            </li>
            <li>
            <a>
                <span class="icon is-small"><i class="fas fa-calendar-alt"></i></span>
                <span>Scheduled</span>
            </a>
            </li>
            <li>
            <a>
                <span class="icon is-small"><i class="fas fa-trash"></i></span>
                <span>Trash</span>
            </a>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name : 'ProjectContent'
}
</script>

<style>

</style>