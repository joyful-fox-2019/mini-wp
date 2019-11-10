<template>
    <aside class="column is-3 is-narrow-mobile is-fullheight section is-hidden-mobile" style="background-color:white;box-shadow: 4px 10px 25px -9px rgba(0,0,0,0.16)">
        <div class="sidebars" style="margin:20px;">

            <p class="menu-label is-hidden-touch">Navigation</p>
​                <ul class="menu-list">
    ​                <li>
    ​                     <b-field grouped style="display:flex;align-items:center">
    ​                        <b-input placeholder="Search..." style="width:60%"; ></b-input>
                            <p class="control">
    ​                            <button class="button is-primary">Search</button>
    ​                        </p>
    ​                    </b-field>
    ​                </li>
    ​                <li>
    ​                    <a href="#" class="" @click="isImageModalActive = true">
    ​                    <span class="icon"><i class="fas fa-plus-circle" ></i></span>   Add project
    ​                    </a>
    ​                </li>
    ​                <li>
    ​                    <a href="#" class="">
    ​                    <span class="icon"><i class="fa fa-table"></i></span>   Images
    ​                    </a>
    ​                </li>
    ​                <li>
    ​                    <a href="#" class="">
    ​                    <span class="icon"><i class="fa fa-info"></i></span>   About
    ​                    </a>
    ​                </li>
​                </ul>

    ​    </div>
​
    </aside>
</template>
<script>
    export default {
        data() {
            return {
                isImageModalActive: false,
                isCardModalActive: false
            }
        }
    }
</script>

<style>

li{
    height:50px;
}

</style>