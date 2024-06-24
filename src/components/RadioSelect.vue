<template>
    <div>
      <v-radio-group v-model="radios" @update:modelValue="updLabelsSend"> 
        <v-radio label="Кто - кому" value = 1></v-radio>
        <v-radio label="Кому - кто" value= 2 ></v-radio>
      </v-radio-group>
    </div>
</template>

<script>
  export default {

    name: 'RadioSelect',

    props: [],

    data(){
      return {
        radios: 0
      }
    },
    methods: {
			updLabelsSend(){
        this.$emit('senddata', this.radios);
      },
		}      
  }
</script>