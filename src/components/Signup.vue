<template>
    <div>
        <h1>Inscription</h1>
        <form @submit.prevent="signup()">
            Login: <input v-model="user.username" type="text" name=""/>
            Password: <input v-model="user.password" type="password" name=""/>
            <input type="submit" name=""/>
        </form>
    </div>
</template>

<script>
    export default {
        name: "signup",
        data () {
            return {
                user: {
                    username: "",
                    password: ""
                }
            }
        },
        methods: {
            signup() {
                this.$store.dispatch('auth/signup', this.user).then((res) => {
                    this.$router.push({name: 'signin'})
                }).catch((e) => {
                    console.log(e)
                })
            }
        }
    }
</script>

<style scoped>

</style>