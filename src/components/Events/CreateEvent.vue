<template>
<div>
    <div class="d-flex justify-content-around align-items-center mt-2">
    <div class="ml-2">
        <!-- <router-link :to="{name: 'EventsList'}">
            <b-icon icon="arrow-left-circle-fill" font-scale="2"></b-icon>
        </router-link> -->
    </div>
    <div  class="event-title">
        <h5>Создать новое мероприятие</h5>
    </div>
    <div>
        <router-link :to="{name: 'EventsList'}">
            <b-button class="mr-2" variant="success">
                Список всех мероприятий
            </b-button>
        </router-link>
        <router-link :to="{name: 'locations'}">
            <b-button class="ml-2 mr-2" variant="success">
                Список всех локаций
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
            class="mt-2"
            required
        ></b-form-textarea>
      </b-form-group>
      <b-form-group
        id="datepicker"
        label="Дата проведения мероприятия:"
        label-for="datepicker"
      >
            <b-form-datepicker 
            type="date" 
            required 
            id="datepicker" 
            v-model="eventData.day" 
            class="mb-2"
            :hide-header="true"
            :date-disabled-fn="disabledDate"
            :min="minDay"
            :max="maxDay"
            placeholder="Выберите дату для вашего мероприятия"
            >
            </b-form-datepicker>
        </b-form-group>
        <b-form-group>
            <b-dropdown id="dropdown-1" text="Выберите локацию" class="m-md-2">
                <b-dropdown-item 
                    v-for="locationItem in locations" 
                    :key="locationItem.id"
                    @click="selectLocationId(locationItem.id, locationItem.address)"
                >
                    {{locationItem.address}}
                </b-dropdown-item>
            </b-dropdown>
        <b-input readonly placeholder="Ваша локация" v-model="this.selectedAddress">{{this.selectedAddress}}</b-input>
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
        const now = new Date()
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        return {
            eventData: {
                name: '',
                description: '',
                day: '',
                locationId: ''
            },
            selectedAddress: '',
            minDay: '',
            maxDay: '',
            context: null,
            todayDay: today

        }
    },
    methods: {
        ...mapActions([
            'getAllEvents',
            'addEvent',
            'getAllLocations'
        ]),
        toastError(variant = null, body){
            this.$bvToast.toast(`${body}`, {
                title: `Ошибка!`,
                variant: variant,
                solid: true,
                autoHideDelay: 700
            })
        },
        toastSuccess(variant = null, body){
            this.$bvToast.toast(`${body}`, {
                title: `Отлично!`,
                variant: variant,
                solid: true,
                autoHideDelay: 700
            })
        },
        disabledDate(){
            this.minDay = this.todayDay
            // console.log(this.todayDay);
        },
        addEventBtn(){
            if(this.eventData.day && this.selectedAddress){
            this.$store.dispatch('addEvent',{
                name: this.eventData.name,
                description: this.eventData.description,
                day: this.eventData.day,
                location: this.eventData.locationId
            })
            .then(() => {
                this.toastSuccess('success', 'Ваше мероприятие успешно добавлено');
                this.eventData = {};
                this.selectedAddress = '';
                this.$router.push({name: 'MyEvents'})
                console.log(this.EVENTS, 'all eve');
            })
            .catch(error => {
                console.log(error.message, 'error component');
                this.toastError('danger', error.message.split(':')[1]);
            })
            } else {
                this.toastError('danger', 'Выберите дату или локацию для своего мероприятия');
            }
        },
        resetAll(){
            this.eventData = {}
        },
        selectLocationId(id, address) {
            this.eventData.locationId = id
            this.selectedAddress = address
        },
        onContext(ctx){
            this.context = ctx
            console.log(this.context);
        },
        onChange(ctx){
            console.log(ctx);
        }
    },
    computed: {
        ...mapGetters([
            'EVENTS',
            'locations',
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
.event-title{
    margin-left: 285px;
    margin-top: 20px;
}

</style>