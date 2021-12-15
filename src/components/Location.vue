<template>
    <div class="location">
        <Modal 
            v-if="isVisibleLocation === 'CREATE'"
            @closeModal="closeModal"
            @btnMethod="createLocation"
            btnTitle="Добавить"
            modalTitle="Добавить местоположение"
            :errors="errors"
            :isLoadingBtn="isLoadingBtn"
        >
            <b-input v-model="title"></b-input>
        </Modal>

        <Modal 
            v-if="isVisibleLocation === 'EDIT'"
            @closeModal="closeModal"
            @btnMethod="editLocation"
            btnTitle="Изменить"
            modalTitle="Редактировать местоположение"
            :id="id"
            :errors="errors"
            :isLoadingBtn="isLoadingBtn"
        >
            <b-input v-model="title"></b-input>
        </Modal>

        <b-button
            class="location-add"
            variant="success"
            @click="showModal('CREATE')"
            v-b-modal.modal-prevent-closing
        >
            Добавить местоположение
        </b-button>

        <div class="location-table"></div>
        <div>
            <h3>Название место</h3>

            <div v-if="isLoading" class="spinner">
                <b-spinner type="grow" label="Spinning"></b-spinner>
                <b-spinner variant="primary" type="grow" label="Spinning"></b-spinner>
                <b-spinner variant="success" type="grow" label="Spinning"></b-spinner>
            </div>
            <ul class="location-list" id="list-id" v-else>
                <li class="location-list__item" v-for="location in locations" :key="location.id">
                    <router-link :to="{name: 'card-location', params: {id: location.id, location: location}}">
                        <h4 >{{location.address}}</h4>
                    </router-link>

                    <div>
                        <b-button
                            variant="success"
                            class="btn-edit__location btn-no-style"
                            v-b-modal.modal-prevent-closing @click="showModal('EDIT', location.id)"
                        >
                            <i class="fas fa-edit"></i>
                        </b-button>
                        
                        <b-button 
                            variant="danger"
                            class="btn-delete__location btn-no-style btn-location"
                            disabled
                            v-if="isLoadingBtn === location.id"
                        >
                            <b-spinner small type="grow"></b-spinner>
                            Удаление...
                        </b-button>
                        <b-button
                            variant="danger"
                            class="btn-delete__location btn-no-style btn-location"
                            @click="deleteLocation(location.id)"
                            v-else
                        >
                            <i class="fa fa-trash"></i>
                        </b-button>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import Modal from './ModalLocation.vue'
import { mapGetters } from 'vuex'
import Pagination from './Pagination.vue'
export default {
    name: 'Glocation',
    components: {
        Modal,
        Pagination
    },
    data() {
      return {
        title: '',
        id: null,
        isVisibleModal: false,
        isVisibleLocation: '',
        errors: '',
        currentPage: 1
      }
    },
    computed: {
        ...mapGetters({
            locations: 'locations',
            isLoadingBtn: 'isLoadingBtn',
            isLoading: 'isLoading',
            error: 'error'
        }),
        pages() {
            const pagesCount = Math.ceil(this.total / this.limit)
            return [...Array(pagesCount).keys()].map(el => el + 1)
        },
        // currentPage() {
        //     return Number(this.$route.query.page || 1)
        // }
    },
    updated() {
        if(this.title) this.errors = ''
    },
    methods: {
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
        getAllLocations() {
            this.$store.dispatch('getAllLocations')
        },
        createLocation() {
            if(!this.title) {
                this.errors = 'Поле не заполнено'
                return    
            }
            this.$store.dispatch('createLocation', this.title).then(() => {
                this.toastSuccess('success', 'Добавление выполнено')
                this.closeModal()
            })
            
        },
        editLocation(locationId) {
            if(!this.title) {
                this.errors = 'Поле не заполнено'
                return    
            }
            this.$store.dispatch('editLocation', {
                id: locationId, title: this.title
            }).then(() => {
                    this.toastSuccess('success', 'Изменение выполнено')
                    this.closeModal()
                }).catch(error => {
                    this.toastError('danger', error.message.split(':')[1])
                    this.$store.commit('EDIT_LOCATION_FAILURE')
                })
        },
        deleteLocation(id) {  
            this.$store.dispatch('deleteLocation', id).then(() => {
                this.toastSuccess('success', 'Удаление выполнено')
            })
            .catch(error => {
                this.toastError('danger', error.message.split(':')[1])
                this.$store.commit('DELETE_LOCATION_FAILURE', error.message)
                console.log(error.message);
            })
        },
        showModal(key, id) {
            this.isVisibleModal = true
            this.isVisibleLocation = key
            this.id = id
        },
        closeModal() {
            this.isVisibleLocation = null
            this.errors = ''
            this.title = ''
        },
    },
        
    mounted() {
        this.getAllLocations()
    }
    
}
</script>

<style scoped>
ul,li {
    list-style-type: none;
}
a {
    color: black
}
.location-table {
    width: 100%;
}
.location-list {
    /* padding: 0; */
    display: flex;
    flex-wrap: wrap;
    /* justify-content: center; */
    margin: 0 auto;
}
.location-list__item {
    width: 18%;
    padding: 20px 0;
    /* box-shadow: 0 5px 2px rgba(54, 54, 54, 0.377); */
    border: 1px solid #ddd;
    border-radius: 5px;
    margin: 10px
}
.location-list__item:hover{
    background: rgb(245, 245, 245);
    transition: 0.2s ease-in-out;
    transform: scale(1.02);
    text-decoration: none;
}
.btn-location {
    margin: 5px;
}
.location-add {
    margin-top: 15px;
}
.card-location{
    text-decoration: underline;
    cursor: pointer;
}
.card-location:hover{
    color: blue;
}
</style>