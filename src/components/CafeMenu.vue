<template>
    <v-row>
      
      <v-col md="6">
        <v-card>
          
          <v-img
            height="250"
            src="https://example.com/menu_img.png"
            class="d-flex align-end"
          >
            <h2 class="ml-4 mb-4 text-h3 white--text">MENU</h2>
          </v-img>
          
        </v-card>
      </v-col>
      
      <v-col md="6">
        <v-card>
          
          <v-card-text>
            <!--
              Здесь внутри начинаем выводить товары,
              для этого создаем список
            -->
            <v-list-item-group>
              
              <v-list-item v-for="item in menu_items" :key="item.id">
                
                <v-list-item-avatar>
                  <!-- Выводим изображение товара -->
                  <img :src="item.img" fluid />
                </v-list-item-avatar>
                
                <v-list-item-content>
                  
                  <v-list-item-title>
                    <!-- Выводим название товара -->
                    <h5 class="text-h5">{{ item.name }}</h5>
                  </v-list-item-title>
                  
                  <v-list-item-subtitle>
                    <!-- Выводим цену товару -->
                    <b>{{ item.price }}</b>
                  </v-list-item-subtitle>
                  
                </v-list-item-content>
                
                <v-list-item-action>
                  <!-- Добавляем кнопку для покупки товара -->
                  <v-btn icon>
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </v-list-item-action>
                
              </v-list-item>
              
            </v-list-item-group>
          </v-card-text>
          
        </v-card>
      
      </v-col>
      
    </v-row>
  </template>
  
  <script>
  export default {
    name: 'CafeMenu',
    data: () => ({
      menu_items: [
        {
          id: 0,
          name: 'King Burger',
          img: 'https://example.com/burger_1.png',
          price: 34.99
        },
        {
          id: 1,
          name: 'Dark Burger',
          img: 'https://example.com/burger_2.png',
          price: 39.99
        },
        // Можете также дальше добавить другие товары 
      ]
    })
  }
  </script>