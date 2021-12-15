<template>
<div>
    <div v-if="!MY_EVENTS">
        <h3>У вас нет мероприятий</h3>
    </div>
    <div v-else>

    <ul class="event-list" id="event-id">
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
            'getEventDetails'
        ]),
        toEventDetails(eventItem){
            console.log(eventItem, 'eventitem');
            this.getEventDetails(eventItem.id)
            .then(() => {
                this.$router.push({name: 'EventDetails', params:{id: eventItem.id, event: eventItem}})
            })
            .catch(error => console.log(error))
        }
    },
    mounted(){
        this.getMyEvents()
    }
}
</script>

<style>

</style>