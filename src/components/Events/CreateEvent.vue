<template>
<div>
    <div class="d-flex justify-content-between align-items-center mt-2">
    <div class="ml-2">
    <router-link :to="{name: 'Home'}">
        <b-icon icon="arrow-left-circle-fill" font-scale="2"></b-icon>
    </router-link>
    </div>
    <div class="ml-5">
    <h3 class="mt-2">Create new event</h3>
    </div>
    <div>
        <router-link :to="{name: 'EventsList'}">
        <b-button class="mr-2" variant="success">
            List off all events
        </b-button>
        </router-link>
    </div>
    </div>
    <BContainer
    class="d-flex justify-content-center align-items-center mt-4"
    >
    <b-form class="form-block bg-light rounded p-4" @submit="addEventBtn">
      <b-form-group
        id="input-group-1"
        label="Event title:"
        label-for="input-1"
      >
        <b-form-input
            id="input-1"
            type="text"
            placeholder="Please, enter your event title..."
            v-model="eventData.name"
            required
        ></b-form-input>
        <b-form-textarea
            id="textarea"
            v-model="eventData.description"
            placeholder="Enter description for your event..."
            rows="3"
            max-rows="6"
            class="mt-3"
            required
        ></b-form-textarea>
        <label class="mt-2" for="datepicker">Choose a date:</label>
        <b-form-datepicker locale="en-US" required id="datepicker" v-model="eventData.day" class="mb-2"></b-form-datepicker>
        </b-form-group>
        <b-button type="submit" variant="success" class="mr-2">Add event</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
    </BContainer>
</div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
    name: "Test",
    data(){
        return {
            eventData: {
                name: '',
                day: '',
                description: '',
                location: ''
            },
        }
    },
    methods: {
        ...mapActions([
            'getAllEvents',
            'addEvent'
        ]),
        addEventBtn(e){
            e.preventDefault();
            this.addEvent(this.eventData)
            .then(data => {
                console.log(data);
                console.log(this.eventData, 'eventData');
                this.$bvToast.toast('Your event successfully added', {
                    title: 'Done!',
                    variant: 'success',
                    solid: true,
                    autoHideDelay: 770
                })
                this.eventData = {}
            })
            .catch(error => {
                console.log(error);
            })
        },
        getEvents(){
            this.$store.dispatch('getAllEvents')
            .then(res => {
                console.log(res);
            })
            .catch(error => {
                console.log(error);
            })
        }
    },
    computed: {
        ...mapGetters([
            'USERS',
            'EVENTS'
        ])
    },
}
</script>

<style>
.form-block{
    width: 450px;
}

</style>