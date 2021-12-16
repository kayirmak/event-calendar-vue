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

        <div class="location-header wrapper">
            <h5 class="location-table__title">Мои локации</h5>
            <b-button
                class="location-add"
                variant="success"
                @click="showModal('CREATE')"
                v-b-modal.modal-prevent-closing
            >
                Добавить местоположение
            </b-button>

        </div>
        
        <div class="location-table"></div>
        <div class="ml-md-auto">

            <div v-if="isLoading" class="spinner">
                <b-spinner type="grow" label="Spinning"></b-spinner>
                <b-spinner variant="primary" type="grow" label="Spinning"></b-spinner>
                <b-spinner variant="success" type="grow" label="Spinning"></b-spinner>
            </div>
            <ul class="location-list" id="list-id" v-else>
                <li class="location-list__item" v-for="location in locationsByUser" :key="location.id">
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
            locationsByUser: 'locationsByUser',
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
        makeToast(variant = null, title, body) {
            this.$bvToast.toast(`${body} `, {
                title: `${title || 'default'}`,
                variant: variant,
                solid: true,
                autoHideDelay: 700
            })
        },
        getAllLocationsByUser() {
            this.$store.dispatch('getAllLocationsByUser')
        },
        createLocation() {
            if(!this.title) {
                this.errors = 'Поле не заполнено'
                return    
            }
            this.$store.dispatch('createLocation', this.title).then(() => {
                this.makeToast('success', 'Успешно', 'Добавление выполнено')
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
                    this.makeToast('success', 'Успешно', 'Изменение выполнено')
                    this.closeModal()
                }).catch(error => {
                    this.makeToast('danger', 'Ошибка', error.message.split(':')[1])
                    this.$store.commit('EDIT_LOCATION_FAILURE')
                })
        },
        deleteLocation(id) {  
            this.$store.dispatch('deleteLocation', id).then(() => {
                this.makeToast('success', 'Успешно', 'Удаление выполнено')
            })
            .catch(error => {
                this.makeToast('danger', 'Ошибка', error.message.split(':')[1])
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
.location-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 95%;
    margin: 15px auto 0;
}
.location-list {
    display: flex;
    flex-wrap: wrap;
}
.location-list__item {
    width: 18%;
    padding: 20px 0;
    /* box-shadow: 0 5px 2px rgba(54, 54, 54, 0.377); */
    border: 1px solid #ddd;
    border-radius: 5px;
    margin: 10px
}
.btn-location {
    margin: 5px;
}

.card-location{
    text-decoration: underline;
    cursor: pointer;
}
.card-location:hover{
    color: blue;
}
</style>