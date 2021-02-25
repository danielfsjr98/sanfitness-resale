<template>
	<div class="home">
        <PageTitle icon="mdi-home" main="Home" :sub="`${getUser.name}, bem vindo! `" />
    </div>
</template>

<script>
import PageTitle from '../template/PageTitle'
import { mapActions, mapGetters } from 'vuex';


export default {
	name: 'Home',
    components: {
        PageTitle
    },
    data(){
        return {
            mainArticle: {}
        }
    },
    computed: {
		...mapGetters({
            getUser: 'Auth/getUser',
        })
	},
    methods: {
        ...mapActions({
            setUserById: 'Users/setUserById',
        }),
    }
}
</script>

<style scoped>
    .home .article-content{
        margin: auto;
        background-color: #FFF;
        max-width: 75%;
        border-radius: 8px;
        padding: 25px;
        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    }
    .home .article-content pre {
        padding: 20px;
        border-radius: 8px;
        font-size: 1.2rem;  
    }
    .home .article-content img{
        max-width: 100%;
    }
    .home .article-item-image img {
        border-radius: 10px;
        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    }
    .home .article-content :last-child {
        margin-bottom: 0%;
    }
</style>