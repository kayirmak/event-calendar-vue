<template>
  <div>
      <div class="d-flex justify-content-between mt-2">
      <div class="ml-2">
        <router-link :to="{}">
        <!-- <b-icon icon="arrow-left-circle-fill" font-scale="2"></b-icon> -->
        </router-link>
      </div>
      <div>
          <h3 class="mt-2">Список всех мероприятий</h3>
      </div>
      <div></div>
      </div>
      <div>
        <div class="d-flex justify-content-start ml-2">
            <p>Фильтрация всех мероприятий по интервалу дат</p>
        </div>
          <div class="d-flex justify-content-start align-items-center mb-5 ml-2">
              <div class="date-block mr-2">
                <label for="datepicker1">Начало даты (ГГ/MM/ДД)</label>
                    <b-form-datepicker
                    id="datepicker1"
                    class="mb-2"
                    :min="minStartDay"
                    :max="maxStartDay"
                    v-model="filterData.startDay"
                    ></b-form-datepicker>
              </div>
              <div class="date-block">
                <label for="datepicker2">Конец даты (ГГ/MM/ДД)</label>
                    <b-form-datepicker
                    id="datepicker2"
                    class="mb-2"
                    :min="minEndDay"
                    :max="maxEndDay"
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
            <router-link :to="{name: 'locations'}">
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
        <div v-if="!EVENTS.length" class="mt-4">
          <h3>У вас нет мероприятий...</h3>
      </div>
      <div v-else>
      <b-row class="p-4" cols="4" align-h="between">
        <b-card-group v-for="eventItem in this.EVENTS" :key="eventItem.id">
        <b-card
            :title="eventItem.name"
            tag="article"
            style="max-width: 20rem;"
            class="mb-2 mt-3 ml-1 event-list__item"
        >
        <b-card-text>
            Локация : {{eventItem.location.address}}
        </b-card-text>
            <div v-if="!SHOW_BTN_DETAILS">
                <p>Дата: {{new Date(eventItem.day).toLocaleDateString()}}</p>
                <p>Организатор: {{eventItem.account.username}}</p>
            </div>
            <b-button v-else @click="toEventDetails(eventItem)" variant="primary">
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
export default {
    name: 'EventsList',
    data(){
        return {
            events: [],
            filterData: {
                startDay: '',
                endDay: ''
            },
            minStartDay: '',
            maxStartDay: '',
            minEndDay: '',
            maxEndDay: ''
        }
    },
    methods: {
        makeToast(variant = null, title) {
            this.$bvToast.toast(`body `, {
                title: `${title || 'default'}`,
                variant: variant,
                solid: true,
                autoHideDelay: 700
            })
        },
        disabledDate() {
            if(this.filterData.startDay > this.filterData.endDay) {
                this.filterData.endDay = this.filterData.startDay
                this.minEndDay = this.filterData.startDay
            }
        },
        ...mapActions([
            'getAllEvents',
            'getEventDetails'
        ]),
        filterDateBtn(){
            if(this.filterData.startDay && this.filterData.endDay){
            this.$store.dispatch('getEventsByDates', {
                startDay: this.filterData.startDay,
                endDay: this.filterData.endDay
            })
            .then((res) => {
                console.log(res, 'success');
            })
            .catch(error => console.log(error))
            } else {
                this.makeToast('danger', 'Заполните поля')
            }

        },
        resetFilter(){
            this.filterData = {};
            this.getAllEvents()
        },
          toEventDetails(eventItem){
            console.log(eventItem);
            this.getEventDetails(eventItem.id)
            .then(() => {
                this.$router.push({name: 'EventDetails', params:{id: eventItem.id, event: eventItem}})
                
            })
            .catch(error => console.log(error))
          }
    },
    computed: {
        ...mapGetters([
            'EVENTS',
            'SHOW_BTN_DETAILS'
        ])
    },
    mounted(){
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
.event-list__item{
    transition: 0.2s ease-in-out;
}
.event-list__item:hover{
    background: rgb(245, 245, 245);
    transition: 0.2s ease-in-out;
    transform: scale(1.02);
    text-decoration: none;
}

</style>