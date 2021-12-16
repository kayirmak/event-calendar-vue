<template>
  <div>
        <div class="d-flex justify-content-between mt-3" v-if="!EVENT_DETAILS">
            <div class="ml-2">
                <router-link :to="{name: 'MyEvents'}">
                <b-icon icon="arrow-left-circle-fill" font-scale="2"></b-icon>
                </router-link>
            </div>
        <div>
            <h3>Детали мероприятия не найдены или были удалены...</h3>
        </div>
          <div></div>
        </div>
        <div v-else>
            <div class="d-flex justify-content-between p-3">
                <div class="mt-3 align-items-center">
                    <router-link :to="{name: 'MyEvents'}">
                        <b-icon icon="arrow-left-circle-fill" font-scale="2"></b-icon>
                    </router-link>
                    <h4 class="d-inline ml-4"> Детали мероприятия </h4>
                </div>
                <div class="mt-3">
                    <b-button variant="primary" @click="deleteEventBtn">Удалить мероприятие</b-button>
                    <b-button class="ml-3" variant="primary" @click="editEventBtn">Редактировать мероприятие</b-button>
                </div>
            </div>

            <div class="event-details">
                <div class="event-details__header">
                    <div class="align-items-center text-center">
                        <h4>Мероприятие: <strong>{{EVENT_DETAILS.name}}</strong></h4>
                    </div>
                    <div class="align-items-left text-center">
                        <h5>Описание:</h5>
                        <h5 class="font-weight-bold">{{EVENT_DETAILS.description}}</h5>
                    </div>
                </div>
                <div class="event-details__body">
                     <div class="d-flex flex-column align-items-center mt-3">
                        <div class="d-flex align-items-center">
                            <b-icon class="mb-2 mr-2 h4 mt-2" icon="geo-alt-fill"></b-icon> 
                            <h5 class="align-items-center mt-2">Место проведения</h5>
                        </div>
                        <h4 class="mt-2 font-weight-bold">{{EVENT_DETAILS.location.address}}</h4>
                    </div>

                    <div class="d-flex flex-column align-items-center mt-3">
                        <div class="d-flex align-items-center">
                            <b-icon class="mb-2 mr-2 h4 mt-2" icon="person-circle"></b-icon>
                            <h5 class="align-items-center mt-2">Организатор</h5>
                        </div>
                        <h4 class="mt-2 font-weight-bold">{{EVENT_DETAILS.account.username}}</h4>
                    </div>

                    <div class="d-flex flex-column align-items-center mt-3">
                        <div class="d-flex align-items-center">
                            <b-icon class="mb-2 mr-2 h4 mt-2" icon="calendar-fill"></b-icon>
                            <h5 class="align-items-center mt-2">Дата проведения</h5>
                        </div>
                        <h4 class="mt-2 font-weight-bold">{{new Date(EVENT_DETAILS.day).toLocaleDateString()}}</h4>
                    </div>

                </div>
            </div>

        <b-modal id="modalEdit" ref="modalEdit" centered title="Редактирование мероприятия">
            <p class="mt-2 mb-1">Новый заголовок мероприятия: </p>
            <b-form-input required v-model="EVENT_DETAILS.name"></b-form-input>
            <p class="mt-2 mb-1">Новое описание мероприятия: </p>
            <b-form-textarea
                id="textarea"
                rows="3"
                max-rows="6"
                v-model="EVENT_DETAILS.description"
                required
            ></b-form-textarea>
            <p class="mt-2 mb-1">Новая дата мероприятия: </p>
            <b-form-datepicker 
            v-model="EVENT_DETAILS.day" 
            class="mt-2"
            :min="min"
            :date-disabled-fn="disabledDate"
            >
            </b-form-datepicker>
            <p class="mt-2 mb-1">Новая локация мероприятия: </p>
            <b-form-input disabled v-model="updatedAddress" placeholder="Выберите локацию" class="mt-2"></b-form-input>
                    <b-dropdown id="dropdown-1" text="Выберите локацию" class="m-md-2">
                        <b-dropdown-item 
                        v-for="locationItem in locations" 
                        :key="locationItem.id"
                        @click="selectLocationId(locationItem.id, locationItem.address)"
                        >
                            {{locationItem.address}}
                        </b-dropdown-item>
                    </b-dropdown>
            <template slot="modal-footer">
                    <b-button variant="primary" class="mr-1" @click="addNewEditedEvent">Сохранить изменения</b-button>
                    <b-button variant="secondary" @click="$bvModal.hide('modalEdit')">Выйти</b-button>
            </template>
        </b-modal>
        <b-modal id="modalDelete" ref="modalDelete" centered title="Удалить мероприятие?">
            Вы уверены, что хотите удалить это мероприятие
            <b>"{{EVENT_DETAILS.name}}"</b> ?
                <template slot="modal-footer">
                <b-button variant="primary" @click="deleteEventFromModal()" class="mr-1">Удалить мероприятие</b-button>
                <b-button variant="secondary" @click="$bvModal.hide('modalDelete')">Выйти</b-button>
            </template>
        </b-modal>
        </div>
        
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    name: 'EventDetails',
    data(){
        const now = new Date()
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        
        return {
            updatedLocationId: '',
            updatedAddress: '',
            updatedName: '',
            updatedDescription: '',
            updatedDay: '',
            min: '',
            todayDay: today
        }
    },
    methods: {
        ...mapActions([
            'editEvent',
            'deleteEvent',
            'getAllLocations',
            'getEventDetails',
            'getAllEvents'
        ]),
       toastError(variant = null, body){
            this.$bvToast.toast(`${body}`, {
                title: `Ошибка!`,
                variant: variant,
                solid: true,
                autoHideDelay: 700
            })
        },
        toastSuccess(variant = null, body){
            this.$bvToast.toast(`${body}`, {
                title: `Отлично!`,
                variant: variant,
                solid: true,
                autoHideDelay: 700
            })
        },
        deleteEventBtn(){
            this.$refs['modalDelete'].show()
        },
        deleteEventFromModal(){
            this.deleteEvent(this.EVENT_DETAILS.id)
            .then(() => {
                this.$refs['modalDelete'].hide();
                this.toastSuccess('success', 'Ваше мероприятие успешно удалено')
        
            })
            .catch(error => {
                console.log(error);
                // this.toastError('danger', error.message.split(':')[1])
            })
                console.log(this.EVENTS, 'all events')
                console.log(this.MY_EVENTS, 'my events');
        },
        editEventBtn(){
            this.$refs['modalEdit'].show()
            this.getAllLocations()
        },
        addNewEditedEvent(){
            if(this.EVENT_DETAILS.name && this.EVENT_DETAILS.description  && this.updatedAddress && this.EVENT_DETAILS.day) { 
            this.$store.dispatch('editEvent', {
                day: this.EVENT_DETAILS.day,
                description: this.EVENT_DETAILS.description,
                id: this.EVENT_DETAILS.id,
                location: this.updatedLocationId,
                name: this.EVENT_DETAILS.name
            })
            .then(() => {
                this.$refs['modalEdit'].hide();
                this.toastSuccess('success', 'Детали мероприятия были успешно изменены')
            })
            .catch(error => {
                console.log(error);
                this.toastError('danger', error.message.split(':')[1])
            })
            } else {
                this.toastError('danger', 'Заполните поля')
            }
        },
        selectLocationId(id, address){
            this.updatedLocationId = id
            this.updatedAddress = address
        },
        disabledDate(){
            this.min = this.todayDay
        }
    },
    computed: {
        ...mapGetters([
            'EVENTS',
            'EVENT_DETAILS',
            'NOT_FOUND',
            'locations',
            'MY_EVENTS'
        ])
    },
    created(){
        this.$store.dispatch('getEventDetails', parseInt(this.$route.params.id))
    },
}
</script>

<style>
.img-details{
    width: 350px;
}
.name-details{
    max-width: 300px;
    max-height: 150px;
    overflow-x: hidden;
}
.description-details{
    margin-top: 120px;
}
/* .details-info{
    margin: 100px 25px 0px 25px
} */
.details-title{
    margin-left: 290px;
}
.event-details{
    width: 90%;
    text-align: left;
    margin: 0 auto;
    box-shadow: 1px 1px 4px rgb(216, 216, 216) ;
    padding: 60px
}
.event-details__body{
    display: flex;
    justify-content: space-around;
    margin-top: 40px;
}
.font-weight-bold{
    font-weight: 600;
}
</style>