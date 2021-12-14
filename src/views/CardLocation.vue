<template>
    <div>
        <!-- <b-list-group>
            <b-list-group-item v-for="event in eventsFrom" :key="event.id">{{event.name}}</b-list-group-item>
        </b-list-group> -->


        <ul class="card-list">
                    
                <li 
                    v-for="event in eventsFrom"
                    :key="event.id"
                    class="card-list__item"
                >
                    
                    <h4>{{event.name}}</h4>  
                    <p>{{event.description}}</p>
                    <p>{{(new Date(event.day)).toLocaleDateString()}}</p>
                    <span>Организатор: <strong>{{event.account.username}}</strong></span>

                    <div>
                        <!-- <b-button
                            variant="primary"
                            class="btn-edit__card btn-no-style"
                        >
                            <i class="fas fa-edit"></i>
                        </b-button> -->
                    </div>
                    
                </li>
        </ul>


    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: "GcardLocation",

    props: {
       
    },

    computed: {
        ...mapGetters({
            eventsFrom: 'EVENTS_FROM_LOCATION'
        })
    },
    updated() {
        console.log(this.eventsFrom);
    },

    created() {
        console.log(this.$route.params);
        this.$store.dispatch('getAllEventsFromLocation', parseInt(this.$route.params.id))
    }
}
</script>

<style scoped>
ul,li {
    list-style-type: none;
}
a {
    display: block;
    color: black
}
.card-table {
    width: 100%;
}
.card-list {
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}
.card-list__item {
    width: 18%;
    padding: 20px 0;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin: 10px;
    transition: 0.2s ease-in-out;
}
.card-list__item:hover {
    background: rgb(245, 245, 245);
    transition: 0.2s ease-in-out;
    transform: scale(1.02);
    text-decoration: none;
}
</style>