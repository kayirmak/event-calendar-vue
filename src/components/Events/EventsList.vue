<template>
  <div>
      <div class="d-flex justify-content-between mt-2">
      <div class="ml-2">
        <router-link :to="{name: 'Home'}">
        <b-icon icon="arrow-left-circle-fill" font-scale="2"></b-icon>
        </router-link>
      </div>
      <div>
          <h3 class="mt-2">Список всех мероприятий</h3>
      </div>
      <div></div>
      </div>
      <div>
          <div class="d-flex justify-content-start align-items-center mt-3 mb-5 ml-2">
              <div class="date-block mr-2">
                <label for="datepicker1">Начало даты (ГГ/MM/ДД)</label>
                    <b-form-datepicker
                    id="datepicker1"
                    class="mb-2"
                    
                    v-model="filterData.startDay"
                    :date-disabled-fn="dateDisabled"
                    ></b-form-datepicker>
              </div>
              <div class="date-block">
                <label for="datepicker2">Конец даты (ГГ/MM/ДД)</label>
                    <b-form-datepicker
                    id="datepicker2"
                    class="mb-2"
                    
                    v-model="filterData.endDay"
                    :date-disabled-fn="dateDisabled"
                    ></b-form-datepicker>
              </div>
              <div class="ml-3">
                 <b-button @click="filterDateBtn" variant="primary">Искать</b-button>
                 <b-button class="ml-4" @click="resetFilter" variant="danger">Очистить</b-button>
              </div>
          </div>
        <div class="d-flex justify-content-end mr-2">
            <div>
            <router-link :to="{name: 'feed'}">
            <b-button variant="success">
                Создать новую локацию
            </b-button>
            </router-link>
            </div>
            <div>
            <router-link :to="{name: 'CreateEvent'}">
            <b-button class="ml-2" variant="success">
                Создать новое мероприятие
            </b-button>
            </router-link>
            </div>
        </div>
      </div>
        <div v-if="this.EVENTS.length === 0" class="mt-4">
          <h3>У вас нет мероприятий...</h3>
      </div>
      <div v-else>
      <b-row  cols="4" align-h="between">
        <b-card-group v-for="event in this.EVENTS" :key="event.id">
            <EventCard
            :currentEvent="event"
            />
        </b-card-group>
      </b-row>
      </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import EventCard from './EventCard.vue';
export default {
  components: { EventCard },
    name: 'EventsList',
    data(){
        return {
            events: [],
            filterData: {
                startDay: '',
                endDay: ''
            }
        }
    },
    methods: {
        ...mapActions([
            'getAllEvents',
        ]),
        filterDateBtn(){
            this.$store.dispatch('getEventsByDates', {
                startDay: this.filterData.startDay,
                endDay: this.filterData.endDay
            })
            .then((res) => {
                console.log(res, 'success');
            })
            .catch(error => console.log(error))
        },
        resetFilter(){
            this.filterData = {};
            this.getAllEvents()
        },
        dateDisabled(ymd, date){
            // console.log(ymd, date);
            // const weekday = date.getDay()
            // console.log(weekday);
            // const day = date.getDate()
            // console.log(day);
        }
    },
    computed: {
        ...mapGetters([
            'EVENTS'
        ])
    },
    created(){
        this.getAllEvents()
        console.log(this.EVENTS.length, 'length');
    }
}
</script>

<style>
.card-block{
    display: flex;
    flex-wrap: wrap;
}
.date-block{
    width: 200px;
    height: 100px;
}

</style>