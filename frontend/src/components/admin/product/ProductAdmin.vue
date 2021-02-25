<template>
	<div class="product-admin">
        <v-row :justify="$vuetify.breakpoint.mdAndUp? 'end' : 'center'" class="ma-0 pa-3 pt-md-3 pt-6">
            <v-btn color="#ff7675" @click="getProduct(null, 'save')" dark> Cadastrar produto </v-btn>
        </v-row>
        <v-col cols="12">
            <v-data-table
                :headers="headers"
                :items="products"
                :items-per-page="5"
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
                    <v-btn @click="getProduct(item, 'edit')" class="mr-3"><v-icon> mdi-account-edit </v-icon></v-btn>
                    <v-btn @click="getProduct(item, 'remove')"><v-icon>mdi-delete</v-icon></v-btn>
                </template>
                <template v-slot:[`item.price`]="{ item }">
                    {{service.formatCurrency(item.price)}}
                </template>
            </v-data-table>
        </v-col>
        <v-dialog
            v-model="dialog"
            width="500"
            >
            <v-card>
                <v-card-title class="headline grey lighten-2">
                    {{titleModal}}
                </v-card-title>

                <v-card-text class="mt-4 pb-0">
                    <h3><center>{{textModal}}</center></h3>
                </v-card-text>

                <v-card-text v-if="action !== 'remove' ">
                    <v-col cols="12" class="py-0">
                        <v-text-field
                            v-model="product.name"
                            label="Nome"
                            placeholder="Insira seu nome"
                            required
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12" class="py-0">
                        <v-text-field
                            v-model="product.ref"
                            label="Referência"
                            placeholder="Referência"
                            required
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12" class="py-0">
                        <v-text-field
                            v-model="product.price"
                            label="Preço"
                            placeholder="Insira o preço"
                            required
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12" class="py-0">
                        <v-text-field
                            v-model="product.quantityInStock"
                            label="Quantidade em estoque"
                            placeholder="Insira a quantidade em estoque"
                            required
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12" class="py-0">
                        <v-text-field
                            v-model="product.description"
                            label="Descrição"
                            placeholder="Descreva o produto"
                            required
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12" class="py-0">
                        <v-text-field
                            v-model="product.imageUrl"
                            label="Imagem URL"
                            placeholder="Insira o URL da imagem"
                            required
                        ></v-text-field>
                    </v-col>

                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="primary"
                    text
                    @click="confirmAction"
                >
                    Confirmar
                </v-btn>
                <v-btn
                    color="primary"
                    text
                    @click="dialog = false"
                >
                    Cancelar
                </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import service from '@/service'
export default {
	name: 'ProductAdmin',
    data() {
        return{
            search: '',
            mode: null,
            product: {},
            headers: [
                {value: 'id', text: 'Código', sortable: true},
                {value: 'ref', text: 'Referência', sortable: true},
                {value: 'name', text: 'Nome', sortable: true},
                {value: 'price', text: 'Preço', sortable: true},
                {value: 'quantityInStock', text: 'Quantidade em estoque', sortable: true},
                {value: 'actions', text: 'Ações'}, 
            ],
            dialog: false,
            titleModal: "",
            textModal: "",
            action: "",
            service
        }
    }, 
    computed: {
        ...mapGetters({
            products: 'Products/getProducts',
            productAction: 'Products/getProduct'
        })
    },
    methods: {
        ...mapActions({
            setProducts: 'Products/setProducts',
            saveProduct: 'Products/saveProduct',
            editProduct: 'Products/editProduct',
            removeProduct: 'Products/removeProduct',
        }),
        reset() {
            this.mode = null
            this.product = {}
            this.setProducts()
            this.dialog = false
        },
        async edit() {
            await this.editProduct(this.product)
            if(this.productAction !== null){
                this.reset()
                await this.setProducts()
            }     
        },
        async save() {
            await this.saveProduct(this.product)
            if(this.productAction !== null){
                this.reset()
                await this.setProducts()
            } 
        },
        async remove() {
            await this.removeProduct(this.product.id)
            if(this.productAction !== null){
                this.reset()
                await this.setProducts()
            } 
        },
        getProduct(product, metod) {
            this.product = {...product}
            this.openModal(metod)
        },
        openModal(action) {
            this.action = action
            switch (this.action){
                case 'remove':
                    this.titleModal = "Excluir"
                    this.textModal = "Confirma exclusão?"
                    break;
                case 'edit':
                    this.titleModal = "Editar"
                    this.textModal = "Edição de produto"
                    break;
                case 'save':
                    this.titleModal = "Cadastro"
                    this.textModal = "Cadastro de produto"   
                    break;  
            }
            this.dialog = true
        },
        confirmAction() {
            switch (this.action){
                case 'remove':
                   return this.remove()
                case 'edit':
                   return this.edit()
                case 'save':
                   return this.save()   
            }
        }
    },
    async created() {
        await this.setProducts()
    }
}
</script>

<style>
</style>