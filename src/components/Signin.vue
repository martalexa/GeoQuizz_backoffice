<template>
  <v-container fill-height text-xs-center>
      <v-layout row wrap align-center>
	        <v-flex xs12 sm12 md5 lg5 xl5>
            <v-alert color="error" icon="warning" value="true" dismissible v-model="alertConnexion">
              Erreur lors de la connexion
            </v-alert>
            <h1>Connexion</h1>
            <form @submit.prevent>
              <v-text-field type="text" v-model="user.username" placeholder="Login" required></v-text-field>
              <v-text-field type="password" v-model="user.password" placeholder="Password" required></v-text-field>
              <v-btn @click="signin()">Se connecter</v-btn>
            </form>
	        </v-flex>

          <signup></signup>

      </v-layout>     
  </v-container>
</template>

<script>
    import signup from '@/components/Signup'
export default {
  name: 'Signin',
    components: {signup},
  data () {
    return {
      user: {
        username: "",
        password: ""
      },
      alertConnexion: false
    }
  },

  methods: {
    signin() {
      this.$store.dispatch('auth/login', this.user).then((res) => {
        this.$router.push({name: 'series_list'})
      }).catch((e) => {
        if(e.response.status = 401){
          this.alertConnexion = true
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
