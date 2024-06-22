<template>
    <div>
      <v-text-field
        v-if="isEditable"
        label="" v-model="personName"
        :rules="[rules.required_title]">
      </v-text-field>
      <p v-else>{{ personName }}</p>
      <v-btn @click="sendPack">Редактировать</v-btn>
    </div>
</template>

<script>
    export default {

        name: 'InpLbl',

        props: ['maintext', 'index'],

        data(){
			return {
				isEditable: false,
        personName: this.maintext,

        rules: {
          required: value => !!value || 'Должно быть число',
          required_title: value => !!value || 'Не может быть пустым',
        },
			}
		},
        methods: {
				sendPack(){
          if (this.isEditable){
            this.$emit('senddata', this.personName, this.index);
          }
          this.isEditable = !this.isEditable
        }
		}      
    }
</script>