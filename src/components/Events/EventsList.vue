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
                    ></b-form-datepicker>
              </div>
              <div class="date-block">
                <label for="datepicker2">Конец даты (ГГ/MM/ДД)</label>
                    <b-form-datepicker
                    id="datepicker2"
                    class="mb-2"
                    v-model="filterData.endDay"
                    :date-disabled-fn="disabledDate"
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
        <div v-if="!this.EVENTS.length" class="mt-4">
          <h3>У вас нет мероприятий...</h3>
      </div>
      <div v-else>
      <b-row  cols="4" align-h="between">
        <b-card-group v-for="eventItem in this.EVENTS" :key="eventItem.id">
            <!-- <EventCard
            :currentEvent="event"
            /> -->
        <b-card
            :title="eventItem.name"
            tag="article"
            style="max-width: 20rem;"
            class="mb-2 mt-3 ml-1"
        >
        <b-card-text>
            Локация : {{eventItem.location.address}}
        </b-card-text>
            <b-button @click="toEventDetails(eventItem)" variant="primary">
                Детали мероприятия
            </b-button>
        </b-card>
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
        disabledDate(ymd, date) {
            // console.log('ymd: ', ymd);
            // console.log('date: ', date);
            console.log('start date: ', this.filterData.startDay)
            if(this.filterData.startDay > this.filterData.endDay) {
                this.filterData.endDay = this.filterData.startDay
            }
        },
        ...mapActions([
            'getAllEvents',
            'getEventDetails'
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
          toEventDetails(eventItem){
            console.log(eventItem);
            this.getEventDetails(eventItem.id)
            .then(() => {
                // this.$router.push({name: 'EventDetails', params:{id: this.currentEvent.id, event: this.currentEvent}})
                this.$router.push({name: 'EventDetails', params:{id: eventItem.id, event: eventItem}})
                
            })
            .catch(error => console.log(error))
          }
    },
    computed: {
        ...mapGetters([
            'EVENTS'
        ])
    },
    beforeUpdate() {
        console.log(this.EVENTS.length, 'length');
    },
    created() {
        this.getAllEvents()

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