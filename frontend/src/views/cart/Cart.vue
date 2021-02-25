<template>
    <div class="cart">
        <v-row>
            <v-col cols="12">
                <PageTitle icon="mdi-cart" main="Carrinho" sub="Gerencie seu carrinho." />
            </v-col>
        </v-row>
        <v-row v-if="getCart.length > 0">
            <v-col cols="12" md="4" class="card-item"
            v-for="(product, key) in getCart"
            :key="key">
                <v-card class="card-content">
                    {{product.name }} - {{product.price}} - {{product.ref}}
                    <v-img
                        max-height="250"
                        max-width="250"
                        :src="product.imageUrl"
                    ></v-img>
                </v-card>
            </v-col>
            <v-col>
                <v-btn color="primary" @click="sendSale">Finalizar pedido</v-btn>
            </v-col>
        </v-row>
        <v-row v-else>
            <v-col>
                Carrinho vazio. <router-link exact to="/products" class="nav-bar"> Ir para o catálogo. </router-link>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import PageTitle from '@/components/template/PageTitle'
import { mapActions, mapGetters } from 'vuex';
import { cartKey } from '@/global'
export default {
    components: { PageTitle },
    computed: {
        ...mapGetters({
            getCart: 'Sales/getCart',
        }),
    },
    methods: {
        ...mapActions({
            setProductToCart: 'Sales/setProductToCart',
            setSaleItem: 'Sales/setSaleItem'
        }),
        async sendSale(){
            await this.setSaleItem(this.getCart)
            localStorage.setItem(cartKey, JSON.stringify([]))
            await this.setProductToCart(null)
        }
    },
    async created(){
        await this.setProductToCart(null)
    }


}
</script>

<style>
    .cart .card-item{
        height: 100%;
    }
    .cart .card-content{
        height: 100%;
    }
</style>