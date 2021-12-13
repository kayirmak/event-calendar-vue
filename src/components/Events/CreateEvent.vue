<template>
<div>
    <div class="d-flex justify-content-between align-items-center mt-2">
    <div class="ml-2">
    <router-link :to="{name: 'EventsList'}">
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
    <b-form class="form-block bg-light rounded p-4 mr-5" @submit.prevent="addEventBtn">
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
        <b-form-group>

            <!-- <b-form-input v-model="eventData.location" placeholder="Новая локация" list="my-list-id" class="mt-2"></b-form-input>
                    <datalist id="my-list-id">
                        <option
                            v-for="locationItem in LOCATIONS"
                            :key="locationItem.id"
                            @mouseover="onclick(eventData.location)"
                        >
                            {{locationItem.address}}
                        </option>
                    </datalist> -->
                      <b-dropdown id="dropdown-1" text="Выберите локацию" class="m-md-2">
                        <b-dropdown-item 
                        v-for="locationItem in LOCATIONS" 
                        :key="locationItem.id"
                        @click="selectLocationId(locationItem.id)"
                        >
                            {{locationItem.address}}
                        </b-dropdown-item>
                    </b-dropdown>
        </b-form-group>
        <b-button type="submit" variant="success" class="mr-2">Добавить мероприятие</b-button>
        <b-button type="reset" @click="resetAll" variant="danger">Очистить все</b-button>
    </b-form>
    </BContainer>
</div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
    name: "CreateEvent",
    data(){
        return {
            eventData: {
                name: '',
                description: '',
                day: '',
                locationId: ''
            },
        }
    },
    methods: {
        ...mapActions([
            'getAllEvents',
            'addEvent',
            'getAllLocations'
        ]),
        makeToast(variant = null, title) {
            this.$bvToast.toast(`body `, {
                title: `${title || 'default'}`,
                variant: variant,
                solid: true,
                autoHideDelay: 700
            })
        },
        addEventBtn(){
            if(this.eventData.day){
            this.$store.dispatch('addEvent',{
                name: this.eventData.name,
                description: this.eventData.description,
                day: this.eventData.day,
                location: this.eventData.locationId
            })
            .then(() => {
                this.makeToast('success', 'Ваше мероприятие успешно добавлено')
                this.eventData = {}
            })
            .catch(error => {
                console.log(error.message, 'error component');
                // this.makeToast('danger', this.ERRORS)
                this.makeToast('danger', error.message)
            })
            } else {
                this.makeToast('danger', 'Выберите дату для своего мероприятия')
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
        },
        selectLocationId(id) {
            this.eventData.locationId = id
        }
    },
    computed: {
        ...mapGetters([
            'USERS',
            'EVENTS',
            'LOCATIONS',
            'ERRORS'
        ])
    },
    mounted(){
        this.getAllLocations()
    }
}
</script>

<style>
.form-block{
    width: 450px;
}

</style>