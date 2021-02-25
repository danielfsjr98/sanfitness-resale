<template>
	<div class="admin-pages">
        <PageTitle icon="mdi-wrench" main="Administração do Sistema" sub="Cadastros & Cia" class="mb-2"/>

        <v-tabs
            v-model="tab"
            background-color="transparent"
            color="basil"
            grow
            show-arrows
            >
            <v-tab
                v-for="item in items"
                :key="item"
            >
                {{ item }}
            </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
            <v-tab-item >
                <SalesAdmin />
            </v-tab-item>
            <v-tab-item >
                <ProductAdmin />
            </v-tab-item>
            <v-tab-item >
                <UserAdmin />
            </v-tab-item>
        </v-tabs-items>
    </div>
</template>

<script>
import PageTitle from '../template/PageTitle'
import UserAdmin from '../admin/user/UserAdmin'
import ProductAdmin from '../admin/product/ProductAdmin'
import SalesAdmin from '../admin/sales/SalesAdmin'

export default {
	name: 'AdminPages',
    components: {
        PageTitle,
        UserAdmin,
        ProductAdmin,
        SalesAdmin
    },
    data () {
      return {
        tab: null,
        items: [
          'Pedidos', 'Produtos', 'Usuários'
        ]
      }
    },
    props: ['icon', 'main', 'sub']
}
</script>

<style>

</style>