<template>
    <v-row class="my-sales">
        <v-col cols="12">
            <PageTitle icon="mdi-calendar-clock" main="Meus pedidos" sub="Gerencie seus pedidos." />
        </v-col>
        <v-col cols="12" md="4" class="card-item"
        v-for="(sale, key) in getMySales"
        :key="key">
            <v-card class="card-content pa-5" >
                Pedido {{ sale.id }} <br />
                Valor do pedido: {{ service.formatCurrency(sale.total_sale) }} <br />
                {{sale.sale_date}}
                <v-checkbox
                    v-model="sale.fulfilled"
                    disabled
                    label="Atendido? "
                ></v-checkbox>
                <v-btn @click="goToSaleDetail(sale.id)" dark> Ver detalhes </v-btn>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import PageTitle from '@/components/template/PageTitle'
import { mapGetters, mapActions } from 'vuex';
import service from '@/service'
export default {
    components: {
        PageTitle
    },
    data(){
        return {
            service
        }
    },
    computed: {
		...mapGetters({
            getMySales: 'Sales/getMySales',
            getUser: 'Auth/getUser'
        })
	},
    methods: {
        ...mapActions({
            setMySales: 'Sales/setMySales',
        }),
        goToSaleDetail(id){
            this.$router.push({path: `/sale/${id}`})
        }
    },
    async created(){
        await this.setMySales(this.getUser.id)
    }

}
</script>

<style>

</style>