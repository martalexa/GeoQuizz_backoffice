<template>
  <div id="app">
    <v-app light>
      <v-container mt-5 id="main">
      	<top-bar></top-bar>
        <router-view/>
      </v-container>
    </v-app>
  </div>
</template>

<script>

import TopBar from '@/components/TopBar'

export default {
  components: {
  	TopBar
  },
  name: 'App'
}
</script>

<style>
	@import "leaflet/dist/leaflet.css";
</style>
