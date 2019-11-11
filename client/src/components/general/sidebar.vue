<template>
    <div class="side">
            <b-menu>
        <b-menu-list label="Menu">
            <b-menu-item icon="information-outline" label="Info"></b-menu-item>
            <b-menu-item
                icon="settings"
                :active="isActive"
                :expanded="isActive"
                @click="isActive = !isActive">
                <template slot="label" slot-scope="props">
                    Administrator
                    <b-icon
                        class="is-pulled-right"
                        :icon="props.expanded ? 'menu-down' : 'menu-up'">
                    </b-icon>
                </template>
                <b-menu-item icon="account" label="Users"></b-menu-item>
                <b-menu-item icon="cellphone-link">
                </b-menu-item>
                <b-menu-item icon="cash-multiple" label="Payments" disabled></b-menu-item>
            </b-menu-item>
            <b-menu-item icon="account" label="My Account">
                <b-menu-item label="Account data"></b-menu-item>
                <b-menu-item label="Addresses"></b-menu-item>
            </b-menu-item>
        </b-menu-list>
        <b-menu-list>
            <b-menu-item
                label="Expo"
                icon="link"
                tag="router-link"
                target="_blank"
                to="/expo">
            </b-menu-item>
        </b-menu-list>
        <b-menu-list label="Actions">
            <b-menu-item label="Logout"></b-menu-item>
        </b-menu-list>
    </b-menu>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isActive: true
            }
        }
    }
</script>

<style scoped>
    .side {
        width: 300px;
        height: 100%;;
    }
</style>>

