<template>
  <v-app theme="dark">
    
    <v-navigation-drawer
      app
      left
      absolute
      temporary
      v-model="drawer"
    >
      <v-list-item-group>
        <v-list-item v-for="item in menu_items" :key="item.id">
          <v-list-item-title>
            <router-link :to="item.url">{{ item.name }}</router-link>
          </v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-navigation-drawer>
    <v-app-bar
      app
      color="gray"
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>
        <div class="d-flex justify-center">
          <h2 class="color-neon-orange">Дробилка</h2>
          <h2 class="color-neon-yellow">Чеков</h2>
        </div>
      </v-app-bar-title>
    </v-app-bar>
    
    <v-main>
      <router-view></router-view>
    </v-main>
    
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    drawer: false,
    menu_items: [
      {
        id: 0,
        name: 'Чеки',
        url: '/'
      },
      {
        id: 1,
        name: 'Люди',
        url: '/lsPers'
      },
      {
        id: 2,
        name: 'Распределение',
        url: '/lsRelat'
      }
    ]
  })
}
</script>
<style lang="scss">
  @import './components/variables.scss';
</style>