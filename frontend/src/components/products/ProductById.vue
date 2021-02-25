<template>
    <v-row class="product-by-id pa-4" :justify="$vuetify.breakpoint.smAndUp? 'center' : 'start' ">
        <v-col cols="12" class="px-3 mb-3">
            <PageTitle icon="mdi-plus-box-outline" :main="product.name" :sub="`REF: ${product.ref}`" />
        </v-col>
        <v-col cols="12" md="4">
            <v-img
            max-height="600"
            max-width="500"
            :src="product.imageUrl"
            ></v-img>
        </v-col>
        <v-col cols="12" md="5">
            <h4>REF: {{ product.ref }}</h4>
            <h2>{{ product.name }}</h2>
            <h4>Quantidade disponível: {{ product.quantityInStock }}</h4>
            <h3>{{ service.formatCurrency(product.price) }}</h3>
            <v-select
                :items="items"
                label="Tamanho"
                class="mt-3"
            ></v-select>
            <v-text-field
                v-model="product.amount"
                :rules="maxAmount"
                label="Quantidade"
                type="number"
            ></v-text-field>

            <v-btn :disabled="product.quantityInStock === 0"
            :class="$vuetify.breakpoint.smAndDown ? 'btn-add-cart' : '' "
            @click="addToCart"
            color="#ff7979"
            class="mt-2"
            > Adicionar ao carrinho </v-btn>

            <div class="product-description mt-5">{{ product.description }}</div>

            <v-row :justify="$vuetify.breakpoint.smAndDown ? 'end' : 'start'">
                <v-col cols="6" md="3">
                    <v-btn :disabled="product.quantityInStock === 0"
                    @click="backToProducts"
                    dark
                    class="mt-4 btn-add-cart"
                    > Voltar </v-btn>
                </v-col>
            </v-row>
            
        </v-col>
    </v-row>
      
</template>

<script>
import PageTitle from '../template/PageTitle'
import service from '@/service/'
import { mapGetters, mapActions } from 'vuex';
export default {
    name: 'ProductsItem',
    components: { PageTitle },
    data() {
        return {
            service,
            product: {},
            items: ['PP', 'P', 'M', 'G', 'GG', 'XG'],
            maxAmount: [ 
                v => ( v && v <= this.product.quantityInStock || this.product.quantityInStock == undefined || v == "" ) 
                || `Apenas ${this.product.quantityInStock} em estoque.`,
            ]
        }
    },
    computed: {
        ...mapGetters({
            getProductById: 'Products/getProductById',
            getCart: 'Sales/getCart',
        }),
    },
    methods: {
         ...mapActions({
            setProductByid: 'Products/setProductById',
            setProductToCart: 'Sales/setProductToCart'
        }),
        toProduct(){
            this.$router.push({path:`/product/${this.product.id}`})
        },
        addToCart(){
            this.setProductToCart(this.product)
        },
        backToProducts(){
            this.$router.go(-1)
        }
    },
    async created(){
        await this.setProductByid(this.$route.params.id)
        this.product = this.getProductById
        console.log(this.product)
    }
}
</script>

<style>
    .product-by-id h2{
        font-weight: 500;
    }
    .product-by-id h3{
        font-weight: 300;
    }
    .product-by-id h4{
        font-weight: 300;
    }
    .product-by-id .btn-add-cart{
        width: 100%;
    }
    .product-by-id .v-image{
        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    }
</style>