<template>
      <v-col class="products-item" @click="toProduct()">
          <v-card
            class="mb-2 pt-0 card-content"
            max-width="374"
        >
            <template slot="progress">
            <v-progress-linear
                color="deep-purple"
                height="10"
                indeterminate
            ></v-progress-linear>
            </template>

            <v-img
            height="250"
            :src="product.imageUrl"
            ></v-img>

            <v-card-title>
                <v-col cols="12" :align="$vuetify.breakpoint.mdAndDown ? 'center' : ''" class="pa-0">
                    {{product.name}}
                </v-col>
            </v-card-title>

            <v-card-text class="pa-0">
            <v-row
                align="center"
                class="mx-0"
            >   <v-col cols="12" :align="$vuetify.breakpoint.mdAndDown ? 'center' : ''" class="pa-0 px-md-4">
                    <v-row class="ma-0" :justify="$vuetify.breakpoint.mdAndDown ? 'center' : 'start'">
                        <v-rating
                        :value="4.5"
                        color="amber"
                        dense
                        half-increments
                        readonly
                        size="14"
                        ></v-rating>

                        <div class="grey--text">
                        (413)
                        </div>
                    </v-row>
                </v-col>
                <v-col v-if="product.quantityInStock < 5 " cols="12" :align="$vuetify.breakpoint.mdAndDown ? 'center' : ''" class="px-0 py-4 px-md-4">
                    <v-btn v-if="product.quantityInStock < 5 && product.quantityInStock > 0" 
                    color="#2ecc71"
                    > Últimas peças </v-btn>  
                    <v-btn v-if="product.quantityInStock === 0" 
                    dark> Esgotado </v-btn>  
                </v-col>
            </v-row>

            <v-col :align="$vuetify.breakpoint.mdAndDown ? 'center' : ''" class="mt-4 mb-2 pa-0 subtitle-1 px-md-4">
                REF: {{ product.ref }}
            </v-col>
            </v-card-text>

            <v-card-title class="pa-0">
                <v-col :align="$vuetify.breakpoint.mdAndDown ? 'center' : ''" class="mb-4 pa-0 subtitle-1 px-md-4">
                    {{ service.formatCurrency(product.price) }}
                </v-col>
                
            </v-card-title>

            <v-divider v-if="!(product.quantityInStock === 0)" class="mx-4"></v-divider>

            <v-card-actions v-if="!(product.quantityInStock === 0)">
                <v-col :align="$vuetify.breakpoint.mdAndDown ? 'center' : ''" class="px-0 py-2 subtitle-1 px-md-2">
                    <v-btn color="#ff7979" dark> Solicitar </v-btn> 
                </v-col>
            </v-card-actions>
        </v-card>
      </v-col>
</template>

<script>
import service from '@/service/'
export default {
    name: 'ProductsItem',
    props: ['product'],
    data() {
        return {
            service,
        }
    },
    methods: {
        toProduct(){
            this.$router.push({path:`/product/${this.product.id}`})
        }
    }
}
</script>

<style>
    .products-item{
        height: 100%;
        cursor: pointer;
    }
    .products-item .card-content{
        height: 100%;
    }
</style>