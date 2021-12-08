<template>
<div>
    <div class="d-flex justify-content-between align-items-center mt-2">
    <div class="ml-2">
    <router-link :to="{name: 'Home'}">
        <b-icon icon="arrow-left-circle-fill" font-scale="2"></b-icon>
    </router-link>
    </div>
    <div>
    <h3 class="mt-2 ml-5">Создать новое мероприятие</h3>
    </div>
    <div>
        <router-link :to="{name: 'EventsList'}">
        <b-button class="mr-2" variant="success">
            Список всех мероприятий
        </b-button>
        </router-link>
    </div>
    </div>
    <BContainer
    class="d-flex justify-content-center align-items-center mt-5"
    >
    <b-form class="form-block bg-light rounded p-4 mr-5" @submit="addEventBtn">
      <b-form-group
        id="input-group-1"
        label="Название мероприятия:"
        label-for="input-1"
      >
        <b-form-input
            id="input-1"
            type="text"
            placeholder="Введите название вашего мероприятия"
            v-model="eventData.name"
            required
        ></b-form-input>
      </b-form-group>
      <b-form-group
      id="textarea"
      label="Описание мероприятия:"
      label-for="textarea"
      >
        <b-form-textarea
            id="textarea"
            v-model="eventData.description"
            placeholder="Введите описание вашего мероприятия"
            rows="3"
            max-rows="6"
            class="mt-3"
            required
        ></b-form-textarea>
      </b-form-group>
      <b-form-group
        id="datepicker"
      >
        <label class="mt-2" for="datepicker">Выберите дату проведения:</label>
        <b-form-datepicker type="date" required id="datepicker" v-model="eventData.day" class="mb-2"></b-form-datepicker>
        </b-form-group>
        <b-button type="submit" variant="success" class="mr-2">Добавить мероприятия</b-button>
        <b-button type="reset" @click="resetAll" variant="danger">Очистить все</b-button>
    </b-form>
    </BContainer>
</div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
    name: "Test",
    data(){
        return {
            eventData: {
                name: '',
                day: '',
                description: '',
                location: ''
            },
        }
    },
    methods: {
        ...mapActions([
            'getAllEvents',
            'addEvent'
        ]),
        addEventBtn(e){
            e.preventDefault();
            if(this.eventData.day){
            this.addEvent(this.eventData)
            .then(data => {
                console.log(data);
                console.log(this.eventData, 'eventData');
                this.$bvToast.toast('Ваше мероприятие успешно добавлено!', {
                    title: 'Поздравляем!',
                    variant: 'success',
                    solid: true,
                    autoHideDelay: 700
                })
                this.eventData = {}
            })
            .catch(error => {
                console.log(error);
            })
            } else {
                this.$bvToast.toast('Выберите обязательно дату мероприятия!', {
                    title: 'Что-то пошло нет так!',
                    variant: 'danger',
                    solid: true,
                    autoHideDelay: 600
                })
            }
        },
        getEvents(){
            this.$store.dispatch('getAllEvents')
            .then(res => {
                console.log(res);
            })
            .catch(error => {
                console.log(error);
            })
        },
        resetAll(){
            this.eventData = {}
        }
    },
    computed: {
        ...mapGetters([
            'USERS',
            'EVENTS'
        ])
    },
}
</script>

<style>
.form-block{
    width: 450px;
}

</style>