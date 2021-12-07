<template>
  <div>
      <!-- <div>
      <h3 class="mt-3"> Event details not found </h3>
      </div>  -->
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
                <h3 class="name-details">{{this.EVENT_DETAILS.name}}</h3>
                <div class="description-details">
                    <p class="mt-2">{{this.EVENT_DETAILS.description}}</p>
                </div>
                <div class="mt-5 d-flex justify-content-center align-items-center">
                    <div>
                        <b-icon icon="geo-alt-fill"></b-icon>
                    </div>
                    <div class="ml-3 d-flex flex-column align-items-center">
                        <h5>Локация</h5>
                        <h6>Test Location</h6>
                    </div>
                </div>
                <div class="mt-4 d-flex justify-content-center align-items-center">
                    <div>
                        <b-icon icon="person-circle"></b-icon>
                    </div>
                    <div class="ml-3 d-flex flex-column align-items-center">
                        <h5>Организатор</h5>
                        <h6>test@mail.ru</h6>
                    </div>
                </div>
                <div class="mt-4 d-flex justify-content-center align-items-center">
                    <div>
                        <b-icon icon="calendar"></b-icon>
                    </div>
                    <div class="ml-3 d-flex flex-column align-items-center">
                        <h5>Дата проведения</h5>
                        <h6>{{EVENT_DETAILS.day}}</h6>
                    </div>
                </div>
            </div>
            <div></div>
        </div>
        <b-modal id="modalEdit" ref="modalEdit">
            <p class="mt-2 mb-1">Новый заголовок мероприятия: </p>
            <b-form-input v-model="EVENT_DETAILS.name"></b-form-input>
            <p class="mt-2 mb-1">Новое описание мероприятия: </p>
            <b-form-textarea
                id="textarea"
                placeholder="Описание"
                rows="3"
                max-rows="6"
            ></b-form-textarea>
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
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
export default {
    name: 'EventDetails',
    data(){
        return {
            updatedObj: {
                id: '',
                name: ''
            }
        }
    },
    methods: {
        ...mapMutations([
            'setDeleteEvent'
        ]),
        ...mapActions([
            'editEvent',
            'deleteEvent'
        ]),
        deleteEventBtn(){
            this.$refs['modalDelete'].show()
        },
        deleteEventFromModal(){
            this.deleteEvent(this.EVENT_DETAILS._id)
            .then((res) => {
                console.log(res);
                this.$refs['modalDelete'].hide();
                this.$bvToast.toast('Your event successfully deleted', {
                    title: 'Deleted!',
                    variant: 'success',
                    solid: true,
                    autoHideDelay: 700
                })
            })
            .catch(error => {
                console.log(error);
            })
            console.log(this.EVENT_DETAILS._id)
        },
        editEventBtn(){
            this.$refs['modalEdit'].show()
            console.log(this.EVENT_DETAILS);
        },
        addNewEditedEvent(e){
            e.preventDefault();
            this.editEvent()
            .then(() => {
                this.$refs['modalEdit'].hide()
                console.log('success');
            })
            .catch(error => {
                console.log(error);
            })
        }
    },
    computed: {
        ...mapGetters([
            'EVENTS',
            'EVENT_DETAILS'
        ])
    },
    created(){
    }
}
</script>

<style>
.img-details{
    width: 350px;
}
.name-details{
    width: 150px;
}
.description-details{
    max-width: 300px;
}
</style>