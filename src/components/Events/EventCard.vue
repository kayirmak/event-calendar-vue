<template>
   <b-card
        :title="currentEvent.name"
        tag="article"
        style="max-width: 20rem;"
        class="mb-2 mt-3 ml-1"
    >
        <b-card-text>
            Локация : {{currentEvent.location.address}}
        </b-card-text>
            <b-button @click="toEventDetails" variant="primary">
                Детали мероприятия
            </b-button>
    </b-card>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
export default {
    name: 'EventItem',
    props: {
        currentEvent : {
            type: Object
        }
    },
    data(){
        return {
        }
    },
    methods: {
        ...mapActions([
            'getEventDetails'
        ]),
        ...mapMutations([
            'setEventDetails'
        ]),
        toEventDetails(){
            // this.setEventDetails(this.currentEvent)
            console.log(this.currentEvent.id);
            // this.getEventDetails(this.currentEvent.id)
            // .then(() => {
                // this.$router.push({name: 'EventDetails', params:{id: this.currentEvent.id, event: this.currentEvent}})
                this.$router.push({name: 'EventDetails', params:{id: this.currentEvent.id, event: this.currentEvent}})
                
            // })
            // .catch(error => console.log(error))
        }
    },
    computed: {},
    created(){
    }

}
</script>

<style>

</style>