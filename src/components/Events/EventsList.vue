<template>
  <div>
      <div class="d-flex justify-content-between mt-2">
      <div class="ml-2">
        <router-link :to="{name: 'Home'}">
        <b-icon icon="arrow-left-circle-fill" font-scale="2"></b-icon>
        </router-link>
      </div>
      <div>
          <h3 class="mt-2">All Events</h3>
      </div>
      <div></div>
      </div>
      <div>
          <div class="d-flex justify-content-start align-items-center mt-3 mb-5 ml-2">
              <div class="date-block mr-2">
                <label for="datepicker1">Start Date (YY/MM/DD)</label>
                    <b-form-datepicker
                    id="datepicker1"
                    class="mb-2"
                    locale="en-US"
                    v-model="filterData.startDate"
                    ></b-form-datepicker>
              </div>
              <div class="date-block">
                <label for="datepicker2">End Date (YY/MM/DD)</label>
                    <b-form-datepicker
                    id="datepicker2"
                    class="mb-2"
                    locale="en-US"
                    v-model="filterData.endDate"
                    ></b-form-datepicker>
              </div>
              <div class="ml-3">
                 <b-button @click="filterDateBtn" variant="primary">Search</b-button>
              </div>
          </div>
        <div class="d-flex justify-content-end mr-2">
                <router-link :to="{name: 'CreateEvent'}">
            <b-button class="ml-2" variant="success">
                Create new event
            </b-button>
                </router-link>
        </div>
      </div>
      <b-row cols="4" align-h="between">
        <b-card-group v-for="event in this.EVENTS.events" :key="event.id">
            <EventCard
            :currentEvent="event"
            />
        </b-card-group>
      </b-row>
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
                startDate: '',
                endDate: ''
            }
        }
    },
    methods: {
        ...mapActions([
            'getAllEvents',
        ]),
        deleteEventBtn(eventId){
            console.log(eventId);
            this.$store.dispatch('deleteEvent', eventId)
        },
        editEventBtn(eventTitle){
            console.log(eventTitle);
        },
        filterDateBtn(){
            console.log(this.filterData);
        }
    },
    computed: {
        ...mapGetters([
            'EVENTS'
        ])
    },
    created(){
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