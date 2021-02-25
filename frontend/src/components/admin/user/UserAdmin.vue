<template>
	<div class="user-admin">
        <v-row :justify="$vuetify.breakpoint.mdAndUp? 'end' : 'center'" class="ma-0 pa-3 pt-md-3 pt-6">
            <v-btn color="#ff7675" @click="getUser(null, 'save')" dark> Cadastrar usuário </v-btn>
        </v-row>
        <v-col cols="12">
            <v-data-table
                :headers="headers"
                :items="users"
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
                    <v-btn @click="getUser(item, 'edit')" class="mr-3"><v-icon> mdi-account-edit </v-icon></v-btn>
                    <v-btn @click="getUser(item, 'remove')"><v-icon>mdi-delete</v-icon></v-btn>
                </template>
                <template v-slot:[`item.admin`]="{ item }">
                    <v-simple-checkbox
                    v-model="item.admin"
                    disabled
                    ></v-simple-checkbox>
                </template>
                <template v-slot:[`item.reseller`]="{ item }">
                    <v-simple-checkbox
                    v-model="item.reseller"
                    disabled
                    ></v-simple-checkbox>
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
                            v-model="user.name"
                            label="Nome"
                            placeholder="Insira seu nome"
                            required
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12" class="py-0">
                        <v-text-field
                            v-model="user.email"
                            label="E-mail"
                            placeholder="E-mail"
                            required
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12" class="py-0">
                        <v-text-field
                            v-model="user.cpf"
                            label="CPF"
                            placeholder="Insira seu CPF"
                            required
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12" class="py-0">
                        <v-text-field
                            v-model="user.cep"
                            label="CEP"
                            placeholder="Insira seu CEP"
                            required
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12" class="py-0">
                        <v-text-field
                            v-model="user.adress"
                            label="Endereço"
                            placeholder="Rua e número"
                            required
                        ></v-text-field>
                    </v-col>

                    <v-row class="ma-0">
                        <v-col cols="6" class="py-0">
                            <v-checkbox
                            v-model="user.admin"
                            label="Administrador?"
                            ></v-checkbox>
                        </v-col>
                        <v-col cols="6" class="py-0">
                            <v-checkbox
                            v-model="user.reseller"
                            label="Revendedora?"
                            ></v-checkbox>
                        </v-col>
                    </v-row>

                    <v-col v-if="!user.id || showEditPass" cols="12" class="py-0">
                        <v-text-field
                            v-model="user.password"
                            label="Senha"
                            placeholder="Insira sua senha"
                            required
                            type="password"
                        ></v-text-field>
                    </v-col>

                    <v-col v-if="!user.id || showEditPass" cols="12" class="py-0">
                        <v-text-field
                            v-model="user.confirmPassword"
                            label="Confirme a senha"
                            placeholder="Confirme a senha"
                            required
                            type="password"
                        ></v-text-field>
                    </v-col>
                    <v-col v-if="user.id" cols="12" class="py-0">
                        <v-btn dark @click="toggleEditPass">Alterar senha</v-btn>
                    </v-col>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="primary"            
                    @click="confirmAction"
                >
                    Confirmar
                </v-btn>
                <v-btn
                    color="primary"
                    text
                    @click="dialog = false; showEditPass = false"
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

export default {
	name: 'UserAdmin',
    data() {
        return{
            search: '',
            mode: null,
            user: {},
            headers: [
                {value: 'id', text: 'Código'},
                {value: 'name', text: 'Nome'},
                {value: 'email', text: 'E-mail'},
                {value: 'admin', text: 'Administrador', align: 'center', sortable: false},
                {value: 'reseller', text: 'Revendedora', align: 'center', sortable: false}, 
                {value: 'actions', text: 'Ações', align: 'center'} 
            ],
            dialog: false,
            titleModal: "",
            textModal: "",
            action: "",
            showEditPass: false
        }
    }, 
    computed: {
        disableRemove() {
            const admins = this.users.filter( user => user.admin)
            return admins.length <= 1 && this.user.admin
        },
        ...mapGetters({
            users: 'Users/getUsers',
            userAction: 'Users/getUser'
        })
    },
    methods: {
        ...mapActions({
            setUsers: 'Users/setUsers',
            saveUser: 'Users/saveUser',
            editUser: 'Users/editUser',
            removeUser: 'Users/removeUser',
        }),
        reset() {
            this.mode = null
            this.user = {}
            this.setUsers()
            this.dialog = false
        },
        async edit() {
            await this.editUser(this.user)
            if(this.userAction !== null){
                this.reset()
                await this.setUsers()
            }     
        },
        async save() {
            await this.saveUser(this.user)
            if(this.userAction !== null){
                this.reset()
                await this.setUsers()
            } 
        },
        async remove() {
            await this.removeUser(this.user.id)
            if(this.userAction !== null){
                this.reset()
                await this.setUsers()
            } 
        },
        getUser(user, metod) {
            this.user = {...user}
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
                    this.textModal = "Edição de usuário"
                    break;
                case 'save':
                    this.titleModal = "Cadastro"
                    this.textModal = "Cadastro de usuário"   
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
        },
        toggleEditPass(){
            this.showEditPass = !this.showEditPass
        }
    },
    async created() {
        await this.setUsers()
    }
}
</script>

<style>
</style>