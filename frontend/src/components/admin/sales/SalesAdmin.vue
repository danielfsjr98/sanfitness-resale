<template>
	<div class="user-admin">
        <v-row :justify="$vuetify.breakpoint.mdAndUp? 'start' : 'center'" class="ma-0 px-md-3 pt-md-3 pt-6">
            <h2> Gerenciar Pedidos </h2>
        </v-row>
        <v-col cols="12">
            <v-data-table
                :headers="headers"
                :items="sales"
                :items-per-page="5"
                :sort-by="['id']"
                :sort-desc="[true]"
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
                <template v-slot:[`item.total_sale`]="{ item }">
                    {{ service.formatCurrency(item.total_sale) }}
                </template>
            </v-data-table>
        </v-col>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import service from '@/service'

export default {
	name: 'SalesAdmin',
    data() {
        return{
            search: '',
            mode: null,
            user: {},
            headers: [
                {value: 'id', text: 'Código'},
                {value: 'sale_date', text: 'Data'},
                {value: 'total_sale', text: 'Valor total'},
                {value: 'userId', text: 'Id da revendedora', align: 'center', sortable: false},
                {value: 'fulfilled', text: 'Atendido', align: 'center', sortable: false}, 
                {value: 'actions', text: 'Ações', align: 'center'} 
            ],
            dialog: false,
            titleModal: "",
            textModal: "",
            action: "",
            showEditPass: false,
            service
        }
    }, 
    computed: {
        disableRemove() {
            const admins = this.users.filter( user => user.admin)
            return admins.length <= 1 && this.user.admin
        },
        ...mapGetters({
            sales: 'Sales/getAllSales',
        })
    },
    methods: {
        ...mapActions({
            setAllSales: 'Sales/setAllSales',
        }),
        goToSaleDetail(id){
            this.$router.push({path: `/sale/${id}`})
        }
    },
    async created() {
        await this.setAllSales()        
    }
}
</script>

<style>
</style>