<template>
  <v-container>
    
    <v-row class="list__cafes-title">
      <v-col>
        <h2 class="text-center text-h3 py-3">List of cafes</h2>
      </v-col>
    </v-row>
    
    <v-row class="list__cafes-content">
      <v-col md="4" v-for="item in items_list" :key="item.id">
        
        <v-card>
          
          <v-img
            height="250"
            :src="item.img"
          ></v-img>
          
          <v-card-title>
            <router-link to="/cafe/view">
              <h3 class="text-h4">{{ item.title }}</h3>
            </router-link>
          </v-card-title>
          
          <v-card-text>
            <p class="text-body-1">{{ item.description }}</p>
          </v-card-text>
          
        </v-card>
        
      </v-col>
    </v-row>
  </v-container>
</template>
  <script>
  export default {
    name: 'ListFood',
    data: () => ({
      items_list: [
        {
          id: 0,
          title: 'Заведение 1',
          description: 'Это наверное самое крутое заведение которое вы можете знать',
          img: 'https://мояпоходнаяжизнь.рф/wp-content/uploads/2019/03/%D0%B7%D0%BE%D0%BB%D0%BE%D1%82%D1%8B%D0%B5-%D0%B2%D0%BE%D1%80%D0%BE%D1%82%D0%B0-min.jpg' // Здесь добавляем любое изображение
        },
        {
          id: 1,
          title: 'Заведение 2',
          description: 'Lorem ipsum',
          img: 'https://мояпоходнаяжизнь.рф/wp-content/uploads/2019/03/%D0%B7%D0%BE%D0%BB%D0%BE%D1%82%D1%8B%D0%B5-%D0%B2%D0%BE%D1%80%D0%BE%D1%82%D0%B0-min.jpg' // Здесь добавляем любое изображение
        }
        // Дальше можете добавить другие заведения в список
      ]
    })
  }
  </script>