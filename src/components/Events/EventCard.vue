<template>
   <b-card
        :title="currentEvent.name"
        tag="article"
        style="max-width: 20rem;"
        class="mb-2 mt-3 ml-1"
    >
        <b-card-text>
            Локация : Test location
        </b-card-text>
            <b-button @click="toEventDetails" variant="primary">
                Детали мероприятия
            </b-button>
    </b-card>
</template>

<script>
import { mapMutations } from 'vuex'
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
        ...mapMutations([
            'setEventDetails'
        ]),
        toEventDetails(){
            this.setEventDetails(this.currentEvent)
            this.$router.push({name: 'EventDetails', params: {id: this.currentEvent._id, event: this.currentEvent}})
        }
    },
    computed: {},
    created(){
    }

}
</script>

<style>

</style>