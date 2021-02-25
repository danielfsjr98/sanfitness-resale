<template>
	<aside class="menu" v-show="getToggleMenu">
        <center><img src="@/assets/logo_menu.png" @click="toHome" width="150px" alt="Logo" class="logo-menu" /></center>
        <router-link exact to="/home" class="nav-bar">
            Home
        </router-link>
        <router-link exact to="/products" class="nav-bar">
            Produtos
        </router-link>
        <router-link exact to="/mySales" class="nav-bar">
            Meus pedidos
        </router-link>
       
    </aside>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
	name: 'Menu',
    data() {
        return {
            
        }
    },
    computed: {
        ...mapGetters({
            getToggleMenu: 'Auth/getIsMenuVisible',
            getTree: 'Articles/getTree'
        })
    },
    methods: {
        ...mapActions({
            setToggleMenu: 'Auth/toggleMenu',
            setTree: 'Articles/setTree'
        }),
        async getTreeData() {
            await this.setTree()
            return this.getTree
        },
        toMyArticles(){
            this.$router.push({path: '/myArticles'})
        },
        toHome(){
            this.$router.push({path: '/home'})
        }
    }
}
</script>

<style>
    .menu {
        grid-area: menu;
        background: linear-gradient(to right, #232526, #414345);
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
    }
    .menu a,
    .menu a:hover {
        color: white;
        text-decoration: none;
    }
    .menu .tree-node > .tree-content:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }
    .menu .tree-node.selected > .tree-content{
        background: linear-gradient(to right, #232526, #414345);
    }
    .tree-arrow.has-child{
        filter: brightness(2);
    }
    .menu .menu-filter{
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 2px 20px;
        margin-left: 13px;
        padding-bottom: 8px;
        border-bottom: 1px solid #AAA;
    }
    .menu .menu-filter i{
        color: #AAA;
        margin-right: 10px;
    }
    .menu input {
        color: #CCC;
        font-size: 1.1rem;
        border: 0;
        outline: 0;
        width: 100%;
        background: transparent;
    }
    .tree-filter-empty{
        color: #CCC;
        margin-left: 8px;
        font-size: 1.1rem;
    }
    .menu .nav-bar{
        color: white;
        font-size: 1.1rem;
        padding: 15px;
        padding-left: 20px;
    }
    
    .menu .nav-bar:hover{
        cursor: pointer;
        background-color: rgba(255, 255, 255, 0.2);
    }
    .menu .router-link-active{
        background-color: rgba(255, 255, 255, 0.2);
    }
    .menu .logo-menu{
        cursor: pointer;
    }
</style>