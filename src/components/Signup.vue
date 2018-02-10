<template>
    <v-flex xs12 sm12 md5 lg5 xl5 offset-md2>
        <v-alert color="error" icon="warning" value="true" dismissible v-model="alert.warning">
            Erreur lors de l'inscription
        </v-alert>
        <v-alert color="success" icon="check_circle" value="true" dismissible v-model="alert.success">
            Vous pouvez maintenant vous connecter
        </v-alert>
        <h1>Inscription</h1>
        <form @submit.prevent="signup()"  @keyup.enter="signup()">
            <v-text-field type="text" v-model="user.username" placeholder="Login" required></v-text-field>
            <v-text-field type="password" v-model="user.password" placeholder="Password" required></v-text-field>
            <v-btn type='submit'>S'inscrire</v-btn>
        </form>
    </v-flex>
</template>

<script>
    export default {
        name: "signup",
        data () {
            return {
                user: {
                    username: "",
                    password: ""
                },
                alert: {
                    warning: false,
                    success: false
                }
            }
        },
        methods: {
            signup() {
                this.$store.dispatch('auth/signup', this.user).then((res) => {
                    this.alert.success = true
                }).catch((e) => {
                    if(e.response.status = 401){
                        this.alert.warning = true
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>