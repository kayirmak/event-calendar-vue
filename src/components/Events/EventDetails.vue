<template>
  <div>
        <div class="d-flex justify-content-between mt-3" v-if="this.NOT_FOUND">
            <div class="ml-2">
                <router-link :to="{name: 'EventsList'}">
                <b-icon icon="arrow-left-circle-fill" font-scale="2"></b-icon>
                </router-link>
            </div>
        <div>
            <h3>Детали мероприятия не найдены или были удалены...</h3>
        </div>
          <div></div>
        </div>
        <div v-else>
        <div class="d-flex justify-content-between align-items-center p-3">
          <div>
            <router-link :to="{name: 'EventsList'}">
            <b-icon icon="arrow-left-circle-fill" font-scale="2"></b-icon>
            </router-link>
          </div>
          <div class="mt-3">
            <h5>Детали мероприятия</h5>
          </div>
          <div class="mt-3">
              <b-button variant="primary" @click="deleteEventBtn">Удалить мероприятие</b-button>
              <b-button class="ml-3" variant="primary" @click="editEventBtn">Редактировать мероприятие</b-button>
          </div>
        </div>
        <div class="d-flex justify-content-around align-items-center">
            <div>
                <img class="img-details" src="http://owen.tuzitio.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png" alt="img">
            </div>
            <div class="d-flex flex-column align-content-center">
                <div class="mt-5 d-flex justify-content-center name-details">
                <h4>{{EVENT_DETAILS.name}}</h4>
                </div>
                <div class="description-details">
                    <p class="mt-2">{{EVENT_DETAILS.description}}</p>
                </div>
                <div class="mt-5 d-flex justify-content-center align-items-center">
                    <div>
                        <b-icon icon="geo-alt-fill"></b-icon>
                    </div>
                    <div class="ml-3 d-flex flex-column align-items-center">
                        <h5>Локация</h5>
                        <h6>{{EVENT_DETAILS.location.address}}</h6>
                    </div>
                </div>
                <div class="mt-4 d-flex justify-content-center align-items-center">
                    <div>
                        <b-icon icon="person-circle"></b-icon>
                    </div>
                    <div class="ml-3 d-flex flex-column align-items-center">
                        <h5>Организатор</h5>
                        <h6>{{EVENT_DETAILS.account.username}}</h6>
                    </div>
                </div>
                <div class="mt-4 d-flex justify-content-center align-items-center">
                    <div>
                        <b-icon icon="calendar-fill"></b-icon>
                    </div>
                    <div class="ml-3 d-flex flex-column align-items-center">
                        <h5>Дата проведения</h5>
                        <h6>{{EVENT_DETAILS.day.slice(0,10)}}</h6>
                    </div>
                </div>
            </div>
            <div></div>
        </div>
        <b-modal id="modalEdit" ref="modalEdit" centered title="Редактирование мероприятия">
            <p class="mt-2 mb-1">Новый заголовок мероприятия: </p>
            <b-form-input v-model="EVENT_DETAILS.name"></b-form-input>
            <p class="mt-2 mb-1">Новое описание мероприятия: </p>
            <b-form-textarea
                id="textarea"
                placeholder="Описание"
                rows="3"
                max-rows="6"
                v-model="EVENT_DETAILS.description"
            ></b-form-textarea>
            <p class="mt-2 mb-1">Новая дата мероприятия: </p>
            <b-form-datepicker v-model="EVENT_DETAILS.day" class="mt-2"></b-form-datepicker>
            <p class="mt-2 mb-1">Новая локация мероприятия: </p>
            <b-form-input v-model="updatedAddress"  placeholder="Новая локация" list="my-list-id" class="mt-2"></b-form-input>
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
import { mapActions, mapGetters, mapMutations } from 'vuex';
export default {
    name: 'EventDetails',
    data(){
        return {
            updatedLocationId: '',
            updatedAddress: ''
        }
    },
    methods: {
        ...mapMutations([
            'setDeleteEvent'
        ]),
        ...mapActions([
            'editEvent',
            'deleteEvent',
            'getAllLocations',
            'getEventDetails'
        ]),
        makeToast(variant = null, title) {
            this.$bvToast.toast(`body `, {
                title: `${title || 'default'}`,
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
                this.makeToast('success', 'Ваше мероприятие успешно удалено')
            })
            .catch(error => {
                console.log(error);
            })
        },
        editEventBtn(){
            this.$refs['modalEdit'].show()
            this.getAllLocations()
        },
        addNewEditedEvent(e){
            e.preventDefault();
            this.$store.dispatch('editEvent', {
                day: this.EVENT_DETAILS.day,
                description: this.EVENT_DETAILS.description,
                id: this.EVENT_DETAILS.id,
                location: this.updatedLocationId,
                name: this.EVENT_DETAILS.name
            })
            .then(() => {
                this.$refs['modalEdit'].hide();
                this.makeToast('success', 'Детали мероприятия были успешно изменены')
            })
            .catch(error => {
                console.log(error);
            })
        },
        selectLocationId(id, address){
            this.updatedLocationId = id
            this.updatedAddress = address
        }
    },
    computed: {
        ...mapGetters([
            'EVENTS',
            'EVENT_DETAILS',
            'NOT_FOUND',
            'locations',
            'ERRORS'
        ])
    },
    mounted(){
        this.getEventDetails(this.EVENT_DETAILS.id)
        console.log(this.EVENT_DETAILS.id, 'eventdetails');
    }
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
    max-width: 300px;
    max-height: 150px;
    overflow-x: hidden;
}
</style>