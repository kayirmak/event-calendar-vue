<template>
<div>
    <div class="d-flex justify-content-between mt-4" v-if="MY_EVENTS.length == 0">
        <div class="ml-2">
            <!-- <router-link :to="{}">
                <b-icon icon="arrow-left-circle-fill" font-scale="2"></b-icon>
            </router-link> -->
        </div>
        <div>
            <h3>У вас нет мероприятий</h3>
        </div>
        <div></div>
    </div>
    <div v-else>
    <div class="d-flex justify-content-between mt-4">
    <!-- <div class="ml-2"> -->
        <!-- <router-link :to="{}">
            <b-icon icon="arrow-left-circle-fill" font-scale="2"></b-icon>
        </router-link> -->
    <!-- </div> -->
    <div class="ml-2">
        <h3>Мои мероприятия</h3>
    </div>
    <div>
        <router-link :to="{name: 'CreateEvent'}">
        <b-button class="ml-2 mr-2" variant="success">
            Создать новое мероприятие
        </b-button>
        </router-link>
    </div>
    </div>
    <ul class="event-list mt-5" id="event-id">
                <li class="event-list__item" v-for="eventItem in MY_EVENTS" :key="eventItem.id">
                    <h4 >{{eventItem.name}}</h4>
                    <div>
                        Локация: {{eventItem.location.address}}
                        <b-button class="mt-3" @click="toEventDetails(eventItem)" variant="primary">
                            Детали мероприятия
                        </b-button>
                    </div>
                </li>
            </ul>
    </div>

</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    name: 'MyEvents',
    data(){
        return{}
    },
    computed: {
        ...mapGetters([
            'MY_EVENTS'
        ])
    },
    methods: {
        ...mapActions([
            'getMyEvents',
            'getEventDetails',
            'getAllEvents'
        ]),
        toEventDetails(eventItem){
            console.log(eventItem, 'eventitem');
            this.getEventDetails(eventItem.id)
            .then(() => {
                this.$router.push({name: 'EventDetails', params:{id: eventItem.id, event: eventItem}})
            })
            .catch(error => console.log(error))
        },
        getMyEvents(){
            this.$store.dispatch('getMyEvents')
        }
    },
    // mounted(){
    //     this.getMyEvents()
    // }
}
</script>

<style>

</style>