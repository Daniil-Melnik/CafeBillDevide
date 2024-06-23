<template>
    <div>
        <v-text-field :label = "title"  v-on:input="this.textInput = $event.target.value"></v-text-field>
        <v-btn @click="sendPack()">Добавить</v-btn>
    </div>
</template>

<script>
    export default {
      name: 'SingleForm',

      props: ['title'],

      data(){
        return {
            textInput: "",
        }
      },
      methods: {
        sendPack(){
            this.$emit('senddata', this.textInput);
        }
      },
    }
</script>