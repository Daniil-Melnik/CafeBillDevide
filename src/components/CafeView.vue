<template>
    <v-container>
      
      <CafeInfo></CafeInfo>
      
    </v-container>
  </template>
  
  <script>
  import CafeInfo from './CafeInfo.vue'
  export default {
    name: 'CafeView',
    components: {
      CafeInfo
    }
  }
  </script>