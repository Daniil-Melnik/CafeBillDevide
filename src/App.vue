<template>
  <v-app>
    <v-app-bar
      app
      color="red"
    >

    <v-app-bar-title>
      <h3 class="text-h4 white--text">iFood</h3>
    </v-app-bar-title>

    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
     
   </v-app>
</template>
<script>
export default {
  name: 'App'
}
</script>
