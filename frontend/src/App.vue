<template>
	<v-app>
		<div class="app" :class="{ 'hide-menu': !getIsMenuVisible || !user }">
			<Header title="Sanfitness - Revenda" :hideToggle="!user" :hideUserDropdown="!user"/>
			<Menu v-if="user"/>
			<Loading v-if="validatingToken" />
			<Content v-else />
			<Footer />
		</div>
	</v-app>
</template>

<script>
import { userKey } from '@/global'
import Header from '@/components/template/Header'
import Menu from '@/components/template/Menu'
import Content from '@/components/template/Content'
import Footer from '@/components/template/Footer'
import Loading from '@/components/template/Loading'

import { mapGetters, mapActions } from 'vuex';
export default {
	name: "App",
	components: {
		Header,
		Menu,
		Content,
		Footer,
		Loading
	},
	computed: {
		...mapGetters({
            user: 'Auth/getUser',
			getIsMenuVisible: 'Auth/getIsMenuVisible',
			getValidateUser: 'Auth/getValidateUser'
        })
	},
	data: function() {
		return {
			validatingToken: true
		}
	},
	methods: {
		...mapActions({
            setUser: 'Auth/setUser',
			setToggleMenu: 'Auth/toggleMenu',
			setValidateUser: 'Auth/setValidateUser'
        }),
		async validateToken() {
			this.validatingToken = true
			const json = localStorage.getItem(userKey)
			const userData = JSON.parse(json)
			this.setUser(null)
			
			if(!userData) {
				this.validatingToken = false
				this.$router.push({ name: 'auth' })
				return
			}
			await this.setValidateUser(userData)

			if (this.getValidateUser) {
				this.setUser(userData)
				
				if(this.$vuetify.breakpoint.smAndDown) {
					this.setToggleMenu(false)
				}
			} else {
				localStorage.removeItem(userKey)
				this.$router.push({ name: 'auth' })
			}
			this.validatingToken = false
		}
	},
	created() {
		this.validateToken()
	}
}
</script>

<style>
	*{
		font-family: "Lato", sans-serif;
		margin: 0;
	}
	.app{
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		
		height: 100vh;
		display: grid;
		grid-template-rows: 60px 1fr 55px;
		grid-template-columns: 250px 1fr;
		grid-template-areas: 
			"header header"
			"menu content"
			"footer footer";
	}
	.hide-menu {
		grid-template-areas: 
			"header header"
			"content content"
			"footer footer";
	}

</style>