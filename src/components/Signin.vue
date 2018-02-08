<template>
  <div>
      <form @submit.prevent="signin()">
        Login: <input v-model="user.username" type="text" name=""/>
        Password: <input v-model="user.password" type="password" name=""/>
        <input type="submit" name=""/>
      </form>
  </div>
</template>

<script>
export default {
  name: 'Signin',
  data () {
    return {
      user: {
        username: "",
        password: ""
      }
    }
  },

  methods: {
    signin() {
      this.$store.dispatch('auth/login', this.user).then((res) => {
        this.$router.push({name: 'series_list'})
      }).catch((e) => {
        console.log(e)
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
