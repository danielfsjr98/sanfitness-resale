<template>
    <v-row class="ma-0 auth" justify="center">
        <v-col md="3" cols="11" align="center" align-self="center" class="auth-modal my-4" >
            <img src="@/assets/Logo.jpg" width="175px" alt="Logo" />

            <v-col cols="12" md="8" class="py-0" align="start">
                <div class="auth-title">{{ showSignup ? 'Cadastro': 'Login' }}</div>
            </v-col>

            <v-col v-if="showSignup" cols="12" md="8" class="py-0">
                <v-text-field
                    v-model="user.name"
                    label="Nome"
                    placeholder="Insira seu nome"
                    required
                ></v-text-field>
            </v-col>

            <v-col cols="12" md="8" class="py-0">
                <v-text-field
                    v-model="user.email"
                    label="E-mail"
                    placeholder="E-mail"
                    required
                ></v-text-field>
            </v-col>

            <v-col v-if="showSignup" cols="12" md="8" class="py-0">
                <v-text-field
                    v-model="user.cpf"
                    label="CPF"
                    placeholder="Insira seu CPF"
                    required
                ></v-text-field>
            </v-col>

            <v-col v-if="showSignup" cols="12" md="8" class="py-0">
                <v-text-field
                    v-model="user.cep"
                    label="CEP"
                    placeholder="Insira seu CEP"
                    required
                ></v-text-field>
            </v-col>

            <v-col v-if="showSignup" cols="12" md="8" class="py-0">
                <v-text-field
                    v-model="user.adress"
                    label="Endereço"
                    placeholder="Rua e número"
                    required
                ></v-text-field>
            </v-col>

            <v-col cols="12" md="8" class="py-0">
                <v-text-field
                    v-model="user.password"
                    label="Senha"
                    placeholder="Insira sua senha"
                    required
                    type="password"
                ></v-text-field>
            </v-col>

            <v-col v-if="showSignup" cols="12" md="8" class="py-0">
                <v-text-field
                    v-model="user.confirmPassword"
                    label="Confirme a senha"
                    placeholder="Confirme a senha"
                    required
                    type="password"
                ></v-text-field>
            </v-col>
        
            <v-col cols="12" md="8">
                <v-btn v-if="showSignup" color="primary" dark @click="signup">Registrar</v-btn>
                <v-btn v-else color="#3498db" dark @click="signin">Entrar</v-btn>
            </v-col>

            <v-col cols="12" md="8">
                <a href class="link-login" @click.prevent="showSignup = !showSignup">
                    <span v-if="showSignup"> Já tem cadastro? Acesse o login!</span>
                    <span v-else>Não tem cadastro? Registre-se aqui</span>
                </a> 
            </v-col>
            
        </v-col>
    </v-row>
</template>

<script>
import { userKey } from '@/global'
import { mapActions, mapGetters } from 'vuex';
export default {
    name: 'Auth',
    data: function() {
        return {
            showSignup: false,
            user: {}
        }
    },
    computed: {
		...mapGetters({
            getSignin: 'Auth/getSignin',
            getSignup: 'Auth/getSignup'
        })
	},
    methods: {
        ...mapActions({
            setUser: 'Auth/setUser',
            setSignin: 'Auth/signin',
            setSignup: 'Auth/signup'
        }),
        async signin() {
            await this.setSignin(this.user)
            if(this.getSignin !== null) {
                await this.setUser(this.getSignin)
                localStorage.setItem(userKey, JSON.stringify(this.getSignin))
                this.$router.push({ path: '/home' })
            }
        },
        async signup() {
            await this.setSignup(this.user)
            if(this.getSignup !== null) {
                this.user = {}
                this.showSignup = false 
            }
        }
    }
}
</script>

<style scoped>
    .auth{
        height: 100%;
    }
    .auth-modal{
        background-color: #ffffff;
        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    }
    .link-login{
        text-decoration: none;
    }
</style>