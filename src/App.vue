<template>
  <div id="app">
    <v-app light>
      <v-container mt-5 id="main">
        <router-view/>
      </v-container>
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@import "leaflet/dist/leaflet.css";
</style>
