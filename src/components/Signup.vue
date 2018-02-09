<template>
    <v-flex xs12 sm12 md5 lg5 xl5 offset-md1>
        <v-alert color="error" icon="warning" value="true" dismissible v-model="alertInsciption">
            Erreur lors de l'inscription
        </v-alert>
        <h1>Inscription</h1>
        <form @submit.prevent>
            <v-text-field type="text" v-model="user.username" placeholder="Login" required></v-text-field>
            <v-text-field type="password" v-model="user.password" placeholder="Password" required></v-text-field>
            <v-btn @click="signup()">S'inscrire</v-btn>
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
                alertInsciption: false
            }
        },
        methods: {
            signup() {
                this.$store.dispatch('auth/signup', this.user).then((res) => {
                    this.$router.push({name: 'signin'})
                }).catch((e) => {
                    if(e.response.status = 401){
                        this.alertInsciption = true
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>