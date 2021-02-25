<template>
	<div class="header">
        <a class="toggle" @click="setToggleMenu()" v-if="!hideToggle">
            <v-icon>{{icon}}</v-icon>
        </a>
        <h1 class="title">     
            <router-link class="link-title" to="/home">{{ title }}</router-link>
        </h1>
        <UserDropDown v-if="!hideUserDropdown" />
    </div>
</template>

<script>
import UserDropDown from './UserDropDown'
import { mapGetters, mapActions } from 'vuex';
export default {
	name: 'Header',
    components: {
        UserDropDown
    },
    data() {
        return {
            hideTeste: false
        }
    },
    props: {
        title: String,
        hideToggle: Boolean,
        hideUserDropdown: Boolean
    },
    computed: {
        icon() {
            return this.getToggleMenu ? 'mdi-menu-left' : 'mdi-menu-right'
        },
        ...mapGetters({
            getToggleMenu: 'Auth/getIsMenuVisible',
            user: 'Auth/getUser'
        })
    },
    methods: {
        ...mapActions({
			setToggleMenu: 'Auth/toggleMenu'
        })    
    }
}
</script>

<style>
    .header {
        grid-area: header;
        background: linear-gradient(to right, #fd8c8c, #F2A7A7);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .title .link-title{
        color: #fff;
    }
    .title{
        font-size: 1.2rem;
        color: #fff;
        font-weight: 100;
        flex-grow: 1;
        text-align: center;
    }
    .title a{
        color: #FFF;
        text-decoration: none;
    }
    .toggle{
        font-size: 1.2rem;
        color: #fff !important;
        font-weight: 100;
        justify-self: flex-start;
        text-decoration: none;
        width: 60px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .toggle:hover{
        background-color: rgba(0, 0, 0, 0.2);
    }


</style>