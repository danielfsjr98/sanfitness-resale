<template>
    <div>
        
        <div v-if="salesItems.length > 0">
            <PageTitle icon="mdi-wrench" main="Administração de Pedido" :sub="`Pedido #${salesItems[0].salesId}`" class="mb-2"/>
        </div>
        <v-data-table
            :headers="headers"
            :items="salesItems"
            :items-per-page="5"
            :sort-by="['id']"
            class="elevation-1"
            :search="search"
        >
            <template v-slot:top>
                <v-col cols="12" md="4" class="pa-0">
                <v-text-field
                v-model="search"
                label="Pesquisar"
                class="mx-4"
                append-icon="mdi-magnify"
                ></v-text-field>
                </v-col>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
                <v-btn @click="goToSaleDetail(item.id)" class="mr-3"><v-icon> mdi-account-edit </v-icon></v-btn>
                <v-btn @click="getUser(item, 'remove')"><v-icon>mdi-delete</v-icon></v-btn>
            </template>
            <template v-slot:[`item.fulfilled`]="{ item }">
                <v-simple-checkbox
                v-model="item.fulfilled"
                disabled
                ></v-simple-checkbox>
            </template>
            <template v-slot:[`item.sale_date`]="{ item }">
                {{ service.formatDate(item.sale_date) }}
            </template>
            <template v-slot:[`item.unit_price`]="{ item }">
                {{ service.formatCurrency(item.unit_price) }}
            </template>
            <template v-slot:[`item.product_id`]="{ item }">
                {{ item.productRef.toUpperCase() }} - {{ item.productName }}
            </template>
            <template v-slot:[`item.total_price`]="{ item }">
                {{ service.formatCurrency(item.total_price) }}
            </template>
        </v-data-table>
        <v-btn dark @click="previousPage" class="mt-3">Voltar</v-btn>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import service from '@/service'
import PageTitle from '@/components/template/PageTitle'
export default {
	name: 'SaleDetail',
    components: { PageTitle },
    data() {
        return{
            headers: [
                {value: 'id', text: 'Código'},
                {value: 'product_id', text: 'Produto'},
                {value: 'unit_price', text: 'Valor unidade'},
                {value: 'amount', text: 'Quantidade'},
                {value: 'total_price', text: 'Valor total'},
                {value: 'salesId', text: 'Código do pedido'},
                {value: 'userName', text: 'Usuário', align: 'center', sortable: false}, 
                {value: 'actions', text: 'Ações', align: 'center'} 
            ],
            search: '',
            sale: {},
            salesItems: [],
            product: {},
            service
        }
    }, 
    computed: {
        disableRemove() {
            const admins = this.users.filter( user => user.admin)
            return admins.length <= 1 && this.user.admin
        },
        ...mapGetters({
            getSalesItemsBySaleId: 'Sales/getSalesItemsBySaleId',
            getProductById: 'Products/getProductById',
            getUserById: 'Users/getUserById'
        })
    },
    methods: {
        ...mapActions({
            setSalesItemsBySaleId: 'Sales/setSalesItemsBySaleId',
            setProductById: 'Products/setProductById',
            setUserById: 'Users/setUserById'
        }),
        previousPage(){
            this.$router.go(-1)
        },
        async formatSales(){
            const salesF = this.getSalesItemsBySaleId.map( async sale => { 
                await this.setProductById(sale.product_id)
                await this.setUserById(sale.userId)
                return { 
                    ...sale, 
                    productName: this.getProductById.name, 
                    productRef: this.getProductById.ref,
                    userName: this.getUserById.name
                }
            }) 
            const salesPromiseResolved = await Promise.all(salesF)
                .then((values) => values);
            return salesPromiseResolved
        }
    },
    async created() {
        await this.setSalesItemsBySaleId(this.$route.params.id)
        this.salesItems = await this.formatSales()
    }
}
</script>

<style>

</style>