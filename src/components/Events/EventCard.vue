<template>
   <b-card
        :title="currentEvent.name"
        tag="article"
        style="max-width: 20rem;"
        class="mb-2 mt-3 ml-1 event-list__item"
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
            console.log(this.currentEvent.id);
            // this.getEventDetails(this.currentEvent.id)
            // .then(() => {
                // this.$router.push({name: 'EventDetails', params:{id: this.currentEvent.id, event: this.currentEvent}})
                this.$router.push({name: 'EventDetails', params: {id: this.currentEvent.id, event: this.currentEvent}})
                
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