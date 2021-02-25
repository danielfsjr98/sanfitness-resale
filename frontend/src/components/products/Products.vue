<template>
    <v-row>
        <v-col cols="12" class="px-6">
            <PageTitle icon="mdi-store" main="Catálogo" sub="Nossos produtos" />
        </v-col>
        <v-col cols="12" class="content-products">
            <v-row class="ma-0">
                <v-col cols="12" md="3" class="py-0">
                    <v-text-field
                        v-model="filter"
                        label="Buscar"
                        placeholder="Busque pelo nome ou referência"
                        required
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col v-if="products.length <= 0" class="px-5">
                    <h3>Nenhum produto encontrado.</h3>
                </v-col>
                <v-col v-else cols="12" md="3" v-for="product in products" :key="product.id" class="cards-products">
                    <ProductsItem :product="product" />
                </v-col>
            </v-row>
        </v-col>
    </v-row>
    
</template>

<script>
import ProductsItem from './ProductsItem'
import PageTitle from '../template/PageTitle'
import { mapGetters, mapActions } from 'vuex';
export default {
    components: { ProductsItem, PageTitle },
    data(){
        return {
            filter: ""
        }
    },
    computed: {
        ...mapGetters({
            getAllproducts: 'Products/getProducts',
        }),
        products(){
            const productsF = this.getAllproducts.filter(product =>{
                return product.name.toUpperCase().indexOf(this.filter.toUpperCase()) > -1 
                    || product.ref.toUpperCase().indexOf(this.filter.toUpperCase()) > -1 
            })
            return productsF
        }
    },
    methods: {
        ...mapActions({
            setProducts: 'Products/setProducts'
        }),
    },
    async created() {
        await this.setProducts()
    }

}
</script>

<style>

</style>